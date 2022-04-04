import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage';
import FilterProvider from './context/filterContext';
import MetadataProvider from './context/metadataContext';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { HashRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <MetadataProvider>
            <FilterProvider>
              <ThemeProvider theme={theme}>
                <HomePage />
              </ThemeProvider>
            </FilterProvider>
          </MetadataProvider>
        </QueryClientProvider>
      </HashRouter>
    </>
  );
};

export default App;
