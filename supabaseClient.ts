import { createClient } from '@supabase/supabase-js';

// Helper to get environment variables across different build tools (Vite, CRA, Next, etc)
const getEnv = (key: string) => {
    // 1. Check for Vite (import.meta.env)
    try {
        // @ts-ignore - Ignore TS error for import.meta if config is strict
        if (typeof import.meta !== 'undefined' && import.meta.env) {
             // @ts-ignore
            if (import.meta.env[`VITE_${key}`]) return import.meta.env[`VITE_${key}`];
             // @ts-ignore
            if (import.meta.env[key]) return import.meta.env[key];
        }
    } catch (e) {}

    // 2. Check for Process (CRA / Node / Next.js)
    try {
        if (typeof process !== 'undefined' && process.env) {
            // Check common prefixes
            return process.env[`REACT_APP_${key}`] || 
                   process.env[`NEXT_PUBLIC_${key}`] || 
                   process.env[`VITE_${key}`] || 
                   process.env[key];
        }
    } catch (e) {}

    return '';
};

const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseKey = getEnv('SUPABASE_ANON_KEY');

// Cria o cliente apenas se as chaves existirem
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;