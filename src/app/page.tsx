'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import Markdown from 'react-markdown';

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat();

	return (
		<main className="flex h-screen justify-center items-stretch flex-co p-4">
			<div className="flex flex-col w-full max-w-[40rem] border rounded-lg">
				<ScrollContainer>
					<Message
						role="bot"
						message="Hey, ich bin Bloq-ee! Wie kann ich dir bei deiner (zukünftigen) Website helfen?"
					/>
					{messages.map((m) => (
						<Message
							key={m.id}
							role={m.role === 'user' ? 'user' : 'bot'}
							message={m.content}
						/>
					))}
				</ScrollContainer>
				<form
					className="flex items-center p-2 border-t"
					onSubmit={handleSubmit}>
					<Input
						className="border-0 flex-1"
						placeholder={
							isLoading ? 'Bloq-ee antwortet…' : 'Wie kann Bloq-ee dir helfen?'
						}
						disabled={isLoading}
						type="text"
						value={input}
						onChange={handleInputChange}
					/>
					<Button className="ml-2" type="submit" disabled={isLoading}>
						Send
					</Button>
				</form>
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
			<Markdown className="rounded-lg rounded-bl-none bg-secondary p-2 text-sm max-w-[75%] prose">
				{message}
			</Markdown>
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
