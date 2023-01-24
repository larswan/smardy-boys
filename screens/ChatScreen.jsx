import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import socket from "../utils/socket";
import io from 'socket.io-client'


const ChatScreen = () => {
    const [newChat, setNewChat] = useState("")
    let socket
    let token

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? token = JSON.parse(jsonValue) : null;
            console.log(token)
            
        } catch (e) {
            // error reading value
        }
    }
    
 
    useEffect(() => {
    getData()

    socket = io("http://10.129.2.101:3000")

    socket.on("connect", (data) => {
        console.log("Sockets are socking");
    });

    
    socket.on('message', (data) => {
        console.log('Socket.io message received:', data);
    });
    
    socket.on("disconnect", (data) => {
        console.log("Scokets aint socking");
    });

    return function cleanup() {
        socket.disconnect();
        };

    }, [])

    const handleMessage = async() => {

        // socket.emit("message", { token: token, message: newChat});
        // console.log(token)
        // let req = await fetch("")

        setNewChat("")
    }
    const handleChange = (e) => {
        setNewChat(e)
        // console.log(newChat)
    }
    
    // console.log(newChat)

    return (
        <ScrollView>
            <View className="flex ">
                <Input id="" placeholder='Write your message..' type="text" value={newChat} onChangeText={handleChange} />
                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='#517fa4'
                    onPress={()=>{handleMessage()}}
                />
            </View>
        </ScrollView>
    )
}
export default ChatScreen