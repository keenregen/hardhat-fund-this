const { getNamedAccounts, ethers } = require("hardhat");

// async main
const main = async () => {
     const { deployer } = await getNamedAccounts();
     const fundThis = await ethers.getContract("FundThis", deployer);
     console.log("Funding This Contract, be patient.");
     const resp = await fundThis.fund({
          value: ethers.utils.parseEther("0.001"),
     });
     await resp.wait(1);
     console.log("Funding was successful.");
};

// main
main()
     .then(() => process.exit())
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
