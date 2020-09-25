import {Dispatch} from 'redux'
import {api} from '../../api/api'

const initialState = {
	stateMessages: [],
	typingUsers: []
}

export const chatReducer = (state: any = initialState, action: any) => {
	switch (action.type) {
		case 'messages-received' : {
			return {...state, stateMessages: action.messages}
		}
		case 'new-message-received' : {
			return {
				...state,
				stateMessages: [...state.stateMessages, action.message],
				typingUsers: state.typingUsers.filter( (u: any) => u.id !== action.message.id)
			}
		}
		case 'user-typing-message' : {
			return {...state, typingUsers: [...state.typingUsers.filter( (u: any) => u.id !== action.user.id), action.user]}
		}
		default:
			return state
	}
}


const messageReceived = (messages: any) => ({type: 'messages-received', messages})
const newMessageReceived = (message: any) => ({type: 'new-message-received', message})
const typingUserAdded = (user: any) => ({type: 'user-typing-message', user})

export const createConnection = () => (dispatch: Dispatch) => {
	api.createConnection()
	api.subscribe((messages: any) => {
		dispatch(messageReceived(messages))
	}, (message: any) => {
		dispatch(newMessageReceived(message))
	}, (user: any) => {
		dispatch(typingUserAdded(user))})
}

export const destroyConnection = () => (dispatch: Dispatch) => {
	api.destroyConnection()
}

export const sendClientName = (name: string) => (dispatch: Dispatch) => {

	api.sendClientName(name)
}

export const sendClientMessage = (message: string) => (dispatch: Dispatch) => {
	api.sendClientMessage(message)
}

export const typeMessage = () => (dispatch: Dispatch) => {
	api.typeMessage()
}