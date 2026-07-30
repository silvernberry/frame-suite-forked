---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 📢 Events

`pallet-commitment` can emit detailed lifecycle events for every commitment operation.

Unlike consumer pallets, however, these events are **optional**.

Since the pallet acts as shared runtime infrastructure, most protocols already shall emit their own domain-specific events when calling Commitment trait methods.

For this reason, internal commitment events can be disabled in production to avoid unnecessary event duplication.

---

## 🧠 EmitEvents

Event emission is controlled through the pallet [`Config` trait configuration](../getting-started/config.md).

```rust
type EmitEvents = ConstBool<false>;
```

When enabled, the pallet emits events for every major commitment lifecycle operation.

This includes:

* commitment placement and resolution
* digest updates
* index creation
* pool management
* reserve operations

When disabled, these internal lifecycle events are skipped.

The commitment engine still performs exactly the same state transitions. Only event emission changes.

### Recommended Configuration

| Environment | Configuration |
|------------|---------------|
| Local Development | `ConstBool<true>` |
| Production | `ConstBool<false>` |
| Testing | `ConstBool<true>` |
| Benchmarking | `ConstBool<false>` |

---

## 🔕 Why Disable Events?

Every commitment operation is normally initiated by a **consumer pallet**.

For example:

```text
User
-> Staking Pallet
-> Commitment::place_commit()
    -> Commitment Engine
```

The staking pallet already knows:

* who is staking
* which validator
* which era
* which protocol state changed

Therefore it can emit one meaningful protocol event such as:

```rust
StakePlaced {
    staker,
    validator,
    amount,
}
```

instead of:

```text
CommitPlaced
+ DigestUpdated
+ ReasonUpdated
```

This keeps runtime events concise and protocol-oriented instead of exposing internal commitment implementation details.

---

## 🔄 Trait Dispatch Remains Observable

Disabling `EmitEvents` does **not** make commitment operations invisible.

Every commitment action is still initiated through a consumer pallet.

That pallet remains free to emit its own runtime events after each successful trait dispatch.

Example:

```rust
{
    T::Commitment::place_commit(...)?;

    Self::deposit_event(
        Event::StakePlaced { ... }
    );
}
```

This gives complete control over what users see while avoiding duplicate semantically-identical lifecycle events.

---

## 🏦 Reserve Events

Reserve operations are exposed directly as pallet extrinsics.

Therefore they always emit runtime events regardless of `EmitEvents`.

| Event | Payload | Description |
|-------|---------|-------------|
| `ReserveDeposited` | `{ amount: Asset, total_reserve: Asset }` | Funds moved into the commitment reserve. |
| `ReserveWithdrawn` | `{ amount: Asset, total_reserve: Asset }` | Reserved funds returned to free balance. |

---

## 🧾 Commitment Lifecycle Events

When `EmitEvents = ConstBool<true>`, the pallet emits events for direct commitment operations.

| Event | Payload | Description |
|-------|---------|-------------|
| `CommitPlaced` | `{ Proprietor, CommitReason, DigestVariant/Digest, Asset, Position }` | A new commitment is created. |
| `CommitRaised` | `{ Proprietor, CommitReason, DigestVariant/Digest, Asset }` | An existing commitment is increased. |
| `CommitResolved` | `{ Proprietor, CommitReason, DigestVariant/Digest, Asset }` | A commitment is resolved and settled. |
| `DigestInfo` | `{ Digest, CommitReason, Asset, Position }` | A digest balance changes. |
| `DigestReaped` | `{ Digest, CommitReason, Asset }` | An empty digest is removed. |

---

## 🧺 Index Events

These describe index lifecycle changes.

| Event | Payload | Description |
|-------|---------|-------------|
| `IndexInitialized` | `{ IndexDigest, CommitReason, Vec<(EntryDigest, Shares, Position)> }` | A new index is registered. |
| `IndexReaped` | `{ IndexDigest, CommitReason }` | An empty index is removed. |

---

## 🏊 Pool Events

These describe managed pool operations.

| Event | Payload | Description |
|-------|---------|-------------|
| `PoolInitialized` | `{ PoolDigest, CommitReason, Commission, Vec<(SlotDigest, Shares, Position)> }` | A new pool is created. |
| `PoolManager` | `{ PoolDigest, CommitReason, Proprietor }` | Pool manager updated. |
| `PoolSlot` | `{ PoolDigest, CommitReason, SlotDigest, Position, Shares }` | Slot created or updated. |
| `PoolSlotRemoved` | `{ PoolDigest, CommitReason, SlotDigest, Position }` | Slot removed. |
| `PoolCommission` | `{ PoolDigest, CommitReason, Commission }` | Pool commission updated. |
| `PoolReaped` | `{ PoolDigest, CommitReason }` | Empty pool removed. |

---

## 🔍 Development Inspector Events

When the pallet is compiled with the development features described in the [previous section](./inspectors.md), inspector extrinsics emit additional read-only events.

These include:

* `CommitValue`
* `DigestModel`
* `IndexValue`
* `IndexEntryValue`
* `IndexEntriesValue`
* `PoolValue`
* `PoolSlotValue`
* `PoolSlotsValue`
* `AssetIssuable`
* `AssetReapable`
* `ReasonValuation`

These events exist only for debugging and runtime exploration.

---

## 📌 In One Sentence

> `pallet-commitment` can emit detailed internal lifecycle events during development, while production runtimes typically disable them and emit protocol-specific events from consumer pallets instead.

---

## 🚀 Next Step

The next section documents the runtime errors emitted by `pallet-commitment` and their significance.

👉 **Core -> [Errors](./errors.md)**