---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🧺 Indexes

Indexes are the second major architecture layer after Digests i.e., A Direct Digest.

If Digest is:

> single economic state anchor

then Index is:

> a grouped digest structure with weighted ownership

It allows one commitment to safely distribute value across many digests.

This is used for:

- 🏛 staking baskets
- ⚖️ weighted validators
- 🗳 grouped governance targets
- 📈 portfolio commitments
- 🔄 distributed protocol positions

---

## 🎯 What an Index Really Is

An Index is 

- not balance.
- not ownership.
- not a commitment.

An Index is:

> an indirect or a pointer digest

that points to multiple underlying digests using shares.

```text
Index Digest -> Entry Digests -> Real economic balances
```

The index itself is still a digest:

```rust
type IndexDigest = Digest
```

which means:

```rust
type IndexDigest = AccountId
```

It behaves like a digest, but **internally distributes across entries**.

### Example

Instead of:

```text
Alice -> Validator A
```

we now support:

```text
Alice -> Validator Basket
             |-- A (40%)
             |-- B (35%)
             |-- C (25%)
```

Alice commits only once.

The pallet distributes across all entry digests.

---

## 🧩 The `CommitIndex` Trait

This trait defines all index operations.

```rust
impl CommitIndex<Proprietor<T>> for pallet_commitment::Pallet<T, I> { ... }
```

It extends commitment behavior (`Commitment` trait) from:

> single digest

to

> digest collection with weighted shares

This is the architecture boundary between direct commitments and grouped commitments. 

### Key Methods

| Key Methods | Purpose |
|---|---|
| `index_exists(reason, index_of)` | Verifies that an index digest is registered and available for grouped commitments |
| `get_index(reason, index_of)` | Returns the complete `IndexInfo`, including entries, shares, variants, and internal structure |
| `get_index_value(reason, index_of)` | Calculates the current live aggregate value of the index by summing all underlying real-time entry digest values |
| `prepare_index(who, reason, entries)` | Validates and constructs an immutable index structure `IndexInfo` from `(digest, shares)` entry pairs |
| `gen_index_digest(from, reason, index)` | Generates a deterministic unique digest that represents the prepared index structure |
| `set_index(who, reason, index, digest)` | Registers the prepared index under its digest and makes it usable inside the commitment system |
| `set_entry_shares(who, reason, index_of, entry_of, shares)` | Updates one entry's share allocation by rebuilding the index and producing a new index digest |
| `reap_index(reason, index_of)` | Permanently removes an index when no active commitments or remaining balances exist |

These are the primary methods that define the index lifecycle.

---

## 🏷️ Core Types

### Index Digest

```rust
type IndexDigest = Digest
```

The identifier of the index itself.

This is what users commit to.

### Entry Digest

```rust
type EntryDigest = Digest
```

The underlying digest inside the index.

This is where actual lazy balances live.

### Shares

```rust 
type Shares = Config::Shares
```

Compile-time configured weighted ownership unit (unsigned integer).

Used to determine proportional allocation.

Examples:

* 100 shares total
* A = 40
* B = 35
* C = 25

Shares are converted safely into asset math. 

### `EntryInfo`

Every entry inside an index is represented by `EntryInfo` structure.

It stores:

- entry digest
- shares
- semantic variant

This means an entry can point to:

```text
Digest + Variant + Share Weight
```

not just digest alone.

Example:

```text
Validator A
-> Positive Variant
-> 40 Shares
```

This makes indexes variant-aware via `IndexVariant` trait dispatch as `CommitIndex` takes in a default variant as fallback.

### `IndexInfo`

This is the main index structure.

It stores the full index definition including:

* index digest
* bounded entries collection
* share totals
* internal invariant checks

Think of it as:

```text
Index = digest registry + allocation rules
```

It does not store user ownership.

It stores index topology.

---

## 🗂️ Storage Maps

Indexes require multiple maps.

This is where most people get confused.

### `IndexMap`

```text
(Reason, IndexDigest) -> IndexInfo
```

This stores:

```text
what the index IS
```

Meaning:

* which entries exist
* what shares they have
* what variants they use

This is structure storage.

Not user ownership or balance depots.

### `EntryMap`

```text
(Reason, IndexDigest, EntryDigest, Proprietor) -> Commits
```

This stores:

> what a specific user owns, inside each entry

This is extremely important.

Because resolving an index requires per-entry receipts. Not just one top-level receipt.

So every deposit creates:

```text
many receipts
```

one for each entry digest and those receipts are stored here. 

### `CommitMap`

```text
(Proprietor, Reason) -> CommitInfo
```

This still exists as seen in [Base Commitment](./commitment.md). It points to the Index Digest, not the entry digests.

This is the user's top-level commitment identity and thus the **one commitment per reason** invariant is achieved.

---


## 🔄 Deposit Flow

