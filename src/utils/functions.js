const icon = (name,size,color) => ({name,size,color});
const createErrorMessage = (errCode) => {
    switch(errCode) {
        case 'auth/email-already-exists':
            return 'E-posta adresi zaten kullanımda';
        case 'auth/internal-error': 
            return 'İstek işlenirken hata meydana geldi';
        case 'auth/invalid-email':
            return 'Geçersiz e-posta adresi';
        case 'auth/invalid-password':
            return 'Geçersiz şifre';
        case 'auth/user-not-found':
            return 'Kullanıcı bulunamadı'
        case 'auth/email-already-in-use':
            return 'E-posta adresi kullanımda'
        default:
            return errCode
    }
}
export {icon,createErrorMessage};
