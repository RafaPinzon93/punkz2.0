// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkItemzBase.sol";
import "./PunkzConfig.sol";

contract PunkzChain is PunkItemzBase {
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
        PunkzConfig.Chain chain = PunkzConfig.Chain(type_);
        if (chain == PunkzConfig.Chain.DarkChain) return "DarkChain";
        else if (chain == PunkzConfig.Chain.DiamondChain) return "DiamondChain";
        else if (chain == PunkzConfig.Chain.DiamondChainV2)
            return "DiamondChainV2";
        else if (chain == PunkzConfig.Chain.EmeraldChainV2)
            return "EmeraldChainV2";
        else if (chain == PunkzConfig.Chain.FucsiaChain) return "FucsiaChain";
        else if (chain == PunkzConfig.Chain.FucsiaChainV2)
            return "FucsiaChainV2";
        else if (chain == PunkzConfig.Chain.GoldChain) return "GoldChain";
        else if (chain == PunkzConfig.Chain.GoldChainV2) return "GoldChainV2";
        else if (chain == PunkzConfig.Chain.GoldenChainV2)
            return "GoldenChainV2";
        else if (chain == PunkzConfig.Chain.LightChain) return "LightChain";
        else if (chain == PunkzConfig.Chain.LightChainV2) return "LightChainV2";
        else if (chain == PunkzConfig.Chain.MoonChain) return "MoonChain";
        else if (chain == PunkzConfig.Chain.RubyChain) return "RubyChain";

        revert InvalidType();
    }
}
