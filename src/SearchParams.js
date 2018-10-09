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

  // setState batches all the updates together
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };

  // getBreeds does not need to be an arrow function
  // because "this" is going to be called from places where binding isn't necessary
  getBreeds() {
    // If I have an animal selected, then I want to get breeds
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal }) // Returns a Promise
        .then(data => {
          if (
            data.petfinder && // Check if pf API exists.
            data.petfinder.breeds && // Check if breeds exists.
            // Check that breed is going to be an array of breeds
            // becuase some animals like pig do not have a breed selection.
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            // If a particular animal doesn't have any breeds
            // check for no breeds in that animal i.e. Pig
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      // If no animal is selected from the drop down
      // return empty array because we don't want to return breeds in that case.
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

        <label htmlFor="breed">
          Breed
          <select
            disabled={this.state.breeds.length === 0} // no selection for an animal with no breed
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
