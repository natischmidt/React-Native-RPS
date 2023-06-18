import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP_URL from '../services/IP';

const StartGame = async () => {
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

export default StartGame;
