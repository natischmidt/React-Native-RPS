import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";
import GamePage from "./screens/GamePage";
import HomePage from "./screens/HomePage";



const Stacked = createNativeStackNavigator();

export default function App () {
    return (
        <NavigationContainer>
           <Stacked.Navigator>
               <Stacked.Screen name='HomePage' component={HomePage}/>
               <Stacked.Screen name='LoginPage' component={LoginPage}/>
               <Stacked.Screen name='GamePage' component={GamePage}/>
          </Stacked.Navigator>
        </NavigationContainer>
    );
};


