import { Alert, Modal, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../components/User.jsx'
import io from 'socket.io-client'


const BuddyList = ({navigation}) => {
    // const [screenName, setScreenName] = useState("")
    const [allUsers, setAllUsers] =useState()
    const socket = io("http://172.19.80.142:3000")
    let token

    // Get user object from local storage
    const getLocalUser = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? token = JSON.parse(jsonValue) : null;
            setScreenName(token.user.screen_name)
        } catch (e) {
            console.log('do or do not, there is no try')
            // error reading value
        }
    }
    getLocalUser()
 
    useEffect( () => {
        // estabishing sockets
        const connect = async () =>  {
            socket.on("connect", (data) => {
            console.log("Sockets are socking");
        });

        socket.on("disconnect", (data) => {
            console.log("Scokets aint socking");
        });

        return function cleanup() {
            socket.disconnect();
        }; 
        }

        // fetch all users
        const getUsers  = async() => {
            let req = await fetch(`http://172.19.80.142:3000/users`)
            let res = await req.json()
            setAllUsers(res)
            console.log(res)
        }

        connect()
        getUsers()
    },[])

    return(
        <View className="p-4">
            <Text className="font-bold">Online:</Text>
                {
                    allUsers ? allUsers.map((user)=>{
                        if (user.active == true) {
                            return(
                                <User user={user} socket={socket} token={token} navigation= {navigation}/>
                            )}
                    }) : <Text>Loading</Text>
                }
            <View style={{ width: '95%', alignSelf: 'center', borderBottomColor: 'grey', borderBottomWidth: '1px' }}  ></View>    
            <Text className="font-bold">Offline:</Text>
                {
                    allUsers ? allUsers.map((user)=>{
                        if (user.active != true){
                            return(
                                <User user={user} socket={socket} token={token} navigation={navigation} />
                            )}
                    }) : <Text>Loading</Text>
                }
        </View>
    )
}
export default BuddyList