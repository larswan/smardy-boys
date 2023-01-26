import {Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const User = ({user, navigation, socket, token}) =>{

    const handlePress = async () => {




        navigation.push('ChatScreen', {
            roomId: 2,
            token: token,
            socket: socket,
        })
    }

    return(
        <View>
            <Text onPress={()=>{handlePress()}} className="font-semibold">{user.screen_name}</Text>
        </View>
    )
}
export default User