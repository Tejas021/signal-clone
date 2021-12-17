import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItems = ({id,chatName,enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(()=>{
        const unsubscribe=db.collection("chats").doc(id).collection("message").orderBy("timestamp","desc").onSnapshot((snapshot)=>setChatMessages(snapshot.docs.map((doc)=>doc.data())))
   
        return unsubscribe
    },[])
    return (
        <ListItem key={id} onPress={()=>enterChat(id,chatName)}>
            <Avatar
            rounded
            source={{
                uri:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }}

            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"300"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages[0]?.message}
                                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItems

const styles = StyleSheet.create({})
