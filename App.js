import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";
import GamePage from "./screens/GamePage";
import HomePage from "./screens/HomePage";
import Game from "./screens/Game";

const Stacked = createNativeStackNavigator();

export default function App () {
    return (

            <NavigationContainer>
                <Stacked.Navigator>

                    <Stacked.Screen name='RPS' component={HomePage}/>
                    <Stacked.Screen name='Login' component={LoginPage}/>
                    <Stacked.Screen name='Choose Game' component={GamePage}/>
                    <Stacked.Screen name='Game' component={Game}/>
                </Stacked.Navigator>
            </NavigationContainer>


    );
};


