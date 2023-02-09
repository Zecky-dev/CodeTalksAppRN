import React from 'react';
import {TouchableOpacity,Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './CustomButton.style';

const CustomButton = ({title,icon,theme = 'primary',circled,outlined,loading,onPress}) => {
    const createButtonStyle = () => {
        if (circled) {
            return styles.circled[theme];
        }
        else if (outlined) {
            return styles.outlined;
        }
        else {
            return styles.regular[theme];
        }
    };
    return (
        <TouchableOpacity onPress={onPress} style={createButtonStyle().container} disabled={loading ? true : false}>
            {
                icon
                ? <Icon name={icon.name} size={icon.size} color={icon.color} />
                : null
            }
            {
            title
            ? (<Text style={createButtonStyle().title}>{title}</Text>)
            : null
            }
            {
                loading
                ? (<ActivityIndicator size="small" color={icon.color} style={{marginLeft: 6}}/>)
                : null
            }
        </TouchableOpacity>
    );
};

export default CustomButton;