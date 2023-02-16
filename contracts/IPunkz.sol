// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

import "./PunkzConfig.sol";

interface IPunkz {
    function mint(
        address to,
        uint256 tokenId,
        PunkzConfig.FixedConfig memory fixedConfig
    ) external;
}
