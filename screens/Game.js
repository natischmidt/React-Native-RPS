import React, {  useState } from "react";
import IP_URL from "../services/IP";
import { getData } from "./HomePage";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MakeMove = async (token, sign) => {
    try {
        const response = await fetch(IP_URL + "/games/move/" + sign, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
            },
            body: JSON.stringify({
                gameid: await getData("gameid"),
                sign: sign,
            }),
        });

        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to make the move.");
        }
    } catch (error) {
        console.log(error.message);
    }
};

const Game = () => {
    const [player, setPlayer] = useState("");
    const [playerMove, setPlayerMove] = useState("");
    const [opponent, setOpponent] = useState("");
    const [opponentMove, setOpponentMove] = useState("");
    const [result, setResult] = useState("");

    // const handleMove = async (token, move) => {
    //     // await MakeMove(token, move).then(() => console.log());
    //     await MakeMove(token, move).then((response) => {
    //         console.log(response);
    //
    //         setPlayerMove(response.player_move);
    //         setOpponentMove(response.opponent_move);
    //         setResult(response.result);
    //
    //     });
    // };
    const handleMove = async (token, move) => {
        try {
            const response = await MakeMove(token, move);
            console.log(response);

            if (response.player_move && response.opponent_move && response.result) {
                setPlayerMove(response.playerMove);
                setOpponentMove(response.opponentMove);
                setResult(response.result);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.choicesContainer}>
                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={async () => handleMove(await getData("token"), "rock")}
                >
                    <Image
                        source={require("../images/rock.png.bmp")}
                        style={[styles.image, styles.choiceImage]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={async () => handleMove(await getData("token"), "scissors")}
                >
                    <Image
                        source={require("../images/scissor.png.bmp")}
                        style={[styles.image, styles.choiceImage]}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.choiceButton}
                    onPress={async () => handleMove(await getData("token"), "paper")}
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
    container: {
    },
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