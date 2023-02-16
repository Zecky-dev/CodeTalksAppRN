import { StyleSheet } from "react-native";
import colors from '../../assets/colors';

export default StyleSheet.create({
    container: {
        alignItems:'center',
        flex: 1,
        justifyContent:'center',
    },  
    profileContainer: {
        marginVertical: 16,
        marginHorizontal: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor:'white',
    },
    imageContainer: {
        alignItems:'center',
    },
    settingsContainer: {
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    fieldContainer: {
        flexDirection:'column',
        marginVertical: 6,
        alignItems:'stretch',
        minWidth: 300,
    },
    fieldText:{
        fontSize: 17,
    },
    fieldTitle: {
        color: colors.black,
        fontWeight:'bold',
        fontSize: 18,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    emailVerified: {
        fontWeight:'bold',
        color: 'green',
        marginLeft: 8,
    },
    emailNotVerified: {
        fontWeight:'bold',
        color: 'red',
        marginLeft: 8,
    },
    editInputContainer: {
        borderWidth: 0.7,
        color: 'gray',
        marginTop:6,
    },
    editInput: {
        width: '100%',
    }

});