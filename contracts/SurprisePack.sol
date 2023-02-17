// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/extension/RMRKRoyalties.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/multiasset/RMRKMultiAsset.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKCollectionMetadata.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/access/Ownable.sol";
import "./PunkzConfig.sol";
import "./IPunkz.sol";
import "./IPunkItemz.sol";

error MintingZero();
error PackNotReady();
error PunkAlreadyMinted();
error PunkGotNoBeard();
error PunkGotNoTongue();
error PunkMustHaveBackGround();
error PunkMustHaveClothing();
error RMRKMintUnderpriced();
error SaleNotStarted();
error SkinMismatch();
error TooManyAccessories();

struct Collectionz {
    address punkz;
    address background;
    address clothing;
    address caps;
    address chain;
    address cigar;
    address earrings;
    address glasses;
    address mask;
}

contract SurprisePack is
    Ownable,
    RMRKCollectionMetadata,
    RMRKRoyalties,
    RMRKMultiAsset
{
    enum PackRarity {
        Common,
        Rare,
        Epic
    }

    uint256 private _totalAssets;
    uint256 private _totalSupply;
    uint256 private immutable _maxSupply;
    uint256 private immutable _pricePerCommon;
    uint256 private immutable _pricePerRare;
    uint256 private immutable _pricePerEpic;
    bool private _saleIsActive;
    mapping(uint256 => uint256) private _seedPerToken;
    mapping(uint256 => bool) private _isPunkMinted;
    mapping(uint256 => PackRarity) private _rarityPerToken;
    mapping(address => uint256[]) private _tokensMintedByAddress;

    Collectionz private _collectionz;

    constructor(
        string memory collectionMetadata_,
        address royaltyRecipient, // 20 bytes
        uint16 royaltyPercentageBps, // 2 bytes
        uint256 maxSupply_,
        uint256 pricePerCommon,
        uint256 pricePerRare,
        uint256 pricePerEpic,
        Collectionz memory collectionz
    )
        RMRKCollectionMetadata(collectionMetadata_)
        RMRKRoyalties(royaltyRecipient, royaltyPercentageBps)
        RMRKMultiAsset("Punkz 2.0 Packs", "PNKZP")
    {
        _maxSupply = maxSupply_;
        _pricePerCommon = pricePerCommon;
        _pricePerRare = pricePerRare;
        _pricePerEpic = pricePerEpic;
        _collectionz = collectionz;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    function getCollectionz() public view returns (Collectionz memory) {
        return _collectionz;
    }

    function mint(
        address to,
        uint256 numToMint,
        PackRarity rarity
    ) public payable virtual {
        if (_saleIsActive) revert SaleNotStarted();
        if (numToMint == uint256(0)) revert MintingZero();
        if (numToMint + _totalSupply > _maxSupply) revert RMRKMintOverMax();

        uint256 mintPriceRequired = numToMint * pricePerMint(rarity);
        if (mintPriceRequired != msg.value) revert RMRKMintUnderpriced();

        uint256 nextToken = _totalSupply + 1;
        unchecked {
            _totalSupply += numToMint;
        }
        uint256 totalSupplyOffset = _totalSupply + 1;

        for (uint256 i = nextToken; i < totalSupplyOffset; ) {
            _safeMint(to, i, "");
            _rarityPerToken[i] = rarity;
            // This is just for testing, on prod seed will be set later fairly by the contract owner
            _seedPerToken[i] = i;
            _tokensMintedByAddress[to].push(i);
            unchecked {
                ++i;
            }
        }
    }

    function tokensMintedByAddress(
        address owner
    ) public view returns (uint256[] memory) {
        return _tokensMintedByAddress[owner];
    }

    function pricePerMint(PackRarity rarity) public view returns (uint256) {
        if (rarity == PackRarity.Common) {
            return _pricePerCommon;
        } else if (rarity == PackRarity.Rare) {
            return _pricePerRare;
        } else {
            return _pricePerEpic;
        }
    }

    function setSaleIsActive(bool saleIsActive) public onlyOwner {
        _saleIsActive = saleIsActive;
    }

    function setCollectionz(Collectionz memory collectionz) public onlyOwner {
        _collectionz = collectionz;
    }

    function setSeed(uint256 tokenId, uint256 seed) public onlyOwner {
        _seedPerToken[tokenId] = seed;
    }

    function updateRoyaltyRecipient(
        address newRoyaltyRecipient
    ) public virtual override onlyOwner {
        _setRoyaltyRecipient(newRoyaltyRecipient);
    }

    function withdrawRaised(address to, uint256 amount) external onlyOwner {
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed.");
    }

    function addAssetEntry(
        string memory metadataURI
    ) public virtual onlyOwnerOrContributor returns (uint256) {
        unchecked {
            _totalAssets += 1;
        }
        _addAssetEntry(uint64(_totalAssets), metadataURI);
        return _totalAssets;
    }

    function addAssetToToken(
        uint256 tokenId,
        uint64 assetId,
        uint64 replacesAssetWithId
    ) public virtual onlyOwnerOrContributor {
        _addAssetToToken(tokenId, assetId, replacesAssetWithId);
        if (_msgSender() == ownerOf(tokenId)) {
            _acceptAsset(tokenId, _pendingAssets[tokenId].length - 1, assetId);
        }
    }

    function getRevealResult(
        uint256 tokenId
    )
        public
        view
        returns (
            bool hasBeard,
            bool hasTongue,
            uint256 totalAccesories,
            PunkzConfig.Skin skin
        )
    {
        if (_seedPerToken[tokenId] == 0) revert PackNotReady();

        hasBeard = getHasBeard(tokenId);
        hasTongue = getHasTongue(tokenId);
        totalAccesories = getTotalAccesories(tokenId);
        skin = getSkin(tokenId);
    }

    function getHasBeard(uint256 tokenId) public view returns (bool) {
        uint256 randomVal = (_seedPerToken[tokenId] * 3) % 100;
        return _getHasPartEnabled(tokenId, randomVal, 5, 10, 10);
    }

    function getHasTongue(uint256 tokenId) public view returns (bool) {
        uint256 randomVal = (_seedPerToken[tokenId] * 5) % 100;
        return _getHasPartEnabled(tokenId, randomVal, 1, 4, 5);
    }

    function _getHasPartEnabled(
        uint256 tokenId,
        uint256 randomVal,
        uint256 forCommon,
        uint256 forRare,
        uint256 forEpic
    ) internal view returns (bool) {
        PackRarity tokenRarity = _rarityPerToken[tokenId];
        if (tokenRarity == PackRarity.Common) {
            return randomVal < forCommon;
        } else if (tokenRarity == PackRarity.Rare) {
            return randomVal < forRare;
        } else {
            return randomVal < forEpic;
        }
    }

    function getTotalAccesories(uint256 tokenId) public view returns (uint256) {
        uint256 randomVal = (_seedPerToken[tokenId] * 7) % 100;
        PackRarity tokenRarity = _rarityPerToken[tokenId];
        if (tokenRarity == PackRarity.Common) {
            return (randomVal / 50) + 1; // Up to 2
        } else if (tokenRarity == PackRarity.Rare) {
            return (randomVal / 25) + 1; // Up to 4
        } else {
            return (randomVal / 16) + 1; // Up to 6
        }
    }

    function getSkin(
        uint256 tokenId
    ) public view returns (PunkzConfig.Skin skin) {
        uint256 randomVal = (_seedPerToken[tokenId] * 11) % 100;
        PackRarity tokenRarity = _rarityPerToken[tokenId];

        if (tokenRarity == PackRarity.Rare) {
            randomVal /= 2;
        } else if (tokenRarity == PackRarity.Epic) {
            randomVal /= 4;
        }

        if (randomVal < 1) return PunkzConfig.Skin.ReptilianAncientDragon;
        // 1%
        else if (randomVal < 2) return PunkzConfig.Skin.ReptilianSpace;
        // 1%
        else if (randomVal < 5) return PunkzConfig.Skin.ReptilianRegular;
        // 3%
        else if (randomVal < 8) return PunkzConfig.Skin.AlienSpace;
        // 3%
        else if (randomVal < 11) return PunkzConfig.Skin.AlienCrypto;
        // 3%
        else if (randomVal < 14) return PunkzConfig.Skin.AlienOcean;
        // 3%
        else if (randomVal < 17) return PunkzConfig.Skin.AlienStar;
        // 3%
        else if (randomVal < 18) return PunkzConfig.Skin.DeadSkinSkullAncient;
        // 1%
        else if (randomVal < 19) return PunkzConfig.Skin.DeadSkinSkullBone;
        // 1%
        else if (randomVal < 20) return PunkzConfig.Skin.DeadSkinSkullCristal;
        // 1%
        else if (randomVal < 21) return PunkzConfig.Skin.DeadSkinSkullGolden;
        // 1%
        else if (randomVal < 23)
            return PunkzConfig.Skin.DeadSkinSkullZombieUltra;
        // 2%
        else if (randomVal < 26)
            return PunkzConfig.Skin.DeadSkinSkullZombieRegular;
        // 3%
        else if (randomVal < 29) return PunkzConfig.Skin.ApeAlvin;
        // 3%
        else if (randomVal < 32) return PunkzConfig.Skin.ApeBio;
        // 3%
        else if (randomVal < 35) return PunkzConfig.Skin.ApeDark;
        // 3%
        else if (randomVal < 38) return PunkzConfig.Skin.ApeFury;
        // 3%
        else if (randomVal < 41) return PunkzConfig.Skin.ApeIce;
        // 3%
        else if (randomVal < 44) return PunkzConfig.Skin.ApeLuxy;
        // 3%
        else if (randomVal < 47) return PunkzConfig.Skin.ApeZombie;
        // 3%
        else if (randomVal < 52) return PunkzConfig.Skin.HumanGolden;
        // 5%
        else if (randomVal < 68) return PunkzConfig.Skin.HumanA;
        // 16%
        else if (randomVal < 84) return PunkzConfig.Skin.HumanB;
        // 16%
        else if (randomVal < 100) return PunkzConfig.Skin.HumanC; // 16%
    }

    function isPunkMinted(uint256 tokenId) public view returns (bool) {
        return _isPunkMinted[tokenId];
    }

    function mintPunk(
        uint256 tokenId,
        PunkzConfig.FixedConfig memory fixedConfig,
        PunkzConfig.ItemsConfig memory itemsConfig
    ) public virtual onlyApprovedOrOwner(tokenId) {
        if (_isPunkMinted[tokenId]) {
            revert PunkAlreadyMinted();
        }
        _isPunkMinted[tokenId] = true;
        (
            bool hasBeard,
            bool hasTongue,
            uint256 totalAccesories,
            PunkzConfig.Skin skin
        ) = getRevealResult(tokenId);
        if (fixedConfig.skin != skin) revert SkinMismatch();
        if (fixedConfig.beard != PunkzConfig.Beard.None && !hasBeard)
            revert PunkGotNoBeard();
        if (fixedConfig.tongue != PunkzConfig.Tongue.None && !hasTongue)
            revert PunkGotNoTongue();
        if (itemsConfig.clothing == PunkzConfig.Clothing.None)
            revert PunkMustHaveClothing();
        if (itemsConfig.background == PunkzConfig.Background.None)
            revert PunkMustHaveBackGround();

        uint256 accessoriesCount = _countAccesories(itemsConfig);
        if (accessoriesCount > totalAccesories) revert TooManyAccessories();

        IPunkz(_collectionz.punkz).mint(_msgSender(), tokenId, fixedConfig);

        IPunkItemz(_collectionz.background).nestMint(
            _collectionz.punkz,
            tokenId,
            uint8(itemsConfig.background)
        );

        IPunkItemz(_collectionz.clothing).nestMint(
            _collectionz.punkz,
            tokenId,
            uint8(itemsConfig.clothing)
        );

        if (itemsConfig.cap != PunkzConfig.Cap.None)
            IPunkItemz(_collectionz.caps).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.cap)
            );
        if (itemsConfig.chain != PunkzConfig.Chain.None)
            IPunkItemz(_collectionz.chain).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.chain)
            );
        if (itemsConfig.cigar != PunkzConfig.Cigar.None)
            IPunkItemz(_collectionz.cigar).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.cigar)
            );
        if (itemsConfig.earring != PunkzConfig.Earring.None)
            IPunkItemz(_collectionz.earrings).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.earring)
            );
        if (itemsConfig.glasses != PunkzConfig.Glasses.None)
            IPunkItemz(_collectionz.glasses).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.glasses)
            );
        if (itemsConfig.mask != PunkzConfig.Mask.None)
            IPunkItemz(_collectionz.mask).nestMint(
                _collectionz.punkz,
                tokenId,
                uint8(itemsConfig.mask)
            );
    }

    function _countAccesories(
        PunkzConfig.ItemsConfig memory itemsConfig
    ) internal pure returns (uint256 accessoriesCount) {
        if (itemsConfig.cap != PunkzConfig.Cap.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
        if (itemsConfig.chain != PunkzConfig.Chain.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
        if (itemsConfig.cigar != PunkzConfig.Cigar.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
        if (itemsConfig.earring != PunkzConfig.Earring.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
        if (itemsConfig.glasses != PunkzConfig.Glasses.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
        if (itemsConfig.mask != PunkzConfig.Mask.None) {
            unchecked {
                ++accessoriesCount;
            }
        }
    }
}
