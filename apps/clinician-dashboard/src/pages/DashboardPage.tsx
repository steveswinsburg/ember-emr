import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Button } from '@ember-emr/design-system';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="mb-4">Clinician Dashboard</h1>
      
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Patients Today</Card.Title>
              <h3 className="text-primary">15</h3>
              <Button variant="primary" size="sm">View Schedule</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pending Results</Card.Title>
              <h3 className="text-warning">7</h3>
              <Button variant="warning" size="sm">Review Results</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Urgent Tasks</Card.Title>
              <h3 className="text-danger">3</h3>
              <Button variant="danger" size="sm">View Tasks</Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Messages</Card.Title>
              <h3 className="text-info">12</h3>
              <Button variant="info" size="sm">Read Messages</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Today's Appointments</h5>
            </Card.Header>
            <Card.Body>
              <p className="text-muted">Upcoming appointments will be displayed here...</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body className="d-grid gap-2">
              <Button variant="primary">Search Patients</Button>
              <Button variant="secondary">New Appointment</Button>
              <Button variant="success">Add Patient</Button>
              <Button variant="info">View Reports</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;