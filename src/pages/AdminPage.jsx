import {
  ImageUp,
  Loader2,
  Lock,
  LogOut,
  Save,
  ShieldCheck,
  Settings,
  Layout,
  Heading,
  Wrench,
  Layers,
  Phone,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
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

function Field({ label, value, onChange, textarea = false, type = 'text', placeholder = '' }) {
  const className =
    'focus-ring mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-brand-navy shadow-sm transition placeholder:text-slate-400 dark:border-white/10 dark:bg-[#152e4d] dark:text-white';

  return (
    <label className="block text-sm font-black text-slate-700 dark:text-slate-200">
      {label}
      {textarea ? (
        <textarea
          className={`${className} min-h-28 resize-y`}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={className}
          type={type}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
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
      setMessage('อัปโหลดสำเร็จแล้ว / Uploaded');
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
          className="focus-ring min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-brand-navy dark:border-white/10 dark:bg-[#152e4d] dark:text-white"
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
      {value && <img className="mt-3 h-28 w-full rounded-2xl object-cover border border-slate-200 dark:border-white/10" src={value} alt="" />}
      {message && <p className="mt-2 text-sm font-bold text-sky-600 dark:text-sky-200">{message}</p>}
    </div>
  );
}

function ListStringEditor({ label, items = [], onChange }) {
  const [newValue, setNewValue] = useState('');

  const addItem = () => {
    if (!newValue.trim()) return;
    onChange([...items, newValue.trim()]);
    setNewValue('');
  };

  const removeItem = (idx) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-black text-slate-700 dark:text-slate-200">{label}</label>
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          className="focus-ring flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-brand-navy dark:border-white/10 dark:bg-[#152e4d] dark:text-white"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="พิมพ์คุณสมบัติแพ็กเกจ..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem();
            }
          }}
        />
        <button
          type="button"
          onClick={addItem}
          className="focus-ring rounded-2xl bg-sky-500 px-4 py-3 text-sm font-black text-white hover:bg-sky-600"
        >
          เพิ่ม
        </button>
      </div>
      <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 border border-slate-100 dark:bg-white/5 dark:border-white/10">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item}</span>
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-xs font-black text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/35"
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>
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
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    if (content) {
      setDraft(content);
    }
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <div className="min-h-screen bg-slate-50 px-5 py-10 dark:bg-[#07182d] flex items-center justify-center">
        <div className="mx-auto max-w-md w-full rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-[#112a4a]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-glow">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-2xl font-black text-brand-navy dark:text-white">{copy.loginTitle}</h1>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-300 mt-0.5">{copy.loginSubtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
          <form className="mt-8 space-y-5" onSubmit={signIn}>
            <Field label={copy.email} value={login.email} onChange={(value) => setLogin((current) => ({ ...current, email: value }))} type="email" placeholder="admin@example.com" />
            <Field label={copy.password} value={login.password} onChange={(value) => setLogin((current) => ({ ...current, password: value }))} type="password" placeholder="••••••••" />
            {message && <p className="rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-200">{message}</p>}
            <button className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-4 font-black text-white transition hover:bg-sky-600 shadow-glow" disabled={saving}>
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
              {copy.loginButton}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'ทั่วไป & ท้ายเว็บ', icon: Settings },
    { id: 'hero_stats', label: 'หน้าแรก & ตัวเลขสถิติ', icon: Layout },
    { id: 'headers', label: 'หัวข้อหลักแต่ละส่วน', icon: Heading },
    { id: 'services_why', label: 'บริการร้าน & จุดเด่น', icon: Wrench },
    { id: 'packages_reviews', label: 'แพ็กเกจ & รีวิวลูกค้า', icon: Layers },
    { id: 'contact_portfolio', label: 'ช่องทางติดต่อ & ผลงาน', icon: Phone }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-brand-ink dark:bg-[#07182d] dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#07182d]/90">
        <div className="section-shell flex min-h-20 flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black text-sky-600 dark:text-sky-200 tracking-widest uppercase">เด่นโมดิฟาย ระยอง</p>
            <h1 className="text-2xl font-black text-brand-navy dark:text-white mt-0.5">ระบบจัดการหลังบ้าน (Dynamic CMS)</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a href="/" className="focus-ring rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50">
              {copy.viewSite}
            </a>
            <button onClick={signOut} className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-sm font-black text-slate-700 dark:text-slate-200 hover:bg-slate-50">
              <LogOut className="h-4 w-4" />
              {copy.signOut}
            </button>
            <button onClick={save} className="focus-ring inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white hover:bg-sky-600 shadow-glow" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {copy.save}
            </button>
          </div>
        </div>
      </header>

      {/* Tabs navigation */}
      <div className="bg-white border-b border-slate-200 dark:bg-[#0b1f3a] dark:border-white/10 transition-colors duration-300">
        <div className="section-shell overflow-x-auto">
          <nav className="flex gap-6 py-3 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-black rounded-xl transition ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-200'
                      : 'text-slate-500 hover:text-brand-navy dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="section-shell py-8 max-w-5xl">
        {message && (
          <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 text-sm font-black text-sky-800 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-sky-500 shrink-0" />
            <div>{message}</div>
          </div>
        )}

        {/* ==================== TAB 1: GENERAL ==================== */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-sky-500" />
                โลโก้และชื่อร้าน (Brand Name & Logo)
              </h2>
              <div className="mt-5 space-y-6">
                <UploadField
                  label="โลโก้ร้าน (Shop Logo)"
                  value={draft.brand.logoUrl}
                  folder="logos"
                  onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, logoUrl: value } }))}
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h3>
                    <div className="mt-3 space-y-4">
                      <Field label="ชื่อเต็มร้าน" value={draft.brand.th.name} onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, th: { ...next.brand.th, name: value } } }))} />
                      <Field label="ชื่อย่อ / สโลแกนย่อ" value={draft.brand.th.short} onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, th: { ...next.brand.th, short: value } } }))} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h3>
                    <div className="mt-3 space-y-4">
                      <Field label="Shop Full Name" value={draft.brand.en.name} onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, en: { ...next.brand.en, name: value } } }))} />
                      <Field label="Short Name" value={draft.brand.en.short} onChange={(value) => setPath((next) => ({ ...next, brand: { ...next.brand, en: { ...next.brand.en, short: value } } }))} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sky-500" />
                แถบประกาศด้านบนสุด (Announcement Bar)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ข้อความที่จะวิ่งอยู่บนแถบสีฟ้าด้านบนสุดของหน้าหลัก</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="ข้อความประกาศ (TH)" value={draft.announcement.th.text} onChange={(value) => setPath((next) => ({ ...next, announcement: { ...next.announcement, th: { text: value } } }))} />
                <Field label="Announcement Text (EN)" value={draft.announcement.en.text} onChange={(value) => setPath((next) => ({ ...next, announcement: { ...next.announcement, en: { text: value } } }))} />
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-sky-500" />
                ส่วนท้ายเว็บ (Footer Section)
              </h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                  <h3 className="font-black text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h3>
                  <div className="mt-3 space-y-4">
                    <Field label="คำอธิบายส่วนท้าย" textarea value={draft.footer.th.description} onChange={(value) => setPath((next) => ({ ...next, footer: { ...next.footer, th: { ...next.footer.th, description: value } } }))} />
                    <Field label="ข้อความลิขสิทธิ์" value={draft.footer.th.rights} onChange={(value) => setPath((next) => ({ ...next, footer: { ...next.footer, th: { ...next.footer.th, rights: value } } }))} />
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                  <h3 className="font-black text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h3>
                  <div className="mt-3 space-y-4">
                    <Field label="Footer Description" textarea value={draft.footer.en.description} onChange={(value) => setPath((next) => ({ ...next, footer: { ...next.footer, en: { ...next.footer.en, description: value } } }))} />
                    <Field label="Rights Text" value={draft.footer.en.rights} onChange={(value) => setPath((next) => ({ ...next, footer: { ...next.footer, en: { ...next.footer.en, rights: value } } }))} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: HERO & STATS ==================== */}
        {activeTab === 'hero_stats' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Layout className="h-5 w-5 text-sky-500" />
                ข้อความต้อนรับและรูปภาพแบนเนอร์ (Hero Banner)
              </h2>
              <div className="mt-5 space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h3>
                    <div className="mt-3 space-y-4">
                      <Field label="ข้อความเล็กติดริบบิ้น (Badge)" value={draft.hero.th.badge} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, th: { ...next.hero.th, badge: value } } }))} />
                      <Field label="หัวข้อใหญ่หลัก (Headline)" value={draft.hero.th.headline} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, th: { ...next.hero.th, headline: value } } }))} />
                      <Field label="คำอธิบายสั้น (Description)" textarea value={draft.hero.th.description} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, th: { ...next.hero.th, description: value } } }))} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h3>
                    <div className="mt-3 space-y-4">
                      <Field label="Ribbon Badge" value={draft.hero.en.badge} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, en: { ...next.hero.en, badge: value } } }))} />
                      <Field label="Main Headline" value={draft.hero.en.headline} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, en: { ...next.hero.en, headline: value } } }))} />
                      <Field label="Description text" textarea value={draft.hero.en.description} onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, en: { ...next.hero.en, description: value } } }))} />
                    </div>
                  </div>
                </div>
                <UploadField
                  label="รูปภาพจำลองแผงหลัง (Dashboard Panel Image)"
                  value={draft.hero.dashboardImageUrl}
                  folder="hero"
                  onChange={(value) => setPath((next) => ({ ...next, hero: { ...next.hero, dashboardImageUrl: value } }))}
                />
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-sky-500" />
                ตัวเลขสถิติความสำเร็จ (Business Statistics)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">การ์ดสถิติ 4 ใบที่จะแสดงผลด้านล่างแบนเนอร์ เพื่อสร้างความน่าเชื่อถือ</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                {draft.stats.map((stat, idx) => (
                  <div key={stat.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                    <h3 className="font-black text-sky-600 dark:text-sky-300 flex justify-between">
                      <span>การ์ดสถิติใบที่ {idx + 1}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">ID: {stat.id}</span>
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="sm:col-span-1">
                        <Field
                          label="ตัวเลขหลัก"
                          value={stat.value}
                          onChange={(value) => {
                            const nextStats = [...draft.stats];
                            nextStats[idx] = { ...nextStats[idx], value };
                            setPath((next) => ({ ...next, stats: nextStats }));
                          }}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <Field
                          label="ป้าย TH"
                          value={stat.th.label}
                          onChange={(value) => {
                            const nextStats = [...draft.stats];
                            nextStats[idx] = { ...nextStats[idx], th: { ...nextStats[idx].th, label: value } };
                            setPath((next) => ({ ...next, stats: nextStats }));
                          }}
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <Field
                          label="ป้าย EN"
                          value={stat.en.label}
                          onChange={(value) => {
                            const nextStats = [...draft.stats];
                            nextStats[idx] = { ...nextStats[idx], en: { ...nextStats[idx].en, label: value } };
                            setPath((next) => ({ ...next, stats: nextStats }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 3: SECTION HEADERS ==================== */}
        {activeTab === 'headers' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Heading className="h-5 w-5 text-sky-500" />
                หัวข้อและคำอธิบายย่อยแต่ละส่วนของเว็บไซต์ (Section Headers Content)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">แก้ไขข้อความพาดหัวและคำอธิบายย่อยทุกส่วนในหน้าแรก</p>
              
              <div className="mt-6 space-y-8">
                {Object.keys(draft.sections).map((key) => {
                  const labelMap = {
                    services: 'ส่วนบริการหลัก (Services Section)',
                    why: 'ส่วนจุดเด่น / ทำไมต้องเลือกเรา (Why Choose Us Section)',
                    packages: 'ส่วนแพ็กเกจยอดนิยม (Packages Section)',
                    portfolio: 'ส่วนผลงานล่าสุด (Portfolio Section)',
                    reviews: 'ส่วนเสียงจากลูกค้า / รีวิว (Reviews Section)',
                    contact: 'ส่วนติดต่อร้าน (Contact Section)'
                  };

                  return (
                    <div key={key} className="rounded-[1.5rem] border border-slate-200 dark:border-white/10 p-6 bg-slate-50/50 dark:bg-white/5">
                      <h3 className="text-lg font-black text-brand-navy dark:text-white border-b border-slate-200 dark:border-white/10 pb-3 mb-4">{labelMap[key] || key}</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* TH Column */}
                        <div className="space-y-4">
                          <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h4>
                          <Field
                            label="คำโปรยด้านบน (Eyebrow)"
                            value={draft.sections[key].th.eyebrow}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].th.eyebrow = value;
                              return next;
                            })}
                          />
                          <Field
                            label="หัวเรื่องส่วน (Title)"
                            value={draft.sections[key].th.title}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].th.title = value;
                              return next;
                            })}
                          />
                          <Field
                            label="คำอธิบายรายละเอียด (Description)"
                            textarea
                            value={draft.sections[key].th.description}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].th.description = value;
                              return next;
                            })}
                          />
                        </div>

                        {/* EN Column */}
                        <div className="space-y-4">
                          <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h4>
                          <Field
                            label="Section Eyebrow (EN)"
                            value={draft.sections[key].en.eyebrow}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].en.eyebrow = value;
                              return next;
                            })}
                          />
                          <Field
                            label="Section Title (EN)"
                            value={draft.sections[key].en.title}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].en.title = value;
                              return next;
                            })}
                          />
                          <Field
                            label="Section Description (EN)"
                            textarea
                            value={draft.sections[key].en.description}
                            onChange={(value) => setPath((next) => {
                              next.sections[key].en.description = value;
                              return next;
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 4: SERVICES & WHY ==================== */}
        {activeTab === 'services_why' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-sky-500" />
                จุดเด่น / ทำไมต้องเลือกเรา (Why Choose Us Items)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">แสดงเป็นบล็อกข้อมูล 4 บล็อกในหน้าแรก สามารถแก้ไขไอคอน หัวข้อ และคำอธิบายได้</p>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                {draft.whyItems.map((item, idx) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                    <h3 className="font-black text-sky-600 dark:text-sky-300 flex justify-between">
                      <span>จุดเด่นข้อที่ {idx + 1}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">ID: {item.id}</span>
                    </h3>
                    <Field
                      label="ไอคอนที่ใช้ (Lucide Icon Name)"
                      value={item.icon}
                      onChange={(value) => {
                        const nextItems = [...draft.whyItems];
                        nextItems[idx] = { ...nextItems[idx], icon: value };
                        setPath((next) => ({ ...next, whyItems: nextItems }));
                      }}
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase text-slate-400">TH</h4>
                        <Field
                          label="หัวข้อ"
                          value={item.th.title}
                          onChange={(value) => {
                            const nextItems = [...draft.whyItems];
                            nextItems[idx] = { ...nextItems[idx], th: { ...nextItems[idx].th, title: value } };
                            setPath((next) => ({ ...next, whyItems: nextItems }));
                          }}
                        />
                        <Field
                          label="คำอธิบาย"
                          textarea
                          value={item.th.text}
                          onChange={(value) => {
                            const nextItems = [...draft.whyItems];
                            nextItems[idx] = { ...nextItems[idx], th: { ...nextItems[idx].th, text: value } };
                            setPath((next) => ({ ...next, whyItems: nextItems }));
                          }}
                        />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase text-slate-400">EN</h4>
                        <Field
                          label="Title"
                          value={item.en.title}
                          onChange={(value) => {
                            const nextItems = [...draft.whyItems];
                            nextItems[idx] = { ...nextItems[idx], en: { ...nextItems[idx].en, title: value } };
                            setPath((next) => ({ ...next, whyItems: nextItems }));
                          }}
                        />
                        <Field
                          label="Text / Description"
                          textarea
                          value={item.en.text}
                          onChange={(value) => {
                            const nextItems = [...draft.whyItems];
                            nextItems[idx] = { ...nextItems[idx], en: { ...nextItems[idx].en, text: value } };
                            setPath((next) => ({ ...next, whyItems: nextItems }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Wrench className="h-5 w-5 text-sky-500" />
                รายการบริการหลัก (Services Catalog)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">บริการของร้านที่แสดงในหมวดหมู่บริการหลัก</p>
              
              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-sky-500/5 dark:bg-sky-500/10">
                  <Field
                    label="ข้อความปุ่มดูบริการเพิ่มเติม (TH)"
                    value={draft.services.cta}
                    onChange={(value) => setPath((next) => ({ ...next, services: { ...next.services, cta: value } }))}
                  />
                  <Field
                    label="View Services CTA Button (EN)"
                    value={draft.services.en?.cta || draft.services.items?.find(x => x.cta)?.cta}
                    onChange={(value) => setPath((next) => {
                      if (!next.services.en) next.services.en = {};
                      next.services.en.cta = value;
                      return next;
                    })}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {draft.services.items.map((item, idx) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                      <h3 className="font-black text-sky-600 dark:text-sky-300 flex justify-between">
                        <span>บริการที่ {idx + 1}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">ID: {item.id}</span>
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field
                          label="ไอคอนลูไซด์ (Icon Name)"
                          value={item.icon}
                          onChange={(value) => {
                            const nextItems = [...draft.services.items];
                            nextItems[idx] = { ...nextItems[idx], icon: value };
                            setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                          }}
                        />
                        <Field
                          label="ID บริการ"
                          value={item.id}
                          onChange={(value) => {
                            const nextItems = [...draft.services.items];
                            nextItems[idx] = { ...nextItems[idx], id: value };
                            setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                          }}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase text-slate-400">TH</h4>
                          <Field
                            label="หัวข้อบริการ"
                            value={item.th.title}
                            onChange={(value) => {
                              const nextItems = [...draft.services.items];
                              nextItems[idx] = { ...nextItems[idx], th: { ...nextItems[idx].th, title: value } };
                              setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                            }}
                          />
                          <Field
                            label="คำอธิบายบริการ"
                            textarea
                            value={item.th.description}
                            onChange={(value) => {
                              const nextItems = [...draft.services.items];
                              nextItems[idx] = { ...nextItems[idx], th: { ...nextItems[idx].th, description: value } };
                              setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xs font-black uppercase text-slate-400">EN</h4>
                          <Field
                            label="Service Title"
                            value={item.en.title}
                            onChange={(value) => {
                              const nextItems = [...draft.services.items];
                              nextItems[idx] = { ...nextItems[idx], en: { ...nextItems[idx].en, title: value } };
                              setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                            }}
                          />
                          <Field
                            label="Service Description"
                            textarea
                            value={item.en.description}
                            onChange={(value) => {
                              const nextItems = [...draft.services.items];
                              nextItems[idx] = { ...nextItems[idx], en: { ...nextItems[idx].en, description: value } };
                              setPath((next) => ({ ...next, services: { ...next.services, items: nextItems } }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 5: PACKAGES & REVIEWS ==================== */}
        {activeTab === 'packages_reviews' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-500" />
                แพ็กเกจยอดนิยม (Popular Packages Setup)
              </h2>
              
              <div className="mt-5 space-y-6">
                <div className="grid gap-6 md:grid-cols-2 rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5">
                  <div className="space-y-3">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">ป้ายส่วนกลางภาษาไทย</h3>
                    <Field
                      label="ป้ายริบบิ้นแนะนำ (Recommended Badge TH)"
                      value={draft.packages.th?.recommended}
                      onChange={(value) => setPath((next) => {
                        if (!next.packages.th) next.packages.th = {};
                        next.packages.th.recommended = value;
                        return next;
                      })}
                    />
                    <Field
                      label="ป้ายปุ่มสอบถามราคา (Ask Price TH)"
                      value={draft.packages.th?.askPrice}
                      onChange={(value) => setPath((next) => {
                        if (!next.packages.th) next.packages.th = {};
                        next.packages.th.askPrice = value;
                        return next;
                      })}
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-black text-sky-600 dark:text-sky-300">ป้ายส่วนกลางภาษาอังกฤษ</h3>
                    <Field
                      label="Recommended Badge EN"
                      value={draft.packages.en?.recommended}
                      onChange={(value) => setPath((next) => {
                        if (!next.packages.en) next.packages.en = {};
                        next.packages.en.recommended = value;
                        return next;
                      })}
                    />
                    <Field
                      label="Ask Price EN"
                      value={draft.packages.en?.askPrice}
                      onChange={(value) => setPath((next) => {
                        if (!next.packages.en) next.packages.en = {};
                        next.packages.en.askPrice = value;
                        return next;
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  {draft.packages.items.map((pkg, idx) => (
                    <div key={pkg.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                      <h3 className="font-black text-sky-600 dark:text-sky-300 flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
                        <span>แพ็กเกจที่ {idx + 1}: {pkg.th.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">ID: {pkg.id}</span>
                      </h3>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Package TH */}
                        <div className="space-y-4">
                          <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">ข้อมูลภาษาไทย</h4>
                          <Field label="ชื่อสั้นแพ็กเกจ (Name)" value={pkg.th.name} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].th.name = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="หัวข้อเต็ม (Title)" value={pkg.th.title} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].th.title = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="รายละเอียด (Description)" textarea value={pkg.th.description} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].th.description = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="ปุ่มกด (CTA)" value={pkg.th.cta} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].th.cta = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <ListStringEditor
                            label="รายการคุณสมบัติเด่น (Features List - TH)"
                            items={pkg.th.items}
                            onChange={(items) => {
                              const nextItems = [...draft.packages.items];
                              nextItems[idx].th.items = items;
                              setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                            }}
                          />
                        </div>

                        {/* Package EN */}
                        <div className="space-y-4">
                          <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">ข้อมูลภาษาอังกฤษ</h4>
                          <Field label="Package Short Name" value={pkg.en.name} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].en.name = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="Full Title" value={pkg.en.title} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].en.title = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="Description" textarea value={pkg.en.description} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].en.description = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <Field label="CTA Button Label" value={pkg.en.cta} onChange={(value) => {
                            const nextItems = [...draft.packages.items];
                            nextItems[idx].en.cta = value;
                            setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                          }} />
                          <ListStringEditor
                            label="Features List (EN)"
                            items={pkg.en.items}
                            onChange={(items) => {
                              const nextItems = [...draft.packages.items];
                              nextItems[idx].en.items = items;
                              setPath((next) => ({ ...next, packages: { ...next.packages, items: nextItems } }));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-500" />
                รีวิวจากลูกค้า (Customer Reviews)
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">แสดงผลรีวิว 3 บล็อกเพื่อสร้างความประทับใจ</p>
              
              <div className="mt-5 space-y-6">
                {draft.reviews.map((review, idx) => (
                  <div key={review.id} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                    <h3 className="font-black text-sky-600 dark:text-sky-300 flex justify-between items-center pb-2 border-b border-slate-200 dark:border-white/10">
                      <span>รีวิวลูกค้าท่านที่ {idx + 1}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">ID: {review.id}</span>
                    </h3>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h4>
                        <Field label="ชื่อผู้รีวิว" value={review.th.name} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].th.name = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="รุ่นรถ" value={review.th.car} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].th.car = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="บริการที่ทำ" value={review.th.service} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].th.service = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="ข้อความรีวิว" textarea value={review.th.text} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].th.text = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-black text-sm text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h4>
                        <Field label="Reviewer Name" value={review.en.name} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].en.name = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="Car Model" value={review.en.car} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].en.car = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="Service Rendered" value={review.en.service} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].en.service = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                        <Field label="Review Text" textarea value={review.en.text} onChange={(value) => {
                          const nextReviews = [...draft.reviews];
                          nextReviews[idx].en.text = value;
                          setPath((next) => ({ ...next, reviews: nextReviews }));
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-sky-500" />
                กล่องแบนเนอร์จองคิว (Booking CTA Section)
              </h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                  <h3 className="font-black text-sky-600 dark:text-sky-300">TH (ภาษาไทย)</h3>
                  <Field label="หัวข้อเชิญชวน (Booking Title)" value={draft.booking.th.title} onChange={(value) => setPath((next) => {
                    next.booking.th.title = value;
                    return next;
                  })} />
                  <Field label="รายละเอียดกระตุ้น (Description)" textarea value={draft.booking.th.description} onChange={(value) => setPath((next) => {
                    next.booking.th.description = value;
                    return next;
                  })} />
                  <Field label="ปุ่มจองคิวหลัก (Primary Button)" value={draft.booking.th.primaryCta} onChange={(value) => setPath((next) => {
                    next.booking.th.primaryCta = value;
                    return next;
                  })} />
                  <Field label="ปุ่มคุยกับทีมงานรอง (Secondary Button)" value={draft.booking.th.secondaryCta} onChange={(value) => setPath((next) => {
                    next.booking.th.secondaryCta = value;
                    return next;
                  })} />
                </div>
                <div className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-slate-50/50 dark:bg-white/5 space-y-4">
                  <h3 className="font-black text-sky-600 dark:text-sky-300">EN (ภาษาอังกฤษ)</h3>
                  <Field label="Booking Title (EN)" value={draft.booking.en.title} onChange={(value) => setPath((next) => {
                    next.booking.en.title = value;
                    return next;
                  })} />
                  <Field label="Description (EN)" textarea value={draft.booking.en.description} onChange={(value) => setPath((next) => {
                    next.booking.en.description = value;
                    return next;
                  })} />
                  <Field label="Primary Button (EN)" value={draft.booking.en.primaryCta} onChange={(value) => setPath((next) => {
                    next.booking.en.primaryCta = value;
                    return next;
                  })} />
                  <Field label="Secondary Button (EN)" value={draft.booking.en.secondaryCta} onChange={(value) => setPath((next) => {
                    next.booking.en.secondaryCta = value;
                    return next;
                  })} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 6: CONTACT & PORTFOLIO ==================== */}
        {activeTab === 'contact_portfolio' && (
          <div className="space-y-6">
            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Phone className="h-5 w-5 text-sky-500" />
                รายละเอียดช่องทางการติดต่อ (Contact Info)
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="ไอดี LINE ร้าน" value={draft.contact.line} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, line: value } }))} />
                <Field label="ลิงก์ชวนแอดไลน์ร้าน" value={draft.contact.lineHref} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, lineHref: value } }))} />
                <Field label="เวลาเปิดทำการ" value={draft.contact.hours} onChange={(value) => setPath((next) => ({ ...next, contact: { ...next.contact, hours: value } }))} />
              </div>
              <EditableList title="เบอร์โทรศัพท์ติดต่อ" items={draft.contact.phoneNumbers} fields={['label', 'labelEn', 'value', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, phoneNumbers: items } }))} />
              <EditableList title="เพจ Facebook ของร้าน" items={draft.contact.facebookPages} fields={['label', 'value', 'valueEn', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, facebookPages: items } }))} />
              <EditableList title="พิกัดสาขาและลิงก์ Google Maps" items={draft.contact.branches} fields={['label', 'labelEn', 'value', 'valueEn', 'href']} onChange={(items) => setPath((next) => ({ ...next, contact: { ...next.contact, branches: items } }))} />
            </section>

            <section className="card p-6">
              <h2 className="text-xl font-black text-brand-navy dark:text-white flex items-center gap-2">
                <Layout className="h-5 w-5 text-sky-500" />
                แกลเลอรีรูปภาพและผลงานร้าน (Portfolio Items)
              </h2>
              <div className="mt-5 space-y-5">
                {draft.portfolioItems.map((item, index) => (
                  <div key={item.id} className="rounded-3xl border border-slate-200 p-5 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                      <UploadField
                        label={`รูปผลงานการ์ดที่ ${index + 1}`}
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
                            <Field
                              label={copy.title || 'หัวเรื่องผลงาน'}
                              value={item[lang].title}
                              onChange={(value) => {
                                const nextItems = [...draft.portfolioItems];
                                nextItems[index][lang].title = value;
                                setPath((next) => ({ ...next, portfolioItems: nextItems }));
                              }}
                            />
                            <Field
                              label={copy.car || 'รุ่นรถที่รับบริการ'}
                              value={item[lang].car}
                              onChange={(value) => {
                                const nextItems = [...draft.portfolioItems];
                                nextItems[index][lang].car = value;
                                setPath((next) => ({ ...next, portfolioItems: nextItems }));
                              }}
                            />
                            <Field
                              label={copy.service || 'หมวดหมู่บริการ'}
                              value={item[lang].service}
                              onChange={(value) => {
                                const nextItems = [...draft.portfolioItems];
                                nextItems[index][lang].service = value;
                                setPath((next) => ({ ...next, portfolioItems: nextItems }));
                              }}
                            />
                            <Field
                              label={copy.status || 'สถานะการทำงาน'}
                              value={item[lang].status}
                              onChange={(value) => {
                                const nextItems = [...draft.portfolioItems];
                                nextItems[index][lang].status = value;
                                setPath((next) => ({ ...next, portfolioItems: nextItems }));
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
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
      <div className="flex items-center justify-between gap-4 border-t border-slate-200 dark:border-white/10 pt-6 mt-6">
        <h3 className="font-black text-brand-navy dark:text-white text-base">{title}</h3>
        <button
          type="button"
          onClick={addItem}
          className="focus-ring inline-flex items-center gap-1 rounded-full bg-sky-500 px-4 py-2 text-sm font-black text-white hover:bg-sky-600 shadow-glow"
        >
          <Plus className="h-4 w-4" />
          {copy.add}
        </button>
      </div>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <Field key={field} label={copy[field] || field} value={item[field]} onChange={(value) => updateItem(index, field, value)} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-black text-red-600 dark:border-red-400/30 dark:text-red-200 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-4 w-4" />
              {copy.remove}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
