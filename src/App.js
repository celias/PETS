import React from 'react';
import { render } from 'react-dom';
import Pet from './Pet';

class App extends React.Component {
	handleTitleClick() {
		alert('You clicked the title!');
	}

	render() {
		// return React.createElement('div', {}, [
		//     React.createElement('h1', { onClick: this.handleTitleClick }, 'Adopt Me!'),
		//     React.createElement(Pet, {
		// name: 'Lu',
		// animal: 'cat',
		// breed: 'Black Tabby'
		//     }),
		//     React.createElement(Pet, {
		//         name: 'Remy',
		//         animal: 'dog',
		//         breed: 'Miniature Australian Shepherd'
		//     }),
		//     React.createElement(Pet, {
		//         name: 'Sabrina',
		//         animal: 'cat',
		//         breed: 'Tortoiseshell'
		//     })
		// ]);
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
