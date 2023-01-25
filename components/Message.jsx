import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const Message = ({message}) => {
    
    return(
        <View key={message.id}>
            <Text>{message.content}</Text>
            <View style={{borderBottomColor: 'black', borderBottomWidth: '1px'}}  ></View>
        </View>
    )
}
export default Message