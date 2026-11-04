import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
    initialPersonalInfo,
    initialVehicleInfo,
    initialDocumentsInfo,
} from '../data/registrationData';
import { validatePersonalInfo } from '../utils/registration/validatePersonalInfo';
import { validateVehicleInfo } from '../utils/registration/validateVehicleInfo';

/**
 * DriverRegistrationContext
 * Global context holding registration state across the 3 tabs:
 * 1. Personal Info
 * 2. Vehicle Info
 * 3. Documents & Payments
 */
const DriverRegistrationContext = createContext(null);

export function DriverRegistrationProvider({ children }) {
    // 1. Form state per tab
    const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
    const [vehicleInfo, setVehicleInfo] = useState(initialVehicleInfo);
    const [documentsInfo, setDocumentsInfo] = useState(initialDocumentsInfo);

    // 2. Touched fields tracking (to display errors only after interaction)
    const [touchedFields, setTouchedFields] = useState({});
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

    // 3. Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(null); // 'pending_approval' | null

    // 4. Updaters (memoized with useCallback)
    const updatePersonalInfo = useCallback((field, value) => {
        setPersonalInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const updateVehicleInfo = useCallback((field, value) => {
        setVehicleInfo((prev) => {
            const next = { ...prev, [field]: value };
            // Reactive helper: if category changed to something other than 'xl' and capacity was > 4, adjust or retain
            return next;
        });
    }, []);

    const updateDocumentsInfo = useCallback((field, value) => {
        setDocumentsInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    const touchField = useCallback((fieldName) => {
        setTouchedFields((prev) => ({
            ...prev,
            [fieldName]: true,
        }));
    }, []);

    const markTabAsTouched = useCallback((tabName) => {
        if (tabName === 'personal') {
            setTouchedFields((prev) => ({
                ...prev,
                profilePhotoUri: true,
                fullName: true,
                documentId: true,
                phoneNumber: true,
                birthDate: true,
                gender: true,
                email: true,
            }));
        } else if (tabName === 'vehicle') {
            setTouchedFields((prev) => ({
                ...prev,
                category: true,
                licensePlate: true,
                brand: true,
                model: true,
                year: true,
                color: true,
                passengerCapacity: true,
                vehiclePhotoUri: true,
            }));
        }
    }, []);

    // 5. Reactive validation memoized with useMemo
    const personalInfoErrors = useMemo(
        () => validatePersonalInfo(personalInfo),
        [personalInfo]
    );

    const vehicleInfoErrors = useMemo(
        () => validateVehicleInfo(vehicleInfo),
        [vehicleInfo]
    );

    // Documents tab is currently placeholder per specifications
    const documentsInfoErrors = useMemo(() => {
        // Until documents/payments tab is fully specified and implemented,
        // documentsInfo remains incomplete.
        const errors = {};
        if (!documentsInfo || Object.keys(documentsInfo).length === 0) {
            errors.general = 'La pestaña de documentos y pagos está pendiente de completar';
        }
        return errors;
    }, [documentsInfo]);

    // 6. Validity computation
    const isPersonalInfoValid = useMemo(
        () => Object.keys(personalInfoErrors).length === 0,
        [personalInfoErrors]
    );

    const isVehicleInfoValid = useMemo(
        () => Object.keys(vehicleInfoErrors).length === 0,
        [vehicleInfoErrors]
    );

    // Per specification: documentsInfoIsValid remains false while Tab 3 is a placeholder
    const isDocumentsInfoValid = useMemo(
        () => false,
        []
    );

    // Global validity: true ONLY when all 3 tabs are valid
    const isRegistrationValid = useMemo(
        () => isPersonalInfoValid && isVehicleInfoValid && isDocumentsInfoValid,
        [isPersonalInfoValid, isVehicleInfoValid, isDocumentsInfoValid]
    );

    // 7. Reset registration
    const resetRegistration = useCallback(() => {
        setPersonalInfo(initialPersonalInfo);
        setVehicleInfo(initialVehicleInfo);
        setDocumentsInfo(initialDocumentsInfo);
        setTouchedFields({});
        setHasAttemptedSubmit(false);
        setIsSubmitting(false);
        setRegistrationStatus(null);
    }, []);

    // 8. Submit registration
    const submitRegistration = useCallback(async () => {
        setHasAttemptedSubmit(true);
        markTabAsTouched('personal');
        markTabAsTouched('vehicle');

        if (!isRegistrationValid) {
            return {
                success: false,
                message: 'Por favor completa y valida todas las pestañas antes de enviar.',
            };
        }

        try {
            setIsSubmitting(true);
            // Simulated backend API call with delay
            await new Promise((resolve) => setTimeout(resolve, 1200));

            // After successful backend confirmation, account transitions to pending_approval
            setRegistrationStatus('pending_approval');
            return {
                success: true,
                status: 'pending_approval',
                message: 'Registro enviado correctamente. Tu cuenta está pendiente de aprobación.',
            };
        } catch (error) {
            return {
                success: false,
                message: error.message || 'Error al enviar el registro. Intenta nuevamente.',
            };
        } finally {
            setIsSubmitting(false);
        }
    }, [isRegistrationValid, markTabAsTouched]);

    const value = useMemo(
        () => ({
            // State
            personalInfo,
            vehicleInfo,
            documentsInfo,
            touchedFields,
            hasAttemptedSubmit,
            isSubmitting,
            registrationStatus,
            // Errors
            personalInfoErrors,
            vehicleInfoErrors,
            documentsInfoErrors,
            // Validity
            isPersonalInfoValid,
            isVehicleInfoValid,
            isDocumentsInfoValid,
            isRegistrationValid,
            // Actions
            updatePersonalInfo,
            updateVehicleInfo,
            updateDocumentsInfo,
            touchField,
            markTabAsTouched,
            submitRegistration,
            resetRegistration,
        }),
        [
            personalInfo,
            vehicleInfo,
            documentsInfo,
            touchedFields,
            hasAttemptedSubmit,
            isSubmitting,
            registrationStatus,
            personalInfoErrors,
            vehicleInfoErrors,
            documentsInfoErrors,
            isPersonalInfoValid,
            isVehicleInfoValid,
            isDocumentsInfoValid,
            isRegistrationValid,
            updatePersonalInfo,
            updateVehicleInfo,
            updateDocumentsInfo,
            touchField,
            markTabAsTouched,
            submitRegistration,
            resetRegistration,
        ]
    );

    return React.createElement(DriverRegistrationContext.Provider, { value }, children);
}

/**
 * Custom hook to consume the registration context
 */
export function useDriverRegistration() {
    const context = useContext(DriverRegistrationContext);
    if (!context) {
        throw new Error(
            'useDriverRegistration debe ser utilizado dentro de un DriverRegistrationProvider'
        );
    }
    return context;
}

export default DriverRegistrationContext;