import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import ScoreForm from './components/ScoreForm';
import ScoreTable from './components/ScoreTable';
import "./App.css";
import InputForm from "./components/InputForm";

type Greeting = {
	id: number;
	name: string;
};

function App() {
	const [greeting, setGreeting] = useState<Greeting>();
	useEffect(() => {
		fetch("/api")
			.then(res => res.json())
			.then(setGreeting)
			.catch(console.error);
	}, [setGreeting]);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{greeting ? (<p>Hello from {greeting.name}</p>) : (<p>Loading...</p>)}
				<p>Edit <code>src/App.tsx</code> and save to reload.</p>
				<a className="App-link" href="https://reactjs.org"
					target="_blank" rel="noopener noreferrer">Learn React</a>
			</header>
			<InputForm />
			<ScoreForm />
			<ScoreTable rolls={[0,0,10,0,9,1,0,10,4,5,3,7,5,3,2,7,7,8,2,8,2]} />
		</div>
	);
}

export default App;