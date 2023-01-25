import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
import Message from '../components/Message.jsx'

const ChatScreen = () => {
    const [newChat, setNewChat] = useState("")
    const [messages, setMessages] =useState()
    const socket = io("http://10.129.2.101:3000")
    let token

    // typing
    const handleChange = (e) => {
        setNewChat(e)
    }

    // Get user object from local storage
    const getLocalUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? token = JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    }
 
    useEffect( () => {
        // estabishing sockets
        const connect = async () =>  {
        socket.on("connect", (data) => {
            console.log("Sockets are socking");
        });

        socket.on("message", (data) => {
            setMessages(prevState => [data, ...prevState])
            // console.log(data);
        });

        socket.on("disconnect", (data) => {
            console.log("Scokets aint socking");
        });

        return function cleanup() {
            socket.disconnect();
        }; 
        }

        // fetch all prior messages

        const getMessages  = async() => {
            let req = await fetch(`http://10.129.2.101:3000/messages`)
            let res = await req.json()
            setMessages(res)
        }
        connect()
        getMessages()

    },[])

    const handleMessage = async() => {
        await getLocalUser()

        // regular post message post request 
        let req = await fetch(`http://10.129.2.101:3000/messages`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // add in token
            },
            body: JSON.stringify({
                content: newChat,
                // seen: false,
                userId: token.user.id,
            })
        })
        let res = await req.json()

        socket.emit("message", res);
        setNewChat("")
    }

    return (
        <ScrollView>
            <View className="flex ">
                <Input id="" placeholder='Write your message..' type="text" value={newChat} onChangeText={handleChange} />
                <Icon
                    name='sc-telegram'
                    type='evilicon'
                    color='#517fa4'
                    onPress={() => { handleMessage() }}
                />
                { 
                    messages?  messages.map((message)=> {
                                return(
                                <Message message={message} />
                                )
                                }
                            )
                           : null
                }
            </View>
        </ScrollView>
    )
}
export default ChatScreen