import React, {useEffect, useContext, useState} from 'react'
import UserContext from '../../UserContext';
import {View, Text, TouchableOpacity, ActivityIndicator, Button} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


function MapKalorien() {
    const {userContext, setUserContext} = useContext(UserContext);
    const [loadingIcon, setLoadingIcon] = useState(false)

    function handleFilter(kalorienArray, deletedMahlzeit, date){
        const tmpDate = date/*.toISOString().substring(0, 10);*/
        const mappedKalorien = kalorienArray.map(object => {
            
            if(object.date === tmpDate){
                const filteredMahlzeiten = object.mahlzeiten.filter(mahlzeit => {
                    return(
                    mahlzeit.mahlzeit !== deletedMahlzeit.mahlzeit 
                    | mahlzeit.gewicht !== deletedMahlzeit.gewicht 
                    | mahlzeit.kalorien !== deletedMahlzeit.kalorien 
                    )
                })
                return {
                    date: object.date,
                    _id: object._id,
                    mahlzeiten: filteredMahlzeiten
                }
            }else{
                return object
            }
        })
        return mappedKalorien;
    }

    async function handleDelete({mahlzeit}, date){
        setLoadingIcon((prev) => !prev)
        const token = await AsyncStorage.getItem("x-auth-token")
    
        //DELETE REQUEST
        await fetch(`http://localhost:8000/api/mahlzeit`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                mahlzeit: mahlzeit,
                date: date,
                'x-auth-token': token
            }),
        }).then(res => {
        return res.json()    
        }).then(res => {
        if(res.status === 200){

            const filteredKalorien = handleFilter(userContext.kalorien, mahlzeit, date)

            setUserContext((prev) => {
                return {
                    ...prev,
                    kalorien: filteredKalorien
                }
            })
            setLoadingIcon((prev) => !prev)
        }
        }).catch(error => console.error('Error:', error));
        
    }

  return (<>
    {loadingIcon ? <View className="absolute h-full w-full items-center justify-center">
                <ActivityIndicator className="absolute "size="large" color="#000"/>
    </View>: ""}
    <View className='text-red flex flex-col mt-2'>
            
            {
            userContext ? userContext.kalorien ? userContext.kalorien.length > 0 ? userContext.kalorien.map((tag, index) => {

                return (
                <View key={index}>
                        {/*Setting Headlines */}
                      {tag.mahlzeiten ? tag.mahlzeiten.length > 0 ? <View>

                        <View className="flex flex-row justify-between">
                            <Text className='font-extrabold'>{`${tag.date.slice(8,10)}.${tag.date.slice(5,7)}`}</Text>
                        </View>

                        <View className="flex flex-row justify-around">
                          <Text className='basis-0 grow-[0.8]'>Mahlzeit</Text>
                          <Text className='basis-0 grow-[0.8] text-center'>Menge</Text>
                          <Text className='basis-0 grow-[0.8] text-center'>Kalorien</Text>
                          <Text className='basis-0 grow-[0.7] text-right'>Löschen</Text>
                        </View>
                        

                        
                      </View>: "" : ""
                    }
                    {tag.mahlzeiten.map((mahlzeit, index)=>{

                        return (
                        <View key={index} className='flex flex-row justify-around items-center'>
                            <Text className='basis-0 grow-[0.8]'>{mahlzeit.mahlzeit}</Text>
                            <Text className='basis-0 grow-[0.8] text-center'>{mahlzeit.gewicht ? mahlzeit.gewicht + " g" : ""}</Text>
                            <Text className='basis-0 grow-[0.8] text-center'>{mahlzeit.kalorien ? mahlzeit.kalorien + " kcal" : ""}</Text>
                            <TouchableOpacity onPress={() => handleDelete({mahlzeit}, tag.date)} className='basis-0 grow-[0.7] flex flex-row items-center justify-around'>
                                <View className="pl-4">
                                    <Icon size={36} color="#BA1000" name="close-outline"/>
                                </View>
                    
                            </TouchableOpacity>
                        </View>
                        
                        )
                    })
                    
                    }
                    
                </View>
                )
                

            }): "" : "" : ""
        }
    
      
    </View>
    </>)
}

export default MapKalorien