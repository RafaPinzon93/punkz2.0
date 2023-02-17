import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { SurprisePack } from '../typechain-types';

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

async function main() {
  const accounts: SignerWithAddress[] = await ethers.getSigners();
  const owner = accounts[0];
  console.log('Deployer address: ' + owner.address);
  // We get the contract to deploy
  const packFactory = await ethers.getContractFactory('SurprisePack');
  const pack: SurprisePack = await packFactory.attach('0xe90a2564C38BbAF0ed86Ee42d76C2878ad9ccA81');

  const tx = await pack.setSeed(29, 12);
  await tx.wait()

  console.log('New skin:', await pack.getSkin(29));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
