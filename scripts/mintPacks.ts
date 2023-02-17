import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';
import { SurprisePack } from '../typechain-types';

import { PRICE_PER_MINT_COMMON, PRICE_PER_MINT_RARE, PRICE_PER_MINT_EPIC } from './constants';

const PACK_ADDRESS = '0xDD615691E5f06D8804709aeC6A18AF4Eb6c7cdfA';

async function mintPacks(total: number, rarity: number): Promise<void> {
  const [deployer] = await ethers.getSigners();
  const surprisePackFactory = await ethers.getContractFactory('SurprisePack');
  const pack: SurprisePack = surprisePackFactory.attach(PACK_ADDRESS);

  let price: BigNumber;
  if (rarity === 0) {
    price = PRICE_PER_MINT_COMMON;
  } else if (rarity === 1) {
    price = PRICE_PER_MINT_RARE;
  } else if (rarity === 2) {
    price = PRICE_PER_MINT_EPIC;
  } else {
    throw new Error('Invalid rarity');
  }

  price = price.mul(total);

  const tx = await pack.mint(deployer.address, total, rarity, { value: price });
  await tx.wait();

  console.log(`Minted ${total} packs with rarity ${rarity} for ${deployer.address}`);
  console.log(await pack.tokensMintedByAddress(deployer.address));
  console.log(await pack.balanceOf(deployer.address));
}

async function main() {
  await mintPacks(3, 2);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
