import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

const gradients = [
  'from-sky-400 via-blue-500 to-indigo-600',
  'from-slate-700 via-sky-600 to-cyan-400',
  'from-red-400 via-sky-500 to-blue-700',
  'from-amber-300 via-sky-400 to-blue-600',
  'from-cyan-300 via-blue-500 to-slate-700',
  'from-blue-300 via-indigo-500 to-sky-700',
];

export default function PortfolioPreview() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'android', 'camera', 'electrical', 'audio', 'lighting', 'diagnostic'];
  const items = filter === 'all' ? content.portfolioItems : content.portfolioItems.filter((item) => item.category === filter);

  const sec = content.sections?.portfolio?.[language] || t.sections.portfolio;

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="bg-white py-20 transition-colors duration-300 dark:bg-[#10213d] lg:py-28">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{sec.eyebrow}</p>
            <h2 id="portfolio-title" className="section-heading mt-5">{sec.title}</h2>
            <p className="muted-copy mt-4">{sec.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-black transition ${
                  filter === item
                    ? 'bg-sky-500 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 dark:border-white/10 dark:bg-white/10 dark:text-slate-200'
                }`}
              >
                {t.portfolioFilters[item]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((meta, index) => {
            const item = meta[language] || meta.th || t.portfolio[meta.id];
            return (
              <article key={meta.id} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-glow dark:border-white/10 dark:bg-[#112a4a]">
                <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]} p-5`}>
                  {meta.imageUrl ? (
                    <img className="absolute inset-0 h-full w-full object-cover" src={meta.imageUrl} alt="" />
                  ) : (
                    <>
                      <div className="absolute inset-x-8 bottom-8 h-20 rounded-[999px] bg-white/18 blur-xl" />
                      <div className="absolute bottom-9 left-8 right-8 h-12 rounded-t-[3rem] rounded-b-2xl border border-white/30 bg-white/25 shadow-2xl backdrop-blur-sm">
                        <div className="absolute left-8 top-8 h-9 w-9 rounded-full border-4 border-white/70 bg-slate-900/35" />
                        <div className="absolute right-8 top-8 h-9 w-9 rounded-full border-4 border-white/70 bg-slate-900/35" />
                        <div className="absolute left-1/2 top-[-1.35rem] h-10 w-28 -translate-x-1/2 rounded-t-[2rem] border border-white/30 bg-white/20" />
                      </div>
                    </>
                  )}
                  <div className="relative flex h-full flex-col justify-between rounded-2xl border border-white/25 bg-white/15 p-4 text-white backdrop-blur-sm">
                    <span className="w-fit rounded-full bg-white/20 px-3 py-1.5 text-sm font-black">{item.service}</span>
                    <span className="text-2xl font-black">{item.car}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-brand-navy dark:text-white">{item.title}</h3>
                      <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-300">{item.car}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-sky-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-sky-50 px-3 py-1.5 text-sm font-bold text-sky-700 dark:bg-sky-400/10 dark:text-sky-100">{item.service}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-100">{item.status}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
