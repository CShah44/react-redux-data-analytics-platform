
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Dashboard from '@/components/Dashboard/Dashboard';

const Index = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default Index;
