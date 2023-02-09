import React from 'react';
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
import {icon} from '../../utils/functions';


const Signup = ({navigation}) => {

    const handleSignup = (values) => {
        console.log(values);
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
                                <Button title="Kayıt ol" onPress={handleSubmit} icon={icon('account-plus',24,'white')}/>
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