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
