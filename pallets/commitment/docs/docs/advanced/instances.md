---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🪞 Instances

`pallet-commitment` supports **multiple independent instances** within the same runtime.

This is achieved through the generic instance parameter on its configuration trait:

```rust
pallet_commitment::Config<I> where I: 'static
```

where `I` requires a marker-struct that identifies a particular Commitment instance.

Each instance has its own:

* storage
* configuration
* balance plugin
* reserve hold reason
* freeze reason
* limits
* accounting behavior

This allows multiple commitment engines to coexist inside one runtime without sharing state.

---

## 🧩 Why Use Multiple Instances?

Most runtimes only need **one** Commitment instance.

Multiple consumer pallets can safely share it.

Example:

```text
Staking
      \
Governance ----> Commitment
      /
 Lending
```

All pallets reuse the same commitment engine while keeping their own commitment reasons and digest semantics.

Sometimes, however, different protocols require completely different commitment behavior.

For example:

| Protocol | Requirement |
|----------|-------------|
| Native Staking | Share-based lazy accounting |
| Prediction Markets | Fixed settlement model |
| Treasury Escrow | No variants |
| Managed Vaults | Different scalars configuration |

Rather than forcing one configuration to fit every protocol, each protocol can use its own Commitment instance.

---

## ⚙️ How It Works

Instead of:

```rust
impl pallet_commitment::Config for Runtime { ... }
```

define multiple instances:

```rust
pub struct NativeStake;
pub struct Markets;
pub struct Treasury;

impl pallet_commitment::Config<NativeStake> for Runtime { ... }

impl pallet_commitment::Config<Markets> for Runtime { ... }

impl pallet_commitment::Config<Treasury> for Runtime { ... }
```

Each becomes an independent commitment engine.

```text
NativeStake != Markets != Treasury
```

They do not share storage or configuration.

---

## 🎛️ Independent Configuration

Every instance may choose its own [configuration](../getting-started/config.md).

For example:

* `BalanceFamily`
* `BalanceContext`
* `Asset`
* `Position`
* `MaxCommits`
* `MaxIndexEntries`
* `EmitEvents`

One instance may support pools while another disables them entirely.

One may use share-based accounting while another uses a completely different Lazy Balance plugin.

---

## 🗄️ Separate Storage

Every instance owns its own storage namespace.

For example:

```text
CommitMap<NativeStake> ≠ CommitMap<Markets>
```

The same applies to every storage item:

* `CommitMap`
* `DigestMap`
* `EntryMap`
* `IndexMap`
* `PoolMap`
* `ReasonValue`
* `AssetToIssue`
* `AssetToReap`

Commitments created in one instance are completely isolated from every other instance.

---

## 🚫 When NOT to Use Instances

Do **not** create multiple instances simply because multiple pallets use Commitment.

If all consumer pallets can share:

* the same accounting model
* the same balance plugin
* the same limits
* the same commitment behavior

then a single Commitment instance is the recommended architecture.

Different consumer pallets can still define:

* different commitment reasons
* different digest meanings
* different variants

without requiring separate instances.

---

## ✅ When to Use Instances

Create multiple instances only when the question is:

> "Should these protocols behave as different commitment engines?"

If the answer is **yes**, use multiple instances.

Otherwise, share one instance across all consumer pallets.

---

## 📌 In One Sentence

> Commitment instances allow multiple independent commitment engines to coexist within the same runtime, each with its own storage, configuration, and accounting model.

---

## 🚀 Next Step

The next section covers benchmarking and weight generation for commitment operations.

👉 **Advanced -> [Weights](./weights.md)**