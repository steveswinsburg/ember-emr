import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Allergy from '../components/Allergies/Allergy';

const AllergiesPage = () => {
  const [allergies, setAllergies] = useState([]);
  const [filter, setFilter] = useState('current');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in real app this would come from FHIR client
  const mockAllergiesData = {
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

  useEffect(() => {
    loadAllergies();
  }, []);

  const loadAllergies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAllergies(mockAllergiesData);
    } catch (err) {
      console.error('Error loading allergies:', err);
      setError('Failed to load allergies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const currentAllergies = allergies[filter] || [];
  const currentCount = allergies.current?.length || 0;
  const pastCount = allergies.past?.length || 0;

  return (
    <div>
      {/* Page Header */}
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

      {/* Filter Controls */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button
              variant={filter === 'current' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('current')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-exclamation-circle me-2"></i>
              Current ({currentCount})
            </Button>
            <Button
              variant={filter === 'past' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('past')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-history me-2"></i>
              Past ({pastCount})
            </Button>
          </div>
        </Col>
      </Row>

      {/* Allergies List */}
      <Row className="g-3">
        {loading ? (
          <Col xs={12}>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading allergies...</p>
            </div>
          </Col>
        ) : error ? (
          <Col xs={12}>
            <div className="alert alert-danger">
              {error}
            </div>
          </Col>
        ) : currentAllergies.length > 0 ? (
          currentAllergies.map((allergy) => (
            <Col xs={12} key={allergy.id}>
              <Allergy allergy={allergy} filterType={filter} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: '3rem' }}></i>
              <h5>No {filter} allergies recorded</h5>
              <p className="text-muted">
                {filter === 'current' 
                  ? "You don't have any current allergies on record." 
                  : "No past allergies have been resolved."}
              </p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AllergiesPage;