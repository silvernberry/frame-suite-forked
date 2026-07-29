# ⚖️ Variants (Positions)

Variants add semantic positions to commitments.

This allows the same digest to represent multiple economic meanings without creating separate commitment systems.

Examples:

* 📈 Long / Short
* 🗳 Yes / No
* ⚖ For / Against / Abstain
* ➕ Positive / Negative

The commitment engine remains the same.

Only the semantic position changes.

This is handled through traits:

* `CommitVariant` 🎯 Direct commitment variants per digest
* `IndexVariant` 🧺 Variant-aware weighted index entries
* `PoolVariant` 🏊 Variant-aware managed pool slots

which extend direct commitments, indexes, and pools with variant-aware balance positions. 

---

## 🧠 What a Variant Really Is

A variant is not a separate commitment.

It is:

```text
a balance position inside a digest
```

Think of it like:

```text
Digest
|-- Variant 0
|-- Variant 1
|-- Variant 2
```

Each variant has its own independent balance.

So:

```text
one digest -> multiple balances
```

Conceptually:

```text
Digest -> Vec<Balance>
```
This means:

```text
same digest, different variant = different economic state
```

---

## 🧾 `CommitVariant`

This is the base variant layer for direct commitments.

Instead of:

```text
Alice -> Digest
```

it becomes:

```text
Alice -> Digest -> Variant
```

Example:

```text
Validator A
 |-- Positive
 |-- Negative
```

or

```text
Prediction Market
 |-- YES
 |-- NO
```

The digest remains singular. Only the internal balance position changes.

Each commitment selects which variant it belongs to.

| Method                             | Trait | Purpose                                                             |
| ---------------------------------- | ------| ------------------------------------------------------------------- |
| `place_commit()`                   | `Commitment` | Default commitment path - commits using a default / no-op variant |
| `place_commit_of_variant(...)`     | `CommitVariant` | Places commitment directly into a specific variant                  |

The important distinction is:

```text
Commitment::place_commit() -> default variant

CommitVariant::place_commit_of_variant() -> explicit variant
```

---

## 🧺 `IndexVariant`

Indexes support variants at the entry level.

Each entry contains:

```text
Entry Digest + Variant
```

So:

```text
Index
|-- Entry A -> Variant X
|-- Entry B -> Variant Y
|-- Entry C -> Variant Z
```

This means an index distributes across:

```text
digest + variant
```

not just digest.

Example:

```text
BTC -> Long
ETH -> Short
DOT -> Long
```

Each entry stores:

* digest identity
* share weight
* semantic variant

This makes grouped directional exposure possible.

---

## 🏊 `PoolVariant`

Pools work the same way.

Each pool slot contains:

```text
Slot Digest + Variant
```

So:

```text
Pool
|-- Slot A -> Variant 0
|-- Slot B -> Variant 1
|-- Slot C -> Variant 0
```

This allows managers to rebalance across:

```text
digest + variant
```

positions.

Example:

```text
increase Long exposure
reduce Short exposure
```

without changing pool architecture.

Pools become direction-aware while preserving the same top-level balance model.

---

## 🧩 How Variants Are Plugged In

Variants are not hardcoded by the pallet.

They are configured through pallet [`Config` trait](../getting-started/config.md).

The pallet only sees **variant index**

The type resolution gives meaning.

Example:

```text
0 = Long
1 = Short
```

or

```text
0 = YES
1 = NO
```

So the pallet routes balances, while the runtime defines semantics.

---

## 📌 In One Sentence

> Variant = semantic side of a digest

or more precisely:

```text
Digest = shared target

Variant = balance position inside that target
```

This adds economic meaning without changing commitment architecture.

---

## 🚀 Next Step

Now we move into how digests hold real-time value and evolve lazily over time.

👉 **Architecture -> [Lazy Digests](./digest.md)**

