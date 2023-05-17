// import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import Cards from "./memory wip/Cards";
// // import Login from "./memory wip/Login";
//
// // const Stacked = createNativeStackNavigator();
//
// export default function App() {
//
//     return (
//         <NavigationContainer>
//             <Stacked.Navigator>
//                 <Stacked.Screen name='Login' component={Login}/>
//                 <Stacked.Screen name='Cards' component={Cards}/>
//             </Stacked.Navigator>
//         </NavigationContainer>
//
//     );
// }


import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.formSubContainer}></View>

                <View style={styles.formSubContainer}>
                    <Text style={styles.heading}>Logga in</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoCorrect={false}
                        id="email"
                    />
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Click here</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.overlayContainer}>
                <View style={styles.overlay}>
                    <View style={styles.overlayPanel}></View>
                    <View style={styles.overlayPanel}>
                        <Text style={styles.heading}>RPS</Text>
                        <Text>Type in a username!</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flexDirection: 'row',
    },
    formSubContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },
    overlayPanel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default App;
