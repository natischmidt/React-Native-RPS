import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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
        width: 'calc(100vh - 240px)',
        maxWidth: 'calc(100vw - 40px)',
        display: 'grid',
        gridGap: 10,
        margin: 'auto',
        gridTemplateColumns: 'repeat(6, 1fr)',
    },
    cardOutline: {
        perspective: 1000,
        height: 'calc((100vh - 290px) / 6)',
        maxHeight: 'calc((100vw - 90px) / 6)',
    },
    card: {
        borderRadius: 5,
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: [{ rotateY: '180deg' }],
        transformStyle: 'preserve-3d',
        transitionDuration: '0.3s',
    },
    cardFront: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    cardImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    cardBack: {
        width: '100%',
        height: '100%',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});
