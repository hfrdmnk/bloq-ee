import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-screen justify-center items-stretch flex-co p-4">
			<div className="flex flex-col w-full max-w-[40rem] border rounded-lg">
				<div className="flex-1 overflow-auto flex flex-col justify-end gap-2 p-4">
					<Message
						role={'bot'}
						message={"Hey! I'm Bloq-ee. How can I help you today?"}
					/>
					<Message role={'user'} message={'I want a new website.'} />
				</div>
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
