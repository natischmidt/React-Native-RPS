import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import images from './images';
import {useState} from "react";

export default function App() {

    const [cards, setCards] = useState(...images,...images);

    return (
        <View style={styles.container}>
            <Text> memory game </Text>
            <div>
                <div className="board">
                    {cards.map((card, index) => (
                        <div className="cards-outline" key={index}>
                            <div className="cards">
                                <div className="card-front">
                                    <img src={card} alt="" />
                                </div>
                                <div className="card-back"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
});
