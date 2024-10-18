import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ruleta-del-saber.uc.r.appspot.com'
});

const client = "/all/client/6711b220e1c924cceceec19c"

export const fetchCategories = () => {
    return instance.get(client)
}

export default instance 