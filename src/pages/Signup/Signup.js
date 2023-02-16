import React, {useState} from 'react';
import {View,Text, Pressable,Image, Platform, PermissionsAndroid, Alert} from 'react-native';

// Custom components
import Input from '../../components/Input/Input';
import Button from '../../components/CustomButton/CustomButton';
import MessageBox from '../../components/MessageBox/MessageBox';

// style things
import colors from '../../assets/colors';
import styles from '../Login/Login.style';

// Formik & Validations
import {Formik} from 'formik';
import validations from '../../utils/validations';

// util functions
import {icon,createErrorMessage} from '../../utils/functions';

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';


// Flash message
import { showMessage } from 'react-native-flash-message';

// Pick image or take photo
import ImagePicker from 'react-native-image-picker';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Signup = ({navigation}) => {
    const [loading,setLoading] = useState(false);
    
    // Kayıt esnasında fotoğraf ekleme 
    const [modalVisibility,setModalVisibility] = useState(false);
    const [filePath,setFilePath] = useState();
    const toggleModalVisibility = () => {
        setModalVisibility(!modalVisibility);
    }
    const onCamera = async () => {
        const cameraPermission = await requestCameraPermission();
        if(cameraPermission){
            launchCamera({
                mediaType: 'photo',
                cameraType: 'front',
                quality: 1,
                videoQuality:'low',
                includeExtra: true,
                includeBase64: true,
                maxWidth: 400,
                maxHeight: 400,
                saveToPhotos: true,
            },(response) => {
                if(response.didCancel){
                    console.log('İptal edildi');
                }
                else if(response.errorCode === 'camera_unavailable'){
                    console.log('Kamera kullanılamıyor')
                }
                else if(response.errorCode === "permission"){
                    console.log('Kamera izni verilmedi')
                }
                else if(response.errorCode === "others"){
                    console.log('Hata: ' + response.errorMessage)
                }
                else {
                    setFilePath(response.assets[0].uri);
                    toggleModalVisibility();
                }
            })
        }
    }
    const onImageLibrary = async () => {
        const storagePermission = await requestStoragePermission();
        if(storagePermission){
            launchImageLibrary({
                mediaType: 'photo',
                quality: 1,
                maxHeight: 400,
                maxWidth: 400,
                selectionLimit: 1,
                videoQuality: 'low',
                includeBase64: true,
                includeExtra: true,
            },(response) => {
                if(response.didCancel){
                    console.log('İptal edildi');
                }
                else if(response.errorCode === 'camera_unavailable'){
                    console.log('Kamera kullanılamıyor')
                }
                else if(response.errorCode === "permission"){
                    console.log('Kamera izni verilmedi')
                }
                else if(response.errorCode === "others"){
                    console.log('Hata: ' + response.errorMessage)
                }
                else{
                    toggleModalVisibility();
                    setFilePath(response.assets[0].uri);
                }
                
            })
        }
    }
    const removePhoto = () => {
        setFilePath(null);
        setModalVisibility();
    }
    const requestCameraPermission = async () => {
        if(Platform.OS === 'android'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Kamera İzni',
                        message: 'Uygulamanın kamera iznine ihtiyacı var'
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            catch (err) {
                console.log('Hata: ' + err);
                return false;
            }
        }
        else return true;
    }
    const requestStoragePermission = async () => {
        if(Platform.OS === 'android'){
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Depolama İzni',
                        message: 'Uygulamanın depolama iznine ihtiyacı var'
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
            catch (err) {
                console.log('Hata: ' + err);
                return false;
            }
        }
        else return true;
    }
    const uploadImage = async (uri, name, firebasePath) => {
        if(uri){
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') : uri;
            const reference = storage().ref(`${firebasePath}/${name}`);
            try {
                await reference.putFile(uploadUri);
                const url = await reference.getDownloadURL().catch((err) => console.log(err));
                return url;
            }
            catch(err){
                console.log('Hata: ' + err);
            }
        }
        else{
            return null;
        }
    }

    
    const sendEmailVerification = async () => {
        try{
            await auth().currentUser.sendEmailVerification();
            showMessage({
                message: 'Doğrulama e-postası gönderildi, e-posta adresini kontrol et.',
                type:'info',
            });
        }
        catch(err){
            console.log('Hata: ' + err);
        }
    }
    

    // Kayıt olma
    const handleSignup = async (values) => {
        setLoading(true);
        try {
            const credits = await auth().createUserWithEmailAndPassword(values.email,values.password);
            sendEmailVerification();
            const {email,emailVerified,uid} = credits.user;
            const username = email.split('@')[0];
            const imageURL = await uploadImage(filePath,username,'avatars');
            auth().currentUser.updateProfile({
                photoURL: imageURL
            }).catch(
                (err) => {
                    showMessage({
                        message: `Kullanıcı fotoğrafı güncellenirken hata oluştu : ${err}` ,
                        type: 'danger'
                    })
                }
            )
            await firestore().collection('Users').doc(username).set({
                uid,
                username,
                email,
                emailVerified,
                photoURL: imageURL,
                phoneNumber: null,
                ownRooms: [],
            });
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            showMessage({
                message: createErrorMessage(err.code),
                type: 'danger',
            })
        }
    }



    return (
        <View style={styles.container}>

            <Pressable onPress={toggleModalVisibility} style={styles.selectImage}>
                <Image source={
                    !filePath ? require('../../assets/images/default_avatar.png') : {uri:filePath}
                } style={styles.avatarImage}/>
                {filePath ? <Text>Fotoğrafı kaldır</Text> : <Text>Fotoğraf ekle</Text>}
            </Pressable>

            {/* Login form and validations*/}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    passwordAgain: '',
                }}
                onSubmit={handleSignup}
                validationSchema={validations.signUpValidation}
            >
                {
                    ({handleChange,handleBlur,handleSubmit,values,errors,touched}) => {
                        return (
                            <View style={styles.formikContainer}>
                                <Input label="E-posta" icon={icon('email',24)} onChangeText={handleChange('email')}/>
                                {(errors.email && touched.email) && <MessageBox type="warning" message={errors.email}/>}
                                <Input label="Şifre" icon={icon('key',24)} onChangeText={handleChange('password')} secure/>
                                {(errors.password && touched.password) && <MessageBox type="warning" message={errors.password}/>}
                                <Input label="Şifre tekrar" icon={icon('key-change',24)} onChangeText={handleChange('passwordAgain')} secure/>
                                {(errors.passwordAgain && touched.passwordAgain) && <MessageBox type="warning" message={errors.passwordAgain}/>}
                                <Button title="Kayıt ol" onPress={handleSubmit} icon={icon('account-plus',24,'white')} loading={loading}/>
                                <Button title="Giriş Yap" onPress={() => navigation.navigate('LoginScreen')} outlined icon={icon('login',24,colors.primary)}/>
                            </View>
                        );
                    }
                }
            </Formik>

            <Modal
                isVisible={modalVisibility}
                onBackButtonPress={toggleModalVisibility}
                onBackdropPress={toggleModalVisibility}
                style={styles.modalContainer}
                animationIn={'zoomIn'}
                animationOut={'zoomOut'}
                useNativeDriver={true}
            >
                <View style={styles.modalContent}>
                    <View style={styles.defaultButtons}>
                        <Pressable style={styles.modalButton} onPress={onCamera}>
                            <Icon name='camera' size={24} color={colors.white} style={styles.modalButtonIcon}/>
                            <Text style={styles.modalButtonText}>Kameradan çek</Text>
                        </Pressable>
                        <Pressable style={styles.modalButton} onPress={onImageLibrary}>
                            <Icon name='image-album' size={24} color={colors.white} style={styles.modalButtonIcon}/>
                            <Text style={styles.modalButtonText}>Galeriden seç</Text>                        
                        </Pressable>

                    </View>
                    {
                        filePath
                        ? (
                        <View style={styles.removeButtonContainer}>
                            <Pressable style={styles.modalButton} onPress={removePhoto}>
                                <Icon name='delete' size={20} color={colors.white} style={styles.modalButtonIcon}/>
                                <Text style={styles.modalButtonText}>Fotoğrafı kaldır</Text>                        
                            </Pressable>
                        </View>
                        )
                        : null
                    }
                    
                    
                </View>
            </Modal>

            

        </View>
    );
};

export default Signup;