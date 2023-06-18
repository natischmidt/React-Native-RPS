import React, { useEffect, useState } from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {ImageBackground } from "react-native";
import GameButton from "../components/GameButton";

const Game = () => {
    const navigation = useNavigation();
    const [playerMove, setPlayerMove] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [status, setStatus] = useState("");
    const [gameStatus, setGameStatus] = useState(null);

    const handleResult = (status, token) => {
        if (status === "WIN" && token) {
            Alert.alert(":)", "You won!", [
                {
                    text: "OK :)",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]);
        } else if (status === "LOSE" && token) {
            Alert.alert(":(", "You lost!", [
                {
                    text: "OK :(",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]);
        } else if (status === "DRAW" && token) {
            Alert.alert(":/", "It's a draw..", [
                {
                    text: "OK :/",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]);
        }
    };

    useEffect(() => {
        const interval = setInterval(GameStatus, 2000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const GameStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.get(
                IP_URL + '/games/status',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    }
                }
            );

            setGameStatus(response.data);
            setPlayerMove(response.data.playerMove);
            setOpponentMove(response.data.opponentMove);
            setStatus(response.data.status);

            handleResult(response.data.status, token);

        } catch (error) {
            console.log(error);
        }
    };

    const handleMove = async (sign) => {
        try {
            const token = await AsyncStorage.getItem('token');

            const response = await axios.post(
                IP_URL + '/games/move/' + sign,
                null,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    }
                }
            );

            if (response.status !== 200) {
                console.error(response);
                throw new Error('Failed to make a move');
            }

            const moveResponse = response.data;

            setPlayerMove(moveResponse.playerMove);
            setOpponentMove(moveResponse.opponentMove);
            setStatus(moveResponse.status);

            if (moveResponse.opponentMove !== null) {
                handleResult(moveResponse.status, token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bg4.jpg')} resizeMode="cover" style={styles.background}>
                <GameButton handleMove={handleMove} status={status} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    choicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    choiceImage: {
        marginTop: 90,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 150,
    },
    background: {
        width: '100%',
        height: '100%',
    },

});

export default Game;
