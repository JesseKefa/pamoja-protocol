# Pamoja Protocol

### Decentralized Community Savings & Lending Infrastructure for Africa

Pamoja Protocol is a Web3 platform inspired by traditional African **Chamas** and community savings groups.

It brings the familiar structure of collective saving, community governance, treasury management, and lending onto the blockchain — providing transparent, programmable, and decentralized financial infrastructure for communities.

> **Pamoja** — *Together.*

---

## Overview

Across Africa, community savings groups such as Chamas, SACCOs, and informal investment groups play an important role in helping people save, invest, and access capital.

However, many of these systems still depend on:

* Manual record keeping
* Informal agreements
* Centralized administrators
* Limited transparency
* Difficult auditing
* Trust between members
* Geographical limitations

Pamoja Protocol explores how blockchain infrastructure can improve these systems while preserving the community-driven model that makes them effective.

Instead of relying on a centralized database, Pamoja stores important community and financial operations on-chain.

Members can:

* Create savings communities
* Join existing communities
* Contribute funds
* Participate in governance
* Vote on proposals
* Request treasury funds
* View community activity
* Track treasury balances
* Participate in transparent community decision-making

---

# Vision

Pamoja aims to become infrastructure for **decentralized community finance across Africa**.

The long-term vision is to create an ecosystem where communities can coordinate savings, lending, investment, and collective financial decisions without relying entirely on centralized intermediaries.

The protocol is designed around three principles:

### Transparency

Important financial and governance activity is recorded on-chain and can be independently verified.

### Community Governance

Communities control their own treasuries and decisions through proposal-based governance.

### Accessibility

Anyone with a compatible crypto wallet can interact with communities regardless of traditional banking infrastructure.

---

# Current Features

## Community Creation

Users can create their own savings communities.

Each community has its own:

* Name
* Description
* Contribution amount
* Members
* Treasury
* Pool address
* Governance structure

Communities are represented by individual smart contract pools.

---

## Community Discovery

Users can browse available communities and inspect information such as:

* Community name
* Description
* Number of members
* Treasury balance
* Contribution requirements
* Pool address

---

## Membership Applications

Users can request to join a community.

Community administrators can review pending membership requests and approve or reject them.

This creates an explicit membership process instead of allowing unrestricted access to community funds.

---

## Contributions

Members can contribute funds to their community treasury according to the community's contribution requirements.

Contributions are recorded on-chain.

The protocol can therefore provide a transparent view of:

* Member contributions
* Community treasury
* Contribution commitments
* Savings activity

---

## Community Treasury

Each community manages its own treasury through its smart contract.

The treasury can eventually be used for:

* Community investments
* Member loans
* Approved expenses
* Collective opportunities
* Other community-approved activities

---

# Governance

Pamoja uses proposal-based governance for important community decisions.

Members can create proposals for community actions and vote on them.

Examples include:

* Treasury withdrawals
* Member loans
* Contribution changes
* Administrative changes
* Other community-level decisions

---

## Proposal Voting

Members can vote:

### YES

Support the proposal.

### NO

Reject the proposal.

When voting against a proposal, the member is required to provide a reason.

This creates an on-chain record of not only the voting decision but also the rationale behind opposition.

Example:

```text
Vote: NO

Reason:
The proposed withdrawal is too large relative to the current
community treasury and should be reduced.
```

---

## Proposal Evidence

Proposals can optionally contain supporting evidence through an `evidenceURI`.

This can be used to reference:

* Documents
* Investment proposals
* External research
* Agreements
* Receipts
* Other supporting material

This separates large external documents from the core blockchain transaction while still allowing proposals to reference them.

---

# Proposal Lifecycle

A proposal generally follows this lifecycle:

```text
Create Proposal
       │
       ▼
Voting Period
       │
       ├───────────────┐
       ▼               ▼
     YES              NO
       │               │
       │               └── Reason Required
       │
       ▼
Voting Ends
       │
       ▼
Result Determined
       │
       ├── Passed
       ├── Rejected
       └── Quorum Not Reached
                │
                ▼
            Execution
```

---

# Proposal Statuses

| Status             | Meaning                                       |
| ------------------ | --------------------------------------------- |
| Active             | Proposal is currently accepting votes         |
| Passed             | Proposal received sufficient support          |
| Rejected           | Proposal failed                               |
| Executed           | Proposal has been successfully executed       |
| Quorum Not Reached | Proposal did not receive enough participation |

