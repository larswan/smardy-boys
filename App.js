import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text className="text-xl font-black text-center pb-4">Who are the smartest boys in the world?</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        className="bg-black	rounded-lg"
        onPress={() => Alert.alert('Colter and Larson')}
      >
        <Text className="p-2 m-2 text-white ">Touch this to find out!</Text>
      </TouchableOpacity>
      <View>
        <Text className="text-white font-italics pt-4">Micahael, my child, be born unto this larger view</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // header: {
  //   fontSize: 40,
  //   color: 'red',
  //   backgroundColor: 'red'
  // }
});
