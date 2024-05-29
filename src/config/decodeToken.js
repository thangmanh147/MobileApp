import jwt_decode from 'jwt-decode';
import Store from '../services/Store';


export const checkExpToken = (token) => {
    const decode = jwt_decode(token);
    let exp = decode?.exp;
    if (!exp) {
        return false;
    }
    return Date.now() < exp * 1000
}

export const checkUpdatePassword = (token) => {
    const decode = jwt_decode(token);
    console.log('decode.pwdUpdated',decode)
    return decode.pwdUpdated
}