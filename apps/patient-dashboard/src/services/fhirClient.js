import axios from 'axios';

class FHIRClient {
  constructor(baseURL = 'http://localhost:8080/fhir') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json'
      }
    });
  }

  // Generic method to make FHIR requests
  async request(method, url, data = null) {
    try {
      const response = await this.client.request({
        method,
        url,
        data
      });
      return response.data;
    } catch (error) {
      console.error('FHIR request error:', error);
      throw error;
    }
  }

  // Patient-related methods
  async getPatient(patientId) {
    return this.request('GET', `/Patient/${patientId}`);
  }

  async searchPatients(params = {}) {
    const searchParams = new URLSearchParams(params);
    return this.request('GET', `/Patient?${searchParams}`);
  }

  // Observation methods
  async getPatientObservations(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Observation?${searchParams}`);
  }

  // Condition methods
  async getPatientConditions(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Condition?${searchParams}`);
  }

  // MedicationRequest methods
  async getPatientMedications(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/MedicationRequest?${searchParams}`);
  }

  // Appointment methods
  async getPatientAppointments(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Appointment?${searchParams}`);
  }

  // Diagnostic Report methods
  async getPatientDiagnosticReports(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/DiagnosticReport?${searchParams}`);
  }

  // Immunization methods
  async getPatientImmunizations(patientId, params = {}) {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Immunization?${searchParams}`);
  }
}

export default new FHIRClient();
