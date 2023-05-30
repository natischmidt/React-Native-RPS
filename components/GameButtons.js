import {StyleSheet} from "react-native";

const {TouchableOpacity, Image, View} = require("react-native");
const React = require("react");





export const GameButtons = ({handleMove}) => {
    return(
        <View style={styles.choicesContainer}>
            <TouchableOpacity onPress={() => handleMove("rock")}>
                <Image source={require("../images/rock.png.bmp")}
                       style={[styles.image, styles.choiceImage]}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleMove("scissors")}
            >
                <Image
                    source={require("../images/scissor.png.bmp")}
                    style={[styles.image, styles.choiceImage]}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleMove("paper")}
            >
                <Image
                    source={require("../images/paper.png.bmp")}
                    style={[styles.image, styles.choiceImage]}
                />
            </TouchableOpacity>
    </View>
    );

}
const styles = StyleSheet.create({

    choicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    image: {},
    choiceImage: {
        marginTop: 50,
        width: 150,
        height: 180,
        resizeMode: 'contain',
    },
});


