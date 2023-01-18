import React, {useState} from 'react'
import {SafeAreaView, ScrollView} from 'react-native'
import DrawerIcon from '../components/DrawerIcon'
import AddKalorien from '../components/Kalorien/AddKalorien';
import MapKalorien from '../components/Kalorien/MapKalorien';

function Kalorien({navigation}) {

  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
      <DrawerIcon />

      <ScrollView className="flex flex-col md:flex-row w-full px-[10%]">
        <AddKalorien />  
        <MapKalorien />

            
                    
      </ScrollView>
    </SafeAreaView>
  )
}

export default Kalorien