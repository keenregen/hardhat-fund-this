require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");

const goerliRpcPoint = process.env.goerliRpcPoint || "";
const goerliAccountA = process.env.goerliAccountA || "";

const localHostRpcPoint = process.env.localHostRpcPoint || "";

const cMarCapApiKey = process.env.cMarCapApiKey || "";

const etherScanKeyA = process.env.etherScanKeyA || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
     // solidity: "0.8.7",
     solidity: {
          compilers: [{ version: "0.8.7" }, { version: "0.6.6" }],
     },
     namedAccounts: {
          deployer: {
               default: 0,
          },
          user: {
               dafault: 1,
          },
     },
     networks: {
          goerli: {
               url: goerliRpcPoint,
               accounts: [goerliAccountA],
               chainId: 5,
               blockConfirms: 7,
          },
          localhost: {
               url: localHostRpcPoint,
               // we don't need to specify an account, automatically given via hh
               chainId: 31337,
          },
     },
     etherscan: {
          apiKey: etherScanKeyA,
     },
     gasReporter: {
          enabled: false,
          outputFile: "gasReport.txt",
          noColors: true,
          currency: "USD",
          coinmarketcap: cMarCapApiKey,
          token: "ETH",
     },
};
