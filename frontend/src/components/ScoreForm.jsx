import React, { useEffect, useState } from "react";

//interface ScoreTableProps {
//	rolls: number[];
//	currentRoll: number;
//}

class ScoreForm extends React.Component   {

	constructor(props ) {
		super(props);
		this.state = { rolls: [], currentRoll: 0 };
	}

	static getDerivedStateFromProps(props, state) {
		return ({ rolls: props.rolls, currentRoll: props.currentRoll });
	}

	async onSubmit(event) {
		event.preventDefault();
		console.log('Calculating Score')
		this.setState(await fetch('http://localhost:8080/score', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			console.log(response)
			return response.json()
		}));
		console.log('Score Calculated.')
	}
	
	async onReset(event) {
		event.preventDefault();
		console.log('Reset Game')
		this.setState(await fetch('http://localhost:8080/api/reset').then(res => res.json()));
		console.log('Game Reset.')
	}
	onChange = (e) => {
		this.setState({ currentRoll: Number(e.currentTarget.value) });
	};

	render() {
		return (
			<form id="calc-form" onSubmit={this.onSubmit}>
				<button type="submit">Calculate</button>
				<button type="reset" onReset={this.onReset}>Reset</button>
				<output id="score"></output>
			</form>
		);
	}

};

export default ScoreForm;