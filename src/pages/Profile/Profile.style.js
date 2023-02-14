import { StyleSheet } from "react-native";

const baseText = {
    marginLeft: 4,
    fontSize: 17,
};

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        margin: 32,
        backgroundColor: 'white',
        flex:1,
        justifyContent: 'flex-start',
        padding: 16,
        borderRadius: 24,
    },

    profilePhoto: {
        width: 130,
        height: 130,
        borderRadius: 75,
    },
    fieldContainer: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 4,
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
        fontSize: 16,
    }

});