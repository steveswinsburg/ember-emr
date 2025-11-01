import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import PatientProfile from '../components/PatientProfile/PatientProfile';

const MyDetailsPage = () => {
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
      
      // In a real app, this would use the FHIR client
      // const patientData = await fhirClient.getPatient(patientId);
      
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock patient data
      const mockPatient = {
        id: 'patient-1',
        name: 'Fred Smith',
        gender: 'Male',
        birthDate: '1985-03-15',
        address: {
          line: ['123 Main Street'],
          city: 'Sydney',
          state: 'NSW',
          postalCode: '2000',
          country: 'Australia'
        },
        telecom: [
          { system: 'phone', value: '+61 2 9555 1234', use: 'mobile' },
          { system: 'email', value: 'fred.smith@email.com', use: 'home' }
        ],
        identifier: [
          { system: 'http://ns.electronichealth.net.au/id/hi/ihi/1.0', value: '8003608833357361' }
        ]
      };
      
      setPatient(mockPatient);
    } catch (err) {
      console.error('Error loading patient data:', err);
      setError('Failed to load patient information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-user-circle text-primary me-2"></i>
                My Details
              </h2>
              <p className="text-muted mb-0">Personal information and contact details</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Patient Profile Content */}
      {loading ? (
        <Row>
          <Col xs={12}>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading your details...</p>
            </div>
          </Col>
        </Row>
      ) : error ? (
        <Row>
          <Col xs={12}>
            <div className="alert alert-danger">
              {error}
            </div>
          </Col>
        </Row>
      ) : (
        <PatientProfile patient={patient} />
      )}
    </div>
  );
};

export default MyDetailsPage;