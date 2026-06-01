import { Check, Sparkles } from 'lucide-react';
import { packageMeta } from '../data/packages.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Packages() {
  const { t } = useLanguage();

  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-[#07182d] lg:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t.sections.packages.eyebrow}</p>
          <h2 id="packages-title" className="section-heading mt-5">{t.sections.packages.title}</h2>
          <p className="muted-copy mt-4">{t.sections.packages.description}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {packageMeta.map((meta) => {
            const item = t.packages[meta.id];
            return (
              <article
                key={meta.id}
                className={`relative flex min-h-[470px] flex-col rounded-[1.75rem] border p-6 shadow-soft transition duration-300 hover:-translate-y-1 ${
                  meta.highlight
                    ? 'border-sky-300 bg-gradient-to-b from-sky-500 to-blue-600 text-white lg:-translate-y-4'
                    : 'border-slate-200 bg-white dark:border-white/10 dark:bg-[#112a4a]'
                }`}
              >
                {meta.highlight && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-black text-sky-600 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.packages.recommended}
                  </span>
                )}
                <p className={`text-sm font-black ${meta.highlight ? 'text-sky-50' : 'text-sky-600 dark:text-sky-200'}`}>{item.name}</p>
                <h3 className={`mt-3 text-2xl font-black ${meta.highlight ? 'text-white' : 'text-brand-navy dark:text-white'}`}>{item.title}</h3>
                <p className={`mt-3 leading-7 ${meta.highlight ? 'text-sky-50' : 'text-slate-600 dark:text-slate-300'}`}>{item.description}</p>
                <p className={`mt-5 w-fit rounded-full px-4 py-2 text-sm font-black ${meta.highlight ? 'bg-white/15 text-white' : 'bg-sky-50 text-sky-700 dark:bg-sky-400/10 dark:text-sky-100'}`}>
                  {t.packages.askPrice}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.items.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-bold">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${meta.highlight ? 'bg-white text-sky-600' : 'bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-200'}`}>
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className={`focus-ring mt-auto inline-flex w-full justify-center rounded-full px-5 py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                    meta.highlight ? 'bg-white text-sky-600' : 'bg-brand-navy text-white hover:bg-sky-600 dark:bg-sky-500'
                  }`}
                >
                  {item.cta}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
