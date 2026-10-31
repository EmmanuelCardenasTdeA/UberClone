. Estructura del Proyecto para el Registro del Conductor (Pestañas 1 y 2)

Como la especificación exige que el botón "Enviar registro" solo se habilite cuando las 3 pestañas estén completas y válidas y que los errores se muestren debajo de cada campo (prohibido usar Alert), la clave para que Santiago y Emmanuel trabajen en paralelo en sus ramas (santiago y emmanuel) sin pisarse código ni generar conflictos en Git es separar:

Un Contexto compartido (DriverRegistrationContext.tsx) con el estado global del formulario.
Funciones de validación separadas por pestaña (o por archivo) que evalúan los errores campo por campo.
Pantallas independientes por pestaña dentro del grupo (registration) de Expo Router.
Árbol de directorios propuesto (Código en inglés)

src/
├── app/                                  # Rutas de Expo Router
│   ├── _layout.tsx                       # Root Stack Layout
│   └── (registration)/                   # Flujo de Registro (Tabs)
│       ├── _layout.tsx                   # Tabs Navigator + Footer "Enviar registro"
│       ├── personal-info.tsx             # Pestaña 1: Datos personales
│       ├── vehicle-info.tsx              # Pestaña 2: Vehículo
│       └── documents-info.tsx            # Pestaña 3: Documentos y pagos (placeholder inicial)
├── components/
│   └── registration/                     # Componentes UI reutilizables de formulario
│       ├── FormInput.tsx                 # Input + mensaje de error debajo del campo
│       ├── FormSelect.tsx                # Lista desplegable (Género, Categoría, Color) + error
│       ├── DatePickerField.tsx           # Selector de fecha + error
│       └── ImagePickerField.tsx          # Selector de cámara/galería + vista previa + error
├── context/
│   └── DriverRegistrationContext.tsx     # useContext + useState + useMemo para el registro
├── types/
│   └── registration.ts                   # Interfaces en inglés (PersonalInfo, VehicleInfo, etc.)
├── utils/
│   ├── validatePersonalInfo.ts           # Validaciones puras de la Pestaña 1
│   └── validateVehicleInfo.ts            # Validaciones puras de la Pestaña 2
└── theme/
    └── colors.ts                         # Paleta de colores y estilos base

3. División de Trabajo entre SANTIAGO y EMMANUEL (Sin conflictos de Git)
Fase 0 — Contrato Base en main (15 min antes de abrir las ramas)

Definen juntos el archivo src/types/registration.ts para que ambos tengan las mismas interfaces en sus ramas:

// AI-assisted: see docs/AI_LOG.md #1
export type GenderOption = 'male' | 'female' | 'other' | '';
export type VehicleCategory = 'economy' | 'xl' | 'premium' | '';

export interface PersonalInfoData {
  profilePhotoUri: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  birthDate: string; // YYYY-MM-DD
  gender: GenderOption;
  email: string;
}

export interface VehicleInfoData {
  category: VehicleCategory;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  passengerCapacity: string;
  vehiclePhotoUri: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;

// AI-assisted: see docs/AI_LOG.md #1
export type GenderOption = 'male' | 'female' | 'other' | '';
export type VehicleCategory = 'economy' | 'xl' | 'premium' | '';

export interface PersonalInfoData {
  profilePhotoUri: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  birthDate: string; // YYYY-MM-DD
  gender: GenderOption;
  email: string;
}

export interface VehicleInfoData {
  category: VehicleCategory;
  licensePlate: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  passengerCapacity: string;
  vehiclePhotoUri: string;
}

export type ValidationErrors<T> = Partial<Record<keyof T, string>>;