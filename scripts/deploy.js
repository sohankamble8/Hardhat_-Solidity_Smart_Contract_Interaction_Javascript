const { ethers, run, network } = require("hardhat");

const main = async () => {
  const contractFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract, Please wait...");
  const simpleStorage = await contractFactory.deploy();
  await simpleStorage.deployed();
  console.log("SimpleStorage Deployed at: ", simpleStorage.address);

  // Verifying Contract
  console.log("Verifying Contract, Please wait...");
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(5);
    await verify(simpleStorage.address, []);
  }

  const intialFavouriteNumber = await simpleStorage.retrieve();
  console.log(`Initial Favourite Number is: ${intialFavouriteNumber}`);
  const storeTx = await simpleStorage.store(7);
  await storeTx.wait(1);
  const updatedFavouriteNumber = await simpleStorage.retrieve();
  console.log(`Updated Favourite Number is: ${updatedFavouriteNumber}`);
};

const verify = async (contractAddress, args) => {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.error(e);
    }
  }
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
