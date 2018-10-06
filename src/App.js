import React from 'react';
import { render } from 'react-dom';
import pf from 'petfinder-client';
import Pet from './Pet';

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

class App extends React.Component {
	componentDidMount() {}
	render() {
		return (
			<div>
				<h1>Adopt me!</h1>
				<Pet name="Lu" animal="cat" breed="Black Tabby" />
				<Pet name="Remy" animal="dog" breed="Miniature Australian Shepherd" />
				<Pet name="Sabrina" animal="cat" breed="Tortoiseshell" />
			</div>
		);
	}
}

render(<App />, document.getElementById('root'));
