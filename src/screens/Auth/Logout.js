import React, { useEffect } from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logout({navigation}) {

    useEffect(() => {
        const handleLogout = async () => {
          const asyncStorageKeys = await AsyncStorage.getAllKeys();
          if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
              await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
              await AsyncStorage.multiRemove(asyncStorageKeys);
            }
          }
            //await AsyncStorage.clear();
        }
        handleLogout();
        //navigation.goBack();
        navigation.navigate("Login", { screen:"LoginStack" })
    },[])
  return (
    <View></View>
  )
}

export default Logout