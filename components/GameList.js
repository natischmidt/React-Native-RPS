import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP_URL from '../services/IP';

const GameList = () => {
    const [openGames, setOpenGames] = useState([]);

    useEffect(() => {
        const fetchGameList = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
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
        };

        const interval = setInterval(fetchGameList, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

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
            <FlatList
                data={openGames}
                renderItem={renderList}
                keyExtractor={(item) => item.gameStatusId}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default GameList;
