import { Modal, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Button, LinearGradient } from '@rneui/themed';


const TestScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>TEST SCREEEEEN</Text>
            <TextInput >Replace this text with your name name</TextInput>
            <Button style={styles.button}>Poop</Button>
            <Button ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}>Secondary</Button>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </ScrollView>
    );
};
export default TestScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'block',
        padding: 30,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        color: 'black',
    },
    buttonOpen: {
        backgroundColor: 'black',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});