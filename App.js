import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import images from './images';
import {useState} from "react";


export default function App() {

    const [cards, setCards] = useState([...images,...images]);

    return (
        <View style={styles.container}>
            <Text> memory game </Text>
            <View>
                <View style={styles.board}>
                    {cards.map((card, index) => (
                        <View style={styles.cardOutline} key={index}>
                            <View style={styles.card}>
                                <View style={styles.cardFront}>
                                    <Image source={card} style={styles.cardImage} />
                                </View>
                                <View style={styles.cardBack}></View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c181b1',
    alignItems: 'center',
    justifyContent: 'center',
  },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    cardOutline: {
         width: '30%',
        aspectRatio: 1,
        padding: 10,
    },
    card: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardFront: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardImage: {

        flex:1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardBack: {
        flex: 1,
        backgroundColor: '#333333',
        borderRadius: 10,
    },
});
