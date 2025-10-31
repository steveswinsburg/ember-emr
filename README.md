# Ember EMR - Electronic Medical Records System

A modern, FHIR-compliant Electronic Medical Records system built with React and JavaScript, with TypeScript used specifically for FHIR data handling to ensure type safety in healthcare operations.

## Project Structure

This is a monorepo containing multiple applications and shared packages:

```
ember-emr/
├── apps/                          # Applications (JavaScript/JSX)
│   ├── patient-dashboard/         # Patient-facing application (port 3000)
│   └── clinician-dashboard/       # Clinician-facing application (port 3001)
├── packages/                      # Shared packages
│   ├── shared-services/           # FHIR client and utilities (TypeScript for safety)
│   └── design-system/             # Shared UI components (JavaScript/JSX)
└── package.json                   # Root workspace configuration
```

## Technology Approach

### 🎯 **Strategic Use of TypeScript**
- **FHIR Services**: TypeScript for healthcare data type safety and compliance
- **UI Components & Apps**: JavaScript/JSX for rapid development and simplicity
- **Best of Both Worlds**: Type safety where it matters most, simplicity everywhere else

## Applications

### Patient Dashboard (`apps/patient-dashboard`)
- **Technology**: React + JavaScript/JSX
- **Purpose**: Patient-facing application for viewing medical records
- **Features**: View appointments, medications, medical records, test results
- **Port**: 3000
- **URL**: http://localhost:3000

### Clinician Dashboard (`apps/clinician-dashboard`)
- **Technology**: React + JavaScript/JSX
- **Purpose**: Clinician-facing application for managing patient records
- **Features**: Patient search, record management, appointment scheduling
- **Port**: 3001
- **URL**: http://localhost:3001

## Shared Packages

### Shared Services (`packages/shared-services`)
- **Technology**: TypeScript (for FHIR type safety)
- **Purpose**: Common FHIR client and utility functions
- **Features**: 
  - FHIR R4 client with full TypeScript support
  - CRUD operations for all FHIR resources
  - Utility functions for data formatting (JavaScript-friendly)
  - Configuration management
  - Type definitions for healthcare data integrity

### Design System (`packages/design-system`)
- **Technology**: JavaScript/JSX with Babel
- **Purpose**: Shared UI components based on Australian Government Design System
- **Features**:
  - React components (Button, Card, Alert, Badge)
  - Health-specific styling and theming
  - Consistent look and feel across applications

## Design System

This project incorporates design principles from the [Australian Government Health Design System](https://designsystem.health.gov.au/) to ensure:
- Accessibility compliance (WCAG 2.1)
- Consistent user experience
- Government branding standards
- Mobile-responsive design
- **Note**: We use our own CSS implementation based on the design system principles to avoid Node.js version conflicts

## Getting Started

### Prerequisites
- Node.js >= 18.0.0 (tested with Node.js 22.x)
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

3. Build shared packages first:
```bash
npm run shared:build
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

- **Frontend**: React 19, JavaScript/JSX
- **FHIR Layer**: TypeScript for type safety
- **Routing**: React Router v7
- **UI Framework**: React Bootstrap + Australian Gov Design System
- **Build Tool**: Vite
- **Package Manager**: npm workspaces
- **FHIR Standard**: R4
- **HTTP Client**: Axios

## Why This Architecture?

### 🎯 **TypeScript Where It Matters**
- **Healthcare Data**: FHIR resources need strict typing for patient safety
- **API Contracts**: Strong typing prevents medical data corruption
- **Compliance**: Type safety helps meet healthcare standards

### 🚀 **JavaScript for UI Speed**
- **Rapid Development**: UI components in JavaScript for faster iteration
- **Lower Barrier**: Easier for front-end developers to contribute
- **Flexibility**: Quick prototyping and changes

### 🏗️ **Monorepo Benefits**
- **Code Sharing**: Common FHIR logic and UI components
- **Consistent Tooling**: Shared linting, testing, and build configuration
- **Simplified Dependencies**: Centralized dependency management
- **Coordinated Releases**: Deploy patient and clinician apps together

## Development Workflow

1. **FHIR Changes**: TypeScript in `packages/shared-services` for type-safe healthcare data
2. **UI Changes**: JavaScript/JSX in `packages/design-system` and `apps/` for rapid UI development
3. **Testing**: Run tests across all packages and applications
4. **Building**: Build packages before building applications that depend on them

## File Extensions Guide

- **`.ts`**: TypeScript files (FHIR client, types, healthcare logic)
- **`.js`**: JavaScript utilities that don't need typing
- **`.jsx`**: React components in JavaScript
- **`.json`**: Configuration files

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for FHIR/healthcare data operations
3. Use JavaScript/JSX for UI components and applications
4. Follow the Australian Government Design System guidelines
5. Ensure FHIR R4 compliance for all healthcare data operations
6. Test changes across both patient and clinician applications

## License

MIT License - see LICENSE file for details.

## Support

For questions or support, please open an issue in the GitHub repository.