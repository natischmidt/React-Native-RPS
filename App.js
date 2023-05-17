// import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import Cards from "./memory wip/Cards";
// // import Login from "./memory wip/Login";
//
// // const Stacked = createNativeStackNavigator();
//
// export default function App() {
//
//     return (
//         <NavigationContainer>
//             <Stacked.Navigator>
//                 <Stacked.Screen name='Login' component={Login}/>
//                 <Stacked.Screen name='Cards' component={Cards}/>
//             </Stacked.Navigator>
//         </NavigationContainer>
//
//     );
// }

import React from 'react';
import { View } from 'react-native';
import LoginPage from './screens/LoginPage';

const App = () => {
    return (
        <View>
            <LoginPage />
        </View>
    );
};

export default App;
