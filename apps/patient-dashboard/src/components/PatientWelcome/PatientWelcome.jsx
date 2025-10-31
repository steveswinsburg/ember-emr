import React from 'react';
import { Card } from 'react-bootstrap';

/**
 * PatientWelcome Component
 * 
 * Simple welcome header for patient dashboard
 * Shows a friendly greeting to the patient viewing their own information
 * 
 * @param {Object} patient - Patient object with basic info
 * @param {string} patient.name - Patient's name for greeting
 */
const PatientWelcome = ({ 
  patient = {} 
}) => {
  // Default patient data for development/demo
  const defaultPatient = {
    name: 'Fred Smith'
  };

  const patientData = { ...defaultPatient, ...patient };

  // Extract first name for a more personal greeting
  const firstName = patientData.name ? patientData.name.split(' ')[0] : 'Patient';

  return (
    <div className="patient-welcome mb-4">
      <Card className="border-0 bg-light">
        <Card.Body className="py-3">
          <div className="d-flex align-items-center">
            <div className="welcome-icon me-3">
              <i className="fas fa-heart text-danger" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <div>
              <h4 className="mb-1 text-primary">
                Welcome back, {firstName}!
              </h4>
              <p className="text-muted mb-0">
                Here's your personal health dashboard
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientWelcome;