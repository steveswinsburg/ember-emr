import axios from 'axios';

export interface FHIRConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface FHIRResource {
  resourceType: string;
  id?: string;
  [key: string]: any;
}

export interface Bundle {
  resourceType: 'Bundle';
  id?: string;
  type: string;
  total?: number;
  entry?: BundleEntry[];
}

export interface BundleEntry {
  resource: FHIRResource;
  search?: {
    mode: string;
  };
}

export class FHIRClient {
  private client: any;
  private baseURL: string;

  constructor(config: FHIRConfig) {
    this.baseURL = config.baseURL;
    this.client = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json',
        ...config.headers
      }
    });
  }

  // Generic method to make FHIR requests
  async request(method: string, url: string, data?: any): Promise<any> {
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
  async getPatient(patientId: string): Promise<FHIRResource> {
    return this.request('GET', `/Patient/${patientId}`);
  }

  async searchPatients(params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams(params);
    return this.request('GET', `/Patient?${searchParams}`);
  }

  async updatePatient(patientId: string, patient: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/Patient/${patientId}`, patient);
  }

  async createPatient(patient: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/Patient', patient);
  }

  // Observation methods
  async getPatientObservations(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Observation?${searchParams}`);
  }

  async createObservation(observation: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/Observation', observation);
  }

  async updateObservation(observationId: string, observation: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/Observation/${observationId}`, observation);
  }

  // Condition methods
  async getPatientConditions(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Condition?${searchParams}`);
  }

  async createCondition(condition: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/Condition', condition);
  }

  async updateCondition(conditionId: string, condition: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/Condition/${conditionId}`, condition);
  }

  // MedicationRequest methods
  async getPatientMedications(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/MedicationRequest?${searchParams}`);
  }

  async createMedicationRequest(medicationRequest: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/MedicationRequest', medicationRequest);
  }

  async updateMedicationRequest(medicationRequestId: string, medicationRequest: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/MedicationRequest/${medicationRequestId}`, medicationRequest);
  }

  // Appointment methods
  async getPatientAppointments(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Appointment?${searchParams}`);
  }

  async createAppointment(appointment: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/Appointment', appointment);
  }

  async updateAppointment(appointmentId: string, appointment: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/Appointment/${appointmentId}`, appointment);
  }

  // Diagnostic Report methods
  async getPatientDiagnosticReports(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/DiagnosticReport?${searchParams}`);
  }

  async createDiagnosticReport(diagnosticReport: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/DiagnosticReport', diagnosticReport);
  }

  async updateDiagnosticReport(diagnosticReportId: string, diagnosticReport: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/DiagnosticReport/${diagnosticReportId}`, diagnosticReport);
  }

  // Immunization methods
  async getPatientImmunizations(patientId: string, params: Record<string, any> = {}): Promise<Bundle> {
    const searchParams = new URLSearchParams({
      patient: patientId,
      ...params
    });
    return this.request('GET', `/Immunization?${searchParams}`);
  }

  async createImmunization(immunization: FHIRResource): Promise<FHIRResource> {
    return this.request('POST', '/Immunization', immunization);
  }

  async updateImmunization(immunizationId: string, immunization: FHIRResource): Promise<FHIRResource> {
    return this.request('PUT', `/Immunization/${immunizationId}`, immunization);
  }
}

export default FHIRClient;