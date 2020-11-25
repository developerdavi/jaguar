import React, { ReactElement, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import Center from '../Center';
import Container from '../Container';
import Icons from '../Icons';

import { WarningContainer } from './styles';

const Wallet = (): ReactElement => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  /**
   * Contracts
   */
  const jaguarToken: Contract = useSelector(
    (x: RootStateOrAny) => x.jaguarToken
  );

  /**
   * Balances
   */
  const balances = useSelector((x: RootStateOrAny) => x.balances);

  /**
   * Miscellaneous
   */
  const web3: Web3 = useSelector((x: RootStateOrAny) => x.web3);
  const accounts = useSelector((x: RootStateOrAny) => x.accounts);

  const parseAmount = (amount: number) => {
    return Number.parseFloat(
      web3.utils.fromWei(String(amount))
    ).toLocaleString();
  };

  useEffect(() => {
    if (jaguarToken.methods) {
      (async () => {
        const jaguar = await jaguarToken.methods.balanceOf(accounts[0]).call();
        const eth = await web3.eth.getBalance(accounts[0]);
        dispatch({ type: 'SET_BALANCES', balances: { jaguar, eth } });
        setLoading(false);
      })();
    }
  }, [jaguarToken]);

  return (
    <WarningContainer>
      <Container>
        <Center>
          {loading ? (
            'Loading...'
          ) : (
            <>
              <span>
                <Icons icon="jaguar-black" /> {parseAmount(balances.jaguar)}
              </span>
              <span>
                <Icons icon="eth" /> {parseAmount(balances.eth)}
              </span>
            </>
          )}
        </Center>
      </Container>
    </WarningContainer>
  );
};

export default Wallet;
