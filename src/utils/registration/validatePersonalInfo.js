// AI-assisted: see docs/AI_LOG.md #1
import { GENDER_OPTIONS } from '../../data/registrationOptions.js';

/**
 * Calculates age in full years from a date string.
 * @param {string} birthDateString - Date in YYYY-MM-DD or standard ISO format
 * @returns {number | null} Age in years or null if invalid date
 */
function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  if (Number.isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

/**
 * Validates Tab 1: Personal Information.
 *
 * Rules:
 * - profilePhotoUri: Mandatory.
 * - fullName: Mandatory, max 50 chars, only letters and spaces (accents/tildes allowed, no numbers or special chars).
 * - documentId: Mandatory, numeric 6 to 10 digits (only 0-9).
 * - phoneNumber: Mandatory, numeric exactly 10 digits (only 0-9).
 * - birthDate: Mandatory, valid date, age must be >= 18.
 * - gender: Mandatory, must match one of GENDER_OPTIONS values.
 * - email: Mandatory, valid format with @ and domain.
 *
 * @param {import('../../types/registration').PersonalInfoData} data
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validatePersonalInfo(data = {}) {
  /** @type {Record<string, string>} */
  const errors = {};

  // 1. Profile photo
  if (!data.profilePhotoUri || typeof data.profilePhotoUri !== 'string' || !data.profilePhotoUri.trim()) {
    errors.profilePhotoUri = 'La foto de perfil es obligatoria';
  }

  // 2. Full name (allows letters, spaces, and Spanish accents: á, é, í, ó, ú, ñ, ü)
  const trimmedName = (data.fullName || '').trim();
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

  if (!trimmedName) {
    errors.fullName = 'El nombre completo es obligatorio';
  } else if (trimmedName.length > 50) {
    errors.fullName = 'El nombre no puede superar los 50 caracteres';
  } else if (!nameRegex.test(trimmedName)) {
    errors.fullName = 'El nombre solo puede contener letras y espacios (sin números ni caracteres especiales)';
  }

  // 3. Document ID (only numbers 0-9, 6 to 10 digits)
  const trimmedDoc = (data.documentId || '').toString().trim();
  const docRegex = /^\d{6,10}$/;

  if (!trimmedDoc) {
    errors.documentId = 'El documento de identidad es obligatorio';
  } else if (!/^\d+$/.test(trimmedDoc)) {
    errors.documentId = 'El documento solo debe contener números (0-9)';
  } else if (!docRegex.test(trimmedDoc)) {
    errors.documentId = 'El documento debe tener entre 6 y 10 dígitos';
  }

  // 4. Phone number (only numbers 0-9, exactly 10 digits)
  const trimmedPhone = (data.phoneNumber || '').toString().trim();
  const phoneRegex = /^\d{10}$/;

  if (!trimmedPhone) {
    errors.phoneNumber = 'El número de celular es obligatorio';
  } else if (!/^\d+$/.test(trimmedPhone)) {
    errors.phoneNumber = 'El celular solo debe contener números (0-9)';
  } else if (!phoneRegex.test(trimmedPhone)) {
    errors.phoneNumber = 'El celular debe tener exactamente 10 dígitos';
  }

  // 5. Birth date (must be 18+ years old)
  if (!data.birthDate) {
    errors.birthDate = 'La fecha de nacimiento es obligatoria';
  } else {
    const age = calculateAge(data.birthDate);
    if (age === null) {
      errors.birthDate = 'Ingresa una fecha de nacimiento válida (AAAA-MM-DD)';
    } else if (age < 18) {
      errors.birthDate = `Debes ser mayor de 18 años para registrarte (edad calculada: ${age} años)`;
    } else if (age > 100) {
      errors.birthDate = 'Ingresa una fecha de nacimiento válida';
    }
  }

  // 6. Gender dropdown validation
  const validGenders = GENDER_OPTIONS.map((opt) => opt.value);
  if (!data.gender) {
    errors.gender = 'Selecciona tu género de la lista';
  } else if (!validGenders.includes(data.gender)) {
    errors.gender = 'El género seleccionado no es válido';
  }

  // 7. Email format
  const trimmedEmail = (data.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail) {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Ingresa un correo electrónico válido con formato nombre@dominio.com';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