---

# Proposal Details

Users can inspect a proposal and view:

* Proposal title
* Description
* Proposer
* Recipient
* Treasury amount
* Supporting evidence
* Voting deadline
* Current status
* YES votes
* NO votes
* Voting history
* Voting reasons
* Execution status

This creates a transparent governance history for each community.

---

# Activity Feed

Pamoja exposes community activity through an activity feed.

The feed can surface events such as:

* Community creation
* Member applications
* Membership approvals
* Contributions
* Proposal creation
* Votes
* Proposal execution
* Other protocol events

This gives communities a simple way to understand what is happening without manually inspecting blockchain transactions.

---

# Dashboard

The dashboard provides users with an overview of their activity across Pamoja.

Users can see:

* Communities they belong to
* Pending membership applications
* Personal savings
* Community treasuries
* Contribution commitments
* Community membership
* Proposal activity

---

# Architecture

Pamoja is structured as a decentralized application consisting of:

```text
┌─────────────────────────────┐
│          Frontend           │
│       Next.js / React       │
└──────────────┬──────────────┘
               │
               │ Wagmi / Viem
               ▼
┌─────────────────────────────┐
│       Avalanche Fuji        │
│          Testnet            │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│       PoolFactory           │
│                             │
│ Creates and registers       │
│ community pools             │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│        Pool Contracts       │
│                             │
│ • Membership                │
│ • Contributions             │
│ • Treasury                  │
│ • Proposals                 │
│ • Voting                    │
│ • Governance                │
└─────────────────────────────┘
```

---

# Technology Stack

## Smart Contracts

* Solidity `^0.8.28`
* Hardhat
* OpenZeppelin
* Ethereum-compatible smart contract architecture

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

## Blockchain Interaction

* Wagmi
* Viem
* MetaMask
* Avalanche Fuji Testnet

## Deployment

* Smart contracts → Avalanche Fuji
* Frontend → Vercel
* Wallet → MetaMask / compatible injected wallets

---

# Network

Pamoja is currently deployed on the **Avalanche Fuji Testnet** for development and demonstration.

### Avalanche Fuji

```text
Network: Avalanche Fuji Testnet
Chain ID: 43113
Currency: AVAX
RPC:
https://api.avax-test.network/ext/bc/C/rpc
```

The current deployment is intended for testing and demonstration purposes.

Production deployment will require a separate security review, deployment process, and mainnet configuration.

---

# Smart Contract Deployment

The current PoolFactory deployment on Avalanche Fuji is:

```text
PoolFactory:
0xb60773b0ab29eDC320e5a9E56Dfd480220BB6120
```

Deployment network:

```text
Avalanche Fuji Testnet
Chain ID: 43113
```

> Contract addresses may change as development continues.

---

# Project Structure

The project is organized into two main applications:

```text
pamoja-protocol/
│
├── contracts/
│   │
│   ├── contracts/
│   │   ├── Pool.sol
│   │   ├── PoolFactory.sol
│   │   └── ...
│   │
│   ├── scripts/
│   │   └── deploy.ts
│   │
│   ├── test/
│   │   └── ...
│   │
│   ├── hardhat.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   │
│   ├── public/
│   │   ├── images/
│   │   ├── patterns/
│   │   └── ...
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── page.tsx
│   │   │   │
│   │   │   ├── create/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── communities/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── community/
│   │   │   │   ├── ActivityFeed.tsx
│   │   │   │   ├── ProposalCard.tsx
│   │   │   │   ├── ProposalList.tsx
│   │   │   │   ├── ProposalDetailsModal.tsx
│   │   │   │   ├── CreateProposalModal.tsx
│   │   │   │   ├── VoteNoModal.tsx
│   │   │   │   ├── ExecuteProposalButton.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardSummary.tsx
│   │   │   │   ├── MyCommunities.tsx
│   │   │   │   ├── PendingCommunities.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Container.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ConnectWallet.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── usePools.ts
│   │   │   ├── usePoolStats.ts
│   │   │   ├── useProposals.ts
│   │   │   ├── useProposalVotes.ts
│   │   │   ├── useProposalStatus.ts
│   │   │   ├── useHasVoted.ts
│   │   │   ├── useMyCommunities.ts
│   │   │   ├── usePendingCommunities.ts
│   │   │   └── ...
│   │   │
│   │   ├── contracts/
│   │   │   ├── Pool.json
│   │   │   └── PoolFactory.json
│   │   │
│   │   ├── lib/
│   │   │   ├── wagmi.ts
│   │   │   ├── switchToFuji.ts
│   │   │   └── ...
│   │   │
│   │   └── providers/
│   │       └── Web3Provider.tsx
│   │
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── .env.local
│   └── README.md
│
├── .gitignore
└── README.md
```

