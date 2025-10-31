import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      <Navigation />
      <Container fluid className="py-4">
        {children}
      </Container>
    </div>
  );
};

export default Layout;