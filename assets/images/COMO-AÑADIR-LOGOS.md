# 🎨 Cómo Añadir Tus Logos Reales

## Archivos Actuales

He creado logos SVG temporales basados en tu diseño. Para usar tus archivos de imagen reales:

## Opción 1: Usar tus imágenes PNG/JPG originales

1. **Guarda tus imágenes del logo en esta carpeta:**
   - `logo-text.png` - Logo completo (coride + PATHS OF WONDER + montaña)
   - `logo-text-white.png` - Versión en blanco para el footer
   - `logo-icon.png` - Solo el icono de la montaña (opcional)

2. **Recomendaciones de tamaño:**
   - Logo completo: 400-600px de ancho, fondo transparente
   - Alto: proporcional (aprox 100-150px)
   - Formato: PNG con transparencia

3. **Los archivos se cargarán automáticamente** - No necesitas cambiar código

## Opción 2: Convertir tus imágenes a SVG (mejor opción)

Si tienes el logo en formato vectorial (AI, PDF, SVG):

1. Exporta como SVG desde tu programa de diseño
2. Renombra los archivos como:
   - `logo-text.svg`
   - `logo-text-white.svg`
3. Reemplaza los archivos temporales que creé

## Opción 3: Editar los SVG existentes

Si quieres personalizar los SVG temporales:

1. Abre `logo-text.svg` con un editor de texto o Inkscape/Illustrator
2. Ajusta colores, tamaños y formas según tu diseño real
3. Guarda los cambios

## ¿Dónde se usan los logos?

- **Header** (navegación superior): `logo-text.svg` o `logo-text.png`
- **Footer** (pie de página): `logo-text-white.svg` o `logo-text-white.png`
- **Favicon** (próximamente): `logo-icon.svg` o `logo-icon.png`

## Sistema de Fallback

Si las imágenes no cargan, el sitio mostrará automáticamente texto estilizado:
- "coride" en tipografía serif elegante
- "PATHS OF WONDER" en mayúsculas con espaciado

## Próximos Pasos

1. ✅ Guarda tus logos en `assets/images/`
2. ✅ Recarga la página para ver los cambios
3. ✅ Verifica en mobile y desktop
4. ✅ Ajusta el tamaño en `styles.css` si es necesario (línea ~93)

## Ajustar Tamaño del Logo

Si tu logo se ve muy grande o pequeño, edita en `styles.css`:

```css
.logo-image {
    height: 50px;  /* Cambia este valor (30-70px recomendado) */
    width: auto;
}

.logo-image-footer {
    height: 60px;  /* Cambia este valor (40-80px recomendado) */
    width: auto;
}
```

---

**Nota:** Los SVG temporales que creé son solo placeholders funcionales. Reemplázalos con tus diseños reales para que coincidan perfectamente con tu marca.
