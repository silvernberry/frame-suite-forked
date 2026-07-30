---
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# 🧪 Testing 

Consumer pallets should test against the **real Commitment engine**.

`pallet-commitment` already contains comprehensive tests for its own accounting, receipts, indexes, pools, and lazy balance implementation.

Consumer pallets should therefore focus on verifying their own protocol logic while integrating with a fully configured Commitment runtime.

The recommended approach is:

> build a complete mock runtime and use the real Commitment adapter exactly as production does.

---

## 🧠 Testing Philosophy

Your pallet owns the protocol.

`pallet-commitment` owns commitment execution.

Tests should verify things like:

* correct commitment reasons
* correct digests
* correct variants
* correct index or pool usage
* protocol state transitions

rather than re-testing Commitment's internal implementation.

Think of Commitment like `pallet-balances`.

You integrate with it. You do not replace it.

---

## 🏗️ Build a Real Runtime

A typical mock runtime should include:

```rust
#[frame_support::runtime]
mod runtime {
    #[runtime::runtime]
    #[runtime::derive(
        RuntimeCall,
        RuntimeEvent,
        RuntimeError,
        RuntimeOrigin,
        RuntimeFreezeReason,
        RuntimeHoldReason,
        RuntimeSlashReason,
        RuntimeLockId,
        RuntimeTask
    )]
    pub struct Test;

    #[runtime::pallet_index(0)]
    pub type System = frame_system::Pallet<Test>;

    #[runtime::pallet_index(1)]
    pub type Xp = pallet_xp::Pallet<Test>;
    // or (use either for underlying fungible system)
    #[runtime::pallet_index(2)]
    pub type Balances = pallet_balances::Pallet<Test>;

    #[runtime::pallet_index(3)]
    pub type Commitment = pallet_commitment::Pallet<Test>;

    #[runtime::pallet_index(4)]
    pub type Consumer = pallet_consumer::Pallet<Test>;
}
```

This ensures every commitment operation executes through the complete runtime stack.

### Configure Commitment Normally

Implement `pallet_commitment::Config` exactly as you would in production.

Example:

```rust
impl pallet_commitment::Config for Test {
    type RuntimeEvent = RuntimeEvent;

    type Shares = u32;
    type Bias = FixedU64;
    type Time = u32;
    type Commission = Perbill;

    type Asset = Balances;

    type Position = frame_suite::Disposition;
    type AssetHold = RuntimeHoldReason;
    type AssetFreeze = RuntimeFreezeReason;

    type MaxIndexEntries = ConstU32<15>;
    type MaxCommits = ConstU32<5>;

    type BalanceFamily<'a> =
        frame_plugins::ShareBalanceFamily<'a>;

    type BalanceContext =
        TestBalanceContext<Commitment>;

    type WeightInfo =
        pallet_commitment::weights::SubstrateWeight<Test>;

    type EmitEvents = ConstBool<true>;
}

// For wiring pallet environment to plugin environment
frame_suite::plugin_context!(
    name: pub TestBalanceContext,
    context: frame_plugins::ShareBalanceContext<T>,
    marker: [T],
    value: ShareBalanceContext(PhantomData)
);
```

For testing, the default Commitment configuration is recommended.

Only change configuration values when a test explicitly depends on them.

For example:

* maximum commit limits
* custom balance plugins
* commission types
* share types
* variant implementations

Otherwise, keeping the default configuration makes tests closely resemble production behaviour.

### Provide Fully Resolved Runtime Types

The mock runtime should expose the same concrete runtime types used by production.

For example:

```text
AccountId32
u32
RuntimeFreezeReason
RuntimeHoldReason
Disposition
Perbill
FixedU64
```

Avoid simplified testing-only placeholder types.

Using fully resolved runtime types allows Commitment to execute exactly as it would inside the actual runtime.

### Wire the Commitment Adapter

Consumer pallets should continue using the adapter pattern.

Example:

```rust
#[pallet::config]
pub trait Config: frame_system::Config {
    type CommitmentAdapter:
        Commitment<Self::AccountId>;
}
```

Inside the mock runtime:

```rust
impl pallet_consumer::Config for Test {
    type RuntimeEvent = RuntimeEvent;

    type CommitmentAdapter =
        pallet_commitment::Pallet<Test>;

    // remaining associated types...
}
```

