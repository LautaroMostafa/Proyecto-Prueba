import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../screens/LoginView';
import RegisterView from '../screens/RegisterView';

const Stack = createStackNavigator();

const AuthStack = ({ checkAuthentication }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {props => <LoginView {...props} checkAuthentication={checkAuthentication} />}
      </Stack.Screen>
      <Stack.Screen name="Register" component={RegisterView} />
    </Stack.Navigator>
  );
};

export default AuthStack;
