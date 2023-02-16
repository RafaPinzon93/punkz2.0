// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzBackground is PunkItemzBase {
    constructor(
        string memory name_,
        string memory symbol_,
        string memory collectionMetadata_,
        string memory baseURI,
        address minter,
        InitData memory data
    )
        PunkItemzBase(
            name_,
            symbol_,
            collectionMetadata_,
            baseURI,
            minter,
            data
        )
    {}

    function typeToName(
        uint8 type_
    ) public pure override returns (string memory name) {
        PunkzConfig.Background background = PunkzConfig.Background(type_);
        if (background == PunkzConfig.Background.Background0x0b0b0b)
            return "Background0x0b0b0b";
        else if (background == PunkzConfig.Background.Background0x6b86ff)
            return "Background0x6b86ff";
        else if (background == PunkzConfig.Background.Background0x6be7ff)
            return "Background0x6be7ff";
        else if (background == PunkzConfig.Background.Background0x99ffc2)
            return "Background0x99ffc2";
        else if (background == PunkzConfig.Background.Background0x706bff)
            return "Background0x706bff";
        else if (background == PunkzConfig.Background.Background0xb5fbff)
            return "Background0xb5fbff";
        else if (background == PunkzConfig.Background.Background0xcabaff)
            return "Background0xcabaff";
        else if (background == PunkzConfig.Background.Background0xe9e9e9)
            return "Background0xe9e9e9";
        else if (background == PunkzConfig.Background.Background0xff6bcc)
            return "Background0xff6bcc";
        else if (background == PunkzConfig.Background.Background0xff99dc)
            return "Background0xff99dc";
        else if (background == PunkzConfig.Background.Background0xff9441)
            return "Background0xff9441";
        else if (background == PunkzConfig.Background.Background0xfffeb5)
            return "Background0xfffeb5";

        revert InvalidType();
    }
}
