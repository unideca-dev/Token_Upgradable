// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract TokenProxy is ERC1967Proxy {
    constructor(
        address implementation, 
        bytes memory _data
    ) payable ERC1967Proxy(implementation, _data) {}
}