import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner, Badge, Button } from 'react-bootstrap';
import fhirClient from '../../services/fhirClient';
import { formatDate, formatDateTime, getMedicationDisplay } from '../../utils/fhirUtils';

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For demo purposes, using a hardcoded patient ID
  const patientId = 'patient-1';

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const medicationsData = await fhirClient.getPatientMedications(patientId, { 
        _sort: '-authoredOn' 
      });
      
      setMedications(medicationsData.entry || []);
    } catch (err) {
      console.error('Error loading medications:', err);
      setError('Failed to load medications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'success';
      case 'on-hold': return 'warning';
      case 'cancelled': return 'danger';
      case 'completed': return 'secondary';
      case 'stopped': return 'dark';
      case 'draft': return 'info';
      default: return 'light';
    }
  };

  const getIntentVariant = (intent) => {
    switch (intent?.toLowerCase()) {
      case 'proposal': return 'info';
      case 'plan': return 'primary';
      case 'order': return 'success';
      case 'original-order': return 'success';
      case 'reflex-order': return 'warning';
      case 'filler-order': return 'secondary';
      case 'instance-order': return 'secondary';
      default: return 'light';
    }
  };

  const formatDosage = (dosageInstruction) => {
    if (!dosageInstruction || dosageInstruction.length === 0) {
      return 'See instructions';
    }

    const dosage = dosageInstruction[0];
    let instruction = '';

    if (dosage.text) {
      return dosage.text;
    }

    if (dosage.doseAndRate && dosage.doseAndRate.length > 0) {
      const dose = dosage.doseAndRate[0].doseQuantity;
      if (dose) {
        instruction += `${dose.value} ${dose.unit || dose.code || ''}`;
      }
    }

    if (dosage.timing?.repeat) {
      const repeat = dosage.timing.repeat;
      if (repeat.frequency && repeat.period) {
        instruction += ` ${repeat.frequency} time(s) every ${repeat.period} ${repeat.periodUnit || 'day(s)'}`;
      }
    }

    if (dosage.route?.coding?.[0]?.display) {
      instruction += ` - ${dosage.route.coding[0].display}`;
    }

    return instruction || 'See instructions';
  };

  const formatDispenseRequest = (dispenseRequest) => {
    if (!dispenseRequest) return null;

    let info = '';
    if (dispenseRequest.quantity) {
      info += `Quantity: ${dispenseRequest.quantity.value} ${dispenseRequest.quantity.unit || ''}`;
    }

    if (dispenseRequest.numberOfRepeatsAllowed !== undefined) {
      info += info ? `, ` : '';
      info += `Refills: ${dispenseRequest.numberOfRepeatsAllowed}`;
    }

    if (dispenseRequest.validityPeriod) {
      info += info ? `, ` : '';
      info += `Valid until: ${formatDate(dispenseRequest.validityPeriod.end)}`;
    }

    return info;
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your medications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h1>My Medications</h1>
          <p className="text-muted">Current and past prescriptions</p>
        </Col>
      </Row>

      {medications.length > 0 ? (
        <Row className="g-3">
          {medications.map((entry, index) => {
            const medication = entry.resource;
            return (
              <Col lg={6} key={medication.id || index}>
                <Card className="h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="mb-0">{getMedicationDisplay(medication)}</h5>
                      <div>
                        <Badge bg={getStatusVariant(medication.status)} className="me-1">
                          {medication.status}
                        </Badge>
                        <Badge bg={getIntentVariant(medication.intent)}>
                          {medication.intent}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-2">
                      <strong>Prescribed:</strong> {formatDateTime(medication.authoredOn)}
                    </div>

                    {medication.requester?.display && (
                      <div className="mb-2">
                        <strong>Prescriber:</strong> {medication.requester.display}
                      </div>
                    )}

                    <div className="mb-2">
                      <strong>Instructions:</strong> {formatDosage(medication.dosageInstruction)}
                    </div>

                    {medication.reasonReference && medication.reasonReference.length > 0 && (
                      <div className="mb-2">
                        <strong>Reason:</strong> {medication.reasonReference[0].display || 'Medical condition'}
                      </div>
                    )}

                    {medication.reasonCode && medication.reasonCode.length > 0 && (
                      <div className="mb-2">
                        <strong>Indication:</strong> 
                        {medication.reasonCode[0].text || 
                         medication.reasonCode[0].coding?.[0]?.display || 
                         'Treatment'}
                      </div>
                    )}

                    {medication.dispenseRequest && (
                      <div className="mb-2">
                        <strong>Dispense Info:</strong> {formatDispenseRequest(medication.dispenseRequest)}
                      </div>
                    )}

                    {medication.note && medication.note.length > 0 && (
                      <div className="mb-2">
                        <strong>Notes:</strong> 
                        <small className="text-muted d-block">
                          {medication.note[0].text}
                        </small>
                      </div>
                    )}

                    {medication.category && medication.category.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted">
                          Category: {medication.category[0].coding?.[0]?.display || 'Medication'}
                        </small>
                      </div>
                    )}

                    <div className="mt-3 d-flex gap-2">
                      {medication.status === 'active' && (
                        <>
                          <Button variant="outline-primary" size="sm">
                            Request Refill
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            View Details
                          </Button>
                        </>
                      )}
                      {medication.status !== 'active' && (
                        <Button variant="outline-secondary" size="sm">
                          View Details
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <Alert variant="info">
          <Alert.Heading>No Medications</Alert.Heading>
          <p>You don't have any medications on record. If you believe this is an error, please contact your healthcare provider.</p>
        </Alert>
      )}

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h5>Need Help with Your Medications?</h5>
              <p className="mb-3">
                If you have questions about your medications, dosage, or need to request refills, 
                please contact your healthcare provider or pharmacy.
              </p>
              <div className="d-flex gap-2">
                <Button variant="primary">Contact Provider</Button>
                <Button variant="outline-secondary">Pharmacy Information</Button>
                <Button variant="outline-info">Medication Reminders</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Medications;