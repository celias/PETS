import React from 'react';
import pf from 'petfinder-client';
import { PacmanLoader } from 'react-spinners';

const petfinder = pf({
	key: process.env.API_KEY,
	secret: process.env.API_SECRET
});

class Details extends React.Component {
	state = {
		loading: true
	};
	componentDidMount() {
		petfinder.pet
			.get({
				output: 'full',
				id: this.props.id
			})
			.then(data => {
				const pet = data.petfinder.pet;
				let breed;

				if (Array.isArray(pet.breeds.breed)) {
					breed = pet.breeds.breed.join(', ');
				} else {
					breed = pet.breeds.breed;
				}

				this.setState({
					name: pet.name,
					animal: pet.animal,
					location: `${pet.contact.city}, ${pet.contact.state}`,
					description: pet.description,
					media: pet.media,
					breed,
					loading: false
				});
			})
			.catch(err => {
				navigate('/');
			});
	}
	render() {
		if (this.state.loading) {
			return <PacmanLoader />;
		}
		const { name, animal, breed, description, location } = this.state;
		return (
			<div className="details">
				<div>
					<h1>{name}</h1>
					<h2>
						{animal} - {breed} - {location}
					</h2>
					<p>{description}</p>
				</div>
			</div>
		);
	}
}

export default Details;
