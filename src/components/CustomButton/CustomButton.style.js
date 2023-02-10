import { StyleSheet } from 'react-native';
import colors from '../../assets/colors';

const baseRegular = {
    container: {
        padding: 10,
        marginVertical: 8,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 8,
    },
};

const baseCircled = {
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center',
    },
};

const baseOutlined = {
    container: {
        ...baseRegular.container,
        borderColor: colors.primary,
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    title: {
        ...baseRegular.title,
        color: colors.primary,
        textAlign:'center',
    },
};



export default StyleSheet.create({
    regular: {
        primary: {
            container: {
                ...baseRegular.container,
                backgroundColor: colors.primary,
            },
            title: {
                ...baseRegular.title,
            },
        },
        secondary:{
            container: {
                ...baseRegular.container,
                backgroundColor: colors.secondary,
            },
            title: {
                ...baseRegular.title,
            },
        },
    },
    circled: {
        primary: {
            container: {
                ...baseCircled.container,
                backgroundColor: colors.primary,
            },
        },
        secondary: {
            container: {
                ...baseCircled.container,
                backgroundColor: colors.secondary,
            },
        },
    },
    outlined: {
        ...baseOutlined,
    },
});
