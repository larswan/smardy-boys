import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Icon, Input, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client'
import Message from '../components/Message.jsx'

const ChatScreen = ({ route, navigation }) => {
    const [newChat, setNewChat] = useState("")
    const [screenName, setScreenName] = useState("")
    const [messages, setMessages] =useState()
    const { roomId, socket, token } = route.params
 
    // typing
    const handleChange = (e) => {
        setNewChat(e)
    }

    // Get user object from local storage
    const getLocalUser = async () => {
        console.log(token)


        // try {
        //     const jsonValue = await AsyncStorage.getItem('@storage_Key')
        //     jsonValue != null ? token = JSON.parse(jsonValue) : null;
        //     setScreenName(token.user.screen_name)
        // } catch (e) {
        //     console.log('do or do not, there is no try')
        //     // error reading value
        // }
    }
    // getLocalUser()
 
    useEffect( () => {
        setScreenName(token.user.screen_name)
        // TEST
        console.log(roomId)

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
            let req = await fetch(`http://172.19.80.142:3000/messages/${roomId}`)
            let res = await req.json()
            setMessages(res)
        }
        connect()
        getMessages()

    },[])

    const handleMessage = async() => {

        // regular post message post request 
        let req = await fetch(`http://172.19.80.142:3000/messages`, {
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
        console.log(newChat)
        setNewChat("")
    }

    return (
        <ScrollView>
            <View className="p-4">
                <View className='flex-row w-auto justify-evenly'>
                <Input 
                    containerStyle={{}}
                    // disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{}}
                    // errorMessage="Oops! that's not correct."
                    errorStyle={{}}
                    errorProps={{}}
                    inputStyle={{}}
                    label="Talk about it..."
                    labelStyle={{}}
                    labelProps={{}}
                    rightIcon={<Icon
                        size={15}
                        color="grey"
                        reverse
                        reverseColor="white"
                        underlayColor="white"
                        name='sc-telegram'
                        type='evilicon'
                        onPress={() => { handleMessage() }}
                    />}
                    rightIconContainerStyle={{}}
                    placeholder='Write your message..'
                    type="text"
                    value={newChat}
                    onChangeText={handleChange} />
                </View>
                { 
                    messages?  messages.map((message)=> {
                                return(
                                <Message message={message} screenName={screenName}/>
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