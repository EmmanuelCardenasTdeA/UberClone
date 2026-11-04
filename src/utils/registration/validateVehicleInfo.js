// AI-assisted: see docs/AI_LOG.md #1
import {
  VEHICLE_CATEGORY_OPTIONS,
  VEHICLE_COLOR_OPTIONS,
} from '../../data/registrationOptions.js';

/**
 * Validates Tab 2: Vehicle Information.
 * 
 * Rules:
 * - category: Mandatory, must be in VEHICLE_CATEGORY_OPTIONS ('economy' | 'xl' | 'premium').
 * - licensePlate: Mandatory, Colombian format ABC123 (converted to uppercase before validating).
 * - brand: Mandatory, max 30 chars.
 * - model: Mandatory, max 30 chars.
 * - year: Mandatory, 4 numeric digits, not greater than current year.
 * - color: Mandatory, must match one of VEHICLE_COLOR_OPTIONS.
 * - passengerCapacity: Mandatory, numeric. 'xl' category requires at least 6 passengers.
 * - vehiclePhotoUri: Mandatory (must show license plate).
 * 
 * @param {import('../../types/registration').VehicleInfoData} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateVehicleInfo(data = {}) {
  /** @type {Record<string, string>} */
  const errors = {};

  // 1. Vehicle category dropdown validation
  const validCategories = VEHICLE_CATEGORY_OPTIONS.map((opt) => opt.value);
  if (!data.category) {
    errors.category = 'Selecciona una categoría de vehículo';
  } else if (!validCategories.includes(data.category)) {
    errors.category = 'La categoría de vehículo seleccionada no es válida';
  }

  // 2. License plate (Colombian format: 3 letters + 3 digits, uppercase)
  const rawPlate = (data.licensePlate || '').toString().trim().toUpperCase();
  const plateRegex = /^[A-Z]{3}\d{3}$/;

  if (!rawPlate) {
    errors.licensePlate = 'La placa del vehículo es obligatoria';
  } else if (!plateRegex.test(rawPlate)) {
    errors.licensePlate = 'Formato de placa inválido. Debe tener 3 letras y 3 números (ej. ABC123)';
  }

  // 3. Brand (max 30 chars)
  const trimmedBrand = (data.brand || '').trim();
  if (!trimmedBrand) {
    errors.brand = 'La marca del vehículo es obligatoria';
  } else if (trimmedBrand.length > 30) {
    errors.brand = 'La marca no puede superar los 30 caracteres';
  }

  // 4. Model (max 30 chars)
  const trimmedModel = (data.model || '').trim();
  if (!trimmedModel) {
    errors.model = 'El modelo del vehículo es obligatorio';
  } else if (trimmedModel.length > 30) {
    errors.model = 'El modelo no puede superar los 30 caracteres';
  }

  // 5. Year (4 digits, numeric, <= current year)
  const currentYear = new Date().getFullYear();
  const rawYear = (data.year || '').toString().trim();
  const parsedYear = Number.parseInt(rawYear, 10);

  if (!rawYear) {
    errors.year = 'El año del vehículo es obligatorio';
  } else if (!/^\d{4}$/.test(rawYear) || Number.isNaN(parsedYear)) {
    errors.year = 'El año debe ser un número de 4 dígitos (ej. 2022)';
  } else if (parsedYear > currentYear) {
    errors.year = `El año no puede ser mayor al año actual (${currentYear})`;
  } else if (parsedYear < 1990) {
    errors.year = 'El año del vehículo no es válido para prestar servicio';
  }

  // 6. Color dropdown validation
  const trimmedColor = (data.color || '').trim();
  if (!trimmedColor) {
    errors.color = 'Selecciona el color del vehículo';
  } else if (!VEHICLE_COLOR_OPTIONS.includes(trimmedColor)) {
    errors.color = 'El color seleccionado no está dentro de las opciones permitidas';
  }

  // 7. Passenger capacity (numeric; xl category demands min 6)
  const rawCapacity = (data.passengerCapacity || '').toString().trim();
  const parsedCapacity = Number.parseInt(rawCapacity, 10);

  if (!rawCapacity) {
    errors.passengerCapacity = 'La capacidad de pasajeros es obligatoria';
  } else if (!/^\d+$/.test(rawCapacity) || Number.isNaN(parsedCapacity) || parsedCapacity <= 0) {
    errors.passengerCapacity = 'La capacidad debe ser un número entero mayor a 0';
  } else if (data.category === 'xl' && parsedCapacity < 6) {
    errors.passengerCapacity = 'La categoría XL exige una capacidad mínima de 6 pasajeros';
  } else if (parsedCapacity > 15) {
    errors.passengerCapacity = 'La capacidad no puede ser mayor a 15 pasajeros';
  }

  // 8. Vehicle photo (where plate is visible)
  if (!data.vehiclePhotoUri || typeof data.vehiclePhotoUri !== 'string' || !data.vehiclePhotoUri.trim()) {
    errors.vehiclePhotoUri = 'La foto del vehículo donde se vea la placa es obligatoria';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
