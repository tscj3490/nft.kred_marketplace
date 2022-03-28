import React from 'react';
import { Provider } from 'react-redux'
import { MyRouts } from './routers/routes'
import store from './store';

export const App = () => {
  
  return (
    <Provider store={store}>
      <MyRouts />
    </Provider>
  );
}
