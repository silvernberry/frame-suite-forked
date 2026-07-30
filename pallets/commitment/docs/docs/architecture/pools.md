---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🏊 Pools

Pools are the third major architecture layer after Digests and Indexes.

If Digest is:

> single economic state anchor

and Index is:

> immutable grouped digest structure

then Pool is:

> manager-controlled dynamic commitment allocation

Pools allow many users to commit into one shared structure, while a designated manager controls how those commitments are distributed across multiple digests.

This enables:

- 🏛 delegated staking systems
- 💰 managed vaults
- 📈 operator-controlled portfolios
- 🧺 validator allocation services
- ⚙ protocol-managed financial strategies

Unlike indexes:

```text
Index = structure

Pool = active management
```

Pools are built for dynamic allocation.

---

## 🎯 What a Pool Really Is

A Pool is not:

* direct ownership
* custodial wallet access
* manager-owned funds

A Pool is:

> a managed indirect digest

where users commit to the pool digest itself, and the pool manager redistributes those commitments across multiple underlying digests.

```text
Users -> Pool Digest -> Slot Digests -> Real economic balances
```

- The manager controls allocation.
- The manager does not own funds.
- Allocation privilege is not ownership.



---

## 🧩 The `CommitPool` Trait

This trait defines all pool operations.

```rust
impl CommitPool<Proprietor<T>> for pallet_commitment::Pallet<T, I> { ... }
```

It extends commitment behavior from:

> immutable grouped commitments

to

> dynamically managed grouped commitments

This is the architecture boundary between indexes and pools.

### Key Methods

| Method | Purpose |
|---|---|
| `get_pool_value(reason, pool)` | Returns the live aggregated value of the full pool across all slots |
| `gen_pool_digest(manager, reason, index, commission)` | Generates a unique digest for the pool from manager, index, and commission |
| `set_pool(who, reason, pool, index, commission)` | Creates a new managed pool from an existing index's structure |
| `set_slot_shares(who, reason, pool, slot, shares)` | Rebalances slot allocation through full release and re-deposit |
| `set_pool_manager(reason, pool, manager)` | Transfers pool management priviledges of an existing active pool |
| `get_commission(reason, pool)` | Returns the immutable manager commission of the pool |
| `reap_pool(reason, pool)` | Safely removes an empty pool with no active commitments |

---

## 🏷️ Core Types

### Pool Digest

```rust
type PoolDigest = Digest
```

The digest users commit to.

This is the top-level managed commitment target.

### Slot Digest

```rust
type SlotDigest = Digest
```

Each pool contains slots.

Each slot behaves like a managed grouped position copied from index structure.

### Pool Manager

```rust
type Proprietor = AccountId
```

The manager is simply a proprietor account stored separately.

The manager can:

* redistribute commitments
* rebalance allocation
* adjust strategy
* take optional commissions during resolution

The manager cannot:

* directly spend user funds
* withdraw user commitments
* bypass resolution rules
* mutate already-announced commission

Allocation privilege is not ownership.

---

## 🗂️ Storage Maps

### `PoolMap`

```text
(Reason, PoolDigest) -> PoolInfo
```

Stores the full pool structure:

* slot structure (share-based allocation)
* current managed balance (top-level pool-balance)
* commission configuration
* aggregate pool state

This defines **what the pool is**

It stores topology, not user ownership.

User ownership remains in `CommitMap` still.

### `PoolManager`

```text
(Reason, PoolDigest) -> Proprietor
```

Stores the designated manager of the pool.

This manager controls:

* slot allocation
* redistribution strategy
* operational management

but never direct ownership of user funds.

### `CommitMap`

```text
(Proprietor, Reason) -> CommitInfo
```

Still exists exactly like direct commitments and indexes.

It points to **the Pool Digest**.

This preserves the invariant:

```text
one proprietor -> one commitment per reason
```

even inside managed pool systems.

---

## 🛡 Pool Invariants

Pools preserve strict invariants:

* 🧱 manager controls allocation only
* 🚫 manager never owns funds
* 💸 commissions remain bounded
* 🧾 receipts remain immutable
* ⚡ lazy resolution stays deterministic
* 🧹 reap only when fully empty

Pools add management without breaking ownership safety.

### 🧱 Pools Are Created From Indexes

Pools are initially created from existing indexes.

They do not own the index.

They only copy the index structure.

This works because both indexes and pools use the same foundation:

> share-based grouped allocation

An index already provides:

* bounded entries
* weighted shares
* deterministic structure

So during pool creation:

```text
Pool
-> copies Index structure
-> creates Pool Slots
-> manages allocation independently
```

After creation:

```text
the pool is fully independent
```

