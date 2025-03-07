// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol';
import '@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

contract TokenBurnableUpgradeable is ERC20BurnableUpgradeable, UUPSUpgradeable, OwnableUpgradeable  {
    constructor(){}
    
    function _authorizeUpgrade(
        address newImplementation
    ) internal virtual override onlyOwner {}
}