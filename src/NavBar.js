import React from "react";
import { Link } from "@reach/router";
import styled from "react-emotion";
import colors from "./colors";

const Container = styled("header")`
  background-color: ${colors.mutedDarkBlue};
  position: sticky;
  top: 0;
  z-index: 10;

  p {
    text-decoration: underline hotpink;
  }
`;

const NavLink = styled(Link)`
  &:hover {
    color: hotpink;
  }
  color: white;
  span {
    &:hover {
      text-decoration: underline salmon;
    }
  }
`;
const NavBar = () => {
  return (
    <Container>
      <NavLink to="/">Adopt me!</NavLink>

      <NavLink to="/search-params">
        <span aria-label="search" role="img">
          🔍
        </span>
      </NavLink>
    </Container>
  );
};

export default NavBar;
