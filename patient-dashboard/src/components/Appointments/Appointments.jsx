import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner, Badge, Button, Modal, Form } from 'react-bootstrap';
import fhirClient from '../../services/fhirClient';
import { formatDate, formatDateTime, getAppointmentStatus, getAppointmentType } from '../../utils/fhirUtils';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // For demo purposes, using a hardcoded patient ID
  const patientId = 'patient-1';

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const appointmentsData = await fhirClient.getPatientAppointments(patientId, { 
        _sort: 'date' 
      });
      
      setAppointments(appointmentsData.entry || []);
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError('Failed to load appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'booked': return 'success';
      case 'pending': return 'warning';
      case 'arrived': return 'info';
      case 'fulfilled': return 'primary';
      case 'cancelled': return 'danger';
      case 'noshow': return 'dark';
      case 'proposed': return 'secondary';
      default: return 'light';
    }
  };

  const getPriorityVariant = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'routine': return 'secondary';
      case 'urgent': return 'warning';
      case 'asap': return 'danger';
      case 'stat': return 'danger';
      default: return 'secondary';
    }
  };

  const isUpcoming = (appointmentDate) => {
    return new Date(appointmentDate) > new Date();
  };

  const isPast = (appointmentDate) => {
    return new Date(appointmentDate) < new Date();
  };

  const formatDuration = (start, end) => {
    if (!start || !end) return '';
    
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationMs = endTime - startTime;
    const durationMinutes = Math.round(durationMs / (1000 * 60));
    
    if (durationMinutes < 60) {
      return `${durationMinutes} minutes`;
    } else {
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
    }
  };

  const upcomingAppointments = appointments.filter(entry => 
    isUpcoming(entry.resource.start)
  );
  
  const pastAppointments = appointments.filter(entry => 
    isPast(entry.resource.start)
  );

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your appointments...</p>
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
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>My Appointments</h1>
              <p className="text-muted">Schedule and manage your healthcare appointments</p>
            </div>
            <Button variant="primary" onClick={() => setShowScheduleModal(true)}>
              Schedule New Appointment
            </Button>
          </div>
        </Col>
      </Row>

      {/* Upcoming Appointments */}
      <Row className="mb-4">
        <Col>
          <h3 className="mb-3">Upcoming Appointments ({upcomingAppointments.length})</h3>
          {upcomingAppointments.length > 0 ? (
            <Row className="g-3">
              {upcomingAppointments.map((entry, index) => {
                const appointment = entry.resource;
                return (
                  <Col lg={6} key={appointment.id || index}>
                    <Card className="h-100 border-primary">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="mb-0">{getAppointmentType(appointment)}</h5>
                          <div>
                            <Badge bg={getStatusVariant(appointment.status)} className="me-1">
                              {getAppointmentStatus(appointment)}
                            </Badge>
                            {appointment.priority && (
                              <Badge bg={getPriorityVariant(appointment.priority)}>
                                {appointment.priority}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mb-2">
                          <strong>Date & Time:</strong> {formatDateTime(appointment.start)}
                        </div>

                        {appointment.end && (
                          <div className="mb-2">
                            <strong>Duration:</strong> {formatDuration(appointment.start, appointment.end)}
                          </div>
                        )}

                        {appointment.participant && appointment.participant.length > 0 && (
                          <div className="mb-2">
                            <strong>Provider:</strong> 
                            {appointment.participant
                              .filter(p => p.actor?.display)
                              .map(p => p.actor.display)
                              .join(', ') || 'TBD'}
                          </div>
                        )}

                        {appointment.serviceType && appointment.serviceType.length > 0 && (
                          <div className="mb-2">
                            <strong>Service:</strong> 
                            {appointment.serviceType[0].coding?.[0]?.display || 
                             appointment.serviceType[0].text || 
                             'Healthcare service'}
                          </div>
                        )}

                        {appointment.comment && (
                          <div className="mb-2">
                            <strong>Notes:</strong> 
                            <small className="text-muted d-block">{appointment.comment}</small>
                          </div>
                        )}

                        <div className="mt-3 d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            Cancel
                          </Button>
                          <Button variant="outline-secondary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Alert variant="info">
              <Alert.Heading>No Upcoming Appointments</Alert.Heading>
              <p>You don't have any scheduled appointments. Would you like to schedule one?</p>
              <Button variant="primary" onClick={() => setShowScheduleModal(true)}>
                Schedule Appointment
              </Button>
            </Alert>
          )}
        </Col>
      </Row>

      {/* Past Appointments */}
      <Row>
        <Col>
          <h3 className="mb-3">Past Appointments ({pastAppointments.length})</h3>
          {pastAppointments.length > 0 ? (
            <Row className="g-3">
              {pastAppointments.slice(0, 6).map((entry, index) => {
                const appointment = entry.resource;
                return (
                  <Col lg={4} key={appointment.id || index}>
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{getAppointmentType(appointment)}</h6>
                          <Badge bg={getStatusVariant(appointment.status)}>
                            {getAppointmentStatus(appointment)}
                          </Badge>
                        </div>

                        <div className="mb-2">
                          <strong>Date:</strong> {formatDate(appointment.start)}
                        </div>

                        {appointment.participant && appointment.participant.length > 0 && (
                          <div className="mb-2">
                            <strong>Provider:</strong> 
                            <small className="d-block">
                              {appointment.participant
                                .filter(p => p.actor?.display)
                                .map(p => p.actor.display)
                                .join(', ') || 'Healthcare provider'}
                            </small>
                          </div>
                        )}

                        <div className="mt-3">
                          <Button variant="outline-secondary" size="sm">
                            View Summary
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Alert variant="info">No past appointments on record.</Alert>
          )}
        </Col>
      </Row>

      {/* Schedule Appointment Modal */}
      <Modal show={showScheduleModal} onHide={() => setShowScheduleModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Schedule New Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Appointment Type</Form.Label>
                  <Form.Select>
                    <option>Select appointment type...</option>
                    <option>General Check-up</option>
                    <option>Follow-up Visit</option>
                    <option>Specialist Consultation</option>
                    <option>Lab Work</option>
                    <option>Preventive Care</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Provider</Form.Label>
                  <Form.Select>
                    <option>Any available provider</option>
                    <option>Dr. Smith</option>
                    <option>Dr. Johnson</option>
                    <option>Dr. Williams</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control type="date" min={new Date().toISOString().split('T')[0]} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Time</Form.Label>
                  <Form.Select>
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 5PM)</option>
                    <option>Evening (5PM - 8PM)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Reason for Visit</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Please describe the reason for your appointment..." />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Priority</Form.Label>
              <Form.Select>
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
                <option value="asap">ASAP</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowScheduleModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowScheduleModal(false)}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Appointments;