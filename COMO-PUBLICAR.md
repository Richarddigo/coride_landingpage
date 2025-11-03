# 🚀 Cómo Publicar tu Landing Page en GitHub Pages

## ✅ Paso 1: Verificar los cambios locales

Primero, asegúrate de que todos los archivos están guardados y funcionan bien en local.

## 📤 Paso 2: Subir cambios a GitHub

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd c:\Users\rdiaz\Documents\Development\coride_web

# Añadir todos los archivos
git add .

# Crear commit con mensaje descriptivo
git commit -m "✨ Añadido logo de montaña y correcciones en botones"

# Subir a GitHub
git push origin main
```

## 🌐 Paso 3: Activar GitHub Pages (si no está activado)

1. Ve a tu repositorio en GitHub: https://github.com/Richarddigo/coride_landingpage
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source** (Fuente):
   - Branch: **main**
   - Folder: **/ (root)**
5. Click en **Save**

## ⏱️ Paso 4: Esperar el despliegue

- GitHub tardará **2-5 minutos** en publicar tu sitio
- Verás un mensaje verde con la URL cuando esté listo
- Tu sitio estará en: **https://richarddigo.github.io/coride_landingpage/**

## 🔍 Paso 5: Verificar que funciona

Visita tu URL y verifica:
- ✅ Logo de montaña aparece en header
- ✅ Logo de montaña aparece en footer
- ✅ Botones muestran texto correcto (no "[object Object]")
- ✅ Selector de idioma no se solapa
- ✅ Cambio de idioma funciona (ES, EN, DE)

## 🔄 Futuros cambios

Cada vez que hagas cambios:

```powershell
git add .
git commit -m "descripción del cambio"
git push origin main
```

Los cambios se publicarán automáticamente en 2-5 minutos.

## 🆘 Solución de Problemas

### Los cambios no aparecen

1. **Limpia el caché del navegador:**
   - Chrome/Edge: `Ctrl + Shift + R`
   - Firefox: `Ctrl + F5`
   
2. **Verifica que el push fue exitoso:**
   ```powershell
   git status
   ```
   Debe decir: "Your branch is up to date with 'origin/main'"

3. **Espera 5 minutos más** - A veces GitHub tarda un poco

### El sitio muestra error 404

- Verifica que GitHub Pages está activado
- La rama debe ser **main** (no master)
- El sitio puede tardar hasta 10 minutos la primera vez

### Los logos no cargan

- Verifica que los archivos existen en `assets/images/`
- Los nombres de archivo son sensibles a mayúsculas:
  - `mountain_black.svg` ✅
  - `Mountain_Black.svg` ❌

## 📱 Compartir tu Landing

Una vez publicado, puedes compartir:

**URL corta:** https://richarddigo.github.io/coride_landingpage/

Compártela en:
- LinkedIn
- Twitter/X
- Grupos de Facebook de viajeros
- Foros de nómadas digitales
- WhatsApp con amigos/inversores

## 🎯 Dominio Personalizado (Opcional)

Si quieres usar **coride.app** o **www.coride.com**:

1. Compra el dominio (Namecheap, GoDaddy, etc.)
2. En GitHub Pages → Settings → Pages → Custom domain
3. Añade tu dominio
4. Configura DNS en tu proveedor:
   - Tipo: `CNAME`
   - Host: `www`
   - Value: `richarddigo.github.io`

## ✅ Checklist Pre-Lanzamiento

- [ ] Logo aparece correctamente
- [ ] Textos en 3 idiomas funcionan
- [ ] Formulario de waitlist funciona
- [ ] Mobile responsive se ve bien
- [ ] Analytics configurado (Google Analytics)
- [ ] Meta Pixel configurado (Facebook)
- [ ] Compartido en redes sociales

---

## 🎉 ¡Listo!

Tu landing page está lista para captar los primeros usuarios de Coride.

**URL de tu landing:** https://richarddigo.github.io/coride_landingpage/

¡Buena suerte con tu validación MVP! 🚀
