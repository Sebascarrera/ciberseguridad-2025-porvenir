import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { createUser as createUserService } from '../Services/user'

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
                state.error = action.payload.detail
            })
    }
})

export const { clearUser, replaceUser } = userSlice.actions

export default userSlice.reducer