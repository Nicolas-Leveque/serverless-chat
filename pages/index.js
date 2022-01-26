import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import ChatZone from '../components/ChatZone';
import InputZone from '../components/InputZone';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Chat</title>
				<meta name="description" content="Une webapp de chat en serverless" />
				<link rel="icon" href="/grinning_cat.ico" />
			</Head>
			<Header />
			<ChatZone />
			<InputZone />
		</div>
	);
}
