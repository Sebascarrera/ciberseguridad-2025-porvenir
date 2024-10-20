import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    mundo1: 0,
    mundo2: 0,
    mundo3: 0,
    mundo4: 0,
    times: 0,
    total: 12,
    finished: false,
}

export const antihackersSlice = createSlice({
    name: 'antihackers',
    initialState,
    reducers: {
        validateTotal(state) {
            state.finished = (state.mundo1 + state.mundo2 + state.mundo3 + state.mundo4) == state.total
        },
        increaseMundo1(state, action) {
            state.mundo1 += 1;
            state.times += 1;
        },
        increaseMundo2(state, action) {
            state.mundo2 += 1;
            state.times += 1;
        },
        increaseMundo3(state, action) {
            state.mundo3 += 1;
            state.times += 1;
        },
        increaseMundo4(state, action) {
            state.mundo4 += 1;
            state.times += 1;
        },
        resetMundos(state, action) {
            state.mundo1 = initialState.mundo1;
            state.mundo2 = initialState.mundo2;
            state.mundo3 = initialState.mundo3;
            state.mundo4 = initialState.mundo4;
            state.times = 0;
            state.finished = false;
        }
    }
})

export const { increaseMundo1, increaseMundo2, increaseMundo3, increaseMundo4, resetMundos, validateTotal } = antihackersSlice.actions


export default antihackersSlice.reducer