import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, CreateDefaultList} from './screens'
import DrawerStack from './DrawerStack.js';

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator 
          screenOptions={{
            headerShown: false,            
          }} 
          /*initialRouteName={Login}*/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateDefaultList" component={CreateDefaultList} />
      <Stack.Screen name="DrawerStack" component={DrawerStack} />
    </Stack.Navigator>
  );
}
export default LoginStack