// Utility functions for FHIR data processing

export const formatPatientName = (patient) => {
  if (!patient.name || patient.name.length === 0) return 'Unknown';
  
  const name = patient.name[0];
  const given = name.given ? name.given.join(' ') : '';
  const family = name.family || '';
  
  return `${given} ${family}`.trim();
};

export const formatPatientAddress = (patient) => {
  if (!patient.address || patient.address.length === 0) return 'No address on file';
  
  const address = patient.address[0];
  const line = address.line ? address.line.join(', ') : '';
  const city = address.city || '';
  const state = address.state || '';
  const postalCode = address.postalCode || '';
  const country = address.country || '';
  
  return `${line}, ${city}, ${state} ${postalCode}, ${country}`.replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '');
};

export const formatPatientPhone = (patient) => {
  if (!patient.telecom) return 'No phone on file';
  
  const phone = patient.telecom.find(t => t.system === 'phone');
  return phone ? phone.value : 'No phone on file';
};

export const formatPatientEmail = (patient) => {
  if (!patient.telecom) return 'No email on file';
  
  const email = patient.telecom.find(t => t.system === 'email');
  return email ? email.value : 'No email on file';
};

export const calculateAge = (birthDate) => {
  if (!birthDate) return 'Unknown';
  
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getObservationValue = (observation) => {
  if (!observation.valueQuantity && !observation.valueString && !observation.valueCodeableConcept) {
    return 'No value';
  }
  
  if (observation.valueQuantity) {
    return `${observation.valueQuantity.value} ${observation.valueQuantity.unit || observation.valueQuantity.code || ''}`;
  }
  
  if (observation.valueString) {
    return observation.valueString;
  }
  
  if (observation.valueCodeableConcept) {
    return observation.valueCodeableConcept.text || 
           (observation.valueCodeableConcept.coding && observation.valueCodeableConcept.coding[0]?.display) ||
           'Coded value';
  }
  
  return 'No value';
};

export const getConditionDisplay = (condition) => {
  if (condition.code?.text) {
    return condition.code.text;
  }
  
  if (condition.code?.coding && condition.code.coding.length > 0) {
    return condition.code.coding[0].display || condition.code.coding[0].code;
  }
  
  return 'Unknown condition';
};

export const getMedicationDisplay = (medicationRequest) => {
  if (medicationRequest.medicationCodeableConcept?.text) {
    return medicationRequest.medicationCodeableConcept.text;
  }
  
  if (medicationRequest.medicationCodeableConcept?.coding && 
      medicationRequest.medicationCodeableConcept.coding.length > 0) {
    return medicationRequest.medicationCodeableConcept.coding[0].display || 
           medicationRequest.medicationCodeableConcept.coding[0].code;
  }
  
  return 'Unknown medication';
};

export const getAppointmentStatus = (appointment) => {
  const status = appointment.status;
  const statusMap = {
    'proposed': 'Proposed',
    'pending': 'Pending',
    'booked': 'Booked',
    'arrived': 'Arrived',
    'fulfilled': 'Completed',
    'cancelled': 'Cancelled',
    'noshow': 'No Show',
    'entered-in-error': 'Error'
  };
  
  return statusMap[status] || status;
};

export const getAppointmentType = (appointment) => {
  if (appointment.appointmentType?.text) {
    return appointment.appointmentType.text;
  }
  
  if (appointment.appointmentType?.coding && appointment.appointmentType.coding.length > 0) {
    return appointment.appointmentType.coding[0].display || appointment.appointmentType.coding[0].code;
  }
  
  return 'General appointment';
};