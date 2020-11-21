import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import Web3 from 'web3';

const HomePage: React.FC = () => {
  const web3Enabled = useSelector((x: RootStateOrAny) => x.web3Enabled);
  const web3: Web3 = useSelector((x: RootStateOrAny) => x.web3);

  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    if (!web3Enabled) return;
    (async () => {
      const number = await web3.eth.getBlockNumber();
      setCurrentBlock(number);

    })();
  }, [web3Enabled]);

  return <div>{currentBlock}</div>;
};

export default HomePage;
