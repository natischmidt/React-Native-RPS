import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const renderList = ({ item, handleJoin }) => {
    return (
        <View style={styles.gameItem}>
            <Text>{item.gameStatusId}</Text>
            <Button title="Join" onPress={() => handleJoin(item.gameStatusId)} />
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

export default renderList;
