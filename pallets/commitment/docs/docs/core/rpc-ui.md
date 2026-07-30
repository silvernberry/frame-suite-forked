# 🧩 RPC-UI

`pallet-commitment` exposes a collection of inherent query methods on its `Pallet` type.

These methods provide the recommended interface for RPC implementations, frontend applications, blockchain explorers, and other off-chain tooling.

Unlike consumer pallets, RPC layers do **not** need to loosely couple through `frame_suite` traits.

Instead, they can directly call the concrete implementation:

```rust
use pallet_commitment::Pallet as Commitment;
```

For example:

```rust
let value = Commitment::<Runtime>::query_commit_value(
    account,
    reason,
)?;
```

or

```rust
let pool = Commitment::<Runtime>::query_pool_value(
    reason,
    pool_digest,
)?;
```

These APIs automatically perform the necessary lazy accounting and should be preferred over reading storage directly.

> [Inspector](./inspectors.md) extrinsics are typically thin wrappers around these inherent methods of pallet-commitment's `Pallet` type along with additional event emission.

---

## 🌐 General Queries

| API | Description |
|------|-------------|
| `query_commit_value(AccountId, Reason) -> Result<Asset>` | Returns the current live value of a proprietor's commitment. |
| `resolve_digest_model(Digest, Reason) -> Result<DigestVariant>` | Determines whether a digest represents a Direct commitment, Index, or Pool. |
| `resolve_digest_model_for(AccountId, Reason) -> Result<DigestVariant>` | Resolves the digest model of a proprietor's active commitment. |
| `query_reason_value(Reason) -> Result<Asset>` | Returns the total committed value for a commitment reason. |
| `query_asset_to_issue() -> Result<Asset>` | Returns the total pending issuance awaiting settlement. |
| `query_asset_to_reap() -> Result<Asset>` | Returns the total pending reaping awaiting settlement. |

---

## 🧺 Index Queries

| API | Description |
|------|-------------|
| `query_index_value(Reason, IndexDigest) -> Result<Asset>` | Returns the current total value of an index. |
| `query_entries_value(Reason, IndexDigest) -> Result<Vec<(EntryDigest, Asset)>>` | Returns every entry together with its current value. |
| `query_entry_value(Reason, IndexDigest, EntryDigest) -> Result<Asset>` | Returns the current value of a single entry. |
| `query_index_value_for(AccountId, Reason, IndexDigest) -> Result<Asset>` | Returns a proprietor's aggregate value within an index. |
| `query_entries_value_for(AccountId, Reason, IndexDigest) -> Result<Vec<(EntryDigest, Asset)>>` | Returns a proprietor's value across every entry. |
| `query_entry_value_for(AccountId, Reason, IndexDigest, EntryDigest) -> Result<Asset>` | Returns a proprietor's value for a specific entry. |

---

## 🏊 Pool Queries

| API | Description |
|------|-------------|
| `query_pool_value(Reason, PoolDigest) -> Result<Asset>` | Returns the current total value of a pool. |
| `query_slots_value(Reason, PoolDigest) -> Result<Vec<(SlotDigest, Asset)>>` | Returns every slot together with its current value. |
| `query_slot_value(Reason, PoolDigest, SlotDigest) -> Result<Asset>` | Returns the current value of one slot. |
| `query_pool_commission(Reason, PoolDigest) -> Result<Commission>` | Returns the configured pool commission. |
| `query_pool_manager(Reason, PoolDigest) -> Result<AccountId>` | Returns the current pool manager. |
| `query_pool_value_for(AccountId, Reason, PoolDigest) -> Result<Asset>` | Returns a proprietor's aggregate value within the pool. |
| `query_slots_value_for(AccountId, Reason, PoolDigest) -> Result<Vec<(SlotDigest, Asset)>>` | Returns a proprietor's value across every slot. |
| `query_slot_value_for(AccountId, Reason, PoolDigest, SlotDigest) -> Result<Asset>` | Returns a proprietor's value for a specific slot. |

---

## ⚠️ Avoid Reading Storage Directly

`pallet-commitment` is fundamentally **lazy**.

Storage primarily maintains accounting invariants, not necessarily the current economic value visible to users.

For example:

- receipts are immutable
- digest balances evolve over time
- index values are derived from entry digests
- pool values are derived from managed slot commitments
- pending issuance and reaping represent deferred settlement

Reading storage directly may therefore produce values that are correct from an accounting perspective but not the actual live value a user owns.

Instead, always build RPC endpoints and UI applications on top of the public `query_*()` methods unless a storage getter function is provided by the pallet.

These methods resolve the current state using the pallet's lazy accounting engine and guarantee consistent results across Direct, Index, and Pool commitment models.

---

## 📌 In One Sentence

> RPC implementations and UI applications should treat the public `query_*()` APIs as the canonical read interface, while storage should be considered an internal implementation detail of the lazy commitment engine.

---

## 🚀 Next Step

So far, everything has assumed a single Commitment configuration shared across the runtime.

In practice, multiple Commitment congifugrations must exist for multiple consumer pallets to share the different configurations, accounting model, and storage.

This is where **Commitment Instances** become useful.

👉 **Advanced -> [Instances](../advanced/instances.md)**