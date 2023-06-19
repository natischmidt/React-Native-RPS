import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import IP_URL from "./IP";

export const getToken = async () => {

    try {
        const response = await fetch(IP_URL + '/players/auth/token');
        const json = await response.json();
        return json.toString();
    } catch (error) {
        console.error(error);
    }
};
export const StartGame = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.post(`${IP_URL}/games/start`, null, {
            headers: {
                'Content-Type': 'application/json',
                token,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const JoinGame = async (gameId) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.get(`${IP_URL}/games/join/${gameId}`, {
            headers: {
                'Content-Type': 'application/json',
                token,
            },
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const MakeMove = async (sign) => {
    try {
        const token = await AsyncStorage.getItem('token');

        const response = await axios.post(
            IP_URL + '/games/move/' + sign,
            null,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                }
            }
        );

        if (response.status !== 200) {
            console.error(response);
            throw new Error('Failed to make a move');
        }

        export const moveResponse = response.data;


    } catch (error) {
        console.log(error);
    }
};
