import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import {View,Text, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// Import pages
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';

// Flash message
import FlashMessage, { showMessage } from 'react-native-flash-message';

// Firebase auth
import auth from '@react-native-firebase/auth';
import { createErrorMessage, icon } from './utils/functions';

// Custom components
import CustomButton from './components/CustomButton/CustomButton';

// Routers
import MainDrawerRouter from './routers/MainDrawerRouter';
import RoomStackRouter from './routers/RoomStackRouter';


const App = () => {
    const [user,setUser] = useState();
    function onAuthStateChanged(user){
        setUser(user);
    }

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged)
    },[]);

    const AuthStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={Login} options={{headerShown:false}}/>
            <Stack.Screen name="SignupScreen" component={Signup} options={{headerShown:false}}/>
        </Stack.Navigator>
    )

    const MainStack = () => (
        <Stack.Navigator>
            <Stack.Screen name="MainScreen" component={MainDrawerRouter} options={{headerShown:false}}/>
            <Stack.Screen name="RoomScreen" component={RoomStackRouter} options={{headerShown:false}}/>
        </Stack.Navigator>   
    )

    

    return (
        <NavigationContainer>
            {
                !user
                ? <AuthStack/>
                : <MainStack/>
            }
            <FlashMessage position="top"/>
        </NavigationContainer>        
    );
};

export default App;