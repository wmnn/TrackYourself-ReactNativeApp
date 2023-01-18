import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './src/LoginStack.js'
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import UserContext from './src/UserContext.js'

export default function App() {
  const [userContext, setUserContext] = useState(null)
  return (    
    <NavigationContainer>
      <UserContext.Provider value={{userContext, setUserContext}}>
        <LoginStack />
      </UserContext.Provider>
    </NavigationContainer>

  );
}