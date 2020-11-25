import React from 'react';

import { PanelContainer } from './styles';

const Panel: React.FC = ({ children }) => {
  return <PanelContainer children={children} />;
};

export default Panel;
