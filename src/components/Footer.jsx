import { Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

export default function Footer() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  const brandName = content.brand?.[language]?.name || t.brand.name;
  const footerText = content.footer?.[language] || t.footer;

  return (
    <footer className="border-t border-slate-200 bg-white py-10 transition-colors duration-300 dark:border-white/10 dark:bg-[#07182d]">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-glow">
            <Wrench className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-black text-brand-navy dark:text-white">{brandName}</h2>
            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-300">{footerText.description}</p>
          </div>
        </div>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">
          © {year} {brandName}. {footerText.rights}.
        </p>
      </div>
    </footer>
  );
}
