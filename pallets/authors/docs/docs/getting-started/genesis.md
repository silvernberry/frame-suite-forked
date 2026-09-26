---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🌄 Genesis 

Genesis configuration defines the **initial on-chain state and policy values** of `pallet-authors`.

The runtime `Config` implementation determines **which implementations and plugins** the pallet uses, while `GenesisConfig` determines **the initial values with which those implementations start**.

```text
Runtime Config
      │
      ├── Commitment Adapter
      ├── Asset
      ├── Influence Model
      ├── Flat Election Model
      ├── Fair Election Model
      └── Activity Provider
             │
             ▼
      Genesis Configuration
             │
             ├── Probation parameters
             ├── Funding limits
             ├── Compensation timing
             └── Election parameters
```

For most runtimes, Authors can start with its default genesis configuration:

```rust
authors: pallet_authors::GenesisConfig::default(),
```

The important configuration is therefore not just *whether* genesis is configured, but **which initial policy values are supplied**.

---

## ⚙️ Genesis Config

The generated genesis configuration is used when constructing the chain specification:

```rust
GenesisConfig {
    system: system_genesis(),

    authors: pallet_authors::GenesisConfig {
        // Author-specific genesis values
        ..Default::default()
    },

    ..Default::default()
}
```

A typical deployment can simply use:

```rust
authors: pallet_authors::GenesisConfig::default(),
```

When protocol-specific values are required, they can be supplied explicitly.

---

## ⚠️ Probation Configuration

Genesis establishes the initial parameters used by the Author probation system.

| Parameter               | Purpose                                                          | Example      |
| ----------------------- | ---------------------------------------------------------------- | ------------ |
| `probation_period`      | Initial duration an Author remains under probation.              | `100` blocks |
| `reduce_probation_by`   | Amount removed from outstanding probation when risk is resolved. | `10` blocks  |
| `increase_probation_by` | Amount added when additional risk is introduced.                 | `25` blocks  |

For example:

```rust
authors: pallet_authors::GenesisConfig {
    probation_period: 100,
    reduce_probation_by: 10,
    increase_probation_by: 25,
    ..Default::default()
}
```

This means a newly enrolled Author could initially have:

```text
100 blocks
    │
    ├── good behavior
    │      ↓
    │   -10 blocks
    │
    └── new risk
           ↓
        +25 blocks
```

So if an Author has `60` blocks remaining and its risk is resolved:

```text
60 - 10 = 50 blocks
```

If new risk is introduced instead:

```text
60 + 25 = 85 blocks
```

The values establish the **initial policy**; the actual remaining probation is maintained per Author.

---


## 💰 Funding Configuration

Genesis can establish the initial limits applied to **each external funding instance**.

| Parameter      | Purpose                                                             |  Example |
| -------------- | ------------------------------------------------------------------- | -------: |
| `min_fund`     | Minimum amount a backer must allocate to a single funding instance. |    `100` |
| `max_exposure` | Maximum amount a backer may allocate to a single funding instance.  | `10_000` |

For example:

```rust
authors: pallet_authors::GenesisConfig {
    min_fund: 100,
    max_exposure: 10_000,
    ..Default::default()
}
```

A backer's funding instance is therefore bounded independently:

```text
Backer
   │
   │ Allocate 2,000
   ▼
Author
```

The `2,000` allocation is valid because it falls within:

```text
100 ≤ 2,000 ≤ 10,000
```

The same principle applies regardless of how the funding is represented by the commitment layer:

```text
                 Backer
                   │
          ┌────────┼────────┐
          │        │        │
       Direct    Index     Pool
          │        │        │
          └────────┼────────┘
                   ▼
              Commitment
                   │
                   ▼
                Author
```

From the Author funding layer, the important value is simply:

> **How much has this backer allocated to this Author through this funding instance?**

The underlying commitment mechanism may represent that allocation as a **Direct**, **Index**, or **Pool** commitment. The funding limits do not need to understand those accounting structures.

For example, three independent funding instances could exist:

```text
Author
  │
  ├── Backer A → 2,000
  ├── Backer B → 5,000
  └── Backer C → 8,000
```

Each instance is checked independently against the configured limits.

`max_exposure = 10,000` therefore means **a single funding instance cannot expose more than `10,000`**, rather than saying that the Author can receive only `10,000` of total external backing.

