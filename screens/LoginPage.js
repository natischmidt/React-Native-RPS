import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import IP_URL from "../services/IP";

const LoginPage = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    const setPlayerName = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.post(
                IP_URL + '/user/name',
                { name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    },
                }
            );

            if (response.status === 200) {
                navigation.navigate('GamePage');
            } else {
                console.error('Failed to set player name');
            }
        } catch (error) {
            console.error('Error occurred while setting player name:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Set Name" onPress={setPlayerName} />
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


