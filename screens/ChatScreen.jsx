import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
import Message from '../components/Message.jsx'

const ChatScreen = () => {
    const [newChat, setNewChat] = useState("")
    const [messages, setMessages] =useState()
    let socket
    let token

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? token = JSON.parse(jsonValue) : null;
            // console.log(token)
        } catch (e) {
            // error reading value
        }
    }
 
    useEffect(() => {
    socket = io("http://10.129.2.101:3000")

    socket.on("connect", (data) => {
        console.log("Sockets are socking");
    });

    socket.on('message', (data) => {
        console.log('Socket.io message received:', data);
    });
    
    socket.emit("message", "this is a message from the client");

    
    socket.on("disconnect", (data) => {
        console.log("Scokets aint socking");
    });

    return function cleanup() {
        socket.disconnect();
        }; 
    }, [])


    useEffect(  ()=>{
            // await getData()

        const request  = async() => {
            let req = await fetch(`http://10.129.2.101:3000/messages`, {
                // method: "GET",
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
                // body: JSON.stringify({
                //     userId: token.user.id,
                // })
            })
            let res = await req.json()
            // console.log(res)
            setMessages(res)
        }
        request()
    },[])

    const handleMessage = async() => {

        // let req = await fetch("")
        await getData()
        let req = await fetch(`http://10.129.2.101:3000/messages`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newChat,
                // seen: false,
                userId: token.user.id,
            })
        })
        let res = await req.json()
        // console.log(res)
        setNewChat("")
    }
    const handleChange = (e) => {
        setNewChat(e)
        // console.log(newChat)
    }

    return (
        <ScrollView>
            <View className="flex ">
                { 
                    messages? 
                            messages.map((message)=> {
                                return(
                                <Message message={message} />
                                )
                                }
                            )
                           : null
                }
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