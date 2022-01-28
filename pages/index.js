import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import userGen from 'username-generator';
import Head from 'next/head';
import Header from '../components/Header';

const user = userGen.generateUsername();

export default function Home() {
	const [connected, setConnected] = useState(false);

	const [chat, setChat] = useState([]);
	const [msg, setMsg] = useState('');

	useEffect(() => {
		fetch('/api/socketio').finally(() => {
			const socket = io();

			socket.on('connect', () => {
				console.log('connected');
				socket.emit('hello');
				setConnected(true);
			});

			socket.on('message', (data) => {
				chat.push(data);
				setChat([...chat]);
			});

			socket.on('disconnect', () => {
				console.log('disconnect');
			});
		});
	}, []);

	const sendMsg = async () => {
		if (msg) {
			const message = {
				user,
				msg,
			};
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(message),
			});
			if (res.ok) {
				setMsg('');
			}
		}
	};
	return (
		<div>
			<Head>
				<title>Chat</title>
				<meta name="description" content="Une webapp de chat en serverless" />
				<link rel="icon" href="/grinning_cat.ico" />
			</Head>
			<Header />
			<div className="flex flex-col w-full h-screen bg-gray-200">
				<div className="flex-1 p-4">Exemple de chat</div>
			</div>
			<div className="bg-gray-400 p-4 h-20 sticky bottom-0">
				<div className="flex flex-row flex-1 h-full rounded divide-gray-200 divide-x">
					<div className="pr-2 flex-1">
						<input
							type="text"
							className="w-full h-full rounded border-gray-500"
							value={msg}
							disabled={!connected}
							onChange={(e) => {
								setMsg(e.target.value);
							}}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									sendMsg();
								}
							}}
						/>
					</div>
					<div className="flex flex-col justify-center items-stretch pl-2">
						<button
							className="bg-blue-500 rounded shadow text-sm text-white h-full w-full px-2"
							disabled={!connected}
							onClick={sendMsg}
						>
							SEND
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
