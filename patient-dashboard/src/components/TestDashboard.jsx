import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TestDashboard = () => {
  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Test Dashboard</h1>
          <p>If you can see this, React and Bootstrap are working!</p>
        </Col>
      </Row>
      
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5>Test Card</h5>
            </Card.Header>
            <Card.Body>
              <p>This is a test card to verify Bootstrap components are working.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TestDashboard;