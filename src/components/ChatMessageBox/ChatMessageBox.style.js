import { StyleSheet } from "react-native";
import colors from '../../assets/colors';

const baseContainer= {
        width: '75%',
        marginLeft: 8,
        marginVertical: 8,
        borderRadius: 8,
        borderStartWidth:4,
        borderBottomWidth: 4,
        padding: 8,
}

export default StyleSheet.create({
    ownerMessage: {
        container: {
            ...baseContainer,
            borderBottomRightRadius: 0,
            backgroundColor: colors.primary,
        },
        align:{
            justifyContent: 'flex-end',
            backgroundColor:'red',
        }
    },
    otherMessage: {
        container: {
            ...baseContainer,
            borderBottomLeftRadius: 0,
            backgroundColor: colors.secondary,
        },
        align: {
            justifyContent: 'flex-start',
        }
    },


    
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    messageOwner: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,

    },
    messageDate: {
        color: colors.white,
        fontStyle:'italic',
    },
    messageText: {
        marginVertical: 4,
    },
});