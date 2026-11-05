# Bitácora de uso de IA — UberClone Conductor

## Rama: santiago

### Entrada #1
- **Fecha:** 2026-11-03
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Gemini 3.8 Flash
- **Objetivo:** Implementar funciones puras de validación para Información Personal (Pestaña 1) e Información del Vehículo (Pestaña 2) con reglas de negocio estrictas y listas desplegables.
- **Prompt:** "Me ayudas haciendo las validaciones para la informacion personal y la informacion de los vehiculos, tener en cuenta que se pueden utilizar tildes para nombre, no debe de teenr numeros o caracteres especiales, el numero del documento solo debe aceptar numeros de 0 a 9 y no letras, de igual forma el numero de telefono, la fecha de nacimiento que debe de ser mayor de 18 anios
Porfavor tener en cuenta las listas desplegables para lso datos que se tienen en registration option"
- **Resumen de la respuesta:** Se implementaron `validatePersonalInfo` y `validateVehicleInfo` como funciones puras en `src/utils/registration/`. Se programaron reglas regex para nombres con tildes (sin números/símbolos), documento de identidad (6 a 10 dígitos 0-9), celular (10 dígitos 0-9), cálculo dinámico de edad (>= 18 años), validación de listas desplegables contra `registrationOptions.js`, placa colombiana `ABC123` en mayúsculas, año `<= año actual` y capacidad mínima de 6 pasajeros para categoría `xl`.
- **Qué se usó / modificó / descartó:** Se importaron `GENDER_OPTIONS`, `VEHICLE_CATEGORY_OPTIONS` y `VEHICLE_COLOR_OPTIONS` desde `src/data/registrationOptions.js`, se implementaron funciones de validación con retorno `{ isValid, errors }` y se descartó el uso de librerías de terceros (Yup/Zod) para no inflar el tamaño de la aplicación con dependencias innecesarias.
- **Archivos y commit:** `src/utils/registration/validatePersonalInfo.js`, `src/utils/registration/validateVehicleInfo.js`, `docs/AI_LOG.md` — `<pendiente_hash_commit>`
- **Verificación:** Ejecución de pruebas unitarias con Node.js verificando casos válidos e inválidos (menor de edad, placa minúscula, categoría XL con 4 pasajeros, nombres con tildes y sin símbolos).
- **Aprendizaje:** El cálculo preciso de edad en JavaScript requiere comparar tanto el año como el mes y día exactos con la fecha actual para evitar errores de desfase por año calendario.

### Entrada #2
- **Fecha:** 2026-11-05
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Gemini 3.8 Flash
- **Objetivo:** Actualizar las directrices y reglas técnicas de la skill del proyecto para incorporar Firebase como plataforma oficial de persistencia, almacenamiento y tiempo real.
- **Prompt:** "Me puedes ayudar ajustando la skill para que tenga ne cuenta que el almacenamiento de datos se hara con firebase, de la cual ya esta la configuracion"
- **Resumen de la respuesta:** Se actualizó la skill técnica del proyecto (`.agents/skills/SKILL.md`) incorporando la referencia a `src/config/firebaseConfig.js` (`db`), lineamientos obligatorios de Firestore v9+ modular, estructura documental para la colección `drivers` (estado inicial `pending_approval`), colección `trips` con `onSnapshot` y limpieza estricta en `useEffect`, además del manejo de imágenes con Firebase Storage.
- **Qué se usó / modificó / descartó:** Se tomó la configuración ya inicializada en `src/config/firebaseConfig.js`, se adaptaron las especificaciones técnicas para persistencia de conductores y viajes en Firestore, y se descartaron sintaxis heredadas v8 (`db.collection().doc()`).
- **Archivos y commit:** `.agents/skills/SKILL.md`, `docs/BITACORA SANTIAGO.md` — `<pendiente_hash_commit>`
- **Verificación:** Revisión del archivo `.agents/skills/SKILL.md` confirmando la inclusión de las secciones de Firebase, importaciones modulares y reglas de persistencia.
- **Aprendizaje:** En aplicaciones React Native con Firebase v9+, desacoplar la inicialización de la base de datos en un módulo central (`firebaseConfig.js`) e importar funciones individuales en forma modular mejora el tree-shaking y la mantenibilidad del código.

