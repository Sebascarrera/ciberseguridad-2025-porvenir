import { configureStore } from '@reduxjs/toolkit'

import ruletaReducer from './Games/Ruleta/Redux'
import userReducer from './Redux'

export default configureStore({
  reducer: {
    user: userReducer,
    ruleta: ruletaReducer,
  },
})