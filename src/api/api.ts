import io from "socket.io-client"

export const api = {
	socket: null as null | SocketIOClient.Socket,

	createConnection() {
		//this.socket = io('https://chat-websocked-backend.herokuapp.com/')
		this.socket = io('http://localhost:3003/')
	},
	destroyConnection() {
		this.socket?.disconnect()
		this.socket = null
	},
	subscribe(
		initMessagesHandler: (messagesServer: any, fn: () => void) => void,
		newClientMessageHandler: (newMessageOfClient: any) => void,
		userTypingHandler: (user: any) => void,

	) {
		this.socket?.on('init-messages-published', initMessagesHandler)
		this.socket?.on('new-client-message-sent',newClientMessageHandler)
		this.socket?.on('user-typing-message', userTypingHandler)
	},
	sendClientMessage( message: string ) {
		this.socket?.emit('client-message-sent', message, (error: string | null) => {
			if (error) {
				alert(error)
			}
		})
	},
	sendClientName( name: string ) {

		this.socket?.emit('set-client-name', name)
	},
	typeMessage() {
		this.socket?.emit('client-typing')
	}
}