### Entrada #3
- **Fecha:** 2026-11-05
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Claude Opus 5.5 / Gemini 4 Argon
- **Objetivo:** Desarrollar e integrar todos los módulos de la Primera Entrega (Contexto global, Servicios Firebase al estilo de `ExamplesServicesBd.js`, Componentes de formulario, Pantallas de Datos Personales, Vehículo y Placeholder de Documentos, y Navegación por pestañas).
- **Prompt:** "Ahora yo debo de hacer todo el proyecto, lo que teniamos separado para hacer emmanuel y yo, solo lo hare yo, necesito tu apoyo revisando todo y realizanod ajustes a lo que ya esta, para que siga una estructura pasecida a la que hay en la carpeta examples, debemos hacer los servicios para almacenamiento de informacion utilizanod una estructura similar a la que tiene examplesServicesbd.js, y el tema de solicitud de informaci[on y demas con estructura parecida a lo de la carpeta src de examples, pues es la estructura solicitada, por eso porfa revisa todo el proyecto y garantiza que tenga esta, para hacer la primera entrega que consiste en hacer es todo el registro de conductor y vehiculo:
Enfoque: estado global, integración de navegación y pestaña de datos personales.
•	src/context/DriverRegistrationContext.js: contexto, estado de las tres pestañas, actualizadores y validez global.
•	src/navigation/RegistrationNavigator.js: registrar las pestañas usando el navegador que ya exista en el proyecto.
•	src/components/registration/FormInput.jsx: input de texto y error debajo del campo.
•	src/components/registration/DatePickerField.jsx: selector de fecha y error.
•	src/screens/registration/PersonalInfoScreen.jsx: interfaz de datos personales.
•	src/utils/registration/validatePersonalInfo.js: validaciones de la pestaña 1.
•	src/components/registration/FormSelect.jsx: selector reutilizable con mensaje de error.
•	src/components/registration/ImagePickerField.jsx: cámara, galería, vista previa y mensaje de error.
•	src/screens/registration/VehicleInfoScreen.jsx: interfaz de información del vehículo.
•	src/utils/registration/validateVehicleInfo.js: reglas del vehículo y validación cruzada categoría/capacidad.
La pantalla DocumentsInfoScreen.jsx queda como placeholder inicial y debe ser acordada entre ambos. Sus campos y reglas se implementarán después de revisar la especificación PDF del proyecto."
- **Resumen de la respuesta:** Se construyó la arquitectura completa siguiendo los patrones de `docs/Examples/`: servicios de Firestore (`driverService.js`), almacenamiento local de sesión (`localStorageService.js`), contexto global (`DriverRegistrationContext.js`) con custom hook (`useDriverRegistration.js`), los 4 componentes reutilizables de registro (`FormInput.jsx`, `FormSelect.jsx`, `DatePickerField.jsx`, `ImagePickerField.jsx`) con mensajes de error bajo cada campo (sin `Alert`), las 3 pantallas (`PersonalInfoScreen.jsx`, `VehicleInfoScreen.jsx`, `DocumentsInfoScreen.jsx`) y la integración en `RegistrationNavigator.js` y `App.js`.
- **Qué se usó / modificó / descartó:** Se usó la estructura modular de `ExamplesServicesBd.js` (`COLLECTION = 'drivers'`, `saveDriver`, `getDriver`, `updateDriverStatus`, `subscribeToDriver`) y de `ReservasContext.js`/`useReserva.js`, se adaptaron `VEHICLE_COLOR_OPTIONS` al formato `{ label, value }` y se descartó el uso de `Alert` nativo reemplazándolo por `FieldMessage` debajo de cada campo.
- **Archivos y commit:** `App.js`, `src/theme/index.js`, `src/theme/theme.js`, `src/data/registrationData.js`, `src/data/registrationOptions.js`, `src/utils/dateUtils.js`, `src/utils/registration/validatePersonalInfo.js`, `src/utils/registration/validateVehicleInfo.js`, `src/services/driverService.js`, `src/services/imageStorageService.js`, `src/services/localStorageService.js`, `src/context/DriverRegistrationContext.js`, `src/hooks/useDriverRegistration.js`, `src/components/registration/FieldMessage.jsx`, `src/components/registration/FormInput.jsx`, `src/components/registration/FormSelect.jsx`, `src/components/registration/DatePickerField.jsx`, `src/components/registration/ImagePickerField.jsx`, `src/screens/registration/PersonalInfoScreen.jsx`, `src/screens/registration/VehicleInfoScreen.jsx`, `src/screens/registration/DocumentsInfoScreen.jsx`, `src/navigation/RegistrationNavigator.js` — `<pendiente_hash_commit>`
- **Verificación:** Compilación completa del bundle de Android con `npx expo export --platform android` sin errores de resolución ni sintaxis, y prueba de flujo entre las 3 pestañas verificando validaciones cruzadas (categoría XL >= 6 pasajeros, mayoría de edad, placa `ABC123`) y guardado en Firestore.
- **Aprendizaje:** Separar la capa de servicios (`services/`), el estado reactivo memoizado (`context/` con `useMemo` y `useCallback`) y los componentes de formulario desacoplados permite escalar un formulario multipestaña manteniendo validaciones en tiempo real y persistencia limpia en Firebase Firestore.

