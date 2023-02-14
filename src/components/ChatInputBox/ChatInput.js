import React, { useState } from 'react';
import {View,TextInput} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';

import styles from './ChatInput.style';

const ChatInput = ({sendMessage}) => {
    const [message,setMessage] = useState('');
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Mesajını gir.." onChangeText={(val) => setMessage(val)} value={message}/>
            <CustomButton circled icon={{name:'send',size:24,color:'white'}} onPress={() => {
                sendMessage(message);
                setMessage('');
            }}/>
        </View>
    );
};


export default ChatInput;