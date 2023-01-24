import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import {useFonts, DotGothic16_400Regular } from '@expo-google-fonts/dotgothic16';
import {
  Tinos_400Regular,
  Tinos_400Regular_Italic,
  Tinos_700Bold,
  Tinos_700Bold_Italic,
} from '@expo-google-fonts/tinos';

import BuddyList from './components/BuddyList';
import Home from './components/Home';
import TestScreen from './components/TestScreen';
import ChatScreen from './components/ChatScreen';
import SignIn from './components/SignIn';

const Stack = createNativeStackNavigator();

export default function App() {
  // console.log(Config)

  let [fontsLoaded] = useFonts({
    DotGothic16_400Regular,
    Tinos_400Regular,
    Tinos_400Regular_Italic,
    Tinos_700Bold,
    Tinos_700Bold_Italic,
  });

  let fontSize = 24;
  let paddingVertical = 6;

  BuddyList.navigationOptions = {
    headerTitle: 'BuddyList',
    headerLeft: () => {
      return null;
    },
  };

  if(fontsLoaded){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'Sign On',
            headerStyle: {
              backgroundColor: '#181372'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'DotGothic16_400Regular'
            },
         }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#181372'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'DotGothic16_400Regular'
            },
          }}
        />
        <Stack.Screen
          name="BuddyList"
          component={BuddyList}
          
          options={{
            title: 'Buddies',
            headerStyle: {
              backgroundColor: '#181372'
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'DotGothic16_400Regular'
            },
          }}
        />
        <Stack.Screen 
        name="TestScreen"
        component={TestScreen}
        options={{
          title: 'Test Screen',
          headerStyle: {
            backgroundColor: '#181372'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'DotGothic16_400Regular'
          },
        }}
        />
        <Stack.Screen 
        name="ChatScreen"
        component={ChatScreen}
        options={{
          title: 'Chat',
          headerStyle: {
            backgroundColor: '#181372'
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'DotGothic16_400Regular'
          },
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>     
  );
}
}