---

# Smart Contract Architecture

The protocol currently uses a **factory + pool** architecture.

## PoolFactory

The `PoolFactory` contract acts as the registry and entry point for communities.

Responsibilities include:

* Creating pools
* Registering pools
* Tracking communities
* Associating pool IDs with pool contracts
* Providing a discoverable registry

Conceptually:

```text
User
 │
 │ createPool()
 ▼
PoolFactory
 │
 │ deploy
 ▼
Pool
 │
 ├── Members
 ├── Treasury
 ├── Contributions
 ├── Proposals
 └── Governance
```

---

# Pool Contract

Each community receives its own Pool contract.

The pool manages the community's:

### Membership

* Applications
* Approvals
* Member records
* Pending requests

### Contributions

* Contribution requirements
* Member contributions
* Treasury deposits

### Treasury

* Community funds
* Approved withdrawals
* Proposal execution

### Governance

* Proposal creation
* Voting
* Proposal status
* Execution

---

# Security Model

Pamoja is currently an experimental protocol and should **not** be considered production-ready financial infrastructure.

The project is still under active development.

Before mainnet deployment, the protocol should undergo:

* Comprehensive unit testing
* Integration testing
* Fuzz testing
* Static analysis
* Reentrancy analysis
* Access-control review
* Economic attack analysis
* Governance attack analysis
* Smart contract audit

Particular attention should be given to:

* Treasury withdrawals
* Proposal execution
* Membership permissions
* Administrative privileges
* Contribution accounting
* Voting manipulation
* Quorum mechanisms
* Flash-loan governance attacks
* Reentrancy
* Integer handling
* Contract upgradeability, if introduced

---

# Local Development

## Prerequisites

Install:

* Node.js
* npm
* Git
* MetaMask
* Hardhat

---

# Smart Contracts

Navigate into the contracts directory:

```bash
cd contracts
```

Install dependencies:

```bash
npm install
```

Compile:

```bash
npx hardhat compile
```

Run the local Hardhat network:

```bash
npx hardhat node
```

In another terminal, deploy locally:

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

---

# Avalanche Fuji Deployment

Compile the contracts:

```bash
npx hardhat compile
```

Then deploy to Fuji:

```bash
npx hardhat run scripts/deploy.ts --network fuji
```

The deployer wallet must contain Fuji AVAX for gas.

---

# Environment Variables

Never commit private keys or secrets to Git.

Example:

```env
PRIVATE_KEY=your_wallet_private_key
```

For the frontend, environment variables should be stored in:

```text
frontend/.env.local
```

For contracts:

```text
contracts/.env
```

Both files should remain outside version control.

---

# Wallet

Pamoja currently supports injected wallets such as MetaMask.

Users must connect their wallet and switch to the appropriate blockchain network.

For the current deployment:

```text
Avalanche Fuji Testnet
Chain ID: 43113
```

The application includes network switching functionality to help users move to Fuji.

---

# Frontend Development

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Production Build

Before deployment:

```bash
npm run build
```

The project should pass:

* TypeScript validation
* ESLint
* Next.js production compilation

Start the production server locally with:

```bash
npm run start
```

---

# Vercel Deployment

The frontend is designed to be deployed using Vercel.

The general deployment flow is:

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Next.js Application
   │
   │ Wagmi / Viem
   ▼
Avalanche Fuji
   │
   ▼
Pamoja Smart Contracts
```

After connecting the GitHub repository to Vercel:

1. Select the `frontend` directory as the project root.
2. Configure the required environment variables.
3. Deploy the application.
4. Verify wallet connectivity.
5. Verify Avalanche Fuji network switching.
6. Verify contract reads.
7. Verify contract writes.
8. Verify proposal creation and voting.
9. Verify proposal execution.

---

# User Flow

A typical user interaction looks like:

```text
Connect Wallet
      │
      ▼
Switch to Avalanche Fuji
      │
      ▼
Browse Communities
      │
      ├───────────────┐
      ▼               ▼
