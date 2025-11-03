// Configuración de Supabase para Coride
// 🔧 IMPORTANTE: Reemplaza estos valores con los tuyos de Supabase

const SUPABASE_URL = 'https://rerbsmowsegrhujgespz.supabase.co'; // Ejemplo: https://abcdefgh.supabase.co
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcmJzbW93c2Vncmh1amdlc3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzU4NDYsImV4cCI6MjA3Nzc1MTg0Nn0.SAqF3vhhQtPUuSa_wZek6asWH5kBHn_FakTyr3JzeKA'; // Tu anon public key

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Función para verificar que está configurado
if (SUPABASE_URL === 'https://rerbsmowsegrhujgespz.supabase.co' || SUPABASE_KEY === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcmJzbW93c2Vncmh1amdlc3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzU4NDYsImV4cCI6MjA3Nzc1MTg0Nn0.SAqF3vhhQtPUuSa_wZek6asWH5kBHn_FakTyr3JzeKA') {
    console.warn('⚠️ SUPABASE NO CONFIGURADO: Por favor actualiza SUPABASE_URL y SUPABASE_KEY en supabase-config.js');
    console.warn('📖 Lee las instrucciones en SETUP-SUPABASE.md');
}
