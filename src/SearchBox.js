// Using React Context this search box will go on the Results page (Results.js)
// and on the Search Params page (SearchParams.js)
import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchParams extends React.Component {
  // Array of strings of animals coming from the petfinder client
  render() {
    return (
      // Wrapping the return in consumer makes all of the data available from App inside
      // of the consumer which is here
      // Below <Consumer> is a pattern in React called "function as a child"
      <Consumer>
        {context => (
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
        )}
      </Consumer>
    );
  }
}

export default SearchParams;
