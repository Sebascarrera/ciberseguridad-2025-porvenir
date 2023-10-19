import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { fetchWheelSlices } from '../../../Services/ruleta'

const initialState = {
    slices: [],
    status: 'idle',
    error: null
}

export const fetchSlices = createAsyncThunk('slices/fetchSlices',  async () => {
    const response = await fetchWheelSlices()
    return response.data.data
})

export const ruletaSlice = createSlice({
    name: 'ruleta_slices',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSlices.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSlices.fulfilled, (state, action) => {
                state.status = 'succeded'
                state.slices = state.slices.concat(action.payload)
            })
            .addCase(fetchSlices.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default ruletaSlice.reducer