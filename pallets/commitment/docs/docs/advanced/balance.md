---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# ⚖️ Custom Balance Models

`pallet-commitment` does not implement its accounting model directly.

Instead, every deposit, withdrawal, reward, penalty, and balance query is delegated to a plugin-family (root-plugin) adhering to pallet-commitment's **Lazy Balance implementation**.

This is one of the primary extension points of the pallet.

Different runtimes may provide different accounting semantics without modifying the Commitment engine itself.

```text
Commitment
-> LazyBalance
-> Plugin Family
-> Plugin Models
-> Accounting Behaviour
```

The pallet remains identical. Only the accounting implementation changes.

---

## 🧠 When Should You Build One?

Most runtimes should **not** implement a custom balance model.

The provided `frame_plugins::ShareBalanceFamily` already implements a complete, production-ready accounting model based on proportional ownership.

It is:

* receipt-based
* lazily evaluated
* O(1) for all operations
* plugin-driven
* unbounded
* production tested

The only behavioural restrictions are:

```text
Deposit
-> Mint / Reap
-> Withdraw
```

A balance must first be initialized through a deposit before minting or reaping can occur. 

And additionally 

```text
Drain / Full Reap
-> Mint
-> Deposit
```

A fully drained (completely reaped) balance cannot be revived until a mint operation occurs.

Apart from that, the model intentionally places no additional accounting restrictions. For almost every financial protocol, this is the recommended balance implementation.

Custom balance models should only be introduced when a runtime requires fundamentally different accounting semantics that cannot be enforced in an usage pallet.

---

## 🏛 Lazy Balance Architecture

Every balance model implements the same interface from `frame_suite::assets`:

```rust
pub trait LazyBalance {
    type Balance;
    type Receipt;
    type SnapShot;
    type Input<'a>;
    type Output<'a>;
    type Limits;
    // ...
}
```

A complete implementation consists of six primary components.

| Component | Responsibility | Notion |
|-----------|----------------| -------|
| `Balance` | Canonical mutable accounting state | A Global Mutable Storage |
| `Receipt` | Immutable ownership claim | An Independent Claim to the Global Storage |
| `Snapshot` | Historical balance projection | An Independent Snapshot of the Global Storage |
| `Input` | Operation input carrier | Unified Input Arguments Carrier (enum) for all operations |
| `Output` | Operation result carrier | Unified Output Arguments Carrier (enum) for all operations |
| `Limits` | Dynamic execution limits | Execution restrictions for each operations |

Together they define the complete accounting model.

The Commitment pallet never interprets these structures directly, as every component is a virtual type which structured is deferred to be defined elsewhere and every operation is delegated through the configured plugin family.

---

## 🔌 Plugin Families

A balance model is implemented as a **plugin family**.

Instead of implementing the entire accounting engine inside one type, each operation is implemented independently as a **plugin model**. Every plugin model is a zero-sized marker type whose behaviour is defined through the `frame_suite::plugin_model!` macro.

The plugin family itself contains no accounting logic. Its responsibility is simply to compose these independent models into a single implementation of the `LazyBalance` interface.

A typical family is declared using `frame_suite::define_family!`:

```rust
define_family! {
    root: LazyBalanceRoot,

    family: pub ShareBalanceFamily,

    borrow: ['a],

    input: In,
    output: Out,

    context: ShareBalanceContext<T>,

    marker: [T],

    child: [
        Deposit => ModelDeposit,
        Withdraw => ModelWithdraw,
        Mint => ModelMint,
        Reap => ModelReap,
        Drain => ModelDrain,

        CanDeposit => ModelCanDeposit,
        CanWithdraw => ModelCanWithdraw,
        CanMint => ModelCanMint,
        CanReap => ModelCanReap,

        TotalValue => ModelTotalValue,
        ReceiptActiveValue => ModelReceiptActiveValue,
        ReceiptDepositValue => ModelReceiptDepositValue,
        HasDeposits => ModelHasDeposits,

        DepositLimits => ModelDepositLimits,
        MintLimits => ModelMintLimits,
        ReapLimits => ModelReapLimits,
    ]
}
```

> For detailed information see interface declaration modules `frame_suite::plugins` , `frame_suite::virtuals`, `frame_suite::assets`, and the `LazyBalance` implementation module `pallet_commitment::balance` and the plugin-family `ShareBalanceFamily`'s reference implementation in `frame_plugins::balance`

Each child model is then implemented independently using `plugin_model!`.

For example:

