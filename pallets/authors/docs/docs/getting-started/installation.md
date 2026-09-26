---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🛠️ Installation

Before installing `pallet-authors`, it helps to start from a proper Substrate runtime foundation.

The recommended approach is:

> 1. start from a clean Substrate node template
> 2. integrate `pallet-commitment`
> 3. then integrate `pallet-authors`

This keeps the runtime architecture clean and ensures that the economic layer required by Authors is already available.

You can use:

* standard Substrate node template
* your existing FRAME runtime
* a runtime that already has `pallet-commitment` configured

This section focuses on getting `pallet-authors` running using the basic runtime setup. Advanced behavior and runtime-specific customization can be covered separately in [Configuration](./config.md).

The overall installation follows the same layered approach used by `pallet-commitment`: runtime foundation → dependencies → runtime registration → `Config` implementation → genesis configuration. 

---

# Recommended Starting Point

## 🌱 Option A — Standard Substrate Template

If you're starting fresh, the standard Substrate template provides a good base.

It already provides:

* `frame_system`
* FRAME macros
* runtime presets
* chain specification
* genesis configuration
* runtime call/event wiring

Typical structure:

```text
node/
runtime/
pallets/
Cargo.toml
```

You then add the Commitment and Authors layers on top.

---

## 🏗️ Option B — Existing FRAME Runtime

If you already have a running FRAME runtime, `pallet-authors` can be integrated directly.

This is useful when:

* your runtime already contains `pallet-commitment`
* your runtime already has a fungible asset implementation
* you are developing duty or governance pallets
* you already have `frame-suite` and `frame-plugins`

In this case, Authors becomes an additional **role-management layer** on top of the existing economic infrastructure.

---

## 🚀 Option C — Commitment-Ready Runtime

If your runtime already contains a properly configured `pallet-commitment`, Authors can be added directly without rebuilding the economic layer.

The dependency becomes:

```text
Fungible Asset
      ↓
pallet-commitment
      ↓
pallet-authors
```

Alternatively, you can start from the **preconfigured Authors Substrate template**, which already provides the required runtime foundation and integration setup for `pallet-authors`.

This is the recommended option when starting a new project because the template lets you begin with the intended Authors architecture already wired together, while an existing Commitment-ready runtime is useful when extending an established project.

---

# After Choosing Your Base Runtime

Regardless of the starting point:

| Starting Point              | What You Need To Do                                           |
| --------------------------- | ------------------------------------------------------------- |
| Standard Substrate Template | Set up Commitment and Authors manually                        |
| Existing FRAME Runtime      | Integrate Authors into the existing architecture              |
| Commitment-Ready Runtime    | Mainly add Authors and configure its role/election components |

If `pallet-commitment` is already installed, much of the economic setup is already complete.

---

## 🦀 1. Rust Requirements

Before installing `pallet-authors`, make sure your Rust environment is ready for Substrate runtime development.

You should have:

* stable Rust installed
* the `wasm32-unknown-unknown` target enabled
* Protocol Buffers (`protoc`) installed

These are required because:

* Substrate runtimes compile to WebAssembly
* FRAME pallets require the Rust toolchain
* some dependencies use protobuf generation during the build

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Add WASM Target

```bash
rustup target add wasm32-unknown-unknown
```

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

---

## 📦 2. Add Dependencies

Inside your runtime project:

```bash
cargo add frame-suite
cargo add frame-plugins
cargo add pallet-commitment
cargo add pallet-authors
```

You also need the fungible asset implementation used by your Commitment configuration:

```bash
cargo add pallet-balances
```

or:

```bash
cargo add pallet-xp
```

The roles are:

| Dependency                      | Responsibility                                                           |
| ------------------------------- | ------------------------------------------------------------------------ |
| `pallet-authors`                | Provides the generalized Author role implementation.                     |
| `pallet-commitment`             | Provides the economic commitment layer.                                  |
| `frame-suite`                   | Provides the shared role, commitment, election, and plugin abstractions. |
| `frame-plugins`                 | Provides concrete plugin implementations.                                |
| `pallet-balances` / `pallet-xp` | Provides the underlying fungible asset.                                  |

The Commitment layer itself uses `frame-suite`, `frame-plugins`, and a fungible implementation for its economic operations. 

---

## 🧩 3. Register the Pallets in the Runtime

Inside:

```text
runtime/src/lib.rs
```

register both Commitment and Authors in the runtime.

