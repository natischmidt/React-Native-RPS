import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {Rps} from "../services/API";

const GamePage = () => {
    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        const startInterval = setInterval(() => {
            Rps.getGameInfoFromGame(Rps.getGameId())
                .then(game => {
                    setGameInfo(game);
                    if (game.playerOne !== null && game.playerTwo !== null) {
                        clearInterval(startInterval);
                        waitingForMove();
                    }
                })
                .catch(error => console.log(error));
        }, 500);
    }, []);

    const waitingForMove = async () => {
        clearInterval(startInterval);
        await refreshFn();
        const timer = setInterval(() => {
            getGameInfo()
                .then(game => {
                    if (game.playerMove !== null && game.opponentMove !== null) {
                        refreshFn();
                        checkResult(
                            game.player1.username,
                            game.player2.username,
                            game.playerMove,
                            game.opponentMove
                        );
                        clearInterval(timer);
                    }
                })
                .catch(error => console.log(error));
        }, 1000);
    };

    const refreshFn = async () => {
        const response = await getGameInfo();
        console.log('refreshed data', response);
        const { opponentMove: player2Move, playerMove: player1Move, gameStatus } = response;

        console.log(player2Move, player1Move);
        if (player1Move) {
            console.log('Update player1 move:', player1Move);
        }

        if (player2Move) {

            console.log('Update player2 move:', player2Move);
        }


    };

    const checkResult = (playerOne, playerTwo, playerMove, opponentMove) => {

    };
    const choose = (choice) => {

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
    container: {},
    body: {},
    score: {},
    playerScore: {},
    opponentScore: {},
    scoreboard: {},
    restart: {},
    playerOpponent: {},
    playerchoice: {},
    player1: {},
    opchoice: {},
    player2: {},
    choicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {},
    choiceButton: {
        width: 130,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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

