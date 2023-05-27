import React, {createContext, useState,useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export const AuthContext =  createContext();

export const AuthProvider = (children) => {

    const [isLoading,setIsLoading] = useState(true);
    const [userToken,setUserToken] = useState(null);

    const login = (username,password) => {
        setIsLoading(true);
        axios.post(`http://localhost:8080/auth/authenticate`, {
            username,
            password
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
             console.log(err);
            })
        // setUserToken('testing');
        // AsyncStorage.setItem('userToken',userToken);
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
    }

    const isLoggedIn = async() =>{
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        } catch (err) {
            console.log("is logged in", + err);
        }

    }

    useEffect(() => {
     isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{login,logout, isLoading, userToken}}>

            {children}

        </AuthContext.Provider>

    );

}

