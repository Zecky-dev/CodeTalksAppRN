import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
export default StyleSheet.create({
    container: {
        margin: 16,
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        alignItems:'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'column',
        borderRadius: 4,
    },
    modalButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 4,
        marginVertical: 8,
        flexDirection:'row',
        justifyContent:'center',
    },
    modalButtonIcon: {
        textAlign: 'center',
        marginRight: 6,
    },
    modalButtonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign:'center',
    },
    avatarImage: {
        width: 150,
        height: 150,
        marginBottom: 8,
        borderRadius: 75,
    },
    selectImage: {
        alignItems:'center',
    },
    removeButton: {
        width: '100%',
    }
});