import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const GameButton = ({ handleMove, status }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>{status}</Text>
            <View style={styles.choicesContainer}>
                <TouchableOpacity onPress={() => handleMove("ROCK")}>
                    <Image source={require("../images/rock.png.bmp")} style={[styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("SCISSOR")}>
                    <Image source={require("../images/scissor.png.bmp")} style={[styles.choiceImage]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleMove("PAPER")}>
                    <Image source={require("../images/paper.png.bmp")} style={[styles.choiceImage]} />
                </TouchableOpacity>
            </View>
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
        marginTop: 20,
    },
    choiceImage: {
        marginTop: 90,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
    resultText: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 150,
    },
});

export default GameButton;
