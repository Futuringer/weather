import React from 'react';
import { ThemeProvider } from '../utils/contexts/ThemeContexts';
import { ChartBlock } from '../components/ChartBlock/ChartBlock';

const MainPage = () => {
  return (
    <ThemeProvider>
      <ChartBlock />
    </ThemeProvider>
  );
};

export default MainPage;
