import React, { useEffect, useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IP_URL from '../services/IP';
import { getData, storeData } from './HomePage';



const StartGame = async () => {
    try {
        return fetch(IP_URL + '/games/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: await getData('token'),
            },
        }).then((response) => response.json());
    } catch (err) {
        console.log(err.message);
    }
};

const JoinGame = async (gameid) => {
    try {
        return fetch(IP_URL + '/join/' + gameid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: await getData('token'),
                gameid: gameid,
            },
        }).then((response) => response.json());
    } catch (err) {
        console.log(err.message);
    }
};



const GamePage = () => {
    const navigation = useNavigation();
    const [openGames, setOpenGames] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);



    const GameList = async () => {
        try {
            const response = await fetch(IP_URL + '/games', {
                method: 'GET',
                headers: {
                    token: await getData('token'),
                },
            });

            if (response.ok) {
                const gameList = await response.json();
                setOpenGames(gameList.map((game) => ({ gameid: game.uuid })));
            } else {
                throw new Error('Failed to fetch game list');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            GameList();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    const handleStartGame = async () => {
        await StartGame().then((response) => {
            console.log(response);
            storeData('gameid', response.uuid);
            console.log('Started Game');
            navigation.navigate('Game');
        });
    };

    const handleJoin = async (gameid) => {
        await JoinGame(gameid).then((response) => {
            console.log(response);
            storeData('gameid', response.uuid);
            console.log('Navigating to Game');
            navigation.navigate('Game');

        });
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
