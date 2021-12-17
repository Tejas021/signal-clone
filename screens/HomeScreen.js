import React, {useState,useEffect, useLayoutEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItems from '../components/CustomListItems'
import {AntDesign} from "@expo/vector-icons"

import { auth,db } from '../firebase'
import { StatusBar } from 'expo-status-bar'
const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([])
    const signout=async()=>{
        auth.signOut().then(navigation.replace("Login"))
    }

    useEffect(() => {
const unsubscribe=db.collection("chats").onSnapshot(snapShot=>{
            setChats(snapShot.docs.map(doc=>
                ({
                    id:doc.id,
                    data:doc.data()
                }))
                    )
        }
            )

            return unsubscribe
    }, [])



    useLayoutEffect(() => {
      navigation.setOptions({
          title:"Signal",
          headerTitleAlign: 'center',
          headerTitleStyle:{color:"black"},
          headerTintStyle:"black",
          headerStyle:{backgroundColor:"#fff"}
        ,headerLeft:()=>(
            <View style={{marginLeftL:20}}>
              <Avatar
              onPress={signout}
            rounded
            source={{
                uri:auth.currentUser.photoURL
            }}

            />
            </View>
        ),headerRight:()=>(
            <View style={{
                display:'flex',
                flexDirection:'row',
                
                width:80,
                justifyContent:"space-between"
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color={"black"}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("AddChat")}>
                <AntDesign name="edit" size={24} color={"black"}/>
                </TouchableOpacity>
            </View>
     )
        })
    }, [])



    const enterChat=(id,chatName)=>{
        navigation.navigate("Chat",{
            id,chatName
        })
    }


    return (
        <View style={styles.container}>
           <StatusBar color="light"/>
            <ScrollView>
              {chats.map(({id,data:{chatName}})=>(
                  <CustomListItems id={id} key={id} chatName={chatName} enterChat={enterChat}/>
    ))}
               
           
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})
