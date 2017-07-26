import Server from 'socket.io'

export default function startServer(store){
	var io = new Server().attach(3000);

	store.subscibe({
		() => io.emit('state', store.getState().toJS())
	})

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS())
	})
}
