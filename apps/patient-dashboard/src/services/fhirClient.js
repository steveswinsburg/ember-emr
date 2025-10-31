// This file is now deprecated - use @ember-emr/shared-services instead
import { FHIRClient, createFHIRConfig } from '@ember-emr/shared-services';

// Create a configured FHIR client instance
const fhirConfig = createFHIRConfig({
  baseURL: import.meta.env.VITE_FHIR_SERVER_URL || 'http://localhost:8080/fhir'
});

const fhirClient = new FHIRClient(fhirConfig);

export default fhirClient;