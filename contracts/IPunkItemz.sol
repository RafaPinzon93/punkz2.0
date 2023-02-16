// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.16;

interface IPunkItemz {
    function nestMint(address to, uint256 destinationId, uint8 type_) external;
}
