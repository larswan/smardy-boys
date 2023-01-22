import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

const Home = ({navigation}) => {

    return(
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Text className="text-xl font-black text-center py-10">Who are the smartest boys in the world?</Text>
                <StatusBar style="auto" />
                <TouchableOpacity
                    className="bg-black	rounded-lg"
                    onPress={() => Alert.alert('Colter and Larson')}
                >
                    <Text className="p-2 m-2 text-white ">Touch this to find out!</Text>
                </TouchableOpacity>

                <View>
                    <Button
                        title="Go to TestScreen"
                        onPress={() =>
                            navigation.navigate('TestScreen')
                        }
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default Home

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    // header: {
    //   fontSize: 40,
    //   color: 'red',
    //   backgroundColor: 'red'
    // }
});