```rust
plugin_model!(
    name: pub ModelDeposit,
    input: In,
    output: Out,
    context: ShareBalanceContext<T>,
    compute: |input, context| {
        // Deposit implementation
    }
);
```

Likewise:

```rust
plugin_model!(
    name: pub ModelWithdraw,
    ...
);

plugin_model!(
    name: pub ModelMint,
    ...
);

plugin_model!(
    name: pub ModelReap,
    ...
);
```

Every model encapsulates the complete behaviour for exactly one accounting operation. This keeps each operation isolated while allowing the family to expose a unified accounting engine.

---

## 🧩 Plugin Models

Plugin models naturally fall into four categories.

### Execution Models

These perform state transitions on the balance.

```text
ModelDeposit
ModelWithdraw
ModelMint
ModelReap
ModelDrain
```

---

### Validation Models

These validate an operation before execution without mutating state.

```text
ModelCanDeposit
ModelCanWithdraw
ModelCanMint
ModelCanReap
```

---

### Query Models

These provide read-only access to the accounting state.

```text
ModelTotalValue
ModelReceiptActiveValue
ModelReceiptDepositValue
ModelHasDeposits
```

---

### Limit Models

These expose execution limits for each operation.

```text
ModelDepositLimits
ModelMintLimits
ModelReapLimits
```

---

Together, these independent models form the complete implementation of the `LazyBalance` interface. The `ShareBalanceFamily` simply binds every operation defined by `LazyBalanceRoot` (a plugin-family root marker) to its corresponding plugin model.

For example:

```text
Deposit            -> ModelDeposit
Withdraw           -> ModelWithdraw
Mint               -> ModelMint
Reap               -> ModelReap
Drain              -> ModelDrain

CanDeposit         -> ModelCanDeposit
CanWithdraw        -> ModelCanWithdraw
CanMint            -> ModelCanMint
CanReap            -> ModelCanReap

TotalValue         -> ModelTotalValue
ReceiptActiveValue -> ModelReceiptActiveValue
ReceiptDepositValue-> ModelReceiptDepositValue
HasDeposits        -> ModelHasDeposits

DepositLimits      -> ModelDepositLimits
MintLimits         -> ModelMintLimits
ReapLimits         -> ModelReapLimits
```

From the perspective of `pallet-commitment`, none of these models are invoked directly. The pallet interacts exclusively with the `LazyBalance` interface, while the configured plugin family transparently dispatches each operation to its corresponding plugin model. This separation keeps the commitment engine completely independent of the underlying accounting implementation, allowing different balance models to be integrated without changing any commitment logic.

---
## 🏗 Virtual Balance Components

Unlike conventional accounting interfaces, `LazyBalance` never prescribes the concrete structure of its accounting state.

Instead, it defines only a family of associated types and its expected behaviours on the generic type:

```rust
pub trait LazyBalance {
    type Balance: LazyBoundsForBalance ;
    type Receipt: LazyBoundsForReceipt ;
    type SnapShot: LazyBoundsForSnapShot ;

    type Input<'a>: LazyBoundsForInput ;
    type Output<'a>: LazyBoundsForOutput ;

    type Limits: LazyBoundsForLimits;

    type BalanceFamily<'a>: PluginBounds;
    type BalanceContext: PluginContextBounds;
}
```

Notice that none of these types have any prescribed fields since its a generic associated type bounded by behavioural bounds.

There is no required:

```rust
struct Balance {
    ...
}
```

nor

```rust
struct Receipt {
    ...
}
```

inside either `LazyBalance` or `pallet-commitment`.

Instead, the entire schema is deferred to the balance implementation through the Virtual framework (`frame_suite::virtuals`).

| Component | Responsibility | Defined By |
|-----------|----------------|------------|
| `Balance` | Canonical mutable accounting state | Balance implementation |
| `Receipt` | Immutable ownership claim | Balance implementation |
| `SnapShot` | Historical balance projection | Balance implementation |
| `Input` | Unified operation arguments | Balance implementation |
| `Output` | Unified operation results | Balance implementation |
| `Limits` | Dynamic execution limits | Balance implementation |

This allows the Commitment engine to remain completely agnostic of how accounting data is represented.

> Commitment allows an external plugins to define its own logic and structures whereas commitment-engine uses these structures for ownership semantics only.

---

### Virtual Structures

The three primary accounting structures

```text
Balance
Receipt
SnapShot
```

are therefore **virtual structures**.

Unlike ordinary Rust structs, they are not defined by the interface itself.

Instead, the balance implementation defers the construction of virtual fields (based on type-uniqueness) that compose each structure.

