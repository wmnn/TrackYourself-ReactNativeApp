import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native'
import {useNavigation} from '@react-navigation/native';

function DrawerIcon() {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row justify-between items-center w-full">
          <View />
          <Icon name="menu-outline" color="#1c1917" size={48} onPress={() => navigation.toggleDrawer()} className=""/>
    </View>
  )
}

export default DrawerIcon