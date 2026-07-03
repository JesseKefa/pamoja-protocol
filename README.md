# 🌍 Pamoja Protocol

> A decentralized community savings and lending protocol inspired by traditional Chamas.

Pamoja Protocol digitizes community-based savings groups by using smart contracts to automate membership, contributions, loans, and governance while maintaining transparency and trust.

---

## 📖 Table of Contents

- Overview
- Vision
- Features
- Tech Stack
- Project Structure
- Installation
- Usage
- Smart Contracts
- Development Roadmap
- Contributing
- License

---

# 🚀 Overview

Traditional Chamas rely heavily on trust and manual record keeping.

Pamoja Protocol brings these communities on-chain by providing:

- Transparent accounting
- Secure membership management
- Automated savings records
- Loan management
- Community governance

---

# 🎯 Vision

To become the infrastructure powering decentralized community finance across Africa and beyond.

---

# ✨ Features

## ✅ Current

- Create community pools
- Unique Pool IDs
- Pool registry
- Automatic creator registration
- Membership applications
- Admin approval system
- Member counting
- Event emission

## 🚧 Upcoming

- Contributions
- Treasury management
- Loan requests
- Loan approvals
- Loan repayments
- Governance
- Voting
- Reputation System

---

# 🛠 Tech Stack

- Solidity ^0.8.28
- Hardhat 2
- TypeScript
- Ethers.js
- Mocha
- Chai

---

# 📁 Project Structure

```text
contracts/
│
├── Pool.sol
├── PoolFactory.sol
│
test/
├── PoolFactory.test.ts
│
ignition/
│
scripts/
│
hardhat.config.ts
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/pamoja-protocol.git
```

Move into the project

```bash
cd pamoja-protocol
```

Install dependencies

```bash
npm install
```

Compile

```bash
npx hardhat compile
```

Run tests

```bash
npx hardhat test
```

---

# 📚 Smart Contracts

## PoolFactory.sol

Responsible for:

- Creating pools
- Assigning IDs
- Storing pool information
- Emitting pool creation events

---

## Pool.sol

Responsible for:

- Membership management
- Join requests
- Member approvals
- Community administration

---

# 🔄 Example Workflow

```text
Alice creates a Pool
        │
        ▼
Alice becomes Creator
        │
        ▼
Alice becomes Admin
        │
        ▼
Alice becomes Member #1
        │
        ▼
Bob applies to join
        │
        ▼
Alice approves Bob
        │
        ▼
Bob becomes Member #2
```

---

# 🗺 Development Roadmap

## Sprint 1 ✅

- Pool Factory
- Pool Registry
- Events
- Pool Queries

## Sprint 2 🚧

- Membership System
- Join Requests
- Member Approval
- Membership Tests

## Sprint 3

- Contributions
- Treasury
- Contribution History

## Sprint 4

- Loan Requests
- Loan Approval
- Loan Repayment

## Sprint 5

- Governance
- Voting
- Treasury Improvements

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 📜 License

MIT License.

---

# 👨🏽‍💻 Author

Built with ❤️ by **JK**

*"Pamoja"* means **Together** in Swahili, reflecting the protocol's mission of empowering communities through decentralized finance.