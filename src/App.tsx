import React, {useEffect, useState} from 'react'
import './App.css'

import io from 'socket.io-client'

const socket = io('https://chat-websocked-backend.herokuapp.com/')
//const socket = io('http://localhost:3003/')


export const App = () => {

	useEffect(() => {

		socket.on('init-messages-published', (messagesServer: any) => {
			setMessagesInChat(messagesServer)
		})

		socket.on('new-client-message-sent', (newMessageOfClient: any) => {
			setMessagesInChat(stateMessages => [...stateMessages, newMessageOfClient])
		})
	}, [])


	const [messagesInChat, setMessagesInChat] = useState<Array<any>>([])

	const [sendMessageUser, setSendMessageUser] = useState()

	const [clientName, setClientName] = useState('Kipish: ')


	return (

		<div className="App">
			<div className={'chat-root-cont'}>
				{messagesInChat.map(m => {
					return (
						<div className="chat-cont" key={m.userId}>
							<b>{m.userName}</b> {m.userMessage.text}
							<hr/>
						</div>
					)
				})}
			</div>
			<div>
				<textarea value={sendMessageUser} onChange={(e) => setSendMessageUser(e.currentTarget.value)}>

				</textarea>
				<button onClick={() => {
					socket.emit('client-message-sent', sendMessageUser)
					setSendMessageUser('')
				}}>send
				</button>


				<input type="text" value={clientName} onChange={(e) => {
					setClientName(e.currentTarget.value)
				}}/>
				<button onClick={() => {
					socket.emit('set-client-name', clientName)
				}}>set my name
				</button>
			</div>

		</div>
	)
}
