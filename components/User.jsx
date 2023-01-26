import {Alert, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const User = ({user, navigation, socket, token}) =>{

    const handlePress = async () => {
        // console.log("token.id is ", token.user.id)

        navigation.push('ChatScreen', {
                roomId: 2,
                token: token,
                socket: socket,
            })
        
        // fetch room exists or not BROKEN
        // let req = await fetch(`http://172.19.80.142:3000/rooms`, {
        //     method: "POST",
        //     headers: {
        //         // 'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         currentUser: token.user.id,
        //         otherUser: user.id,
        //     })
        // })
        // if (req.ok) {
        //     console.log(req)
        //     // navigation.push('ChatScreen', {
        //     //     roomId: 2,
        //     //     token: token,
        //     //     socket: socket,
        //     // })
        // }
        // else {
        //     Alert.alert(`Problem loading the room`)
        // }
    }

    return(
        <View key={user.id}>
            <Text onPress={()=>{handlePress()}} className="font-semibold">{user.screen_name}</Text>
        </View>
    )
}
export default User