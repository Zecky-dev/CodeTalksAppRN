import React, { useState, useEffect } from 'react';
import {View,Text,Image} from 'react-native';

import styles from './Profile.style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = () => {
    const [user,setUser] = useState();

    useEffect(
        () => {
            const currentUser = auth().currentUser;
            const username = currentUser.email.split('@')[0];
            const {emailVerified,phoneNumber} = currentUser;
            const getUser = async () => {
                const userResp = await firestore().collection('Users').doc(username).get();
                setUser({...userResp.data(),emailVerified,phoneNumber});
            }
            getUser();
        }, []
    )
    
    return user
    ? (
        <View style={styles.container}>
            <Image source={user.photoURL ? {uri: user.photoURL} : require('../../assets/images/default_avatar.png')} style={styles.profilePhoto}/>
            <View style={styles.infoContainer}>
                <View style={styles.fieldContainer}>
                    <Icon name='account' size={32} color='#0F52BA'/>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
                <View style={styles.fieldContainer}>
                    <Icon name='email' size={32} color='orange'/>
                    <View style={styles.emailField}>
                        <Text style={styles.email}>{user.email}</Text>
                        <Text style={user.emailVerified ? styles.emailVerified : styles.emailNotVerified}>{user.emailVerified ? 'Onaylı' : 'Onaysız'}</Text>
                    </View>
                </View>
                <View style={styles.fieldContainer}>
                    <Icon name='phone' size={32} color='green'/>
                    <Text style={styles.phoneNumber}>{user.phoneNumber ? user.phoneNumber : 'Kayıtlı numara yok'}</Text>
                </View>
                
            </View>
            
        </View>
    ) 
    : (<View><Text>Test</Text></View>)
    
};

export default Profile;