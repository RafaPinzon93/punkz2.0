// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzMask is PunkItemzBase {
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
        PunkzConfig.Mask mask = PunkzConfig.Mask(type_);
        if (mask == PunkzConfig.Mask.AlienMask) return "AlienMask";
        else if (mask == PunkzConfig.Mask.CatMask) return "CatMask";
        else if (mask == PunkzConfig.Mask.EmeraldGasMask)
            return "EmeraldGasMask";
        else if (mask == PunkzConfig.Mask.GasMask) return "GasMask";
        else if (mask == PunkzConfig.Mask.HollowMask) return "HollowMask";
        else if (mask == PunkzConfig.Mask.IronMask) return "IronMask";
        else if (mask == PunkzConfig.Mask.ReptilianMask) return "ReptilianMask";
        else if (mask == PunkzConfig.Mask.SilverCyborgMask)
            return "SilverCyborgMask";
        else if (mask == PunkzConfig.Mask.TerminatorMask)
            return "TerminatorMask";
        else if (mask == PunkzConfig.Mask.WhiteGasMask) return "WhiteGasMask";

        revert InvalidType();
    }
}
