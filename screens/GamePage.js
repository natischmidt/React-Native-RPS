import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IP_URL from "../services/IP";
import { getData, storeData } from "./HomePage";

const StartGame = async () => {
    try {
        const response = await fetch(IP_URL + '/games/start', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: await getData('token'),
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.uuid;
        } else {
            throw new Error('Failed to start game');
        }
    } catch (error) {
        console.error(error.message);
    }
};

const JoinGame = async (gameId) => {
    try {
        const response = await fetch(IP_URL + `/join/${gameId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: await getData('token'),
                gameId: gameId,
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
    }
};

const GameList = async () => {
    try {
        const response = await fetch(IP_URL + '/games', {
            method: "GET",
        });

        if (response.ok) {
            const gameList = await response.json();
            return gameList.map(game => ({
                gameId: game.uuid,
            }));
        } else {
            throw new Error('Failed to fetch game list');
        }
    } catch (error) {
        console.error(error.message);
    }
};

const GamePage = () => {
    const navigation = useNavigation();
    const [openGames, setOpenGames] = useState([]);
    const [updatedGames, setUpdatedGames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        GameList()
            .then((game) => {
                setOpenGames(game);
            })
            .catch((error) => console.log(error.message));
    }, [updatedGames]);

    const handleStartGame = async () => {
        try {
            const response = await StartGame();
            console.log(response);
            if (response) {
                await storeData('gameId', response);
                navigation.navigate('Game');
            } else {
                throw new Error('Failed to start game');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleJoin = async (gameId) => {
        try {
            await JoinGame(gameId);
            await storeData('gameId', gameId);
            navigation.navigate('Game');
            setUpdatedGames((prevState) => [...prevState, Date.now()]);
        } catch (error) {
            console.error(error);
        }
    };

    const renderList = ({ item }) => {
        return (
            <View style={styles.gameItem}>
                <Text>{item.gameId}</Text>
                <Button title="Join" onPress={() => handleJoin(item.gameId)} />
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
                        keyExtractor={(item) => item.gameId.toString()}
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
