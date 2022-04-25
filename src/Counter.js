import { useState, useEffect, useReducer } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);
	const [speed, setSpeed] = useState(0.001);
	const [started, setStarted] = useState(false);
	const [cost, setCost] = useState(1);
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (started) {
				setCount(count + speed);
				localStorage.setItem('count', count);
			}
		}, 1);

		const saveInteval = setInterval(() => {
			if (started) {
				localStorage.setItem('count', count);
			}
		}, 1000);
		return function cleanup() {
			clearInterval(myInterval);
			clearInterval(saveInteval);
		};
	}, [count, speed, started]);
	useEffect(() => {
		const getSavedCount = () => {
			const savedCount = localStorage.getItem('count');
			return savedCount ? Number(savedCount) : 0;
		};
		const getSavedSpeed = () => {
			const savedSpeed = localStorage.getItem('speed');
			return savedSpeed ? Number(savedSpeed) : 0.001;
		};
		const getSavedStarted = () => {
			const savedCount = localStorage.getItem('count');
			return savedCount ? true : false;
		};
		const getSavedCost = () => {
			const savedCost = localStorage.getItem('cost');
			return savedCost ? Number(savedCost) : 1;
		};
		setCount(getSavedCount());
		setSpeed(getSavedSpeed());
		setStarted(getSavedStarted());
		setCost(getSavedCost());
	}, []);
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
						const mCost = cost * (1 + Math.random() / 2);
						setCost(mCost);
						setSpeed(speed * 1.2);
						localStorage.setItem('speed', speed * 1.2);
						localStorage.setItem('cost', mCost);
					}
				}}
				disabled={started ? count < cost : false}
			>
				{started
					? `make number go up faster (cost ${cost.toFixed(1)})`
					: 'make number go up'}
			</button>
			<button
				onClick={() => {
					setStarted(false);
					setCount(0);
					setCost(1);
					setSpeed(0.001);
					localStorage.clear();
				}}
			>
				reset
			</button>
		</div>
	);
}
