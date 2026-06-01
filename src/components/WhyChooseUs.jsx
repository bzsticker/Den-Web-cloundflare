import { BadgeCheck, CircleDollarSign, ClipboardCheck, Cable } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const icons = [ClipboardCheck, BadgeCheck, Cable, CircleDollarSign];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#10213d] lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="eyebrow">{t.sections.why.eyebrow}</p>
          <h2 className="section-heading mt-5">{t.sections.why.title}</h2>
          <p className="muted-copy mt-4">{t.sections.why.description}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.whyItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <article key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft dark:border-white/10 dark:bg-[#112a4a]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-200">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-black text-brand-navy dark:text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
