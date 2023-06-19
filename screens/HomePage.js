import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {ImageBackground, TouchableOpacity} from "react-native";
import {getToken} from "../services/Api";
import {storeData } from '../services/Storage';

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