import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
            .then(() => console.log(key  + value ))

    } catch (error) {
        console.log(error.message())
    }
}

export const getData = async (key) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch(e) {
        console.log(e.message())
    }
}
