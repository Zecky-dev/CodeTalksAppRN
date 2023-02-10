import React from "react";
import {TouchableOpacity,Text} from "react-native";

import styles from './RoomBox.style';

const RoomBox = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8}>
            <Text style={styles.roomName}>Room Name</Text>
            <Text style={styles.roomDescription}>Room Description</Text>
            <Text style={styles.roomOwner}>Room owner</Text>
            <Text style={styles.messageCount}>Total Message Count: </Text>
        </TouchableOpacity>
    )
}

export default RoomBox;


