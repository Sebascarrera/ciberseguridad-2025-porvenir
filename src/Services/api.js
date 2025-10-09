import axios from "axios";

const instance = axios.create({
    baseURL: 'https://csp-2025-474613.uc.r.appspot.com'
});

export default instance 