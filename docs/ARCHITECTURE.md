# Pamoja Protocol Architecture

## Vision

Pamoja Protocol is a decentralized community finance protocol built on Avalanche.

Its goal is to enable communities to collectively save, govern funds, finance productive ventures, and share investment returns without relying on centralized intermediaries.

---

## Core Components

### CommunityFactory

Responsible for creating and registering communities.

Each community is an independent smart contract.

---

### Community

Represents one savings and investment group.

Responsible for:

- Member management
- Treasury
- Shares
- Governance
- Investment proposals

---

## Assets

The treasury stores AVAX (MVP).

Future versions may support ERC20 tokens such as USDC.

---

## Governance

Every funding request becomes a proposal.

Members vote.

Approved proposals execute automatically.

---

## Shares

Every contribution mints ownership shares.

Shares determine ownership percentage of the treasury and future investment returns.

Shares are non-transferable in Version 1.