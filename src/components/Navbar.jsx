import { CalendarCheck, Menu, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#packages', label: t.nav.packages },
    { href: '#portfolio', label: t.nav.portfolio },
    { href: '#reviews', label: t.nav.reviews },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100/70 bg-white/88 backdrop-blur-2xl transition-colors duration-300 dark:border-white/10 dark:bg-[#07182d]/88">
      <nav className="section-shell flex h-20 items-center justify-between" aria-label="Main navigation">
        <a href="#top" className="focus-ring flex rounded-2xl items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-glow">
            {content.brand.logoUrl ? (
              <img className="h-full w-full rounded-2xl object-cover" src={content.brand.logoUrl} alt="" />
            ) : (
              <Wrench className="h-5 w-5" aria-hidden="true" />
            )}
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black text-brand-navy dark:text-white">
              {content.brand?.[language]?.name || t.brand.name}
            </span>
            <span className="block text-xs font-semibold text-sky-600 dark:text-sky-200">
              {content.brand?.[language]?.altName || t.brand.altName}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-full px-1 py-2 text-sm font-bold text-slate-600 transition hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="#booking"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-3 text-sm font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-sky-600 dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            {t.nav.booking}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-navy lg:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
          aria-label={open ? t.nav.close : t.nav.menu}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`grid border-t border-slate-100 bg-white shadow-soft transition-all duration-300 lg:hidden dark:border-white/10 dark:bg-[#0b1f3a] ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-sky-50 dark:text-slate-100 dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-wrap items-center gap-3 px-1 pt-2">
              <LanguageToggle />
              <ThemeToggle />
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {t.nav.booking}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
