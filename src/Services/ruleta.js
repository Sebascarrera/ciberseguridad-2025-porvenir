import axios from "axios";

const instance = axios.create({
    baseURL: 'https://ruleta-del-saber.uc.r.appspot.com'
});

const client = "/categories/client/652f4a3263ae13f23561dae7"

export const fetchWheelSlices = () => {
    return instance.get(client)
}

export default instance 