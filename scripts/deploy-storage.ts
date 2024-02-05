import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("PushStorage", [], {});

  await contract.waitForDeployment();

  console.log(`Success deploy!`, contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
