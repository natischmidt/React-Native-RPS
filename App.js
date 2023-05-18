import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from "./screens/LoginPage";
import GamePage from "./screens/GamePage";
import {HomePage} from "./screens/HomePage";




const Stacked = createNativeStackNavigator();

export default function App () {
    return (
        <NavigationContainer>
           <Stacked.Navigator>
               <Stacked.Screen name='Home' component={HomePage}/>
           <Stacked.Screen name='Login' component={LoginPage}/>
          <Stacked.Screen name='Cards' component={GamePage}/>
          </Stacked.Navigator>
        </NavigationContainer>
    );
};


