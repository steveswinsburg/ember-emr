import React, { useState } from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

/**
 * Allergy Component
 * 
 * Renders a single allergy item with expandable details
 * 
 * @param {Object} allergy - The allergy data object
 * @param {string} filterType - Whether this is 'current' or 'past' allergy
 */
const Allergy = ({ allergy, filterType }) => {
  const [expanded, setExpanded] = useState(false);

  const getSeverityVariant = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'secondary';
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
            onClick={toggleExpanded}
            aria-expanded={expanded}
          >
            <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
          </Button>
        </div>

        <Collapse in={expanded}>
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
  );
};

export default Allergy;