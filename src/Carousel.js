import React from "react";
class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  };
  render() {
    const { photos, active } = this.state;
    const hero = photos[active]
      ? photos[active].value
      : "http://placecorgi.com/300/300";
    return (
      <div className="carousel">
        <img src={hero} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo.value}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumnbail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
