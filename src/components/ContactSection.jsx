import { Clock, ExternalLink, Facebook, LineChart, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

function ContactLinkCard({ icon: Icon, label, value, href }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="focus-ring rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-glow dark:border-white/10 dark:bg-[#112a4a]"
    >
      <div className="flex items-center justify-between gap-4">
        <Icon className="h-6 w-6 text-sky-500" aria-hidden="true" />
        <ExternalLink className="h-4 w-4 text-slate-400" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-black text-slate-500 dark:text-slate-300">{label}</p>
      <p className="mt-1 break-words text-lg font-black text-brand-navy dark:text-white">{value}</p>
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
    <section id="contact" aria-labelledby="contact-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-[#07182d] lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{sec.eyebrow}</p>
          <h2 id="contact-title" className="section-heading mt-5">{sec.title}</h2>
          <p className="muted-copy mt-4">{sec.description}</p>
          <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-[#112a4a]">
            <Clock className="h-6 w-6 text-sky-500" aria-hidden="true" />
            <p className="mt-4 text-sm font-black text-slate-500 dark:text-slate-300">{t.contact.labels.hours}</p>
            <p className="mt-1 text-lg font-black text-brand-navy dark:text-white">{contact.hours || t.contact.hours}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-brand-navy dark:text-white">{t.contact.labels.phone}</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {contact.phoneNumbers.map(localizeItem).map((item) => (
                <ContactLinkCard key={item.href} icon={Phone} label={item.label} value={item.value} href={item.href} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-brand-navy dark:text-white">{t.contact.labels.facebook}</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {contact.facebookPages.map(localizeItem).map((item) => (
                <ContactLinkCard key={item.href} icon={Facebook} label={item.label} value={item.value} href={item.href} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-brand-navy dark:text-white">{t.contact.labels.line}</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <ContactLinkCard icon={LineChart} label={t.contact.labels.line} value={contact.line || t.contact.line} href={contact.lineHref || t.contact.links.line} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-brand-navy dark:text-white">{t.contact.labels.location}</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
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
