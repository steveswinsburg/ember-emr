import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import MyDetailsPage from './pages/MyDetailsPage';
import AllergiesPage from './pages/AllergiesPage';
import MedicationsPage from './pages/MedicationsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import MedicalRecordsPage from './pages/MedicalRecordsPage';
import TestResultsPage from './pages/TestResultsPage';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/my-details" element={<MyDetailsPage />} />
          <Route path="/allergies" element={<AllergiesPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/test-results" element={<TestResultsPage />} />
          
          {/* Legacy routes for backwards compatibility */}
          <Route path="/profile" element={<MyDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;