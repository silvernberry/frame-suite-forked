---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 💰 Lazy Digests

This is the core of commitment accounting.

A commitment stores **an immutable receipt**, but value does not live inside the receipt.

Value lives inside **the digest balance**, and that balance keeps changing over time.

This is why *receipts never update*, but commitments still have real-time value

This is called:

> lazy resolution

Final value is only realized during `resolve_commit()`

but it can still be queried at any time.  

---

## 🧾 Receipts Never Change

When a commitment is placed:

```text
place_commit()
-> deposit()
-> receipt created
```

that receipt becomes immutable.

It stores:

* ownership claim
* deposit reference state
* entitlement identity

It does **not** store *final withdrawable value*, because final value depends on how the digest evolves later.

The receipt only proves **this user owns a claim**, not what that claim is worth right now.

Even `raise_commit()` does not mutate old receipts.

It creates **new immutable commit receipts** which are accumulated and resolved later.

This keeps commitment history deterministic. 

---

## 🆔 Digests Hold Live Value

The digest is the active mutable state.

It holds the current balance for all commitments bonded to it.

Example:

```text
Alice deposits 100
BOB deposits 100
```
The reason provider updates digest state using:

```rust
Commitment::set_digest_value(digest, 300) // Digest grows to 300
```

Alice's receipt does not change.

But:

```rust 
Commitment::get_commit_value(alice) -> 150
```

now returns the updated live value by querying `LazyBalance::get_receipt_active_value()` internally. 

As the balance system applies that lazily across all receipts (implicitly).

The value changes as a floating live projection from the current digest balance, while receipts remain unchanged.

This is the entire accounting model. 

---

## 🎯 Direct Commitment Queries

For direct commitments:

```text
(Proprietor, Reason)
-> one Digest
-> many variants
-> many immutable receipts
```

the live value of commitments and digests can be queried using:

| Methods                                                 | Purpose                                              |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `get_commit_value(who, reason)`                        | Current real-time value of a proprietor's commitment (one commitment per reason is enforced) |
| `get_digest_value(reason, digest)`                     | Total live value of the default digest variant       |
| `get_digest_value_variant(reason, digest, variant)` | Live value of a specific digest variant              |
| `get_total_value(reason)`                              | Total committed value across the whole reason        |

---

## 🧺 Index Commitment Queries

Indexes work differently.

- The index itself does not own real balance.
- Value lives inside **entry digests**.
- Each entry digest evolves independently.

The proprietor's index commitment is resolved by aggregating all underlying entry receipts stored inside `EntryMap`

This is how one top-level commitment safely distributes across many digests.

| Method | Purpose |
| -------| --------| 
| `get_index_value(reason, index)`  | Current live aggregate value of the full index                                   |
| `get_entry_value(reason, index, entry)` | Current value of one entry digest                                                |
| `get_entry_value_for(who, reason, index, entry)` | Current real-time value of a proprietor's commitment to a specific entry         |
| `get_index_value_for(who, reason, index)`| Current real-time total value of a proprietor's commitment across the full index |

So:

```text
Index receipt stays fixed

Entry digest balances keep changing
```

and final resolution happens only during:

```text
resolve_commit()
```

through all underlying entry withdrawals.  

---

## 🏊 Pool Commitment Queries

Pools are true top-level lazy balances.

- Unlike indexes **Pool itself owns balance**
- A proprietor commits to the pool and receives a pool receipt.
- The pool then acts as a proprietor itself and commits across slot digests.

This means:

```text
pool receipt = top-level ownership

slot digests = effective deployed value
```

| Method | Purpose |
| --------| -------| 
| `get_pool_value(reason, pool_of)`                   | Total live pool value                                                           |
| `get_slot_value(reason, pool_of, slot_of)`          | Current value of one slot                                                       |
| `get_slot_value_for(who, reason, pool_of, slot_of)` | Current real-time value of a proprietor's commitment to a specific slot         |
| `get_pool_value_for(who, reason, pool_of)`          | Current real-time total value of a proprietor's commitment across the full pool |

Pool operations require:

```text
release_pool()
-> mutate balances
-> recover_pool()
```

because the pool maintains one top-level balance over distributed slot commitments.

This is what makes pool accounting fully lazy and manager-controlled. 

### ⚖ Why Pool Slot Value Can Look Skewed

Pools have:

> one top-level balance

A proprietor commits to the pool, not directly to slots.

So querying a slot value (not encouraged) is often:

```text
pool value
-> Release Full Pool
-> apply slot shares
-> projected slot exposure
```

not a direct per-slot deposit.

This is why slot values may look skewed.

Indexes are different:

> direct commitment to each entry

So index entry value is exact ownership, while pool slot value is proportional exposure.

---

## 🧠 Why Query Methods Exist

Direct storage values may not tell the truth.

Receipts stay immutable while digest balances keep changing.

So reading storage alone does not show:

> current real-time value

Without query methods, users would need to withdraw just to know value.

Instead:

```text
query live state

resolve only when needed
```

This preserves lazy accounting and deterministic settlement.

---

## 📌 In One Sentence

```text
Receipt = ownership proof

Digest = live balance state

Resolution = lazy final settlement
```

---

## 🚀 Next Step

Now we move into integrating/installing pallet-commitment towards a runtime where the usage pallet exists to be served.

👉 **Getting Started -> [Installation](../getting-started/installation.md)**
