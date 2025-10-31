import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Patient Portal</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link>My Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/medical-records">
              <Nav.Link>Medical Records</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/medications">
              <Nav.Link>Medications</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/appointments">
              <Nav.Link>Appointments</Nav.Link>
            </LinkContainer>
          </Nav>
          
          <Nav>
            <Nav.Link>Welcome, Patient</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;