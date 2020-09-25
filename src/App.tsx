import React, {useEffect, useState} from 'react'
import './App.css'

import io from 'socket.io-client'

//const socket = io('https://chat-websocked-backend.herokuapp.com/')
const socket = io('http://localhost:3003/')


export const App = () => {

	useEffect( () => {
		//debugger
		socket.on('init-messages-published', (messagesServer: any) => {
			setMessagesInChat(messagesServer)
		} )
	}, [] )


	const [messagesInChat, setMessagesInChat] = useState<Array<any>>([])

	const [sendMessageUser, setSendMessageUser] = useState()

	//debugger
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
			</div>

		</div>
	)
}
