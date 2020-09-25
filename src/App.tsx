import React, {useEffect, useRef, useState} from 'react'
import './App.css'

import {useDispatch, useSelector} from 'react-redux'
import {rootReducersType} from './bll/redux-store'
import {
	createConnection,
	destroyConnection,
	sendClientMessage,
	sendClientName,
	typeMessage
} from './bll/reducer/reducer'

export const App = () => {

	const messagesInChat = useSelector((state: rootReducersType) => state.chat.stateMessages)
	const typingUsers = useSelector((state: rootReducersType) => state.chat.typingUsers)
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(createConnection())
		return () => {
			dispatch(destroyConnection())
		}
	}, [])


	//const [messagesInChat, setMessagesInChat] = useState<Array<any>>([])

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
				{messagesInChat.map((m: any) => {
					return (
						<div className="chat-cont" key={m.userId}>
							<b>{m.userName}</b> {m.userMessage.text}
							<hr/>
						</div>
					)
				})}

				{typingUsers.map((m: any) => {
					return (
						<div className="chat-cont" key={m.userId}>
							<b>{m.userName}</b> ...
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
						onKeyPress={ () => {
							debugger
							dispatch(typeMessage())
						}}
						onChange={(e) => {
							setSendMessageUser(e.currentTarget.value)
						}}/>
					<button
						className={'btn'}
						onClick={() => {
							debugger
							dispatch(sendClientMessage(sendMessageUser))
						}}>send message
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
							dispatch(sendClientName(clientName))
						}}>set my name
					</button>
				</div>

			</div>
		</div>
	)
}
