import React from 'react'
import { View, SafeAreaView , Text, TextInput, TouchableOpacity} from 'react-native';

function Home({navigation}) {
 
  return (
    <SafeAreaView className="bg-black h-screen">
    
        <Text className="text-[36px] font-bold text-white">Login in to continue</Text>

        <View className="flex flex-col items-center justify-between h-40">
          <TextInput placeholder="Email" className="border-[1px] border-white color-white text-[36px] w-[80%] rounded " placeholderTextColor="#CCC" autoCorrect={false}/>
          <TextInput placeholder="Password" className="border-[1px] border-white color-white text-[36px] w-[80%] rounded" placeholderTextColor="#CCC" secureTextEntry={true} autoCorrect={false}/>

          <TouchableOpacity onPress={(e) => {console.log("Pressed"); navigation.navigate('Register')}} activeOpacity={0.7} className="p-2 border-[1px] border-white bg-green-300 w-[80%] rounded">
            <Text className="text-[36px] text-center">Log In</Text>
          </TouchableOpacity>

        </View>
        

    </SafeAreaView>
  )
}

export default Home