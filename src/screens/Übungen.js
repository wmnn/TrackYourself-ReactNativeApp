import React from 'react'
import MapÜbungen from '../components/Übungen/MapÜbungen'
import {View, SafeAreaView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


function Übungen({navigation}) {
  return (

      <SafeAreaView className="bg-[#fff1e0] h-full">
          <View className="flex flex-row justify-between items-center w-full">
              <View/>
              <Icon name="menu-outline" color="#1c1917" size={48} onPress={() => navigation.toggleDrawer()} className=""/>
          </View>
          <MapÜbungen />
      </SafeAreaView>
  
  )
}

export default Übungen