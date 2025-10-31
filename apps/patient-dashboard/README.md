# FHIR Patient Dashboard

A modern, responsive patient portal built with React, React Router, and React Bootstrap that interfaces with FHIR R4 servers to provide patients with access to their healthcare information.

## Features

### 🏠 Dashboard
- Overview of recent test results and observations
- Active medical conditions summary
- Upcoming appointments
- Quick action buttons for common tasks

### 👤 Patient Profile
- Complete demographic information
- Contact details and address
- Emergency contacts and care team
- Account status and preferences

### 📋 Medical Records
- **Lab Results & Vitals**: Recent observations with reference ranges
- **Conditions**: Active and resolved medical conditions
- **Diagnostic Reports**: Comprehensive test reports
- **Immunizations**: Vaccination history and records

### 💊 Medications
- Current prescriptions and medications
- Dosage instructions and scheduling
- Refill requests and medication management
- Provider and pharmacy information

### 📅 Appointments
- Upcoming appointment management
- Past appointment history
- Schedule new appointments
- Reschedule and cancel existing appointments

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **UI Framework**: React Bootstrap
- **HTTP Client**: Axios
- **FHIR Standard**: R4 (4.0.1)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A running FHIR R4 server

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd patient-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure FHIR server connection:
Edit `src/services/fhirClient.js` and update the `baseURL` to point to your FHIR server:
```javascript
constructor(baseURL = 'http://your-fhir-server:8080/fhir') {
  // Your FHIR server endpoint
}
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## FHIR Server Configuration

This application expects a FHIR R4 compliant server with the following resource types:

### Required Resources
- **Patient**: Demographics and contact information
- **Observation**: Lab results, vital signs, and measurements
- **Condition**: Medical conditions and diagnoses
- **MedicationRequest**: Prescriptions and medication orders
- **Appointment**: Scheduled healthcare appointments
- **DiagnosticReport**: Test results and reports
- **Immunization**: Vaccination records

### Example Patient ID
The application currently uses a hardcoded patient ID (`patient-1`) for demonstration purposes. In a production environment, this would be replaced with:
- Authentication integration (Firebase Auth, OAuth, etc.)
- Session management
- Patient selection interface

### FHIR Server Examples
This dashboard works with any FHIR R4 compliant server, including:
- **HAPI FHIR Server**: Open-source Java-based FHIR server
- **Microsoft FHIR Server**: Azure-based FHIR service
- **Google Cloud Healthcare API**: FHIR service
- **AWS HealthLake**: FHIR data lake
- **Firely Server**: .NET-based FHIR server

## API Integration

### FHIR Client Service
The `fhirClient.js` service provides methods for:

```javascript
// Patient operations
await fhirClient.getPatient(patientId);
await fhirClient.searchPatients(params);

// Observations (lab results, vitals)
await fhirClient.getPatientObservations(patientId, params);

// Medical conditions
await fhirClient.getPatientConditions(patientId, params);

// Medications
await fhirClient.getPatientMedications(patientId, params);

// Appointments
await fhirClient.getPatientAppointments(patientId, params);
```

### Authentication Setup (Future Enhancement)
For production use, integrate with:
- **Firebase Authentication**: For user management
- **OAuth 2.0/OIDC**: For healthcare provider SSO
- **SMART on FHIR**: For EHR integration

## Development

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── Dashboard/       # Dashboard overview
│   ├── PatientProfile/  # Patient information
│   ├── MedicalRecords/  # Health records and results
│   ├── Medications/     # Prescription management
│   ├── Appointments/    # Appointment scheduling
│   └── Layout/          # Navigation and layout
├── pages/               # Route components
├── services/            # API and FHIR client
├── utils/               # Helper functions
└── App.jsx             # Main application component
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### FHIR Utilities
The `fhirUtils.js` file provides helper functions for:
- Patient name formatting
- Address and contact formatting
- Date and time formatting
- FHIR resource value extraction
- Status badge styling

## Customization

### Styling
- Bootstrap themes can be customized in `src/App.css`
- Component-specific styles in individual component files
- Responsive design included for mobile devices

### FHIR Resource Extensions
To add support for additional FHIR resources:

1. Add new methods to `fhirClient.js`
2. Create utility functions in `fhirUtils.js`
3. Build new components following existing patterns
4. Add routes and navigation items

## Security Considerations

### Data Protection
- Patient data should be transmitted over HTTPS only
- Implement proper authentication and authorization
- Follow HIPAA compliance guidelines
- Use secure session management

### FHIR Security
- Implement OAuth 2.0 with FHIR servers
- Use SMART on FHIR for EHR integration
- Validate and sanitize all FHIR responses
- Implement audit logging

## Production Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
Create `.env` files for different environments:
```env
VITE_FHIR_SERVER_URL=https://your-fhir-server.com/fhir
VITE_AUTH_DOMAIN=your-auth-domain.com
VITE_PATIENT_ID=actual-patient-id
```

### Hosting Options
- **Netlify**: Simple static hosting
- **Vercel**: Serverless deployment
- **AWS S3 + CloudFront**: Scalable static hosting
- **Azure Static Web Apps**: Microsoft cloud hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support:
- Check the FHIR R4 documentation: https://hl7.org/fhir/R4/
- Review React Bootstrap components: https://react-bootstrap.github.io/
- Submit issues via GitHub Issues

## Roadmap

### Upcoming Features
- [ ] Real-time notifications
- [ ] Appointment scheduling integration
- [ ] Care plan management
- [ ] Family member access
- [ ] Mobile app version
- [ ] Telehealth integration
- [ ] Medication reminders
- [ ] Health data exports
