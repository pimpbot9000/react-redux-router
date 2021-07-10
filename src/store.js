import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const reducer = combineReducers({
  filter: filterReducer,
  notes: noteReducer
})

// thunk allows asynchronous action creators
const store = createStore(reducer, applyMiddleware(thunk))


store.subscribe(() => {
  console.log(store.getState())
})

export default store