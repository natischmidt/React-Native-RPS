import React, {useEffect, useState} from 'react';
import IP_URL from "../services/IP";
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {getData, storeData} from "./HomePage";


const StartGame = async () => {
    try {
        return fetch(IP_URL + '/games/start', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: await getData('token'),
            },
        })
            .then((response) => response.json())
    }catch (error) {
        console.log(error.message)
    }
}

const JoinGame = async (gameId) => {
    try {
        return fetch(IP_URL + '/join/{gameId}', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: await getData('token'),
                gameId: gameId,
            },
        })
            .then((response) => response.json())
    }catch (error) {
        console.log(error.message)
    }
}


const GameList = async () => {
    try {
        return fetch(IP_URL + '/games', {
            method: "GET",
        })
            .then((response) => response.json())
    }catch (error) {
        console.log(error.message)
    }
}


const GamePage = () => {

    const [openGames, setOpenGames] = useState([]);
    const [updatedGames, setUpdatedGames] = useState([]);


    useEffect(() => {
        GameList()
            .then((game) => {
                setOpenGames(game);
            })
            .catch((error) => console.log(error.message))
    }, [updatedGames]);


    const handleStartGame = async () => {
        await StartGame()
            .then( (response) => {
                storeData('gameId', response.gameStatusId);
                //wip
            })
    };

    const handleJoin = async (gameId) => {
        await JoinGame(gameId)
            .then(() => {
                storeData('gameId',gameId);
                //wip
            });
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

export default GamePage;

