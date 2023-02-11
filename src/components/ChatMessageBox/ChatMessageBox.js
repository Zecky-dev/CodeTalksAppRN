import React from 'react';
import {View,Text} from 'react-native';
import styles from './ChatMessageBox.style';

import auth from '@react-native-firebase/auth';
const username = auth().currentUser.email.split('@')[0];

const ChatMessageBox = ({message}) => {
    return (
        <View style={username === message.messageOwner ? styles['ownerMessage'].align : styles['otherMessage'].align}>
            <View style={ username === message.messageOwner ? styles['ownerMessage'].container : styles['otherMessage'].container}>
            <View style={styles.topContainer}>
                <Text style={styles.messageOwner}>{message.messageOwner}</Text>
                <Text style={styles.messageDate}>{message.messageCreateDate}</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.messageText}>{message.messageText}</Text>
            </View>
        </View>
        </View>
        
    )
}

export default ChatMessageBox;