import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cards from "./Cards";
import Login from "./Login";

const Stacked = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stacked.Navigator>
                <Stacked.Screen name='Login' component={Login}/>
                <Stacked.Screen name='Cards' component={Cards}/>
            </Stacked.Navigator>
        </NavigationContainer>

    );
}