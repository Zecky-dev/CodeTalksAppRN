import React from "react";
import {TouchableOpacity,Text} from "react-native";

import styles from './RoomBox.style';

const RoomBox = ({item}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomDescription}>{item.roomDescription}</Text>
            <Text style={styles.roomOwner}>{item.roomOwner}</Text>
            <Text style={styles.messageCount}>Total Message Count: </Text>
        </TouchableOpacity>
    )
}

export default RoomBox;


