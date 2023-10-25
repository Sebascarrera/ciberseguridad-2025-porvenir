import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { 
    createUser as createUserService,
    getUser as getUserService
 } from '../Services/user'

const initialState = {
    user: null,
    status: 'idle',
    error: null
}

export const createUser = createAsyncThunk('user/create', async (data, { rejectWithValue }) => {
    try {
        const response = await createUserService(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const getUser = createAsyncThunk('user/get', async (_, { rejectWithValue, getState }) => {
    try {
        const user = getState().user.user
        const response = await getUserService(user.id)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser(state, action) {
            state.user = null
        },
        replaceUser(state, action) {
            state.user = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.user = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.detail ?? "General error"
            })
            .addCase(getUser.pending, (state, _) => {
                state.status = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.user = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.detail ??  "General error"
            })
            
    }
})

export const { clearUser, replaceUser } = userSlice.actions

export default userSlice.reducer