import { Alert, Modal, Image, ViewAlert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState, useEffect } from 'react';
import { Button, Icon, Input, LinearGradient, Divider } from '@rneui/themed';
import AsyncStorage from '@react-native-community/async-storage';

const BuddyList = () => {

    //get token (JWT)
    const getJWT = async () => {
        try {
            const jwt = await AsyncStorage.getItem('jwt');
            return jwt;
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View>

        </View>
    )
}
export default BuddyList