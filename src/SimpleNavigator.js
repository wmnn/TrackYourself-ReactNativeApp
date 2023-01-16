import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Register} from './screens'

const Tab = createBottomTabNavigator();

function SimpleNavigator() {
  return (
    <Tab.Navigator 
        screenOptions={{}}
        initialRouteName={Home}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}
export default SimpleNavigator

//CHANGE TAP TO SCREEN AND STACK NAVIGATOR