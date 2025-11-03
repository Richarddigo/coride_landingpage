# 📧 Configuración de Email para Coride Waitlist

## ✅ Ya está configurado

He configurado el formulario para que **todos los registros lleguen automáticamente a tu email: richarddigo@gmail.com**

## 🔧 Cómo funciona

Uso **Formspree**, un servicio gratuito que envía los datos del formulario directamente a tu email.

### **Primera vez que alguien se registre:**

1. Formspree te enviará un email a **richarddigo@gmail.com**
2. Tendrás que **confirmar tu email** (solo la primera vez)
3. Click en el botón de confirmación del email
4. ¡Listo! Todos los registros futuros llegarán automáticamente

## 📬 Qué recibirás en cada registro

Cada vez que alguien se registre, recibirás un email con:

```
Asunto: 🚀 Nuevo registro en Coride Waitlist

Nombre: Juan Pérez
Email: juan@example.com
Próximo vuelo: IB2345 - MAD → BCN
Beta tester: Sí
Idioma: es
Fecha: 2025-11-03T10:30:00Z
```

## 💰 Límites del plan gratuito

- ✅ **50 envíos/mes gratis**
- ✅ Sin tarjeta de crédito
- ✅ Sin límite de tiempo
- Si superas 50 registros/mes, puedes:
  - Pagar $8/mes para 250 envíos
  - O crear otra cuenta de Formspree con otro email

## 🔒 Privacidad

- Los datos también se guardan en localStorage del navegador (backup)
- Puedes exportarlos con: `exportWaitlist()` en la consola
- Formspree cumple con GDPR

## 🎯 Alternativas (si necesitas más adelante)

Si creces mucho, puedes cambiar a:

1. **Google Forms** (gratis, ilimitado)
   - Más manual pero sin límites
   
2. **Mailchimp** (gratis hasta 500 contactos)
   - Incluye email marketing
   
3. **Airtable** (base de datos visual)
   - Mejor para organizar datos

4. **Tu propio backend**
   - Cuando tengas la app completa

## 🚀 Testing

Para probar que funciona:

1. Abre tu landing page
2. Rellena el formulario de prueba
3. Envía
4. Revisa tu email (richarddigo@gmail.com)
5. Confirma tu cuenta de Formspree (solo primera vez)

## 📊 Ver todos los registros

### Opción 1: En tu email
- Busca emails con asunto "Nuevo registro en Coride Waitlist"
- Crea una carpeta/etiqueta para organizarlos

### Opción 2: En localStorage (navegador)
1. Abre tu landing page
2. Presiona F12 (Consola)
3. Escribe: `exportWaitlist()`
4. Se descargará un archivo JSON con todos los datos

### Opción 3: Dashboard de Formspree
- Ve a https://formspree.io/forms
- Inicia sesión con richarddigo@gmail.com
- Ver todos los envíos en una tabla

## ⚙️ Configuración avanzada (opcional)

Si quieres personalizar más, edita en `index.html`:

```html
<!-- Cambiar el email receptor -->
<input type="hidden" name="_replyto" value="tu-otro-email@example.com">

<!-- Cambiar el asunto del email -->
<input type="hidden" name="_subject" value="Nuevo beta tester de Coride">

<!-- Añadir CC (copia) -->
<input type="hidden" name="_cc" value="socio@example.com">
```

## 🆘 Solución de problemas

### No me llegan los emails

1. **Revisa spam/promociones** en Gmail
2. **Confirma tu email** en Formspree (primer envío)
3. Verifica que el formulario tenga `action="https://formspree.io/f/xeoqngbl"`

### Error al enviar

- Verifica conexión a internet
- Formspree puede estar caído (raro)
- Los datos se guardan en localStorage como backup

## 📝 Notas importantes

- ✅ **Email eliminado**: Ya no aparece hello@coride.app en ninguna parte
- ✅ **Footer limpio**: Logo arriba, slogan debajo (sin repetir PATHS OF WONDER)
- ✅ **Emails a ti**: Todos los registros van a richarddigo@gmail.com
- ✅ **Backup local**: Los datos también se guardan en el navegador

---

## 🎉 ¡Todo listo!

Cuando publiques la página, los registros empezarán a llegar a tu email automáticamente.

**No olvides confirmar tu email de Formspree la primera vez** 📧
