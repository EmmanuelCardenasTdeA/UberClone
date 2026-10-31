---
name: uber-clone-conductor
description: Asistente de desarrollo y gestor automático de bitácora de IA (docs/AI_LOG.md) para el proyecto universitario UberClone - Versión Conductor en React Native (Expo). Úsalo siempre que el usuario consulte dudas de código, arquitectura, hooks, Firebase, pasarelas de pago (Mercado Pago/Stripe), o pida registrar avances en las ramas de santiago o emmanuel.
---
# UberClone Conductor & Bitácora IA

Esta skill guía el desarrollo técnico de la aplicación móvil **UberClone - Versión Conductor** en React Native con Expo (JavaScript + Expo Router, sin TypeScript) y automatiza la generación de entradas para la bitácora obligatoria de inteligencia artificial (`docs/AI_LOG.md`), separadas por las ramas de trabajo (`santiago` y `emmanuel`).

## Cuándo usar esta skill

* Cuando el usuario haga consultas de código, diseño de pantallas, estado global, hooks o integraciones para el proyecto **UberClone - Versión Conductor**.
* Cuando el usuario pida generar, actualizar o formatear entradas para el archivo `docs/AI_LOG.md` (o bitácoras por integrante).
* Cuando se mencione el trabajo en las ramas de `santiago` o `emmanuel` dentro del proyecto de React Native.

## Reglas de Idioma (UI vs. Código)

* **Interfaz de Usuario (UI) únicamente en Español**: Toda la aplicación visible para el conductor (textos en pantalla, etiquetas, botones, mensajes de error debajo de cada campo, estados traducidos en UI) debe estar **100% en español**. **No** se incluye selector de idioma (Español/Inglés) ni soporte multi-idioma (`i18n`) en el registro ni en la configuración.
* **Lenguaje: JavaScript (ES6+) con archivos `.js`**, sin TypeScript (no usar `.ts`/`.tsx`; los tipos se documentan con JSDoc si hace falta).
* **Código 100% en Inglés**: Todo el código fuente debe mantenerse estrictamente en inglés: nombres de archivos, carpetas, rutas, componentes, variables, funciones, custom hooks, contextos, propiedades del modelo de datos (`driverId`, `fullName`, `licensePlate`, `vehicleCategory`, etc.) y comentarios técnicos.

## Reglas Técnicas del Proyecto

Al escribir o revisar código para este proyecto, aplica siempre las siguientes restricciones de la especificación (ver `references/especificacion.pdf` para detalles completos):

1. **Navegación combinada (con Expo Router en `src/app/`)**:
   * `Tabs`: Registro del conductor dividido en 3 pestañas:
     * **Pestaña 1 — Datos personales (`personal-info`)**: Foto de perfil (cámara/galería, obligatoria), Nombre completo (máx. 50 caracteres, solo letras y espacios), Documento de identidad (numérico, 6 a 10 dígitos), Número de celular (numérico, 10 dígitos), Fecha de nacimiento (selector de fecha, mayor de 18 años), Género (lista desplegable), Correo electrónico (validación de `@` y dominio). *(Sin campo de idioma)*.
     * **Pestaña 2 — Vehículo (`vehicle-info`)**: Categoría (`economy`, `xl`, `premium`), Placa (formato colombiano `ABC123`, convertir a mayúsculas antes de validar), Marca y modelo (texto, máx. 30 caracteres cada uno), Año (numérico, 4 dígitos, no mayor al año actual), Color (lista desplegable), Capacidad de pasajeros (numérico; `xl` exige mínimo 6), Foto del vehículo (obligatoria donde se vea la placa).
     * **Pestaña 3 — Documentos y pagos (`documents-info`)**: Licencia de conducción (número + foto + fecha de vencimiento posterior a hoy), SOAT (foto + fecha de vencimiento posterior a hoy), Revisión técnico-mecánica (foto + fecha de vencimiento si aplica según año del vehículo), Correo de cuenta de Mercado Pago (formato de correo válido), Aceptación de términos (checkbox obligatorio con porcentaje de comisión visible).
     * **Reglas de envío**: Botón "Enviar registro" habilitado solo cuando las 3 pestañas están completas y válidas. Errores mostrados debajo de cada campo (prohibido usar `Alert`). Al enviar, la cuenta queda en estado `pending_approval` (*Pendiente de aprobación*).
   * `Stack`: Flujo del viaje activo (`requested`, `accepted`, `driver_arriving`, `in_progress`, `completed`, `paid`, `cancelled`).
   * `Drawer`: Perfil y configuración (sin selector de idioma), Historial de carreras (con `FlatList`, filtros y paginación de 20 ítems) y Ganancias.

