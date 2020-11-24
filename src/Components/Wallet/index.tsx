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
  const kseedToken: Contract = useSelector((x: RootStateOrAny) => x.kseedToken);
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
    if (kseedToken.methods && jaguarToken.methods) {
      (async () => {
        const kseed = await kseedToken.methods.balanceOf(accounts[0]).call();
        const jaguar = await jaguarToken.methods.balanceOf(accounts[0]).call();
        dispatch({ type: 'SET_BALANCES', balances: { kseed, jaguar } });
        setLoading(false);
      })();
    }
  }, [kseedToken.methods]);

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
                <Icons icon="kseed" /> {parseAmount(balances.kseed)}
              </span>
            </>
          )}
        </Center>
      </Container>
    </WarningContainer>
  );
};

export default Wallet;
