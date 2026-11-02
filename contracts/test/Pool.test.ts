
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Pool Lending Lifecycle", function () {
  let pool: any;
  let owner: any;
  let borrower: any;

  const contribution = ethers.parseEther("1");
  const principal = ethers.parseEther("1");

  async function deployPool() {
    [owner, borrower] = await ethers.getSigners();

    const Pool = await ethers.getContractFactory("Pool");

    pool = await Pool.deploy(
      1,
      "Asili Chama",
      "Community savings pool",
      owner.address,
      contribution
    );

    await pool.waitForDeployment();

    // Approve borrower as a member.
    await pool.connect(borrower).applyToJoin();
    await pool.approveMember(borrower.address);

    // Fund the treasury.
    await pool.contribute({
    value: contribution,
    });

    await pool.connect(borrower).contribute({   
      value: contribution,
    });
  }

  async function createActiveLoan() {
    const latestBlock = await ethers.provider.getBlock("latest");
    const deadline = latestBlock!.timestamp + 86400;

    await pool.connect(borrower).createLoanProposal(
      "Emergency Loan",
      "Emergency financial assistance",
      "",
      principal,
      deadline,
      100
    );

    // Borrower votes YES.
    await pool.connect(borrower).voteProposal(
      1,
      true,
      ""
    );

    // Quorum is reached immediately.
    expect(await pool.getProposalStatus(1)).to.equal(1);

    // Execute and disburse.
    await pool.connect(borrower).executeProposal(1);

    return deadline;
  }

  beforeEach(async function () {
    await deployPool();
  });

  it("should create a loan request", async function () {
    await createActiveLoan();

    const loan = await pool.getLoan(1);

    expect(loan.borrower).to.equal(borrower.address);
    expect(loan.principal).to.equal(principal);
    expect(loan.status).to.equal(2);
  });

  it("should approve a loan immediately when quorum is reached", async function () {
    await createActiveLoan();

    expect(await pool.getProposalStatus(1)).to.equal(3);
  });

  it("should disburse approved loans from the treasury", async function () {
    const balanceBefore = await ethers.provider.getBalance(
      borrower.address
    );

    await createActiveLoan();

    const balanceAfter = await ethers.provider.getBalance(
      borrower.address
    );

    expect(balanceAfter).to.be.gt(balanceBefore);

    expect(await pool.getTreasuryBalance()).to.equal(
      ethers.parseEther("1")
    );
  });

  it("should not charge late interest before the deadline", async function () {
    await createActiveLoan();

    const amounts = await pool.getLoanAmountsDue(1);

    expect(amounts.interestOutstanding).to.equal(0);
    expect(amounts.principalOutstanding).to.equal(principal);
  });

  it("should accrue late interest after the deadline", async function () {
    const deadline = await createActiveLoan();

    await ethers.provider.send("evm_increaseTime", [
      2 * 86400
    ]);

    await ethers.provider.send("evm_mine", []);

    const amounts = await pool.getLoanAmountsDue(1);

    expect(amounts.interestOutstanding).to.be.gt(0);
    expect(amounts.totalOutstanding).to.be.gt(principal);

    expect(await pool.getLoanStatus(1)).to.equal(5);
  });

  it("should support partial repayments and complete a fully repaid loan", async function () {
    await createActiveLoan();

    // Move two days beyond the repayment deadline.
    await ethers.provider.send("evm_increaseTime", [
      2 * 86400
    ]);

    await ethers.provider.send("evm_mine", []);

    // Make a partial repayment.
    await pool.connect(borrower).repayLoan(1, {
      value: ethers.parseEther("0.52")
    });

    let amounts = await pool.getLoanAmountsDue(1);

    expect(amounts.principalOutstanding).to.be.lt(principal);
    expect(amounts.totalOutstanding).to.be.gt(0);

    // Pay the exact remaining balance.
    await pool.connect(borrower).repayLoan(1, {
    value: amounts.totalOutstanding + ethers.parseEther("0.001")
    });

    const loan = await pool.getLoan(1);

    expect(loan.status).to.equal(3);
    expect(loan.principalRepaid).to.equal(principal);

    expect(
      loan.interestPaid
    ).to.equal(loan.accruedInterest);
  });
});
