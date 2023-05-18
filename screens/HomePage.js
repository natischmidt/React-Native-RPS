import React, {useEffect} from 'react';
import IP_URL from "../services/IP";
import AsyncStorage from '@react-native-async-storage/async-storage';



const getToken = async () => {
    try {
        const response = await fetch(IP_URL + '/user/token');
        const json = await response.json();
        return json.toString();
    } catch (error) {
        console.error(error);
    }
};

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
            .then(() => console.log(key  + value ))

    } catch (e) {
        console.log(e.message())
    }
}

export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch(e) {
        console.log(e.message())
    }
}


const HomePage = () => {

    useEffect(() => {
        getToken().then( token => {
            storeData('token', token)
                .then();
        })
    }, []);

    return (

        //homepage design
    )


};

export default HomePage;