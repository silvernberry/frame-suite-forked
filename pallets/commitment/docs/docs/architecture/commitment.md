---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🪨 Commitment (Base)

The `Commitment` trait from `frame_suite::commitment` is the foundation of `pallet-commitment`.

Everything else:

* 🧺 indexes
* 🏊 pools
* ⚖ variants

builds on top of this base layer.

Before understanding grouped commitments, you must understand the atomic primitive:

```text
Commitment = asset + reason + digest
```

This is the true center of the pallet.

---

## 🧠 The Three Foundation Traits

The base commitment system is built from three traits:

| Trait | Responsibility |
|---|---|
| `InspectAsset` | inspect available funds |
| `DigestModel` | determine whether a digest is Direct / Index / Pool |
| `Commitment` | full commitment lifecycle |

These form the minimum operational foundation of the pallet.

### `InspectAsset`

This trait answers:

> how much can this proprietor safely commit?

It combines:

- liquid reducible balance
- optionally held reserve (`PrepareForCommit`)

into one validation layer.

| Method | Purpose |
|---|---|
| `available_funds(who)-> value` | total funds available for commitment |

### `DigestModel`

All digests use the same base type:

```rust
type Digest = AccountId
```

So the pallet must determine whether a digest is:

* Direct
* Index
* Pool

This trait wraps raw digests into `DigestVariant` and removes that ambiguity.

| Method                             | Purpose               |
| ---------------------------------- | --------------------- |
| `determine_digest(digest, reason)-> model` | classify digest model |

### `Commitment`

This is the main lifecycle trait, where the invariant is enforced here:

```text
(Proprietor, Reason) -> one commitment
```

The base `Commitment` trait is the real center of the pallet.

It controls:

```text 
Place -> Raise -> Mutate -> Resolve
```

and owns:

* ✅ validation
* 👤 ownership
* 🔗 digest binding
* 🧾 receipt tracking
* ⚖️ final settlement

| Key Methods | Purpose |
|---|---|
| `place_commit(who, reason, digest, value, intent)` | Creates the first commitment by bonding funds, depositing into the digest, and storing the first receipt |
| `raise_commit(who, reason, value, intent)` | Adds more value to an existing commitment by creating a new immutable receipt |
| `resolve_commit(who, reason)` | Final settlement of the commitment resolves accumulated receipts, applies mint/reap imbalance, and returns final asset value |
|`get_commit_value(who, reason)` | Returns the real-time live value of a proprietor's commitment after all digest updates |


---

## ️🏷️ Core Types

The pallet defines several important aliases and structures.

These are not cosmetic aliases. They define the actual architecture.

### Proprietor

```rust
type Proprietor = AccountId
```

The account that owns the commitment.

This account can:

* place (deposit)
* raise (increase)
* resolve (withdraw)

commitments. 

### Digest

```rust
type Digest = AccountId
```

This is the most important architectural detail:

#### Digest is represented using `AccountId`

All digest models use the same base type:

* 🎯 `DirectDigest` (single direct commitment target)
* 🧺 `IndexDigest` (grouped weighted commitment target)
* 🏊 `Pool-Digest` (manager-controlled pooled target)
* 📦 `EntryDigest` (individual digest inside an index)
* 🎰 `SlotDigest` (pool allocation slot digest)

are aliases of the same digest type. This is exactly why `DigestModel` trait exists.

Without it, the pallet could not distinguish:

```text
is this digest direct?
or an index?
or a pool?
```

### Digest Source

```rust
type DigestSource = AccountId
```

Digests can be **optionally** generated deterministically from the calling source using **the account nonce**.

This means:

* the caller provides the source identity
* the pallet uses the account nonce for deterministic generation
* the resulting digest is still an `AccountId` (by type)

This makes digests behave much like smart-contract addresses.

### Reason

```rust
type CommitReason<T>
```

This is usually the runtime composite freeze reason enum:

```rust
RuntimeFreezeReason
LockReason
```

Examples:

