import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

/**
 * TestResult Component
 * 
 * Renders a single test result with expandable details
 * 
 * @param {Object} test - The test result data object
 */
const TestResult = ({ test }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': case 'good': return 'success';
      case 'attention': case 'borderline': return 'warning';
      case 'low': case 'high': case 'deficient': return 'danger';
      default: return 'secondary';
    }
  };

  const getValueStatus = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': case 'good': return 'text-success';
      case 'borderline': return 'text-warning';
      case 'high': case 'low': case 'deficient': return 'text-danger';
      default: return 'text-muted';
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="flex-grow-1">
            <h5 className="mb-2">
              {test.testName}
              <Badge 
                bg={getStatusVariant(test.status)} 
                className="ms-2"
              >
                {test.status}
              </Badge>
            </h5>
            <p className="text-muted mb-2">
              <strong>Summary:</strong> {test.summary}
            </p>
            <small className="text-muted">
              <i className="fas fa-calendar me-1"></i>
              {new Date(test.date).toLocaleDateString('en-AU')} • 
              <i className="fas fa-hospital ms-2 me-1"></i>
              {test.provider}
            </small>
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={toggleExpanded}
            aria-expanded={expanded}
          >
            <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
          </Button>
        </div>

        <Collapse in={expanded}>
          <div>
            <Card className="bg-light border-0">
              <Card.Body className="py-3">
                <h6 className="mb-3">
                  <i className="fas fa-clipboard-list me-2 text-info"></i>
                  Detailed Results
                </h6>
                <div className="row g-2">
                  {Object.entries(test.details).map(([testName, result]) => (
                    <div key={testName} className="col-md-6">
                      <div className="d-flex justify-content-between align-items-center p-2 bg-white rounded border">
                        <div>
                          <div className="fw-semibold small">{testName}</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Range: {result.range} {result.unit}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className={`fw-bold ${getValueStatus(result.status)}`}>
                            {result.value} {result.unit}
                          </div>
                          <Badge 
                            bg={getStatusVariant(result.status)} 
                            className="small"
                          >
                            {result.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default TestResult;