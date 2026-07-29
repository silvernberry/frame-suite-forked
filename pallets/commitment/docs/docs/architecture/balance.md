---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚙️ Balance Engine

The balance layer is the financial execution boundary of `pallet-commitment`.

This is where one of the most important architectural separations exists:

```text
pallet-commitment != balance engine
```

The pallet does **not** implement:

* 📥 deposit logic
* 📤 withdrawal valuation
* 📈 minting rules
* 📉 reaping rules
* 🧾 receipt math
* 🕓 snapshot resolution
* 💰 final asset computation

Instead, all of that is delegated through **pluggable execution**.

```text
pallet-commitment = commitment orchestration

LazyBalance = accounting execution
```

This distinction is fundamental.

| Responsibility     | `pallet-commitment`         | Balance System               |
| ------------------ | --------------------------- | ---------------------------- |
| Ownership          | who owns value              | -                            |
| Routing            | where value belongs         | -                            |
| Execution Timing   | when accounting must happen | -                            |
| Value Evolution    | -                           | how value changes            |
| Receipt Resolution | -                           | how receipts resolve         |
| Final Settlement   | -                           | what final value is returned |


---

## 🧠 Why This Separation Exists

A commitment system must solve two different problems:

* ownership
* accounting

Hardcoding both inside one pallet would make the system rigid and unsafe.

More importantly:

> deposit, withdraw, mint, and reap may require completely different rules across runtimes

and those rules should not be fixed inside `pallet-commitment`.

The goal is:

> modularity + extensibility

**not one permanent financial model**.

#### Examples

Some runtimes may want:

* ♾ unbounded deposits
* 📏 strict min/max deposit limits
* ⏳ withdrawal cooldown periods
* 💸 early withdrawal penalties
* 📈 minting caps
* 📉 controlled reap limits
* 🔒 reserve-only withdrawals
* ⚖ force withdrawal fallback rules

These are balance execution rules, not commitment ownership rules.

### Why Not Extend Each Rule?

Adding separate hooks for:

```text
deposit
withdraw
mint
reap
limits
snapshots
```

creates fragmented and hard-to-maintain architecture.

Instead:

> plug the full balance system

not

> patch individual balance rules

The only requirement is **it must preserve lazy-balance resolution**

As long as that holds, the accounting model can be fully customized.


| Problem Type | Questions | Handled By  |
| -------------| ----------| ------------|
| Ownership Problem | 1. Who owns bonded value?<br/>2. Which digest does it belong to?<br/>3. Is it Direct, Index, or Pool?<br/>4. Who is allowed to resolve it? | `pallet-commitment` |
| Accounting Problem | 1. How does value evolve?<br/>2. How are rewards added?<br/>3. How are penalties removed?<br/>4. How is the final withdrawable value computed? | Plugins respecting to `frame_suite::assets`'s `LazyBalance` implementation in `pallet-commitment` |


This is balance architecture.

---

## 🧩 Plugin-Based Execution

Balance execution is not hardcoded.

It is resolved through the plugin system.

```text
behavior = plugin contract

execution = plugin resolution
```

**not**

```text
behavior = pallet implementation
```

The pallet only forwards execution into the configured balance model via  [`Config` trait](../getting-started/config.md).

This allows:

* reusable commitment logic
* runtime-controlled accounting behavior
* different balance strategies using the same pallet

The commitment system stays stable. Only the accounting execution changes.

| Responsibility Area  | `pallet-commitment` | Balance System |
| -------------------- | --------------------| ---------------|
| Lifecycle  | 📥 `place_commit()`<br/>📈 `raise_commit()`<br/>📤 `resolve_commit()`  | 💰 `deposit()`<br/>📤 `withdraw()`<br/>📈 `mint()`<br/>📉 `reap()`<br/>🧹 `drain()`  |
| Structures  | 🆔 digests<br/>🧺 indexes<br/>🏊 pools | 🧾 receipt valuation<br/>🕓 snapshot resolution |
| Ownership | 👤 who owns commitments<br/>📍 where receipts belong<br/>🔗 grouped commitment identity | ⚖ proportional redemption<br/>💰 final claim value |
| Validation  | 🏦 reserve preparation<br/>🎛 polite / force funding behavior  | ✅ deposit feasibility<br/>📤 withdrawal feasibility<br/>📈 minting bounds<br/>📉 reaping bounds |
| Imbalance | 📈 pending issue<br/>📉 pending reap | ⚖ enforces issue / reap adjustments |
| Limits  | 📏 consumes limits during validation | 📏 defines min/max deposits and safe operational thresholds  |
| Final Responsibility | ⏰ decides **when accounting happens**  | ⚙ decides **how value changes** |

---

## 🧾 The Lazy Balance Model

The accounting model used by `pallet-commitment` comes from `LazyBalance` in `frame_suite::assets`.

It is built on three core objects:

- 💰 Balance
- 🧾 Receipt
- 🕓 SnapShot

Everything else derives from these. 

### 💰 Balance

Balance is the canonical **mutable state**. It is the real economic value of a **digest**.

It receives all direct updates:

* 📥 deposit
* 📈 mint
* 📉 reap
* 🧹 drain
* 🧺 grouped redistribution

```text
Digest -> Balance
```

