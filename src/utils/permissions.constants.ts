export const PERMISSIONS = {
  USERS: {
    VIEW: "users:view",
    CREATE: "users:create",
    UPDATE: "users:update",
  },
  PATIENTS: {
    VIEW: "patients:view",
    CREATE: "patients:create",
  },
  DIAGNOSTICS: {
    VIEW: "diagnostic-catalogs:view",
  },
  DIGITAL_SIGNATURES: {
    VIEW: "digital-signatures:view",
  },
  MEDICAL_CERTIFICATES: {
    VIEW: "medical-certificates:view",
  },
  NURSING_SHEETS: {
    VIEW: "nursing-sheets:view",
  },
  SURGERY_SHEETS: {
    VIEW: "surgery-sheets:view",
  },
  MEDICAL_REFERENCE: {
    VIEW: "medical-reference-sheets:view",
  },
  INCAPACITY_CERTIFICATES: {
    VIEW: "incapacity-certificates:view",
  },
  ANESTHESIOLOGY_REPORT: {
    VIEW: "anesthesiology-reports:view",
  },
  STAY_SHEETS: {
    VIEW: "stay-sheets:view",
  },
  MEDICAL_PRESCRIPTIONS: {
    VIEW: "medical-prescriptions:view",
  },
  DRUGS_MANAGEMENT: {
    VIEW: "medications:view",
  },
  PATIENT_INTAKE: {
    VIEW: "patient-intake:view",
  },
  PRELIMINARY_CONSULTATION: {
    VIEW: "preliminary-exams:view",
  },
  OPHTHALMOLOGY_CONSULTATION: {
    VIEW: "ophthalmology-exams:view",
  },
  OPTOMETRY_CONSULTATION: {
    VIEW: "optometry-consultations:view",
  },
} as const;
