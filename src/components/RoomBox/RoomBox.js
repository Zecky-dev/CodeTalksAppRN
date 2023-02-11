import React from "react";
import {TouchableOpacity,Text,View} from "react-native";

import styles from './RoomBox.style';
import colors from "../../assets/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const RoomBox = ({item,removeRoomOnPress,onPress}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.9} onPress={() => onPress(item)}>
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomDescription}>{item.roomDescription}</Text>
            <View style={styles.roomOwnerContainer}>
                <Icon name='crown' size={18} color={colors.gold} style={styles.roomOwnerIcon}/>
                <Text style={styles.roomOwner}>{item.roomOwner}</Text>
            </View>
            {
                item.owner
                ? 
                (
                    <TouchableOpacity style={styles.removeRoomContainer} activeOpacity={0.9} onPress={() => removeRoomOnPress(item.roomID)}>
                        <Text style={styles.removeRoomTitle}>Odayı Kapat</Text>        
                    </TouchableOpacity>
                )
                : null
            }
        </TouchableOpacity>
    )
}

export default RoomBox;


