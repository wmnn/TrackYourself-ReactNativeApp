import React, {useContext, useState} from 'react'
import {SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, Button, Platform, ActivityIndicator} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import UserContext from '../../UserContext.js';


function MapWeights() {
    const {userContext, setUserContext} = useContext(UserContext);
    const [loadingIcon, setLoadingIcon] = useState(false)

    async function handleDelete({weight}){
        setLoadingIcon((prev) => !prev)
    
        //DELETE REQUEST
        await fetch(`http://localhost:8000/api/weights`, {
               method: 'DELETE',
               credentials: 'include', 
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({
                 _id: weight._id,
                 date: weight.date
               }),
        }).then(res => {
          return res.json()    
        }).then(res => {
          if(res.status === 200){
            
            const filteredWeights = userContext.weights.filter(singleWeight => singleWeight.date != weight.date)
            
            setUserContext((prev) => {
                return {
                    ...prev, 
                    weights:filteredWeights}
            })
            setLoadingIcon((prev) => !prev)
            
          }
        }).catch(error => console.error('Error:', error));
    
        
    }

  return (
    <ScrollView>
        {loadingIcon ? <View className="absolute m-auto w-[100%] mt-[30%] justify-center items-center">
            <ActivityIndicator size="large" color="#000"/>
        </View>: ""}

          {userContext ? userContext.weights.length > 0 ? <View>
                <View className='flex flex-row justify-around'>
                  <Text className='basis-0 grow text-center'>Datum</Text>
                  <Text className='basis-0 grow text-center'>Gewicht</Text>
                  <Text className='basis-0 grow text-center'>Löschen</Text>
                </View>    
               
          </View>: "" : ""}

          {userContext? userContext.weights.length > 0 ? userContext.weights.map((weight, index) => {
                      return (
                        <View key={index} index={weight._id} className='flex flex-row items-center justify-around'>
                          <Text className='basis-0 grow text-center'>{weight.date === null? "" : weight.date.slice(8,10) + "." + weight.date.slice(5,7)}</Text>
                          <Text className='basis-0 grow text-center'>{weight.weight} kg</Text>
                          
                          <TouchableOpacity onPress={(props) => handleDelete({weight})} className='basis-0 grow flex items-center'>
                              <Icon size={36} color="#BA1000" name="close-outline"/>
                          </TouchableOpacity>
                        
                        </View>
                      )
              }).reverse() : "" : ""
          }
          
    </ScrollView>
  )
}

export default MapWeights