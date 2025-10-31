// Utility functions for FHIR data processing - JavaScript friendly

/**
 * Extract resources from a FHIR Bundle
 */
export const extractResources = (bundle) => {
  if (!bundle || !bundle.entry) return [];
  return bundle.entry.map(entry => entry.resource);
};

/**
 * Format patient name for display
 */
export const formatPatientName = (patient) => {
  if (!patient || !patient.name || patient.name.length === 0) {
    return 'Unknown Patient';
  }
  
  const name = patient.name[0];
  const given = name.given ? name.given.join(' ') : '';
  const family = name.family || '';
  
  return `${given} ${family}`.trim();
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format datetime to readable string
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Calculate age from birth date
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  
  try {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    return 0;
  }
};

/**
 * Get coding display value
 */
export const getCodingDisplay = (coding) => {
  if (!coding || coding.length === 0) return '';
  
  const firstCoding = coding[0];
  return firstCoding.display || firstCoding.code || '';
};

/**
 * Format observation value for display
 */
export const formatObservationValue = (observation) => {
  if (!observation) return '';
  
  if (observation.valueQuantity) {
    const value = observation.valueQuantity.value;
    const unit = observation.valueQuantity.unit || observation.valueQuantity.code;
    return `${value}${unit ? ` ${unit}` : ''}`;
  }
  
  if (observation.valueString) {
    return observation.valueString;
  }
  
  if (observation.valueCodeableConcept) {
    return getCodingDisplay(observation.valueCodeableConcept.coding || []);
  }
  
  if (observation.valueBoolean !== undefined) {
    return observation.valueBoolean ? 'Yes' : 'No';
  }
  
  return '';
};

/**
 * Get patient identifier (MRN, etc.)
 */
export const getPatientIdentifier = (patient, system) => {
  if (!patient || !patient.identifier) return '';
  
  let identifier = patient.identifier[0];
  
  if (system) {
    const matchingIdentifier = patient.identifier.find(id => id.system === system);
    if (matchingIdentifier) {
      identifier = matchingIdentifier;
    }
  }
  
  return identifier?.value || '';
};

/**
 * Sort FHIR resources by date (newest first)
 */
export const sortByDate = (resources, dateField = 'effectiveDateTime') => {
  return [...resources].sort((a, b) => {
    const dateA = new Date(a[dateField] || 0);
    const dateB = new Date(b[dateField] || 0);
    return dateB.getTime() - dateA.getTime();
  });
};

/**
 * Create a FHIR reference
 */
export const createReference = (resourceType, id) => {
  return {
    reference: `${resourceType}/${id}`
  };
};

/**
 * Extract reference ID from a FHIR reference
 */
export const extractReferenceId = (reference) => {
  if (!reference?.reference) return '';
  
  const parts = reference.reference.split('/');
  return parts[parts.length - 1];
};