import {firebase} from '@react-native-firebase/database';
import {DATABASE_URL} from '@env';

const databaseRef = firebase.app().database(DATABASE_URL);

const databaseOperations = {
    push: function(refVal,data,callback){
        databaseRef
            .ref(refVal)
            .push(data)
            .then(
                item => {
                    callback(item.key)
                }
            )
            .catch(
                (err) => console.log('Hata: ' + err)
            )
    },
    readOnce: function(refVal,callback) {
        databaseRef
        .ref(refVal)
        .once('value')
        .then(
            snapshot => {
                callback(snapshot.val());
            }
        )
        .catch(
            (err) => console.log(err)
        )
    },
    readRealTime: function(refVal){
        databaseRef
        .ref(refVal)
        .on('value')
    },
    addChild: function(refVal,childName,data){
        databaseRef
        .ref(refVal)
        .child(childName)
        .set(data)
        .then(
            () => console.log('Başarıyla veritabanına eklendi')
        )
        .catch(
            (err) => console.log('Hata: ' + err)
        )
    },
    set: function(refVal,setValues) {
        databaseRef
        .ref(refVal)
        .set(setValues)
        .then(() => console.log('Veri set edildi'))
        .catch((err) => console.log('Hata: ' + err));
    },
    update: function(refVal,updateValues) {
        databaseRef
        .ref(refVal)
        .update(updateValues)
        .then(() => console.log('Başarıyla güncellendi'))
        .catch((err) => console.log('Hata: ' + err))
    },
    remove: function(refVal) {
        databaseRef
        .ref(refVal)
        .remove()
        .then(() => console.log('Veri başarıyla silindi'))
        .catch((err) => console.log('Hata: ' + err));
    }
}

export default databaseOperations;