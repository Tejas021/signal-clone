import { updateCurrentUser } from '@firebase/auth'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button,  Text,Input } from 'react-native-elements'
import { db,auth } from '../firebase'
const RegisterScreen = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const register = ()=>{
       auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
           authUser.user.updateProfile(
               {displayName:name,
               photoURL:imageUrl}
           )
       }).catch(err=>alert(err))
    }
    return (
        
      <KeyboardAvoidingView style={styles.container}>
          <StatusBar style="light"/>
          <Text h3 style={{marginBottom:50}}>Create A New Account</Text>
          <View style={styles.inputContainer}>
            <Input placeholder="Full Name" value={name} onChangeText={(text)=>setName(text)} autofocus type='text'/>
            <Input placeholder="Email" value={email} onChangeText={(text)=>setEmail(text)} type='email'/>
            <Input placeholder="Password" secureTextEntry value={password} onChangeText={(text)=>setPassword(text)} type='password'/>
            <Input placeholder="ImageUrl" value={imageUrl} onChangeText={(text)=>setImageUrl(text)} type='text'/>
          </View>
          <Button onPress={register} containerStyle={styles.button} title="Register"/>
      </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
        width:300,
        marginTop:10
    }
})