Conceptually, instead of writing:

```rust
type Balance =  struct Balance {
    effective: Asset,
    shares: Rational,
    checkpoint: Time,
}
```

you defer

```rust
type Balance =  T::VirtualBalance
```

the defered implementation defines each field independently through the Virtual & Plugin framework.

The resulting structure may expose fields such as:

```text
Balance
----------
Effective
Shares
Bias
Checkpoint
DrainPoint
```

Where multiple fields belong to the same type.

while receipts may expose:

```text
Receipt
----------
Principal
Shares
CreatedAt
```

and snapshots:

```text
SnapShot
----------
Effective
Shares
Epoch
```

These schemas are entirely implementation-defined.

Another balance model could instead expose:

```text
Receipt
----------
Debt
Interest
Collateral
LiquidationPrice
```

without requiring any modification to either `LazyBalance` or `pallet-commitment`.

---

### Building a Custom Schema

When creating a custom balance implementation, the first step is defining these virtual structures.

The balance plugin model decides:

- which fields exist
- which component owns them
- which fields are mutable
- which fields participate in execution
- which extension fields are exposed

For example, a share-based implementation naturally stores:

```text
Balance
------------
Effective Value
Issued Shares
Bias

Receipt
------------
Owned Shares
Principal

SnapShot
------------
Historical Effective Value
Historical Share Supply
```

whereas a debt-based accounting model might instead define:

```text
Balance
------------
Outstanding Debt
Interest Rate

Receipt
------------
Borrow Principal
Accrued Interest

SnapShot
------------
Debt At Epoch
```

The Commitment pallet never assumes any of these fields exist.

Only the balance plugin implementation understands their meaning.

---

### Context-Driven Resolution

Virtual structures are materialized through the configured execution context.

Inside the runtime:

```rust
impl pallet_commitment::Config for Runtime {
    type BalanceFamily<'a> =
        MyBalanceFamily<'a>;

    type BalanceContext =
        MyBalanceContext<Commitment>;
}
```

The context provides everything required to resolve the virtual schema, including:

- virtual field definitions
- extension schemas
- dynamic bounds
- storage adapters
- error types
- phantom data resolution

Consequently, the associated types declared by `LazyBalance` become fully realized only after the runtime selects a concrete balance implementation.

Until then:

```text
Balance
Receipt
SnapShot
```

remain abstract accounting components.

---

### Plugin Models Operate on Virtual Structures

Once the virtual schema has been defined, every plugin model operates on those structures.

For example:

```text
ModelDeposit(Amount, mut Balance) -> Receipt
```

creates and mutates the initial accounting state.

Likewise:

```text
ModelMint(Amount, mut Balance)
```

updates only the shared balance.

While:

```text
ModelWithdraw(Receipt, mut Balance)-> Amount
```

consumes a receipt and settles the final value.

Every plugin therefore manipulates the virtual structures defined by the balance implementation rather than concrete structs owned by `pallet-commitment`.

---

### Why This Matters

This separation is the foundation of the Lazy Balance architecture.

The Commitment engine depends only on behavioural contracts exposed through the `LazyBalance` interface.

It never knows whether a balance stores:

```text
Effective Value
Issued Shares
Bias
Checkpoint
```

or instead stores:

```text
Debt
Interest
Collateral
```

Likewise, it never assumes what information a receipt or snapshot contains.

Those details belong entirely to the configured balance implementation.

As a result, completely different financial accounting models can be integrated into the same Commitment engine while preserving an identical public API and execution flow.

---

## ⚖️ ShareBalanceFamily

`frame_plugins::ShareBalanceFamily` is the reference `LazyBalance` implementation provided by the framework. It implements a **share-based lazy accounting model**, where receipts represent proportional ownership of a shared balance rather than fixed asset values. 

Its accounting model follows the lifecycle:

```text
ShareBalance
-> Deposit
-> Issue Shares
-> Mint / Reap
-> Update Shared Balance
-> Withdraw
-> Redeem Shares
```

Each deposit mints a proportional number of shares and issues an immutable receipt containing those shares. Subsequent balance mutations through minting or reaping adjust only the shared balance state. Receipt values are never updated, instead, they are resolved lazily during withdrawal using the current share price. 

This model provides:

* constant-time (`O(1)`) execution for every accounting operation
* immutable receipt history
* proportional reward and penalty distribution
* lazy settlement without receipt mutation
* unbounded accounting semantics

