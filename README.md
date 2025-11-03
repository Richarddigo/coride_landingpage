# 🚀 Coride - MVP Landing Page

![Coride Banner](https://via.placeholder.com/1200x400/667eea/ffffff?text=Coride+-+Share+Transportation+with+Your+Flight)

## 📋 Descripción

Landing page para validación activa del MVP de **Coride** - una plataforma que conecta pasajeros del mismo vuelo para compartir transporte desde/hacia el aeropuerto.

### ✨ Características

- 🌍 **Multiidioma**: Español, Inglés y Alemán
- 📱 **Responsive**: Diseño mobile-first optimizado
- 🎨 **Moderno**: UI/UX limpia y profesional
- 📊 **Analytics**: Integración con Google Analytics y Meta Pixel
- 📝 **Waitlist**: Formulario funcional para captura de early adopters
- ⚡ **Rápido**: Sin frameworks pesados, HTML/CSS/JS puro
- 🎯 **Conversion Optimized**: CTAs estratégicos y social proof

## 🚀 Despliegue Rápido en GitHub Pages

### Opción 1: Interfaz Web de GitHub

1. **Sube los archivos a tu repositorio**
   - Crea un nuevo repositorio en GitHub
   - Sube todos los archivos (index.html, styles.css, app.js, translations.js)

2. **Activa GitHub Pages**
   - Ve a Settings → Pages
   - En "Source", selecciona "main" branch
   - Carpeta: / (root)
   - Click en "Save"

3. **¡Listo!** Tu sitio estará disponible en:
   ```
   https://[tu-usuario].github.io/[nombre-repo]/
   ```

### Opción 2: Línea de Comandos

```bash
# 1. Inicializa el repositorio
git init
git add .
git commit -m "🚀 Initial commit: Coride MVP landing page"

# 2. Conecta con GitHub (reemplaza con tu repo)
git remote add origin https://github.com/[tu-usuario]/coride-web.git
git branch -M main
git push -u origin main

# 3. GitHub Pages se activará automáticamente si el repo se llama [tu-usuario].github.io
# O manualmente en Settings → Pages
```

## 📁 Estructura del Proyecto

```
coride_web/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── app.js             # Lógica JavaScript
├── translations.js    # Sistema de traducciones (ES, EN, DE)
├── README.md          # Este archivo
└── assets/            # (opcional) Imágenes y recursos
```

## 🛠️ Configuración

### 1. Google Analytics

Reemplaza `G-XXXXXXXXXX` en `index.html` (línea ~370) con tu ID de Analytics:

```javascript
gtag('config', 'G-TU-ID-AQUI');
```

### 2. Meta Pixel (Facebook)

Reemplaza `YOUR_PIXEL_ID` en `index.html` (línea ~378) con tu Pixel ID:

```javascript
fbq('init', 'TU-PIXEL-ID-AQUI');
```

### 3. Personalización

- **Logo**: Reemplaza el emoji ✈️ con tu logo en `.logo-icon`
- **Colores**: Modifica las variables CSS en `:root` (styles.css)
- **Contenido**: Edita los textos en `translations.js`

## 📊 Gestión de Datos

### Ver Inscripciones en Waitlist

Abre la consola del navegador (F12) y ejecuta:

```javascript
exportWaitlist()
```

Esto descargará un archivo JSON con todos los registros.

### Ver Datos en Consola

```javascript
// Ver todos los inscritos
JSON.parse(localStorage.getItem('corideWaitlist'))

// Ver contador actual
localStorage.getItem('corideUserCount')

// Limpiar todos los datos (reset)
localStorage.clear()
```

## 🎯 Funcionalidades Implementadas

### ✅ Requerimientos Cumplidos

- [x] **Landing page rápida y visual**
  - Header claro con propuesta de valor
  - Explicación problema + solución
  - Mockup visual del MVP
  - CTA prominente

- [x] **Form de waitlist**
  - Campos: Nombre, Email, Vuelo (opcional)
  - Checkbox beta tester
  - Validación HTML5
  - Almacenamiento local (localStorage)

- [x] **Botón "Quiero probar"**
  - Visible en header y secciones principales
  - Modal elegante con formulario
  - Mensaje de confirmación

- [x] **Social proof**
  - Counter de early testers con animación
  - Testimonios convincentes
  - Lista de aeropuertos objetivo
  - Estadísticas de ahorro

- [x] **Multiidioma**
  - Español, Inglés, Alemán
  - Cambio dinámico sin recargar
  - Detección automática del navegador
  - Preferencia guardada

- [x] **Analytics**
  - Google Analytics configurado
  - Meta Pixel integrado
  - Eventos personalizados (scroll, clicks, conversiones)

## 📱 SEO y Performance

- Meta tags optimizados
- Open Graph para redes sociales
- Responsive design (mobile-first)
- Fonts optimizados (Google Fonts)
- CSS y JS sin dependencias externas
- Tiempo de carga < 1s

## 🎨 Personalización Avanzada

### Cambiar Colores

Edita `styles.css`:

```css
:root {
    --primary: #2563eb;        /* Color principal */
    --primary-dark: #1d4ed8;   /* Hover states */
    --secondary: #10b981;      /* Acentos */
}
```

### Añadir Nuevos Idiomas

En `translations.js`, añade un nuevo objeto:

```javascript
const translations = {
    // ... existentes
    fr: {
        cta: "Je veux essayer 🚀",
        // ... resto de traducciones
    }
};
```

Añade el botón en `index.html`:

```html
<button class="lang-btn" data-lang="fr">🇫🇷 FR</button>
```

## 🔗 Integraciones Futuras

### Recomendadas para Producción

1. **Backend para Waitlist**
   - Supabase (gratis, fácil setup)
   - Google Sheets + Apps Script
   - Airtable API
   - Firebase

2. **Email Marketing**
   - ConvertKit
   - MailerLite
   - Mailchimp

3. **Analytics Avanzados**
   - Hotjar (heatmaps)
   - Microsoft Clarity (sesiones grabadas)
   - Plausible (alternativa a GA)

## 📈 Métricas a Monitorear

1. **Conversión**
   - % visitantes que abren modal
   - % que completan formulario
   - Bounce rate

2. **Engagement**
   - Tiempo en página
   - Scroll depth
   - Clicks en CTAs

3. **Adquisición**
   - Fuentes de tráfico
   - Páginas de entrada
   - Dispositivos (mobile vs desktop)

## 🐛 Troubleshooting

### La página no se muestra en GitHub Pages

- Verifica que `index.html` esté en la raíz
- Espera 5-10 minutos después de activar Pages
- Revisa Settings → Pages para ver el estado

### Los estilos no cargan

- Verifica las rutas en `index.html`
- Asegúrate de que `styles.css` esté en la misma carpeta

### Las traducciones no funcionan

- Abre la consola (F12) y busca errores
- Verifica que `translations.js` cargue antes de `app.js`

## 📞 Soporte

Para dudas sobre el proyecto Coride:
- Email: hello@coride.app
- GitHub Issues: [tu-repo]/issues

## 📄 Licencia

Este proyecto es de código abierto para fines de validación MVP.

---

## 🎯 Próximos Pasos Recomendados

1. **Hoy**: Despliega en GitHub Pages
2. **Esta semana**: 
   - Añade tu logo real
   - Conecta con servicio de email
   - Comparte en redes sociales
3. **Este mes**:
   - Recoge feedback de los primeros 50 usuarios
   - Itera basándote en datos
   - Prepara MVP funcional

---

**¡Buena suerte con tu validación! 🚀**

Made with ❤️ for early-stage founders
