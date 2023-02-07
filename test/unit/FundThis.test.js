const { assert } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundThis", () => {
     let fundThis;
     let deployer;
     let mockV3Aggregator;
     beforeEach(async () => {
          // deploy FundThis contract via hh deploy
          deployer = (await getNamedAccounts()).deployer;
          /* const accounts = await ethers.getSigners()
           const accountZero = accounts[0] */
          await deployments.fixture(["all"]);
          fundThis = await ethers.getContract("FundThis", deployer);
          mockV3Aggregator = await ethers.getContract(
               "MockV3Aggregator",
               deployer
          );
     });
     describe("constructor", async () => {
          it("sets the aggre addresses correctly", async () => {
               const resp = await fundThis.getPriceFeed();
               assert.equal(resp, mockV3Aggregator.address);
          });
     });
});
