import React, {useEffect, useState} from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { getData } from "./HomePage";
import {Alert, StyleSheet, View} from "react-native";
import {GameButtons} from "../components/GameButtons";

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
    const [playerMove, setPlayerMove] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [result, setResult] = useState("");
    const [gameStatus, setGameStatus] = useState(null);
    const [gameResult, setGameResult] = useState(null);

    useEffect(() => {
        const interval = setInterval(GameStatus, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            checkResult();
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const checkResult = async () => {
        const gameid = await getData('gameid');
        const token = await getData('token');
        try {
            const response = await axios.get(IP_URL + `/games/result/${gameid}`,{
                headers: {
                    token: token,
                },
            });
            const gameResult = response.data.gamestatus;
            setGameResult(gameResult);
            console.log(gameResult);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (gameResult) {
            if (gameResult.result === "WIN") {
                Alert.alert("You Win!");
            } else if (gameResult.result === "DRAW") {
                Alert.alert("It's a Draw!");
            } else if (gameResult.result === "LOSE") {
                Alert.alert("You Lose!");
            }
        }
    }, [gameResult]);
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

            const response = await axios.get(IP_URL + `/games/` + gameid
                , {
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
                gamestatus: gameData.gamestatus
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
