import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './HomePage';
import FilterProvider from '../context/filterContext';
import MetadataProvider from '../context/metadataContext';
import theme from '../theme';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MetadataProvider>
          <FilterProvider>
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          </FilterProvider>
        </MetadataProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
