import React, {useEffect, useState, useContext} from 'react'
import { View, SafeAreaView , Text, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import UserContext from '../../UserContext.js';

function Login({navigation}) {
  const {userContext, setUserContext} = useContext(UserContext);
  
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const navgiateWeights = (res) => {
    console.log(res);
    setUserContext(res.user)
    
    navigation.navigate("DrawerStack", {screen: "BottomTabNavigator"})
  }

  const handlePress = async () => {
    await fetch(`http://localhost:8000/auth/login`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password   
            }),
        }).then(res => {
            return res.json()    
        }).then(res => {
            if(res.status === 200){
              
              setAsyncStorage("x-auth-token", res['x-auth-cookie'])
              navgiateWeights(res);
              
            }else{
              console.log(res)
            }
    }).catch();
  }
  const setAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(`${key}`, value)
    } catch (e) {
    }
  }

  
  
    useEffect(() => {
      async function handleToken(){
          const token = await AsyncStorage.getItem("x-auth-token")
          
          if(token){
            await fetch(`http://localhost:8000/auth/access`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'x-auth-token': token,  
                }),
            }).then(res => {
                return res.json()    
            }).then(res => {
                if(res.status === 200){
                  navgiateWeights(res);
                }else{
                  
                }
            }).catch();
          }
      }
      
      const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(`${key}`, value)
        } catch (e) {
          // saving error
        }
      }
      const getAllKeys = async () => {
        try {
          const data = await AsyncStorage.getAllKeys()
          if(data !== null) {
            console.log(data)
            return data;
          }
        } catch(e) {
        }
      }

      try{

        handleToken();
      
      }catch(e){
        console.log(e)
      }
    },[])
  

  return (
    <SafeAreaView className="bg-[#fff1e0] h-screen">
      <StatusBar style="dark" />

      <View className="">

        <Text className="text-stone-900 my-40 text-[36px] mx-10">Here is some Headline</Text>
        <View className="flex flex-col items-center justify-between h-40 mx-10">
          <TextInput placeholder="Email" onChangeText={(newEmail) => setEmail(newEmail)} defaultValue={email} className=" border-[1px] border-stone-400 color-stone-900 text-[32px] rounded w-full" placeholderTextColor="#CCC" autoCorrect={false}/>
          <TextInput placeholder="Password" onChangeText={(newPassword) => setPassword(newPassword)} defaultValue={password} className="border-[1px] border-stone-400 color-stone-900 text-[32px] rounded w-full" placeholderTextColor="#CCC" secureTextEntry={true} autoCorrect={false}/>

          <TouchableOpacity onPress={() => handlePress()} activeOpacity={0.7} className="p-2 bg-[#369623] rounded w-full">
            <Text className="text-[36px] text-center text-white">Log In</Text>
          </TouchableOpacity>

        </View>


      </View>      

    </SafeAreaView>
  )
}

export default Login

