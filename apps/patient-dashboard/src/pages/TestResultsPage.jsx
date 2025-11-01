import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import TestResult from '../components/TestResults/TestResult';

const TestResultsPage = () => {
  const [testResults, setTestResults] = useState([]);
  const [filter, setFilter] = useState('recent');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in real app this would come from FHIR client
  const mockTestResultsData = {
    recent: [
      {
        id: 1,
        testName: 'Full Blood Count',
        date: '2024-10-15',
        status: 'Normal',
        provider: 'City Medical Centre',
        summary: 'All values within normal range',
        details: {
          'White Blood Cells': { value: '6.2', range: '4.0-11.0', unit: '×10³/µL', status: 'Normal' },
          'Red Blood Cells': { value: '4.5', range: '4.2-5.2', unit: '×10⁶/µL', status: 'Normal' },
          'Haemoglobin': { value: '14.2', range: '12.0-16.0', unit: 'g/dL', status: 'Normal' },
          'Platelets': { value: '280', range: '150-450', unit: '×10³/µL', status: 'Normal' }
        }
      },
      {
        id: 2,
        testName: 'Lipid Panel',
        date: '2024-10-10',
        status: 'Attention',
        provider: 'City Medical Centre',
        summary: 'Cholesterol slightly elevated',
        details: {
          'Total Cholesterol': { value: '6.2', range: '<5.2', unit: 'mmol/L', status: 'High' },
          'LDL Cholesterol': { value: '4.1', range: '<3.0', unit: 'mmol/L', status: 'High' },
          'HDL Cholesterol': { value: '1.3', range: '>1.0', unit: 'mmol/L', status: 'Normal' },
          'Triglycerides': { value: '1.8', range: '<1.7', unit: 'mmol/L', status: 'Borderline' }
        }
      },
      {
        id: 3,
        testName: 'HbA1c',
        date: '2024-09-25',
        status: 'Normal',
        provider: 'Diabetes Clinic',
        summary: 'Good diabetes control',
        details: {
          'HbA1c': { value: '6.8', range: '<7.0', unit: '%', status: 'Good' }
        }
      }
    ],
    older: [
      {
        id: 4,
        testName: 'Thyroid Function',
        date: '2024-06-15',
        status: 'Normal',
        provider: 'City Medical Centre',
        summary: 'Thyroid function normal',
        details: {
          'TSH': { value: '2.1', range: '0.4-4.0', unit: 'mIU/L', status: 'Normal' },
          'Free T4': { value: '15.2', range: '9.0-19.0', unit: 'pmol/L', status: 'Normal' }
        }
      },
      {
        id: 5,
        testName: 'Vitamin D',
        date: '2024-03-20',
        status: 'Low',
        provider: 'City Medical Centre',
        summary: 'Vitamin D deficiency',
        details: {
          'Vitamin D': { value: '35', range: '>75', unit: 'nmol/L', status: 'Deficient' }
        }
      }
    ]
  };

  useEffect(() => {
    loadTestResults();
  }, []);

  const loadTestResults = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTestResults(mockTestResultsData);
    } catch (err) {
      console.error('Error loading test results:', err);
      setError('Failed to load test results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const currentResults = testResults[filter] || [];
  const recentCount = testResults.recent?.length || 0;
  const olderCount = testResults.older?.length || 0;

  return (
    <div>
      {/* Page Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>
                <i className="fas fa-vial text-primary me-2"></i>
                Test Results
              </h2>
              <p className="text-muted mb-0">Your laboratory and diagnostic test results</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filter Controls */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-2">
            <Button
              variant={filter === 'recent' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('recent')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-clock me-2"></i>
              Recent (Last 3 months) ({recentCount})
            </Button>
            <Button
              variant={filter === 'older' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('older')}
              className="d-flex align-items-center"
            >
              <i className="fas fa-archive me-2"></i>
              Older ({olderCount})
            </Button>
          </div>
        </Col>
      </Row>

      {/* Test Results List */}
      <Row className="g-3">
        {loading ? (
          <Col xs={12}>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading test results...</p>
            </div>
          </Col>
        ) : error ? (
          <Col xs={12}>
            <div className="alert alert-danger">
              {error}
            </div>
          </Col>
        ) : currentResults.length > 0 ? (
          currentResults.map((test) => (
            <Col xs={12} key={test.id}>
              <TestResult test={test} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <i className="fas fa-vial text-muted mb-3" style={{ fontSize: '3rem' }}></i>
              <h5>No {filter} test results</h5>
              <p className="text-muted">
                {filter === 'recent' 
                  ? "No test results from the last 3 months." 
                  : "No older test results available."}
              </p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TestResultsPage;