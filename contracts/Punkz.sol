// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/RMRK/access/Ownable.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/equippable/RMRKEquippable.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/extension/RMRKRoyalties.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKCollectionMetadata.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKMintingUtils.sol";
import "@rmrk-team/evm-contracts/contracts/implementations/IRMRKInitData.sol";
import "@rmrk-team/evm-contracts/contracts/RMRK/utils/RMRKEquipRenderUtils.sol";
import "./IPunkz.sol";

error InvalidType();
error OnlyMinter();

contract Punkz is
    IPunkz,
    IRMRKInitData,
    RMRKMintingUtils,
    RMRKCollectionMetadata,
    RMRKRoyalties,
    RMRKEquippable
{
    uint64 public constant DEFAULT_EQUIPPABLE_GROUP_ID = 1;
    address private _minter;
    address private _mainCatalog;
    mapping(uint256 => uint8) private _type;
    mapping(address => bool) private _autoAcceptCollection;
    uint256 private _totalAssets;
    string private _baseUri;
    mapping(address => uint256[]) private _tokensMintedByAddress;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory collectionMetadata_,
        string memory baseURI,
        address minter,
        address mainCatalog,
        InitData memory data
    )
        RMRKMintingUtils(data.maxSupply, data.pricePerMint)
        RMRKCollectionMetadata(collectionMetadata_)
        RMRKRoyalties(data.royaltyRecipient, data.royaltyPercentageBps)
        RMRKEquippable(name_, symbol_)
    {
        _minter = minter;
        _mainCatalog = mainCatalog;
        _baseUri = baseURI;
    }

    function totalAssets() public view virtual returns (uint256) {
        return _totalAssets;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return string.concat(_baseUri, typeToName(_type[tokenId]));
    }

    function typeToName(
        uint8 type_
    ) public view virtual returns (string memory name) {
        PunkzConfig.Skin skin = PunkzConfig.Skin(type_);
        if (skin == PunkzConfig.Skin.ReptilianAncientDragon)
            return "ReptilianAncientDragon";
        else if (skin == PunkzConfig.Skin.ReptilianSpace)
            return "ReptilianSpace";
        else if (skin == PunkzConfig.Skin.ReptilianRegular)
            return "ReptilianRegular";
        else if (skin == PunkzConfig.Skin.AlienSpace) return "AlienSpace";
        else if (skin == PunkzConfig.Skin.AlienCrypto) return "AlienCrypto";
        else if (skin == PunkzConfig.Skin.AlienOcean) return "AlienOcean";
        else if (skin == PunkzConfig.Skin.AlienStar) return "AlienStar";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullAncient)
            return "DeadSkinSkullAncient";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullBone)
            return "DeadSkinSkullBone";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullCristal)
            return "DeadSkinSkullCristal";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullGolden)
            return "DeadSkinSkullGolden";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullZombieUltra)
            return "DeadSkinSkullZombieUltra";
        else if (skin == PunkzConfig.Skin.DeadSkinSkullZombieRegular)
            return "DeadSkinSkullZombieRegular";
        else if (skin == PunkzConfig.Skin.ApeAlvin) return "ApeAlvin";
        else if (skin == PunkzConfig.Skin.ApeBio) return "ApeBio";
        else if (skin == PunkzConfig.Skin.ApeDark) return "ApeDark";
        else if (skin == PunkzConfig.Skin.ApeFury) return "ApeFury";
        else if (skin == PunkzConfig.Skin.ApeIce) return "ApeIce";
        else if (skin == PunkzConfig.Skin.ApeLuxy) return "ApeLuxy";
        else if (skin == PunkzConfig.Skin.ApeZombie) return "ApeZombie";
        else if (skin == PunkzConfig.Skin.HumanGolden) return "HumanGolden";
        else if (skin == PunkzConfig.Skin.HumanA) return "HumanA";
        else if (skin == PunkzConfig.Skin.HumanB) return "HumanB";
        else if (skin == PunkzConfig.Skin.HumanC) return "HumanC";

        revert InvalidType();
    }

    function mint(
        address to,
        uint256 tokenId,
        PunkzConfig.FixedConfig memory fixedConfig
    ) public virtual notLocked {
        if (_msgSender() != _minter) {
            revert OnlyMinter();
        }
        if (_totalSupply + 1 > _maxSupply) revert RMRKMintOverMax();

        unchecked {
            _totalSupply += 1;
        }

        _mint(to, tokenId, "");
        _tokensMintedByAddress[to].push(tokenId);

        uint64 newAssetId = uint64(_totalSupply);
        _addAssetEntry(
            newAssetId,
            DEFAULT_EQUIPPABLE_GROUP_ID,
            _mainCatalog,
            tokenURI(tokenId),
            _getPartsFromConfig(fixedConfig)
        );
        _addAssetToToken(tokenId, uint64(newAssetId), 0);
        _acceptAsset(
            tokenId,
            _pendingAssets[tokenId].length - 1,
            uint64(newAssetId)
        );
    }

    function tokensMintedByAddress(
        address owner
    ) public view returns (uint256[] memory) {
        return _tokensMintedByAddress[owner];
    }

    function setAutoAcceptCollection(
        address collection
    ) public virtual onlyOwner {
        _autoAcceptCollection[collection] = true;
    }

    function setBaseURI(string memory baseURI) public virtual onlyOwner {
        _baseUri = baseURI;
    }

    function setMainCatalog(address mainCatalog) public virtual onlyOwner {
        _mainCatalog = mainCatalog;
    }

    function updateRoyaltyRecipient(
        address newRoyaltyRecipient
    ) public virtual override onlyOwner {
        _setRoyaltyRecipient(newRoyaltyRecipient);
    }

    function _getPartsFromConfig(
        PunkzConfig.FixedConfig memory fixedConfig
    ) internal view virtual returns (uint64[] memory parts) {
        uint256 numParts;
        uint64[] memory tempParts = new uint64[](9);

        tempParts[0] = uint64(fixedConfig.skin); // Skin will use Ids from 0 to 50
        numParts++;

        if (fixedConfig.mouth != PunkzConfig.Mouth.None) {
            tempParts[numParts] = uint64(fixedConfig.mouth) + uint64(50); // Mouth will use Ids from 50 to 100
            numParts++;
        }
        if (fixedConfig.eyeColor != PunkzConfig.EyeColor.None) {
            tempParts[numParts] = uint64(fixedConfig.eyeColor) + uint64(100); // EyeColor will use Ids from 100 to 150
            numParts++;
        }
        if (fixedConfig.eye != PunkzConfig.Eyes.None) {
            tempParts[numParts] = uint64(fixedConfig.eye) + uint64(150); // Eyes will use Ids from 150 to 200
            numParts++;
        }
        if (fixedConfig.eyeBrows != PunkzConfig.EyeBrows.None) {
            tempParts[numParts] = uint64(fixedConfig.eyeBrows) + uint64(200); // EyeBrows will use Ids from 200 to 250
            numParts++;
        }
        if (fixedConfig.hair != PunkzConfig.Hair.None) {
            tempParts[numParts] = uint64(fixedConfig.hair) + uint64(250); // Hair will use Ids from 250 to 300
            numParts++;
        }
        if (fixedConfig.nose != PunkzConfig.Nose.None) {
            tempParts[numParts] = uint64(fixedConfig.nose) + uint64(300); // Nose will use Ids from 300 to 350
            numParts++;
        }
        if (fixedConfig.beard != PunkzConfig.Beard.None) {
            tempParts[numParts] = uint64(fixedConfig.beard) + uint64(350); // Beard will use Ids from 350 to 400
            numParts++;
        }
        if (fixedConfig.tongue != PunkzConfig.Tongue.None) {
            tempParts[numParts] = uint64(fixedConfig.tongue) + uint64(400); // Tongue will use Ids from 400 to 450
            numParts++;
        }

        // Copy the parts to a new array of the correct size
        parts = new uint64[](numParts);
        for (uint256 i = 0; i < numParts; i++) {
            parts[i] = tempParts[i];
        }
    }

    function _afterAddChild(
        uint256 tokenId,
        address childAddress,
        uint256 childId,
        bytes memory
    ) internal override {
        // Auto accept children if they are from known collections
        if (_autoAcceptCollection[childAddress]) {
            _acceptChild(
                tokenId,
                _pendingChildren[tokenId].length - 1,
                childAddress,
                childId
            );
        }
    }

    // ASSET MANAGEMENT

    function addAssetEntry(
        string memory metadataURI
    ) public virtual onlyOwnerOrContributor returns (uint256) {
        unchecked {
            _totalAssets += 1;
        }
        _addAssetEntry(uint64(_totalAssets), metadataURI);
        return _totalAssets;
    }

    function addEquippableAssetEntry(
        uint64 equippableGroupId,
        address catalogAddress,
        string memory metadataURI,
        uint64[] memory partIds
    ) public virtual onlyOwnerOrContributor returns (uint256) {
        unchecked {
            _totalAssets += 1;
        }
        _addAssetEntry(
            uint64(_totalAssets),
            equippableGroupId,
            catalogAddress,
            metadataURI,
            partIds
        );
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

    function setValidParentForEquippableGroup(
        uint64 equippableGroupId,
        address parentAddress,
        uint64 partId
    ) public virtual onlyOwnerOrContributor {
        _setValidParentForEquippableGroup(
            equippableGroupId,
            parentAddress,
            partId
        );
    }
}
