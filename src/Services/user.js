import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ciberseguridad-porvenir.uc.r.appspot.com'
});


export const createUser = data => {
    return instance.post('users', data)
}

export default instance 