* Staking
* Governance
* Escrow
* LendingCollateral

Reason answers:

> why is this commitment being created? 

### Intent

```rust
type Intent = DispatchPolicy
```

This controls how commitment operations handle balance deductions and settlement:

- **Precision**
  - `Exact`: the full requested value must be committed
  - `BestEffort`: commit as much as safely available if full value is not possible

- **Fortitude**
  - `Polite`: use only prepared reserve/held funds
  - `Force`: allow fallback to liquid balance if reserve is insufficient

This makes commitment execution strict, predictable, and safe.

### Commit Instance

```rust
type CommitInstance<T> = VirtualReceipt<T>
```

This is extremely important:

#### commitments are stored as receipts

- Each deposit creates an immutable receipt.
- Raising a commitment does NOT mutate the old one.
- It creates another immutable commit instance.
- These are later aggregated during resolution. 

### Lazy Balance

```rust
type LazyBalanceOf<T> = VirtualBalance<T>
```

Digest balances are not eagerly settled balances.

They are [plugin-driven virtual balances](./balance.md) resolved lazily through receipts. 

#### Have You Noticed?

```rust
type CommitInstance<T> = VirtualReceipt<T>

type LazyBalanceOf<T> = VirtualBalance<T>
```

Both associated types resolve to **virtual structures**.

This means neither the commitment receipt nor the balance model has a concrete structure within `pallet-commitment` itself.

Instead, their representation is deferred to the configured [Balance plugin](../architecture/balance.md).

This is what makes the accounting layer fully pluggable.

Different balance implementations can define entirely different receipt and balance schemas while the Commitment engine continues to operate through the same abstract interfaces.

### Limits

```rust
type Limits = LimitsProduct<T, I>
```

Every commitment operation is a financial operation and cannot be unbounded in intent.

Actions like:

* placing
* raising
* minting
* reaping

must always operate within safe economic boundaries.

That is why limits exist.

These represent:

* minimum deposit bounds
* maximum deposit bounds
* minting limits
* reaping limits

The lazy balance plugin defines these bounds if the balance model requires them, and commitment validation enforces them before execution.

---

## 🗂️ Core Storage

This is where architectural understanding becomes real.

### `CommitMap`

```text
(Proprietor, Reason) -> CommitInfo
```

`CommitInfo` stores:

* ownership
* the bound digest
* variant
* immutable commit receipts

This is the proprietor's commitment record.

`CommitMap` is NOT the balance. It stores ownership + references.

Actual value is resolved lazily through receipts.

### `DigestMap`

```text
(Reason, Digest) -> DigestInfo
```

`DigestInfo` stores:

* shared digest balances
* one lazy balance per semantic variant

This is where protocol-level economic state lives (shared balance / vault).

#### Example

```text
Validator A -> Digest XYZ

-> affirmative balance (150 DOT, 5 commitments)
-> contrary balance (45 DOT, 3 commitments)
```

### `ReasonValue`

```text
Reason -> Total Value
```

Tracks total committed value across all proprietors for one reason.

Examples:

* Total staking value
* Total governance deposits
* Total lending collateral

This supports fast aggregate accounting.

### `AssetToIssue`

Pending rewards to mint into the underlying fungible system.

Used when:

```text
withdraw > deposit
```

### `AssetToReap`

Pending penalties to burn from the underlying fungible system.

Used when:

```text
deposit > withdraw
```

## 🛡️ Core Invariants

The base commitment layer enforces strict rules.

These invariants are what make the pallet safe.

### One Commitment Per Reason

```text
(Proprietor, Reason) -> one commitment
```

This is the most important invariant.

A proprietor cannot create:

```text
two commitments
for same reason
```

This prevents:

* fragmented ownership
* ambiguous resolution
* double accounting
* unsafe lifecycle transitions

If grouping is needed, use indexes or pools. Never multiple direct commitments.

### Commitment Value Can Only Increase

You can:

```rust
place_commit()
raise_commit()
```

