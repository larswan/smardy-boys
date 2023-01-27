import {Alert, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const User = ({user, navigation, socket, token, ipUrl}) =>{

    const handlePress = async () => {
               
        // fetch room exists or not BROKEN
        let req = await fetch(`http://10.129.2.101:3000/rooms/${token.user.id}/${user.id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(ipUrl)
        let res = await req.json()
        if (req.ok) {
            console.log(res)
            navigation.push('ChatScreen', {
                roomId: res,
                token: token,
                socket: socket,
                ipUrl: ipUrl,
            })
        }
        else {
            Alert.alert(`Problem loading the room`)
        }
    }

    return(
        <View key={user.id}>
            <Text onPress={()=>{handlePress()}} className="font-semibold">{user.screen_name}</Text>
        </View>
    )
}
export default User