// Using React Context this search box will go on the Results page (Results.js)
// and on the Search Params page (SearchParams.js)
import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = e => {
    e.preventDefault();
    this.props.search();
  };

  render() {
    return (
      // Wrapping the return in consumer makes all of the data available from App inside
      // of the consumer which is here
      // Below <Consumer> is a pattern in React called "function as a child"
      <Consumer>
        {context => (
          <div className="search-params">
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onBlur={context.handleAnimalChange}
                  onChange={context.handleAnimalChange}
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
                  disabled={context.breeds.length === 0} // no selection for an animal with no breed
                  id="breed"
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
