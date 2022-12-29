'use strict';

// Game variables
const SCORE = {
	currentRoll: 0,
	rolls: Array.from({ length: 10}, () => 0),
}

// UI Updates
const drawFrame = (rolls, isLastFrame)  => {
	const frameTotal = rolls.reduce((v, s) => (v+s), 0);
	return(
		`<td>${rolls[0] == 0 ? '-' : (rolls[0] == 10 ? 'X' : rolls[0]) }</td>
		<td>${rolls[1] == 0 ? '-' : (frameTotal == 10 ? '/' : rolls[1]) }</td>`.
		concat(isLastFrame ? `<td>${frameTotal == 10 ? '/' : (rolls[2] == 0 ? '-' : rolls[2])}</td>` : ''
	));
}

const refreshTable = (rolls) => {
	const table = document.getElementById('score-entries');
	table.innerHTML = '';
	table.innerHTML = Array.from({length: 10}, (_, i) => i)
			.map(v => (`${drawFrame(rolls.slice(v*2, v*2+2+Number(v === 10)), v === 10)}`))
			.join('');
}

// =====================

// Test functions
function pinsHit(shot) {
	return [1,0,5,3,3,5,6,4,2,6,7,2,2,4,3,5,7,3,2,0][shot]
}

// ===============
const input = document.getElementById('input-form');

input.addEventListener('submit', (event) => {
    event.preventDefault();
    const pinsHit = Number.parseInt(Array.from(new FormData(input).values())[0]);

	console.log(pinsHit);
});

const calc = document.getElementById('calc-form');

calc.addEventListener('submit', (event) => {
    event.preventDefault();
    
});
calc.addEventListener('reset', (event) => {
    event.preventDefault();
	fetch('http://localhost:8080/api/reset')
		.then(res => res.json())
		.then(json => { SCORE.currentRoll = json.currentRoll; SCORE.rolls = json.rolls; })
		.catch(e => console.log(e))
	refreshTable(SCORE.rolls);
	document.getElementById('score').innerText = '';
	document.getElementById('pins-hit').value = '';
});