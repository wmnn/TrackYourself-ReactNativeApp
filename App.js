import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/StackNavigator.js'
import BottomTabsNavigator from './src/BottomTabsNavigator'

export default function App() {
  return (
    


    
    <NavigationContainer>
      <BottomTabsNavigator />
      {/* <StackNavigator /> */}
    </NavigationContainer>

  );
}