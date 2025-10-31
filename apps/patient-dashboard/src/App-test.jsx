import React from 'react';
import TestDashboard from './components/TestDashboard';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div>
      <h1>Patient Dashboard Test</h1>
      <TestDashboard />
    </div>
  );
}

export default App;