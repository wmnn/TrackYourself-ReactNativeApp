import React, {useState} from 'react'
import {SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native'
import DrawerIcon from '../components/DrawerIcon'
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';

var ÜbungenArr = [
  {
    id: 1,
    exercise: "Dehnen",
    checked: false
  },
  {
    id: 2,
    exercise: "Dehnen",
    checked: false
  },
  {
    id: 3,
    exercise: "Dehnen",
    checked: false
  },
  {
    id: 4,
    exercise: "Cardio",
    checked: false
  },
  {
    id: 5,
    exercise: "Cardio",
    checked: false
  },
  {
    id: 6,
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: 7,
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: 8,
    exercise: "Krafttraining",
    checked: false
  },
  {
    id: 9,
    exercise: "Cardio",
    checked: false
  },
  {
    id: 10,
    exercise: "Cardio",
    checked: false
  },
]

function Übungen({navigation}) {
  const [ÜbungenList, setÜbungenList] = useState(ÜbungenArr);
  const [addExercise, setAddExercise] = useState(false);
  const [newExercise, setNewExercise] = useState("");

  function handleCheck(Übung){
    console.log(Übung)
    const id = Übung.id
    const newArr = ÜbungenList.map(object => {
      if(object.id === id){
        return{ ...object, checked: !object.checked} //changed the value here
      }else{
        return object
      }
    })
    setÜbungenList(newArr);
  }
  function changeView(){
      setAddExercise((prev) => !prev)
      console.log(ÜbungenList)

  }
  function handleAdd(){

      setÜbungenList((prev) => [...prev, {
        exercise: newExercise,
        checked: false,
        id: ÜbungenList.length+1
      }])
      setNewExercise("");
      setAddExercise((prev) => !prev)
  }

  

  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
          <View className="flex flex-row justify-between items-center w-full">
              <View/>
              <Icon name="menu-outline" color="#1c1917" size={48} onPress={() => navigation.toggleDrawer()} className=""/>
        </View>

        <ScrollView>
          <Text className="ml-[10%] text-3xl ">Woche XX</Text>
          {/* Mapping all planned exercises*/}
          {ÜbungenList ? ÜbungenList.map((Übung, index) => {
              return (
                <TouchableOpacity className="flex flex-row items-center border-[1px] border-stone-900 w-[80%] ml-[10%] rounded mb-4 py-1" onPress={() => handleCheck(Übung)} key={index}>
                  <Checkbox
                    className="mx-2 p-4 rounded"
                    value={Übung.checked}
                    onValueChange={() => handleCheck(Übung)}
                    color={Übung.checked ? '#369623' : undefined}
                  />
                  <Text className="text-4xl ml-2 text-stone-900">{Übung.exercise}</Text>
                </TouchableOpacity>
              )
              })
           : ""
          }
          {/* Add a costum exercise */}
          { addExercise === false ? <TouchableOpacity className="flex flex-row items-center border-[1px] border-stone-400 w-[80%] ml-[10%] rounded mb-4" onPress={() => changeView()}>
            <View className="mx-2 py-1">
              <Icon name="add-outline" size={36} color={"#a8a29e"}/>
            </View>
            <Text className="text-4xl text-stone-400">Übung</Text>
            

          </TouchableOpacity> 
          : 
          <View className="flex flex-row items-center border-[1px] border-stone-400 w-[80%] ml-[10%] rounded mb-4">
            <TouchableOpacity className="mx-2 py-1" onPress={() => handleAdd()}>
              <Icon name="add-outline" size={36} color={"#a8a29e"}/>
            </TouchableOpacity>

            <View className="border-l-[1px] h-8 border-stone-400 mr-2">
              <Text className="text-2xl w-0 border-l-[1px] border-black"></Text>
            </View>

            <View className="basis-0 grow flex">
              <TextInput className=" bg-[#fff1e0] rounded h-12 text-4xl text-stone-900 border-stone-400" placeholder='Type to add' onChangeText={(newNewExercise) => setNewExercise(newNewExercise)} defaultValue={newExercise}></TextInput>
            </View>
            
            <TouchableOpacity className="border-l-[1px] border-stone-400" onPress={() => handleAdd()}>
              <Text className="text-4xl mx-2 text-stone-400">Add</Text>
            </TouchableOpacity>
          </View> 
          }

          {/* Show a filter*/}

        </ScrollView>
    </SafeAreaView>
  )
}

export default Übungen