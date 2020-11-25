import React, { ReactElement, useEffect, useState } from 'react';

import { Container } from './styles';

type icons = 'jaguar' | 'jaguar-black' | 'eth';

interface IProps {
  icon: icons;
}

interface ImageModule {
  default?: string;
}

const Icons = ({ icon }: IProps): ReactElement => {
  const [asset, setAsset] = useState({} as ImageModule);
  useEffect(() => {
    (async () => {
      const image: ImageModule = await import(`../../Assets/${icon}.svg`);
      setAsset(image);
    })();
  }, []);
  return <Container src={asset.default} />;
};

export default Icons;
