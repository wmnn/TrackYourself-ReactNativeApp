import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Weights, Kalorien, Übungen } from './screens'
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
          headerShown:false,
          tabBarIcon: ({color, size, focused}) => {
            let iconName;

            if (route.name === 'Gewicht') {
                iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            } else if (route.name === "Kalorien") {
                iconName = focused ? 'restaurant-outline' : 'restaurant-outline';
            } else if (route.name === "Übungen") {
              iconName = focused ? 'barbell-outline' : 'barbell-outline';
            }

            return <Icon name={iconName} size={22} color={color} />;
          }
          
          })}>
      <Tab.Screen name="Gewicht" component={Weights} />
      <Tab.Screen name="Kalorien" component={Kalorien} />
      <Tab.Screen name="Übungen" component={Übungen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator