import React, {useEffect, useState, useContext} from 'react'
import {SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import UserContext from '../../UserContext.js';

import DateTimePicker from '@react-native-community/datetimepicker';

function AddWeights() {
    const {userContext, setUserContext} = useContext(UserContext);
    const [weight, setWeight] = useState("")

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(true);

    const[loadingIcon, setLoadingIcon] = useState(false)

    const onChange = (event, newDate) => {
        setDate(newDate);
    };

    async function handleSubmit() {
        setLoadingIcon((prev) => !prev)
        const tmpDate = date.toISOString().substring(0, 10)
        //console.log("tmpDate=" + tmpDate)
        
        await fetch("http://localhost:8000/api/weights", {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: tmpDate,
            weight: weight
          }),
        }).then( res => { 
          return res.json() 
        }).then( res => {
          if(res.status === 200){
            // props.setWeights( (prev) => [...prev, {date: date, weight: weight}] );
            setUserContext((prev) => {
              return {
                ...prev,
                weights: [...prev.weights, {date: tmpDate, weight: weight}]
              }
            })
    
            setDate(() => new Date());
            setWeight("");
            setLoadingIcon((prev) => !prev)
          }else if(res.status === 400){
            alert("Date already exists.")
            setWeight("");
            setLoadingIcon((prev) => !prev)
          }
        }).catch(error => console.error('Error:', error));
    
    }
  return (
    <View className="flex flex-col md:flex-row w-[80%] mx-[10%]">
                {/* <Text className="text-2xl">Datum: </Text> */}
                {show && <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={'date'}
                      display="spinner"
                      onChange={onChange}
                />}
                <View>
                  <Text className="text-2xl">Gewicht: </Text>
                  <TextInput 
                    className=" bg-[#fff1e0] mt-2 rounded h-12 w-full text-stone-900 text-4xl border-[1px] border-stone-400 " 
                    keyboardType="numeric"
                    name="weight" 
                    placeholder='Gewicht in kg' 
                    onChangeText={(newWeight) => setWeight(newWeight)} 
                    defaultValue={weight} />
                  <TouchableOpacity className="border-[1px] rounded mt-2 h-12 w-full bg-[#369623] mb-2 flex justify-center items-center" onPress={() => handleSubmit()}>
                    {loadingIcon ? <ActivityIndicator size="large" color="#FFF"  /> : <Text className='text-white text-2xl'>Gewicht hinzufügen</Text>}
                  </TouchableOpacity>    
                </View>
                    
    </View>
  )
}

export default AddWeights