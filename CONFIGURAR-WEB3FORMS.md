# 📧 Configuración de Web3Forms - IMPORTANTE

## ⚠️ PASO OBLIGATORIO ANTES DE PUBLICAR

Para que el formulario funcione y te envíe emails directamente, necesitas obtener tu **Access Key** de Web3Forms.

## 🔧 Configuración (5 minutos)

### Paso 1: Obtener tu Access Key

1. Ve a: **https://web3forms.com/**
2. Click en **"Get Started Free"**
3. Ingresa tu email: **richarddigo@gmail.com**
4. Te enviarán un email con tu **Access Key** (algo como: `abc123def-456g-789h-xyz`)

### Paso 2: Configurar en tu landing

1. Abre el archivo: `index.html`
2. Busca la línea 262:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
3. Reemplaza `YOUR_ACCESS_KEY_HERE` con tu Access Key:
   ```html
   <input type="hidden" name="access_key" value="abc123def-456g-789h-xyz">
   ```
4. Guarda el archivo

### Paso 3: Publica

```powershell
git add .
git commit -m "✅ Web3Forms configurado"
git push origin main
```

## ✅ ¿Qué hace Web3Forms?

- ✅ **Envío directo de emails** sin abrir cliente
- ✅ **Gratis hasta 250 envíos/mes**
- ✅ **Sin tarjeta de crédito**
- ✅ **Emails llegan a richarddigo@gmail.com**
- ✅ **100% funcional al instante**

## 📬 Qué recibirás

Cada registro te llegará así:

```
De: Coride Landing Page
Para: richarddigo@gmail.com
Asunto: 🚀 Nuevo registro en Coride Waitlist

name: Juan Pérez
email: juan@example.com
flight: IB2345 - MAD → BCN
beta: on
Idioma: es
Fecha: 3/11/2025 10:30:00
Beta Tester: Sí
```

## 🔍 Verificar que funciona

1. Abre tu landing page
2. Completa el formulario de prueba
3. Envía
4. **Revisa tu email** (richarddigo@gmail.com)
5. Debería llegar en 1-2 minutos

## 💰 Límites (Plan Gratuito)

- ✅ **250 envíos/mes gratis**
- ✅ Sin límite de tiempo
- ✅ Sin tarjeta de crédito
- Cuando superes 250/mes: $1.99/mes (100 envíos adicionales)

## 🆘 Solución de Problemas

### No recibo emails

1. **Verifica la Access Key** en `index.html`
2. **Revisa spam** en Gmail
3. **Confirma tu email** en Web3Forms (primer uso)

### Error al enviar

- Verifica que la Access Key sea correcta
- Comprueba conexión a internet
- Los datos se guardan en localStorage como backup

## 📊 Backup de datos

Todos los registros también se guardan localmente:

```javascript
// En la consola del navegador (F12):
exportWaitlist()
```

## 🎯 Alternativas

Si Web3Forms no te funciona:

1. **EmailJS** (300 emails/mes gratis)
2. **FormSubmit** (ilimitado, más básico)
3. **Tu propio backend** (cuando crezcas)

## 📝 Resumen

1. ✅ Ve a https://web3forms.com/
2. ✅ Registra richarddigo@gmail.com
3. ✅ Copia tu Access Key del email
4. ✅ Pégala en `index.html` línea 262
5. ✅ Publica con git push
6. ✅ ¡Prueba el formulario!

---

## ⚡ IMPORTANTE

**SIN LA ACCESS KEY EL FORMULARIO NO FUNCIONARÁ**

Asegúrate de configurarla antes de publicar la página.

---

**Tiempo total:** 5 minutos
**Costo:** $0 (gratis hasta 250 envíos/mes)
