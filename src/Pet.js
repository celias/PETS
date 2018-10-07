import React from 'react';
import { Link } from '@reach/router';

class Pet extends React.Component {
	render() {
		const { name, animal, breed, media, contact, id } = this.props;

		let photos = [];
		let value;

		if (media && media.photos && media.photos.photo) {
			photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
		}
		console.log(props);
		return (
			<Link to={`details/${id}`} className="pet">
				<div className="image-container">
					<img src={photos[0]} alt={name} />
				</div>
				<div className="info">
					<h1>{name}</h1>
					<h2>{`${animal} — ${breed} — ${contact}`}</h2>
				</div>
			</Link>
		);
	}
}

export default Pet;
