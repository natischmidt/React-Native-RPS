import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";
import GamePage from "./screens/GamePage";
import HomePage from "./screens/HomePage";
import Game from "./screens/Game";
import {AuthProvider} from "./context/AuthContext";



const Stacked = createNativeStackNavigator();

export default function App () {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stacked.Navigator>
                    <Stacked.Screen name='HomePage' component={HomePage}/>
                    <Stacked.Screen name='LoginPage' component={LoginPage}/>
                    <Stacked.Screen name='GamePage' component={GamePage}/>
                    <Stacked.Screen name='Game' component={Game}/>
                </Stacked.Navigator>
            </NavigationContainer>
        </AuthProvider>

    );
};


