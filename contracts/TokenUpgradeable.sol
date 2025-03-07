// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract TokenUpgradeable is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    constructor(){
        _disableInitializers();
    }

    function initialize(address initialOwner) public initializer {
        __ERC20_init("TEST", "TT");
        __Ownable_init(initialOwner);

        _mint(msg.sender, 5000000000000000000000000000);
    }
    
    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}