2. **Hooks obligatorios**:
   * `useState`: Disponibilidad, solicitud activa y formularios.
   * `useEffect` (con función de limpieza obligatoria): Seguimiento de ubicación (`watchPosition`), temporizador de 15 segundos de solicitud entrante y suscripciones en tiempo real (`onSnapshot`).
   * `useContext` o Redux: Sesión del conductor / formulario de registro y viaje activo.
   * `useMemo`: Cálculo de totales en pantalla de Ganancias (hoy, semana, mes) y validación agregada.
   * `useCallback`: Manejadores para aceptar y rechazar viajes y handlers de formulario.
   * **Custom Hooks mínimos**: `useDriverLocation`, `useTripRequests`, `useEarnings`.

3. **Cálculo de tarifas (`src/config/pricing.js` y `src/utils/calculateFare.js`)**:
   * Manejar valores en **pesos colombianos enteros (COP)**.
   * Parámetros base: Base = 3500, Valor km = 1200, Valor min = 250, Mínima = 6000, Multiplicadores (`economy`: 1.0, `xl`: 1.4, `premium`: 1.8), Comisión = 20% (0.20).
   * Redondear la tarifa al múltiplo de 100 COP más cercano antes de calcular la comisión. Las propinas van 100% al conductor.
   * Función pura requerida: `calculateFare({ distanceKm, durationMin, category, tip })` que retorne `{ fare, commission, driverEarnings }`.

4. **Seguridad, Pagos y APIs**:
   * Nunca guardar tarjetas, cuentas bancarias ni llaves secretas en la app o `AsyncStorage`. `AsyncStorage` es únicamente para la sesión y el último estado de disponibilidad.
   * `access_token` de Mercado Pago o `sk_test` de Stripe van únicamente en el `.env` del backend.
   * Llamar a Google Distance Matrix API solo al crear la solicitud y al aceptarla (nunca en cada cambio de ubicación).

## Flujo de Trabajo y Registro en Bitácora (`docs/AI_LOG.md`)

En **cada respuesta** donde generes código, resuelvas un problema técnico o diseñes arquitectura para el proyecto, sigue estos pasos:

### 1. Identificar la Rama / Integrante

* Verifica si el usuario indicó quién hace la consulta (`santiago` o `emmanuel`).
* Si no lo especificó, asume por defecto a **Santiago Salazar Atehortua** (rama `santiago`), pero indícale que puede cambiarlo si la consulta es para la rama de `emmanuel`.

### 2. Marcar el Código Asistido

* En todo bloque de código que entregues, incluye el comentario obligatorio en inglés indicando el número de entrada correspondiente:
  ```javascript
  // AI-assisted: see docs/AI_LOG.md #<N>
  ```

### 3. Generar el Bloque de Bitácora al Final de la Respuesta

Al final de cada respuesta técnica, entrega un bloque Markdown listo para copiar y pegar en `docs/AI_LOG.md`, clasificado bajo la sección de la rama correspondiente (`## Rama: santiago` o `## Rama: emmanuel`), cumpliendo estrictamente la plantilla oficial:

```markdown
## Rama: <santiago | emmanuel>

### Entrada #<N>
- **Fecha:** YYYY-MM-DD
- **Integrante:** <Santiago Salazar Atehortua | Emmanuel [Apellido]> (Rama: `<santiago | emmanuel>`)
- **Herramienta:** Gemini
- **Objetivo:** <Descripción concisa de lo solicitado>
- **Prompt:** "<Texto exacto y completo del prompt enviado por el usuario sin resumir>"
- **Resumen de la respuesta:** <Resumen de 2 a 3 líneas de la solución entregada>
- **Qué se usó / modificó / descartó:** <Plantilla sugerida: "Se usó la estructura base de X, se adaptó Y para el modelo de datos y se descartó Z" (para que el estudiante lo ajuste al hacer commit)>
- **Archivos y commit:** `<ruta/sugerida/del/archivo.js>` — `<pendiente_hash_commit>`
- **Verificación:** <Sugerencia concreta de cómo probarlo en el emulador o con casos de prueba como el de 8.5 km y 22 min>
- **Aprendizaje:** <Resumen breve del concepto clave aplicado para defender en la sustentación>
```

## Gotchas y Errores Comunes a Evitar

* **No resumir el prompt**: Las reglas académicas exigen copiar el prompt tal cual se escribió. Incluye el texto íntegro del usuario en el campo `Prompt` de la bitácora.
* **Credenciales expuestas**: Si el usuario pega una API Key o token real en el prompt, adviértele de inmediato y reemplázalo por `<REDACTED_API_KEY>` en la entrada de la bitácora.
* **Fugas de memoria en GPS**: Asegúrate siempre de retornar la función de limpieza en `useEffect` (`return () => Geolocation.clearWatch(watchId)`) cuando el conductor pase a "No disponible" o desmonte la pantalla.

