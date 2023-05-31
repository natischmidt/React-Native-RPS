import React, { useEffect, useState } from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { getData } from "./HomePage";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { GameButtons } from "../components/GameButtons";

const MakeMove = async (token, gameContainer, sign) => {
    try {
        return fetch(IP_URL + `/games/move/${sign}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: await getData('token'),
            },
            body: JSON.stringify(gameContainer),
        })
            .then((response) => response.json())
            .then((data) => data);
    } catch (err) {
        console.log(err.message);
    }
};

const Game = () => {
    const [player, setPlayer] = useState('');
    const [opponent, setOpponent] = useState('');
    const [playerMove, setPlayerMove] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [result, setResult] = useState("");
    const [gameStatus, setGameStatus] = useState(null);


    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const gameid = await getData('gameid');
                const token = await getData('token');

                const response = await axios.get(IP_URL + `/games/${gameid}`, {
                    headers: {
                        token: token,
                    },
                });

                const gameData = response.data;


                if (gameData.firstPlayer.uuid === token) {
                    setPlayer(gameData.firstPlayer.username);
                    setOpponent(gameData.secondPlayer.username);
                } else if (gameData.secondPlayer.uuid === token) {
                    setPlayer(gameData.secondPlayer.username);
                    setOpponent(gameData.firstPlayer.username);
                }

                if (gameData.playerMove && gameData.opponentMove) {

                    Result(gameData.playerMove, gameData.opponentMove);
                }
            } catch (error) {
                console.log(error);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const Result = (playerMove, opponentMove) => {

        let result;
        if (playerMove === opponentMove) {
            result = "It's a tie!";
        } else if (
            (playerMove === "rock" && opponentMove === "scissors") ||
            (playerMove === "paper" && opponentMove === "rock") ||
            (playerMove === "scissors" && opponentMove === "paper")
        ) {
            result = "You won!";
        } else {
            result = "You lost!";
        }

        // Display an alert with the result
        alert(result);
    };
    // const GameStatus = async () => {
    //     const gameid = await getData('gameid');
    //     try {
    //         const response = await axios.get(IP_URL + `/games/` + gameid);
    //         setGameStatus(response.data);
    //         console.log(response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleMove = async (sign) => {
        try {
            const gameid = await getData("gameid");
            const token = await getData("token");

            const response = await axios.get(IP_URL + `/games/` + gameid, {
                headers: {
                    token: token,
                },
            });
            const gameData = response.data;

            const gameContainer = {
                uuid: gameData.uuid,
                firstPlayer: gameData.firstPlayer,
                playerMove: null,
                secondPlayer: gameData.secondPlayer,
                opponentMove: null,
                gamestatus: gameData.gamestatus,
            };

            const moveResponse = await MakeMove(token, gameContainer, sign);
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
            <GameButtons handleMove={handleMove} />
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
    },
    image: {},
    choiceImage: {
        marginTop: 50,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
});

export default Game;
