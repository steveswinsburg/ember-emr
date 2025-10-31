import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Spinner, Badge, Tabs, Tab } from 'react-bootstrap';
import fhirClient from '../../services/fhirClient';
import { 
  formatDate, 
  formatDateTime, 
  getObservationValue, 
  getConditionDisplay 
} from '../../utils/fhirUtils';

const MedicalRecords = () => {
  const [observations, setObservations] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [diagnosticReports, setDiagnosticReports] = useState([]);
  const [immunizations, setImmunizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('observations');

  // For demo purposes, using a hardcoded patient ID
  const patientId = 'patient-1';

  useEffect(() => {
    loadMedicalRecords();
  }, []);

  const loadMedicalRecords = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        observationsData,
        conditionsData,
        diagnosticReportsData,
        immunizationsData
      ] = await Promise.all([
        fhirClient.getPatientObservations(patientId, { _sort: '-date' }),
        fhirClient.getPatientConditions(patientId, { _sort: '-recordedDate' }),
        fhirClient.getPatientDiagnosticReports(patientId, { _sort: '-date' }),
        fhirClient.getPatientImmunizations(patientId, { _sort: '-date' })
      ]);

      setObservations(observationsData.entry || []);
      setConditions(conditionsData.entry || []);
      setDiagnosticReports(diagnosticReportsData.entry || []);
      setImmunizations(immunizationsData.entry || []);
    } catch (err) {
      console.error('Error loading medical records:', err);
      setError('Failed to load medical records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getConditionStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'danger';
      case 'resolved': return 'success';
      case 'inactive': return 'secondary';
      default: return 'warning';
    }
  };

  const getObservationStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'final': return 'success';
      case 'preliminary': return 'warning';
      case 'amended': return 'info';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading your medical records...</p>
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
              <h2>
                <i className="fas fa-file-medical-alt text-primary me-2"></i>
                Medical Records
              </h2>
              <p className="text-muted mb-0">Complete overview of your health records and test results</p>
            </div>
          </div>
        </Col>
      </Row>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        {/* Observations Tab */}
        <Tab eventKey="observations" title={`Lab Results & Vitals (${observations.length})`}>
          <Row className="g-3">
            {observations.length > 0 ? (
              observations.map((entry, index) => {
                const observation = entry.resource;
                return (
                  <Col lg={6} key={observation.id || index}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">
                            {observation.code?.text || 
                             observation.code?.coding?.[0]?.display || 
                             'Unknown Test'}
                          </h6>
                          <Badge bg={getObservationStatusVariant(observation.status)}>
                            {observation.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Result:</strong> {getObservationValue(observation)}
                        </div>
                        
                        <div className="mb-2">
                          <strong>Date:</strong> {formatDateTime(observation.effectiveDateTime)}
                        </div>
                        
                        {observation.referenceRange && observation.referenceRange.length > 0 && (
                          <div className="mb-2">
                            <strong>Reference Range:</strong> 
                            {observation.referenceRange[0].low?.value && observation.referenceRange[0].high?.value
                              ? ` ${observation.referenceRange[0].low.value} - ${observation.referenceRange[0].high.value} ${observation.referenceRange[0].low.unit || ''}`
                              : ' See report'
                            }
                          </div>
                        )}
                        
                        {observation.category && observation.category.length > 0 && (
                          <small className="text-muted">
                            Category: {observation.category[0].coding?.[0]?.display || 'Lab'}
                          </small>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Alert variant="info">No lab results or vital signs available.</Alert>
              </Col>
            )}
          </Row>
        </Tab>

        {/* Conditions Tab */}
        <Tab eventKey="conditions" title={`Conditions (${conditions.length})`}>
          <Row className="g-3">
            {conditions.length > 0 ? (
              conditions.map((entry, index) => {
                const condition = entry.resource;
                return (
                  <Col lg={6} key={condition.id || index}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{getConditionDisplay(condition)}</h6>
                          <Badge bg={getConditionStatusVariant(condition.clinicalStatus?.coding?.[0]?.code)}>
                            {condition.clinicalStatus?.coding?.[0]?.display || 'Unknown'}
                          </Badge>
                        </div>
                        
                        {condition.onsetDateTime && (
                          <div className="mb-2">
                            <strong>Onset:</strong> {formatDate(condition.onsetDateTime)}
                          </div>
                        )}
                        
                        {condition.recordedDate && (
                          <div className="mb-2">
                            <strong>Recorded:</strong> {formatDate(condition.recordedDate)}
                          </div>
                        )}
                        
                        {condition.severity?.coding?.[0]?.display && (
                          <div className="mb-2">
                            <strong>Severity:</strong> {condition.severity.coding[0].display}
                          </div>
                        )}
                        
                        {condition.category && condition.category.length > 0 && (
                          <small className="text-muted">
                            Category: {condition.category[0].coding?.[0]?.display || 'Medical condition'}
                          </small>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Alert variant="info">No conditions on record.</Alert>
              </Col>
            )}
          </Row>
        </Tab>

        {/* Diagnostic Reports Tab */}
        <Tab eventKey="reports" title={`Reports (${diagnosticReports.length})`}>
          <Row className="g-3">
            {diagnosticReports.length > 0 ? (
              diagnosticReports.map((entry, index) => {
                const report = entry.resource;
                return (
                  <Col lg={12} key={report.id || index}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">
                            {report.code?.text || 
                             report.code?.coding?.[0]?.display || 
                             'Diagnostic Report'}
                          </h6>
                          <Badge bg={getObservationStatusVariant(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Date:</strong> {formatDateTime(report.effectiveDateTime)}
                        </div>
                        
                        {report.category && report.category.length > 0 && (
                          <div className="mb-2">
                            <strong>Category:</strong> {report.category[0].coding?.[0]?.display || 'Report'}
                          </div>
                        )}
                        
                        {report.conclusion && (
                          <div className="mb-2">
                            <strong>Conclusion:</strong> {report.conclusion}
                          </div>
                        )}
                        
                        {report.result && report.result.length > 0 && (
                          <div className="mb-2">
                            <strong>Related Results:</strong> {report.result.length} observation(s)
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Alert variant="info">No diagnostic reports available.</Alert>
              </Col>
            )}
          </Row>
        </Tab>

        {/* Immunizations Tab */}
        <Tab eventKey="immunizations" title={`Vaccines (${immunizations.length})`}>
          <Row className="g-3">
            {immunizations.length > 0 ? (
              immunizations.map((entry, index) => {
                const immunization = entry.resource;
                return (
                  <Col lg={6} key={immunization.id || index}>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">
                            {immunization.vaccineCode?.text || 
                             immunization.vaccineCode?.coding?.[0]?.display || 
                             'Vaccine'}
                          </h6>
                          <Badge bg={immunization.status === 'completed' ? 'success' : 'warning'}>
                            {immunization.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-2">
                          <strong>Date Given:</strong> {formatDate(immunization.occurrenceDateTime)}
                        </div>
                        
                        {immunization.lotNumber && (
                          <div className="mb-2">
                            <strong>Lot Number:</strong> {immunization.lotNumber}
                          </div>
                        )}
                        
                        {immunization.manufacturer?.display && (
                          <div className="mb-2">
                            <strong>Manufacturer:</strong> {immunization.manufacturer.display}
                          </div>
                        )}
                        
                        {immunization.note && immunization.note.length > 0 && (
                          <small className="text-muted">
                            Note: {immunization.note[0].text}
                          </small>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col>
                <Alert variant="info">No immunization records available.</Alert>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;