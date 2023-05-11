import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";

export default function Login() {
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const login = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.Text}>LOG IN</Text>
            </View>

            <View style={styles.main}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.textfield}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Enter username"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.textfield}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Enter password"
                    secureTextEntry
                />
                {!isLoading ? (
                    <Button onPress={login} title="Enter" color="#e16ecf"/>
                ) : (
                    <ActivityIndicator size="large" color="#ff00d9"/>
                )}
            </View>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#debdd1',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
    },
    main: {
        paddingHorizontal: 20,
    },
    label: {
        marginBottom: 10,
    },
    textfield: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
};

