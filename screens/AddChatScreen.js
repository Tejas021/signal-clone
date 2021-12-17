import { AntDesign } from '@expo/vector-icons'

import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("")
    useLayoutEffect(() => {
        
      navigation.setOptions({
          title:"Add a New Chat",
          headerBackTitle:"Chats",
        
      })
    }, [])

    const createChat=async()=>{
      await db.collection("chats").add(
          {
              chatName:input
          }
      ).then(navigation.goBack()).catch(err=>alert(err))
    }

    return (
        <View style={styles.container}>
            <Input
            placeholder="Enter the Chat Name"
            value={input}
            onChangeText={text=>setInput(text)}
           leftIcon={
               <AntDesign name="wechat" size={24} color={"black"}/>
           }
           />
            <Button containerStyle={styles.button} onPress={createChat} title="Create Chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center'
    },
    inputContainer:{
        width:300
    },
    button:{
        width:300,
        marginTop:10
    }
})
