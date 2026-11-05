// AI-assisted: see docs/AI_LOG.md #6

/**
 * Initial (empty) state for each registration tab.
 * Field names are the contract shared by screens, validators, context and services.
 */
export const initialPersonalInfo = {
  profilePhotoUri: '',
  fullName: '',
  documentId: '',
  phoneNumber: '',
  birthDate: '', // YYYY-MM-DD
  gender: '',
  email: '',
};

export const initialVehicleInfo = {
  category: '',
  licensePlate: '',
  brand: '',
  model: '',
  year: '',
  color: '',
  passengerCapacity: '',
  vehiclePhotoUri: '',
};

export const initialDocumentsInfo = {
  driverLicenseNumber: '',
  driverLicensePhotoUri: '',
  driverLicenseExpiryDate: '', // YYYY-MM-DD (after today)
  soatPhotoUri: '',
  soatExpiryDate: '', // YYYY-MM-DD (after today)
  mechanicalInspectionPhotoUri: '',
  mechanicalInspectionExpiryDate: '', // YYYY-MM-DD (after today, if applicable by vehicle year)
  mercadoPagoEmail: '',
  termsAccepted: false,
};

export const PERSONAL_INFO_FIELDS = Object.keys(initialPersonalInfo);
export const VEHICLE_INFO_FIELDS = Object.keys(initialVehicleInfo);
export const DOCUMENTS_INFO_FIELDS = Object.keys(initialDocumentsInfo);
