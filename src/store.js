import { configureStore } from '@reduxjs/toolkit'

import ruletaReducer from './Games/Ruleta/Redux/slice'

export default configureStore({
  reducer: {
    ruleta_slices: ruletaReducer,
  },
})