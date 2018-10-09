import React from "react";
import pf, { ANIMALS } from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class SearchParams extends React.Component {
  // state is going to reflect the three search parameters needed
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: [] // the available current breeds to select from
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
  // getBreeds does not need to be an arrow function
  // because "this" is going to be called from places where binding isn't necessary
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal }) // Returns a Promise
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed.isArray)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({ breeds: [] });
          }
        });
    } else {
      this.setState({ breeds: [] });
    }
  }
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
