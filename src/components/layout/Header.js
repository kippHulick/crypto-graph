// import Container from 'react-bootstrap/Container';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand>CryptoGraph</Navbar.Brand>
          </LinkContainer>

          <Nav className="me-auto">

            <LinkContainer to="/">
              <Nav.Link>home</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/list">
              <Nav.Link>Coins</Nav.Link>
            </LinkContainer>

            {isAuthenticated && !isLoading ?
              <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
              :
              <button onClick={() => loginWithRedirect()}>
                Log In
              </button>
            }

          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header