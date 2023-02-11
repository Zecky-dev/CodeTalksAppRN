import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
export default StyleSheet.create({
    container:{
        margin: 8,
        padding: 8,
        borderRadius: 2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.secondary,
        flex:1,
    },
    roomName: {
        fontSize: 20,
        fontWeight:'bold',
        color:'white',
    },
    roomOwnerContainer: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    roomOwner: {
        color:colors.gold,
        fontSize: 16,
        fontWeight:'bold',
        marginVertical: 4,
    },
    roomOwnerIcon: {
        marginRight: 4
    },
    messageCount: {
        color:'black',
    },
    removeRoomContainer:{
        backgroundColor: 'red',
        width: '100%',
        padding: 6,
        borderRadius: 4,
        marginVertical: 4,
    },
    removeRoomTitle: {
        color: colors.white,
        fontWeight:'bold',
        textAlign:'center',
    },
});