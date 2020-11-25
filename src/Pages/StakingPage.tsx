import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Contract } from 'web3-eth-contract';

import Button from '../Components/Button';
import { ButtonGroup } from '../Components/Button/styles';
import Center from '../Components/Center';
import Input from '../Components/Input';
import Panel from '../Components/Panel';
import ProgressBar from '../Components/ProgressBar';
import { PageTitle, Paragraph } from '../Components/Typography';
import { toEther, toWei } from '../Helpers/Converter';

const StakingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Staking | Jaguars';
  }, []);

  /**
   * Inputs values
   */
  const [stakeValue, setStakeValue] = useState(0);
  const handleStakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStakeValue(parseFloat(e.target.value));
  };
  const [stakedValue, setStakedValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawValue(parseFloat(e.target.value));
  };
  const [rewardsValue, setRewardsValue] = useState(0);
  const [jaguarAmount, setJaguarAmount] = useState(0);

  const totalRewards = 100000;

  /**
   * Misc
   */
  const web3Enabled: boolean = useSelector(
    (x: RootStateOrAny) => x.web3Enabled
  );
  const accounts: string[] = useSelector((x: RootStateOrAny) => x.accounts);
  const balances = useSelector((x: RootStateOrAny) => x.balances);

  /**
   * Contracts
   */
  const jaguarToken: Contract = useSelector(
    (x: RootStateOrAny) => x.jaguarToken
  );
  const stakingContract: Contract = useSelector(
    (x: RootStateOrAny) => x.ethStaking
  );

  /**
   * Set-up
   */
  useEffect(() => {
    if (stakingContract.methods && jaguarToken.methods) {
      updateStakedAmount();
      updateRewards();
      updateStakingContractJaguarBalance();
    }
  }, [stakingContract, jaguarToken]);

  const handleStake = async () => {
    if (!web3Enabled) {
      return alert('Please connect wallet first');
    }
    await stakingContract.methods.stake().send({
      from: accounts[0],
      value: stakeValue * 10 ** 18
    });
  };

  const handleAddMaxStake = () => {
    setStakeValue(toEther(balances.eth));
  };

  const handleAddMaxWithdraw = () => {
    setWithdrawValue(stakedValue);
  };

  const updateRewards = async () => {
    const rewards = await stakingContract.methods
      .myRewardsBalance(accounts[0])
      .call();
    setRewardsValue(toEther(rewards));
  };

  const updateStakedAmount = async () => {
    const staked = await stakingContract.methods
      .getAddressStakeAmount(accounts[0])
      .call();
    setStakedValue(toEther(staked));
    setWithdrawValue(toEther(staked));
  };

  const updateStakingContractJaguarBalance = async () => {
    const amount = await jaguarToken.methods
      .balanceOf(stakingContract.options.address)
      .call();
    setJaguarAmount(amount);
  };

  const handleWithdrawal = async () => {
    await stakingContract.methods.withdraw(toWei(withdrawValue)).send({
      from: accounts[0]
    });
  };

  const handleClaimRewards = async () => {
    await stakingContract.methods.getReward().send({
      from: accounts[0]
    });
  };

  return (
    <div>
      <Center>
        <PageTitle>Instructions</PageTitle>
      </Center>
      <Paragraph>1. Stake your ETH;</Paragraph>
      <Paragraph>
        2. Rewards grow at every block and are relative to the amount staked;
      </Paragraph>
      <Paragraph>3. When wanted you can claim your Jaguars reward;</Paragraph>
      <Paragraph>4. You can now withdraw your staked ETH.</Paragraph>
      <Panel>
        <div>
          <h3>
            Rewards left: ({toEther(jaguarAmount)}/{totalRewards})
          </h3>
          <ProgressBar value={toEther(jaguarAmount) / totalRewards} />
        </div>
        <div>
          <h3>Stake (ETH)</h3>
          <Input
            type="number"
            value={stakeValue}
            onChange={handleStakeChange}
            max={toEther(balances.eth)}
            min={0}
          />
          <ButtonGroup>
            <Button onClick={handleStake}>Stake</Button>
            <Button onClick={handleAddMaxStake}>Max</Button>
          </ButtonGroup>
        </div>
        <div>
          <h3>Your rewards (JAGUAR)</h3>
          <Input type="number" value={rewardsValue} disabled={true} />
          <ButtonGroup>
            <Button onClick={handleClaimRewards}>Claim</Button>
            <Button onClick={updateRewards}>Update</Button>
          </ButtonGroup>
        </div>
        <div>
          <h3>Staked (ETH)</h3>
          <Input
            type="number"
            value={withdrawValue}
            onChange={handleWithdrawChange}
            max={stakedValue}
          />
          <ButtonGroup>
            <Button onClick={handleWithdrawal}>Withdraw</Button>
            <Button onClick={handleAddMaxWithdraw}>Max</Button>
          </ButtonGroup>
        </div>
      </Panel>
    </div>
  );
};

export default StakingPage;
