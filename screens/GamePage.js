import React, { useEffect, useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IP_URL from '../services/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JoinGame = async (gameid, jwtToken, playerToken) => {
    try {
        const response = await fetch(IP_URL + `/join/${gameid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
                'playerid': playerToken,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.uuid;
        } else {
            throw new Error('Failed to join game');
        }
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

const GamePage = () => {
    const navigation = useNavigation();
    const [openGames, setOpenGames] = useState([]);
    const [updatedGames, setUpdatedGames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchGameList();
    }, [updatedGames]);

    const fetchGameList = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const response = await fetch(IP_URL + '/games', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const gameList = await response.json();
                setOpenGames(gameList);
            } else {
                throw new Error('Failed to fetch game list');
            }
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const handleStartGame = async () => {
        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const response = await fetch(IP_URL + '/start-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('gameid', data);
                navigation.navigate('Game');
            } else {
                throw new Error('Failed to start game');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleJoin = async (gameid) => {
        try {
            const jwtToken = await AsyncStorage.getItem('jwtToken');
            const playerToken = await AsyncStorage.getItem('token');
            await JoinGame(gameid, jwtToken, playerToken);
            await AsyncStorage.setItem('gameid', gameid);
            navigation.navigate('Game');
            setUpdatedGames((prevState) => [...prevState, Date.now()]);
        } catch (error) {
            console.error(error);
        }
    };

    const renderList = ({ item }) => {
        return (
            <View style={styles.gameItem}>
                <Text>{item.gameid}</Text>
                <Button title="Join" onPress={() => handleJoin(item.gameid)} />
            </View>
        );
    };

    return (
        <View>
            <Button title="Start Game" onPress={handleStartGame} />
            <Button title="Join Game" onPress={() => setModalVisible(true)} />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text>Choose a game to join:</Text>
                    <FlatList
                        data={openGames}
                        renderItem={renderList}
                        keyExtractor={(item) => item.gameid.toString()}
                    />
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
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
    gameItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default GamePage;
