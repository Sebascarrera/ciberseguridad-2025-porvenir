import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ciberseguridad-porvenir-web.uc.r.appspot.com'
});

export default instance 