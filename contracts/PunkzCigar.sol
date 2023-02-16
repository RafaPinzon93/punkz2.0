// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzCigar is PunkItemzBase {
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
        PunkzConfig.Cigar cigar = PunkzConfig.Cigar(type_);
        if (cigar == PunkzConfig.Cigar.BlackCigar) return "BlackCigar";
        else if (cigar == PunkzConfig.Cigar.BloodDarkCigar)
            return "BloodDarkCigar";
        else if (cigar == PunkzConfig.Cigar.BloodSmokingPipe)
            return "BloodSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.BlueCigar) return "BlueCigar";
        else if (cigar == PunkzConfig.Cigar.Cigar) return "Cigar";
        else if (cigar == PunkzConfig.Cigar.CigarV2) return "CigarV2";
        else if (cigar == PunkzConfig.Cigar.CloudSmokingPipe)
            return "CloudSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.DarkSmokingPipe)
            return "DarkSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.EmeraldCigar) return "EmeraldCigar";
        else if (cigar == PunkzConfig.Cigar.FucsiaDarkCigar)
            return "FucsiaDarkCigar";
        else if (cigar == PunkzConfig.Cigar.FucsiaSmokingPipe)
            return "FucsiaSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.GangstaCigar) return "GangstaCigar";
        else if (cigar == PunkzConfig.Cigar.GoldSmokingPipe)
            return "GoldSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.GreenCigar) return "GreenCigar";
        else if (cigar == PunkzConfig.Cigar.GreenDarkCigar)
            return "GreenDarkCigar";
        else if (cigar == PunkzConfig.Cigar.GreenSmokingPipe)
            return "GreenSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.LabSmokingPipe)
            return "LabSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.MagentaSmokingPipe)
            return "MagentaSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.OceanCigar) return "OceanCigar";
        else if (cigar == PunkzConfig.Cigar.OceanSmokingPipe)
            return "OceanSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.OrangeCigar) return "OrangeCigar";
        else if (cigar == PunkzConfig.Cigar.PurpleCigar) return "PurpleCigar";
        else if (cigar == PunkzConfig.Cigar.PurpleCigarV2)
            return "PurpleCigarV2";
        else if (cigar == PunkzConfig.Cigar.PurpleSmokingPipe)
            return "PurpleSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.SeaSmokingPipe)
            return "SeaSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.SkyCigar) return "SkyCigar";
        else if (cigar == PunkzConfig.Cigar.SkyDarkCigar) return "SkyDarkCigar";
        else if (cigar == PunkzConfig.Cigar.SmokingPipe) return "SmokingPipe";
        else if (cigar == PunkzConfig.Cigar.SnowDarkCigar)
            return "SnowDarkCigar";
        else if (cigar == PunkzConfig.Cigar.SpaceDarkCigar)
            return "SpaceDarkCigar";
        else if (cigar == PunkzConfig.Cigar.VenomSmokingPipe)
            return "VenomSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.WeedSmokingPipe)
            return "WeedSmokingPipe";
        else if (cigar == PunkzConfig.Cigar.YellowCigar) return "YellowCigar";

        revert InvalidType();
    }
}
