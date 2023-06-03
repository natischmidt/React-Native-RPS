import React, { useEffect, useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IP_URL from '../services/IP';
import { getData, storeData } from './HomePage';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ImageBackground} from "react-native";

const StartGame = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.post(`${IP_URL}/games/start`, null, {
            headers: {
                'Content-Type': 'application/json',
                token,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};



const JoinGame = async (gameId) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${IP_URL}/games/join/${gameId}`, {
            headers: {
                'Content-Type': 'application/json',
                token,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};


const GamePage = () => {
    const navigation = useNavigation();
    const [openGames, setOpenGames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const GameList = async () => {
        try {
            const token = await getData('token');
            const response = await axios.get(`${IP_URL}/games/listAll`, {
                headers: {
                    token,
                },
            });

            if (response.status === 200) {
                const gameList = response.data;
                setOpenGames(gameList);
            } else {
                throw new Error('Failed to fetch game list');
            }
        } catch (error) {
            console.error(error.message);
        }


    }

    useEffect(() => {
        const interval = setInterval(() => {
            GameList();
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleStartGame = async () => {
        await StartGame().then((response) => {
            console.log(response.data)
            storeData('gameid', response.gameStatusId);
            console.log('Started Game');
            navigation.navigate('Game');
        });
    };

    const handleJoin = async (gameid) => {
        await JoinGame(gameid).then((response) => {
            console.log(response);
            storeData('gameid', response.gameStatusId);
            console.log('Navigating to Game');
            navigation.navigate('Game');
        });
    };

    const renderList = ({ item }) => {
        return (
            <View style={styles.gameItem}>
                <Text>{item.gameStatusId}</Text>
                <Button title="Join" onPress={() => handleJoin(item.gameStatusId)} />
            </View>
        );
    };

    return (
        <View>
            <ImageBackground source={require('../assets/bg3.jpg')} resizeMode="cover" style={styles.background}>
            <Button title="Start Game" onPress={handleStartGame} />
            <Button title="Join Game" onPress={() => setModalVisible(true)} />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text>Choose a game to join:</Text>
                    <FlatList
                        data={openGames}
                        renderItem={renderList}
                        keyExtractor={(item) => item.gameStatusId}
                    />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    background: {
        width: '100%',
        height: '100%',
    },
    gameItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default GamePage;
