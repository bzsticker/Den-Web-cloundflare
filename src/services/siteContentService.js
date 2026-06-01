import { supabase, supabaseConfig } from '../lib/supabase.js';

const SITE_CONTENT_ID = 'main';
const SITE_ASSETS_BUCKET = 'site-assets';

export function ensureSupabaseReady() {
  if (!supabaseConfig.isReady || !supabase) {
    throw new Error('SUPABASE_NOT_CONFIGURED');
  }
}

export async function getCurrentSession() {
  ensureSupabaseReady();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signInAdmin(email, password) {
  ensureSupabaseReady();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.session;
}

export async function signOutAdmin() {
  ensureSupabaseReady();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function fetchSiteContent() {
  ensureSupabaseReady();
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', SITE_CONTENT_ID)
    .maybeSingle();

  if (error) throw error;
  return data?.content || null;
}

export async function saveSiteContent(content) {
  ensureSupabaseReady();
  const { error } = await supabase.from('site_content').upsert({
    id: SITE_CONTENT_ID,
    content,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function uploadSiteAsset(file, folder = 'uploads') {
  ensureSupabaseReady();
  const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  const path = `${folder}/${Date.now()}-${safeName || 'asset'}.${extension}`;

  const { error } = await supabase.storage.from(SITE_ASSETS_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) throw error;

  const { data } = supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