### Entrada #4
- **Fecha:** 2026-11-05
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Gemini 4 Argon
- **Objetivo:** Implementar el módulo completo de la Pestaña 3 (Documentos y Pagos) según la especificación PDF, conectando la validez global para habilitar el envío definitivo a Firebase (`pending_approval`).
- **Prompt:** "podemos continuar con el modulo de documentos y pagos"
- **Resumen de la respuesta:** Se creó `src/config/pricing.js` con los parámetros oficiales y la comisión del 20 %, `validateDocumentsInfo.js` con validación de licencia (número, foto, vencimiento posterior a hoy), SOAT (foto y vencimiento posterior a hoy), revisión técnico-mecánica condicional según la antigüedad del vehículo (`>= 5 años`), correo de Mercado Pago y aceptación obligatoria de términos (`CheckboxField.jsx`). Se actualizó `DocumentsInfoScreen.jsx` y `DriverRegistrationContext.js` para habilitar el botón "Enviar registro" cuando las 3 pestañas están válidas.
- **Qué se usó / modificó / descartó:** Se usó la especificación oficial de la Pestaña 3 (`especificacion.pdf`), se implementó validación cruzada con `vehicleInfo.year` para exigir o eximir la técnico-mecánica, y se descartó almacenar cuentas bancarias o tarjetas sensibles cumpliendo la regla de seguridad de la pasarela.
- **Archivos y commit:** `src/config/pricing.js`, `src/utils/dateUtils.js`, `src/data/registrationData.js`, `src/data/registrationOptions.js`, `src/utils/registration/validateDocumentsInfo.js`, `src/components/registration/CheckboxField.jsx`, `src/context/DriverRegistrationContext.js`, `src/screens/registration/DocumentsInfoScreen.jsx`, `src/navigation/RegistrationNavigator.js` — `<pendiente_hash_commit>`
- **Verificación:** Pruebas unitarias en Node.js con vehículos antiguos (exige técnico-mecánica) y recientes (exento), fechas vencidas vs. futuras, y prueba de envío completo hacia Firestore verificando la transición al estado `pending_approval` y escucha en tiempo real hacia `approved`.
- **Aprendizaje:** La validación cruzada entre pestañas mediante `useMemo([documentsInfo, vehicleInfo])` permite que la obligatoriedad de un documento (como la revisión técnico-mecánica) reaccione automáticamente al año del vehículo ingresado en otra pestaña sin acoplar las pantallas entre sí.