This is the source of truth.

Receipts do not store final value. Balance does. 

### 🧾 Receipt

A receipt is created during deposit.

```text
deposit() -> issue receipt
```

It represents:

* ownership claim
* entitlement over deposited value
* the right to redeem later

It does **not** store **final withdrawable value**.

Because final value is computed only during withdrawal as receipts are immutable.

They never update when balance changes. 

### 🕓 SnapShot

SnapShot is the time-indexed projection of balance state.

It preserves historical balance information.

This allows:

```text
past state -> present resolution
```

and enables:

* proportional redemption
* deferred settlement
* deterministic final value
* correct lazy withdrawal resolution

---

## ⚡ Correct Execution Flow

This is the actual balance flow.

### Step 1 - Deposit

A user places a commitment.

Example:

```text
Alice commits 100
```

The pallet:

* validates ownership
* selects digest
* routes commitment

Then the balance system executes:

```rust
deposit()
```

This:

* places value into digest balance
* creates a receipt
* returns effective committed value

```text
Alice owns a receipt

not a fixed future balance
```

### Step 2 - Digest Evolves

Later, protocol events happen i.e., *usage pallets* modify digest state.

Example:

```text
validator earns rewards

or

validator gets slashed
```

The balance system executes:

```rust
mint()
// or
reap()
```

This updates **digest balance only**. No receipts are updated.

No user records change. Only shared balance state changes.

### Step 3 - Resolution

When Alice resolves:

```text
resolve_commit()
```

the pallet:

* verifies ownership
* loads stored receipt
* routes to correct digest model and its balance

Then the balance system executes:

```rust
withdraw(receipt, mut balance)
```

This computes **final redeemable value**

using:

* current digest balance
* receipt proportion
* historical reference state

Then final settlement occurs. This is lazy resolution.

---

## 🧩 Virtual Structure Architecture

This is similar to virtual functions.

```text
virtual functions: choose function implementation at runtime

virtual structures: choose structure implementation outside the pallet
```

Instead of hardcoding:

```rust
struct Balance {
    ...
}
```

the system uses virtual primitives defined in `frame_suite::virtuals` where:

* the structure itself is selected externally
* fields are type-driven
* storage layout is representation-agnostic
* bounds and extensions are attached dynamically

This is not just a normal associated type.

It is not:

> choose one fixed type

It is:

> choose how the structure itself is composed

outside the pallet.

So not only behavior is pluggable, even the balance primitives themselves are virtualized.

```text
plugins choose execution

virtuals choose structure
```

This is what makes `LazyBalance` fully extensible without redesigning the pallet.


## ⚖️ Imbalance Resolution

The balance model itself does not know anything about protocol rewards or penalties.

It only maintains:

```text 
deposit -> receipt

withdraw(receipt) -> final value
```

A receipt is created with an initial deposited value.

Later, when that receipt is resolved, the final withdrawal value may be different.

Example:

```text
initial deposit = 100

final withdrawal = 120
```

```text
initial deposit = 100

final withdrawal = 80
```

The balance system simply computes the final value.

It does not handle how the underlying fungible asset supply should be corrected.

That responsibility belongs to `pallet-commitment`.

If:

```text
withdraw > deposit
```

the pallet records pending minting using `AssetToIssue` Storage Value.

If:

```text 
deposit > withdraw
```

the pallet records pending burning using `AssetToReap` Storage Value.

---

## 🎛 Dispatch Policy

Balance execution uses:

```rust
type DispatchPolicy = (Precision, Fortitude)
```

This controls how operations are allowed to execute.

### Precision

#### `Exact`

- Must execute exact requested value.
- Failure means failure.
- Used for strict protocol correctness.

#### `BestEffort`

- Partial execution is allowed.
- Used when bounded flexibility is safe.

### Fortitude

#### `Polite`

- Use only prepared reserve funding.
- Native `PrepareForCommit` reserve only
- Strict and predictable.

#### `Force`

- If reserve is insufficient fallback to free balance is allowed.
- Useful for runtime-controlled flexibility.
- This is especially important for native reserve integration.

---

# 📏 Limits

Every commitment operation is a financial operation.

It cannot be unbounded.

The balance system provides safe operational bounds for:

* minimum deposits
* maximum deposits
* minting limits
* reaping limits
* safe execution thresholds

Validation always respects these bounds.

The pallet consumes these limits. It does not define them.

---

## 🛡 Core Invariants

The balance architecture guarantees:

* 🧾 receipts are immutable
* ⚡ resolution is always lazy
* 💰 balance remains canonical
* 🕓 snapshots preserve history
* ⚖ imbalance is eventually settled
* 🚫 no eager receipt mutation
* 🔒 ownership and accounting stay separated

If these break: **the economic model breaks**

This is the most critical boundary in the entire pallet.

---

## 📌 In One Sentence

> Commitment controls ownership.
> Balance controls economics.

or more precisely:

```text
pallet-commitment = economic coordinator

LazyBalance = accounting execution
```
---

## 🚀 Next Step

Now we move from financial execution into semantic commitment positions.

This is where the same digest can represent opposite economic meanings like:

```text
long / short

yes / no

for / against
```

without changing the commitment engine itself.

👉 **Architecture -> [Variants](./variants.md)**
