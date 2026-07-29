---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🛠️ Installation

Before installing `pallet-commitment`, it helps to start from a proper Substrate runtime foundation.

The recommended approach is:

> 1. start from a clean Substrate node template  
> 2. then integrate `pallet-commitment`

This keeps your runtime architecture clean and production-safe ✨

You can use:

* standard Substrate node template
* your existing FRAME runtime
* our [Commitment-ready templates](https://github.com/auguth/commitment-substrate-template) (recommended)

This section focuses on getting `pallet-commitment` running safely using the default production-ready setup.

Detailed customization of pallet behavior and advanced runtime tuning will be covered in: [Configuration](./config.md)

---

# Recommended Starting Point

## 🌱 Option A - Standard Substrate Template

If you're starting fresh, the standard Substrate template is a very good base.

It already provides:

* `frame_system`
* `frame` macros
* runtime presets
* chain spec setup
* genesis presets
* runtime call/event wiring

This means you only need to add Commitment on top.

Typical structure:

```text
node/
runtime/
pallets/
Cargo.toml
```

This is the cleanest way to begin.

---

## 🏗️ Option B - Existing FRAME Runtime

If you already have a running Substrate runtime, you can integrate Commitment directly into it.

This is common when:

* you are actively developing staking or governance pallets
* your runtime already uses `pallet-balances` or `pallet-xp`
* you want to introduce semantic asset commitments without redesigning your runtime
* you want commitment infrastructure as an additional execution layer

In this case, Commitment becomes an additional execution layer.

---

## 🚀 Option C - Commitment-Ready Runtime Templates (Recommended)

We also provide templates already prepared for Commitment integration.

These include:

* pre-wired `pallet-commitment`
* default Lazy Balance integration
* digest-ready runtime setup
* reserve funding support
* example Commitment + Balance flows
* production-safe default configuration

This is much faster for real projects🚀

---

# After Choosing Your Base Runtime

Whether you start from:

* a standard Substrate template
* an existing FRAME runtime
* a Commitment-ready runtime template

the next installation steps are mostly the same.

The difference is:

| Starting Point              | What You Need To Do                             |
| --------------------------- | ----------------------------------------------- |
| Standard Substrate Template | complete Commitment setup manually              |
| Existing FRAME Runtime      | integrate Commitment into existing architecture |
| Commitment-Ready Template   | mostly review + adjust config values            |

Commitment-ready templates already include much of the setup

So in many cases:

```text
following Steps 2–5 become review steps
instead of setup steps
```

while standard templates require full manual integration.

---

## 🦀 1. Rust Requirements

Before installing `pallet-commitment`, make sure your Rust environment is ready for Substrate runtime development.

You should have:

* stable Rust installed (`rustc`)
* the `wasm32-unknown-unknown` target enabled
* Protocol Buffers (`protoc`) installed

These are required because:

* Substrate runtimes compile to WebAssembly
* FRAME pallets require Rust toolchains
* some dependencies use protobuf generation during build

---

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

---

### Add WASM Target

```bash
rustup target add wasm32-unknown-unknown
```

---

### Install Protocol Buffers

#### Ubuntu / Debian

```bash
sudo apt install protobuf-compiler
```

#### macOS

```bash
brew install protobuf
```

#### Arch Linux

```bash
sudo pacman -S protobuf
```

### Verify Installation

```bash
rustc --version
rustup target list --installed
protoc --version
```

Once these are available, your machine is ready for Substrate + Commitment runtime development.

---

## 📦 2. Add Dependencies

Inside your runtime project:

```bash
cargo add frame-suite
cargo add frame-plugins
cargo add pallet-commitment

# optionals
cargo add pallet-balances
# or
cargo add pallet-xp

```

Why all?

* `pallet-commitment` provides the commitment engine
* `frame-suite` provides shared commitment traits and helper abstractions
* `frame-plugins` provides the Lazy Balance plugin implementations used for receipt resolution and balance execution
* `pallet-balances` or `pallet-xp` provides the underlying fungible asset system (optional)
* Commitment requires a fungible implementation for reserve, issue, reap, and settlement behavior

All are required for a full Commitment runtime setup.

---

## 🧩 3. Register the Pallet in Runtime

Inside:

```text
runtime/src/lib.rs
```

you must register the pallet inside your runtime definition.

This is where Substrate composes all pallets into the final chain runtime.

A typical runtime section looks like this:

```rust
#[frame_support::runtime]
mod runtime {
    #[runtime::runtime]
    #[runtime::derive(
        RuntimeCall,
        RuntimeEvent,
        RuntimeError,
        RuntimeOrigin,
        RuntimeFreezeReason,
        RuntimeHoldReason,
        RuntimeSlashReason,
        RuntimeLockId,
        RuntimeTask
    )]
    pub struct Runtime;

    #[runtime::pallet_index(0)]
    pub type System = frame_system::Pallet<Runtime>;

    #[runtime::pallet_index(1)]
    pub type Xp = pallet_xp::Pallet<Runtime>;
    // or (use either for underlying fungible system)
    #[runtime::pallet_index(2)]
    pub type Balances = pallet_balances::Pallet<Runtime>;

    #[runtime::pallet_index(3)]
    pub type Commitment = pallet_commitment::Pallet<Runtime>;
}
```

This registration makes `Commitment` part of:

* `RuntimeCall`
* `RuntimeEvent`
* `RuntimeHoldReason`
* `RuntimeFreezeReason`
* runtime metadata generation
* dispatch system
* storage metadata

Without this:

> the pallet does not exist inside the runtime

Commitment must be registered before it can execute.

---

## ⚙️ 4. Implement the Config Trait

Inside:

```text
runtime/src/lib.rs
```

configure the pallet using the actual runtime configuration.

A working production-safe setup from the mock runtime looks like this:

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

This configuration provides:

* semantic commitment ownership
* digest-backed accounting
* variant-aware balances
* index + pool support
* lazy receipt resolution
* fungible asset settlement
* imbalance reconciliation

This is the real runtime wiring of Commitment.

---

## 🌄 5. GenesisConfig

Unlike many pallets:

#### `pallet-commitment` has an empty GenesisConfig

Its actual genesis struct is:

```rust
#[pallet::genesis_config]
pub struct GenesisConfig<T: Config<I>, I: 'static = ()> {
    _phantom: PhantomData<(T, I)>,
}
```

This means:

```text
No custom limits
No preloaded commitments
No pre-created digests
No pool initialization
No index initialization
No manual genesis fields
```

Hence,

> no explicit runtime genesis setup is required

Because Commitment is **execution infrastructure**, not pre-seeded protocol state.

---

## ✅ Final Installation Checklist

| Step                                    | Required |
| --------------------------------------- | -------- |
| Choose base runtime                     | ✅        |
| Install Rust + WASM target              | ✅        |
| Install protobuf                        | ✅        |
| Add `frame-suite` and `frame_plugins`   | ✅        |
| Add fungible pallet (`balances` / `xp`) | ✅        |
| Add `pallet-commitment`                 | ✅        |
| Register pallet in runtime              | ✅        |
| Implement actual `Config` trait         | ✅        |
| Use default empty GenesisConfig         | ✅        |

After this:

> Commitment becomes a native execution layer inside your runtime

and is ready for configuration + protocol integration 🚀

---

## 🚀 Next Steps

Now that installation is complete, the next step is understanding how to configure Commitment behavior inside your runtime.

👉 **Getting Started -> [Configuration](./config.md)**
