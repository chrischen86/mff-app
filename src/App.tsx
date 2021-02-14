import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './components/HomePage';
import FilterProvider from './context/filterContext';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <HomePage />
        </FilterProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
