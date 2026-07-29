---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ❌ Errors

`pallet-commitment` provides a comprehensive set of diagnostic errors covering every major commitment operation.

Unlike many pallets where errors simply indicate failure, Commitment errors are designed to explain **why** an operation failed and, whenever possible, **how the caller can recover**.

This makes debugging, protocol development, and runtime integration significantly easier.

---

## 🧠 Error Philosophy

The pallet follows three principles:

- fail as early as possible
- fail for exactly one reason
- provide enough information to recover

For example, instead of returning a generic failure such as:

```text
CommitFailed
```

the pallet reports the exact cause:

```text
CommitAlreadyExists
```

or

```text
DigestNotFound
```

or

```text
ShareGreaterThanCapital
```

This removes ambiguity and makes failures deterministic.

---

## ⚡ Fail Fast

Consumer pallets are encouraged to propagate Commitment errors directly.

Instead of mapping them into local errors:

```rust
T::Commitment::place_commit(...).map_err(|_| Error::<T>::CommitFailed)?;
```

prefer:

```rust
T::Commitment::place_commit(...)?;
```

This preserves the original diagnostic information and avoids hiding the actual cause of failure.

Because Commitment already provides exhaustive error reporting, additional error translation is usually unnecessary.

---

## 🗂️ Error Categories

Errors naturally fall into several groups.

### Commitment Errors

These relate to the commitment lifecycle.

Typical examples include:

- `CommitAlreadyExists`
- `CommitNotFound`
- `MarkerCommitNotAllowed`
- `MaxCommitsReached`
- `EmptyCommitsNotAllowed`
- `CommitConstructionFailed`

These usually indicate incorrect commitment state or lifecycle violations.

---

### Digest Errors

These validate direct commitment digests.

Examples include:

- `DigestNotFound`
- `DigestHasFunds`
- `DigestVariantBalanceNotFound`
- `DigestNotFoundToDetermine`
- `InvalidDigestModel`

These occur when operating on invalid or unavailable digest state.

---

### Index Errors

These validate indexed commitment structures.

Examples include:

- `IndexNotFound`
- `IndexDigestTaken`
- `EntryOfIndexNotFound`
- `EntryDigestNotFound`
- `DuplicateEntry`
- `MaxEntriesReached`
- `EmptyEntriesNotAllowed`
- `IndexHasFunds`

These generally indicate structural problems with an index.

---

### Pool Errors

These validate managed pools.

Examples include:

- `PoolNotFound`
- `PoolDigestTaken`
- `PoolManagerNotFound`
- `PoolHasFunds`
- `DuplicateSlot`
- `SlotDigestNotFound`
- `SlotOfPoolNotFound`
- `EmptySlotsNotAllowed`
- `ReleasePoolToRecover`
- `MaxSlotsReached`
- `PoolUnsupported`

These describe pool configuration or management failures.

---

### Share & Capital Errors

Indexes and pools maintain strict share invariants.

Examples include:

- `ShareCannotBeZero`
- `CapitalCannotBeZero`
- `ShareGreaterThanCapital`
- `CapitalUnderflowed`
- `CapitalOverflowed`
- `FactorGreaterThanOne`
- `TooSmallShareValue`

These errors protect proportional accounting.

---

### Balance & Accounting Errors

These ensure lazy accounting remains economically correct.

Examples include:

- `InsufficientFunds`
- `MaxAssetIssued`
- `MaxAssetReaped`
- `MintingMoreThanIssued`
- `BurningMoreThanReapable`
- `DepositAccumulationExhausted`
- `WithdrawAccumulationExhausted`
- `CommitsAccumulationExhausted`
- `CommissionOverflow`

Many of these indicate arithmetic exhaustion or accounting invariant violations.

---

### Reserve Errors

Reserve operations have their own diagnostics.

Examples include:

- `ExpectsHoldWithdrawal`
- `ExpectsFreezeAndHoldWithdrawal`
- `ReserveLiquidOverflow`

These typically indicate insufficient reservable balance.

---

### Plugin Errors

Some errors originate from the configured Lazy Balance plugin.

Examples include:

- `CorruptedPlugin`
- `MintingOffLimits`
- `ReapingOffLimits`
- `PlacingOffLimits`
- `RaisingOffLimits`

These are returned when the configured balance plugin rejects an operation according to its own accounting rules.

---

### Runtime Configuration Errors

These indicate invalid runtime configuration rather than invalid user input.

Examples include:

- `ZeroMaxCommits`
- `TriedCreatingHaltedIndexes`
- `VariantsExhausted`
- `InvalidCommitVariantIndex`

These usually require correcting the runtime configuration or implementation.

---

## 🩺 Diagnostic Errors

Several errors intentionally provide hints for recovery.

For example:

```text
ShareGreaterThanCapital
```

indicates the invariant:

```text
share ≤ capital
```

must hold.

Likewise:

```text
CommitAlreadyExists
```

indicates the proprietor should either:

- raise the existing commitment, or
- resolve it before placing another.

Many arithmetic errors also recommend migrating to a larger asset scalar or auditing the underlying fungible implementation.

This makes runtime failures significantly easier to diagnose.

---

## 🧩 Why So Many Errors?

The Commitment engine performs many different responsibilities:

- direct commitments
- indexes
- pools
- lazy balance accounting
- reserve management
- plugin integration
- proportional share calculations

Each subsystem exposes its own precise diagnostics instead of collapsing multiple failures into generic errors.

This reduces ambiguity and makes failures predictable for both runtime developers and protocol authors.

---

## 📌 In One Sentence

> `pallet-commitment` provides exhaustive, diagnostic-first errors that are intended to be propagated directly by consumer pallets, making commitment failures precise, recoverable, and easy to debug.

---

---

## 🚀 Next Step

Now that the core API surface is covered, the next section explores how to inspect and interact with `pallet-commitment` from external tools (offchain context).

👉 **Core -> [RPC & UI](./rpc-ui.md)**