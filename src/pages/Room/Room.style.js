import { StyleSheet, Dimensions } from "react-native";
export default StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        margin:0,
        backgroundColor:'red',
        height: Dimensions.get('window').height / 2,
        width: Dimensions.get('window').width / 2,
    },
    modalContentContainer: {
        backgroundColor:'white',
        padding: 16,
        margin: 8,
        borderRadius: 8,
    },
    container: {}
});