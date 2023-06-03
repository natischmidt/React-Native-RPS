import React, {useEffect, useState} from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import {Alert, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";



const Game = () => {
    const navigation = useNavigation();
    const [playerMove, setPlayerMove] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [result, setResult] = useState("");
    const [gameStatus, setGameStatus] = useState(null);

    const handleResult = (result, token) => {
        if (result === "WIN" && token) {
            Alert.alert(":)", "You won!", [
                {
                    text: "OK :)",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]);
        } else if (result === "LOSE" && token) {
            Alert.alert(":(", "You lost!", [
                {
                    text: "OK :(",
                    onPress: () => {
                        navigation.navigate("Home");
                    },
                },
            ]);
        } else if (result === "DRAW" && token) {
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
            console.log(response.data);
            console.log(response.data.playerMove);
            console.log(response.data.opponentMove);
            console.log(response.data.result);

            if (response.data.playerMove !== null && response.data.opponentMove !== null) {
                setPlayerMove(response.data.playerMove);
                setOpponentMove(response.data.opponentMove);
                setResult(response.data.result);
                handleResult(response.data.result, token);
            }


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
                        token,
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
            setResult(moveResponse.result);
            console.log(response.data.result);
            console.log(moveResponse.result);


            if (moveResponse.opponentMove !== null) {
                handleResult(moveResponse.result, token);
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
                <Text style={styles.resultText}>{result}</Text>
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


