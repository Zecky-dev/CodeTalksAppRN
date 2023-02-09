import React from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Import pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import FlashMessage from 'react-native-flash-message';


const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginScreen" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="SignupScreen" component={Signup} options={{headerShown:false}}/>
            </Stack.Navigator>
            <FlashMessage position="top"/>
        </NavigationContainer>        
    );
};

export default App;