- Later changes to the index do not affect the pool.
- Later pool rebalancing does not affect the index.

This is the key distinction.

```text
Index = immutable template

Pool = managed runtime structure
```

Indexes provide safe initial structure.

Pools take that structure and continue independently with manager-controlled allocation.

### ⚡ How Pools Actually Work

This is the most important part of pool architecture.

A pool behaves like:

> a balance on top of balances

Just like a digest holds a lazy balance and gives receipts to proprietors,

a pool also holds its own top-level lazy balance and gives pool-level receipts to users.

```text
Proprietor
-> commits to Pool Digest
-> receives Pool Receipt
```

But the real economic value is still distributed underneath like the pool commits as a proprietor into:

```text
Slot Digests
-> Direct Digests
```

This means:

```text
Pool = top-level managed balance

Slots = actual distributed execution
```

The pool itself acts like a pseudo-proprietor.

It holds one collective balance over many underlying balances.

### 🔄 Why Pool Operations Require Full Release

Because the pool maintains its own top-level balance, 

every structural operation must preserve correctness between pool balance and slot balances (digests).

That means operations like:

* deposit
* withdrawal
* manager rebalancing
* slot redistribution
* commission updates

cannot safely mutate slots partially.

Instead, the system always performs:

```text
-> full pool release
-> withdraw all slot digests
-> recover total pool value
-> rebuild allocation
-> re-deposit into slot digests
```

This guarantees:

* deterministic accounting
* correct receipt preservation
* no stale slot state
* safe manager-controlled redistribution

Pools always rebalance from the full top-level balance.

Never from partial mutation.

> Its like pool (as a pseudo-proprietor) resolving its commitment and redo again placing commitment for every pool mutation operation.

### 🧾 Pool Receipts

Users never receive receipts from slot digests directly.

They receive:

```text
one pool-level receipt
```

for their commitment to the pool.

Internally, the pool manages **many slot-level commit receipts** that represent how value is distributed underneath.

This keeps ownership simple:

> user owns pool commitment, pool manages slot commitments

without exposing internal complexity.

### 🎛 Manager Rebalancing

When the manager changes allocation:

it does not directly mutate balances inside slots.

Instead:

```text
-> withdraw all slots
-> recover pool balance
-> apply new strategy
-> deposit again across slots
```

This is why pool management stays safe where allocation changes are full re-compositions, not unsafe in-place mutations.

That is the fundamental difference from indexes. Indexes are immutable.

Pools are mutable through full controlled re-resolution.

### ⚡ Lazy Resolution of Pools

Exactly like indexes:

> receipts are immutable

but

> underlying digests continue changing

Example:

```text
Alice commits to Pool (A, B)

Manager reallocates pool structure

Validator A gains rewards
Validator B gets slashed
```

When Alice resolves:

```text
-> withdraw through pool
-> Pool fully releases
-> Determine Alice's Pool Portion
-> aggregate final result
-> return one final amount
```

Users never manually track reallocation.

Resolution happens lazily.

> Remember, slots don't track a proprietor's individual deposits. They simply represent their share of your current pool value.

### 💸 Pool Manager Commission

Pools support optional manager commissions.

This commission is the manager's reward for providing allocation and operational management.

It is defined as:

> percentage-based commission

and is only collected during **commit resolution** (withdrawal), not during deposit or rebalancing.

This keeps pool accounting predictable and prevents hidden balance deductions during active commitment periods.

### 🧱 Commission Is Immutable

A pool's commission cannot be modified after creation.

It is part of the pool's economic identity.

This guarantees:

* predictable user expectations
* stable receipt resolution
* deterministic final settlement
* safe historical accounting

Users must always know the exact commission rules attached to the pool they entered.

### 🔄 Changing Commission Creates a New Pool

If commission must change, the existing pool is never mutated

Instead:

```text
-> create new empty pool
-> assign new commission
-> new commitments enter new pool
```

The old pool continues serving existing commitments under its original commission rules until fully resolved and reaped.

This preserves correctness for all historical receipts.

Exactly like index immutability:

```text
index change -> new index

commission change -> new pool
```

No retroactive economic mutation is allowed.

### 🧹 Reaping a Pool

A pool can only be removed when:

- no active commitments
- no remaining managed funds

Only then can it be safely reaped.

This prevents destruction of active delegated economic state.

---

## 📌 In One Sentence

> A Pool is a manager-controlled commitment layer built on top of indexes, allowing delegated allocation without custodial ownership.

```text
Digest = state

Index = grouped structure

Pool = managed allocation
```

---

## 🚀 Next Step

Now we move into how balances are actually settled through a plugin based lazy receipts, minting, reaping, and imbalance resolution.

👉 **Architecture -> [Balance Engine](./balance.md)**
