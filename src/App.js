import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import NavBar from "./NavBar";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "San Francisco, CA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }

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
  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
