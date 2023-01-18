import React, {useState, useContext} from 'react'
import {SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import UserContext from '../../UserContext.js';

import DateTimePicker from '@react-native-community/datetimepicker';

function AddKalorien() {
    const {userContext, setUserContext} = useContext(UserContext);
    const[loadingIcon, setLoadingIcon] = useState(false)

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true);
    const onChange = (event, newDate) => {
        setDate(newDate);
    };

    const [mahlzeit, setMahlzeit] = useState(
        { mahlzeit: "", gewicht: "", kalorien:""}
    );

    function handleChange(newVal, eventTargetName) { //updating single workout state
        const value = newVal
        const name= eventTargetName
        var eventName = eventTargetName
    
        if(eventName === "mahlzeit"){
          setMahlzeit((prev) => {
            return {...prev, [name]: value.replace(/[^a-zA-zäöüÄÖÜß 1-9]/, "")}
          }
          );
        }else if( eventName === "gewicht"){
          setMahlzeit((prev) => {
            return {...prev, [name]: value.replace(/[^0-9]/,"")}
          }
          );
        }else if( eventName === "kalorien"){
          setMahlzeit((prev) => {
            return {...prev, [name]: value.replace(/[^0-9]/,"")}
          }
          );
        }
    }
    async function handleSubmit(){
        setLoadingIcon((prev) => !prev)
        const tmpDate = date.toISOString().substring(0, 10)
        
        await fetch(`http://localhost:8000/api/mahlzeit`, {
                method: 'POST',
                credentials: 'include', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                  {
                    date: tmpDate + "T00:00:00.000Z",
                    mahlzeit: {
                      mahlzeit: mahlzeit.mahlzeit,
                      gewicht: Number(mahlzeit.gewicht),
                      kalorien: Number(mahlzeit.kalorien),
                      
                    }
                  }
                ),
        }).then(res => {
          return res.json()    
        }).then(res => {
          if(res.status === 200){
    
            setUserContext((prev) => {
                return {
                    ...prev,
                    kalorien: handleAdding(userContext.kalorien)
                }
            })
            //RESET INPUTS
            setMahlzeit({
              mahlzeit: "",
              gewicht: "",
              kalorien: "",
            })
            setLoadingIcon((prev) => !prev)
          }else{
            
          }
        }).catch(/*error => console.error('Error:', error)*/);
    }
    function handleAdding(kalorienArray){
        //console.log(workoutsArray)
        const tmpDate = date.toISOString().substring(0, 10);
        let obj = kalorienArray.find(o => o.date === tmpDate + "T00:00:00.000Z")
        if(obj){
          console.log("Date found, added to the object.")
       
          const mappedKalorien = kalorienArray.map(object => {
            if(object.date === tmpDate + "T00:00:00.000Z"){
              return{ 
                ...object, 
                mahlzeiten: [...object.mahlzeiten, mahlzeit]
                } 
            }else{
              return object
            }
          }
        )
        return mappedKalorien;
    
        }else{
          console.log("No date found, created a new one.")
          return [...kalorienArray, {
            date: tmpDate + "T00:00:00.000Z",
            mahlzeiten: [{
              mahlzeit: mahlzeit.mahlzeit,
              gewicht: Number(mahlzeit.gewicht),
              kalorien: Number(mahlzeit.kalorien),
              
            }]
          }]
        }
      
    }
  return (
    <View>
                  {/* <Text className="text-2xl">Datum: </Text> */}
                  {show && <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'date'}
                        display="spinner"
                        onChange={onChange}
                  />}

                  
                  <Text className="mt-2 text-2xl">Mahlzeit: </Text>
                  <TextInput 
                    className=" bg-[#fff1e0] mt-2 rounded h-12 text-2xl w-full text-stone-900 border-[1px] border-stone-400 text-l" 
                    placeholder='Mahlzeit' 
                    onChangeText={(newMahlzeit) => {handleChange(newMahlzeit, "mahlzeit")}} 
                    defaultValue={mahlzeit.mahlzeit} 
                  />
                  <Text className="mt-2 text-2xl">Menge: </Text>
                  <TextInput 
                    className=" bg-[#fff1e0] mt-2 rounded h-12 text-2xl w-full text-stone-900 border-[1px] border-stone-400 text-l" 
                    keyboardType="numeric"
                    placeholder='Gewicht in Gramm' 
                    onChangeText={(newMenge) => {handleChange(newMenge, "gewicht")}} 
                    defaultValue={mahlzeit.gewicht} 
                  />
                  <Text className="mt-2 text-2xl">Kalorien: </Text>
                  <TextInput 
                    className=" bg-[#fff1e0] mt-2 rounded h-12 text-2xl w-full text-stone-900 border-[1px] border-stone-400 text-l" 
                    keyboardType="numeric"
                    placeholder='Kalorien in kcal' 
                    onChangeText={(newKalorien) => {handleChange(newKalorien, "kalorien")}} 
                    defaultValue={mahlzeit.kalorien} 
                  />

                  <TouchableOpacity className="border-[1px] rounded mt-2 h-12 w-full bg-[#369623] mb-2 flex justify-center items-center" onPress={() => handleSubmit()}>
                  {loadingIcon ? <ActivityIndicator size="large" color="#FFF"  /> : <Text className='text-white text-2xl'>Mahlzeit hinzufügen</Text>}
                  </TouchableOpacity>    
                </View>  
  )
}

export default AddKalorien