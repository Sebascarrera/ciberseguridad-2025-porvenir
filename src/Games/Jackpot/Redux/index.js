import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchWheelSlices } from '../../../Services/ruleta'

const initialState = {
    questions: 0,
    avatar: null,
    slices: [],
    status: 'idle',
    error: null
}

export const fetchSlices = createAsyncThunk('slices/fetchSlices',  async () => {
    const response = await fetchWheelSlices()
    return response.data.data
})

export const ruletaSlice = createSlice({
    name: 'ruleta',
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
            .addCase(fetchSlices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSlices.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.slices = action.payload
            })
            .addCase(fetchSlices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { selectAvatar, bumpAnsweredQuestion, resetAnsweredQuestions } = ruletaSlice.actions


export default ruletaSlice.reducer