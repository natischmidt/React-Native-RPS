import AsyncStorage from '@react-native-async-storage/async-storage';



export const Rps = {
    setToken: async (token) => {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            console.log('Error setting token:', error);
        }
    },
    getTokenFromStorage: async () => {
        try {
            return await AsyncStorage.getItem('token');
        } catch (error) {
            console.log('Error getting token from storage:', error);
            return null;
        }
    },
    setGameIdStorage: async (gameID) => {
        try {
            await AsyncStorage.setItem('gameId', gameID);
        } catch (error) {
            console.log('Error setting gameId:', error);
        }
    },
    getGameId: async () => {
        try {
            return await AsyncStorage.getItem('gameId');
        } catch (error) {
            console.log('Error getting gameId:', error);
            return null;
        }
    },
    setUsername: async (username) => {
        try {
            await AsyncStorage.setItem('username', username);
        } catch (error) {
            console.log('Error setting username:', error);
        }
    },
    getUsername: async () => {
        try {
            return await AsyncStorage.getItem('username');
        } catch (error) {
            console.log('Error getting username:', error);
            return null;
        }
    },

    getToken: () => {
        return fetch(`http://localhost:8080/auth/token`)
            .then(response => response.json())
            .then(response => Rps.setToken(response))
            .then(text => console.log(text))
            .catch(error => console.log('Error getting token:', error));
    },

    setPlayerName: (name) => {
        return fetch('', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': Rps.getTokenFromStorage()
            },
            body: JSON.stringify({ username: name })
        })
            .then(response => response.json())
            .then(response => Rps.setUsername(response.username))
            .catch(error => console.log('Error setting player name:', error));
    },

    getPlayerName: () => {
        return fetch('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': Rps.getTokenFromStorage()
            },
        })
            .then(response => response.json())
            .then(response => {
                console.log('getPlayerName', response);
                return response.username;
            })
            .catch(error => console.log('Error getting player name:', error));
    },

    createNewGame: () => {
        return fetch('', {
            method: 'POST',
            headers: {
                'token': Rps.getTokenFromStorage(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch(error => console.log('Error creating new game:', error));
    },

    getListOfOpenGames: () => {
        return fetch('')
            .then(response => {
                console.log('getListOfOpenGames', response);
                return response.json();
            })
            .catch(error => console.log('Error getting list of open games:', error));
    },

    getGameInfoFromGame: (gameToken) => {
        return fetch(`http://localhost:8080/games/${gameToken}`, {
            method: 'GET',
            headers: {
                'token': Rps.getTokenFromStorage(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .catch(error => console.log('Error getting game info from game:', error));
    },

    joinGame: (gameToken) => {
        return fetch(`http://localhost:8080/join/${gameToken}`, {
            headers: {
                'token': Rps.getTokenFromStorage(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => console.log(response.text()))
            .catch(error => console.log('Error joining game:', error));
    },

    gameInfo: (gameId) => {
        return fetch(`http://localhost:8080/games/result/${gameId}`, {
            headers: {
                'Content-Type': 'application-json',
                'token': Rps.getTokenFromStorage()
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(error => console.log('Error getting game info:', error));
    },

    makeMove: (move) => {
        return fetch(`http://localhost:8080/games/move/${move}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': Rps.getTokenFromStorage()
            },
            body: JSON.stringify({ gamestatusid: Rps.getGameId() })
        })
            .then(response => response.json())
            .catch(error => console.log('Error making move:', error));
    }
};


const initializeToken = async () => {
    const token = await Rps.getTokenFromStorage();
    if (!token) {
        await Rps.getToken();
    }
};


initializeToken().catch(error => {
    console.log('Error initializing token:', error);
});