import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const Message = ({message, screenName}) => {
    
    return(
        <View key={message.id}>
            
            <Text style={message.screen_name == screenName ? styles.myName : styles.otherName}>{message.screen_name}:</Text>
            <Text style={message.screen_name == screenName ? styles.myMessage : styles.otherMessage}>{message.content}</Text>
               
            <View style={{width: '95%', alignSelf: 'center', borderBottomColor: 'grey', borderBottomWidth: '1px'}}  ></View>
        </View>
    )
}

const styles = StyleSheet.create({
    myName: {
        textAlign: 'left',
        paddingLeft: 10,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 19

    },
    otherName: {
        textAlign: 'right',
        paddingRight: 10,
        color: 'red',
        fontWeight: 'bold',
        fontSize: 19
    },
    myMessage: {
        textAlign: 'left',
        paddingLeft: 10,
        fontSize: 17

    },
    otherMessage: {
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 17
    },
});

export default Message

    // < View key = { message.id } >
    // {
    //     message.screen_name == screenName ?
    //         <Text style={styles.mymessage}>{message.screen_name}: {message.content}</Text> :
    //         <Text style={styles.othermessage}>{message.content} :{message.screen_name}</Text>
    // }
    //     < View style = {{ borderBottomColor: 'black', borderBottomWidth: '1px' }}  ></View >
    //     </View >