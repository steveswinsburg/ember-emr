import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const Medications = () => {
  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-pills text-primary me-2"></i>
                My Medications
              </h2>
              <p className="text-muted mb-0">Current and past prescriptions</p>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center py-5">
              <i className="fas fa-pills text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h5>Medications Coming Soon</h5>
              <p className="text-muted">
                This section will show your current and past medications with filtering options.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Medications;