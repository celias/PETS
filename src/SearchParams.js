import React from 'react';
import { ANIMALS } from 'petfinder-client';

class SearchParams extends React.Component {
	// state is going to reflect the three search parameters needed
	state = {
		location: 'Seattle, WA',
		animal: '',
		breed: ''
	};

	handleLocationChange = event => {
		this.setState({
			location: event.target.value
		});
	};

	handleAnimalChange = event => {
		this.setState({
			animal: event.target.value
		});
	};

	handleBreedChange = event => {
		this.setState({
			breed: event.target.value
		});
	};
	// Array of strings of animals coming from the petfinder client
	render() {
		return (
			<div className="search-params">
				<label htmlFor="location">
					{this.state.location}
					<input
						onChange={this.handleLocationChange}
						id="location"
						value={this.state.location}
						placeholder="Location"
					/>
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						value={this.state.animal}
						onBlur={this.handleAnimalChange}
						onChange={this.handleAnimalChange}
					>
						<option />
						{ANIMALS.map(animal => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
			</div>
		);
	}
}

export default SearchParams;
