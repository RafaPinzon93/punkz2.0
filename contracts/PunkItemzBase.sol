// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "@rmrk-team/evm-contracts/contracts/implementations/abstracts/RMRKAbstractEquippableImpl.sol";
import "./IPunkItemz.sol";

error InvalidType();
error OnlyMinter();

abstract contract PunkItemzBase is IPunkItemz, RMRKAbstractEquippableImpl {
    address private _minter;
    string private _baseUri;
    mapping(uint256 => uint8) private _type;

    constructor(
        string memory name_,
        string memory symbol_,
        string memory collectionMetadata_,
        string memory baseURI,
        address minter,
        InitData memory data
    )
        RMRKMintingUtils(data.maxSupply, data.pricePerMint)
        RMRKCollectionMetadata(collectionMetadata_)
        RMRKRoyalties(data.royaltyRecipient, data.royaltyPercentageBps)
        RMRKTokenURI(baseURI, false)
        RMRKEquippable(name_, symbol_)
    {
        _minter = minter;
        _baseUri = baseURI;
    }

    function nestMint(
        address to,
        uint256 destinationId,
        uint8 type_
    ) public virtual notLocked {
        if (_msgSender() != _minter) {
            revert OnlyMinter();
        }
        (uint256 nextToken, ) = _preMint(1);
        _nestMint(to, nextToken, destinationId, "");
        _type[nextToken] = type_;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string.concat(_baseUri, typeToName(_type[tokenId]));
    }

    function typeToName(
        uint8 type_
    ) public view virtual returns (string memory name);

    function _charge(uint256 value) internal override {
        // no charge
    }
}
