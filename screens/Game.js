import React, {useEffect, useState} from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import {getData} from "./HomePage";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";


const makeMove = async (token, gameContainer, sign) => {
    try {
        const response = await fetch(IP_URL + `/games/move/` + sign, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': await getData('token'),
            },
            body: JSON.stringify(gameContainer),
        });

        if (!response.ok) {
            throw new Error('Failed to make a move');
        }

        return await response.json();
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};



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
        const gameid = await getData('gameid');
        try {
            const response = await axios.get(IP_URL + `/games/` + gameid);
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

            const response = await axios.get(`${IP_URL}/games/${gameid}`, {
                headers: {
                    'token': token,
                },
            });

            const gameData = response.data;

            const gameContainer = {
                uuid: gameData.uuid,
                firstPlayer: gameData.firstPlayer,
                playerMove: null,
                secondPlayer: gameData.secondPlayer,
                opponentMove: null,
                gameStatus: gameData.gameStatus,
            };

            console.log(gameContainer);

            const moveResponse = await makeMove(token, gameContainer, sign);
            console.log(moveResponse);

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
                <TouchableOpacity onPress={() => handleMove("rock")}>
                    <Image source={require("../images/rock.png.bmp")} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("scissor")}>
                    <Image source={require("../images/scissor.png.bmp")} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("paper")}>
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

