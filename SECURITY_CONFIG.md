# 🔧 Configuración de Seguridad del Chat Demo

Este documento explica cómo activar o desactivar las medidas de seguridad del sistema de chat demo.

## 🎯 Banderas de Seguridad

### Backend (API)
**Archivo:** `src/app/api/chat/route.ts`
```typescript
// Línea 7
const SECURITY_ENABLED = true; // Cambiar a false para desactivar
```

### Frontend (Interfaz)
**Archivo:** `src/components/products/DemoModal.tsx`
```typescript
// Línea 5
const SECURITY_ENABLED = true; // Cambiar a false para desactivar
```

## 🛡️ Medidas de Seguridad Controladas

### Cuando `SECURITY_ENABLED = true` (Producción)
✅ **Rate Limiting:** 50 mensajes por hora por IP
✅ **Límite de Sesiones:** 5 sesiones por día por IP
✅ **Límite de Mensajes:** 10 mensajes máximo por conversación
✅ **Límite de Tokens:** 200 tokens máximo por respuesta
✅ **Validación de Contenido:** Solo temas relacionados con la empresa
✅ **Verificación de Sesiones:** Sesiones válidas requeridas
✅ **Filtros de Respuesta:** Respuestas del bot validadas

### Cuando `SECURITY_ENABLED = false` (Desarrollo/Testing)
❌ **Sin Rate Limiting:** Mensajes ilimitados
❌ **Sin Límite de Sesiones:** Sesiones ilimitadas
❌ **Sin Límite de Mensajes:** Conversaciones sin restricción
❌ **Tokens Extendidos:** 1000 tokens por respuesta
❌ **Sin Validación:** Cualquier tipo de mensaje permitido
❌ **Sin Verificación:** No requiere sesiones válidas
❌ **Sin Filtros:** Respuestas del bot sin validación

## 🚀 Casos de Uso

### Para Producción
```typescript
const SECURITY_ENABLED = true;
```
- Protege contra abuso
- Limita costos de OpenAI
- Mantiene el chat enfocado en la empresa
- Experiencia controlada para clientes

### Para Desarrollo/Testing
```typescript
const SECURITY_ENABLED = false;
```
- Testing sin restricciones
- Desarrollo más ágil
- Pruebas de funcionalidad completa
- Debugging sin límites

## ⚡ Cambio Rápido

### Desactivar Seguridad (2 pasos)
1. **Backend:** Cambiar línea 7 en `src/app/api/chat/route.ts`
   ```typescript
   const SECURITY_ENABLED = false;
   ```

2. **Frontend:** Cambiar línea 5 en `src/components/products/DemoModal.tsx`
   ```typescript
   const SECURITY_ENABLED = false;
   ```

### Reactivar Seguridad
Cambiar ambas banderas de vuelta a `true`

## 🔄 Aplicar Cambios
Después de cambiar las banderas:
```bash
# Reiniciar el servidor de desarrollo
npm run dev
```

## ⚠️ Importante
- **Siempre usar `true` en producción** para proteger el sistema
- **Solo usar `false` en desarrollo local** para testing
- Los cambios requieren reiniciar el servidor
- Ambas banderas deben estar sincronizadas (backend y frontend) 