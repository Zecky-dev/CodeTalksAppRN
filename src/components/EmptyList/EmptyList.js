import React from 'react';
import {View,Text} from 'react-native';

const EmptyList = () => {
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize:16,color:'red'}}>
            Henüz bir oda yok!
        </Text>
    </View>
    )
};

export default EmptyList;