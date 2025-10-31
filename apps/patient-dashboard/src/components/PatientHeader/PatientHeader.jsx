import React from 'react';
import { Alert, Card } from 'react-bootstrap';
import { Alert as DesignAlert, Badge } from '@ember-emr/design-system';

/**
 * PatientHeader Component
 * 
 * CRITICAL SAFETY COMPONENT - Must be displayed on every patient-related view
 * Shows essential patient identification information to prevent medical errors
 * 
 * @param {Object} patient - Patient object with demographics
 * @param {string} patient.name - Patient's full name
 * @param {string} patient.gender - Patient's gender
 * @param {string} patient.dateOfBirth - Patient's date of birth (YYYY-MM-DD)
 * @param {string} patient.ihi - Individual Healthcare Identifier (Australia)
 * @param {boolean} showAlert - Whether to show safety alert (default: true)
 */
const PatientHeader = ({ 
  patient = {}, 
  showAlert = true 
}) => {
  // Default patient data for development/demo
  const defaultPatient = {
    name: 'John Smith',
    gender: 'Male',
    dateOfBirth: '1985-03-15',
    ihi: '8003608833357361'
  };

  const patientData = { ...defaultPatient, ...patient };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Unknown';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatIHI = (ihi) => {
    if (!ihi) return 'Not provided';
    // Format IHI as XXXX XXXX XXXX XXXX
    return ihi.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className="patient-header mb-3">
      {showAlert && (
        <DesignAlert type="info" className="mb-3">
          <strong>Patient Safety Notice:</strong> Always verify patient identity before proceeding with any medical actions.
        </DesignAlert>
      )}
      
      <Card className="border-primary">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-user-injured me-2"></i>
              Patient Information
            </h5>
            <Badge type="info">
              Age: {calculateAge(patientData.dateOfBirth)}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="patient-detail mb-2">
                <strong>Name:</strong>
                <span className="ms-2 fs-5 text-primary fw-bold">
                  {patientData.name}
                </span>
              </div>
              <div className="patient-detail mb-2">
                <strong>Gender:</strong>
                <span className="ms-2">
                  {patientData.gender}
                  {patientData.gender === 'Male' && <i className="fas fa-mars ms-1 text-info"></i>}
                  {patientData.gender === 'Female' && <i className="fas fa-venus ms-1 text-danger"></i>}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="patient-detail mb-2">
                <strong>Date of Birth:</strong>
                <span className="ms-2">
                  {formatDate(patientData.dateOfBirth)}
                </span>
              </div>
              <div className="patient-detail mb-2">
                <strong>IHI:</strong>
                <span className="ms-2 font-monospace text-success fw-bold">
                  {formatIHI(patientData.ihi)}
                </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientHeader;