import React from 'react';
import {View,TextInput,Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './Input.style';

const Input = ({label,icon,secure = false,onChangeText}) => {
    return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} onChangeText={onChangeText} secureTextEntry={secure}/>
            <Icon name={icon.name} size={icon.size} color={icon.color}/>
        </View>
    </View>
    );
};

export default Input;