// import Container from 'react-bootstrap/Container';
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {

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

          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header