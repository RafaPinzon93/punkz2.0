import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {
  Punkz,
  PunkzBackground,
  PunkzCaps,
  PunkzCatalog,
  PunkzChain,
  PunkzCigar,
  PunkzClothing,
  PunkzEarring,
  PunkzGlasses,
  PunkzMask,
  SurprisePack,
  RMRKEquipRenderUtils,
} from '../typechain-types';
import deployContracts from '../scripts/deploy';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import * as C from '../scripts/constants';
import { PunkzConfig } from '../typechain-types/contracts/SurprisePack';

const RARITY_COMMON = 0;
const RARITY_RARE = 1;
const RARITY_EPIC = 2;

async function fixture(): Promise<{
  punkzCatalog: PunkzCatalog;
  surprisePack: SurprisePack;
  punkzBackground: PunkzBackground;
  punkzMask: PunkzMask;
  punkzChain: PunkzChain;
  punkzEarring: PunkzEarring;
  punkzGlasses: PunkzGlasses;
  punkzCigar: PunkzCigar;
  punkzClothing: PunkzClothing;
  punkzCaps: PunkzCaps;
  punkz: Punkz;
  renderUtils: RMRKEquipRenderUtils;
}> {
  const {
    punkzCatalog,
    surprisePack,
    punkzBackground,
    punkzMask,
    punkzChain,
    punkzEarring,
    punkzGlasses,
    punkzCigar,
    punkzClothing,
    punkzCaps,
    punkz,
  } = await deployContracts(true);

  const renderUtilsFactory = await ethers.getContractFactory('RMRKEquipRenderUtils');
  const renderUtils: RMRKEquipRenderUtils = await renderUtilsFactory.deploy();

  return {
    punkzCatalog,
    surprisePack,
    punkzBackground,
    punkzMask,
    punkzChain,
    punkzEarring,
    punkzGlasses,
    punkzCigar,
    punkzClothing,
    punkzCaps,
    punkz,
    renderUtils,
  };
}

function bn(n: number): BigNumber {
  return BigNumber.from(n);
}

describe('SimpleEquippable Assets', async () => {
  let punkzCatalog: PunkzCatalog;
  let surprisePack: SurprisePack;
  let punkzBackground: PunkzBackground;
  let punkzMask: PunkzMask;
  let punkzChain: PunkzChain;
  let punkzEarring: PunkzEarring;
  let punkzGlasses: PunkzGlasses;
  let punkzCigar: PunkzCigar;
  let punkzClothing: PunkzClothing;
  let punkzCaps: PunkzCaps;
  let punkz: Punkz;
  let deployer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let renderUtils: RMRKEquipRenderUtils;

  beforeEach(async function () {
    ({
      punkzCatalog,
      surprisePack,
      punkzBackground,
      punkzMask,
      punkzChain,
      punkzEarring,
      punkzGlasses,
      punkzCigar,
      punkzClothing,
      punkzCaps,
      punkz,
      renderUtils,
    } = await loadFixture(fixture));
    [deployer, buyer] = await ethers.getSigners();
  });

  describe('Init', async function () {
    it('can get names and symbols', async function () {
      expect(await punkz.name()).to.equal('Punkz2.0');
      expect(await punkz.symbol()).to.equal('PNKZ');
    });

    it('can mint suprise pack', async function () {
      await surprisePack
        .connect(buyer)
        .mint(buyer.address, 2, RARITY_COMMON, { value: C.PRICE_PER_MINT_COMMON.mul(2) });
      expect(await surprisePack.balanceOf(buyer.address)).to.equal(bn(2));
    });

    it('can mint suprise pack and punk', async function () {
      await surprisePack
        .connect(buyer)
        .mint(buyer.address, 1, RARITY_EPIC, { value: C.PRICE_PER_MINT_EPIC });

      const fixedConfig: PunkzConfig.FixedConfigStruct = {
        skin: 2,
        mouth: 3,
        eyeColor: 2,
        eye: 2,
        eyeBrows: 2,
        hair: 3,
        nose: 1,
        beard: 2,
        tongue: 0,
      };
      const itemsConfig: PunkzConfig.ItemsConfigStruct = {
        background: 1,
        clothing: 2,
        mask: 2,
        chain: 0,
        earring: 0,
        glasses: 0,
        cigar: 0,
        cap: 0,
      };

      await surprisePack.connect(buyer).mintPunk(1, fixedConfig, itemsConfig);
      // console.log(await punkz.childrenOf(1));
      console.log(await renderUtils.getExtendedEquippableActiveAssets(punkz.address, 1));
    });
  });
});
