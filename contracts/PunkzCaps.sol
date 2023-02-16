// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzCaps is PunkItemzBase {
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
        PunkzConfig.Cap caps = PunkzConfig.Cap(type_);
        if (caps == PunkzConfig.Cap.ArcticCap) return "ArcticCap";
        else if (caps == PunkzConfig.Cap.ArticKnittedCap)
            return "ArticKnittedCap";
        else if (caps == PunkzConfig.Cap.ArticTruckerHat)
            return "ArticTruckerHat";
        else if (caps == PunkzConfig.Cap.BlackCap) return "BlackCap";
        else if (caps == PunkzConfig.Cap.BlackClassicCap)
            return "BlackClassicCap";
        else if (caps == PunkzConfig.Cap.BlackHeadBandana)
            return "BlackHeadBandana";
        else if (caps == PunkzConfig.Cap.BlackTruckerHat)
            return "BlackTruckerHat";
        else if (caps == PunkzConfig.Cap.Cap6) return "Cap6";
        else if (caps == PunkzConfig.Cap.Cap7) return "Cap7";
        else if (caps == PunkzConfig.Cap.Cap8) return "Cap8";
        else if (caps == PunkzConfig.Cap.DarkCrown) return "DarkCrown";
        else if (caps == PunkzConfig.Cap.DarkNinjaHeadbandV2)
            return "DarkNinjaHeadbandV2";
        else if (caps == PunkzConfig.Cap.DiamondCrown) return "DiamondCrown";
        else if (caps == PunkzConfig.Cap.FucsiaNinjaHeadband)
            return "FucsiaNinjaHeadband";
        else if (caps == PunkzConfig.Cap.GoldCrown) return "GoldCrown";
        else if (caps == PunkzConfig.Cap.GrayKnittedCap)
            return "GrayKnittedCap";
        else if (caps == PunkzConfig.Cap.GrayNinjaHeadband)
            return "GrayNinjaHeadband";
        else if (caps == PunkzConfig.Cap.HatV1) return "HatV1";
        else if (caps == PunkzConfig.Cap.HatV2) return "HatV2";
        else if (caps == PunkzConfig.Cap.KryptonCrown) return "KryptonCrown";
        else if (caps == PunkzConfig.Cap.LuxyHeadband) return "LuxyHeadband";
        else if (caps == PunkzConfig.Cap.MilitaryCap) return "MilitaryCap";
        else if (caps == PunkzConfig.Cap.MilitaryHeadBandana)
            return "MilitaryHeadBandana";
        else if (caps == PunkzConfig.Cap.MoonCrown) return "MoonCrown";
        else if (caps == PunkzConfig.Cap.NinjaHeadband) return "NinjaHeadband";
        else if (caps == PunkzConfig.Cap.NinjaHeadbandV2)
            return "NinjaHeadbandV2";
        else if (caps == PunkzConfig.Cap.PinkKnittedCap)
            return "PinkKnittedCap";
        else if (caps == PunkzConfig.Cap.RedBandana) return "RedBandana";
        else if (caps == PunkzConfig.Cap.RedClassicCap) return "RedClassicCap";
        else if (caps == PunkzConfig.Cap.RedHeadband) return "RedHeadband";
        else if (caps == PunkzConfig.Cap.RedHeadBandana)
            return "RedHeadBandana";
        else if (caps == PunkzConfig.Cap.RedKnittedCap) return "RedKnittedCap";
        else if (caps == PunkzConfig.Cap.RetroHeadband) return "RetroHeadband";
        else if (caps == PunkzConfig.Cap.RoyalCrown) return "RoyalCrown";
        else if (caps == PunkzConfig.Cap.TurquoiseBandana)
            return "TurquoiseBandana";
        else if (caps == PunkzConfig.Cap.TurquoiseHeadBandana)
            return "TurquoiseHeadBandana";
        else if (caps == PunkzConfig.Cap.TurquoiseKnittedCap)
            return "TurquoiseKnittedCap";
        else if (caps == PunkzConfig.Cap.WhiteCap) return "WhiteCap";
        else if (caps == PunkzConfig.Cap.WhiteHeadband) return "WhiteHeadband";
        else if (caps == PunkzConfig.Cap.WhiteKnittedCap)
            return "WhiteKnittedCap";
        else if (caps == PunkzConfig.Cap.WhiteNinjaHeadbandV2)
            return "WhiteNinjaHeadbandV2";
        else if (caps == PunkzConfig.Cap.White_RedClassicCap)
            return "White_RedClassicCap";

        revert InvalidType();
    }
}
