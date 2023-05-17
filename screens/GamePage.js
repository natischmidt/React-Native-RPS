import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const GamePage = () => {

    const choose = (choice) => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.score}>
                    <View style={styles.playerScore}></View>
                    <View style={styles.opponentScore}></View>
                </View>

                <View style={styles.scoreboard}>
                    <TouchableOpacity style={styles.restart}></TouchableOpacity>
                </View>

                <View style={styles.playerOpponent}>

                    <View style={styles.playerchoice} id="player1">
                        <Text style={styles.playerchoice} id="player1Name">
                        </Text>

                    </View>
                    <View style={styles.opchoice} id="player2">
                        <Text style={styles.opchoice} id="player2Name">
                        </Text>
                    </View>
                </View>

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    body: {

    },
    score: {

    },
    playerScore: {

    },
    opponentScore: {

    },
    scoreboard: {

    },
    restart: {

    },
    playerOpponent: {

    },
    playerchoice: {

    },
    player1: {

    },
    opchoice: {

    },
    player2: {

    },
    choicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {

    },
    choiceButton: {
        width: 130,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
    },
    choiceImage: {
        marginTop: 400,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
});

export default GamePage;

