import { ImageUp, Loader2, Lock, LogOut, Save, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import LanguageToggle from '../components/LanguageToggle.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';
import { defaultSiteContent, mergeSiteContent } from '../data/defaultSiteContent.js';
import {
  getCurrentSession,
  saveSiteContent,
  signInAdmin,
  signOutAdmin,
  uploadSiteAsset,
} from '../services/siteContentService.js';

function Field({ label, value, onChange, textarea = false, type = 'text' }) {
  const className =
    'focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-brand-navy shadow-sm transition placeholder:text-slate-400 dark:border-white/10 dark:bg-white/10 dark:text-white';

  return (
    <label className="block text-sm font-black text-slate-700 dark:text-slate-200">
      {label}
      {textarea ? (
        <textarea className={`${className} min-h-28 resize-y`} value={value || ''} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} type={type} value={value || ''} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function UploadField({ label, value, folder, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    try {
      const url = await uploadSiteAsset(file, folder);
      onChange(url);
      setMessage('อัปโหลดแล้ว / Uploaded');
    } catch (error) {
      setMessage(error.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <p className="text-sm font-black text-slate-700 dark:text-slate-200">{label}</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          className="focus-ring min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-brand-navy dark:border-white/10 dark:bg-white/10 dark:text-white"
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://..."
        />
        <label className="focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-black text-white transition hover:bg-sky-600">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
          Upload
          <input className="sr-only" type="file" accept="image/*" onChange={upload} disabled={uploading} />
        </label>
      </div>
      {value && <img className="mt-3 h-28 w-full rounded-2xl object-cover" src={value} alt="" />}
      {message && <p className="mt-2 text-sm font-bold text-sky-600 dark:text-sky-200">{message}</p>}
    </div>
  );
}

export default function AdminPage() {
  const { language, t } = useLanguage();
  const { content, setRemoteContent } = useSiteContent();
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [draft, setDraft] = useState(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    getCurrentSession()
      .then(setSession)
      .catch(() => setSession(null))
      .finally(() => setLoading(false));
  }, []);

  const copy = t.admin;

  const setPath = (updater) => {
    setDraft((current) => mergeSiteContent(defaultSiteContent, updater(structuredClone(current))));
    setMessage('');
  };

  const signIn = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const nextSession = await signInAdmin(login.email, login.password);
      setSession(nextSession);
      setMessage(copy.loginSuccess);
    } catch (error) {
      setMessage(error.message || copy.loginError);
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    await signOutAdmin();
    setSession(null);
  };

  const save = async () => {
    setSaving(true);
    setMessage('');
    try {
      await saveSiteContent(draft);
      setRemoteContent(draft);
      setMessage(copy.saveSuccess);
    } catch (error) {
      setMessage(error.message || copy.saveError);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#07182d]">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-[#07182d]">
        <div className="mx-auto max-w-md rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#112a4a]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-2xl font-black text-brand-navy dark:text-white">{copy.loginTitle}</h1>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{copy.loginSubtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          <form className="mt-6 space-y-4" onSubmit={signIn}>
            <Field label={copy.email} value={login.email} onChange={(value) => setLogin((current) => ({ ...current, email: value }))} type="email" />
            <Field label={copy.password} value={login.password} onChange={(value) => setLogin((current) => ({ ...current, password: value }))} type="password" />
            {message && <p className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold text-sky-700 dark:bg-sky-400/10 dark:text-sky-100">{message}</p>}
            <button className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-4 font-black text-white transition hover:bg-sky-600" disabled={saving}>
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
              {copy.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-brand-ink dark:bg-[#07182d] dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#07182d]/90">
        <div className="section-shell flex min-h-20 flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-sky-600 dark:text-sky-200">Admin CMS</p>
            <h1 className="text-2xl font-black text-brand-navy dark:text-white">{copy.adminTitle}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a href="/" className="focus-ring rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 dark:border-white/10 dark:text-slate-100">
              {copy.viewSite}
            </a>
            <button onClick={signOut} className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-slate-700 dark:border-white/10 dark:text-slate-100">
              <LogOut className="h-4 w-4" />
              {copy.signOut}
            </button>
            <button onClick={save} className="focus-ring inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {copy.save}
            </button>
          </div>
        </div>
      </header>

      <main className="section-shell space-y-8 py-8">
        {message && <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-bold text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-100">{message}</div>}

        <section className="card p-6">
          <h2 className="text-xl font-black text-brand-navy dark:text-white">{copy.brandSection}</h2>
          <div className="mt-5">
            <UploadField
              label={copy.logoUrl}
              value={draft.brand.logoUrl}
              folder="logos"
              onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, logoUrl: value } }))}
            />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-black text-brand-navy dark:text-white">{copy.heroSection}</h2>
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            {['th', 'en'].map((lang) => (
              <div key={lang} className="rounded-3xl border border-slate-200 p-5 dark:border-white/10">
                <h3 className="font-black text-sky-600 dark:text-sky-200">{lang.toUpperCase()}</h3>
                <div className="mt-4 space-y-4">
                  <Field label={copy.heroBadge} value={draft.hero[lang].badge} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, [lang]: { ...next.hero[lang], badge: value } } }))} />
                  <Field label={copy.heroHeadline} value={draft.hero[lang].headline} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, [lang]: { ...next.hero[lang], headline: value } } }))} />
                  <Field label={copy.heroDescription} textarea value={draft.hero[lang].description} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, [lang]: { ...next.hero[lang], description: value } } }))} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <UploadField
              label={copy.heroImage}
              value={draft.hero.dashboardImageUrl}
              folder="hero"
              onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, dashboardImageUrl: value } }))}
            />
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-black text-brand-navy dark:text-white">{copy.contactSection}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="LINE" value={draft.contact.line} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, line: value } }))} />
            <Field label={copy.lineLink} value={draft.contact.lineHref} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, lineHref: value } }))} />
            <Field label={copy.hours} value={draft.contact.hours} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, hours: value } }))} />
          </div>
          <EditableList title={copy.phoneNumbers} items={draft.contact.phoneNumbers} fields={['label', 'labelEn', 'value', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, phoneNumbers: items } }))} />
          <EditableList title={copy.facebookPages} items={draft.contact.facebookPages} fields={['label', 'value', 'valueEn', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, facebookPages: items } }))} />
          <EditableList title={copy.branches} items={draft.contact.branches} fields={['label', 'labelEn', 'value', 'valueEn', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, branches: items } }))} />
        </section>

        <section className="card p-6">
          <h2 className="text-xl font-black text-brand-navy dark:text-white">{copy.portfolioSection}</h2>
          <div className="mt-5 space-y-5">
            {draft.portfolioItems.map((item, index) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 p-5 dark:border-white/10">
                <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
                  <UploadField
                    label={`${copy.portfolioImage} ${index + 1}`}
                    value={item.imageUrl}
                    folder="portfolio"
                    onChange={(value) => {
                      const nextItems = [...draft.portfolioItems];
                      nextItems[index] = { ...nextItems[index], imageUrl: value };
                      setPath((next) => ({ ...next, portfolioItems: nextItems }));
                    }}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {['th', 'en'].map((lang) => (
                      <div key={lang} className="space-y-3">
                        <h3 className="font-black text-sky-600 dark:text-sky-200">{lang.toUpperCase()}</h3>
                        {['title', 'car', 'service', 'status'].map((field) => (
                          <Field
                            key={field}
                            label={copy[field]}
                            value={item[lang][field]}
                            onChange={(value) => {
                              const nextItems = [...draft.portfolioItems];
                              nextItems[index] = {
                                ...nextItems[index],
                                [lang]: { ...nextItems[index][lang], [field]: value },
                              };
                              setPath((next) => ({ ...next, portfolioItems: nextItems }));
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function EditableList({ title, items, fields, onChange }) {
  const { t } = useLanguage();
  const copy = t.admin;

  const updateItem = (index, field, value) => {
    const nextItems = [...items];
    nextItems[index] = { ...nextItems[index], [field]: value };
    onChange(nextItems);
  };

  const addItem = () => {
    const item = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
    onChange([...items, item]);
  };

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-black text-brand-navy dark:text-white">{title}</h3>
        <button type="button" onClick={addItem} className="focus-ring rounded-full bg-sky-500 px-4 py-2 text-sm font-black text-white">
          {copy.add}
        </button>
      </div>
      <div className="mt-3 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 p-4 dark:border-white/10">
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <Field key={field} label={copy[field] || field} value={item[field]} onChange={(value) => updateItem(index, field, value)} />
              ))}
            </div>
            <button type="button" onClick={() => removeItem(index)} className="focus-ring mt-3 rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-600 dark:border-red-400/30 dark:text-red-200">
              {copy.remove}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
