// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzClothing is PunkItemzBase {
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
        PunkzConfig.Clothing clothing = PunkzConfig.Clothing(type_);
        if (clothing == PunkzConfig.Clothing.BeigeSuit) return "BeigeSuit";
        else if (clothing == PunkzConfig.Clothing.BlackJacket)
            return "BlackJacket";
        else if (clothing == PunkzConfig.Clothing.BloodHoodie)
            return "BloodHoodie";
        else if (clothing == PunkzConfig.Clothing.CloudJacket)
            return "CloudJacket";
        else if (clothing == PunkzConfig.Clothing.DarkHoodie)
            return "DarkHoodie";
        else if (clothing == PunkzConfig.Clothing.DarkJacket)
            return "DarkJacket";
        else if (clothing == PunkzConfig.Clothing.DeepHoodie)
            return "DeepHoodie";
        else if (clothing == PunkzConfig.Clothing.GrayHoodie)
            return "GrayHoodie";
        else if (clothing == PunkzConfig.Clothing.GrayLeatherJacket)
            return "GrayLeatherJacket";
        else if (clothing == PunkzConfig.Clothing.GreenChessSweatshirt)
            return "GreenChessSweatshirt";
        else if (clothing == PunkzConfig.Clothing.GreenChessSweatshirtV2)
            return "GreenChessSweatshirtV2";
        else if (clothing == PunkzConfig.Clothing.LabCoat) return "LabCoat";
        else if (clothing == PunkzConfig.Clothing.MagmaRetroJacket)
            return "MagmaRetroJacket";
        else if (clothing == PunkzConfig.Clothing.MoonJacketV2)
            return "MoonJacketV2";
        else if (clothing == PunkzConfig.Clothing.MoonLeatherJacket)
            return "MoonLeatherJacket";
        else if (clothing == PunkzConfig.Clothing.ParadoxNinjaVest)
            return "ParadoxNinjaVest";
        else if (clothing == PunkzConfig.Clothing.PinkChessSweatshirt)
            return "PinkChessSweatshirt";
        else if (clothing == PunkzConfig.Clothing.PunkRetroJacket)
            return "PunkRetroJacket";
        else if (clothing == PunkzConfig.Clothing.RainbowLeatherJacket)
            return "RainbowLeatherJacket";
        else if (clothing == PunkzConfig.Clothing.RedJacketV2)
            return "RedJacketV2";
        else if (clothing == PunkzConfig.Clothing.RedNinjaVest)
            return "RedNinjaVest";
        else if (clothing == PunkzConfig.Clothing.RetroSweatshirt)
            return "RetroSweatshirt";
        else if (clothing == PunkzConfig.Clothing.RoseJacket)
            return "RoseJacket";
        else if (clothing == PunkzConfig.Clothing.RoseSuit) return "RoseSuit";
        else if (clothing == PunkzConfig.Clothing.SakuraJacket)
            return "SakuraJacket";
        else if (clothing == PunkzConfig.Clothing.SakuraLeatherJacket)
            return "SakuraLeatherJacket";
        else if (clothing == PunkzConfig.Clothing.SakuraNinjaVest)
            return "SakuraNinjaVest";
        else if (clothing == PunkzConfig.Clothing.SakuraSweatshirt)
            return "SakuraSweatshirt";
        else if (clothing == PunkzConfig.Clothing.SkyHoodie) return "SkyHoodie";
        else if (clothing == PunkzConfig.Clothing.SkyJacket) return "SkyJacket";
        else if (clothing == PunkzConfig.Clothing.SkyLeatherJacket)
            return "SkyLeatherJacket";
        else if (clothing == PunkzConfig.Clothing.SkyRetroJacket)
            return "SkyRetroJacket";
        else if (clothing == PunkzConfig.Clothing.SpaceLabCoat)
            return "SpaceLabCoat";
        else if (clothing == PunkzConfig.Clothing.SpaceSweatshirt)
            return "SpaceSweatshirt";
        else if (clothing == PunkzConfig.Clothing.Suit) return "Suit";
        else if (clothing == PunkzConfig.Clothing.SunriseSweatshirt)
            return "SunriseSweatshirt";
        else if (clothing == PunkzConfig.Clothing.WhiteHoodie)
            return "WhiteHoodie";
        else if (clothing == PunkzConfig.Clothing.WhiteJacket)
            return "WhiteJacket";
        else if (clothing == PunkzConfig.Clothing.WhiteNinjaVest)
            return "WhiteNinjaVest";

        revert InvalidType();
    }
}
