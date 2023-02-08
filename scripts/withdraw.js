const { getNamedAccounts, ethers } = require("hardhat");

// async main
const main = async () => {
     const { deployer } = await getNamedAccounts();
     const fundThis = await ethers.getContract("FundThis", deployer);
     console.log("Withdrawing, be patient.");
     const resp = await fundThis.withdraw();
     await resp.wait(1);
     console.log("Withdrawing was successful.");
};

// main
main()
     .then(() => process.exit())
     .catch((error) => {
          console.error(error);
          process.exit(1);
     });
