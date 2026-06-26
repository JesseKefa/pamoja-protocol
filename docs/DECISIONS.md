# Architectural Decisions

## ADR-001

**Decision**

Use a monorepo with separate frontend and contracts projects.

**Reason**

Keeps blockchain and frontend dependencies isolated while maintaining a single repository.

---

## ADR-002

**Decision**

Internally refer to communities as Pools.

Externally present them as Communities.

**Reason**

Pools better describe the protocol abstraction while Communities provide familiar terminology for users.

---

## ADR-003

**Decision**

Use Hardhat 3 with TypeScript and ESM.

**Reason**

Aligns with the latest tooling and keeps the project modern and type-safe.