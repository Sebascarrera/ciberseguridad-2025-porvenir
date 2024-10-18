import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchCategories as fetchCategoriesAPI } from '../../../Services/preguntas'

const initialState = {
    questions: 0,
    avatar: null,
    slices: [],
    status: 'idle',
    error: null
}

export const fetchCategories = createAsyncThunk('slices/fetchPreguntas',  async () => {
    const response = await fetchCategoriesAPI()
    return response.data.data
})

export const preguntasSlice = createSlice({
    name: 'preguntas',
    initialState,
    reducers: {
        selectAvatar(state, action) {
            state.avatar = action.payload
        },
        bumpAnsweredQuestion(state, action) {
            state.questions = state.questions + 1
        },
        resetAnsweredQuestions(state, action) {
            state.questions = 0
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.slices = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { selectAvatar, bumpAnsweredQuestion, resetAnsweredQuestions } = preguntasSlice.actions


export default preguntasSlice.reducer