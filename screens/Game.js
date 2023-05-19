import React, {useEffect, useState} from "react";
import IP_URL from "../services/IP";
import {getData} from "./HomePage";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";






const MakeMove = async (token, sign) => {
    try {
        return fetch(IP_URL + '/games/move/{sign}', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token,
                gameId: await getData('gameId'),
                sign: sign
            },
        })
            .then((response) => response.json())
    } catch (error) {
        console.log(error.message)
    }
}

const Game = () => {

    const [player, setPlayer] = useState('');
    const [playerMove, setPlayerMove] = useState('');
    const [opponent, setOpponent] = useState('');
    const [opponentMove, setOpponentMove] = useState('');
    const [result, setResult] = useState('');



    const HandleMove = async (token, move) => {
        await MakeMove(token, move)
            .then(async () => console.log());
    };


    return (
        <View style={styles.container}>
            <View style={styles.choicesContainer}>

                <TouchableOpacity style={[styles.button, styles.choiceButton]} onPress={() => choose('rock')} id="rock">
                    <Image source={require('../images/rock.png.bmp')} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.choiceButton]} onPress={() => choose('scissors')} id="scissor">
                    <Image source={require('../images/scissor.png.bmp')} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.choiceButton]} onPress={() => choose('paper')} id="paper">
                    <Image source={require('../images/paper.png.bmp')} style={[styles.image, styles.choiceImage]} />
                </TouchableOpacity>
            </View>
        </View>
    )


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

