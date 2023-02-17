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
  const pack: SurprisePack = await packFactory.attach('0xDD615691E5f06D8804709aeC6A18AF4Eb6c7cdfA');

  const balance = await pack.provider.getBalance(pack.address);
  await pack.withdrawRaised(owner.address, balance);

  console.log('Withdrew balance to owner:', balance);
  await sleep(1000);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