Create Community   Join Community
      │               │
      ▼               ▼
 Pool Created      Application
                      │
                      ▼
                 Admin Approval
                      │
                      ▼
                   Member
                      │
                      ▼
                Make Contributions
                      │
                      ▼
              Participate in Governance
                      │
              ┌───────┴────────┐
              ▼                ▼
          Vote YES          Vote NO
                               │
                               ▼
                         Provide Reason
```

---

# Roadmap

## Phase 1 — Core Protocol

* [x] PoolFactory
* [x] Community creation
* [x] Pool registration
* [x] Community discovery
* [x] Membership applications
* [x] Membership approval
* [x] Member tracking
* [x] Community treasury
* [x] Contributions

---

## Phase 2 — Governance

* [x] Proposal creation
* [x] Proposal voting
* [x] YES votes
* [x] NO votes
* [x] Reasons for NO votes
* [x] Proposal status
* [x] Voting countdown
* [x] Proposal execution
* [x] Supporting evidence
* [x] Voting history

---

## Phase 3 — Community Finance

* [ ] Loan requests
* [ ] Loan approvals
* [ ] Loan repayments
* [ ] Member credit history
* [ ] Community lending pools
* [ ] Automated repayment tracking
* [ ] Treasury allocation

---

## Phase 4 — Governance & Reputation

* [ ] Reputation system
* [ ] Member participation scores
* [ ] Governance weighting
* [ ] Delegated voting
* [ ] Community-level policies
* [ ] Proposal categories
* [ ] Governance analytics

---

## Phase 5 — Investment

* [ ] Community investment proposals
* [ ] Collective investment pools
* [ ] Investment performance tracking
* [ ] Risk parameters
* [ ] Automated distributions
* [ ] Investment governance

---

## Phase 6 — Africa

Long-term possibilities include:

* Mobile money integrations
* M-Pesa integration
* Local currency support
* Stablecoin savings
* African payment rails
* Cross-border communities
* Community investment products
* DAO-style community organizations
* Financial identity and reputation
* Regional expansion

---

# Why Avalanche?

Pamoja is currently being developed on **Avalanche Fuji**.

Avalanche is particularly interesting for Pamoja because the protocol requires a blockchain capable of supporting frequent community interactions without making every transaction prohibitively expensive.

The architecture also benefits from Avalanche's EVM compatibility, allowing the project to continue using familiar Ethereum tooling such as:

* Solidity
* Hardhat
* Wagmi
* Viem
* MetaMask

This makes the transition from local development to Avalanche straightforward.

---

# Why Pamoja?

Traditional community finance already works.

The problem is not necessarily the idea.

The problem is the infrastructure around it.

Pamoja attempts to provide programmable infrastructure for these communities while retaining the principles that make Chamas effective:

```text
Trust
Transparency
Collective Saving
Community Governance
Shared Responsibility
```

Blockchain provides the underlying infrastructure for these principles to become programmable.

---

# Long-Term Vision

Pamoja is not intended to simply be another DeFi application.

The larger goal is to build infrastructure that can support the financial coordination already happening within African communities.

Imagine:

```text
A group of friends
        │
        ▼
Create a Pamoja community
        │
        ▼
Members contribute regularly
        │
        ▼
Treasury grows
        │
        ├───────────────┐
        ▼               ▼
      Lending       Investment
        │               │
        └───────┬───────┘
                ▼
        Community Growth
```

The same infrastructure could eventually support:

* Chamas
* Investment groups
* Savings groups
* Cooperatives
* Community organizations
* Small businesses
* Collective investment communities

---

# Disclaimer

Pamoja Protocol is an experimental Web3 project under active development.

The current Avalanche Fuji deployment is intended for:

* Development
* Testing
* Demonstration
* Community feedback

It should **not** be used with real funds.

Smart contracts may contain vulnerabilities and features may change without notice.

Do not deposit funds that you cannot afford to lose.

---

# Contributing

Contributions, ideas, testing, and feedback are welcome.

To contribute:

```bash
git clone <repository-url>

cd pamoja-protocol

cd contracts
npm install

cd ../frontend
npm install
```

Create a branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them, and submit a pull request.

---

# License

This project is currently under development.

License terms will be finalized before the first production release.

---

# Built for Community. Powered by Blockchain.

**Pamoja Protocol**

> Building decentralized financial infrastructure for African communities.