The adapter should always point to the real Commitment pallet.

---

## 🔌 Test Through Trait Dispatch

Tests should invoke mock Commitment with fully resolved types as opposed to generic adapter pattern.

For example:

```rust
<pallet_consumer::Pallet<Test> as Config<Test>>::CommitmentAdapter::place_commit(...)?;

pallet_consumer::Pallet<Test>::CommitmentAdapter::raise_commit(...)?;

pallet_consumer::Pallet<Test>::CommitmentAdapter::resolve_commit(...)?;
```

This ensures tests cover the mocked real public Commitment API.

### Build Reusable Test Helpers

Most Commitment setup is repeated across many tests.

Instead of duplicating this logic, prepare helper functions.

Example:

```rust
fn reserve(
    who: AccountId,
    amount: Balance,
) {
    assert_ok!(
        pallet_consumer::Pallet<Test>::CommitmentAdapter::deposit_reserve(
            RuntimeOrigin::signed(who),
            amount,
        )
    );
}
```

Prepare common digests:

```rust
fn validator() -> AccountId {
    VALIDATOR
}

fn proposal() -> AccountId {
    PROPOSAL
}
```

If your pallet uses indexes:

```rust
fn prepare_index() -> AccountId {
    assert_ok!(
        pallet_consumer::Pallet<Test>::CommitmentAdapter::set_index(
            ...
        )
    );

    INDEX
}
```

If your pallet uses pools:

```rust
fn prepare_pool() -> AccountId {
    assert_ok!(
        pallet_consumer::Pallet<Test>::CommitmentAdapter::set_pool(
            ...
        )
    );

    POOL
}
```

Keeping setup inside helpers makes individual tests concise and easier to understand.

### Verify Through Public APIs

After executing protocol logic, verify Commitment state using its public query APIs if neccessary or utilize trait-based query methods.

Example:

```rust
assert_eq!(
    pallet_commitment::Pallet<Test>::query_commit_value(
        ALICE,
        RuntimeFreezeReason::Stake.into(),
    )?,
    100
);
```

or

```rust
assert_eq!(
    <pallet_consumer::Pallet<Test> as Config<Test>>::CommitmentAdapter::get_pool_value(
        RuntimeFreezeReason::Pool.into(),
        POOL,
    )?,
    expected_value
);
```

Avoid asserting internal storage unless storage itself is the subject of the test.

The public query APIs automatically resolve lazy accounting and therefore represent the current economic state.

---

## 🚧 Test Failure Paths

Consumer pallets should also verify intended Commitment failures.

Typical cases include:

* insufficient reserve
* duplicate commitments
* unresolved commitments
* invalid digest
* invalid index
* missing pool
* unauthorized manager
* invalid variants

Commitment provides exhaustive diagnostics.

Consumer pallets should generally propagate these errors directly using the `?` operator rather than mapping them into pallet-specific errors.

This preserves the original error information and simplifies debugging.

---

## 🧪 Typical Test Structure

A Commitment integration test usually follows this pattern:

```rust
#[test]
fn place_commit_works() {
    new_test_ext().execute_with(|| {
        reserve(ALICE, 100);

        assert_ok!(
            Consumer::stake(
                RuntimeOrigin::signed(ALICE),
                VALIDATOR,
                100,
            )
        );

        assert_eq!(
            pallet_commitment::Pallet<Test>::Commitment::query_commit_value(
                ALICE,
                RuntimeFreezeReason::Stake.into(),
            )
            .unwrap(),
            100
        );
    });
}
```

The test interacts with the consumer pallet, while Commitment executes the underlying accounting automatically.

This mirrors production behaviour and provides the highest confidence in protocol correctness.

---

## 📌 In One Sentence

> Consumer pallets should test using the real `pallet-commitment` implementation, a fully configured mock runtime, and the fully resolved `CommitmentAdapter`, while keeping the default Commitment configuration unless different behaviour is explicitly required.

---

## 🚀 Next Step

The next section explores extending `pallet-commitment` through custom Lazy Balance plugins and alternative accounting models.

👉 **Advanced -> [Custom Balances](./balance.md)**
