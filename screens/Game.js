import React, { useEffect, useState } from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { getData } from "./HomePage";
import { Alert, StyleSheet, View } from "react-native";
import { GameButtons } from "../components/GameButtons";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(GameStatus, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const GameStatus = async () => {
        const gameid = await getData('gameid');
        try {
            const response = await axios.get(IP_URL + `/games/` + gameid);
            const gameData =response.data;

            setGameStatus(gameData);
            setPlayerMove(gameData.playerMove);
            setOpponentMove(gameData.opponentMove);
            console.log(gameData);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (playerMove && opponentMove) {
            Result(playerMove, opponentMove);
        }
    }, [playerMove, opponentMove]);

    const Result = (playerMove, opponentMove) => {
        let result = 'Draw!';

        if (playerMove === opponentMove) {
            result = 'Draw!';
        }
        if (playerMove === 'ROCK') {
            if (opponentMove === 'SCISSORS') {
                result = 'p1 wins!';
            }
            if (opponentMove === 'PAPER') {
                result = 'p2 wins!';
            }
        }
        if (playerMove === 'SCISSORS') {
            if (opponentMove === 'ROCK') {
                result = 'p2 wins!';
            }
            if (opponentMove === 'PAPER') {
                result = 'p1 wins!';
            }
        }
        if (playerMove === 'PAPER') {
            if (opponentMove === 'ROCK') {
                result = 'p1 wins!';
            }
            if (opponentMove === 'SCISSORS') {
                result = 'p2 wins!';
            }
        }

        Alert.alert(result, 'GAME OVER', [
            {
                text: 'Close',
                onPress: () => {
                    navigation.navigate('Home');
                },
            },
        ]);
    };



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
