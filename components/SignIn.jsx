import { Modal, Dimensions, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';


const SignIn = () => {
    
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        image: {
            // flex: 1,
            width: screenWidth * 0.2,
            aspectRatio: 1
        },
        container: {
            padding: 30,
            marginTop: 65,
            alignItems: 'center'
        }
    })

    return (
        <View style={styles.container}>
            <Image 
            style={styles.image} 
            // className="w-screen h-1/2 justify-center "
            source={require ("../assets/signInSplash.png")}/>
        </View>
    )
}
export default SignIn

