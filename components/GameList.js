import React from 'react';
import { FlatList, View, Text, Button } from 'react-native';

const GameList = ({ openGames, handleJoin }) => {
    const renderList = ({ item }) => {
        return (
            <View>
                <Text>{item.gameStatusId}</Text>
                <Button title="Join" onPress={() => handleJoin(item.gameStatusId)} />
            </View>
        );
    };

    return (
        <FlatList
            data={openGames}
            renderItem={renderList}
            keyExtractor={(item) => item.gameStatusId}
        />
    );
};

export default GameList;
