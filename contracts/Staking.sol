// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/SafeERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract StakingContract is ERC20 {
  struct stakeTracker {
    uint256 lastBlockChecked;
    uint256 rewards;
    uint256 ETHStaked;
  }

  address private owner;

  uint256 public totalRewards;

  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  address private JaguarAddress;
  IERC20 private JaguarToken;

  uint256 private _totalStaked;
  mapping(address => stakeTracker) private _stakedBalances;

  constructor() public ERC20('JaguarStaking', 'JGRSTK') {
    owner = msg.sender;
    totalRewards = 100000;
  }

  event Staked(address indexed user, uint256 amount, uint256 totalStaked);
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

      if (_stakedBalances[account].ETHStaked > 0) {
        _stakedBalances[account].rewards = _stakedBalances[account].rewards.add(
          _stakedBalances[account].ETHStaked.mul(rewardBlocks) / totalRewards
        );
      }

      _stakedBalances[account].lastBlockChecked = block.number;

      emit Rewards(account, _stakedBalances[account].rewards);
    }
    _;
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

      if (_stakedBalances[account].ETHStaked > 0) {
        _stakedBalances[account].rewards = _stakedBalances[account].rewards.add(
          _stakedBalances[account].ETHStaked.mul(rewardBlocks) / totalRewards
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
    return _stakedBalances[_account].ETHStaked;
  }

  function setTotalRewards(uint256 _amount) public _onlyOwner {
    totalRewards = _amount;
  }

  function totalStakedSupply() public view returns (uint256) {
    return _totalStaked;
  }

  function myRewardsBalance(address account) public view returns (uint256) {
    if (block.number > _stakedBalances[account].lastBlockChecked) {
      uint256 rewardBlocks = block.number.sub(
        _stakedBalances[account].lastBlockChecked
      );

      if (_stakedBalances[account].ETHStaked > 0) {
        return
          _stakedBalances[account].rewards.add(
            _stakedBalances[account].ETHStaked.mul(rewardBlocks) / totalRewards
          );
      }
    }
  }

  function stake()
    public
    payable
    updateStakingReward(msg.sender)
  {
    require(msg.value > 0, 'You should send an amount greater than zero');
    
    uint256 amount = msg.value;

    _totalStaked = _totalStaked.add(amount);
    _stakedBalances[msg.sender].ETHStaked = _stakedBalances[msg.sender]
      .ETHStaked
      .add(amount);
      
    emit Staked(msg.sender, amount, _totalStaked);
  }

  function withdraw(uint256 amount) public updateStakingReward(msg.sender) {
    require(_stakedBalances[msg.sender].ETHStaked >= amount, 'You can not withdraw more than you staked');

    msg.sender.transfer(amount);

    _totalStaked = _totalStaked.sub(amount);
    _stakedBalances[msg.sender].ETHStaked = _stakedBalances[msg.sender]
      .ETHStaked
      .sub(amount);

    emit Withdrawn(msg.sender, amount);
  }

  function getReward() public updateStakingReward(msg.sender) {
    uint256 reward = _stakedBalances[msg.sender].rewards;
    _stakedBalances[msg.sender].rewards = 0;
    JaguarToken.safeTransfer(msg.sender, reward.mul(8) / 10);
    uint256 fundingPoolReward = reward.mul(2) / 10;
    _mint(JaguarAddress, fundingPoolReward);
    emit Rewards(msg.sender, reward);
  }

}

