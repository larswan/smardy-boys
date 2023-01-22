import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import BuddyList from './components/BuddyList';
import Home from './components/Home';
import TestScreen from './components/TestScreen';
import ChatScreen from './components/ChatScreen';
import SignIn from './components/SignIn';

export default function App() {

  BuddyList.navigationOptions = {
    headerTitle: 'BuddyList',
    headerLeft: () => {
      return null;
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'SignIn',
            headerStyle: {
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
         }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="BuddyList"
          component={BuddyList}
          
          options={{ title: 'Buddies',
            headerLeft: () => null,
          }}
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


