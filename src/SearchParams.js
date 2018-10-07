import React from 'react';
import { ANIMALS } from 'petfinder-client';

class SearchParams extends React.Component {
	// state is going to reflect the three search parameters needed
	state = {
		location: '',
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
			animal: event.target.animal
		});
	};

	handleBreedChange = event => {
		this.setState({
			breed: event.target.breed
		});
	};

	render() {
		return (
			<div className="search-params">
				{this.state.location}
				<label htmlFor="location">
					Location:
					<input
						id="location"
						value={this.state.location}
						placeholder="Location"
						onChange={this.handleLocationChange}
					/>
				</label>
				Animal
				<label forHTML="animal">
					<select
						id="animal"
						value={this.state.animal}
						onChange={this.handleAnimalChange}
						onBlur={this.handleAnimalChange}
					/>
					<option />
					<select>
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
