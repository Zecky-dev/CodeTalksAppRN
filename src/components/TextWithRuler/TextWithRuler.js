import React from 'react';
import {View,Text} from 'react-native';

const TextWithRuler = ({text,width}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center',padding: 8,}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                    <View>
                        <Text style={{width: width, textAlign: 'center',fontSize:18}}>{text}</Text>
                    </View>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        </View>
    )
}

export default TextWithRuler;