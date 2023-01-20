import React, {useEffect, useState, useContext} from 'react'
import {SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../../UserContext.js';
import uuid from 'react-native-uuid';

function MapÜbungen({navigation}) {
  const [ÜbungenList, setÜbungenList] = useState([]);

  const [week, setWeek] = useState("");
  const [year, setYear] = useState("");
  const [addExercise, setAddExercise] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const {userContext, setUserContext} = useContext(UserContext);
  const[loadingIcon, setLoadingIcon] = useState(false)

  async function handleCheck(Übung){
    console.log(Übung)
    const token = await AsyncStorage.getItem("x-auth-token")
    setLoadingIcon((prev) => !prev)

    const newArr = ÜbungenList.map(object => {
      if(object.id === Übung.id){
        return{ ...object, checked: !object.checked} //changed the value here
      }else{
        return object
      }
    })
    await fetch(`http://localhost:8000/api/workoutlist`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'x-auth-token': token,
              week: week,
              year: year,
              exercises: newArr
            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
              setÜbungenList(newArr);

              mappedList = userContext.workoutsList.map(object => {
                if(object.year === year && object.week === week){
                  return{ ...object, exercises: newArr} //changed the value here
                }else{
                  return object
                }
              })
              setUserContext((prev) => {return {...prev, workoutsList: mappedList}})
              setLoadingIcon((prev) => !prev)
            }else{
              console.log(res)
            }
    }).catch();
   
  }
  async function handleDelete(Übung){
    setLoadingIcon((prev) => !prev)
    //console.log(uuid.v4())
    const token = await AsyncStorage.getItem("x-auth-token")
    const newData = ÜbungenList.filter( (item) => item.id !== Übung.id); 

    await fetch(`http://localhost:8000/api/workoutlist`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'x-auth-token': token,
              week: week,
              year: year,
              exercises: newData
            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
              mappedList = userContext.workoutsList.map(object => {
                if(object.year === year && object.week === week){
                  return{ ...object, exercises: newData} //changed the value here
                }else{
                  return object
                }
              })
              
              setUserContext((prev) => {return {...prev, workoutsList: mappedList}})
              setÜbungenList(newData);
              setLoadingIcon((prev) => !prev)
                      
            }else{
              console.log(res)
            }
    }).catch();
    
    

      
  }
  function changeView(){
      setAddExercise((prev) => !prev)
      //console.log(ÜbungenList)
  }
  async function handleAdd(){
    setLoadingIcon((prev) => !prev)
    const token = await AsyncStorage.getItem("x-auth-token")
    //const newData = ÜbungenList.filter( (item) => item.id !== Übung.id); 

    const obj = {
      exercise: newExercise,
      checked: false,
      id: uuid.v4()
    }

    await fetch(`http://localhost:8000/api/workoutlist/newexercise`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'x-auth-token': token,
              week: week,
              year: year,
              exercise: obj
            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
              setÜbungenList((prev) => { return ([...prev, obj])});
              setLoadingIcon((prev) => !prev)
              setNewExercise("");
              setAddExercise((prev) => !prev)
            }else{
              console.log(res)
            }
    }).catch();
      
  }
  useEffect(() => {
    async function handleÜbungen(){
      
      var user = userContext;
      
      !user.workoutsList ? user.workoutsList = [] : ""
      
      
      const year = new Date().getFullYear()
      setYear(year);
      var days = Math.floor((new Date() - new Date(year, 0, 1)) / (24 * 60 * 60 * 1000));
      var week = Math.ceil(days / 7);
      setWeek(week);

      const workoutThisWeek = user.workoutsList.find(o => o.year === year && o.week === week);
      //console.log(" Hallo " + JSON.stringify(user) + "\n\n" + JSON.stringify(user.workoutsList) + " \n\n " + JSON.stringify(workoutThisWeek))
  
      if(!workoutThisWeek){
        user.workoutsList.push({
          year: year, 
          week: week,
          exercises: user.defaultWorkoutList
        })
        //console.log(JSON.stringify(user.workoutsList))
        createWeekRequest(user.defaultWorkoutList);
        setÜbungenList(user.defaultWorkoutList)
        setUserContext(user);   
        //console.log("LE")
      }else{
        //console.log("EL")
        setÜbungenList(workoutThisWeek.exercises);
      }  
    }
    async function createWeekRequest(defaultWorkoutList){
      setLoadingIcon((prev) => !prev)
      const token = await AsyncStorage.getItem("x-auth-token")
      const year = new Date().getFullYear()
      var days = Math.floor((new Date() - new Date(year, 0, 1)) / (24 * 60 * 60 * 1000));
      var week = Math.ceil(days / 7);
      await fetch(`http://localhost:8000/api/workoutlist/createweek`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'x-auth-token': token,
              defaultWorkoutList: defaultWorkoutList,
              year: year,
              week: week

            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
              setLoadingIcon((prev) => !prev)
            }else{
              console.log(res)
            }
    }).catch();

    }
    handleÜbungen();
    
  
  },[])
  return (
        <ScrollView>
          <Text className="ml-[10%] text-3xl ">KW {week}</Text>
          {/* <Text>{JSON.stringify(ÜbungenList)}</Text> */}
          {/* Mapping all planned exercises*/}
          {loadingIcon ? <View className="absolute h-full w-full items-center justify-center">
                <ActivityIndicator className="absolute "size="large" color="#000"/>
          </View>: ""}
          {
              ÜbungenList ? ÜbungenList.length > 0 ? ÜbungenList.map((Übung, index) => {

                return(
                  <View className="flex flex-row justify-between items-center border-[1px] border-stone-900 w-[80%] ml-[10%] rounded mb-4 py-1"  key={index}>
                    <TouchableOpacity onPress={() => handleCheck(Übung)} className="flex flex-row">
                      <Checkbox
                      className="mx-2 p-4 rounded"
                      value={Übung.checked}
                      onValueChange={() => handleCheck(Übung)}
                      color={Übung.checked ? '#369623' : undefined}
                      />
                      <Text className="text-4xl ml-2 text-stone-900">{Übung.exercise}</Text>
                    </TouchableOpacity>
                    
                    
                    <TouchableOpacity onPress={() => handleDelete(Übung)} >
                            <Icon size={36} color="#BA1000" name="close-outline"/>
                    </TouchableOpacity>
                  </View>

                )

              }) :"" :""

          }
          {/* {ÜbungenList ? ÜbungenList.map((Übung, index) => {
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
          } */}
          {/* Add a costum exercise */}
          { 
          
          addExercise === false ? <TouchableOpacity className="flex flex-row items-center border-[1px] border-stone-400 w-[80%] ml-[10%] rounded mb-4" onPress={() => changeView()}>
            <View className="mx-2 py-1 mr-4 pr-[2px]">
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
              <TextInput className=" bg-[#fff1e0] rounded h-12 text-4xl text-stone-900 border-stone-400" placeholder='Klick mich' onChangeText={(newNewExercise) => setNewExercise(newNewExercise)} defaultValue={newExercise}></TextInput>
            </View>

            {/* <View className="border-l-[1px] h-8 border-stone-400 ">
              <Text className="text-2xl w-0 border-l-[1px] border-black"></Text>
            </View> */}

            {/* <TouchableOpacity className="mx-2 py-1" onPress={() => handleAdd()}>
              <Icon name="add-outline" size={36} color={"#a8a29e"}/>
            </TouchableOpacity> */}
            
  
          </View> 
          }

          {/* Show a filter*/}

        </ScrollView>
   
  )
}

export default MapÜbungen