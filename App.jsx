import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './components/Home';
import TestScreen from './components/TestScreen';
import ChatScreen from './components/ChatScreen';

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen 
        name="TestScreen"
        component={TestScreen}
        />
        <Stack.Screen 
        name="ChatScreen"
        component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>     
  );
}


