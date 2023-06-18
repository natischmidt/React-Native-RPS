import React from 'react';
import { View, Text, Button } from 'react-native';

const GameList = ({ games, handleJoin }) => {
    const renderList = () => {
        if (games.length === 0) {
            return <Text>No open games available</Text>;
        }

        return games.map((game) => (
            <View key={game.gameStatusId}>
                <Text>{game.gameStatusId}</Text>
                <Button title="Join" onPress={() => handleJoin(game.gameStatusId)} />
            </View>
        ));
    };

    return <View>{renderList()}</View>;
};

export default GameList;
