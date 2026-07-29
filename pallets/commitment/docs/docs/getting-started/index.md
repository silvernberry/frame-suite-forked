---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🧺 Integrating Indexes

Indexes allow a usage pallet to distribute a single commitment across multiple digests.

Unlike direct commitments, where value is bonded to a single digest, an index automatically allocates committed value across multiple entry digests according to predefined shares.

The commitment lifecycle does not change.

Your pallet still places, raises, queries, and resolves one commitment.

`pallet-commitment` transparently manages the underlying entry commitments.

---

## 🔌 Index Trait Dispatch

Index operations are exposed through the `CommitIndex` trait.

If your pallet is already configured with the Commitment adapter (loosely coupled):

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type Commitment: 
        Commitment<Self::AccountId> + 
        CommitIndex<Self::AccountId> + 
        // if variant ops are required
        CommitVariant<Self::AccountId> + 
        IndexVariant<Self::AccountId>;
}
```

The same adapter now exposes both direct commitment and index operations.

Or In case of tightly integrating via direct import 

```rust
use pallet_commitment::Pallet as Commitment;
use frame_suite::commitment::traits::{Commitment, CommitIndex, IndexVariant};

// use directly 

<Commitment<T> as CommitIndex<..>>::prepare_index(...)
```

---

## 🧺 Preparing an Index

Before users can commit to an index, **one must exist else any unknown digests will be treated as a direct digest**.

Prepare it from weighted entry digests.

```rust
let index = T::Commitment::prepare_index(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &[
        (btc_digest, 50),
        (eth_digest, 30),
        (dot_digest, 20),
    ],
)?;
```

Each tuple contains:

```text
Entry Digest -> Allocation Shares
```

In the earlier case the variants of all the entries are default variant. In case of individual variant selection, `IndexVariant` can be utilized to prepare an index structure with variants.

```rust
let index = <T::Commitment as IndexVariant<...>>::prepare_index_of_variants(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &[
        (btc_digest, 50, Disposition::Affirmative.into()),
        (eth_digest, 30, Disposition::Contrary.into()),
        (dot_digest, 20, Disposition::Affirmative.into()),
    ],
)?;
```

The prepared index is still an in-memory structure. It is not yet part of the commitment system.

### Generate an Index Digest

Indexes are identified by their own digest. Generate one using the prepared index structure.

```rust
let index_digest = T::Commitment::gen_index_digest(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index, // already prepared in-memory index struct
)?;
```

This is a recommended approach as it internally uses account nonces for deterministic uniqueness. Regardless, its upto the protocol to create digests that represents an index in its own context.

### Register the Index

Store the prepared index.

```rust
T::Commitment::set_index(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index,
    &index_digest,
)?;
```

After this:

```text
Index Digest
-> Entry Digests
-> Share Distribution
```

The generated digest becomes the permanent identity of the index i.e., becomes part of commitment state.

Users may now commit to the index.

---

## 🔒 Place an Index Commitment

Placing an index commitment uses the normal `Commitment` trait dispatch.

Simply use the index digest and the digest model will be fetched via `DigestModel` semantics.

```rust
T::Commitment::place_commit(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    amount,
    &Default::default(),
)?;
```

The commitment engine automatically:

* creates the proprietor's index commitment
* distributes value across all entry digests
* creates immutable entry receipts

No manual distribution is required.

---

## 🔍 Inspect Indexes and Entries

Query the current aggregate value.

```rust
T::Commitment::get_index_value(
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
)?;
```

To inspect one proprietor's position:

```rust
T::Commitment::get_index_value_for(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
)?;
```

Both values are resolved lazily from the current state of the underlying entry digests.

To inspect the current value of an individual entry.

```rust
T::Commitment::get_entry_value(
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    &btc_digest,
)?;
```

Or inspect one proprietor's extry's exposure.

```rust
T::Commitment::get_entry_value_for(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    &btc_digest,
)?;
```

These APIs expose live values without resolving commitments and RPC compatible.

Additionally an entry's variant can be inspected via 

```rust
<T::Commitment as IndexVariant<...>>::get_entry_variant(
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    &btc_digest,
)?;
```

---

## 📈 Raise an Index Commitment

Increasing an index commitment is identical to direct commitments.

```rust
T::Commitment::raise_commit(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    amount,
)?;
```

The engine automatically:

* locates the existing index commitment
* distributes the additional value using the stored shares
* creates new immutable receipts

The original index configuration is reused automatically.

---

## 🆔 Update Entry Digests

Entry digests continue behaving exactly like ordinary digests.

Your usage pallet may reward or penalize them independently.

```rust
T::Commitment::set_digest_value(
    &LocalFreezeReason::Portfolio.into(),
    &btc_digest,
    new_value,
)?;
```

or with variants:

```rust
T::Commitment::set_digest_value_of_variant(
    &LocalFreezeReason::Portfolio.into(),
    &btc_digest,
    position,
    new_value,
    variant,
)?;
```

As entry values evolve:

* proprietor values update
* aggregate index value updates

without modifying receipts.

---

## ⚖️ Update Shares

Indexes are immutable. Changing allocation creates a new index.

Update one entry (default variant) using:

```rust
let new_index_digest = T::Commitment::set_entry_shares(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    &btc_digest,
    new_shares,
)?;
```

Or manually a variant or its share also behave identical

```rust
let new_index_digest = <T::Commitment as IndexVariant<...>>::set_entry_of_variant(
    &who,
    &LocalFreezeReason::Portfolio.into(),
    &index_digest,
    &btc_digest,
    variant,
    Some(new_shares),
)?;
```

The returned digest identifies the newly generated index.

Existing commitments remain attached to the previous index.

---

## 🏁 Resolve an Index Commitment

Resolution uses the normal `Commitment` trait API.

```rust
T::Commitment::resolve_commit(
    &who,
    &LocalFreezeReason::Portfolio.into(),
)?;
```

Internally the engine:

* resolves every entry receipt
* aggregates final values
* settles issuance and reaping
* transfers fungible assets

Only one call is required from the usage pallet.

---

## 📌 Complete Lifecycle

```text
Index
-> prepare_index()
-> gen_index_digest()
-> set_index()
-> place_commit()
-> entry digests evolve
-> raise_commit()
-> resolve_commit()
```

The usage pallet interacts with one index commitment.

The commitment engine manages all underlying entry commitments transparently.

---

## 🚀 Next Step

Indexes provide immutable grouped commitments.

The next step is integrating managed commitment pools, where allocations can evolve over time.

👉 **Usage -> [Integrating Pools](./pool.md)**

