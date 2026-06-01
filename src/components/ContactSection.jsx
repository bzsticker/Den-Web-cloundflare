import { Clock, ExternalLink, Facebook, LineChart, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

function ContactLinkCard({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="focus-ring flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-glow dark:border-white/10 dark:bg-brand-card group"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-400/10 dark:text-sky-200 transition group-hover:scale-105">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-400">{label}</p>
        <p className="mt-0.5 truncate text-sm font-black text-brand-navy dark:text-white" title={value}>{value}</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-sky-500 transition duration-200" aria-hidden="true" />
    </a>
  );
}

export default function ContactSection() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const contact = content.contact;

  const sec = content.sections?.contact?.[language] || t.sections.contact;

  const localizeItem = (item) => ({
    ...item,
    label: language === 'en' ? item.labelEn || item.label : item.label,
    value: language === 'en' ? item.valueEn || item.value : item.value,
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-brand-ink lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{sec.eyebrow}</p>
          <h2 id="contact-title" className="section-heading mt-5">{sec.title}</h2>
          <p className="muted-copy mt-4">{sec.description}</p>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft dark:border-white/10 dark:bg-brand-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 dark:bg-sky-400/10 dark:text-sky-200">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-400">{t.contact.labels.hours}</p>
              <p className="mt-0.5 text-sm font-black text-brand-navy dark:text-white">{contact.hours || t.contact.hours}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-black text-sky-600 dark:text-sky-300 tracking-wide uppercase">{t.contact.labels.phone}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {contact.phoneNumbers.map(localizeItem).map((item) => (
                <ContactLinkCard key={item.href} icon={Phone} label={item.label} value={item.value} href={item.href} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-sky-600 dark:text-sky-300 tracking-wide uppercase">{t.contact.labels.facebook}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {contact.facebookPages.map(localizeItem).map((item) => (
                <ContactLinkCard key={item.href} icon={Facebook} label={item.label} value={item.value} href={item.href} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-sky-600 dark:text-sky-300 tracking-wide uppercase">{t.contact.labels.line}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <ContactLinkCard icon={LineChart} label={t.contact.labels.line} value={contact.line || t.contact.line} href={contact.lineHref || t.contact.links.line} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-sky-600 dark:text-sky-300 tracking-wide uppercase">{t.contact.labels.location}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {contact.branches.map(localizeItem).map((item) => (
                <ContactLinkCard key={item.href} icon={MapPin} label={item.label} value={item.value} href={item.href} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
