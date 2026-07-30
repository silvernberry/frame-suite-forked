---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚙️ Operations

Unlike most FRAME pallets, `pallet-commitment` exposes **no public commitment extrinsics**.

Instead, every operation is performed through the public traits defined in `frame_suite::commitment`.

Consumer pallets dispatch trait methods directly, while `pallet-commitment` provides the concrete implementation.

```text
Commitment Dispatch
-> Usage Pallet
-> Commitment Traits
-> pallet-commitment
-> Lazy Balance Plugin
-> Underlying Fungible Assets
```

This architecture keeps the commitment engine completely independent from protocol-specific business logic.

Each trait represents one capability of the pallet and can be composed independently by consumer pallets.


## 🔒 Commitment

The base commitment lifecycle implemented by every commitment model.

| Operation | Description | When to Use |
| ----------| ------------| ------------|
| `place_commit(AccountId, Asset, Reason, Digest) -> Result<Asset>` | Creates a new commitment and issues the initial immutable receipt. | Creating a new commitment.|
| `raise_commit(AccountId, Asset, Reason) -> Result<Asset>`| Increases an existing commitment by issuing another immutable receipt. | Increasing an existing commitment.|
| `resolve_commit(AccountId, Reason) -> Result<Asset>` | Resolves all receipts and performs final lazy settlement. | Closing a commitment. |
| `set_digest_value(Reason, Digest, Asset) -> Result<Asset>` | Updates the live digest balance. | Rewards, penalties, or protocol accounting. |
| `get_commit_value(AccountId, Reason) -> Asset` | Returns the current live commitment value. | Inspecting commitments. |
| `get_digest_value(Reason, Digest) -> Asset` | Returns the current digest value. | Inspecting shared protocol state. |
| `get_total_value(Reason) -> Asset` | Returns the total committed value for a reason.  | Protocol-wide accounting. |

---

## 🎯 CommitVariant

Adds semantic positions to direct commitments.

| Operation | Description | When to Use|
| ----------| ------------| ------------|
| `place_commit_of_variant(AccountId, Asset, Reason, Digest, Position) -> Result<Asset>` | Places a commitment into a specific variant. | Variant-aware commitments. |
| `set_digest_value_of_variant(Reason, Digest, Position, Asset) -> Result<Asset>` | Updates one variant balance. | Rewarding or penalizing a specific position. |
| `get_digest_value_of_variant(Reason, Digest, Position) -> Asset` | Returns the value of one digest variant.| Inspecting directional balances. |

---

## 🧺 CommitIndex

Provides grouped commitments through weighted entry digests.

| Operation | Description | When to Use |
| ----------| ------------ | -----------|
| `prepare_index(AccountId, Reason, [(Digest, Shares)]) -> Result<Index>` | Builds an in-memory index definition from a collection of entry digests and their share weights. This does not register the index.| Preparing a new index before creation. |
| `set_index(AccountId, Reason, Index, Digest) -> Result<Digest>` | Registers a prepared index under a new index digest. Once registered, proprietors can commit to it. | Creating a new index. |
| `set_entry_shares(Reason, IndexDigest, EntryDigest, Shares) -> Result<Digest>` | Creates a new immutable index with updated entry shares. Existing commitments continue referencing the previous index while future commitments use the new structure. Setting shares to zero effectively removes an entry. | Rebalancing an index. |
| `get_index_value(Reason, IndexDigest) -> Asset` | Returns the current aggregate value across all entry digests in the index. | Inspecting total index value.|
| `get_entry_value(Reason, IndexDigest, EntryDigest) -> Asset` | Returns the current value of an individual index entry. | Inspecting one entry. |
| `get_entry_value_for(AccountId, Reason, IndexDigest, EntryDigest) -> Asset`    | Returns a proprietor's current exposure to a specific entry.  | Inspecting one proprietor's allocation. |
| `get_index_value_for(AccountId, Reason, IndexDigest) -> Asset` | Returns the proprietor's total live value across the entire index.| Inspecting a proprietor's complete index commitment. |

---

## 🎯 IndexVariant

Extends indexes by attaching semantic positions to individual entries.

| Operation | Description  | When to Use  |
| ----------| -------------| -------------|
| `set_entry_variant(Reason, IndexDigest, EntryDigest, Position) -> Result<Digest>`| Creates a new immutable index with an updated variant for the specified entry. | Changing an entry's semantic position. |
| `prepare_index_of_variant(AccountId, Reason, [(Digest, Shares, Position)]) -> Result<Index>` | Builds an index whose entries each specify their own variant.| Creating a variant-aware index. |

---

## 🏊 CommitPool

Provides manager-controlled commitment structures.

| Operation | Description | When to Use |
| ----------| ------------|--------------|
| `set_pool(AccountId, Reason, IndexDigest, PoolDigest, Commission) -> Result<Digest>` | Registers a new pool using an existing index digest for initial structure under a the given pool digest. | Creating a managed pool. |
| `set_pool_commission(AccountId, Reason, PoolDigest, Commission) -> Result<Digest>`     | Creates a new immutable pool with the updated commission schedule. Existing commitments continue using the previous pool while future commitments can use the new one.  | Updating pool commission. |
| `set_slot_shares(AccountId, Reason, PoolDigest, SlotDigest, Shares) -> Result<Digest>` | Updates a pool with provided slot allocation. Setting shares to zero effectively removes the slot, while unknown slot digests are added automatically. | Rebalancing pool allocation. |
| `get_pool_value(Reason, PoolDigest) -> Asset` | Returns the current total value managed by the pool. | Inspecting overall pool value. |
| `get_slot_value(Reason, PoolDigest, SlotDigest) -> Asset` | Returns the current value deployed into a specific slot. | Inspecting slot exposure. |
| `get_slot_value_for(AccountId, Reason, PoolDigest, SlotDigest) -> Asset` | Returns a proprietor's current exposure to a specific slot. | Inspecting one proprietor's allocation.       |
| `get_pool_value_for(AccountId, Reason, PoolDigest) -> Asset` | Returns a proprietor's current value across the entire pool. | Inspecting a proprietor's managed commitment. |

---

## 🎯 PoolVariant

Extends pools with semantic positions on individual slots.

| Operation | Description | When to Use |
| ---------| --------------| -----------|
| `set_slot_variant(AccountId, Reason, PoolDigest, SlotDigest, Position) -> Result<Digest>` | Updates a pool with an updated variant for the specified slot. | Repositioning slot exposure. |

---

## 🏛 DigestModel

Determines the structural model represented by a digest.

| Operation | Description | When to Use |
| ----------| ------------| -------------|
| `determine_digest(Reason, Digest) -> DigestModel` | Returns whether a digest represents a Direct commitment, Index, or Pool. | Identifying the commitment model behind a digest. |

---

## 🚀 Next Step

The next section documents minimal commitment extrinsics that are shared globally by all usage pallets.

👉 **Core -> [Extrinsics](./extrinsics.md)**