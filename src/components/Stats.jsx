import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-12 transition-colors duration-300 dark:bg-[#10213d]">
      <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft dark:border-white/10 dark:bg-[#112a4a]">
            <p className="text-3xl font-black text-brand-navy sm:text-4xl dark:text-white">{stat.value}</p>
            <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
