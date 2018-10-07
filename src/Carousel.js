import React from 'react';

class Carousel extends React.Component {
	state = {
		photos: [],
		active: 0
	};

	static getDerivedStateFromProps({ media }) {
		let photos = [];
		if (media && media.photos && media.photos.photo) {
			photos = media.photos.photo.filter(photo => photo['@size'] === 'pn');
		}

		return { photos };
	}

	handleIndexClick = event => {
		this.setState({
			// the plus sign takes a string an coerces it into being
			// a number.
			active: +event.target.dataset.index
		});
	};
	render() {
		const { photos, active } = this.state;
		return (
			<div className="carousel">
				<img src={photos[active].value} alt="animal" />
				<div className="carousel-smaller">
					{photos.map((photo, index) => (
						// only buttons should have onClick handlers - needs to be refactored
						/* eslint-disable-next-line */
						<img
							onClick={this.handleIndexClick}
							data-index={index}
							key={photo.value}
							src={photo.value}
							className={index === active ? 'active' : ''}
							alt="animal thumnbail"
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Carousel;
