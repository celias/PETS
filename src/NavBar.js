import React from "react";
import { Link } from "@reach/router";
import styled from "react-emotion";

const Container = styled("header")`
  background-color: gray;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavBar = () => {
  return (
    <Container>
      <Link to="/">Adopt me!</Link>
      <Link to="/search-params">
        <span aria-label="search" role="img">
          🔍
        </span>
      </Link>
    </Container>
  );
};

export default NavBar;
