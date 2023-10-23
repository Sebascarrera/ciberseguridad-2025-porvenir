import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import UserReducer from './user'
import RuletaReducer from '../Games/Ruleta/Redux'
import ScoreReducer  from './scores'

const appReducer = combineReducers({
  user: UserReducer,
  ruleta: RuletaReducer,
  scores: ScoreReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'user/clear') {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root')
    state = {}
  }
  return appReducer(state, action)
}

export default rootReducer
