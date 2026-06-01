import { supabase, supabaseConfig } from '../lib/supabase.js';

export async function createBooking(data) {
  if (!supabaseConfig.isReady || !supabase) {
    throw new Error('SUPABASE_NOT_CONFIGURED');
  }

  const payload = {
    customer_name: data.customer_name.trim(),
    phone: data.phone.trim(),
    line_id: data.line_id?.trim() || null,
    car_model: data.car_model?.trim() || null,
    plate_number: data.plate_number?.trim() || null,
    service_type: data.service_type,
    branch: data.branch || null,
    preferred_date: data.preferred_date || null,
    message: data.message?.trim() || null,
    status: 'new',
  };

  const { error } = await supabase.from('bookings').insert(payload);

  if (error) {
    throw error;
  }

  return { ok: true };
}
