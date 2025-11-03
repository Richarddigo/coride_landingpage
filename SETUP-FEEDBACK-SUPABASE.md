# Configurar Tabla de Feedback en Supabase

## Paso 1: Crear la tabla `feedback`

Ve al SQL Editor en tu proyecto de Supabase y ejecuta este script:

```sql
-- Crear tabla para feedback
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    wants_updates BOOLEAN DEFAULT false,
    language TEXT,
    source TEXT DEFAULT 'landing_page',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT desde cualquier usuario (anónimo)
CREATE POLICY "Allow anonymous insert feedback"
ON public.feedback
FOR INSERT
TO anon
WITH CHECK (true);

-- Política para permitir SELECT solo a usuarios autenticados (admin)
CREATE POLICY "Allow authenticated read feedback"
ON public.feedback
FOR SELECT
TO authenticated
USING (true);

-- Crear índice para búsquedas más rápidas
CREATE INDEX IF NOT EXISTS feedback_email_idx ON public.feedback(email);
CREATE INDEX IF NOT EXISTS feedback_created_at_idx ON public.feedback(created_at DESC);

-- Comentarios de documentación
COMMENT ON TABLE public.feedback IS 'Tabla para almacenar feedback y sugerencias de usuarios';
COMMENT ON COLUMN public.feedback.name IS 'Nombre del usuario';
COMMENT ON COLUMN public.feedback.email IS 'Email del usuario';
COMMENT ON COLUMN public.feedback.message IS 'Mensaje o feedback del usuario';
COMMENT ON COLUMN public.feedback.wants_updates IS 'Si el usuario quiere recibir actualizaciones';
COMMENT ON COLUMN public.feedback.language IS 'Idioma en el que se envió el feedback';
COMMENT ON COLUMN public.feedback.source IS 'Origen del feedback (landing_page, app, etc)';
```

## Paso 2: Verificar la tabla

Después de ejecutar el script, verifica en el **Table Editor** que la tabla `feedback` se creó correctamente con estas columnas:

- `id` (uuid, primary key)
- `name` (text)
- `email` (text)
- `message` (text)
- `wants_updates` (boolean)
- `language` (text)
- `source` (text)
- `created_at` (timestamp)

## Paso 3: Probar el formulario

1. Recarga la landing page (Ctrl + Shift + R)
2. Navega al formulario de feedback al final de la página
3. Completa y envía un mensaje de prueba
4. Ve a Supabase → Table Editor → feedback
5. Deberías ver tu mensaje guardado

## Funcionalidades de la tabla

✅ **Permite INSERT anónimo** - Cualquiera puede enviar feedback sin autenticación
✅ **SELECT solo para admin** - Solo usuarios autenticados pueden leer el feedback
✅ **Índices optimizados** - Búsquedas rápidas por email y fecha
✅ **Timestamps automáticos** - Fecha de creación se guarda automáticamente
✅ **RLS habilitado** - Seguridad a nivel de fila activada

## Exportar feedback desde Supabase

### Opción 1: Desde el Table Editor
1. Ve a Table Editor → feedback
2. Click en "Export" → CSV

### Opción 2: Desde SQL Editor
```sql
SELECT 
    name,
    email,
    message,
    wants_updates,
    language,
    created_at
FROM public.feedback
ORDER BY created_at DESC;
```

### Opción 3: Desde la consola del navegador (fallback)
```javascript
// Si Supabase no está configurado, los datos se guardan en localStorage
exportFeedback()
```

## Troubleshooting

### Error: "new row violates row-level security policy"
- Verifica que la política de INSERT anónimo esté creada
- Ejecuta: `DROP POLICY IF EXISTS "Allow anonymous insert feedback" ON public.feedback;`
- Y vuelve a crear la política

### Error: "relation public.feedback does not exist"
- La tabla no se creó correctamente
- Vuelve a ejecutar el script SQL completo

### El formulario no envía datos
- Abre la consola del navegador (F12)
- Verifica que no haya errores
- Comprueba que `supabase-config.js` esté correctamente configurado
