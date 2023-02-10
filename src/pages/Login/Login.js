import React, { useState } from 'react';
import {View,Text,Image} from 'react-native';

// Formik & Validations
import { Formik } from 'formik';
import validations from '../../utils/validations';


// Custom components
import Input from '../../components/Input/Input';
import Button from '../../components/CustomButton/CustomButton';
import MessageBox from '../../components/MessageBox/MessageBox';

// Styles
import styles from './Login.style';
import colors from '../../assets/colors';

// util functions
import {icon,createErrorMessage} from '../../utils/functions';

// Firebase auth
import auth from '@react-native-firebase/auth';

// Flash message
import { showMessage } from 'react-native-flash-message';


const Login = ({navigation}) => {
    const [loading,setLoading] = useState(false);

    const handleLogin = (values) => {
        const {email,password} = values;
        auth()
        .signInWithEmailAndPassword(email,password)
        .then(
            () => {
                setLoading(false);
                showMessage({
                message: 'Giriş yaptın',
                type:'success',
                })
            }
        )
        .catch(
            (err) => {
                setLoading(false)
                showMessage({
                message: createErrorMessage(err.code),
                type: 'danger',
                })
        }
        )
    };


    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
            </View>

            {/* Login form and validations*/}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handleLogin}
                validationSchema={validations.loginValidation}
            >
                {
                    ({handleChange,handleBlur,handleSubmit,values,errors,touched}) => {
                        return (
                            <View style={styles.formikContainer}>
                                <Input label="E-posta" icon={{name:'email',size:24}} onChangeText={handleChange('email')}/>
                                {(errors.email && touched.email) && <MessageBox type="warning" message={errors.email}/>}
                                <Input label="Şifre" icon={{name:'key',size:24}} onChangeText={handleChange('password')} secure/>
                                {(errors.password && touched.password) && <MessageBox type="warning" message={errors.password}/>}
                                <Button title="Giriş Yap" onPress={handleSubmit} icon={icon('login',24,'white')} loading={loading}/>
                                <Button title="Kayıt Ol" onPress={() => navigation.navigate('SignupScreen')} outlined icon={icon('account-plus',24,colors.primary)} loading={loading}/>
                            </View>
                        );
                    }
                }
            </Formik>
        </View>
    );
};

export default Login;