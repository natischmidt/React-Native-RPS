import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = () => {
    const handleLogin = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.formSubContainer}></View>

                <View style={styles.formSubContainer}>
                    <Text style={styles.heading}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
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
                    <View style={styles.overlayPanel}>
                        <Text style={styles.heading}>Rock Paper Scissors</Text>
                        <Text>Type in your username</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    formContainer: {},
    formSubContainer: {},
    heading: {},
    input: {},
    button: {},
    buttonText: {},
    overlayContainer: {},
    overlay: {},
    overlayPanel: {},
});

export default LoginPage;
