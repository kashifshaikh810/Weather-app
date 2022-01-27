import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './components/redux/Store';
import StackNavigation from './components/Screens/StackNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#00aaff" />
      <StackNavigation />
    </Provider>
  );
};

export default App;
