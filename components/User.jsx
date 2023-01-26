import {Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const User = ({user}) =>{
    return(
        <View>
            <Text className="font-semibold">{user.screen_name}</Text>
        </View>
    )
}
export default User