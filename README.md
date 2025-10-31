# Ember EMR - Electronic Medical Records System

A modern, FHIR-compliant Electronic Medical Records system built with React and TypeScript, designed for both patients and clinicians.

## Project Structure

This is a monorepo containing multiple applications and shared packages:

```
ember-emr/
├── apps/                          # Applications
│   ├── patient-dashboard/         # Patient-facing application (port 3000)
│   └── clinician-dashboard/       # Clinician-facing application (port 3001)
├── packages/                      # Shared packages
│   ├── shared-services/           # Common FHIR client and utilities
│   └── design-system/             # Shared UI components (Australian Gov Design System)
└── package.json                   # Root workspace configuration
```

## Applications

### Patient Dashboard (`apps/patient-dashboard`)
- **Purpose**: Patient-facing application for viewing medical records
- **Features**: View appointments, medications, medical records, test results
- **Port**: 3000
- **URL**: http://localhost:3000

### Clinician Dashboard (`apps/clinician-dashboard`)
- **Purpose**: Clinician-facing application for managing patient records
- **Features**: Patient search, record management, appointment scheduling
- **Port**: 3001
- **URL**: http://localhost:3001

## Shared Packages

### Shared Services (`packages/shared-services`)
- **Purpose**: Common FHIR client and utility functions
- **Features**: 
  - FHIR R4 client with TypeScript support
  - CRUD operations for all FHIR resources
  - Utility functions for data formatting
  - Configuration management

### Design System (`packages/design-system`)
- **Purpose**: Shared UI components based on Australian Government Design System
- **Features**:
  - React components (Button, Card, Alert, Badge)
  - Health-specific styling and theming
  - Consistent look and feel across applications

## Design System

This project incorporates the [Australian Government Health Design System](https://designsystem.health.gov.au/) to ensure:
- Accessibility compliance
- Consistent user experience
- Government branding standards
- Mobile-responsive design

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/steveswinsburg/ember-emr.git
cd ember-emr
```

2. Install all dependencies:
```bash
npm install
```

### Development

#### Start both applications simultaneously:
```bash
npm run dev
```

#### Start individual applications:
```bash
# Patient Dashboard
npm run patient:dev

# Clinician Dashboard
npm run clinician:dev
```

#### Build all applications:
```bash
npm run build
```

#### Build individual applications:
```bash
# Patient Dashboard
npm run patient:build

# Clinician Dashboard
npm run clinician:build
```

### FHIR Server Configuration

Both applications are configured to connect to a FHIR R4 server. Set the following environment variables:

```bash
# .env file in each app directory
VITE_FHIR_SERVER_URL=http://localhost:8080/fhir
VITE_PATIENT_ID=patient-1  # Default patient ID for demos
```

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router v7
- **UI Framework**: React Bootstrap + Australian Gov Design System
- **Build Tool**: Vite
- **Package Manager**: npm workspaces
- **FHIR Standard**: R4
- **HTTP Client**: Axios

## Architecture

### Monorepo Benefits
- **Code Sharing**: Common FHIR logic and UI components
- **Consistent Tooling**: Shared linting, testing, and build configuration
- **Simplified Dependencies**: Centralized dependency management
- **Coordinated Releases**: Deploy patient and clinician apps together

### FHIR Integration
- Full FHIR R4 compliance
- Type-safe client with TypeScript interfaces
- Comprehensive CRUD operations for all resource types
- Extensible for custom FHIR profiles

### Design System Integration
- Government-compliant UI components
- Accessibility standards (WCAG 2.1)
- Responsive design for all device types
- Consistent branding across applications

## Development Workflow

1. **Shared Changes**: Make changes to `packages/` for features needed by both apps
2. **App-Specific Changes**: Make changes to `apps/` for application-specific features
3. **Testing**: Run tests across all packages and applications
4. **Building**: Build packages before building applications that depend on them

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for type safety
3. Follow the Australian Government Design System guidelines
4. Ensure FHIR R4 compliance for all healthcare data operations
5. Test changes across both patient and clinician applications

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.