import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home, Register} from './screens'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator 
        // tabBar={props => <CustomTabBar {...props} />}
        screenOptions={({route}) => ({  //pass in the route
            headerShown: false, //HEADER
            // tabBarShowLabel: false, //hides all label
            // tabBarInactiveTintColor: '#AEB, //das ist die Farbe wenn ein Icon ausgewählt wurde
            // tabBarStyle: styles.tabBarStyle,
            // tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({color, size, focused}) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                } else if (route.name === "Register") {
                    iconName = focused ? 'settings' : 'settings-outline';
                }
                //  else if (route.name === "") {
                //     iconName = focused ? 'wallet' : 'wallet-outline';
                // } else if (route.name === "") {
                //     iconName = focused? 'md-notifications-sharp': 'md-notifications-outline';
                // }


                return <Icon name={iconName} size={22} color={color} />;
            },
        })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}
export default BottomTabsNavigator