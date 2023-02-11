import React, { useEffect, useState } from 'react';
import {View,Text, Alert, FlatList} from 'react-native';

// Styles
import styles from './Main.style';


// Custom components
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import RoomBox from '../../components/RoomBox/RoomBox';

// Dialog
import Dialog from 'react-native-dialog';

// Firebase
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TextWithRuler from '../../components/TextWithRuler/TextWithRuler';

const Main = ({navigation}) => {
    const [dialogVisible,setDialogVisible] = useState(false);
    const [roomName,setRoomName] = useState('');
    const [roomDescription,setRoomDescription] = useState('');
    const [ownRooms,setOwnRooms] = useState([]);
    const [otherRooms,setOtherRooms] = useState([]);
    
    const currentUser = auth().currentUser;
    const username = currentUser.email.split('@')[0];

    {/* Veritabanından odaları çekmeye yarayan fonksiyonlar*/}
    const getOwnRooms = () => {
        firestore().collection('Rooms').where('roomOwner','==',username).onSnapshot(
            (snapshot) => {
                const list = [];
                snapshot.docs.forEach(
                    (querySnapshot) => {
                        let data = querySnapshot.data();
                        list.push({...data,owner:true});
                    }
                )
                setOwnRooms(list);
            }
        );
    }
    const getOtherRooms = () => {
        firestore().collection('Rooms').where('roomOwner','!=',username).onSnapshot(
            (snapshot) => {
                let list = [];
                if(snapshot.docs.length === 0){
                    list = [];
                }                
                else{
                    snapshot.docs.forEach(
                        (querySnapshot) => {
                            let data = querySnapshot.data();
                            list.push(data);
                        }
                    )
                    setOtherRooms(list);
                }    
            }
        );
    }

    {/* Oda işlemleri*/}
    const removeRoom = (roomID) => {
        Alert.alert('Emin misiniz ?','Bu odayı kapatmak istediğinize emin misiniz?',[
            {
                text: 'Evet',
                onPress: () => {
                    firestore().collection('Rooms').doc(roomID).delete().then(() => {
                        firestore().collection('Users').doc(username).update({
                            ownRooms: firestore.FieldValue.arrayRemove(roomID)
                        }).then(
                            () => console.log('İşlem tamam')
                        ).catch(
                            () => console.log('Problem var')
                        )
                    })
                }
            },
            {
                text: 'Hayır'
            }
        ])
    }
    const goRoom = (room) => {
        navigation.navigate('RoomScreen',{room})
    }
    const checkRoomCreationRules = () => {
        let errors = [];
        if(roomName === "" || roomDescription === ""){
            errors.push('Oda ismi veya açıklaması boş bırakılamaz.')
        }
        else if(roomName.length < 4 || roomName.length > 16) {
            errors.push('Oda isminin uzunluğu en 4 en fazla 16 karakter olabilir.')
        }
        else if(roomDescription.length < 4 || roomDescription.length > 48){
            errors.push('Oda açıklamasının uzunluğu en az 4 en fazla 48 karakter olabilir.')                        
        }
        if(errors.length === 0){
            return false;
        }
        else{
            let errorMessage = "";
            errors.map(
                (err) => {
                    errorMessage+=err+"\n"
                }
            );
            Alert.alert('Uyarı',errorMessage,[{text:'Tamam'}]);
            return true;
        }
    }   

    {/* Dialog toggler */}
    const dialogToggle = () => {
        setDialogVisible(!dialogVisible);
        setRoomDescription('');
        setRoomName('');
    }



    {/* Oda ekleme ve silme işlemlerinde odaların güncellenmesini sağlayan blok*/}
    useEffect(() => {
        getOwnRooms();
        getOtherRooms();        
    },[]);
    
   
    return (
        <View style={styles.container}>
            
            {/* Sahip olduğum odalar listesi*/}
            <TextWithRuler text="Odaların" width={100}/>
            <FlatList
                data={ownRooms}
                renderItem={({item}) => <RoomBox item={item} 
                removeRoomOnPress={(roomID) => removeRoom(roomID)}
                onPress={(room) => {goRoom(room)}}/>}
                numColumns={2}
                style={{flexGrow:0}}
            />

            {/* Diğer odalar listesi */}            
            <TextWithRuler text="Diğer Odalar" width={130}/>
            <FlatList
                data={otherRooms}
                renderItem={({item}) => <RoomBox item={item} onPress={(room) => goRoom(room)}/>}
                numColumns={2}
                style={{flexGrow: 1}}
            />            
            

            {/* Yüzen buton*/}
            <FloatingButton icon={{size:30,name:'plus'}} onPress={dialogToggle}/>
            
            
            {/* Oda oluşturma diyalog kutusu */}
            <Dialog.Container visible={dialogVisible} onBackdropPress={dialogToggle}>
                <Dialog.Title>Oda Oluştur</Dialog.Title>
                <Dialog.Description>
                    Oluşturacağınız odanın detaylarını girin
                </Dialog.Description>
                <Dialog.Input label="Oda ismi" onChangeText={(val) => setRoomName(val)}/>
                <Dialog.Input label="Oda açıklaması" onChangeText={(val) => setRoomDescription(val)}/>
                <Dialog.Button label="İptal" onPress={dialogToggle}/>
                <Dialog.Button label="Oluştur" onPress={()=> {
                    // Oda oluşturmadan önce girilen bilgileri kontrol et ----- ! BURAYI SADELEŞTİRMEYE ÇALIŞ
                    if(checkRoomCreationRules() === false) {
                        firestore().collection('Users').doc(username).get().then(
                            (item) => {
                                const ownRoomCount = item._data.ownRooms.length;
                                if(ownRoomCount >= 3) {
                                    Alert.alert('Uyarı','En fazla 3 adet oda oluşturabilirsiniz.');
                                }
                                else{
                                    const roomsCollection = firestore().collection('Rooms');
                                    roomsCollection.add({
                                        roomName,
                                        roomDescription,
                                        roomOwner: username,
                                        roomMessages: [],
                                        roomCreateDate: new Date().toUTCString(),
                                    })
                                    .then(
                                        (val) => {
                                            firestore().collection('Users').doc(username).update({
                                                ownRooms: firestore.FieldValue.arrayUnion(val._documentPath._parts[1])
                                            }).then(
                                                () => {
                                                    firestore()
                                                    .collection('Rooms')
                                                    .doc(val._documentPath._parts[1])
                                                    .update({
                                                        roomID: val._documentPath._parts[1]
                                                    })
                                                    .then(
                                                        () => {
                                                            Alert.alert('Başarılı','Odan başarıyla eklendi.');
                                                            dialogToggle();
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            })
                    }
                }}/>
            </Dialog.Container>
        </View>
    );
};

export default Main;