---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚙️ Configuration

After installing `pallet-commitment`, the next step is configuring how commitments behave inside your runtime.

This is where the pallet becomes runtime-specific.

The pallet itself only provides:

* 🧾 commitment ownership
* 🆔 digest management
* 🧺 index + pool structures
* ⚖️ variant-aware positions
* 🕒 lazy resolution flow

Your runtime defines:

* 💰 which fungible asset is used
* 🎯 what positions/variants mean
* ⚙️ how lazy balance resolution works
* 📏 system limits and bounds
* 🔒 hold / freeze reasons
* 🧭 commitment behavior boundaries

This is done through the pallet's `Config` trait.

### 🧠 Configuration Philosophy

`pallet-commitment` is **execution infrastructure**, not business logic

That means:

```text
pallet-commitment handles:
ownership + digest orchestration

your runtime handles:
asset semantics + accounting behavior
```

This separation is one of the strongest architectural decisions in the pallet.

---

## ⚙️ `Config` Trait

The runtime configures Commitment through:

```rust
impl pallet_commitment::Config for Runtime {
    ...
}
```

A production-safe default setup (from the mock runtime) looks like this:

```rust
impl pallet_commitment::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;

    // Core scalar types
    type Shares = u32;
    type Bias = FixedU64;
    type Time = u32;
    type Commission = Perbill;

    // Fungible asset backend
    type Asset = Xp;
    // or (use either one)
    type Asset = Balances;

    // Runtime semantic enums
    type Position = frame_suite::Disposition;
    type AssetHold = RuntimeHoldReason;
    type AssetFreeze = RuntimeFreezeReason;

    // Limits
    type MaxIndexEntries = ConstU32<15>;
    type MaxCommits = ConstU32<5>;

    // Lazy balance engine plugin & environment context
    type BalanceFamily<'a> = frame_plugins::ShareBalanceFamily<'a>;
    type BalanceContext = MyBalanceContext<Commitment>;

    // Weights + events
    type WeightInfo = pallet_commitment::weights::SubstrateWeight<Runtime>;
    type EmitEvents = ConstBool<false>;
}

// For wiring pallet environment to plugin environment
frame_suite::plugin_context!(
    name: pub MyBalanceContext,
    context: frame_plugins::ShareBalanceContext<T>,
    marker: [T],
    value: ShareBalanceContext(PhantomData)
);
```

This is the default recommended setup. It is safe, simple, and production-ready.

---

## 📣 1. RuntimeEvent

```rust
type RuntimeEvent = RuntimeEvent;
```

This connects Commitment events into the global runtime event system.

Without this:

> Commitment events would not exist

This is always required.

---

## 🧮 2. Shares

```rust
type Shares = u32;
```

Used for:

* 🧺 index entry weights
* 🏊 pool slot distributions
* ⚖️ grouped ownership proportions

Example:

```text
Validator A = 40 shares
Validator B = 35 shares
Validator C = 25 shares
```

This defines **ownership topology**, not just percentages.

`u32` is the recommended default.

---

## 📐 3. Bias

```rust
type Bias = FixedU64;
```

Used for:

* ⚖️ proportional resolution
* 🕒 lazy balance math
* 🧾 receipt settlement calculations
* 🔄 digest redistribution logic

This is the precision layer of commitment accounting.

Recommended default:

- `FixedU64` - for stable deterministic runtime math.
- `FixedU128` - for more precise runtime math.

---

## 🕒 4. Time

```rust
type Time = u32;
```

Used for:

* ⏱ commitment timing
* 🏊 pool management windows
* 📏 lifecycle accounting boundaries
* 🕒 time-aware balance resolution

Usually `BlockNumber` i.e., `u32` or a runtime-compatible unsigned integer type.

---

## 💹 5. Commission

```rust
type Commission = Perbill;
```

Used for:

* 💸 pool manager commissions
* 🎛 managed allocation reward models

Example:

```text
5% manager fee
```

Pools use this for delegated commitment management.

