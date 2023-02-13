import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import colors from '../../assets/colors';

const baseStyles = {
   messageContainer: {
        padding: 8,
        margin: 8,
        borderRadius: 8,
   }
}


export default StyleSheet.create({
    messageOwner: {
        container: {
           flexDirection: 'row',
           justifyContent: 'flex-end',
        },
        messageContainer: {
           ...baseStyles.messageContainer,
           backgroundColor: colors.primary,
           borderBottomRightRadius: 0,
        }
    },
    otherMessage: {
        container: {
           flexDirection: 'row',
           justifyContent: 'flex-start',
        },
        messageContainer: {
           ...baseStyles.messageContainer,
           backgroundColor: colors.secondary,
           borderBottomLeftRadius: 0,
        }
    },

    topContainer: {
        flexDirection: 'row',
    },

    owner: {
        fontWeight: 'bold',
        color: colors.white,
    },

    date: {
        color: colors.silver,
        fontStyle: 'italic', 
        marginLeft: 16, 
    },

    message: {
        color: colors.white,
    },

    roomOwnerIcon: {
        marginLeft: 4,
    }

});