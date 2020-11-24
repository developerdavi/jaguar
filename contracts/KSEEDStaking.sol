// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract KSEEDStakingContract is ERC20 {
  struct stakeTracker {
    uint256 lastBlockChecked;
    uint256 rewards;
    uint256 KSEEDStaked;
  }

  address private owner;

  uint256 private rewardsVar;

  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  address private KSEEDAddress;
  IERC20 private KSEEDToken;

  address private JaguarAddress;
  IERC20 private JaguarToken;

  uint256 private _totalKSEEDStaked;
  mapping(address => stakeTracker) private _stakedBalances;

  constructor() public ERC20("JaguarKSEEDStaking", "JGRKSD") {
    owner = msg.sender;
    rewardsVar = 50000;
  }

  event Staked(address indexed user, uint256 amount, uint256 totalKSEEDStaked);
  event Withdrawn(address indexed user, uint256 amount);
  event Rewards(address indexed user, uint256 reward);

  modifier _onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier updateStakingReward(address account) {
    if (block.number > _stakedBalances[account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        _stakedBalances[account].lastBlockChecked
      );

      if (_stakedBalances[account].KSEEDStaked > 0) {
        _stakedBalances[account].rewards = _stakedBalances[account].rewards.add(
          _stakedBalances[account].KSEEDStaked.mul(rewardBlocks) / rewardsVar
        );
      }

      _stakedBalances[account].lastBlockChecked = block.number;

      emit Rewards(account, _stakedBalances[account].rewards);
    }
    _;
  }

  function setKSEEDAddress(address _kseedAddress)
    public
    _onlyOwner
    returns (uint256)
  {
    KSEEDAddress = _kseedAddress;
    KSEEDToken = IERC20(_kseedAddress);
  }

  function setJaguarAddress(address _jaguarAddress)
    public
    _onlyOwner
    returns (uint256)
  {
    JaguarAddress = _jaguarAddress;
    JaguarToken = IERC20(_jaguarAddress);
  }

  function updatingStakingReward(address account) public returns (uint256) {
    if (block.number > _stakedBalances[account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        _stakedBalances[account].lastBlockChecked
      );

      if (_stakedBalances[account].KSEEDStaked > 0) {
        _stakedBalances[account].rewards = _stakedBalances[account].rewards.add(
          _stakedBalances[account].KSEEDStaked.mul(rewardBlocks) / rewardsVar
        );
      }

      _stakedBalances[account].lastBlockChecked = block.number;

      emit Rewards(account, _stakedBalances[account].rewards);
    }
    return (_stakedBalances[account].rewards);
  }

  function getBlockNum() public view returns (uint256) {
    return block.number;
  }

  function getLastBlockCheckedNum(address _account)
    public
    view
    returns (uint256)
  {
    return _stakedBalances[_account].lastBlockChecked;
  }

  function getAddressStakeAmount(address _account)
    public
    view
    returns (uint256)
  {
    return _stakedBalances[_account].KSEEDStaked;
  }

  function setRewardsVar(uint256 _amount) public _onlyOwner {
    rewardsVar = _amount;
  }

  function totalStakedSupply() public view returns (uint256) {
    return _totalKSEEDStaked;
  }

  function myRewardsBalance(address account) public view returns (uint256) {
    if (block.number > _stakedBalances[account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        _stakedBalances[account].lastBlockChecked
      );

      if (_stakedBalances[account].KSEEDStaked > 0) {
        return
          _stakedBalances[account].rewards.add(
            _stakedBalances[account].KSEEDStaked.mul(rewardBlocks) / rewardsVar
          );
      }
    }
  }

  function stake(uint256 amount) public updateStakingReward(msg.sender) {
    _totalKSEEDStaked = _totalKSEEDStaked.add(amount);
    _stakedBalances[msg.sender].KSEEDStaked = _stakedBalances[msg.sender]
      .KSEEDStaked
      .add(amount);
    KSEEDToken.safeTransferFrom(msg.sender, address(this), amount);
    emit Staked(msg.sender, amount, _totalKSEEDStaked);
  }

  function withdraw(uint256 amount) public updateStakingReward(msg.sender) {
    _totalKSEEDStaked = _totalKSEEDStaked.sub(amount);
    _stakedBalances[msg.sender].KSEEDStaked = _stakedBalances[msg.sender]
      .KSEEDStaked
      .sub(amount);
    KSEEDToken.safeTransfer(msg.sender, amount);
    emit Withdrawn(msg.sender, amount);
  }

  function getReward() public updateStakingReward(msg.sender) {
    uint256 reward = _stakedBalances[msg.sender].rewards;
    _stakedBalances[msg.sender].rewards = 0;
    JaguarToken.safeTransfer(msg.sender, reward.mul(8) / 10);
    uint256 fundingPoolReward = reward.mul(2) / 10;
    _mint(KSEEDAddress, fundingPoolReward);
    emit Rewards(msg.sender, reward);
  }
}