Recommended `Perbill` for `1/1_000_000_000` 1 billionth precision for precise runtime-safe percentages.

---

## 💰 6. Asset

```rust
type Asset = pallet_xp::Pallet<Runtime>;
```

or

```rust
type Asset = pallet_balances::Pallet<Runtime>;
```

This is the fungible asset backend used by pallet-commitment.

It handles:

- 💰 reserve
- 🔒 hold
- ➕ issue
- ➖ reap
- ⚖️ settlement execution

> As Commitment does NOT move balances directly. Rather, it delegates that to the configured fungible asset pallet.

### Required Trait Support

The configured `Asset` must implement the required **unbalanced fungible traits** from `frame_support::traits::fungible`:

* `Inspect`: read balances safely
* `Mutate`: modify balances
* `Hold`: reserve funds for commitments
* `Freeze`: runtime balance restrictions
* `Unbalanced`: low-level issue / reap settlement

This allows Commitment to remain **ownership + digest orchestration** 

while the asset backend handles *real fungible balance execution*

---

## 🎯 7. Position

```rust
type Position = frame_suite::Disposition;
```

This defines **commitment variants**

A variant represents *the semantic side of a commitment*

It tells the system:

> which position inside the same digest the commitment belongs to

Examples:

* 📈 Long / Short
* 🗳 Yes / No
* ➕ Positive / Negative
* ⚖️ For / Against / Abstain

`Position` must be an enum implementing `PositionIndex` trait.

This allows the pallet to work using only **variant's index**

Example:

```text
0 = Long
1 = Short
```

while your runtime gives semantic meaning.

Default implementations include:

* `frame_suite::Disposition`
  * `Affirmative`: supportive / positive position
  * `Contrary`: opposing / negative position
  * `Awaiting`: neutral / unresolved position

* `frame_suite::Polarity`
  * `Constructive`: value-building / positive direction
  * `Destructive`: value-reducing / negative direction
  * `Composite`: mixed or combined position
  * `Indeterminate`: undefined or unresolved state

### No Variants Needed?

Use:

```rust 
type Position = frame_suite::Ignore<Commitment>; 
// if Commitment = pallet_commitment::Pallet<Runtime>
```

This gives:

> one digest -> one default position

with no variant separation.

---

## 🔒 8. AssetHold

```rust
type AssetHold = RuntimeHoldReason;
```

This is the runtime composite enum that provides `pallet-commitment`'s native reason `PrepareForCommit` into the runtime
where reserves are held before actual commitment placement.

It is used for:

* 💰 reserve preparation
* 🔒 commitment funding safety
* 🌊 held reserve flows

---

## ❄️ 9. AssetFreeze

```rust
type AssetFreeze = RuntimeFreezeReason;
```

This is the runtime composite enum that provides all pallet freeze reasons into `pallet-commitment`.

It is used for:

* 🧊 freeze-backed commitment safety
* 🔒 runtime-native balance restrictions

This allows the pallet to integrate cleanly with runtime freeze semantics and shared freeze infrastructure across pallets.

---

## 🧺 10. MaxIndexEntries

```rust
type MaxIndexEntries = ConstU32<3>;
```

Defines **maximum digests (entries) inside one index**

This protects:

* 📦 storage bounds
* ⚖️ execution weight
* 📏 deterministic runtime limits

Recommended:

> use strict bounded values.

---

## 📚 11. MaxCommits

```rust
type MaxCommits = ConstU32<3>;
```

Defines **maximum receipts per commitment**

Because:

```text
raise_commit() -> creates new immutable receipt
```

not mutating old ones.

This prevents:

* 📦 storage explosion
* ⚠️ unsafe receipt growth
* ♾️ unbounded resolution complexity

---

## 🔌 12. BalanceFamily

```rust
type BalanceFamily<'a> = ShareBalanceFamily<'a>;
```

This is the most important configurable component.

It defines **how value is actually resolved**

This includes:

* 💸 deposit execution
* 🧾 receipt creation
* ➕➖ mint / reap behavior
* 📤 withdrawal resolution
* 📸 snapshot settlement

