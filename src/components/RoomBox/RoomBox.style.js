import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
export default StyleSheet.create({
    container:{
        borderWidth: 2,
        borderColor: 'gray',
        margin: 8,
        padding: 8,
        borderRadius: 2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.secondary,
    },
    roomName: {
        fontSize: 24,
        fontWeight:'bold',
        color:'white',
    },
    roomOwner: {
        color:'red',
        fontSize: 16,
        marginVertical: 4,
    },
    messageCount: {
        color:'black',
    },
});