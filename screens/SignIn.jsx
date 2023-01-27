import { Alert, Modal, KeyboardAvoidingView, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Button, Icon, Input, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "react-native-config";

const SignIn = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const ipUrl = "http://10.129.2.101:3000"

    // Stores the JWT in local storage
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
            console.log(jsonValue)
        } catch (e) {
            Alert.alert(`error storing token`)
        }
    }

    const handleSubmit = () => {
        // add a post request for login
        const loginSubmit = async () => {
            let req = await fetch(`${ipUrl}/login`, {
                method: "POST",
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    screen_name: username,
                    password: password,
                })
            })
            if (req.ok) {
                Alert.alert(`Your ScreenName is ${username} your password is ${password}`)
                let res = await req.json()  
                storeData(res)
                navigation.push('BuddyList', {
                    token: res,
                    ipUrl: ipUrl,
                })
            }
            else{
                Alert.alert(`Unrecognized username or password`)
            }
        }
        loginSubmit()
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView containerStyle={styles.container}>
                
                <Text>Poopoo{Config.SECRET_TEST}</Text>
                <Input name="username" placeholder='Username' type="text" onChangeText={(username)=>{setUsername(username)}} />
                <Input name="password" placeholder='Password' type="password" secureTextEntry={true} onChangeText={(password) => {setPassword(password) }} />
                <Button
                    title="Login"
                    onPress={()=>{handleSubmit()}}
                    buttonStyle={{
                        borderColor: 'black',
                    }}
                    type="outline"
                    raised
                    titleStyle={{ color: 'black' }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                />
                <Image 
                // style={styles.image} 
                className="w-full justify-center "
                source={require ("../assets/signInSplash.png")}/>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}
export default SignIn

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: "100%",
        height: null,
        objectFit: 'contain',
        // resizeMode: 'contain'
    },
    container: {
        // padding: 0,
        paddingBottom: 20,
        marginTop: 65,
        width: "100%",
        alignItems: 'center'
    }
})