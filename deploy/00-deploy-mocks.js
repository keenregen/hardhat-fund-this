// import

const { network } = require("hardhat");
const {
     devChains,
     DECIMALS,
     INITIAL_ANSWER,
} = require("../supporter-hardhat-config.js");

module.exports = async ({ getNamedAccounts, deployments }) => {
     const { deploy, log } = deployments;
     const { deployer } = await getNamedAccounts();

     const chainName = network.name;

     if (devChains.includes(chainName)) {
          log(
               "Local network detected, mocks are being deployed, be patient..."
          );
          await deploy("MockV3Aggregator", {
               contract: "MockV3Aggregator",
               from: deployer,
               log: true,
               args: [DECIMALS, INITIAL_ANSWER],
          });
          log("Mocks were deployed!");
          log("///////////////////////////");
     }
};

module.exports.tags = ["all", "mocks"];
