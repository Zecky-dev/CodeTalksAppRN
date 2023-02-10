import React, { useEffect, useState } from 'react';
import {View,Text, Alert} from 'react-native';

// Styles
import styles from './Main.style';


// Custom components
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import RoomBox from '../../components/RoomBox/RoomBox';

// Dialog
import Dialog from 'react-native-dialog';

// Firebase
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Main = () => {
    const [dialogVisible,setDialogVisible] = useState(false);
    const [roomName,setRoomName] = useState('');
    const [roomDescription,setRoomDescription] = useState('');
    const [ownRooms,setOwnRooms] = useState();
    
    const currentUser = auth().currentUser;
   
    return (
        <View style={styles.container}>
            {/* Sahip olduğum odalar listesi*/}



            {/* Diğer odalar listesi */}            
            <FloatingButton icon={{size:30,name:'plus'}} onPress={()=>setDialogVisible(!dialogVisible)}/>
            {/* Oda oluşturma diyalog kutusu */}
            <Dialog.Container visible={dialogVisible} onBackdropPress={()=>setDialogVisible(false)}>
                <Dialog.Title>Oda Oluştur</Dialog.Title>
                <Dialog.Description>
                    Oluşturacağınız odanın detaylarını girin
                </Dialog.Description>
                <Dialog.Input label="Oda ismi" onChangeText={(val) => setRoomName(val)}/>
                <Dialog.Input label="Oda açıklaması" onChangeText={(val) => setRoomDescription(val)}/>
                <Dialog.Button label="İptal" onPress={() => {
                    setDialogVisible(!dialogVisible);
                    setRoomName('');
                    setRoomDescription('');
                }}/>
                <Dialog.Button label="Oluştur" onPress={()=> {
                    // Oda oluşturmadan önce girilen bilgileri kontrol et
                    if(roomName === "" || roomDescription === ""){
                        Alert.alert('Hata','Oda ismini veya açıklamasını boş geçmeyiniz.');
                    }
                    else if(roomName.length < 4 || roomName.length > 16) {
                        Alert.alert('Hata','Oda ismi 3 karakterden fazla 17 karakterden az olmalıdır.',[{
                                text: 'Tamam',
                            }
                        ])
                    }
                    else if(roomDescription.length < 4 || roomDescription.length > 16){
                        Alert.alert('Hata','Oda açıklaması 3 karakterden fazla 17 karakterden az olmalıdır.',[{
                                text: 'Tamam',
                            }
                        ])                        
                    }
                    else{
                        // Odayı oluştur
                        const username = currentUser.email.split('@')[0];
                        // Kullanıcının sahip olduğu oda sayısını kontrol et.
                        firestore().collection('Users').doc(username).get().then(
                            (item) => {
                                const ownRoomCount = item._data.ownRooms.length;
                                if(ownRoomCount >= 3) {
                                    Alert.alert('Uyarı','En fazla 3 adet oda oluşturabilirsiniz.');
                                }
                                else{
                                    firestore().collection('Rooms').add({
                                        roomName,
                                        roomDescription,
                                        roomOwner: username,
                                    })
                                    .then(
                                        (val) => {
                                            firestore().collection('Users').doc(username).update({
                                                ownRooms: firestore.FieldValue.arrayUnion(val._documentPath._parts[1])
                                            })
                                        }
                                    )
                                }
                            })



                        /*
                        databaseOperations.readOnce(`users/${username}/ownRooms`,(val) => {
                            const ownRoomCount = val !== null ? Object.keys(val).length : 0;
                            let reachedLimit = false;
                            // Eğer 3 veya 3'ten fazla odaya sahip ise limite ulaştı.
                            ownRoomCount >= 3 ? reachedLimit = true : reachedLimit = false;
                            
                            if(reachedLimit){
                                Alert.alert("En fazla 3 adet oda oluşturabilirsiniz");
                            }
                            // Limite ulaşmadıysa odasını oluştur.
                            else{
                                databaseOperations.push('rooms/',{
                                    roomName,
                                    roomDescription,
                                    roomOwner: currentUser.email.split('@')[0],
                                    roomParticipants: {},
                                    roomMessages: {},
                                },(key) => {
                                    databaseOperations.addChild(`users/${username}/ownRooms`,key,key);
                                });
                            }
                        });
                        */
                    }
                }}/>
            </Dialog.Container>
        </View>
    );
};

export default Main;