// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzGlasses is PunkItemzBase {
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
        PunkzConfig.Glasses glasses = PunkzConfig.Glasses(type_);
        if (glasses == PunkzConfig.Glasses.D3Glasses) return "D3Glasses";
        else if (glasses == PunkzConfig.Glasses.BlueScouter)
            return "BlueScouter";
        else if (glasses == PunkzConfig.Glasses.BlueTranslucentGlasses)
            return "BlueTranslucentGlasses";
        else if (glasses == PunkzConfig.Glasses.BlueTranslucentGlassesV2)
            return "BlueTranslucentGlassesV2";
        else if (glasses == PunkzConfig.Glasses.ChessGlasses)
            return "ChessGlasses";
        else if (glasses == PunkzConfig.Glasses.ClassicGlasses)
            return "ClassicGlasses";
        else if (glasses == PunkzConfig.Glasses.EyePatch) return "EyePatch";
        else if (glasses == PunkzConfig.Glasses.FancySunglasses)
            return "FancySunglasses";
        else if (glasses == PunkzConfig.Glasses.FuturisticSunglasses)
            return "FuturisticSunglasses";
        else if (glasses == PunkzConfig.Glasses.Glasses) return "Glasses";
        else if (glasses == PunkzConfig.Glasses.GlassesV2) return "GlassesV2";
        else if (glasses == PunkzConfig.Glasses.GlassesX) return "GlassesX";
        else if (glasses == PunkzConfig.Glasses.GreenScouter)
            return "GreenScouter";
        else if (glasses == PunkzConfig.Glasses.GreenTranslucentGlasses)
            return "GreenTranslucentGlasses";
        else if (glasses == PunkzConfig.Glasses.HappyVRHeadset)
            return "HappyVRHeadset";
        else if (glasses == PunkzConfig.Glasses.LilacScouter)
            return "LilacScouter";
        else if (glasses == PunkzConfig.Glasses.LilacTranslucentGlasses)
            return "LilacTranslucentGlasses";
        else if (glasses == PunkzConfig.Glasses.PinkGlasses)
            return "PinkGlasses";
        else if (glasses == PunkzConfig.Glasses.RainbowSunglasses)
            return "RainbowSunglasses";
        else if (glasses == PunkzConfig.Glasses.RedTranslucentGlasses)
            return "RedTranslucentGlasses";
        else if (glasses == PunkzConfig.Glasses.RetroSunglasses)
            return "RetroSunglasses";
        else if (glasses == PunkzConfig.Glasses.RoseScouter)
            return "RoseScouter";
        else if (glasses == PunkzConfig.Glasses.RoseTranslucentGlasses)
            return "RoseTranslucentGlasses";
        else if (glasses == PunkzConfig.Glasses.Sunglasses) return "Sunglasses";
        else if (glasses == PunkzConfig.Glasses.SunglassesV2)
            return "SunglassesV2";
        else if (glasses == PunkzConfig.Glasses.VRHeadset) return "VRHeadset";

        revert InvalidType();
    }
}
