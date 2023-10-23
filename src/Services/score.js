import api from './api'

export const saveScore = data => {
    return api.post('score', data)
}