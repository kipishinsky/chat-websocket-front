import {applyMiddleware, combineReducers, createStore} from 'redux'
import {chatReducer} from './reducer/reducer'
import thunk from 'redux-thunk'

export type rootReducersType = ReturnType<typeof rootReducers>

const rootReducers = combineReducers({
	chat: chatReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk))