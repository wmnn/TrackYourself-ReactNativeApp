import React, {useEffect, useContext} from 'react'
import {SafeAreaView} from 'react-native'
import {DrawerIcon, MapWeights, AddWeights} from '../components'
import UserContext from '../UserContext.js';




function Weights({navigation}) {
  const {userContext, setUserContext} = useContext(UserContext);
  
  useEffect(() => {
    if(!userContext){

      fetch('http://localhost:8000/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
      'Content-Type': 'application/json',
      },
      
    }).then((res) => res.json()
    ).then((res) => { 
        
        if(res.status==200){
            setUserContext(res.user)
        }else{
            
        }
        
    })
    }
  },[])

  return (
    <SafeAreaView className="bg-[#fff1e0] h-full">
        <DrawerIcon />

        <AddWeights />
        <MapWeights />
    </SafeAreaView>
  )
}

export default Weights