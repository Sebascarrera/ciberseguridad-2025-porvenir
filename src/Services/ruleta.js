import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

const client = "/all/client/652f4a3263ae13f23561dae7"

export const fetchWheelSlices = () => {
    return instance.get(client)
}

export default instance 