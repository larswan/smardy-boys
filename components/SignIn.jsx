import { Alert, Modal, KeyboardAvoidingView, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignIn = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        
        // add a post request for login
        const loginSubmit = async () => {
            let req = await fetch(``)
            let res = await req.json()
            return res
        }
        
        // change to if res.ok
        if(password && username){
            Alert.alert(`Your ScreenName is ${username} your password is ${password}`)
            navigation.push('BuddyList')

            // storeData(res.jwt)
        }

        // Stores the JWT in local storage
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem('@storage_Key', jsonValue)
            } catch (e) {
                // saving error
            }
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView containerStyle={styles.container}>
                <Image 
                // style={styles.image} 
                className="w-full justify-center "
                source={require ("../assets/signInSplash.png")}/>
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