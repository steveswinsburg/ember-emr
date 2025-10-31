import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import fhirClient from '../../services/fhirClient';
import { formatPatientName, formatDate, getObservationValue, getConditionDisplay } from '../../utils/fhirUtils';

const Dashboard = () => {
  const [patient, setPatient] = useState(null);
  const [recentObservations, setRecentObservations] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For demo purposes, using a hardcoded patient ID
  // In a real app, this would come from authentication/session
  const patientId = 'patient-1';

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load patient data and recent information in parallel
      const [
        patientData,
        observationsData,
        conditionsData,
        appointmentsData
      ] = await Promise.all([
        fhirClient.getPatient(patientId),
        fhirClient.getPatientObservations(patientId, { _count: 5, _sort: '-date' }),
        fhirClient.getPatientConditions(patientId, { _count: 5 }),
        fhirClient.getPatientAppointments(patientId, { _count: 3, _sort: 'date' })
      ]);

      setPatient(patientData);
      setRecentObservations(observationsData.entry || []);
      setConditions(conditionsData.entry || []);
      setAppointments(appointmentsData.entry || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
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
        <p className="mt-3">Loading your dashboard...</p>
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
          <h1>Welcome back, {patient ? formatPatientName(patient) : 'Patient'}!</h1>
          <p className="text-muted">Here's an overview of your health information</p>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Recent Observations */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Test Results</h5>
            </Card.Header>
            <Card.Body>
              {recentObservations.length > 0 ? (
                <div>
                  {recentObservations.slice(0, 3).map((entry, index) => {
                    const observation = entry.resource;
                    return (
                      <div key={observation.id || index} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">
                            {observation.code?.text || 
                             observation.code?.coding?.[0]?.display || 
                             'Unknown Test'}
                          </span>
                          <small className="text-muted">
                            {formatDate(observation.effectiveDateTime)}
                          </small>
                        </div>
                        <div className="text-muted">
                          {getObservationValue(observation)}
                        </div>
                      </div>
                    );
                  })}
                  {recentObservations.length === 0 && (
                    <p className="text-muted">No recent test results available</p>
                  )}
                </div>
              ) : (
                <p className="text-muted">No recent test results available</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Active Conditions */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Active Conditions</h5>
            </Card.Header>
            <Card.Body>
              {conditions.length > 0 ? (
                <div>
                  {conditions.slice(0, 3).map((entry, index) => {
                    const condition = entry.resource;
                    return (
                      <div key={condition.id || index} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">
                            {getConditionDisplay(condition)}
                          </span>
                          <small className="text-muted">
                            {formatDate(condition.onsetDateTime)}
                          </small>
                        </div>
                        <div className="text-muted">
                          Status: {condition.clinicalStatus?.coding?.[0]?.code || 'Unknown'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted">No active conditions on record</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Appointments */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Upcoming Appointments</h5>
            </Card.Header>
            <Card.Body>
              {appointments.length > 0 ? (
                <div>
                  {appointments.slice(0, 2).map((entry, index) => {
                    const appointment = entry.resource;
                    return (
                      <div key={appointment.id || index} className="mb-3">
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">
                            {appointment.appointmentType?.text || 'General Appointment'}
                          </span>
                          <small className="text-muted">
                            {formatDate(appointment.start)}
                          </small>
                        </div>
                        <div className="text-muted">
                          Status: {appointment.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted">No upcoming appointments scheduled</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Quick Actions */}
        <Col lg={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" onClick={() => window.location.href = '/appointments'}>
                  Schedule Appointment
                </button>
                <button className="btn btn-outline-secondary" onClick={() => window.location.href = '/medical-records'}>
                  View All Records
                </button>
                <button className="btn btn-outline-info" onClick={() => window.location.href = '/medications'}>
                  Manage Medications
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;