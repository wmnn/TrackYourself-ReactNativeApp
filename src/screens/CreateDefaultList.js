import React, {useState, useContext} from 'react'
import {SafeAreaView,View, ScrollView, Text, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../UserContext.js';

var ÜbungenArr = [
  {
    id: 'b0906abb-d8e7-4560-9684-6a906590dabc',
    exercise: "Cardio",
    checked: false
  },
  {
    id: '8d4d420e-0297-426d-99d6-0c67a18c58d4',
    exercise: "Cardio",
    checked: false
  },
  {
    id: '27c7b995-1101-412f-ac94-4dd4b12eb50a',
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: 'b518c890-2e0e-482e-87d4-ec9782c1b13f',
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: '3d395185-26ad-4b84-b23f-1de5eccd2bee',
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: '141c165c-8f21-4f22-9e9b-816d9648f3b0',
    exercise: "Dehnen",
    checked: false
  },
  {
    id: '8444cb01-aa59-4b06-a36b-87da7ff06802',
    exercise: "Dehnen",
    checked: false
  },

]

function CreateDefaultList({navigation}) {
    const[loadingIcon, setLoadingIcon] = useState(false)
    const [defaultList, setDefaultList] = useState(ÜbungenArr)
    const [newExercise, setNewExercise] = useState("");
    const {userContext, setUserContext} = useContext(UserContext);

    function handleAdd(){

        setDefaultList((prev) => [...prev, {
          exercise: newExercise,
          checked: false,
          id: uuid.v4()/*defaultList.length+1*/
        }])
        setNewExercise("");
        
        console.log(defaultList)
    }

    async function handleDelete(Übung){
        //console.log(uuid.v4())
        console.log(Übung)
        const newData = defaultList.filter( (item) => item.id !== Übung.id); 
        setDefaultList(newData);
    }

    async function handleSubmit(){
        const token = await AsyncStorage.getItem("x-auth-token")
        
        await fetch(`http://localhost:8000/api/defaultworkoutlist`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                defaultWorkoutList: defaultList,
                'x-auth-token': token   
            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
                console.log(res)
                setUserContext((prev) => {return ({...prev, defaultWorkoutList: defaultList})})
                navigation.navigate("DrawerStack", {screen: "BottomTabNavigator"})
            }else{
              console.log(res)
            }
        }).catch();

    }
  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
        <View className="flex flex-col md:flex-row">
            <Text className="text-2xl mx-[10%] my-5">Welche Übungen willst du wöchentlich machen?</Text>

            <ScrollView>
          
            {/* Mapping default Exercises*/}
            {defaultList ? defaultList.map((Übung, index) => {
                return (
                    <View className="flex flex-row justify-between items-center border-[1px] border-stone-900 w-[80%] ml-[10%] rounded mb-4 py-1" key={index}>
                        <Text className="text-4xl ml-2 text-stone-900">{Übung.exercise}</Text>
                        
                        <TouchableOpacity onPress={() => handleDelete(Übung)} >
                            <Icon size={36} color="#BA1000" name="close-outline"/>
                        </TouchableOpacity>
                    </View>
                )
            }): ""}

          {/* Add a costum exercise, if addExecise is true the field transforms into a text input */}
          
            
            <View className="flex flex-row items-center border-[1px] border-stone-400 w-[80%] ml-[10%] rounded mb-4">

                <View className="border-l-[1px] h-8 border-stone-400 mr-2">
                <Text className="text-2xl w-0 border-l-[1px] border-black"></Text>
                </View>

                <View className="basis-0 grow flex">
                <TextInput className=" bg-[#fff1e0] rounded h-12 text-4xl text-stone-900 border-stone-400" placeholder='Übung' onChangeText={(newNewExercise) => setNewExercise(newNewExercise)} defaultValue={newExercise}></TextInput>
                </View>
                
                <TouchableOpacity className="border-l-[1px] border-stone-400 px-4" onPress={() => handleAdd()}>
                    <Icon name="add-outline" size={36} color={"#a8a29e"}/>
                </TouchableOpacity>

                
            </View> 

            {/* -- SAVE BUTTON --*/}
            <View className="mx-[10%] mb-20">
                <TouchableOpacity className="border-[1px] rounded mt-2 h-12 w-full bg-[#369623] mb-2 flex justify-center items-center" onPress={() => handleSubmit()}>
                    {loadingIcon ? <ActivityIndicator size="large" color="#FFF"  /> : <Text className='text-white text-2xl'>Speichern</Text>}
                </TouchableOpacity>
            </View>
                

            </ScrollView>
            
            
            
        </View>
        
    </SafeAreaView>
  )
}

export default CreateDefaultList