import React from 'react'
import {SafeAreaView, Text, View} from 'react-native'
import DrawerIcon from '../components/DrawerIcon'

function Settings() {
  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
      <DrawerIcon />

      <View className="mx-[10%]">
        <Text className="text-stone-900 font-bold text-xl">Settings</Text>
      </View>
      
    </SafeAreaView>
  )
}

export default Settings