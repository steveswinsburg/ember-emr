// FHIR Server Configuration
// This file contains configuration settings for connecting to your FHIR server

export interface FHIRConfigOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  defaultPatientId?: string;
  version?: string;
  searchDefaults?: {
    _count?: number;
    _total?: string;
    _sort?: string;
  };
}

export const DEFAULT_FHIR_CONFIG: Required<FHIRConfigOptions> = {
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
    _total: 'accurate',
    
    // Default sort order
    _sort: '-_lastUpdated'
  }
};

export const createFHIRConfig = (options: FHIRConfigOptions = {}): Required<FHIRConfigOptions> => {
  return {
    ...DEFAULT_FHIR_CONFIG,
    ...options,
    headers: {
      ...DEFAULT_FHIR_CONFIG.headers,
      ...options.headers
    },
    searchDefaults: {
      ...DEFAULT_FHIR_CONFIG.searchDefaults,
      ...options.searchDefaults
    }
  };
};