---
title: 🧭 Start Here
toc_min_heading_level: 2
toc_max_heading_level: 2
---

Every reader arrives with a different goal.

- Some want to understand the ideas.
- Some want to integrate Commitment into a runtime.
- Some want to inspect the architecture.
- Some want to build entirely new accounting models.
- Some simply want to determine whether the design makes sense.

This page helps you find the right documentation path quickly.

---

## 🌱 I'm Completely New

Start here if this is your first time seeing Commitment.

You'll learn:

- what a commitment is
- why it exists
- why it isn't a balance lock
- how lazy settlement works
- the overall lifecycle

### Recommended Reading

- 📘 [Introduction](./intro)
- 🧩 [Commitment Model](./concepts/commitment)
- 🔒 [Commitments vs Locks](./concepts/vs-locks)
- 🧬 [Commit Variants](./concepts/variants)
- 💰 [Lazy Balance](./concepts/lazy-balance)
- 🔄 [Commitment Lifecycle](./concepts/lifecycle)

Do not skip the concepts.

Every architectural decision builds upon them.

---

## ⚙️ I Want to Integrate Commitment

Choose this path if you're building a runtime or consumer pallet.

Typical examples include:

- staking
- governance
- escrow
- lending
- marketplaces
- vaults
- protocol accounting

### Recommended Reading

- 📦 [Installation](./getting-started/installation)
- ⚙️ [Configuration](./getting-started/config)
- 🔒 [Integrating Commitments](./getting-started/integrate)
- 🧺 [Integrating Indexes](./getting-started/index)
- 🏊 [Integrating Pools](./getting-started/pool)
- 🔄 [Operations](./core/operations)
- 🧪 [Testing](./advanced/tests)
- ⚖️ [Weights](./advanced/weights)
- 🪞 [Instances](./advanced/instances)

This path teaches how consumer pallets interact with Commitment exclusively through trait dispatch.

---

## 🏗️ I Want to Understand the Architecture

Choose this path if you're interested in how Commitment works internally.

### Recommended Reading

- 🏛️ [Architecture Overview](./architecture/overview)
- 🧾 [Commitment Architecture](./architecture/commitment)
- 🧺 [Indexes](./architecture/indexes)
- 🏊 [Pools](./architecture/pools)
- 💰 [Balance Architecture](./architecture/balance)
- 🧬 [Variants](./architecture/variants)
- 🆔 [Digests](./architecture/digest)

This explains how ownership, valuation, settlement, indexes, pools, and accounting compose into one execution engine.

---

## 🔌 I Want to Extend the System

Choose this path if you're implementing new accounting semantics or extending Commitment.

### Recommended Reading

- 🧩 [Custom Balance Models](./advanced/balance)

Most users should **not** need this section.

It is intended for developers building entirely new [LazyBalance](./concepts/lazy-balance.md) implementations or extending the Commitment engine itself.

---

## 🌐 I'm Building RPCs, APIs or Frontends

Choose this path if you're developing:

- wallets
- explorers
- dashboards
- indexers
- RPC providers
- UI applications

### Recommended Reading

- 🌐 [RPC + UI](./core/rpc-ui)
- 🧪 [Inspectors](./core/inspectors)
- 📡 [Events](./core/events)
- 🔄 [Operations](./core/operations)

For production applications, use the pallet's public APIs.

Inspector extrinsics are intended only for development and debugging.

---

## 🔍 I Want to Review or Criticize the Design

That's always welcome.

If you're evaluating, reviewing, or challenging the design, please read the documentation in full before forming conclusions.

Many initial objections arise from treating Commitment as:

- a balance pallet
- a locking pallet
- a staking pallet

It is none of those.

Commitment is a **lazy financial accounting engine**.

The concepts, architecture, and implementation are intentionally layered, and many design decisions only become clear when viewed as a whole.

Thoughtful criticism helps improve the project, and well-informed discussions are always appreciated.


---

## 🛠️ I Want to Contribute

If you plan to modify the pallet itself, start with the architecture before reading implementation details.

### Recommended Reading

- 🏛️ [Architecture Overview](./architecture/overview)
- 🔄 [Operations](./core/operations)
- 🧩 [Custom Balance Models](./advanced/balance)
- 📡 [Events](./core/events)
- 🚫 [Errors](./core/errors)
- 🧪 [Testing](./advanced/tests)
- 🧪 [Inspectors](./core/inspectors)

The Commitment engine maintains strong accounting invariants.

Understanding those invariants is significantly more important than understanding individual methods.

---

## 💡 Advice From Author

This documentation is intentionally layered.

The concepts introduce the fundamental ideas, which are then revisited throughout the architecture, integration, and advanced sections to progressively build a complete mental model of the Commitment engine.

For the best learning experience, the documentation can be read linearly from start to finish, with each section building naturally upon the previous one.

While this documentation aims to cover the complete public architecture, some low-level implementation details are intentionally deferred until their formal specifications are documented. Until then, the source code should be considered the authoritative reference and inspected directly whenever deeper implementation clarity is required.

The project also provides a very vivid Rust documentation covering every public type, trait, module, and implementation. Whenever a section here references an internal abstraction without going into exhaustive detail, the corresponding Rust documentation should be consulted.

| Rust Documentation | Purpose |
|--------------------|---------|
| [frame_suite](https://auguth.github.io/frame-suite/rust-doc/frame_suite) | Core abstractions including Commitment traits, Lazy Balance interfaces, plugin framework, virtual structures, and shared utilities. |
| [pallet_commitment](https://auguth.github.io/frame-suite/rust-doc/pallet_commitment) | Complete Commitment pallet implementation, public APIs, runtime configuration, storage, operations, and internal architecture. |
| [frame_plugins](https://auguth.github.io/frame-suite/rust-doc/frame_plugins) | Reference plugin implementations, including `ShareBalanceFamily` and its accounting models. |

Together, this guide and the Rust documentation are intended to complement one another:

- **This documentation** explains the architecture, concepts, and recommended usage.
- **Rust documentation** explains every public API, generic bound, trait, associated type, and implementation detail.
- **Source code** remains the ultimate reference for implementation behaviour until a formal specification is available.

---

## 🚀 Next Step

If you're unsure where to begin, start with the conceptual model.

👉 **Concepts -> [What is a Commitment?](./concepts/commitment.md)**