import React from 'react';
import { Navbar, Container, Nav, Button, NavItem } from 'react-bootstrap';

import './navbar-view.scss';

export function NavBarView() {
  const Username = localStorage.getItem("user");

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

    return (
    <Navbar className="navbar" bg="light" variant="light" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/profile">Profile</Nav.Link>
            
          </Nav>
          <NavItem>
            <p style={{'color':'grey'}}>Logged in as:</p></NavItem>         
          <NavItem style={{'color':'black'}}> &nbsp; {Username}</NavItem>
          <Nav.Link className="d-flex">
          <Button variant="danger" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }

