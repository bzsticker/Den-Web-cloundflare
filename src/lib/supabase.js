import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zrwecijtzupzpvykfgpo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_to2-pq-cGO84a5nUcwE1ew_-fHhk1Xc';

const isValidUrl = (url) => {
  if (!url || url === 'undefined' || url === 'null') return false;
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch (e) {
    return false;
  }
};

const hasUrl = isValidUrl(supabaseUrl);
const hasAnonKey = Boolean(supabaseAnonKey && supabaseAnonKey !== 'undefined' && supabaseAnonKey !== 'null');

export const supabaseConfig = {
  hasUrl,
  hasAnonKey,
  isReady: hasUrl && hasAnonKey,
};

export const supabase =
  supabaseConfig.isReady
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : null;
