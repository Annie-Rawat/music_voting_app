import Server from 'socket.io'

export default function startServer(){
	var io = new Server().attach(3000);
}