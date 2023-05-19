import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Keyboard, Button} from 'react-native';
import {TouchableWithoutFeedback} from "react-native-web";
import {getData, storeData} from "./HomePage";
import IP_URL from "../services/IP";



const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const Login = async (username, password) => {
        try {
            return fetch(IP_URL + '/auth/authenticate', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({username, password}),
            }).then((response) => response.json())
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async () => {
        await Login(username, password)
            .then((response) => {
                if (response !== '') {
                    storeData('token', response.token);
                    storeData('username', response.username);
                    setPassword('');
                    setUsername(`${response.username}`);
                }
            });
    };

    const Register = async (username, password) => {
        try {
            return fetch(IP_URL + '/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": await getData('token'),
                }, body: JSON.stringify({username, password}),
            }).then((response) => response.json())
        } catch (error) {
            console.error(error);
        }
    }

    const handleRegister = async () => {
        await Register(username, password)
            .then((res) => {
                if (res === true) {
                    setUsername('');
                    setPassword('');
                }
            });
    };

    return (
            <View style={styles.container}>
                <View style={styles.input}>
                    <TextInput
                        placeholder='Enter username'
                        value={username}
                        onChangeText={setUsername}/>
                    <TextInput
                        placeholder='Enter password'
                        encrypted={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={handleLogin} />
                        <Button title="Register" onPress={handleRegister} />
                    </View>
                </View>
            </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'},
    buttonContainer: {
        },
    formContainer: {},
    formSubContainer: {},
    heading: {},
    input: {
        width: '80%',
        marginBottom: 10,},
    button: {},
    buttonText: {},
    overlayContainer: {},
    overlay: {},
    overlayPanel: {},
});

export default LoginPage;
