import React from 'react';
import { Container } from 'react-bootstrap';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <Container fluid className="px-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;