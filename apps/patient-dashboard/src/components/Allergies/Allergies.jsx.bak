import React, { useState } from 'react';
import { Row, Col, Card, Badge, Button, Collapse } from 'react-bootstrap';

const Allergies = () => {
  const [filter, setFilter] = useState('current');
  const [expandedItems, setExpandedItems] = useState({});

  // Mock data for allergies
  const allergiesData = {
    current: [
      {
        id: 1,
        allergen: 'Penicillin',
        severity: 'High',
        reaction: 'Anaphylaxis, difficulty breathing, swelling',
        dateRecorded: '2023-01-15',
        notes: 'Severe allergic reaction experienced during hospitalization. Always check before prescribing antibiotics.'
      },
      {
        id: 2,
        allergen: 'Shellfish',
        severity: 'Medium',
        reaction: 'Hives, nausea, stomach cramps',
        dateRecorded: '2022-08-20',
        notes: 'Reaction occurs within 30 minutes of consumption. Avoid all seafood restaurants.'
      },
      {
        id: 3,
        allergen: 'Pollen (Spring)',
        severity: 'Low',
        reaction: 'Sneezing, runny nose, itchy eyes',
        dateRecorded: '2021-03-10',
        notes: 'Seasonal allergy, typically worse in September-November. Responds well to antihistamines.'
      }
    ],
    past: [
      {
        id: 4,
        allergen: 'Latex',
        severity: 'Medium',
        reaction: 'Skin irritation, contact dermatitis',
        dateRecorded: '2020-06-15',
        dateResolved: '2023-01-10',
        notes: 'Allergy appears to have resolved after exposure therapy. Last reaction was over 2 years ago.'
      }
    ]
  };

  const toggleExpanded = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getSeverityVariant = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
    }
  };

  const currentAllergies = allergiesData[filter] || [];

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-exclamation-triangle text-primary me-2"></i>
                Allergies
              </h2>
              <p className="text-muted mb-0">Your known allergies and sensitivities</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filter Buttons */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button
              variant={filter === 'current' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('current')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-exclamation-circle me-2"></i>
              Current ({allergiesData.current.length})
            </Button>
            <Button
              variant={filter === 'past' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('past')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-history me-2"></i>
              Past ({allergiesData.past.length})
            </Button>
          </div>
        </Col>
      </Row>

      {/* Allergies List */}
      <Row className="g-3">
        {currentAllergies.length > 0 ? (
          currentAllergies.map((allergy) => (
            <Col xs={12} key={allergy.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="flex-grow-1">
                      <h5 className="mb-2">
                        {allergy.allergen}
                        <Badge 
                          bg={getSeverityVariant(allergy.severity)} 
                          className="ms-2"
                        >
                          {allergy.severity} Risk
                        </Badge>
                      </h5>
                      <p className="text-muted mb-2">
                        <strong>Reaction:</strong> {allergy.reaction}
                      </p>
                      <small className="text-muted">
                        Recorded: {new Date(allergy.dateRecorded).toLocaleDateString('en-AU')}
                        {allergy.dateResolved && (
                          <span> • Resolved: {new Date(allergy.dateResolved).toLocaleDateString('en-AU')}</span>
                        )}
                      </small>
                    </div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => toggleExpanded(allergy.id)}
                      aria-expanded={expandedItems[allergy.id]}
                    >
                      <i className={`fas fa-chevron-${expandedItems[allergy.id] ? 'up' : 'down'}`}></i>
                    </Button>
                  </div>

                  <Collapse in={expandedItems[allergy.id]}>
                    <div>
                      <Card className="bg-light border-0">
                        <Card.Body className="py-2">
                          <h6 className="mb-2">
                            <i className="fas fa-sticky-note me-2 text-info"></i>
                            Additional Notes
                          </h6>
                          <p className="mb-0 small">{allergy.notes}</p>
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
                <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: '3rem' }}></i>
                <h5>No {filter} allergies recorded</h5>
                <p className="text-muted">
                  {filter === 'current' 
                    ? "You don't have any current allergies on record." 
                    : "No past allergies have been resolved."}
                </p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Allergies;