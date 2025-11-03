# 🚀 GUÍA RÁPIDA DE DESPLIEGUE

## Opción 1: GitHub Pages (Recomendada - GRATIS)

### Paso a Paso:

1. **Crea un repositorio en GitHub**
   - Ve a https://github.com/new
   - Nombre: `coride-web` (o el que prefieras)
   - Público o Privado (ambos funcionan con Pages)
   - NO inicialices con README

2. **Sube los archivos desde PowerShell**
   ```powershell
   cd c:\Users\rdiaz\Documents\Development\coride_web
   git init
   git add .
   git commit -m "🚀 Coride MVP Landing Page"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/coride-web.git
   git push -u origin main
   ```

3. **Activa GitHub Pages**
   - Ve a tu repo → Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` → carpeta: `/ (root)`
   - Save

4. **¡LISTO!** Tu sitio estará en:
   ```
   https://TU-USUARIO.github.io/coride-web/
   ```
   ⏱️ Tarda 2-5 minutos en estar disponible

---

## Opción 2: Netlify (Alternativa súper rápida)

### Desde el navegador:

1. Ve a https://app.netlify.com/drop
2. Arrastra la carpeta `coride_web` completa
3. ¡Listo! Te da una URL instantánea tipo: `https://random-name-123.netlify.app`

### Desde CLI (opcional):

```powershell
npm install -g netlify-cli
cd c:\Users\rdiaz\Documents\Development\coride_web
netlify deploy --prod
```

---

## Opción 3: Vercel (Otra alternativa rápida)

```powershell
npm i -g vercel
cd c:\Users\rdiaz\Documents\Development\coride_web
vercel --prod
```

---

## 🧪 Probar Localmente ANTES de desplegar

```powershell
cd c:\Users\rdiaz\Documents\Development\coride_web
python -m http.server 8000
```

Luego abre: http://localhost:8000

---

## ⚙️ CONFIGURACIÓN POST-DESPLIEGUE

### 1. Google Analytics (5 minutos)

1. Ve a https://analytics.google.com
2. Crea una propiedad
3. Copia el ID (ej: `G-ABC123DEF`)
4. Reemplaza en `index.html` línea 370:
   ```javascript
   gtag('config', 'G-ABC123DEF'); // ← Tu ID aquí
   ```

### 2. Meta Pixel (5 minutos)

1. Ve a https://business.facebook.com/events_manager
2. Crea un Pixel
3. Copia el ID
4. Reemplaza en `index.html` línea 378:
   ```javascript
   fbq('init', 'TU_PIXEL_ID'); // ← Tu ID aquí
   ```

---

## 📊 VER DATOS DE WAITLIST

Abre tu sitio y presiona F12 (consola), luego:

```javascript
// Ver todos los registros
JSON.parse(localStorage.getItem('corideWaitlist'))

// Exportar a archivo JSON
exportWaitlist()

// Ver contador
localStorage.getItem('corideUserCount')
```

---

## 🎨 PERSONALIZACIÓN RÁPIDA

### Cambiar colores:

Edita `styles.css` líneas 11-15:

```css
:root {
    --primary: #2563eb;        /* Azul principal → cámbialo */
    --secondary: #10b981;      /* Verde acentos → cámbialo */
}
```

### Cambiar textos:

Edita `translations.js` - Busca y reemplaza los textos

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] Sitio desplegado y accesible
- [ ] Google Analytics configurado
- [ ] Meta Pixel configurado (opcional)
- [ ] Probado en mobile
- [ ] Probado formulario de waitlist
- [ ] Colores/logo personalizados
- [ ] Compartido en redes sociales

---

## 🆘 PROBLEMAS COMUNES

**❌ "Git no se reconoce como comando"**
- Instala Git: https://git-scm.com/download/win

**❌ "Python no se reconoce"**
- Usa: `py -m http.server 8000`
- O instala Python: https://www.python.org/downloads/

**❌ GitHub Pages no muestra la página**
- Espera 5-10 minutos
- Verifica que `index.html` esté en la raíz
- Revisa Settings → Pages → estado

**❌ Los estilos no cargan**
- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Limpia caché del navegador (Ctrl + F5)

---

## 📞 ¿NECESITAS AYUDA?

1. Revisa el README.md completo
2. Busca el error en Google
3. Pregunta en GitHub Issues del proyecto

---

## 🎯 PRÓXIMOS PASOS

1. **Hoy**: Despliega la landing
2. **Mañana**: Comparte en redes y grupos objetivo
3. **Esta semana**: 
   - Recoge 20-50 emails
   - Analiza feedback
   - Itera el diseño
4. **Próximo mes**: Construye el MVP real basado en validación

---

**¡Todo listo! Tu landing está preparada para validar tu idea 🚀**

**Tiempo estimado total**: 15-30 minutos
