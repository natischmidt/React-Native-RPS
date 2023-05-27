import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import IP_URL from '../services/IP';

const LoginPage = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const response = await fetch(IP_URL + '/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('username', data.username || '');

                navigation.navigate('GamePage');
            } else {
                Alert.alert('Login failed', 'Invalid username or password');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Login failed', 'An error occurred during login');
        }
    };

    const register = async () => {
        try {
            const response = await fetch(IP_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setUsername('');
                setPassword('');
                Alert.alert('Registration successful', 'You can now login.');
            } else {
                Alert.alert('Registration failed', 'An error occurred during registration');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Registration failed', 'An error occurred during registration');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    placeholder="Enter username"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Enter password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={login} />
                    <Button title="Register" onPress={register} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 10,
    },
    buttonContainer: {},
});

export default LoginPage;

