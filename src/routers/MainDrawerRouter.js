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

// Firebase auth
import auth from '@react-native-firebase/auth';


const MainDrawer = ({navigation}) => (
    <Drawer.Navigator
    initialRouteName="HomePage"
    screenOptions={{
        drawerPosition:'right',
        drawerType:'slide',
        headerLeft:false,
        headerTitleAlign:'center',
        headerStyle: {
            backgroundColor: colors.primary,
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
            label="Çıkış Yap"
            icon={() => <Icon name='power' size={28} color='red'/>} 
            onPress={() => {
                auth().signOut();
                console.log('Çıkış yapıldı.');
            }}/>
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="HomePage" component={Main} options={{
            title: 'Anasayfa',
            drawerIcon: () => (<Icon name='home' size={28}/>),
        }}/>
        <Drawer.Screen name="ProfilePage" component={Profile} options={{
            title: 'Profil',
            drawerIcon: () => (<Icon name='account' size={28}/>)
        }}/>
    </Drawer.Navigator>
);

export default MainDrawer;