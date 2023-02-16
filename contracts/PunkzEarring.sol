// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzEarring is PunkItemzBase {
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
        PunkzConfig.Earring earring = PunkzConfig.Earring(type_);
        if (earring == PunkzConfig.Earring.DiamondEarring)
            return "DiamondEarring";
        else if (earring == PunkzConfig.Earring.DiamondEarringV2)
            return "DiamondEarringV2";
        else if (earring == PunkzConfig.Earring.EmeraldEarring)
            return "EmeraldEarring";
        else if (earring == PunkzConfig.Earring.EmeraldEarringV2)
            return "EmeraldEarringV2";
        else if (earring == PunkzConfig.Earring.FucsiaEarring)
            return "FucsiaEarring";
        else if (earring == PunkzConfig.Earring.FucsiaEarringV2)
            return "FucsiaEarringV2";
        else if (earring == PunkzConfig.Earring.GoldEarring)
            return "GoldEarring";
        else if (earring == PunkzConfig.Earring.GoldEarringV2)
            return "GoldEarringV2";
        else if (earring == PunkzConfig.Earring.GoldenEarring)
            return "GoldenEarring";
        else if (earring == PunkzConfig.Earring.GoldenEarringV2)
            return "GoldenEarringV2";
        else if (earring == PunkzConfig.Earring.GreenEarring)
            return "GreenEarring";
        else if (earring == PunkzConfig.Earring.GreenEarringV2)
            return "GreenEarringV2";
        else if (earring == PunkzConfig.Earring.LilacEarring)
            return "LilacEarring";
        else if (earring == PunkzConfig.Earring.LilacEarringV2)
            return "LilacEarringV2";
        else if (earring == PunkzConfig.Earring.OceanEarring)
            return "OceanEarring";
        else if (earring == PunkzConfig.Earring.OceanEarringV2)
            return "OceanEarringV2";
        else if (earring == PunkzConfig.Earring.PurpleEarring)
            return "PurpleEarring";
        else if (earring == PunkzConfig.Earring.PurpleEarringV2)
            return "PurpleEarringV2";
        else if (earring == PunkzConfig.Earring.RubyEarring)
            return "RubyEarring";
        else if (earring == PunkzConfig.Earring.RubyEarringV2)
            return "RubyEarringV2";

        revert InvalidType();
    }
}