but not partially reduce.

Reduction happens only through a complete-exit (resolution) from the reason's commitment:

```rust
resolve_commit()
```

This preserves immutability guarantees. 
The commitment pallet keeps these imbalance maps so resolution can remain lazy.

Instead of immediately minting or burning on every digest mutation, the system records the pending imbalance and settles it during commitment resolution.

This means these values should be understood as:

```text
pending but eventual
```

for the underlying fungible system.

### Digest Is Immutable

Once committed, until resolved:

```text
(Proprietor, Reason) -> Digest
```

does not change.

The commitment target is permanent and only value changes. Never the binding target.

### Commitments Are Receipt-Based

Raising a commitment does not overwrite prior state.

It creates another immutable receipt.

This guarantees:

* historical correctness
* deterministic settlement
* safe lazy resolution

not mutable balance rewriting.

---

## 🔄 Lifecycle Methods

The `Commitment` trait implements the full lifecycle.

The real lifecycle is:

```text
Place -> Raise -> Mutate -> Resolve
```

There is no separate partial withdraw step.

Resolution performs final withdrawal.

### Place

```rust
place_commit()
```

Creates the first commitment.

Flow:

```text
-> validate
-> deduct balance
-> deposit to digest
-> issue receipt
-> store CommitInfo under CommitMap
```

This creates ownership.

### Raise

```rust
raise_commit()
```

Adds value to an existing commitment.

Important:

#### raise does NOT mutate old receipt

It creates a new immutable commit instance.

This is still a deposit (place) operation internally. 

### Mutate

```rust
set_digest_value()
```

or model-specific digest updates.

This changes:

#### shared digest state, not individual receipts.

Examples:

* validator rewards
* validator slashing
* governance penalties
* lending liquidation

Receipts remain unchanged and the Digest value evolves.

This is the core of [lazy resolution](./balance.md).

### Resolve

```rust
resolve_commit()
```

This is the final settlement operation.

Flow:

```text
-> evaluates receipts
-> computes final withdrawable value
-> resolves imbalance
-> mints rewards if needed
-> burns penalties if needed
-> transfers the final asset value back to the proprietor
-> removes finalized commitment state
```

#### Resolution is withdrawal. 

---

## ⚖️ Imbalance Resolution

One of the strongest parts of the pallet.

Handled by internal trait:

```rust
CommitBalance::resolve_imbalance()
```

Rules:

```text
deposit < withdraw -> mint reward

deposit == withdraw -> balanced

deposit > withdraw -> burn penalty
```

This uses:

* `AssetToIssue` (yet to be minted)
* `AssetToReap` (yet to be burned)

plus low-level fungible mint/burn operations.

The commitment pallet keeps these imbalance maps so resolution can remain lazy.

Instead of immediately minting or burning on every digest mutation, the system records the pending imbalance and settles it during commitment resolution.

This means these values should be understood as:

```text
pending but eventual
```

for the underlying fungible system.

This is how the pallet preserves financial correctness **without relying on balanced fungible traits** to give oppurtunity to both
- `pallet-balances` (fully fungible) 
- `pallet-xp` (quasi-fungible)

> You'll see "pending, but eventual" strategies throughout the pallet. Thus classifies pallet-commitment as a lazy execution model.

---

## 🏦 Native Reserve Funding

Commitments usually consume funds from:

```rust
HoldReason::PrepareForCommit
```

This is the native optional reserve.

Flow:

```rust
// With 
Fortitude::Polite

// consumes hold first
place_commit() / raise_commit()
```

only reserve funds are used.

With:

```rust
// With 
Fortitude::Force

// consumes liquid/free balance
place_commit() / raise_commit()
```

liquid balance fallback is allowed. 

This is how safe and effective native funding is enforced.

---

## 🚀 Next Step

Now we move from the base commitment lifecycle into grouped commitment structures.

This is where one commitment can safely distribute value across many digests using weighted ownership.

👉 **Architecture -> [Indexes](./indexes.md)**