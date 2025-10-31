import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FHIRClient, createFHIRConfig } from '@ember-emr/shared-services';
import '@ember-emr/design-system/dist/css/health-design-system.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import PatientSearchPage from './pages/PatientSearchPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import AppointmentsPage from './pages/AppointmentsPage';

// Initialize FHIR client
const fhirConfig = createFHIRConfig({
  baseURL: import.meta.env.VITE_FHIR_SERVER_URL || 'http://localhost:8080/fhir'
});
const fhirClient = new FHIRClient(fhirConfig);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/patients" element={<PatientSearchPage />} />
          <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;