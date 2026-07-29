---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🚀 Integrating Commitments

After installation and configuration, the next step is using `pallet-commitment` inside your own pallet.

This is where your pallet becomes a **usage pallet**.

Examples:

* 🏛 staking pallet
* 🗳 governance pallet
* 💰 lending pallet
* 🤝 escrow pallet
* 📜 contracts pallet

Your pallet defines:

* 🎯 why commitments exist
* 🆔 what the digest represents
* ⚖️ what positions mean
* 🔒 which freeze reasons are used

while `pallet-commitment` provides:

* 🧾 ownership
* 🆔 digest accounting
* 🕒 lazy resolution
* 🧺 index + 🏊 pool support

---

## 🧠 Coupling Models

There are two recommended ways to integrate Commitment.

### Tight Coupling

Directly import `pallet_commitment::Pallet` and use Commitment traits.

Example:

```rust
use pallet_commitment::Pallet as Commitment;
use frame_suite::commitment::traits::*;
````

Then call traits directly:

```rust
Commitment::<T>::place_commit(...)
```

where `T` is the runtime type implementing the pallet's `Config` trait.

Best for:

* internal pallets
* runtime-owned protocol pallets
* tightly integrated systems

### Loose Coupling (Recommended)

Use trait adapters through your pallet `Config`.

Example:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type MyCommitment: Commitment<Self::AccountId>;
}
```

Then call:

```rust
T::MyCommitment::place_commit(...)
```

and wire the adapter in runtime:

```rust
impl pallet_x::Config for Runtime {
    type Commitment = pallet_commitment::Pallet<Runtime>;
}
```

This keeps your pallet reusable and decoupled.

Recommended for production architecture.

---

## 🧊 Local Freeze Reason

Inside your usage pallet:

```rust
#[pallet::composite_enum]
pub enum LocalFreezeReason {
    StakeCommit,
    GovernanceDeposit,
}
```

This is your pallet-local reason system. Each usage pallet can have its own reason variants 
and shall not be leaked (unless tightly integrated).

Then hook pallet config:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type RuntimeFreezeReason: From<LocalFreezeReason>;
}
```

This allows:

```rust
LocalFreezeReason::StakeCommit.into()
```

to convert into the global runtime freeze reason.

This is how your pallet safely uses its own local reasons across commitment boundary 
towards `pallet_commitment`'s expected reason enum.

---

## 🆔 Digest Accounts

Commitment requires

```rust
type Digest = frame_system::Config::AccountId
```

Usually this represents:

* validator account
* proposal account
* vault account
* contract account

This becomes the shared economic anchor. 

This is usage pallet-specific with the only hard-requirement of 
it being a valid account address.

---

## 🔒 Place a Commitment

All commitment related operations are called via traits only defined in `frame_suite::commitment`.

Now commit funds:

In case of `Config` type (loosely coupled)

```rust
T::MyCommitment::place_commit(
    &who,   // proprietor
    amount, // value locked
    LocalFreezeReason::StakeCommit.into(), // coverted local freeze-reason
    digest, // to commit digest 
)?;
```

In case of other type `T` implementing or tightly coupled `pallet_commitment::Pallet<T> = T`

```rust
<T as frame_suite::Commitment<...>>::place_commit(
    &who,
    amount,
    LocalFreezeReason::StakeCommit.into(),
    digest,
)?;
```

This issues the first immutable receipt for the proprietor's commitment.

Until it is resolved using `resolve_commit()`, the proprietor cannot place another commitment for the same freeze reason.

However, they can still:

* 📈 `raise_commit()` on the existing commitment for that same reason
* 🆕 place a new commitment under a different freeze reason

This preserves the core invariant:

```text
(Proprietor, Reason) -> one active commitment
```

### Check Commit Value

Query the active value:

```rust
T::MyCommitment::get_commit_value(
    &who,
    LocalFreezeReason::StakeCommit.into(),
)?;
```

This returns **current value**, not *original deposit*

---

## 🏷️ Use Different Reasons

You can use another reason:

```rust
LocalFreezeReason::GovernanceDeposit.into() // Local Reason to Commit Reason Converted
```

and place another commitment.

Each reason creates:

```text
(Proprietor, Reason) -> one commitment
```

This allows multiple protocol commitments safely.

---

## 🎯 Use Variants

Now commit using a specific variant.

Example:

```rust
let position = Disposition::Affirmative;
```

```rust
impl pallet_commitment::Config for Runtime {
    type Position = frame_suite::Disposition;
}
```

or in case of custom positions

```rust
impl pallet_commitment::Config for Runtime {
    type Position = MyPosition;
}

pub enum MyPosition {
    Happy,
    Sad
}

