import { configureStore } from '@reduxjs/toolkit'

import ruletaReducer from './Games/Ruleta/Redux'

export default configureStore({
  reducer: {
    ruleta: ruletaReducer,
  },
})