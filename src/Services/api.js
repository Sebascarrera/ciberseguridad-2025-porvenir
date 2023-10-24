import axios from "axios";

const instance = axios.create({
    baseURL: 'http://ciberseguridad-porvenir.uc.r.appspot.com'
});

export default instance 