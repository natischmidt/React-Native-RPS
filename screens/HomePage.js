import React, {useEffect} from 'react';
import IP_URL from "../services/IP";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ImageBackground, TouchableOpacity} from "react-native";


const getToken = async () => {

    try {
        const response = await fetch(IP_URL + '/auth/token');
        const json = await response.json();
        return json.toString();
    } catch (error) {
        console.error(error);
    }
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
            .then(() => console.log(key  + value ))

    } catch (error) {
        console.log(error.message())
    }
}

export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch(e) {
        console.log(e.message())
    }
}


const HomePage = () => {

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Login');
    };

    useEffect(() => {
        getToken()
            .then( token => {
            storeData('token', token);
            })
            .catch(error => {
                console.error(error);
        })
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.background}>
                <Text style={styles.text}>ROCK paper scissors</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>WHO ARE YOU</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
};

const styles =StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
    },

    text: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
        marginLeft: '31%',
        marginTop: '10%',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 25,
    },


});



export default HomePage;