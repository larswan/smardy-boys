import {Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const User = ({user, navigation}) =>{

    const handlePress = async () => {




        navigation.push('ChatScreen', {
            roomId: "HEY THIS IS THE ROOM ID PARAM",
        })
    }

    return(
        <View>
            <Text onPress={()=>{handlePress()}} className="font-semibold">{user.screen_name}</Text>
        </View>
    )
}
export default User