import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner, Badge } from 'react-bootstrap';
import fhirClient from '../../services/fhirClient';
import { 
  formatPatientName, 
  formatPatientAddress, 
  formatPatientPhone, 
  formatPatientEmail, 
  calculateAge, 
  formatDate 
} from '../../utils/fhirUtils';

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For demo purposes, using a hardcoded patient ID
  const patientId = 'patient-1';

  useEffect(() => {
    loadPatientData();
  }, []);

  const loadPatientData = async () => {
    try {
      setLoading(true);
      setError(null);
      const patientData = await fhirClient.getPatient(patientId);
      setPatient(patientData);
    } catch (err) {
      console.error('Error loading patient data:', err);
      setError('Failed to load patient information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your profile...</p>
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

  if (!patient) {
    return (
      <Alert variant="warning" className="mt-3">
        No patient information available.
      </Alert>
    );
  }

  const getGenderBadgeVariant = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male': return 'primary';
      case 'female': return 'danger';
      default: return 'secondary';
    }
  };

  const getMaritalStatusDisplay = (maritalStatus) => {
    if (!maritalStatus?.coding || maritalStatus.coding.length === 0) {
      return 'Not specified';
    }
    return maritalStatus.coding[0].display || maritalStatus.coding[0].code || 'Not specified';
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h1>My Profile</h1>
          <p className="text-muted">Personal information and contact details</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Basic Information */}
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Personal Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <p className="mb-0">{formatPatientName(patient)}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Patient ID</label>
                    <p className="mb-0"><code>{patient.id}</code></p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Date of Birth</label>
                    <p className="mb-0">{formatDate(patient.birthDate)}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Age</label>
                    <p className="mb-0">{calculateAge(patient.birthDate)} years old</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <p className="mb-0">
                      <Badge bg={getGenderBadgeVariant(patient.gender)}>
                        {patient.gender ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1) : 'Not specified'}
                      </Badge>
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Marital Status</label>
                    <p className="mb-0">{getMaritalStatusDisplay(patient.maritalStatus)}</p>
                  </div>
                </Col>
              </Row>

              {patient.language && patient.language.length > 0 && (
                <Row>
                  <Col md={12}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Preferred Language</label>
                      <p className="mb-0">
                        {patient.language[0].coding?.[0]?.display || 
                         patient.language[0].coding?.[0]?.code || 
                         'Not specified'}
                      </p>
                    </div>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Status Information */}
        <Col lg={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Account Status</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <label className="form-label fw-bold">Active Status</label>
                <p className="mb-0">
                  <Badge bg={patient.active ? 'success' : 'danger'}>
                    {patient.active ? 'Active' : 'Inactive'}
                  </Badge>
                </p>
              </div>

              {patient.deceased && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Deceased</label>
                  <p className="mb-0">
                    <Badge bg="dark">
                      {patient.deceasedDateTime ? formatDate(patient.deceasedDateTime) : 'Yes'}
                    </Badge>
                  </p>
                </div>
              )}

              {patient.multipleBirthBoolean !== undefined && (
                <div className="mb-3">
                  <label className="form-label fw-bold">Multiple Birth</label>
                  <p className="mb-0">
                    <Badge bg="info">
                      {patient.multipleBirthBoolean ? 'Yes' : 'No'}
                    </Badge>
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Contact Information */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Contact Information</h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <p className="mb-0">{formatPatientPhone(patient)}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <p className="mb-0">{formatPatientEmail(patient)}</p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <p className="mb-0">{formatPatientAddress(patient)}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Emergency Contact / General Practitioner */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Care Team</h5>
            </Card.Header>
            <Card.Body>
              {patient.generalPractitioner && patient.generalPractitioner.length > 0 ? (
                <div>
                  <label className="form-label fw-bold">General Practitioner</label>
                  {patient.generalPractitioner.map((gp, index) => (
                    <p key={index} className="mb-2">
                      {gp.display || gp.reference || 'Primary Care Provider'}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted">No general practitioner information available</p>
              )}

              {patient.contact && patient.contact.length > 0 && (
                <div className="mt-3">
                  <label className="form-label fw-bold">Emergency Contacts</label>
                  {patient.contact.map((contact, index) => (
                    <div key={index} className="mb-2">
                      <p className="mb-1">
                        {contact.name ? formatPatientName({name: [contact.name]}) : 'Emergency Contact'}
                      </p>
                      <small className="text-muted">
                        {contact.relationship?.[0]?.coding?.[0]?.display || 'Contact'}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PatientProfile;