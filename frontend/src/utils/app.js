'use strict';

function sum(list) {
	return list.reduce((num, total) => (num + total), 0);
}

class BowlingFrame {
	constructor() {
		// type = open, spare, strike
		this.type = 'open';
		this.shots = [];
		this.isLastFrame = false;
	}

	takeShot(pinsHit) {
		if (this.shots.length < 2 && this.getType() === 'open' && !this.isLastFrame) {
			// If not last shot take up to two shots
			this.shots.push(pinsHit);
		} else if (this.isLastFrame && this.shots.length < 3) {
			// If last shot take up to 3 shots
			this.shots.push(pinsHit);
		} else {
			// Say we can't take a shot
			return false;
		}
		this.calculateType();
		// Say we took a shot
		return true;
	}

	getType() {
		return this.type;
	}

	calculateType() {
		let pinsHit = sum(this.shots);
		if (this.shots.length === 1 && pinsHit === 10) {
			this.type = 'strike';
		} else if (this.shots.length > 1 && pinsHit === 10) {
			this.type = 'spare';
		} else {
			this.type = 'open';
		}
	}
}

function scoreFrame(frame, nextFrames) {
	// Convert frames to list of shots
	let nextShots = nextFrames.flatMap(f => f.shots);

	if (frame.getType() === 'strike') {
		return 10 + nextShots[0] + nextShots[1];
	} else if (frame.getType() === 'spare') {
		return 10 + nextShots[0];
	} else {
		return sum(frame.shots);
	}
}


// =====================

// Test functions
function pinsHit(shot) {
	return [1,0,5,3,3,5,6,4,2,6,7,2,2,4,3,5,7,3,2,0][shot]
}

function game() {
	let shotNum = 0;
	// List of frames
	let scoreboard = [new BowlingFrame()];
	let currentFrame = 0;

	while (currentFrame !== 9) {
		console.log(`${currentFrame}: ${scoreboard[currentFrame].shots}`)

		while (!scoreboard[currentFrame].takeShot(pinsHit(shotNum))) {
			scoreboard.push(new BowlingFrame());
			currentFrame += 1;
			scoreboard[currentFrame].takeShot(pinsHit(shotNum));
			shotNum++;
		}
		shotNum++;
	}

	let frameScores = [];
	for (let frame = 0; frame < scoreboard.length; frame++) {
		frameScores.push(scoreFrame(scoreboard[frame], scoreboard.slice(frame+1)));	
	}
	let finalScore = sum(frameScores);
	console.log(finalScore)
}


game();

// ===============
let scoreboard = [new BowlingFrame()];
const input = document.getElementById('input-form');

input.addEventListener('submit', (event) => {
    event.preventDefault();
    const pinsHit = Number.parseInt(Array.from(new FormData(input).values())[0]);
	let currentFrame = scoreboard.length-1;
	console.log(`${currentFrame +1}: ${scoreboard[currentFrame].shots}`)
	if (!scoreboard[currentFrame].takeShot(pinsHit) && currentFrame < 9) {
		scoreboard.push(new BowlingFrame());
		currentFrame += 1;
		if (currentFrame > 8) {
			scoreboard[currentFrame].isLastFrame = true;
		}
		scoreboard[currentFrame].takeShot(pinsHit);
	}
	document.getElementById(`${currentFrame+1}-${scoreboard[currentFrame].shots.length}`).innerText = pinsHit;
	console.log(pinsHit);
});

const calc = document.getElementById('calc-form');

calc.addEventListener('submit', (event) => {
    event.preventDefault();
    let frameScores = [];
	for (let frame = 0; frame < scoreboard.length; frame++) {
		frameScores.push(scoreFrame(scoreboard[frame], scoreboard.slice(frame+1)));	
	}
	
	let finalScore = sum(frameScores);
	console.log(finalScore);
	console.log(scoreboard.flatMap(f => f.shots))
	const score = document.getElementById('score');
	score.innerText = finalScore;
});
calc.addEventListener('reset', (event) => {
    event.preventDefault();

	scoreboard = [new BowlingFrame()];
	document.getElementById('score').innerText = '';
	document.getElementById('pins-hit').value = '';
});