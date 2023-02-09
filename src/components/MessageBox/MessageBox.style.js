import { StyleSheet } from "react-native";

const baseStyles = {
    container: {
        padding: 8,
        borderRadius: 4,
        marginVertical: 4,
    },
    message: {
        fontSize: 14,
        fontWeight: 'bold',
    },
};

export default StyleSheet.create({
    error: {
        container: {...baseStyles.container, backgroundColor: 'red'},
        message: {...baseStyles.message, color: 'white'},
    },
    warning: {
        container: {...baseStyles.container, backgroundColor: 'orange'},
        message: {...baseStyles.message, color: 'black'},
    },
    info: {
        container: {...baseStyles.container, backgroundColor: '#30D5C8'},
        message: {...baseStyles.message, color: 'white'},
    },
    dummy: {
        container: {...baseStyles.container, backgroundColor: 'gray'},
        message: {...baseStyles.message, color: 'black'},
    },
});