A typical structure is:

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

    #[runtime::pallet_index(2)]
    pub type Commitment = pallet_commitment::Pallet<Runtime>;

    #[runtime::pallet_index(3)]
    pub type Authors = pallet_authors::Pallet<Runtime>;
}
```

If using `pallet-balances` instead of `pallet-xp`, use that pallet as the underlying fungible implementation.

Registration makes Authors part of the runtime's:

* `RuntimeCall`
* `RuntimeEvent`
* dispatch system
* metadata
* storage
* runtime composition

Without registration:

> `pallet-authors` is not part of the runtime.

---

## ⚙️ 4. Implement the `Config` Trait

Inside:

```text
runtime/src/lib.rs
```

configure the Authors pallet for the runtime.

A representative setup is:

```rust
impl pallet_authors::Config for Runtime {
    type RuntimeEvent = RuntimeEvent;

    // Economic layer
    type CommitmentAdapter = pallet_commitment::Pallet<Self>;
    type Asset = Xp;
    type AssetFreeze = RuntimeFreezeReason;

    // Influence
    type Influence = u64;
    type InfluenceContext = ();
    type InfluenceModel = LinearModel;

    // Flat election
    type FlatElectionContext = ();
    type FlatElectionModel = flat::TopDownFlatModel;

    // Fair election
    type FairElectionContext = ();
    type FairElectionModel = fair::TopDownFairModel;

    // Runtime activity
    type ActivityProvider = DummyActivityProvider;

    // Weights + events
    type WeightInfo = ();
    type EmitEvents = ConstBool<true>;
}
```

The concrete types depend on the plugins and asset system selected by your runtime.

---

### 🔗 Commitment Adapter

The most important connection is:

```rust
type CommitmentAdapter = pallet_commitment::Pallet<Self>;
```

This makes `pallet-commitment` the economic implementation used by Authors.

Through this connection, the Author role can obtain the commitment infrastructure required for:

* self-collateral
* external backing
* funding
* economic holds
* rewards
* penalties
* commitment resolution

The relationship is:

```text
pallet-authors
       │
       ▼
CommitmentAdapter
       │
       ▼
pallet-commitment
       │
       ▼
Configured Asset / Balance Plugin
```

Authors therefore defines the **role-level economic requirements**, while Commitment performs the underlying economic operations.

---

### 🗳️ Election Configuration

Authors requires both election families to be configured:

```rust
type FlatElectionModel = flat::TopDownFlatModel;
type FairElectionModel = fair::TopDownFairModel;
```

Flat elections additionally use the configured Influence plugin:

```rust
type InfluenceModel = LinearModel;
```

These are runtime-selected plugins rather than hard-coded election algorithms.

Conceptually:

```text
Author Position
      │
      ├── Influence Model ──→ Flat Election
      │
      └── Individual Backing → Fair Election
```

The runtime can therefore choose the concrete election behavior without changing `pallet-authors`.

---

### 🪙 Asset Configuration

The runtime must provide the asset used by the Commitment layer and exposed to Authors.

For example:

```rust
type Asset = Xp;
```

or:

```rust
type Asset = Balances;
```

The actual type depends on the fungible system used by the runtime.

Authors does not assume a particular asset implementation. It receives the configured asset through its runtime configuration.

---

### 🧭 Activity Provider

Authors also requires an activity implementation:

```rust
type ActivityProvider = MyActivityProvider;
```

This allows the runtime to supply its own interpretation of Author activity without embedding that logic into the pallet.

A simple dummy implementation can be used for testing.

---

## 🌄 5. Genesis Configuration

`pallet-authors` does not require Authors to be pre-created during genesis.

The role is entered through the normal enrollment lifecycle.

Conceptually:

```text
Genesis
   │
   ▼
Runtime Configured
   │
   ▼
Account voluntarily enrolls
   │
   ▼
Author + Self-Collateral
   │
   ▼
Probation
```

This keeps the initial chain state independent of a predetermined set of Authors.

The Commitment layer likewise uses an empty genesis configuration, so the underlying economic infrastructure does not require pre-created commitments, digests, indexes, or pools. 

---

## ✅ Final Installation Checklist

| Step                               | Required |
| ---------------------------------- | -------- |
| Choose base runtime                | ✅        |
| Install Rust + WASM target         | ✅        |
| Install protobuf                   | ✅        |
| Add `frame-suite`                  | ✅        |
| Add `frame-plugins`                | ✅        |
| Add fungible asset pallet          | ✅        |
| Add `pallet-commitment`            | ✅        |
| Add `pallet-authors`               | ✅        |
| Register Commitment                | ✅        |
| Register Authors                   | ✅        |
| Implement `pallet_authors::Config` | ✅        |
| Configure `CommitmentAdapter`      | ✅        |
| Configure Influence plugin         | ✅        |
| Configure Flat election plugin     | ✅        |
| Configure Fair election plugin     | ✅        |
| Configure Activity provider        | ✅        |

After this:

> **`pallet-authors` becomes a native role-management layer inside your runtime, backed by the configured Commitment system and runtime-selected election plugins.**

