import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';
export default StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        position:'absolute',
        bottom: 10,
        right: 10,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
    }
});