import React from 'react';
import {TouchableOpacity,Text} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './FloatingButton.style';


const FloatingButton = ({icon,sizes,onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <Icon name={icon.name} size={icon.size} color='white'/>
        </TouchableOpacity>
    )
} 

export default FloatingButton;