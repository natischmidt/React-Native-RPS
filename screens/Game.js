import React, { useEffect, useState } from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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

            console.log('Response data is:', response.data);
            console.log('PlayerMove is:', playerMove);
            console.log('Response data playerMove is:', response.data.playerMove);
            console.log('Response data opponentMove is:', response.data.opponentMove);
            console.log('Response data status is:', response.data.status);
            console.log('Status is:', status);

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

            console.log('Response data is:', response.data);
            console.log('PlayerMove is:', playerMove);
            console.log('Response data playerMove is:', response.data.playerMove);
            console.log('Response data opponentMove is:', response.data.opponentMove);
            console.log('Response data status is:', response.data.status);
            console.log('Status is:', status);

            if (moveResponse.opponentMove !== null) {
                handleResult(moveResponse.status, token);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleMove("ROCK")}>
                    <Image source={require("../images/rock.png.bmp")} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("SCISSOR")}>
                    <Image source={require("../images/scissor.png.bmp")} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("PAPER")}>
                    <Image source={require("../images/paper.png.bmp")} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
                <Text style={styles.resultText}>{status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    choicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    choiceButton: {},
    image: {},
    choiceImage: {
        marginTop: 400,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
});

export default Game;
