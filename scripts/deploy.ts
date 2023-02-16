import { ethers } from 'hardhat';
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
} from '../typechain-types';
import * as C from './constants';
import { IRMRKInitData } from '../typechain-types/contracts/Punkz';
import { CollectionzStruct } from '../typechain-types/contracts/SurprisePack';
// import { IRMRKCatalog } from '../typechain-types/contracts/PunkzCatalog';
import { delay } from '@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService';

async function deployContracts(isTest: boolean): Promise<{
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
}> {
  const [deployer] = await ethers.getSigners();
  const punkzBackgroundFactory = await ethers.getContractFactory('PunkzBackground');
  const punkzCatalogFactory = await ethers.getContractFactory('PunkzCatalog');
  const punkzMaskFactory = await ethers.getContractFactory('PunkzMask');
  const punkzChainFactory = await ethers.getContractFactory('PunkzChain');
  const punkzEarringFactory = await ethers.getContractFactory('PunkzEarring');
  const punkzGlassesFactory = await ethers.getContractFactory('PunkzGlasses');
  const punkzCigarFactory = await ethers.getContractFactory('PunkzCigar');
  const punkzClothingFactory = await ethers.getContractFactory('PunkzClothing');
  const punkzCapsFactory = await ethers.getContractFactory('PunkzCaps');
  const punkzFactory = await ethers.getContractFactory('Punkz');
  const surprisePackFactory = await ethers.getContractFactory('SurprisePack');

  if (!isTest) {
    console.log('Deploying catalog');
  }

  const punkzCatalog: PunkzCatalog = await punkzCatalogFactory.deploy(
    C.PUNKZ_CATALOG_COLLECTION_META,
    'img/svg',
  );
  await punkzCatalog.deployed();

  if (!isTest) {
    delay(12000);
    console.log('Deploying surprise pack');
  }

  let collectionz = <CollectionzStruct>{
    punkz: ethers.constants.AddressZero,
    background: ethers.constants.AddressZero,
    clothing: ethers.constants.AddressZero,
    caps: ethers.constants.AddressZero,
    chain: ethers.constants.AddressZero,
    cigar: ethers.constants.AddressZero,
    earrings: ethers.constants.AddressZero,
    glasses: ethers.constants.AddressZero,
    mask: ethers.constants.AddressZero,
  };

  const surprisePack: SurprisePack = await surprisePackFactory.deploy(
    C.SURPRISE_PACK_COLLECTION_META,
    deployer.address,
    C.ROYALTY_PERCENTAGE_BPS,
    C.MAX_SUPPLY,
    C.PRICE_PER_MINT_COMMON,
    C.PRICE_PER_MINT_RARE,
    C.PRICE_PER_MINT_EPIC,
    collectionz,
  );
  await surprisePack.deployed();

  const initData: IRMRKInitData.InitDataStruct = {
    erc20TokenAddress: ethers.constants.AddressZero,
    tokenUriIsEnumerable: false,
    royaltyRecipient: deployer.address,
    royaltyPercentageBps: C.ROYALTY_PERCENTAGE_BPS,
    maxSupply: C.MAX_SUPPLY,
    pricePerMint: 0,
  };

  if (!isTest) {
    console.log('Deploying background');
  }
  const punkzBackground: PunkzBackground = await punkzBackgroundFactory.deploy(
    'Punkz2.0 Background',
    'PNKZBCK',
    C.PUNKZ_BACKGROUND_COLLECTION_META,
    C.PUNKZ_BACKGROUND_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzBackground.deployed();

  if (!isTest) {
    console.log('Deploying mask');
  }

  const punkzMask: PunkzMask = await punkzMaskFactory.deploy(
    'Punkz2.0 Mask',
    'PNKZMSK',
    C.PUNKZ_MASK_COLLECTION_META,
    C.PUNKZ_MASK_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzMask.deployed();

  if (!isTest) {
    console.log('Deploying chain');
  }

  const punkzChain: PunkzChain = await punkzChainFactory.deploy(
    'Punkz2.0 Chain',
    'PNKZCHN',
    C.PUNKZ_CHAIN_COLLECTION_META,
    C.PUNKZ_CHAIN_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzChain.deployed();

  if (!isTest) {
    console.log('Deploying earring');
  }

  const punkzEarring: PunkzEarring = await punkzEarringFactory.deploy(
    'Punkz2.0 Earring',
    'PNKZEAR',
    C.PUNKZ_EARRING_COLLECTION_META,
    C.PUNKZ_EARRING_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzEarring.deployed();

  if (!isTest) {
    console.log('Deploying glasses');
  }

  const punkzGlasses: PunkzGlasses = await punkzGlassesFactory.deploy(
    'Punkz2.0 Glasses',
    'PNKZGLS',
    C.PUNKZ_GLASSES_COLLECTION_META,
    C.PUNKZ_GLASSES_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzGlasses.deployed();

  if (!isTest) {
    console.log('Deploying cigar');
  }

  const punkzCigar: PunkzCigar = await punkzCigarFactory.deploy(
    'Punkz2.0 Cigar',
    'PNKZCGR',
    C.PUNKZ_CIGAR_COLLECTION_META,
    C.PUNKZ_CIGAR_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzCigar.deployed();

  if (!isTest) {
    console.log('Deploying clothing');
  }

  const punkzClothing: PunkzClothing = await punkzClothingFactory.deploy(
    'Punkz2.0 Clothing',
    'PNKZCLT',
    C.PUNKZ_CLOTHING_COLLECTION_META,
    C.PUNKZ_CLOTHING_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzClothing.deployed();

  if (!isTest) {
    console.log('Deploying caps');
  }

  const punkzCaps: PunkzCaps = await punkzCapsFactory.deploy(
    'Punkz2.0 Caps',
    'PNKZCPS',
    C.PUNKZ_CAPS_COLLECTION_META,
    C.PUNKZ_CAPS_BASE_META,
    surprisePack.address,
    initData,
  );
  await punkzCaps.deployed();

  if (!isTest) {
    console.log('Deploying punkz');
  }

  const punkz: Punkz = await punkzFactory.deploy(
    'Punkz2.0',
    'PNKZ',
    C.PUNKZ_COLLECTION_META,
    C.PUNKZ_BASE_META,
    surprisePack.address,
    punkzCatalog.address,
    initData,
  );
  await punkz.deployed();

  collectionz = {
    punkz: punkz.address,
    background: punkzBackground.address,
    clothing: punkzClothing.address,
    caps: punkzCaps.address,
    chain: punkzChain.address,
    cigar: punkzCigar.address,
    earrings: punkzEarring.address,
    glasses: punkzGlasses.address,
    mask: punkzMask.address,
  };
  await surprisePack.setCollectionz(collectionz);

  await punkz.setAutoAcceptCollection(punkzBackground.address);
  await punkz.setAutoAcceptCollection(punkzClothing.address);
  await punkz.setAutoAcceptCollection(punkzCaps.address);
  await punkz.setAutoAcceptCollection(punkzChain.address);
  await punkz.setAutoAcceptCollection(punkzCigar.address);
  await punkz.setAutoAcceptCollection(punkzEarring.address);
  await punkz.setAutoAcceptCollection(punkzGlasses.address);
  await punkz.setAutoAcceptCollection(punkzMask.address);

  if (!isTest) {
    console.log('Catalog deployed to:', punkzCatalog.address);
    console.log('Surprise pack deployed to:', surprisePack.address);
    console.log('Punkz deployed to:', punkz.address);
    console.log('Punkz background deployed to:', punkzBackground.address);
    console.log('Punkz clothing deployed to:', punkzClothing.address);
    console.log('Punkz caps deployed to:', punkzCaps.address);
    console.log('Punkz chain deployed to:', punkzChain.address);
    console.log('Punkz cigar deployed to:', punkzCigar.address);
    console.log('Punkz earring deployed to:', punkzEarring.address);
    console.log('Punkz glasses deployed to:', punkzGlasses.address);
    console.log('Punkz mask deployed to:', punkzMask.address);
  }

  await setUpCatalog(
    isTest,
    punkzCatalog,
    punkzBackground.address,
    punkzMask.address,
    punkzChain.address,
    punkzEarring.address,
    punkzGlasses.address,
    punkzCigar.address,
    punkzClothing.address,
    punkzCaps.address,
  );

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
  };
}

async function setUpCatalog(
  isTest: Boolean,
  catalog: PunkzCatalog,
  backgroundAddress: string,
  maskAddress: string,
  chainAddress: string,
  earringAddress: string,
  glassesAddress: string,
  cigarAddress: string,
  clothingAddress: string,
  capsAddress: string,
): Promise<void> {
  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for skins');
  }

  await catalog.addPartList([
    {
      partId: 1,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ReptilianAncientDragon`,
      },
    },
    {
      partId: 2,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ReptilianSpace`,
      },
    },
    {
      partId: 3,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ReptilianRegular`,
      },
    },
    {
      partId: 4,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}AlienSpace`,
      },
    },
    {
      partId: 5,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}AlienCrypto`,
      },
    },
    {
      partId: 6,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}AlienOcean`,
      },
    },
    {
      partId: 7,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}AlienStar`,
      },
    },
    {
      partId: 8,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullAncient`,
      },
    },
    {
      partId: 9,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullBone`,
      },
    },
    {
      partId: 10,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullCristal`,
      },
    },
    {
      partId: 11,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullGolden`,
      },
    },
    {
      partId: 12,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullZombieUltra`,
      },
    },
    {
      partId: 13,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}DeadSkinSkullZombieRegular`,
      },
    },
    {
      partId: 14,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeAlvin`,
      },
    },
    {
      partId: 15,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeBio`,
      },
    },
    {
      partId: 16,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeDark`,
      },
    },
    {
      partId: 17,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeFury`,
      },
    },
    {
      partId: 18,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeIce`,
      },
    },
    {
      partId: 19,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeLuxy`,
      },
    },
    {
      partId: 20,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}ApeZombie`,
      },
    },
    {
      partId: 21,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}HumanGolden`,
      },
    },
    {
      partId: 22,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}HumanA`,
      },
    },
    {
      partId: 23,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}HumanB`,
      },
    },
    {
      partId: 24,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.SKIN_Z_INDEX,
        equippable: [],
        metadataURI: `${C.SKIN_BASE_META}HumanC`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for mouths');
  }
  await catalog.addPartList([
    {
      partId: 51,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca1`,
      },
    },
    {
      partId: 52,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca2`,
      },
    },
    {
      partId: 53,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca3`,
      },
    },
    {
      partId: 54,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca4`,
      },
    },
    {
      partId: 55,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca5`,
      },
    },
    {
      partId: 56,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca6`,
      },
    },
    {
      partId: 57,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca7`,
      },
    },
    {
      partId: 58,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca8`,
      },
    },
    {
      partId: 59,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca9`,
      },
    },
    {
      partId: 60,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca10`,
      },
    },
    {
      partId: 61,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca11`,
      },
    },
    {
      partId: 62,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca12`,
      },
    },
    {
      partId: 63,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca13`,
      },
    },
    {
      partId: 64,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca14`,
      },
    },
    {
      partId: 65,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca15`,
      },
    },
    {
      partId: 66,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca16`,
      },
    },
    {
      partId: 67,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca17`,
      },
    },
    {
      partId: 68,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.MOUTH_Z_INDEX,
        equippable: [],
        metadataURI: `${C.MOUTH_BASE_META}Boca18`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for eye color');
  }
  await catalog.addPartList([
    {
      partId: 101,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}D3`,
      },
    },
    {
      partId: 102,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}BicolorV1`,
      },
    },
    {
      partId: 103,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}BicolorV2`,
      },
    },
    {
      partId: 104,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}BicolorV3`,
      },
    },
    {
      partId: 105,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Brown`,
      },
    },
    {
      partId: 106,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Dark`,
      },
    },
    {
      partId: 107,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Diamond`,
      },
    },
    {
      partId: 108,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Emerald`,
      },
    },
    {
      partId: 109,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Golden`,
      },
    },
    {
      partId: 110,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Green`,
      },
    },
    {
      partId: 111,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Light`,
      },
    },
    {
      partId: 112,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Ocean`,
      },
    },
    {
      partId: 113,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Pink`,
      },
    },
    {
      partId: 114,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Purple`,
      },
    },
    {
      partId: 115,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Red`,
      },
    },
    {
      partId: 116,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Rose`,
      },
    },
    {
      partId: 117,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYECOLOR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYECOLOR_BASE_META}Space`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for eyes');
  }
  await catalog.addPartList([
    {
      partId: 151,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}BoredEyes`,
      },
    },
    {
      partId: 152,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}CrazyEyes`,
      },
    },
    {
      partId: 153,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}CyborgEyes`,
      },
    },
    {
      partId: 154,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}DangerEyes`,
      },
    },
    {
      partId: 155,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}DarkEyes`,
      },
    },
    {
      partId: 156,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}DeadEyes`,
      },
    },
    {
      partId: 157,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}DeepEyes`,
      },
    },
    {
      partId: 158,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}Eyes`,
      },
    },
    {
      partId: 159,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV2`,
      },
    },
    {
      partId: 160,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV3`,
      },
    },
    {
      partId: 161,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV4`,
      },
    },
    {
      partId: 162,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV5`,
      },
    },
    {
      partId: 163,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV6`,
      },
    },
    {
      partId: 164,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}EyesV7`,
      },
    },
    {
      partId: 165,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}FucsiaReptilianEyes`,
      },
    },
    {
      partId: 166,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}GoldenReptilianEyes`,
      },
    },
    {
      partId: 167,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}GreenReptilianEyes`,
      },
    },
    {
      partId: 168,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYES_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYES_BASE_META}SkyReptilianEyes`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for eyebrows');
  }
  await catalog.addPartList([
    {
      partId: 201,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlackEyebrows`,
      },
    },
    {
      partId: 202,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlackLongEyebrows`,
      },
    },
    {
      partId: 203,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlackUnibrow`,
      },
    },
    {
      partId: 204,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlondEyebrows`,
      },
    },
    {
      partId: 205,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlondLongEyebrows`,
      },
    },
    {
      partId: 206,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BlondUnibrow`,
      },
    },
    {
      partId: 207,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BrownEyebrows`,
      },
    },
    {
      partId: 208,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BrownLongEyebrows`,
      },
    },
    {
      partId: 209,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}BrownUnibrow`,
      },
    },
    {
      partId: 210,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GrayEyebrows`,
      },
    },
    {
      partId: 211,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GrayLongEyebrows`,
      },
    },
    {
      partId: 212,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GrayUnibrow`,
      },
    },
    {
      partId: 213,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GreenEyebrows`,
      },
    },
    {
      partId: 214,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GreenLongEyebrows`,
      },
    },
    {
      partId: 215,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}GreenUnibrow`,
      },
    },
    {
      partId: 216,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}PurpleEyebrows`,
      },
    },
    {
      partId: 217,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}PurpleLongEyebrows`,
      },
    },
    {
      partId: 218,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}PurpleUnibrow`,
      },
    },
    {
      partId: 219,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}Reptilian`,
      },
    },
    {
      partId: 220,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}RoseEyebrows`,
      },
    },
    {
      partId: 221,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}SpaceEyebrows`,
      },
    },
    {
      partId: 222,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}SpaceLongEyebrows`,
      },
    },
    {
      partId: 223,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.EYEBROWS_Z_INDEX,
        equippable: [],
        metadataURI: `${C.EYEBROWS_BASE_META}SpaceUnibrow`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for hair');
  }
  await catalog.addPartList([
    {
      partId: 251,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair1`,
      },
    },
    {
      partId: 252,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair2`,
      },
    },
    {
      partId: 253,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair3`,
      },
    },
    {
      partId: 254,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair4`,
      },
    },
    {
      partId: 255,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair5`,
      },
    },
    {
      partId: 256,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair6`,
      },
    },
    {
      partId: 257,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair7`,
      },
    },
    {
      partId: 258,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair8`,
      },
    },
    {
      partId: 259,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair9`,
      },
    },
    {
      partId: 260,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair10`,
      },
    },
    {
      partId: 261,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair11`,
      },
    },
    {
      partId: 262,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair12`,
      },
    },
    {
      partId: 263,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair13`,
      },
    },
    {
      partId: 264,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair14`,
      },
    },
    {
      partId: 265,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair15`,
      },
    },
    {
      partId: 266,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair16`,
      },
    },
    {
      partId: 267,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair17`,
      },
    },
    {
      partId: 268,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair18`,
      },
    },
    {
      partId: 269,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair19`,
      },
    },
    {
      partId: 270,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair20`,
      },
    },
    {
      partId: 271,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair21`,
      },
    },
    {
      partId: 272,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair22`,
      },
    },
    {
      partId: 273,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair23`,
      },
    },
    {
      partId: 274,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair24`,
      },
    },
    {
      partId: 275,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair25`,
      },
    },
    {
      partId: 276,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair26`,
      },
    },
    {
      partId: 277,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair27`,
      },
    },
    {
      partId: 278,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair28`,
      },
    },
    {
      partId: 279,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair29`,
      },
    },
    {
      partId: 280,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair30`,
      },
    },
    {
      partId: 281,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair31`,
      },
    },
    {
      partId: 282,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair32`,
      },
    },
    {
      partId: 283,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair33`,
      },
    },
    {
      partId: 284,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair34`,
      },
    },
    {
      partId: 285,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair35`,
      },
    },
    {
      partId: 286,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair36`,
      },
    },
    {
      partId: 287,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.HAIR_Z_INDEX,
        equippable: [],
        metadataURI: `${C.HAIR_BASE_META}Hair37`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for noses');
  }
  await catalog.addPartList([
    {
      partId: 301,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose1`,
      },
    },
    {
      partId: 302,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose2`,
      },
    },
    {
      partId: 303,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose3`,
      },
    },
    {
      partId: 304,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose4`,
      },
    },
    {
      partId: 305,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose5`,
      },
    },
    {
      partId: 306,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose6`,
      },
    },
    {
      partId: 307,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose7`,
      },
    },
    {
      partId: 308,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose8`,
      },
    },
    {
      partId: 309,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose9`,
      },
    },
    {
      partId: 310,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose10`,
      },
    },
    {
      partId: 311,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.NOSE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.NOSE_BASE_META}Nose11`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for beards');
  }
  await catalog.addPartList([
    {
      partId: 351,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BlackBeardV11`,
      },
    },
    {
      partId: 352,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BlackBeardV7`,
      },
    },
    {
      partId: 353,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BlueBeardV11`,
      },
    },
    {
      partId: 354,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BlueBeardV4`,
      },
    },
    {
      partId: 355,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BlueBeardV6`,
      },
    },
    {
      partId: 356,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BrownBeardV10`,
      },
    },
    {
      partId: 357,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BrownBeardV11`,
      },
    },
    {
      partId: 358,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BrownBeardV12`,
      },
    },
    {
      partId: 359,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BrownBeardV4`,
      },
    },
    {
      partId: 360,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}BrownBeardV8`,
      },
    },
    {
      partId: 361,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GrayBeardV11`,
      },
    },
    {
      partId: 362,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GrayBeardV3`,
      },
    },
    {
      partId: 363,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GrayBeardV4`,
      },
    },
    {
      partId: 364,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GrayBeardV7`,
      },
    },
    {
      partId: 365,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GrayBeardV9`,
      },
    },
    {
      partId: 366,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GreenBeardV1`,
      },
    },
    {
      partId: 367,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GreenBeardV12`,
      },
    },
    {
      partId: 368,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}GreenBeardV3`,
      },
    },
    {
      partId: 369,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}OceanBeardV5`,
      },
    },
    {
      partId: 370,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}PinkBeardV7`,
      },
    },
    {
      partId: 371,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}RoseBeardV11`,
      },
    },
    {
      partId: 372,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}RoseBeardV12`,
      },
    },
    {
      partId: 373,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}RoseBeardV2`,
      },
    },
    {
      partId: 374,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}RoseBeardV3`,
      },
    },
    {
      partId: 375,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}RoseBeardV6`,
      },
    },
    {
      partId: 376,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SakuraBeardV10`,
      },
    },
    {
      partId: 377,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SakuraBeardV8`,
      },
    },
    {
      partId: 378,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SandBeardV5`,
      },
    },
    {
      partId: 379,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SkyBeardV11`,
      },
    },
    {
      partId: 380,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SkyBeardV12`,
      },
    },
    {
      partId: 381,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SkyBeardV4`,
      },
    },
    {
      partId: 382,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}SkyBeardV9`,
      },
    },
    {
      partId: 383,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}WhiteBeardV11`,
      },
    },
    {
      partId: 384,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.BEARD_Z_INDEX,
        equippable: [],
        metadataURI: `${C.BEARD_BASE_META}YellowBeardV2`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for tongues');
  }
  await catalog.addPartList([
    {
      partId: 401,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}AlienSnakeTongue`,
      },
    },
    {
      partId: 402,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}AlienTongue`,
      },
    },
    {
      partId: 403,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}AlienVenomTongue`,
      },
    },
    {
      partId: 404,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}GreenSnakeTongue`,
      },
    },
    {
      partId: 405,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}GreenTongue`,
      },
    },
    {
      partId: 406,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}GreenVenomTongue`,
      },
    },
    {
      partId: 407,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}PurpleSnakeTongue`,
      },
    },
    {
      partId: 408,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}RoseTongue`,
      },
    },
    {
      partId: 409,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}Tongue`,
      },
    },
    {
      partId: 410,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}VenomTongue`,
      },
    },
    {
      partId: 411,
      part: {
        itemType: C.ITEM_TYPE_FIXED,
        z: C.TONGUE_Z_INDEX,
        equippable: [],
        metadataURI: `${C.TONGUE_BASE_META}WhiteTongue`,
      },
    },
  ]);

  if (!isTest) {
    delay(12000);
    console.log('Configuring catalog for slot parts');
  }
  await catalog.addPartList([
    {
      partId: 501,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.BACKGROUND_Z_INDEX,
        equippable: [backgroundAddress],
        metadataURI: '',
      },
    },
    {
      partId: 502,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.MASK_Z_INDEX,
        equippable: [maskAddress],
        metadataURI: '',
      },
    },
    {
      partId: 503,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.CHAIN_Z_INDEX,
        equippable: [chainAddress],
        metadataURI: '',
      },
    },
    {
      partId: 504,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.EARRING_Z_INDEX,
        equippable: [earringAddress],
        metadataURI: '',
      },
    },
    {
      partId: 505,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.GLASSES_Z_INDEX,
        equippable: [glassesAddress],
        metadataURI: '',
      },
    },
    {
      partId: 506,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.CIGAR_Z_INDEX,
        equippable: [cigarAddress],
        metadataURI: '',
      },
    },
    {
      partId: 507,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.CLOTHING_Z_INDEX,
        equippable: [clothingAddress],
        metadataURI: '',
      },
    },
    {
      partId: 508,
      part: {
        itemType: C.ITEM_TYPE_SLOT,
        z: C.CAP_Z_INDEX,
        equippable: [capsAddress],
        metadataURI: '',
      },
    },
  ]);
}

export default deployContracts;
