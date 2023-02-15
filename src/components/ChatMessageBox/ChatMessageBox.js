import React from 'react';
import {View,Text} from 'react-native';
import styles from './ChatMessageBox.style';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/tr';
import colors from '../../assets/colors';


const ChatMessageBox = ({message,roomOwner}) => {
    const username = auth().currentUser.email.split('@')[0];
    const isMessageOwner = username === message.messageOwner ? true : false;
    const isRoomOwner = message.messageOwner === roomOwner ? true : false;
    const date = moment(message.messageCreateDate).format('DD MMM YYYY - HH:mm')

    
    return (
        <View style={
            isMessageOwner 
            ? styles['messageOwner'].container
            : styles['otherMessage'].container
        }>
            <View style= {
                isMessageOwner 
                ? styles['messageOwner'].messageContainer
                : styles['otherMessage'].messageContainer
            }>
               <View style={styles.topContainer}>
                    <Text style={styles.owner}>{message.messageOwner}</Text>
                    {
                        isRoomOwner 
                        ? <Icon name='crown' size={18} color={colors.gold} style={styles.roomOwnerIcon}/>
                        : null
                    }
                    <Text style={styles.date}>{date}</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <Text style={styles.message}>
                        {message.messageText}
                    </Text>
                </View>
            </View>   
        </View>
        
    )
}

export default ChatMessageBox;