import React, {useEffect, useState} from 'react';
import {Button, FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IP_URL from "../services/IP";
import {getData, storeData} from "./HomePage";


const StartGame = async () => {
    try {
        const response = await fetch(IP_URL + '/games/start', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": await getData('token'),
            },
        });

        if (response.ok) {
            const data = await response.json();
            if (!data) {
                throw new Error('Empty response');
            }
            return data;
        } else {
            throw new Error('Failed to start game');
        }
    } catch (error) {
        console.error(error.message);
    }
};

const JoinGame = async (gameid) => {
    try {
        const response = await fetch(IP_URL + `/join/${gameid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: await getData('token'),
                gameId: gameid,
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
            token: await getData('token'),

        });

        if (response.ok) {
            const gameList = await response.json();
            return gameList.map(game => ({
                gameid: game.uuid,
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
                await storeData('gameid', response);
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
            await JoinGame(gameid);
            await storeData('gameid', gameid);
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

