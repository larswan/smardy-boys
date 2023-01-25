import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const Message = ({message}) => {
    
    return(
        <View>
            <Text>{message.content}</Text>
        </View>
    )
}
export default Message