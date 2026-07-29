---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🔍 Inspectors

`pallet-commitment` is designed around **trait-based APIs**, not user-facing query extrinsics.

However, during development it is often useful to inspect the internal state of commitments directly from the runtime without writing a custom usage pallet's RPC layer.

For this purpose, the pallet exposes a set of **development inspector extrinsics**.

These dispatchables are available **only** when compiled with:

```text
feature = "dev"
```

They are intentionally excluded from production runtimes and exist purely for:

* debugging
* testing
* runtime exploration
* benchmarking
* validating protocol behavior

Internally these extrinsics simply call the same read-only inspection APIs implemented by the pallet and emit the results as runtime events. They never mutate commitment state.

### Why Inspector Extrinsics Exist

Normally a usage pallet calls trait methods directly:

```rust
pallet_commitment::Pallet::<T>::get_commit_value(...)
```

or

```rust
pallet_commitment::Pallet::<T>::get_pool_value(...)
```

During development there may be no consumer pallet yet.

Instead of writing RPC endpoints for temporary pallets, these inspector extrinsics expose the inspection APIs directly through dispatchables of pallet-commitment itself.

They provide an easy way to:

* inspect live commitment values
* inspect index distribution
* inspect pool state
* inspect pending issuance
* inspect pending reaping
* inspect reason accounting

without mutating storage.

### How Results Are Returned

Inspector extrinsics do **not** return values directly.

Instead they emit dedicated runtime events containing the requested information.

Example:

```rust
inspect_commit_value() -> CommitValue {
    reason,
    value,
}
```

This makes them convenient for testing frameworks, benchmarking, runtime event inspection and never to be coupled with the usage pallet.



---

## 📈 Commitment Inspectors

These inspect direct commitment state.

| Inspector | Description | Emits |
|-----------|-------------|-------|
| `inspect_commit_value(reason)` | Returns the current real-time value of the caller's commitment under the given reason. | `CommitValue { DigestVariant/Digest, CommitReason, Asset }` |
| `inspect_digest_model(digest, reason)` | Determines whether a digest represents a Direct Commitment, Index, or Pool. | `DigestModel { DigestVariant }` |

---

## 🧺 Index Inspectors

These inspect grouped commitment structures.

| Inspector | Description | Emits |
|-----------|-------------|-------|
| `inspect_index_value(reason, index)` | Returns the caller's current aggregate commitment value across the index. | `IndexValue { IndexDigest, CommitReason, Asset }` |
| `inspect_entries_value(reason, index)` | Returns the current value of every entry within the index. | `IndexEntriesValue { IndexDigest, CommitReason, Vec<(EntryDigest, Asset)> }` |
| `inspect_entry_value(reason, index, entry)` | Returns the current value of a single index entry. | `IndexEntryValue { IndexDigest, CommitReason, EntryDigest, Asset }` |

---

## 🏊 Pool Inspectors

These inspect managed commitment pools.

| Inspector | Description | Emits |
|-----------|-------------|-------|
| `inspect_pool_value(reason, pool)` | Returns the caller's current pool commitment value. | `PoolValue { PoolDigest, CommitReason, Asset }` |
| `inspect_slots_value(reason, pool)` | Returns the current value of every slot within the pool. | `PoolSlotsValue { PoolDigest, CommitReason, Vec<(SlotDigest, Asset)> }` |
| `inspect_slot_value(reason, pool, slot)` | Returns the current value of a specific pool slot. | `PoolSlotValue { PoolDigest, CommitReason, SlotDigest, Asset }` |
| `inspect_pool_commission(reason, pool)` | Returns the commission configured for the pool. | `PoolCommission { PoolDigest, CommitReason, Commission }` |
| `inspect_pool_manager(reason, pool)` | Returns the current manager of the pool. | `PoolManager { PoolDigest, CommitReason, Proprietor }` |

---

## ⚖️ Accounting Inspectors

These inspect global accounting state.

| Inspector | Description | Emits |
|-----------|-------------|-------|
| `inspect_asset_to_issue()` | Returns the total pending asset issuance. | `AssetIssuable { Asset }` |
| `inspect_asset_to_reap()` | Returns the total pending asset reaping. | `AssetReapable { Asset }` |
| `inspect_reason_value(reason)` | Returns the total committed value for a commitment reason. | `ReasonValuation { CommitReason, Asset }` |

---

## 🧵 Typical Development Workflow

A common debugging session looks like:

```text
-> place_commit()
-> inspect_commit_value()
-> set_digest_value()
-> inspect_commit_value()
-> inspect_reason_value()
-> inspect_asset_to_issue()
-> resolve_commit()
-> inspect_asset_to_issue()
```

or for indexes:

```text
-> place_commit(index)
-> inspect_index_value()
-> inspect_entries_value()
-> resolve_commit()
```

or for pools:

```text
-> place_commit(pool)
-> inspect_pool_value()
-> inspect_slots_value()
-> inspect_pool_commission()
-> resolve_commit()
```

This makes it easy to observe how values evolve as digests, indexes, and pools change over time.

---

## 🎖️ Production Recommendation

Development inspector extrinsics should remain disabled in production runtimes.

Production integrations should instead query commitment state through:

* Commitment traits
* Runtime APIs
* Custom RPC endpoints
* Consumer pallet APIs

This keeps the runtime dispatch surface minimal while preserving full observability for developers during testing. 

---

## 🚀 Next Step

The next section documents the runtime events emitted by `pallet-commitment`.

👉 **Core -> [Events](./events.md)**