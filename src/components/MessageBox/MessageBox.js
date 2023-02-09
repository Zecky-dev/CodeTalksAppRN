import React from 'react';
import {View,Text} from 'react-native';
import styles from './MessageBox.style';

const MessageBox = ({type = 'dummy' ,message = 'Default message'}) => {
    return (
        <View style={styles[type].container}>
            <Text style={styles[type].message}>{message}</Text>
        </View>
    );
};

export default MessageBox;