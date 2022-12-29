import React, { useEffect, useState } from "react";

const checkRoll = async (event, score) => {
	event.preventDefault();
	console.log(`Roll #${score.currentRoll}: ${event.target.value}`);
	score.rolls[score.currentRoll] = event.target.value;
	return await fetch('http://backend:8080/api/roll', {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(score)
	}).then(res => res.json())
};

const InputForm = (props) => {
	return (
		<form id="input-form">
			<label>Enter your next shot: <input id="pins-hit" name="pins-hit" type="number" min="0" max="10" required /></label>
			<button type="submit">Submit</button>
		</form>
	);
};

export default InputForm;