import React, {useEffect, useState} from 'react';
import {View,Text,Button} from 'react-native';
import Modal from 'react-native-modal';

import styles from './Room.style';
import uuid from 'react-native-uuid';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';

import ChatMessageBox from '../../components/ChatMessageBox/ChatMessageBox';


const Room = ({route}) => {    
    const room = route.params.room;
    const [messages,setMessages] = useState();
    const user = auth().currentUser;
    const username = user.email.split('@')[0];
    useEffect(
        () => {
            const subscriber = firestore()
            .collection('Rooms')
            .doc(room.roomID)
            .onSnapshot(
                snapshot => {
                    let data = snapshot.data().roomMessages;
                    setMessages(data);
                }
            );
            return () => subscriber();
        }, [messages]
    )
    return (
        <View>
            <FlatList
                data={messages}
                renderItem={({item}) => {
                    const message = item;
                    return (
                        <ChatMessageBox message={message}/>
                    )
                }}
            />
            <Button title="Add message" onPress={() => {
                firestore().collection('Rooms').doc(room.roomID).update({
                    roomMessages: firestore.FieldValue.arrayUnion({
                        uid: uuid.v4(),
                        messageText: 'testMesajı',
                        messageOwner: username,
                        messageCreateDate: new Date().toUTCString(),
                    })
                })
                .then(
                    () => console.log('Mesaj eklendi') 
                )
                .catch(
                    (err) => console.log(err)
                )
            }}/>
        </View>
    )
}

export default Room;