import React, {useEffect, useState} from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import {getData} from "./HomePage";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";





const Game = () => {
    const [playerMove, setPlayerMove] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [result, setResult] = useState("");
    const [gameStatus, setGameStatus] = useState(null);

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
                IP_URL + '/games/status/',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    }
                }
            );

            setGameStatus(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };




    const handleMove = async (sign) => {
        try {
            const gameid = await getData("gameid");
            const token = await getData("token");

            const gameContainer = {
                uuid: gameid,
                playerMove: sign,
            };

            console.log(gameContainer.playerMove);

            const response = await axios.post(IP_URL + '/games/move/' + sign, gameContainer, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },

            });

            if (response.status !== 200) {
                console.error(response);
                throw new Error('Failed to make a move');
            }

            const moveResponse = response.data;

            console.log(moveResponse);
            console.log(gameContainer)
            console.log(sign);
            console.log(playerMove, opponentMove)

            setPlayerMove(moveResponse.playerMove);
            setOpponentMove(moveResponse.opponentMove);
            setResult(moveResponse.result);


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

