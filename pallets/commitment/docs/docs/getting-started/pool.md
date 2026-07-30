---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🏊 Integrating Pools

Pools build on top of indexes by introducing managed allocation.

Instead of every proprietor managing commitments individually, proprietors commit to a shared pool while a designated manager controls how those commitments are distributed across slot digests.

The commitment lifecycle still remains the same.

Your pallet creates & manages pools and places, raises, queries, and resolves a single commitment.

`pallet-commitment` manages the pool balance, slot commitments, and manager-controlled redistribution.

---

## 🏊 Use the Pool Trait

Pool operations are exposed through the `CommitPool` trait which is built on top of `CommitIndex`.

If your pallet already uses Commitment:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type Commitment: Commitment<Self::AccountId> + 
        CommitIndex<Self::AccountId> + // dependency
        CommitPool<Self::AccountId> +
        // if variant ops are required
        CommitVariant<Self::AccountId> + 
        IndexVariant<Self::AccountId> + 
        PoolVariant<Self::AccountId> ;
}
```

all pool operations become available through the same adapter.

---

## 🏗️ Pool Creation

### Create an Index 

Pools are created from existing indexes.

First prepare and register an index exactly as described in the [previous section](./indexes.md).

```text
Index -> Pool
```

The pool reuses the index structure as its initial slot layout.

### Generate a Pool Digest

Pools have their own stable digest.

Generate one using:

```rust
let pool_digest = T::Commitment::gen_pool_digest(
    &manager,
    &LocalFreezeReason::ManagedPortfolio.into(),
    &index_digest,
    commission,
)?;
```

Unlike indexes, the pool digest is intended to remain stable while its internal allocation changes over time.

This is a recommended approach as it internally uses account nonces for deterministic uniqueness. Regardless, its upto the protocol to create digests that represents a pool in its own context.

### Register the Pool

```rust
T::Commitment::set_pool(
    &manager,
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
    &index_digest,
    commission,
)?;
```

The pool now contains:

* pool digest
* manager
* slot allocation
* commission

Users may now commit to the pool.

---

## 🔒 Place a Pool Commitment

Users commit exactly like a normal commitment. The only difference is that the digest is now the pool digest.

```rust
T::Commitment::place_commit(
    &who,
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
    amount,
    &Default::default(),
)?;
```

Internally the commitment engine:

* creates the proprietor's pool receipt
* increases pool balance
* allocates value across slots

The usage pallet does not manually manage slot commitments.

---

## 🔍 Inspect Pool & Slots

Query the current value of the pool.

```rust
T::Commitment::get_pool_value(
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
)?;
```

Inspect one proprietor's position.

```rust
T::Commitment::get_pool_value_for(
    &who,
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
)?;
```

Both values are resolved lazily from the current slot balances.

To query the current value of a single slot.

```rust
T::Commitment::get_slot_value(
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
    &slot_digest,
)?;
```

Or inspect proprietor's slot's exposure.

```rust
T::Commitment::get_slot_value_for(
    &who,
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
    &slot_digest,
)?;
```

Unlike indexes, slot values represent managed exposure rather than direct ownership.

---

## 📈 Raise a Pool Commitment

Increasing a pool commitment works exactly like direct commitments.

```rust
T::Commitment::raise_commit(
    &who,
    &LocalFreezeReason::ManagedPortfolio.into(),
    amount,
    &Default::default(),
)?;
```

The engine automatically:

* locates the proprietor's pool commitment
* increases the pool balance
* distributes the additional value using the current slot allocation
* creates new immutable pool receipts

No slot information needs to be supplied.

> Internally every pool mutation operation from place, raise, resolve, restructure, etc all follows the "release and recover" pattern described in upcoming sections

## 🛠️ Pool Management

Unlike direct commitments and indexes, pools expose additional management APIs.

These operations are intended for the current pool manager and allow the pool configuration to evolve over time without affecting proprietor ownership.

### Update Commission

```rust
T::Commitment::set_commission(
    &manager,
    LocalFreezeReason::ManagedPortfolio.into(),
    pool_digest,
    new_commission,
)?;
```

Pool commissions are immutable. Updating the commission creates a **new pool digest** with the updated commission while preserving the existing slot configuration.

Existing proprietor commitments remain attached to the original pool, and future commitments can use the newly returned pool digest.

### Update Pool Manager

Management responsibility can be transferred to another account.

```rust
T::Commitment::set_pool_manager(
    &LocalFreezeReason::ManagedPortfolio.into(),
    &pool_digest,
    &new_manager,
)?;
```

Only management rights change. Existing commitments remain unaffected. This is kept unchecked and expects higher level logic for 
authenticated calling.

### Update Slot Shares

Managers may rebalance pool allocation using `set_slot_shares()`.

```rust
T::Commitment::set_slot_shares(
    &manager,
    LocalFreezeReason::ManagedPortfolio.into(),
    pool_digest,
    slot_digest,
    new_shares,
)?;
```

This operation behaves as an **upsert**:

* If the slot already exists, its allocation shares are updated.
* If the slot does not exist, a new slot is created with the specified shares.

### Remove a Slot

Removing a slot uses the same `set_slot_shares()` API by assigning it zero shares.

```rust
T::Commitment::set_slot_shares(
    &manager,
    LocalFreezeReason::ManagedPortfolio.into(),
    pool_digest,
    slot_digest,
    0,
)?;
```

A slot with zero shares no longer participates in future pool allocation while remaining part of the pool configuration.


### Update Slot Variant

Variant-aware pools may also update the semantic position of a slot via trait `PoolVariant`.

```rust
T::Commitment::set_slot_variant( ... )?;
```

For example:

```text
BTC Long -> BTC Short
```

---

## 🔄 Release & Recover Pool

A pool behaves as a **proprietor of its own underlying commitments**.

Every slot commitment is owned and managed by the pool itself rather than directly by individual proprietors, unlike indexes.

As a result, **any operation that mutates the pool's internal state requires temporarily releasing those deployed commitments before the mutation and recovering them afterwards.**

This includes every structural and financial mutation, such as:

- placing commitments
- raising commitments
- resolving commitments
- updating commission
- updating slot shares
- adding slots
- removing slots
- replacing slot digests
- changing slot variants
- mutating slot digest values
- any other operation affecting deployed pool commitments

The lifecycle is therefore always:

```text
Mutation
-> release_pool()
-> perform mutation
-> recover_pool()
```

This ensures the pool can safely rebuild its internal commitment graph using the latest state while preserving:

- proprietor ownership
- immutable receipt history
- accounting correctness
- correct slot allocation
- consistent pool valuation

Fortunately, consumer pallets do **not** need to manage this lifecycle manually. Pool trait operations perform the required release and recovery internally whenever a mutation is executed.

---

## ⚖️ Update Slot Digests

Slot digests behave exactly like ordinary commitment digests.

Reward or penalize them using the standard digest APIs.

```rust
T::Commitment::set_digest_value(
    &LocalFreezeReason::ManagedPortfolio.into(),
    &slot_digest,
    new_value,
    &Default::default(),
)?;
```

or for variant-aware pools:

```rust
T::Commitment::set_digest_value_of_variant(
    &LocalFreezeReason::ManagedPortfolio.into(),
    &slot_digest,
    position,
    new_value,
    &Default::default(),
)?;
```

As slot balances evolve:

* proprietor pool values update
* total pool value updates

without modifying existing receipts.

## 🏁 Resolve a Pool Commitment

Pool commitments resolve using the normal commitment API.

```rust
T::Commitment::resolve_commit(
    &who,
    &LocalFreezeReason::ManagedPortfolio.into(),
)?;
```

Internally the engine:

* resolves the proprietor's pool receipt
* settles slot commitments
* applies commission
* reconciles issuance and reaping
* transfers the final fungible balance

Only one call is required from the usage pallet.

---

## 📌 Complete Lifecycle

```text
Pools
-> prepare_index()
-> set_index()
-> gen_pool_digest()
-> set_pool()
-> place_commit()
-> manager reallocates slots
-> slot digests evolve
-> raise_commit()
-> resolve_commit()
```

The usage pallet interacts only with the pool.

The commitment engine manages slot commitments, redistribution, commissions, and settlement automatically.

---

## 🚀 Next Step

Now that you've integrated direct commitments, indexes, and pools, the next step is exploring the complete Commitment API.

This section documents every trait-based operation exposed by `pallet-commitment`, including commitment lifecycle, inspection APIs, index management, pool management, variants, and reserve operations.

👉 **Core -> [Operations](../core/operations.md)**