This distinction is important because an Author may legitimately have many independent backers:

```text
Backer A ──┐
Backer B ──┤
Backer C ──┼──→ Author
Backer D ──┤
Backer E ──┘
```

The aggregate economic position may consequently be much larger than `max_exposure`.

---

## 🎁 Compensation Configuration

The compensation parameters are different: they describe the **temporal handling of rewards and penalties** rather than the size of an individual funding instance.

| Parameter          | Purpose                                    |     Example |
| ------------------ | ------------------------------------------ | ----------: |
| `rewards_buffer`   | Delay before a reward becomes applicable.  | `20` blocks |
| `penalties_buffer` | Delay before a penalty becomes applicable. | `50` blocks |
| `rewards_until`    | Initial reward-processing boundary.        |         `0` |
| `penalties_until`  | Initial penalty-processing boundary.       |         `0` |

For example:

```rust
authors: pallet_authors::GenesisConfig {
    rewards_buffer: 20,
    penalties_buffer: 50,
    ..Default::default()
}
```

A duty pallet could create a reward at block `1,000`:

```text
Block 1000
   │
   │ Reward
   ▼
Commitment
   │
   │ +20 blocks
   ▼
Block 1020
   │
   ▼
Reward becomes applicable
```

Likewise:

```text
Block 1000
   │
   │ Penalty
   ▼
Commitment
   │
   │ +50 blocks
   ▼
Block 1050
   │
   ▼
Penalty becomes applicable
```

The important distinction is that **funding limits describe an individual backing allocation**, while compensation buffers describe **when a commitment-based reward or penalty becomes applicable**.

In both cases, `pallet-authors` operates at the role/funding abstraction level, while the configured `pallet-commitment` implementation handles the underlying economic representation.


## 🗳️ Election Configuration

Genesis establishes the initial election bounds.

| Parameter           | Purpose                                              | Example |
| ------------------- | ---------------------------------------------------- | ------: |
| `min_elected`       | Minimum number of Authors expected from an election. |     `3` |
| `max_elected`       | Maximum number of Authors allowed in the result.     |    `10` |
| `force_max_elected` | Whether results exceeding the maximum are truncated. |  `true` |
| `recent_elected_on` | Initial block reference for election state.          |     `0` |
| `elected`           | Initial stored election result.                      |   empty |

For example:

```rust
authors: pallet_authors::GenesisConfig {
    min_elected: 3,
    max_elected: 10,
    force_max_elected: true,
    ..Default::default()
}
```

The election plugin may produce:

```text
12 candidates
     │
     ▼
Election Plugin
     │
     ▼
12 selected
     │
     │ max_elected = 10
     ▼
10 elected Authors
```

`force_max_elected` determines how the maximum is enforced.

The important distinction is:

```text
Config
  │
  ├── FlatElectionModel ──→ how Flat election works
  └── FairElectionModel ──→ how Fair election works

Genesis
  │
  ├── MinElected
  ├── MaxElected
  └── ForceMaxElected
             │
             ▼
       election bounds
```

The plugin determines **the algorithm**.

Genesis determines **the initial limits** around its result.

---

## 👤 Initial Authors

Authors are normally **not created through genesis**.

Instead, the normal lifecycle begins after the chain starts:

```text
Chain Genesis
      │
      ▼
Runtime starts
      │
      ▼
Alice
      │
      │ RoleManager::enroll(
      │     Alice,
      │     1_000,
      │     false
      │ )
      ▼
Author
      │
      ▼
Probation
```

For example, if Alice enrolls with `1,000` units of self-collateral:

```rust
RoleManager::enroll(
    alice,
    1_000,
    false,
)
```

the `1,000` is established through the configured commitment system rather than simply becoming an arbitrary Authors storage value.

This keeps the initial Author population open.

### Bootstrap Authors

A protocol that requires predefined Authors can explicitly construct them during genesis, but this is primarily a **block-authoring concern**, not a general role-management concern.

For a general role system, `pallet-authors` provides the lifecycle through which participants become Authors after the chain has started:

```text
Account
   │
   │ RoleManager::enroll(...)
   ▼
Author
```

Bootstrap becomes relevant when a protocol needs an **initial, predefined set of Authors before normal runtime participation can begin**—particularly in block-authoring systems where the chain needs to know its initial authoring set from genesis.