impl frame_suite::PositionIndex for MyPosition { ... }
```

and associated type equality to use the same position here in our **usage pallet**

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type MyCommitment: Commitment<Self::AccountId, Position = MyPosition>;
    //                                             ^^^^^^^^^^^^^^^^^^^^^
}
```

Then place:

```rust
T::MyCommitment::place_commit_of_variant(
    &who,
    amount,
    LocalFreezeReason::StakeCommit.into(),
    digest,
    MyPosition::Happy,
)?;
```

Now the commitment belongs to:

```text
digest + variant
```

instead of only digest. Then query again using `get_commit_value(...)`.

---

## 📈 Raise the Commitment

Increase the same existing commitment:

```rust
T::MyCommitment::raise_commit(
    &who,
    more_amount,
    LocalFreezeReason::StakeCommit.into(),
)?;
```

`raise_commit()` automatically finds the existing:

* 🆔 digest
* ⚖️ variant (if variant-based)

for that `(Proprietor, Reason)` commitment and adds more value to it.

You do not provide the digest or variant again.

It creates an additional **new immutable receipt**, without mutating old receipts.

This preserves:

> same commitment identity + new receipt history

Then query `get_commit_value(...)` and the active value increases.

---

## ⚖️ Mutate Digest Balance (Reward / Penalty)

Now simulate digest value changes.

#### First check current digest value

If using variants:

```rust
T::MyCommitment::get_digest_value_variant(
    digest,
    position,
)?;
````

If not using variants:

```rust
T::MyCommitment::get_digest_value(
    digest,
)?;
```

This uses the default / no-op variant internally.

#### Now update the digest value

```rust
T::MyCommitment::set_digest_of_variant(
    digest,
    position,
    new_value,
)?;
```

or without variants:

```rust
T::MyCommitment::set_digest(
    digest,
    new_value,
)?;
```

If:

```text
new_value > existing_value
```

this behaves like a reward.

If:

```text
new_value < existing_value
```

this behaves like a penalty / slash.

This changes **digest value**, not *receipts*, as receipts remain immutable.

#### Query Active Value Again

Now check `get_commit_value(...)`

You will see **commitment value changed**, even though receipts never changed.

> This is lazy resolution.

---

## 🌍 Global Values

### Reason

Now query:

```rust
T::MyCommitment::get_total_value(
    LocalFreezeReason::StakeCommit.into()
)?;
```

This gives **total committed value for that freeze reason**

Very useful for protocol-wide accounting.

### Issuance & Reap

When digest value increases (for example: rewards), the commitment value becomes larger than the original deposited amount.

Later a related-commitment during resolution:

```text 
withdraw > deposit
```

which means new assets must be issued.

But this must already be accounted for when the digest changes, not only during `resolve_commit()`.

That is why Commitment tracks `AssetToIssue` Storage Value.

This stores **pending fungible issuance** needed to keep accounting equilibrium with the underlying asset system.

It tells the runtime:

> how much asset supply must eventually be issued during final resolution

This keeps the system balanced:

```text
  Commitment Issue
+ Fungible Total Issuance
- Commitment Reap
----------------------
= Total Asset Units
----------------------
```
Similarly, if digest value decreases then excess assets must eventually be removed via `AssetToReap`

```rust
let to_be_reaped = pallet_commitment::AssetToReap::get();
let to_be_issued = pallet_commitment::AssetToIssue::get();
```

These ensure deferred balance resolution remains economically correct.

---

## 🏁 Resolve Commitment

Now to resolve:

```rust
T::MyCommitment::resolve_commit(
    &who,
    LocalFreezeReason::StakeCommit.into(),
)?;
```

This performs:

* 🧾 receipt resolution
* ⚖️ final settlement
* ➕ pending issuance
* 💸 asset transfer

Now check underlying fungible balance.

You will receive:

```text
committed amount + reward
```

This is final lazy settlement.

### Check Equillibrium

After:

```text
commit
-> increase digest value
-> resolve_commit()
```

the pending issuance (as digest mints) is no longer stored inside commitment.

It has now been transferred into the underlying fungible asset system from `AssetToIssue`, 
because the pending issuance has been fully settled during resolution.

The reward is now part of real fungible balance and total issuance.

---

## 📌 Comprehensive Lifecycle

```text
place_commit()
-> receipt created

digest evolves
-> value changes

resolve_commit()
-> truth becomes fungible balance
```

---

## 🚀 Next Step

Now that direct commitments, variants, digest mutation, and resolution are complete, the next step is building grouped commitment structures.

This is where one commitment can safely control multiple underlying digests through weighted distribution.

👉 **Usage -> [Integrating Indexes](./indexes.md)**