import { ethers } from "hardhat";

const address = "0xA903E994ac8c7B233f52c7CC02A94d80e524eF31";

async function main() {
  const contract = await ethers.getContractAt("PushStorage", address);

  let data = await contract.claimContractGas();
  console.log(data);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