This is typically handled by infrastructure such as **`pallet-session`**, where the initial validator/authoring set is established as part of the chain's bootstrap configuration.

This should therefore be distinguished from the responsibility of `pallet-authors`:

| Concern                         | Responsibility                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **Role management**             | `pallet-authors` manages enrollment, lifecycle, collateral, probation, funding, etc.     |
| **Initial block-authoring set** | Block-authoring infrastructure such as `pallet-session` can establish the bootstrap set. |
| **Ongoing elections**           | `pallet-authors` can provide the election machinery used to select Authors for duties.   |
| **Duty assignment**             | A consuming duty pallet determines which elected Authors perform which duties.           |

Thus, a runtime does **not** need to pre-populate Authors merely because it uses `pallet-authors`.

> **Bootstrap exists because a particular protocol needs an initial set of participants—not because role management inherently requires genesis Authors.**

---

## 🔗 Commitment Is Not Reconfigured Here

`pallet-authors` does not duplicate the genesis configuration of `pallet-commitment`.

The economic implementation is selected through:

```rust
impl pallet_authors::Config for Runtime {
    type CommitmentAdapter = pallet_commitment::Pallet<Self>;
}
```

Genesis then establishes the **Author-side policy**, while Commitment retains responsibility for its own economic state.

```text
Authors Genesis
      │
      ├── probation policy
      ├── funding policy
      ├── compensation timing
      └── election policy
             │
             ▼
       pallet-authors
             │
             ▼
    CommitmentAdapter
             │
             ▼
     pallet-commitment
```

This preserves the separation between **compile-time architecture** and **initial runtime state**.

---

## 🧱 Complete Example

A protocol might choose the following initial policy:

```rust
authors: pallet_authors::GenesisConfig {
    // Probation
    probation_period: 100,
    reduce_probation_by: 10,
    increase_probation_by: 25,

    // External funding
    min_fund: 100,
    max_exposure: 10_000,

    // Compensation
    rewards_buffer: 20,
    penalties_buffer: 50,

    // Election
    min_elected: 3,
    max_elected: 10,
    force_max_elected: true,

    ..Default::default()
}
```

This produces an initial policy roughly equivalent to:

```text
                         Authors
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
   Probation             Funding             Election
       │                    │                    │
   100 blocks            min: 100            min: 3
   ↓ -10                 max: 10,000         max: 10
   ↑ +25                                      force: yes
       │
       └──────────── Compensation
                         │
                   reward: 20 blocks
                  penalty: 50 blocks
```

---

## 🏛️ Genesis vs Governance

Genesis values should generally be understood as **initial protocol values**, not necessarily permanent constants.

For example:

```text
Genesis
   │
   │ initial values
   ▼
Live Runtime
   │
   │ governance
   ▼
Updated Policy
```

A protocol could initially configure:

```text
Minimum collateral = 1,000
Probation          = 100 blocks
Max elected        = 10
```

and governance could later change them as the protocol evolves.

This is particularly important for Authors because the economic requirements of a role may need to change as:

* the Author set grows
* the value secured by the role increases
* duty requirements become more demanding
* external backing becomes more important
* election participation changes

> **Genesis establishes the starting policy. Governance can evolve that policy without changing the underlying role architecture.**

---

## 🚀 Recommended Setup

For a runtime that is happy with the pallet defaults:

```rust
authors: pallet_authors::GenesisConfig::default(),
```

For a protocol with explicit economic and lifecycle requirements:

```rust
authors: pallet_authors::GenesisConfig {
    probation_period: /* e.g. 100 */,
    reduce_probation_by: /* e.g. 10 */,
    increase_probation_by: /* e.g. 25 */,

    min_fund: /* e.g. 100 */,
    max_exposure: /* e.g. 10_000 */,

    rewards_buffer: /* e.g. 20 */,
    penalties_buffer: /* e.g. 50 */,

    min_elected: /* e.g. 3 */,
    max_elected: /* e.g. 10 */,
    force_max_elected: /* e.g. true */,

    ..Default::default()
}
```

The exact available fields should follow the version of `pallet-authors` being integrated.

> **`Config` chooses the machinery. `GenesisConfig` chooses the initial policy. Governance can then evolve that policy while the chain is running.**
