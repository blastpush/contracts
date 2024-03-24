import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { formatUnits } from "ethers";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function pushFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const pushStorage = await (await ethers.getContractFactory("PushStorage")).deploy();

    return { pushStorage, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { pushStorage, owner } = await loadFixture(pushFixture);

      expect(await pushStorage.owner()).to.equal(owner.address);
    });
  });

  describe('Saving customizations', function () {
    it('Should save customizations', async function () {
      const { pushStorage, otherAccount } = await loadFixture(pushFixture);

      await pushStorage.connect(otherAccount).write(otherAccount.address, otherAccount.address, otherAccount.address, "hello")

      const data = await pushStorage.read(otherAccount.address);
      console.log(data);
      expect(await pushStorage.read(otherAccount.address)).to.equal('test');
    });
  })
});