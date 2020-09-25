import React, {useEffect, useRef, useState} from 'react'
import './App.css'

import io from 'socket.io-client'

//const socket = io('https://chat-websocked-backend.herokuapp.com/')
const socket = io('http://localhost:3003/')


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

	const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)

	const [lastScrollTop, setLastScrollTop] = useState(0)

	useEffect(() => {
		if (isAutoScrollActive) {
			messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
		}
	}, [messagesInChat])

	const messagesAnchorRef = useRef<HTMLDivElement>(null)

	return (

		<div className="App">
			<div className={'chat-root-cont'} onScroll={(e) => {
				// хз
				const element = e.currentTarget

				const maxScrollPosition = element.scrollHeight - element.clientHeight

				if (element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10) {
					setIsAutoScrollActive(true)
				} else {
					setIsAutoScrollActive(false)
				}
				setLastScrollTop(element.scrollTop)

			}}>
				{messagesInChat.map(m => {
					return (
						<div className="chat-cont" key={m.userId}>
							<b>{m.userName}</b> {m.userMessage.text}
							<hr/>
						</div>
					)
				})}
				<div ref={messagesAnchorRef}>

				</div>
			</div>
			<div className={'items'}>
				<div className={'item'}>
					<input
						className={'input'}
						value={sendMessageUser}
						onChange={(e) => {
							setSendMessageUser(e.currentTarget.value)
						}}/>
					<button
						className={'btn'}
						onClick={() => {
							socket.emit('client-message-sent', sendMessageUser)
							setSendMessageUser('')
						}}>send
					</button>
				</div>


				<div>
					<input
						className={'input'}
						type="text" value={clientName}
						onChange={(e) => {
							setClientName(e.currentTarget.value)
						}}/>
					<button
						className={'btn'}
						onClick={() => {
							socket.emit('set-client-name', clientName)
						}}>set my name
					</button>
				</div>

			</div>

		</div>
	)
}
