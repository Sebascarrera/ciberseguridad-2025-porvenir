import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { saveScore as saveScoreService } from '../Services/score'

import { resetAnsweredQuestions } from '../Games/Ruleta/Redux'
import { replaceUser } from './user'

const initialState = {
    current: null,
    started: false,
    start_time: 0,
    end_time: 0,
    status: 'idle',
    error: null
}

export const saveScore = createAsyncThunk('scores/create', async (data, { dispatch, rejectWithValue, getState }) => {
    try {
        dispatch(endGame())

        const state = getState()
        const time = Math.abs(state.scores.end_time - state.scores.start_time)
        const user_id = state.user.user.id
        const score = { quantity: state.scores.current ?? 0, time, game: data, user_id }
        
        if(data === "ruleta") {
            dispatch(resetAnsweredQuestions())
        }
        const response = await saveScoreService(score)
        const user = response.data
        dispatch(replaceUser(user))
        return user
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        startGame(state, action) {
            state.started = true
            state.start_time = (new Date()).getTime()
        },
        markScore(state, action) {
            state.current += action.payload
        },
        endGame(state, action) {
            state.end_time = (new Date()).getTime()
            state.started = false
        },
        clearCurrentScore(state, action ) {
            state.current = 0
        }
    },
    extraReducers(builder) {
        builder
            .addCase(saveScore.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(saveScore.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.score = 0
            })
            .addCase(saveScore.rejected, (state, action) => {
                state.status = 'failed'
                // state.error = action.payload.detail
            })
    }
})

export const { startGame, markScore, endGame, clearCurrentScore } = scoreSlice.actions

export default scoreSlice.reducer