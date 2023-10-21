import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { createUser as createUserService } from './Services/user'

const initialState = {
    user: null,
    status: 'idle',
    error: null
}

export const createUser = createAsyncThunk('user/create', async data => {
    const response = await createUserService(data)
    console.log(response.data)
    return response.data
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
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
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer