import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button,Input,Image} from "react-native-elements"
import { db,auth } from '../firebase'
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
        if(authUser){
            
            navigation.replace("Home")
        }
    })
    return unsubscribe;
},[])

  const login=()=>{
   auth.signInWithEmailAndPassword(email,password).then().catch(err=>alert(err))


  }

  return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar/>
         <Image
         rounded
        source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/150px-Signal-Logo.svg.png"}}
         style={{width:200,height:200,resizeMode:"contain"}}
         />
        <View style={styles.inputContainer}>
            <Input placeholder="Email" value={email}  onChangeText={(text)=>setEmail(text)}  autofocus type="email"/>
            <Input  placeholder="Password" value={password} onChangeText={(text)=>setPassword(text)}  type="password"/>
        </View>
        <Button onPress={login} containerStyle={styles.button}  title="Login"/>
        <Button onPress={()=>navigation.navigate("Register")} containerStyle={styles.button} title="Register" type="outline"/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})
