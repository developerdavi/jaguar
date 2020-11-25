import React, { useEffect } from 'react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Home | Jaguars';
  }, []);
  return <div></div>;
};

export default HomePage;
