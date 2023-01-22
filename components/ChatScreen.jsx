import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';

const ChatScreen = () => {

    const [newChat, setNewChat] = useState("")
    const handleMessage = async() => {
        let req = await fetch("")

        setNewChat("")
    }
    const handleChange = (e) => {
        setNewChat(e)
        console.log(newChat)
    }
    
    console.log(newChat)

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