import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SidebarNavigation from './SidebarNavigation';
import PatientWelcome from '../PatientWelcome/PatientWelcome';

const Layout = ({ children }) => {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Sidebar Navigation */}
        <Col xs="auto">
          <SidebarNavigation />
        </Col>
        
        {/* Main Content Area */}
        <Col className="main-content">
          <div className="p-4">
            {/* Patient Welcome Header */}
            <PatientWelcome />
            
            {/* Page Content */}
            <div className="page-content">
              {children}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;