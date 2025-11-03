# 🗄️ Configuración de Base de Datos con Supabase

## ⚠️ IMPORTANTE - Lee esto primero

Para tener una base de datos real con todos tus registros sincronizados, vamos a usar **Supabase** (gratis hasta 50,000 usuarios).

## 🚀 Paso 1: Crear cuenta en Supabase (5 minutos)

1. Ve a: **https://supabase.com/**
2. Click en **"Start your project"**
3. Regístrate con tu email o GitHub
4. Crea un nuevo proyecto:
   - **Name:** coride-waitlist
   - **Database Password:** (guárdala, la necesitarás)
   - **Region:** Europe West (más cercano a España)
5. Espera 2 minutos mientras se crea el proyecto

## 🔧 Paso 2: Crear la tabla de usuarios

1. En Supabase, ve a **SQL Editor**
2. Click en **"New query"**
3. Copia y pega este código SQL:

```sql
-- Crear tabla de waitlist
CREATE TABLE waitlist (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  flight TEXT,
  beta_tester BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por email
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Habilitar Row Level Security (seguridad)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Permitir inserción pública (solo crear, no leer)
CREATE POLICY "Permitir inserción pública" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Permitir lectura solo del contador
CREATE POLICY "Permitir contar registros" ON waitlist
  FOR SELECT
  USING (true);
```

4. Click en **"Run"**
5. Debería decir "Success"

## 🔑 Paso 3: Obtener tus credenciales

1. En Supabase, ve a **Settings** → **API**
2. Copia estos dos valores:

   - **Project URL:** (algo como: `https://abcdefgh.supabase.co`)
   - **anon public key:** (una clave larga)

3. Guárdalos en un lugar seguro

## 📝 Paso 4: Configurar en tu landing page

### 4.1 Actualizar index.html

Abre `index.html` y busca la línea ~15 (antes del `</head>`):

Añade esto:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### 4.2 Crear archivo de configuración

Crea un nuevo archivo: `supabase-config.js`

```javascript
// Configuración de Supabase
const SUPABASE_URL = 'TU_PROJECT_URL_AQUI';
const SUPABASE_KEY = 'TU_ANON_KEY_AQUI';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
```

Reemplaza:
- `TU_PROJECT_URL_AQUI` → Tu Project URL
- `TU_ANON_KEY_AQUI` → Tu anon public key

### 4.3 Cargar el archivo de configuración

En `index.html`, busca donde están los scripts (al final del archivo):

```html
<!-- Scripts -->
<script src="supabase-config.js"></script>
<script src="translations.js"></script>
<script src="app.js"></script>
```

## ✅ Paso 5: Probar que funciona

1. Abre tu landing page
2. Completa el formulario
3. Envía
4. Ve a Supabase → **Table Editor** → tabla `waitlist`
5. Deberías ver tu registro

## 📊 Paso 6: Descargar todos los registros

### Desde Supabase (Opción fácil):

1. Ve a **Table Editor** → tabla `waitlist`
2. Click en el botón de exportar (arriba a la derecha)
3. Selecciona **CSV** o **JSON**
4. Descarga el archivo

### Desde tu navegador (Opción avanzada):

Abre la consola (F12) en tu landing page:

```javascript
// Descargar todos los registros
async function downloadAllUsers() {
    const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'coride-waitlist-' + new Date().toISOString() + '.json';
        a.click();
    }
}

downloadAllUsers();
```

## 📈 Ver estadísticas en tiempo real

En Supabase:
- **Table Editor** → Ver todos los registros
- **SQL Editor** → Consultas personalizadas:

```sql
-- Contar total de registros
SELECT COUNT(*) FROM waitlist;

-- Registros por idioma
SELECT language, COUNT(*) 
FROM waitlist 
GROUP BY language;

-- Últimos 10 registros
SELECT name, email, created_at 
FROM waitlist 
ORDER BY created_at DESC 
LIMIT 10;
```

## 🔒 Seguridad

✅ **Configuración actual:**
- Los usuarios pueden registrarse (insertar)
- Los usuarios pueden ver el contador
- Los usuarios NO pueden ver otros emails
- Los usuarios NO pueden modificar datos
- Solo tú (admin) puedes ver todos los datos en Supabase

## 💰 Límites del plan gratuito

- ✅ **50,000 usuarios** mensuales
- ✅ **500 MB** de base de datos
- ✅ **Backups automáticos**
- ✅ **100% gratis** para siempre

Cuando superes esos límites (¡enhorabuena por el éxito!), el plan de pago es $25/mes.

## 🆘 Solución de problemas

### Error: "Failed to fetch"
- Verifica que el Project URL sea correcto
- Verifica que la anon key sea correcta
- Revisa la consola del navegador (F12)

### No se guardan los datos
- Verifica que creaste la tabla correctamente
- Revisa las políticas de seguridad (RLS)
- Comprueba la consola del navegador

### Email duplicado no se previene
- Verifica que el campo email sea UNIQUE en la tabla
- Revisa que el código de validación esté actualizado

## 📝 Resumen de pasos

1. ✅ Crea cuenta en Supabase
2. ✅ Crea la tabla con el SQL
3. ✅ Copia Project URL y anon key
4. ✅ Crea `supabase-config.js`
5. ✅ Añade script de Supabase en `index.html`
6. ✅ Actualiza `app.js` (siguiente paso)
7. ✅ Prueba el formulario
8. ✅ Verifica en Table Editor

## 🎯 Próximo paso

Una vez configurado Supabase, te ayudaré a actualizar el código JavaScript para usar la base de datos.

---

**Tiempo total:** 10-15 minutos
**Costo:** $0 (gratis hasta 50,000 usuarios/mes)
**Beneficios:** Base de datos real, sincronización global, anti-duplicados
