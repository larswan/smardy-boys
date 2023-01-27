import { Alert, Modal, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../components/User.jsx'
import io from 'socket.io-client'


const BuddyList = ({navigation, route}) => {
    const [allUsers, setAllUsers] =useState()
    const socket = io("http://10.129.2.101:3000")
    // const [token, setToken] = useState()
    const { token, ipUrl } = route.params


    // Get user object from local storage
    // const getLocalUser = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('@storage_Key')
    //         jsonValue != null ? setToken(jsonValue) : null;
    //         console.log(jsonValue)
    //     } catch (e) {
    //         console.log('do or do not, there is no try')
    //         // error reading value
    //     }
    // }
 
    useEffect( () => {
        console.log("in buddyScreen token is ", token)

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
            let req = await fetch(`${ipUrl}/users`)
            let res = await req.json()
            console.log(res[1])
            const otherUsers = res.filter((x)=>{return x.id != token.user.id})
            console.log(otherUsers)
            setAllUsers(otherUsers)
        }

        // getLocalUser()
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
                                <User user={user} socket={socket} token={token} navigation={navigation} ipUrl={ipUrl} />
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