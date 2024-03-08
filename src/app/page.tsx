'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Home() {
	return (
		<main className="flex h-screen justify-center items-stretch flex-co p-4">
			<div className="flex flex-col w-full max-w-[40rem] border rounded-lg">
				<ScrollContainer>
					<Message
						role={'bot'}
						message={"Hey! I'm Bloq-ee. How can I help you today?"}
					/>
					<Message role={'user'} message={'I want a new website.'} />
				</ScrollContainer>
				<div className="flex items-center p-2 border-t">
					<Input
						className="border-0 flex-1"
						placeholder="Type a message"
						type="text"
					/>
					<Button className="ml-2" type="submit">
						Send
					</Button>
				</div>
			</div>
		</main>
	);
}

function Message({ role, message }: { role: 'bot' | 'user'; message: string }) {
	return (
		<div
			className={cn(
				'flex items-end gap-2 w-full',
				role === 'user' ? 'self-end flex-row-reverse' : ''
			)}>
			<div className="rounded-full h-8 w-8 bg-secondary relative">
				<div className="absolute w-3/4 aspect-square top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<Image
						src={`/${role === 'user' ? 'user' : 'bot'}.png`}
						alt="Bloq-ee"
						fill={true}
					/>
				</div>
			</div>
			<div className="rounded-lg rounded-bl-none bg-secondary p-2 text-sm max-w-[75%]">
				{message}
			</div>
		</div>
	);
}

function ScrollContainer({ children }: { children: React.ReactNode }) {
	const chatWindow = useRef<HTMLDivElement>(null);
	const chatStack = useRef<HTMLDivElement>(null);

	// start the container at the bottom
	useEffect(() => {
		const outerHeight = chatWindow.current?.clientHeight;
		const innerHeight = chatStack.current?.clientHeight;

		chatWindow.current?.scrollTo({
			top: innerHeight && outerHeight ? innerHeight - outerHeight : 0,
			left: 0,
		});
	}, []);

	// scroll smoothly on change of children
	useEffect(() => {
		const outerHeight = chatWindow.current?.clientHeight;
		const innerHeight = chatStack.current?.clientHeight;

		chatWindow.current?.scrollTo({
			top: innerHeight && outerHeight ? innerHeight - outerHeight : 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [children]);

	return (
		<div className="overflow-y-auto flex-1 relative" ref={chatWindow}>
			<div
				className="absolute top-0 left-0 right-0 min-h-full p-4 flex flex-col gap-2 justify-end"
				ref={chatStack}>
				{children}
			</div>
		</div>
	);
}
