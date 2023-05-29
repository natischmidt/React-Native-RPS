import React, { useState } from "react";
import axios from 'axios';
import IP_URL from "../services/IP";
import { getData } from "./HomePage";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MakeMove = async (token, gameContainer, sign) => {
    try {
        return fetch(IP_URL + `/games/move/${sign}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token,
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

    const handleMove = async (sign) => {


        try {
            const gameid = await getData("gameid");


            const response = await axios.get(IP_URL + `/games/` + gameid
                , {
                    headers: {
                        token: await getData('token'),
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
            <View style={styles.choicesContainer}>
                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={() => handleMove("rock")}
                >
                    <Image
                        source={require("../images/rock.png.bmp")}
                        style={[styles.image, styles.choiceImage]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={() => handleMove("scissors")}
                >
                    <Image
                        source={require("../images/scissor.png.bmp")}
                        style={[styles.image, styles.choiceImage]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={() => handleMove("paper")}
                >
                    <Image
                        source={require("../images/paper.png.bmp")}
                        style={[styles.image, styles.choiceImage]}
                    />
                </TouchableOpacity>
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
    choiceButton: {
        width: 130,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {},
    choiceImage: {
        marginTop: 400,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
});

export default Game;
