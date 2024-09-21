import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import MainNavigator from './src/navigator/MainNavigator';



export default function App() {
  return (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
  );
}
