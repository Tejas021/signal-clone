import { FontAwesome } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, ScrollViewBase, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {auth, db} from "../firebase"
import firebase from 'firebase/compat/app';
import { Avatar } from 'react-native-elements'
import { LogBox } from 'react-native';


const ChatScreen = ({navigation,route}) => {
    LogBox.ignoreLogs(['Setting a timer']);
    const [input,setInput]=useState("")
    const [messages, setMessages] = useState([])
    const sendMessage=()=>{
        Keyboard.dismiss()
     db.collection("chats").doc(route.params.id).collection("message").add({
         timestamp:firebase.firestore.FieldValue.serverTimestamp(),
         message:input,
         displayName:auth.currentUser.displayName,
         email:auth.currentUser.email,
         photoURL:auth.currentUser.photoURL,
     }).then(setInput("")).catch(err=>alert(err))
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:route.params.chatName,
            headerTitleAlign:"center"
        ,headerRight:()=>(
            <View
            style={
                {
                    display:'flex',
                    flexDirection:"row"
                    ,justifyContent:'space-around'
                    ,width:90
                }
            }>
                <TouchableOpacity>
                    <FontAwesome name="video-camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="phone" color="white" size={24}/>
                </TouchableOpacity>
            </View>
        )
        })
    },[])


useLayoutEffect(()=>{
const unsubscribe=db.collection("chats").doc(route.params.id).collection("message").orderBy("timestamp","asc").onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>({id:doc.id,data:doc.data()}))))
return unsubscribe
    },[route])

    return (
        <View style={{flex:1,backgroundColor:"white"}}>
            <StatusBar color="light"/>
          <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS==="ios"?"padding":""}
          keyboardVerticalOffset={90}
          ><TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
              <>
              <ScrollView contentContainerStyle={{paddingTop:15 ,paddingHorizontal:5}}>
                  {messages.map(({id,data})=>(
                      data.email===auth.currentUser.email?(
                        <View style={styles.sender} key={id}>
                            <Avatar
                            position="absolute"
                            bottom={-15}
                            right={-5}
                            //WEB
                            containerStyle={
                                {
                                position:"absolute"
                                ,bottom:-15,
                                right:-5
                            }}
                            source={{uri:auth.currentUser.photoURL}}
                            size={30}
                            rounded
                        />
                           
                            <Text style={styles.senderText}>{data.message}</Text>
                        </View>
                      ):(
                        <View key={id} style={styles.reciever}>
                            <Avatar
                             position="absolute"
                             bottom={-15}
                             left={-5}
                             //WEB
                             containerStyle={
                            {
                                 position:"absolute"
                                 ,bottom:-15,
                                 left:-5
                            }
                        }
                             source={{uri:data.photoURL}}
                             size={30}
                             rounded
                            /><Text>{data.displayName}</Text>
                            <Text style={styles.recieverText}>{data.message}</Text>
                        </View>
                      )
                  ))}             
              </ScrollView >
              <View style={styles.footer}>
                <TextInput onSubmitEditing={sendMessage} placeholder='Type Message' style={styles.textInput} value={input} onChangeText={(text)=>setInput(text)}/>
             <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <FontAwesome size={24} name='send' color="#286be6"/>
             </TouchableOpacity>
              </View>
              </>
              </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    recieverText:{
        color:"white"
    },
    senderText:{
        color:"black"
    },
    sender:{
        padding:15,
        backgroundColor:"#ececec",
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    reciever:{ 
        padding:15,
        backgroundColor:"#2b6be6",
        alignSelf:'flex-start',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    footer:{
        flexDirection:"row",
        alignItems:'center',
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,
        backgroundColor:"#ececec"
    },
    recieverName:{
        fontSize:15
    }
})
