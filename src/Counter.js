import { useState, useEffect, useReducer } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0.0);
	const [speed, setSpeed] = useState(0.001);
	const [started, setStarted] = useState(false);
	const [cost, setCost] = useState(1);
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (started) {
				setCount(count + speed);
			}
		}, 1);
		return function cleanup() {
			clearInterval(myInterval);
		};
	}, [count, speed, started]);
	return (
		<div className='flex flex-col space-y-4'>
			<p className='text-md self-center font-mono'>{count.toFixed(1)}</p>
			<button
				className='bg-slate-100 p-4 rounded-md text-sm disabled:opacity-60'
				onClick={() => {
					if (!started) {
						setStarted(true);
					} else {
						setCount(count - cost);
						setCost(cost * (1 + Math.random() / 2));
						setSpeed(speed * 1.15);
					}
				}}
				disabled={started ? count < cost : false}
			>
				{started
					? `make number go up faster (cost ${cost.toFixed(1)})`
					: 'make number go up'}
			</button>
		</div>
	);
}