This is the pallet's **Lazy Balance** implementation compatible plugin-family (plugins-root).

### Default Balance Plugin

Currently the recommended default is:

```rust
frame_suite::ShareBalanceFamily
```

This plugin provides:

* ⚖️ proportional lazy resolution
* 🧾 receipt-based ownership
* 🆔 digest-backed live value
* 📸 snapshot-aware settlement

It is intentionally **simple + unbounded** and works very well as the default plugin.

Important behavior:

> minting or reaping cannot happen before a deposit exists

which means:

> commit first then mutate digest value

and additionally 

> deposits cannot happen if the balance is fully drained, but minting can revive it

which means:

> revive a once active but now dead balance, before commiting to it again

This keeps accounting safe and deterministic.

For most runtimes, this is exactly what you want.

### Advanced Balance Customization

If you need:

* ➕ custom minting models
* 📏 bounded issuance
* 📤 special withdrawal policies
* 🔄 custom redemption rules
* ⚙️ protocol-specific accounting logic

those belong to **advanced balance plugin customization**

We will cover that later in:

👉 Advanced -> [Balance Plugins](../advanced/balance.md)

---

## 🌐 13. BalanceContext

```rust
type BalanceContext = MyBalanceContext<Commitment>;

frame_suite::plugin_context!(
    name: pub MyBalanceContext,
    context: frame_suite::ShareBalanceContext<T>,
    marker: [T],
    value: ShareBalanceContext(PhantomData)
);
```

This wires the plugin family to the `LazyBalance` implementation of the pallet.

Think of it like this:

```text
pallets use GenesisConfig

plugins use PluginContext

-----------------------------

pallet implements LazyBalance

plugins use pallet's LazyBalance
```

This is where Lazy Balance compatible plugins receive their runtime configuration and execution environment.

For the recommended default `frame_suite::ShareBalanceFamily` there is no complex configuration needed.

It works with a simple default context under `frame_suite::ShareBalanceContext`.

But advanced plugins may require:

* ⚙️ custom execution rules
* 📏 bounded accounting behavior
* 🧩 protocol-specific balance settings

Those advanced plugin configurations will be covered later in:

👉 Advanced -> [Balance Plugins](../advanced/balance.md)

---

## ⚖️ 14. WeightInfo

```rust
type WeightInfo = pallet_commitment::weights::SubstrateWeight<Runtime>;
```

Used for:

* benchmarking
* dispatch weight calculation
* fee correctness

This uses the default Substrate benchmark weights provided by the pallet.

However:

> never use these benchmark weights for production blindly

Your runtime configuration, hardware environment, execution paths, and optimization choices may produce different benchmark results.

Production runtimes should always generate their own benchmarks using their actual runtime configuration and target hardware assumptions.

If your runtime requires different extrinsic weight benchmarks, you should provide your own custom `WeightInfo` implementation instead.

---


## 📣 15. EmitEvents

```rust
type EmitEvents = ConstBool<false>
```

Controls whether the pallet emits standard internal Commitment lifecycle events.

These are events related to individual commitment operations such as:

* commitment placed / raised / resolved
* internal lifecycle updates
* digests balance mutation
* index creation and pools updates

### Recommended Values

| Environment     | Value              |
| --------------- | ------------------ |
| Testing / Local | `ConstBool<true>`  |
| Production      | `ConstBool<false>` |

Why?

Because events cost weight.

For production systems, emitting events for every individual commitment operation is usually avoided to reduce unnecessary execution overhead.

Also:

> extrinsics will still emit events regardless

because extrinsic execution is user-controlled and should remain visible at the runtime level.

What is typically disabled in production are the fine-grained internal events, not the standard extrinsic-level runtime visibility.

---

## 🚀 Next Step

Now that the pallet configuration is clear, the next step is integrating direct commitments, variants, digest mutation, and resolution inside real usage pallets.

👉 **Usage -> [Integrating Commitments](./integrate.md)**