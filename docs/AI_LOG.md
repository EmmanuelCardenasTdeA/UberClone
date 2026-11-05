# Bitácora de uso de IA — UberClone Conductor

## Rama: santiago

### Entrada #1
- **Fecha:** 2026-11-02
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Claude Opus 5.5
- **Objetivo:** Definir un tema visual global con paleta de colores verdes para la app.
- **Prompt:** "Me puedes ayudar ajustando un tema para el proyecto, que sea con colores verdes"
- **Resumen de la respuesta:** Se creó `src/theme/` con una escala de verdes y neutros, una paleta semántica (claro/oscuro), espaciados, radios, tipografía y sombras, más el hook `useAppTheme`. Se aplicó el tema en `App.js` como pantalla de vista previa y se cambió el fondo del ícono adaptativo de Android.
- **Qué se usó / modificó / descartó:** Se usó la estructura de paleta semántica (primary, surface, text, etc.), se adaptó con colores para estados del conductor (`available`/`unavailable`) y se descartó usar librerías de UI externas para mantener solo `StyleSheet`.
- **Archivos y commit:** `src/theme/colors.js`, `src/theme/metrics.js`, `src/theme/index.js`, `App.js`, `app.json` — `<pendiente_hash_commit>`
- **Verificación:** Ejecutar `npx expo start`, abrir en el emulador/Expo Go y comprobar que la tarjeta, el indicador "Disponible" y el botón "Comenzar" se ven en verde; al presionar el botón debe oscurecerse.
- **Aprendizaje:** Centralizar los colores en tokens semánticos permite cambiar el aspecto de toda la app desde un solo archivo y facilita soportar modo oscuro.

### Entrada #2
- **Fecha:** 2026-11-02
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Gemini 3.8 Flash
- **Objetivo:** Explicar y corregir error de sintaxis de tipos de TypeScript en archivo JavaScript (`src/types/registration.js`).
- **Prompt:** "Explain what this problem is and help me fix it: Type aliases can only be used in TypeScript files. @[c:\Users\ssala\Desktop\CS V\UberClone\src\types\registration.js:L2]"
- **Resumen de la respuesta:** Se explicó la causa del error por uso de sintaxis TypeScript (`type`, `interface`) dentro de un archivo `.js`. Se migró la definición a JSDoc con `@typedef` y `@property`, manteniendo validación y autocompletado en el editor sin requerir TypeScript ni alterar la arquitectura JS del proyecto.
- **Qué se usó / modificó / descartó:** Se usó JSDoc estándar (`@typedef`, `@property`) compatible con JavaScript ES6+, se adaptaron los modelos de datos de las pestañas de registro (`PersonalInfoData`, `VehicleInfoData`, `DocumentsInfoData`, `ValidationErrors`) y se descartó la sintaxis nativa de TypeScript (`interface`, `type`).
- **Archivos y commit:** `src/types/registration.js` — `<pendiente_hash_commit>`
- **Verificación:** Abrir `src/types/registration.js` en VS Code para verificar la desaparición de los errores rojos de sintaxis y confirmar el autocompletado en funciones que usen dichos tipos.
- **Aprendizaje:** En proyectos React Native con JavaScript puro, JSDoc proporciona la misma seguridad de tipos y autocompletado que TypeScript sin necesidad de un compilador adicional ni extensiones `.ts`/`.tsx`.

### Entrada #3
- **Fecha:** 2026-11-03
- **Integrante:** Santiago Salazar Atehortua (Rama: `santiago`)
- **Herramienta:** Gemini 3.8 Flash
- **Objetivo:** Diagnosticar y corregir múltiples errores de sintaxis JSX, doble export default e imports en `src/navigation/RegistrationNavigator.js`.
- **Prompt:** "Porque tengo error en mi codigo?"
- **Resumen de la respuesta:** Se identificaron 4 errores críticos: typo en el import de `createBottomTabNavigator`, duplicación de `export default` en el mismo archivo, anidación rota de etiquetas `<View>` en el renderizado condicional de estado pendiente, y componentes/hooks no importados. Se entregó la versión corregida y funcional.
- **Qué se usó / modificó / descartó:** Se corrigió el typo de la librería de tabs, se convirtió `TabBarIcon` en componente interno sin `export default`, se limpió la estructura JSX del contenedor de pendiente de aprobación, y se agregaron placeholders para pantallas pendientes.
- **Archivos y commit:** `src/navigation/RegistrationNavigator.js` — `<pendiente_hash_commit>`
- **Verificación:** Guardar el archivo en VS Code y verificar la resolución de errores de sintaxis de Babel y del linter.
- **Aprendizaje:** Un archivo ES Module solo permite un `export default`, y cualquier etiqueta JSX abierta sin su correspondiente cierre invalida todo el AST del componente impidiendo que el compilador procese el archivo.

### Entrada #4
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

### Entrada #5
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

### Entrada #6
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
