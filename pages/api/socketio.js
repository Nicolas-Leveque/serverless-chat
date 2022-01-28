import { Server } from 'socket.io';

const handlerIO = async (req, res) => {
	if (!res.socket.server.io) {
		console.log('Creation de la connexion');

		const io = new Server(res.socket.server);

		io.on('connection', (socket) => {
			socket.broadcast.emit('user connected');
			socket.on('hello', (msg) => {
				socket.emit('hello');
			});
		});
		res.socket.server.io = io;
	} else {
		console.log('already running');
	}
	res.end();
};

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handlerIO;
