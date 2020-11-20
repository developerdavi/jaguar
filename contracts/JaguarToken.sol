// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title JaguarToken
 * @
 */
contract JaguarToken is ERC20 {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  address owner;

  constructor() public payable ERC20("Jaguar", "JAGUAR") {
    owner = msg.sender;
    uint256 supply = 710000;
    _mint(msg.sender, supply.mul(10**18));
  }
}
