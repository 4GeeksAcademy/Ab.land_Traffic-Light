import React from "react";
import { useState, useEffect } from 'react';



//create your first component
const Home = () => {
	// turn ON the light
	const [colorOn, setColorOn] = useState('');

	let turnOn = (color) => { setColorOn(color) };

	// show/hide the Purple light

	const [showVoid, setShowVoid] = useState(false);

	let voidOn = () => {
		setShowVoid(prev => !prev)
	};
	// cycle the light

	const [isCycling, setIsCycling] = useState(false);

	let colors = ['red', 'yellow', 'green'];

	const startCycle = () => {
		setIsCycling(true);
	};

	useEffect(() => {
		let interval;
	
		if (isCycling) {
			interval = setInterval(() => {
				let currentColors = [...colors];
				if (showVoid) {
					currentColors.push('purple');
				}
	
				let currentIndex = currentColors.indexOf(colorOn);
				let nextIndex = (currentIndex + 1) % currentColors.length;
				let nextColor = currentColors[nextIndex];
	
				setColorOn(nextColor);
	
				if ((showVoid && nextColor === 'purple') || (!showVoid && nextColor === 'green')) {
					clearInterval(interval);
					setTimeout(() => {setColorOn(''); setIsCycling(false)}, 900)
					
				}
			}, 1000);
		}
	
		return () => clearInterval(interval);
	}, [isCycling, colorOn, showVoid]);

	return (
		<>
			<h1 className="text-center my-4">
				<span className={`border-bottom border-warning ${showVoid && 'text-white'}`}>Traffic Light</span>
			</h1>

			<div className="d-flex justify-content-center">
				<div className="pole"></div>
			</div>

			{showVoid && <div className="void-overlay"></div>}

			<div className="d-flex justify-content-center">
				<div className="d-flex p-2 g-2 shadow-lg mount">
					<div className={` red light  my-1 ${colorOn === 'red' ? 'glow-red' : ''} `}
						onClick={() => turnOn('red')}></div>
					<div className={` yellow light my-1 ${colorOn === 'yellow' ? 'glow-yellow' : ''} `}
						onClick={() => turnOn('yellow')}></div>
					<div className={`green light my-1 ${colorOn === 'green' ? 'glow-green' : ''} `}
						onClick={() => turnOn('green')}></div>
					{showVoid && (
						<div className={`purple light my-1 ${colorOn === 'purple' ? 'glow-purple' : ''} `}
							onClick={() => turnOn('purple')}></div>
					)}
				</div>
			</div>
			<div className="d-flex justify-content-center">
				<button type="button" class="btn btn-dark m-4" onClick={startCycle}>cycles the traffic light</button>
				<button type="button" class="btn btn-dark m-4" onClick={voidOn}>purple?</button>



			</div>
		</>
	);
};

export default Home;