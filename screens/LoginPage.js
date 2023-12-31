import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import IP_URL from "../services/IP";
import {ImageBackground} from "react-native";


const LoginPage = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');

    const setPlayerName = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.post(
                IP_URL + '/players/name',
                { name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    },
                }
            );

            if (response.status === 200) {
                navigation.navigate('Choose Game');
            } else {
                console.error('Failed to set player name');
            }
        } catch (error) {
            console.error('Error occurred while setting player name:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bg2.jpg')} resizeMode="cover" style={styles.background}>
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
        </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
    },
    input: {
        width: '50%',
        marginTop:80,
        marginLeft:100,
    },
    buttonContainer: {
    },
});

export default LoginPage;


