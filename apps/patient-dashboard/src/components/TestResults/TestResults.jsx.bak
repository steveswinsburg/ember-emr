import React, { useState } from 'react';
import { Row, Col, Card, Badge, Button, Collapse } from 'react-bootstrap';

const TestResults = () => {
  const [filter, setFilter] = useState('recent');
  const [expandedItems, setExpandedItems] = useState({});

  // Mock data for test results
  const testResultsData = {
    recent: [
      {
        id: 1,
        testName: 'Full Blood Count',
        date: '2024-10-15',
        status: 'Normal',
        provider: 'City Medical Centre',
        summary: 'All values within normal range',
        details: {
          'White Blood Cells': { value: '6.2', range: '4.0-11.0', unit: '×10³/µL', status: 'Normal' },
          'Red Blood Cells': { value: '4.5', range: '4.2-5.2', unit: '×10⁶/µL', status: 'Normal' },
          'Haemoglobin': { value: '14.2', range: '12.0-16.0', unit: 'g/dL', status: 'Normal' },
          'Platelets': { value: '280', range: '150-450', unit: '×10³/µL', status: 'Normal' }
        }
      },
      {
        id: 2,
        testName: 'Lipid Panel',
        date: '2024-10-10',
        status: 'Attention',
        provider: 'City Medical Centre',
        summary: 'Cholesterol slightly elevated',
        details: {
          'Total Cholesterol': { value: '6.2', range: '<5.2', unit: 'mmol/L', status: 'High' },
          'LDL Cholesterol': { value: '4.1', range: '<3.0', unit: 'mmol/L', status: 'High' },
          'HDL Cholesterol': { value: '1.3', range: '>1.0', unit: 'mmol/L', status: 'Normal' },
          'Triglycerides': { value: '1.8', range: '<1.7', unit: 'mmol/L', status: 'Borderline' }
        }
      },
      {
        id: 3,
        testName: 'HbA1c',
        date: '2024-09-25',
        status: 'Normal',
        provider: 'Diabetes Clinic',
        summary: 'Good diabetes control',
        details: {
          'HbA1c': { value: '6.8', range: '<7.0', unit: '%', status: 'Good' }
        }
      }
    ],
    older: [
      {
        id: 4,
        testName: 'Thyroid Function',
        date: '2024-06-15',
        status: 'Normal',
        provider: 'City Medical Centre',
        summary: 'Thyroid function normal',
        details: {
          'TSH': { value: '2.1', range: '0.4-4.0', unit: 'mIU/L', status: 'Normal' },
          'Free T4': { value: '15.2', range: '9.0-19.0', unit: 'pmol/L', status: 'Normal' }
        }
      },
      {
        id: 5,
        testName: 'Vitamin D',
        date: '2024-03-20',
        status: 'Low',
        provider: 'City Medical Centre',
        summary: 'Vitamin D deficiency',
        details: {
          'Vitamin D': { value: '35', range: '>75', unit: 'nmol/L', status: 'Deficient' }
        }
      }
    ]
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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

  const currentResults = testResultsData[filter] || [];

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-vial text-primary me-2"></i>
                Test Results
              </h2>
              <p className="text-muted mb-0">Your laboratory and diagnostic test results</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filter Buttons */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button
              variant={filter === 'recent' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('recent')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-clock me-2"></i>
              Recent (Last 3 months) ({testResultsData.recent.length})
            </Button>
            <Button
              variant={filter === 'older' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('older')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-archive me-2"></i>
              Older ({testResultsData.older.length})
            </Button>
          </div>
        </Col>
      </Row>

      {/* Test Results List */}
      <Row className="g-3">
        {currentResults.length > 0 ? (
          currentResults.map((test) => (
            <Col xs={12} key={test.id}>
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
                      onClick={() => toggleExpanded(test.id)}
                      aria-expanded={expandedItems[test.id]}
                    >
                      <i className={`fas fa-chevron-${expandedItems[test.id] ? 'up' : 'down'}`}></i>
                    </Button>
                  </div>

                  <Collapse in={expandedItems[test.id]}>
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
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <Card className="text-center py-5">
              <Card.Body>
                <i className="fas fa-vial text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>No {filter} test results</h5>
                <p className="text-muted">
                  {filter === 'recent' 
                    ? "No test results from the last 3 months." 
                    : "No older test results available."}
                </p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TestResults;