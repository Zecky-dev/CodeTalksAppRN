import React from 'react';

// Drawer navigator
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

// Pages
import Main from '../pages/Main/Main';
import Profile from '../pages/Profile/Profile';

// Drawer button requirements
import { Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Navigation header style
import colors from '../assets/colors';


const MainDrawer = ({navigation}) => (
    <Drawer.Navigator
    initialRouteName="HomePage"
    screenOptions={{
        drawerPosition:'right',
        drawerType:'slide',
        headerLeft:false,
        headerTitleAlign:'center',
        headerStyle: {
            backgroundColor: colors.secondary,
        },
        headerTintColor: 'white',
        headerRight: () => (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{padding:8,}}>
            <Icon name='menu' size={32} color='white'/>
        </Pressable>
        )
    }}  
    drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
            label="Logout"
            icon={() => <Icon name='power' size={28} color='red'/>} 
            onPress={() => console.log('Test')}/>
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="HomePage" component={Main} options={{
            title: 'Home',
            drawerIcon: () => (<Icon name='home' size={28}/>),
        }}/>
        <Drawer.Screen name="ProfilePage" component={Profile} options={{
            title: 'Profile',
            drawerIcon: () => (<Icon name='account' size={28}/>)
        }}/>
    </Drawer.Navigator>
);

export default MainDrawer;