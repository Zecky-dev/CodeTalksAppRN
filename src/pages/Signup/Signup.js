import React, {useState} from 'react';
import {View,Text} from 'react-native';

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


// Flash message
import { showMessage } from 'react-native-flash-message';



const Signup = ({navigation}) => {
    const [loading,setLoading] = useState(false);

  
      const handleSignup = (values) => {
        const {email,password} = values;
        setLoading(true);
        auth().createUserWithEmailAndPassword(email,password)
        .then(
            (credits) => {
                const {email,phoneNumber,photoURL,emailVerified,uid} = credits.user;
                const username = email.split('@')[0];
                firestore()
                .collection('Users')
                .doc(username)
                .set({
                    uid,
                    username,
                    email,
                    emailVerified,
                    photoURL,
                    phoneNumber,
                    ownRooms: [],
                })
                .then(
                    () => console.log('Kullanıcı eklendi')
                )
                .catch(
                    (err) => console.log(err)
                )
            }
        )
        .catch(
            (err) => {
                setLoading(false);
                showMessage({
                    message: createErrorMessage(err.code),
                    type: 'danger',
                })
            }
        )
    }

    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default Signup;