import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 16}}>Who are the smartest boys in the world?</Text>
      <StatusBar style="auto" />
      {/* <Button 
        onPress=
        title="Click to find out!"
        color="#ff5c5c"
        accessibilityLabel="Accessibility read stuff">
      </Button> */}
      <TouchableOpacity
        style={{ color:'red'}}
        onPress={() => Alert.alert('Colter and Lason')}
      >
        <Text> Touch Here </Text>
      </TouchableOpacity>
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
