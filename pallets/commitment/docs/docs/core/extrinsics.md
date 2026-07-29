---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚡ Extrinsics

Unlike most FRAME pallets, `pallet-commitment` intentionally exposes **very few extrinsics**.

The commitment engine is designed to be consumed through its public trait interfaces rather than called directly by end users.

This keeps protocol logic inside usage pallets while allowing the commitment engine to remain generic and reusable.

---

## 🧠 Why Only Minimal Extrinsics?

The commitment pallet does **not** know:

* why a commitment exists
* which digest should be used
* when commitments are allowed
* which validations should apply

Those decisions belong entirely to the consumer pallet.

For this reason there are **no extrinsics** for:

* placing commitments
* raising commitments
* resolving commitments
* creating indexes
* managing pools
* updating digests

All of these operations are performed through the public commitment traits.

---

## 🚀 Reserve Funding

The only production extrinsics manage the native commitment reserve.

These reserve funds become the default funding source for future commitment operations.

| Extrinsic | Description | When to Use |
|-----------|-------------|-------------|
| `deposit_reserve(Asset, Precision)` | Moves free balance into the native commitment reserve. | Preparing funds before creating commitments. |
| `withdraw_reserve(Option<Asset>)` | Releases reserved funds back into free balance. | Recovering unused reserve funds. |

The reserve uses the pallet's built-in hold reason:

```rust
HoldReason::PrepareForCommit
```

Consumer pallets may then create commitments using these reserved funds efficiently without repeatedly inspecting free or usable balances.

### ⚙ Reserve Behavior

Reserve funding supports both exact and best-effort deposits.

```rust
deposit_reserve(
    amount,
    Precision::Exact
)
```

requires the full amount.

Whereas

```rust
deposit_reserve(
    amount,
    Precision::BestEffort
)
```

deposits as much as possible when sufficient liquid balance is unavailable.

Similarly,

```rust
withdraw_reserve(None)
```

withdraws the entire reserve.

while

```rust
withdraw_reserve(Some(amount))
```

withdraws only the requested amount.

---

## 🧪 Development Inspectors

When compiled with:

```text
feature = "dev"
```

the pallet exposes additional inspector extrinsics intended for development, testing, benchmarking, and runtime exploration.

These dispatchables provide convenient access to the pallet's inspection APIs without affecting the production execution model.

The available inspector extrinsics are documented in the [next section](./inspectors.md).

---

## 📌 In One Sentence

> `pallet-commitment` intentionally exposes only reserve management extrinsics, while all commitment lifecycle operations are performed through trait-based dispatch by consumer pallets.

---

## 🚀 Next Step

Now that the dispatch surface is complete, the remaining sections cover the pallet's development and production related surfaces. The next section focusses on development-only query extrinsics.

👉 **Core -> [Inspectors](./inspectors.md)**
