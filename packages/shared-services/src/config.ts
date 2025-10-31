// FHIR Server Configuration - Simple version for JavaScript usage

export const DEFAULT_FHIR_CONFIG = {
  baseURL: 'http://localhost:8080/fhir',
  defaultPatientId: 'patient-1',
  version: 'R4',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json'
  },
  searchDefaults: {
    _count: 20,
    _total: 'accurate',
    _sort: '-_lastUpdated'
  }
};

export const createFHIRConfig = (options: any = {}) => {
  return {
    ...DEFAULT_FHIR_CONFIG,
    ...options,
    headers: {
      ...DEFAULT_FHIR_CONFIG.headers,
      ...(options.headers || {})
    },
    searchDefaults: {
      ...DEFAULT_FHIR_CONFIG.searchDefaults,
      ...(options.searchDefaults || {})
    }
  };
};