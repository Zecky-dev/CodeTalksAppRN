import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

// Pages
import Room from '../pages/Room/Room';

const RoomStackRouter = ({route}) => {
    const room = route.params.room;
    return (
        <Stack.Navigator initialRouteName="Room">
            <Stack.Screen name="Room" component={Room} initialParams={route.params} options={{headerTitle:room.roomName}}/>
        </Stack.Navigator>
    )
    
}

export default RoomStackRouter;