import React, { useState, useEffect } from 'react';
import {View,Text,Image, Pressable} from 'react-native';

import styles from './Profile.style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomButton/CustomButton';

const Profile = () => {
    const [user,setUser] = useState();
    const [profileEdit,setProfileEdit] = useState(false);
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');


    useEffect(
        () => {
            const currentUser = auth().currentUser;
            const username = currentUser.email.split('@')[0];
            const {email,emailVerified,phoneNumber,photoURL,displayName} = currentUser;
            const getUser = async () => {
                const userResp = await firestore().collection('Users').doc(username).get();
                setUser({...userResp.data(),email,emailVerified,phoneNumber,photoURL,displayName});
            }
            getUser();
        }, []
    )
    
    return user
    ? (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity onPress={() => setProfileEdit(!profileEdit)} style={styles.settingsButton}>
                        <Icon name={profileEdit ? 'cog' : 'cog-outline'} size={32}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity onPress={profileEdit ? () => {console.log('Edit moddasın')} : null} disabled={!profileEdit ? true : false}>
                            <Image source={user.photoURL ? {uri: user.photoURL} : require('../../assets/images/default_avatar.png')} style={styles.profileImage}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldTitle}>
                            Kullanıcı adı
                        </Text>
                        {
                            !profileEdit ? (
                                <Text style={styles.fieldText}>
                                    {!user.displayName ? user.username : user.displayName}
                                </Text>
                            )
                            : (
                                <View style={styles.editInputContainer}>
                                    <TextInput value={!user.displayName ? user.username : user.displayName} onChangeText={(newVal) => setUsername(newVal)} style={styles.editInput}/>
                                </View>
                            )
                        }
                        
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldTitle}>
                            E-posta
                        </Text>
                        {
                            !profileEdit ? (
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.fieldText}>
                                        {user.email}
                                    </Text>
                                    <Text style={[styles.fieldText,user.emailVerified ? styles.emailVerified : styles.emailNotVerified]}>
                                        {user.emailVerified ? 'Onaylı' : 'Onaysız'}
                                    </Text>
                                </View>
                            )
                            : (
                                <View style={styles.editInputContainer}>
                                    <TextInput value={user.email} onChangeText={(newVal) => setEmail(newVal)} style={styles.editInput}/>
                                </View>
                            )
                        }
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldTitle}>
                            Telefon numarası
                        </Text>
                        {
                            !profileEdit ? (
                                <Text style={styles.fieldText}>
                                    {!user.phoneNumber ? 'Kayıtlı numara yok' : user.phoneNumber}
                            </Text>
                            )
                            : (
                                <View style={styles.editInputContainer}>
                                    <TextInput value={!user.phoneNumber ? '' : user.phoneNumber} onChangeText={(newVal) => setPhoneNumber(newVal)} style={styles.editInput}/>
                                </View>
                            )
                        }
                    </View>

                    {
                        profileEdit ? (
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldTitle}>
                                    Şifre
                                </Text>
                                <View style={styles.editInputContainer}>
                                    <TextInput value={!user.phoneNumber ? '' : user.phoneNumber} onChangeText={(newVal) => setPhoneNumber(newVal)} style={styles.editInput} placeholder='Yeni şifre'/>
                                </View>
                                <View style={styles.editInputContainer}>
                                    <TextInput value={!user.phoneNumber ? '' : user.phoneNumber} onChangeText={(newVal) => setPhoneNumber(newVal)} style={styles.editInput} placeholder='Yeni şifre tekrar'/>
                                </View>
                                <CustomButton icon={{name:'content-save',color:'white',size:18}} title='Değişiklikleri kaydet' onPress={() => console.log('Degisiklikler kaydedildi')}/>
                            </View>
                            
                            
                        )
                        : null
                        
                    }

                </View>
            </View>
            
            
        </View>
    ) 
    : (<View><Text>Test</Text></View>)
    
};

export default Profile;