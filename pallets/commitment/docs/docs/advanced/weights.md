---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚖️ Weights

`pallet-commitment` follows the standard FRAME benchmarking model and does not hardcode production weights.

Instead, each runtime supplies its own benchmark-generated implementation through the pallet configuration.

```rust
pub trait pallet_commitment::Config<I> {
    type WeightInfo: pallet_commitment::weights::WeightInfo;
}
```

This allows weights to accurately reflect the target runtime's:

* storage backend
* hardware
* runtime composition
* enabled commitment features
* benchmarking environment

The recommended production approach is:

> benchmark your runtime and provide your own implementation of `pallet_commitment::weights::WeightInfo`.

---

## 📦 Default Weights

Most runtimes begin with the generated default implementation.

```rust
impl pallet_commitment::Config for Runtime {
    type WeightInfo =
        pallet_commitment::weights::SubstrateWeight<Runtime>;
}
```

This provides reasonable benchmark-generated weights suitable for development and most deployments.

---

## 🏋️ Generating Your Own Weights

Production runtimes should benchmark the pallet using FRAME benchmarking.

### 1. Enable Benchmarking

Enable runtime benchmarking in your runtime `Cargo.toml`.

```toml
[features]
runtime-benchmarks = [
    # other pallets
    "pallet-commitment/runtime-benchmarks",
]
```

---

### 2. Build the Runtime

Compile the runtime with benchmarking enabled.

```bash
cargo build --release --features runtime-benchmarks
```

After compilation, the benchmarkable runtime WASM will be available under:

```text
target/release/wbuild/
```

---

### 3. Install `frame-omni-bencher`

Verify the benchmarking tool is available:

```bash
frame-omni-bencher --version
```

If necessary, install it:

```bash
cargo install frame-omni-bencher
```

---

### 4. Generate Commitment Weights

Run the FRAME benchmark command.

```bash
frame-omni-bencher v1 benchmark pallet \
  --runtime target/release/wbuild/your-runtime/your_runtime.wasm \
  --pallet pallet_commitment \
  --extrinsic "*" \
  --output your-path/commitment_weights.rs
```

This benchmarks every pallet extrinsic and generates a runtime-specific `WeightInfo` implementation.

---

### 5. Configure the Runtime

Expose the generated module and wire it into the runtime.

```rust
impl pallet_commitment::Config for Runtime {
    type WeightInfo =
        your_mod::commitment_weights::SubstrateWeight<Runtime>;
}
```

All Commitment extrinsics will now automatically use your benchmark-generated weights.

---

## 📌 Benchmark Coverage

The generated weights include the pallet's public extrinsics, such as:

* `deposit_reserve`
* `withdraw_reserve`

When development features are enabled, inspector extrinsics are also benchmarked automatically.

Trait-based commitment operations are **not** benchmarked directly because they are internal runtime APIs rather than dispatchable extrinsics.

Their execution cost is instead accounted for by the consumer pallet's own benchmarked extrinsics.

---

## 📌 In One Sentence

> `pallet-commitment` delegates weight calculation to FRAME benchmarking, allowing every runtime to supply weights generated for its own configuration and hardware.

---

## 🚀 Next Step

The next section covers the testing strategy used by `pallet-commitment` and how to write comprehensive tests for consumer pallets.

👉 **Advanced -> [Testing](./tests.md)**