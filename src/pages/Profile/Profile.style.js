import { StyleSheet } from "react-native";
import colors from '../../assets/colors';

const baseText = {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
};

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        margin: 24,
        backgroundColor: 'white',
        flex:1,
        borderRadius: 18,
    },

    profilePhoto: {
        width: 130,
        height: 130,
        borderRadius: 75,
    },
    fieldContainer: {
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 8,
    },

    infoContainer: {
        marginVertical: 8,
    },

    emailField: {
        flexDirection: 'column',
    },

    username: {
        ...baseText,      
    },

    email: {
        ...baseText,  
    },

    phoneNumber: {
        ...baseText,  
    },

    emailVerified: {
        ...baseText,  
        textAlign:'center',
        fontSize: 18,
        color: colors.green,
    },

    emailNotVerified: {
        ...baseText,  
        textAlign:'center',
        fontSize: 18,
        color: colors.red,
    }

});