// FHIR Server Configuration
// This file contains configuration settings for connecting to your FHIR server

export const FHIR_CONFIG = {
  // Base URL for your FHIR R4 server
  // Update this to point to your actual FHIR server endpoint
  baseURL: process.env.VITE_FHIR_SERVER_URL || 'http://localhost:8080/fhir',
  
  // Default patient ID for demo purposes
  // In production, this would come from authentication/session
  defaultPatientId: process.env.VITE_PATIENT_ID || 'patient-1',
  
  // FHIR version
  version: 'R4',
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Default headers for FHIR requests
  headers: {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json'
  },
  
  // Search parameters defaults
  searchDefaults: {
    // Maximum number of results to return per page
    _count: 20,
    
    // Include total count in search results
    _total: 'accurate'
  },
  
  // Resource-specific configurations
  resources: {
    Patient: {
      // Default search parameters for patient resources
      searchParams: {
        _include: 'Patient:general-practitioner'
      }
    },
    
    Observation: {
      // Default search parameters for observations
      searchParams: {
        _sort: '-date',
        _count: 50
      }
    },
    
    Condition: {
      // Default search parameters for conditions
      searchParams: {
        _sort: '-recorded-date',
        'clinical-status': 'active,resolved'
      }
    },
    
    MedicationRequest: {
      // Default search parameters for medication requests
      searchParams: {
        _sort: '-authored-on',
        status: 'active,completed'
      }
    },
    
    Appointment: {
      // Default search parameters for appointments
      searchParams: {
        _sort: 'date',
        status: 'booked,arrived,fulfilled'
      }
    },
    
    DiagnosticReport: {
      // Default search parameters for diagnostic reports
      searchParams: {
        _sort: '-date',
        status: 'final,amended'
      }
    },
    
    Immunization: {
      // Default search parameters for immunizations
      searchParams: {
        _sort: '-date',
        status: 'completed'
      }
    }
  },
  
  // Authentication configuration (for future use)
  auth: {
    // OAuth 2.0 / OIDC settings
    clientId: process.env.VITE_AUTH_CLIENT_ID,
    authority: process.env.VITE_AUTH_AUTHORITY,
    redirectUri: process.env.VITE_AUTH_REDIRECT_URI || window.location.origin + '/callback',
    scope: 'openid profile patient/*.read',
    
    // SMART on FHIR settings
    smart: {
      // SMART authorization endpoint
      authorizeUrl: process.env.VITE_SMART_AUTHORIZE_URL,
      
      // SMART token endpoint
      tokenUrl: process.env.VITE_SMART_TOKEN_URL,
      
      // Launch context
      launch: process.env.VITE_SMART_LAUNCH
    }
  },
  
  // Feature flags
  features: {
    // Enable/disable specific features
    appointmentScheduling: true,
    medicationRefills: true,
    documentUpload: false,
    messaging: false,
    familyAccess: false
  },
  
  // UI Configuration
  ui: {
    // Application branding
    appName: 'Patient Portal',
    theme: 'light', // 'light' | 'dark' | 'auto'
    
    // Navigation settings
    showBranding: true,
    enableSearch: true,
    
    // Dashboard settings
    dashboard: {
      recentItemsCount: 5,
      showQuickActions: true,
      defaultView: 'overview' // 'overview' | 'detailed'
    }
  },
  
  // Error handling configuration
  errorHandling: {
    // Show detailed error messages in development
    showDetailedErrors: process.env.NODE_ENV === 'development',
    
    // Retry configuration
    retryAttempts: 3,
    retryDelay: 1000, // milliseconds
    
    // Fallback values
    fallbacks: {
      patientName: 'Patient',
      providerName: 'Healthcare Provider',
      facilityName: 'Healthcare Facility'
    }
  }
};

// Environment-specific overrides
if (process.env.NODE_ENV === 'development') {
  // Development-specific settings
  FHIR_CONFIG.timeout = 30000; // Longer timeout for development
  FHIR_CONFIG.errorHandling.showDetailedErrors = true;
}

if (process.env.NODE_ENV === 'production') {
  // Production-specific settings
  FHIR_CONFIG.errorHandling.showDetailedErrors = false;
}

export default FHIR_CONFIG;