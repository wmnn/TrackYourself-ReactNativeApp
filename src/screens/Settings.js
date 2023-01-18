import React from 'react'
import {SafeAreaView, Text} from 'react-native'
import DrawerIcon from '../components/DrawerIcon'

function Settings() {
  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
      <DrawerIcon />
      <Text className="text-stone-900 font-bold text-xl">Settings</Text>
    </SafeAreaView>
  )
}

export default Settings