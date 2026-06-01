import { Send, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { createBooking } from '../services/bookingService.js';

const initialForm = {
  customer_name: '',
  phone: '',
  line_id: '',
  car_model: '',
  plate_number: '',
  service_type: '',
  branch: '',
  preferred_date: '',
  message: '',
};

export default function BookingForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const fields = t.bookingForm.fields;
  const serviceOptions = useMemo(() => t.bookingForm.serviceOptions, [t.bookingForm.serviceOptions]);
  const branchOptions = useMemo(() => t.bookingForm.branchOptions, [t.bookingForm.branchOptions]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setStatus({ type: '', message: '' });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.customer_name.trim()) {
      nextErrors.customer_name = t.bookingForm.validation.customerNameRequired;
    }

    if (!form.phone.trim()) {
      nextErrors.phone = t.bookingForm.validation.phoneRequired;
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(form.phone.trim())) {
      nextErrors.phone = t.bookingForm.validation.phoneInvalid;
    }

    if (!form.service_type) {
      nextErrors.service_type = t.bookingForm.validation.serviceRequired;
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await createBooking(form);
      setForm(initialForm);
      setStatus({ type: 'success', message: t.bookingForm.success });
    } catch (error) {
      const message =
        error?.message === 'SUPABASE_NOT_CONFIGURED'
          ? t.bookingForm.configError
          : t.bookingForm.error;
      setStatus({ type: 'error', message });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'focus-ring mt-2 w-full rounded-2xl border border-white/15 bg-white/95 px-4 py-3 text-sm font-bold text-brand-navy shadow-sm transition placeholder:text-slate-400 focus:border-sky-300 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400';
  const errorClass = 'mt-2 text-sm font-bold text-red-200';

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur sm:p-6" noValidate>
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-600">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-xl font-black text-white">{t.bookingForm.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-200">{t.bookingForm.description}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-black text-sky-50">
          {fields.customer_name.label}
          <input
            className={inputClass}
            name="customer_name"
            value={form.customer_name}
            onChange={updateField}
            placeholder={fields.customer_name.placeholder}
            autoComplete="name"
            aria-invalid={Boolean(errors.customer_name)}
          />
          {errors.customer_name && <p className={errorClass}>{errors.customer_name}</p>}
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.phone.label}
          <input
            className={inputClass}
            name="phone"
            value={form.phone}
            onChange={updateField}
            placeholder={fields.phone.placeholder}
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.line_id.label}
          <input
            className={inputClass}
            name="line_id"
            value={form.line_id}
            onChange={updateField}
            placeholder={fields.line_id.placeholder}
            autoComplete="off"
          />
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.car_model.label}
          <input
            className={inputClass}
            name="car_model"
            value={form.car_model}
            onChange={updateField}
            placeholder={fields.car_model.placeholder}
            autoComplete="off"
          />
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.plate_number.label}
          <input
            className={inputClass}
            name="plate_number"
            value={form.plate_number}
            onChange={updateField}
            placeholder={fields.plate_number.placeholder}
            autoComplete="off"
          />
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.preferred_date.label}
          <input
            className={inputClass}
            name="preferred_date"
            type="date"
            value={form.preferred_date}
            onChange={updateField}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-black text-sky-50">
          {fields.service_type.label}
          <select
            className={inputClass}
            name="service_type"
            value={form.service_type}
            onChange={updateField}
            aria-invalid={Boolean(errors.service_type)}
          >
            <option value="">{fields.service_type.placeholder}</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.service_type && <p className={errorClass}>{errors.service_type}</p>}
        </label>

        <label className="block text-sm font-black text-sky-50">
          {fields.branch.label}
          <select className={inputClass} name="branch" value={form.branch} onChange={updateField}>
            <option value="">{fields.branch.placeholder}</option>
            {branchOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm font-black text-sky-50">
        {fields.message.label}
        <textarea
          className={`${inputClass} min-h-28 resize-y`}
          name="message"
          value={form.message}
          onChange={updateField}
          placeholder={fields.message.placeholder}
        />
      </label>

      {status.message && (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-bold ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
          role="status"
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-sky-700 shadow-soft transition hover:-translate-y-0.5 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
        {loading ? t.bookingForm.loading : t.bookingForm.submit}
      </button>
    </form>
  );
}
