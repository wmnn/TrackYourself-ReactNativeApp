import {createDrawerNavigator} from '@react-navigation/drawer';
import { Settings, Logout } from './screens';
import BottomTabNavigator from './BottomTabNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';


const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName={"BottomTabNavigator"}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#369623",
        drawerActiveTintColor: "#FFF",
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: '#fff1e0',
        }
      }}>
      <Drawer.Screen 
          name={"BottomTabNavigator"} 
          component={BottomTabNavigator} 
          options={{
            drawerItemStyle: { height: 0 },
          //   drawerIcon: ({focused, size}) => (
          //     <Ionicons name="md-checkmark-circle" size={32} color="green" />
          //  ),
          }}
         
      />
      <Drawer.Screen 
          name={"Home"} 
          component={BottomTabNavigator}  
      />
      <Drawer.Screen name={"Settings"} component={Settings}/>
      <Drawer.Screen name={"Logout"} component={Logout}/>
    </Drawer.Navigator>
  );
}

export default DrawerStack;