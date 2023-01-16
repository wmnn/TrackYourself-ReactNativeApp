import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home.js'
import Register from './screens/Register.js'

const Stack = createStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator 
          screenOptions={{
            headerStyle:{
              backgroundColor:'#FFF'
            },
            headerTintColor:'#000',
            // headerBackTitle: 'Back',
            // headerBackTitleVisible: false
            
          }} 
          initialRouteName={Home}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
export default Navigator