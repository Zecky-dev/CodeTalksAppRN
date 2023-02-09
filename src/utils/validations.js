import * as yup from 'yup';

const validations = {
    loginValidation: yup.object().shape({
        email: yup
        .string()
        .required('Boş bırakılamaz')
        .email('E-posta formatına uygun giriş yapınız'),
        password: yup
        .string()
        .required('Boş bırakılamaz')
        .min(8, 'En az 8 karakter olmalıdır')
        .max(16, 'En fazla 16 karakter olmalıdır'),
    }),
    signUpValidation: yup.object().shape({
        email: yup
        .string()
        .required('Boş bırakılamaz')
        .email('E-posta formatına uygun giriş yapınız'),
        password: yup
        .string()
        .required('Boş bırakılamaz')
        .min(8, 'En az 8 karakter olmalıdır')
        .max(16, 'En fazla 16 karakter olmalıdır'),
        passwordAgain: yup.string().required('Boş bırakılamaz.').oneOf([yup.ref('password'),null], 'Şifreleriniz uyuşmuyor'),
    }),
};

export default validations;
