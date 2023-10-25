import api from "./api";

export const createUser = data => {
    return api.post('users', data)
}

export const getUser = id => {
    return api.get('users/' + id)
}