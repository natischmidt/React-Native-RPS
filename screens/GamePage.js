import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';


const GamePage = () => {

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

