import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const PatientDetailsPage = () => {
  const { patientId } = useParams();

  return (
    <div>
      <h1 className="mb-4">Patient Details - {patientId}</h1>
      <Card>
        <Card.Body>
          <p>Patient details for {patientId} will be displayed here...</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PatientDetailsPage;