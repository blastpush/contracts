import { Wallet } from "ethers";

const wallet = Wallet.createRandom();

console.log(wallet.address, wallet.privateKey);
