import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP_URL from '../services/IP';

const JoinGame = async (gameId) => {
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

export default JoinGame;
