import api from "./api";

export const createUser = data => {
    return api.post('users', data)
}