// import

const { network } = require("hardhat");

const { networkConfig, devChains } = require("../supporter-hardhat-config");

const { verify } = require("../utils/verify");

// 1st Method
// const deployFunc = async (hre) => {
//     hre.getNamedAccounts();
//     hre.deployments
// };
// module.exports.default = deployFunc();

// 2nd Method a
// module.exports = async (hre) => {
//      const { getNamedAccounts, deployments } = hre;
// };

// 2nd Method b
module.exports = async ({ getNamedAccounts, deployments }) => {
     const { deploy, log } = deployments;
     const { deployer } = await getNamedAccounts();

     const chainId = network.config.chainId;

     // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeedAddress"];
     let ethUsdPriceFeedAddress;

     if (devChains.includes(network.name)) {
          const ethUsdAggregator = await deployments.get("MockV3Aggregator");
          ethUsdPriceFeedAddress = ethUsdAggregator.address;
     } else {
          ethUsdPriceFeedAddress =
               networkConfig[chainId]["ethUsdPriceFeedAddress"];
     }

     const fundThis = await deploy("FundThis", {
          from: deployer,
          args: [ethUsdPriceFeedAddress], // for price feed address
          log: true,
          waitConfirms: network.config.blockConfirms || 1,
     });

     //  // verification of contract
     if (!devChains.includes(network.name) && process.env.etherScanKeyA) {
          await verify(fundThis.address, [ethUsdPriceFeedAddress]);
     }

     log("///////////////////////////////////////");
};

module.exports.tags = ["all", "fundthis"];