Unlike bounded accounting models, `ShareBalanceFamily` intentionally imposes very few operational restrictions. The primary lifecycle invariant is that a balance must first be initialized through a **deposit** before it can participate in **mint** or **reap** operations. A fully drained balance likewise requires a subsequent mint before accepting new deposits again. 

Because it provides a complete financial accounting model with proportional ownership, deferred settlement, and production-oriented performance characteristics, `ShareBalanceFamily` is the recommended implementation for almost all Commitment deployments. A custom balance implementation should only be introduced when a protocol requires accounting semantics that fundamentally differ from the share-based ownership model. 

---

## 📚 Going Further

This page introduces the architecture of custom balance models at a very high level.

Implementing a new `LazyBalance` model, however, is an advanced Rust task involving generic programming patterns that are intentionally beyond the scope of this documentation.

The balance framework makes extensive use of:

* Generic Associated Types (GATs)
* Mutable Lifetimes
* Compile-time plugin composition
* Context-driven type resolution
* Carefully adjusted trait-solver (DAG) recursion and overflow
* Virtual type systems and deferred structure resolution

A solid understanding of these Rust concepts is recommended before implementing a custom accounting model from scratch.

For developers interested in the complete implementation details, the source itself is intended to serve as the primary reference.

### Recommended Reading Order

The balance framework is intentionally layered.

Reading the modules in the following order provides the clearest understanding of how a complete accounting model is assembled.

| Module | Purpose |
|--------|---------|
| `frame_suite::plugins` | Defines the plugin framework, including plugin families, plugin models, dispatch, execution contexts, and compile-time composition. This is the foundation of the entire balance architecture. |
| `frame_suite::virtuals` | Introduces the virtual type system used to define deferred structures, virtual fields, extensions, bounds, and schemas without prescribing concrete representations. |
| `frame_suite::assets` | Defines the `LazyBalance` interface and the accounting contracts expected by `pallet-commitment`, including associated types, execution operations, limits, and query APIs. |
| `pallet_commitment::balance` | Bridges the generic `LazyBalance` interface into the Commitment pallet by delegating every accounting operation to the configured plugin family. This is the integration layer between Commitment and the balance framework. |
| `frame_plugins::balance` | Contains `ShareBalanceFamily`, the reference implementation of a complete lazy accounting model. It demonstrates how virtual structures, plugin models, contexts, and families combine to implement a production-ready balance engine. |

A recommended approach is:

```text
frame_suite::plugins
-> Understand plugin composition

frame_suite::virtuals
-> Understand deferred structures

frame_suite::assets
-> Understand the LazyBalance interface and testing methodologies

pallet_commitment::balance
-> See how Commitment delegates accounting

frame_plugins::balance
-> Study a complete production implementation
```

Following this progression moves from the most generic abstractions to the concrete reference implementation, making it significantly easier to understand how each layer contributes to the overall architecture.

For most runtimes, implementing a custom balance model is unnecessary, as `ShareBalanceFamily` already provides a complete, extensible, and production-ready accounting engine. These modules are primarily intended for developers building entirely new financial accounting semantics, or requiring more low-level restrictions (which cannot be imposed at higher-level) rather than configuring existing Commitment behaviour.

### Lazy Balance Model Checker

Every custom balance implementation should also be validated using the **Lazy Balance Model Checker** provided in `frame_suite::assets`.

Unlike conventional unit tests, the model checker performs exhaustive state-space exploration over complete accounting lifecycles while continuously comparing the lazy implementation against an independently implemented simple eager reference model.

It validates:

- accounting invariants
- execution correctness
- receipt lifecycle
- mint/reap semantics
- withdrawal precision
- accounting drift
- expected failure conditions

using configurable guards, traps, state hashing, and breadth-first exploration.

This provides a significantly higher degree of confidence that a custom balance implementation preserves its intended financial semantics across millions of execution paths rather than only a handful of manually written test cases.

The model checker is especially recommended before deploying a new balance model in production, where proving behavioural consistency is far more important than simply achieving unit-test coverage.

For a complete understanding of the model checker, read the `LazyBalanceModelChecker` module alongside:

- `ManualBalanceModel`
- `BalanceState`
- `BalanceOp`
- `BalanceGuards`
- `BalanceTraps`
- `BalanceModelResults`

These types collectively define the exploration engine, reference model, invariant checking, trap-based testing (known failure paths), drift analysis, and report generation facilities used to validate custom `LazyBalance` implementations.

## 🚀 Next Step

Now that custom lazy-balance is introduced, the next section is future protocol directions and planned ecosystem expansion.

👉 **Advanced -> [Upcoming](./upcoming.md)**