#### User calls via `Commitment`

```rust
place_commit(.., index_digest, ..)
```

#### System determines

```rust
DigestVariant::Index(...)
```

using:

```rust
DigestModel::determine_digest(...)
```

#### Then Internal Helpers call

```rust
CommitDeposit::deposit_to_index(...)
// or its equivalent function
```

### Internal flow

```text
-> read IndexInfo
-> iterate entries
-> split value using shares
-> deposit into each entry digest
-> create one receipt per entry
-> store receipts in EntryMap
-> save top-level CommitMap (placeholder)
```

- This is not one deposit.
- It is many coordinated deposits.

---

## 🛡 Index Invariants

Indexes preserve strict invariants to keep grouped commitments safe and deterministic.

This includes:

* 🧱 stable index per digest
* 📦 bounded entries
* 🆔 unique digests
* 🚫 no duplicate entries
* ⚖️ valid non-zero shares
* 🧮 safe share totals
* 🎯 stable variants
* 🧾 immutable receipts
* ⚡ lazy resolution via entries
* 🧹 reap only when empty


These invariants ensure that deposits, resolution, ownership tracking, and final settlement remain economically correct.

### ⚡ Lazy Resolution of Indexes

Exactly like digest architecture:

> receipts are immutable

but

> entry digests change (mutate)

Example:

```text
Alice commits to index (A, B, C)

A gets rewards
B gets slashed
C stays neutral
```

When Alice resolves:

```text
withdraw from all entries
-> aggregate final result
-> return one final amount
```

She never updates manually and the system resolves [lazily](./balance.md) during commit-resolution.

This is why indexes are composable.

### 🧮 Why `EntryMap` Exists

This is one of the most misunderstood parts of index architecture.

A common question is:

> Why not store only one index-level receipt?

Because:

```text
the index itself has no real balance
```

It is only a grouped digest structure.

The actual committed value lives inside:

```text
entry digests
```

Each entry digest holds its own lazy balance and evolves independently.

That means final resolution must happen from:

```text
every underlying digest
```

which requires:

```text
every underlying receipt
```

That is why:

```text
EntryMap is mandatory
```

Every deposit into an index creates multiple receipts:

```text
one receipt per entry digest
```

and those are stored inside `EntryMap`.

### 🧠 Why `CommitMap` Still Exists

Even though actual commit instances live in `EntryMap`, `CommitMap` still matters.

```text
(Proprietor, Reason) -> CommitInfo
```

stores the top-level ownership identity.

It points to the Index Digest, not the entry digests.

This is how indexes safely build on top of the base commitment invariant:

```text
one proprietor -> one commitment per reason
```

Instead of creating many direct commitments, ownership remains singular at the index level, while actual receipts are distributed indirectly across many entry digests.

That indirection is what makes grouped commitments possible.

### 🧱 Indexes Are Immutable

Once an index is created, it cannot be modified in place.

This guarantees:

* stable receipt resolution
* deterministic ownership tracking
* safe lazy balance evaluation
* upgrade-safe invariant preservation

Receipts depend on index structure remaining stable.

If the structure changed directly, old receipts could become invalid.

Immutability prevents that.

### 🛡 What Index Construction Enforces

Every index must satisfy:

* bounded entries
* deterministic uniqueness
* non-zero valid shares
* safe share totals
* stable semantic variants

This ensures the index remains safe for:

```text
deposit
resolve
reap
live value inspection
```

throughout its full lifecycle.

That is why fields remain private and mutation only happens through controlled methods.

### 🔄 Changing an Entry Creates a New Index

If an entry must change, the old index is never mutated.

Instead:

```text
set_entry_shares()
-> rebuild index
-> generate new index digest
```

This creates a completely new index digest.

The previous index remains valid and continues serving all existing commitments until they are resolved and reaped.

This preserves safety for historical receipts.

### 🧹 Reaping an Index

An index can only be removed when:

> no active commitments and no remaining funds

exist.

Only then can `reap_index()` safely delete it.

This prevents accidental destruction of active economic state.

### 🏊 Why Pools Exist

Indexes are designed for deterministic grouped structure.

They are not built for active live management.

For continuously changing allocation strategies:

> indexes are too strict

That is why pools exist.

```text
Index = immutable grouped structure

Pool = managed dynamic allocation
```

- [Pools](./pools.md) support manager-controlled reallocation.
- Indexes preserve strict invariant safety.

Both exist for different purposes.

But Both provides non-custodial solutions, one is rigid another is delegatable.

---

## 📌 In One Sentence

> An Index is an indirect digest that distributes one commitment across many digests using weighted shares.

Digest is one state.

Index is orchestrated multi-state commitment internally.

---

## 🚀 Next Step

Where indexes become manager-controlled dynamic allocation systems with commissions.


👉 **Architecture -> [Pools](./pools.md)**

