import { BadgeCheck, Star } from 'lucide-react';
import { reviewMeta } from '../data/reviews.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function Reviews() {
  const { t } = useLanguage();

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-[#07182d] lg:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t.sections.reviews.eyebrow}</p>
          <h2 id="reviews-title" className="section-heading mt-5">{t.sections.reviews.title}</h2>
          <p className="muted-copy mt-4">{t.sections.reviews.description}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviewMeta.map((meta, index) => {
            const item = t.reviews[meta.id];
            return (
              <article key={meta.id} className="card p-6 hover:-translate-y-1 hover:border-sky-200 hover:shadow-glow dark:hover:border-sky-300/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-brand-gold" aria-label="5-star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                  ))}
                  </div>
                  <BadgeCheck className="h-6 w-6 text-sky-500" aria-hidden="true" />
                </div>
                <p className="mt-5 min-h-[168px] leading-8 text-slate-600 dark:text-slate-200">"{item.text}"</p>
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-blue-100 text-sm font-black text-sky-700 dark:from-sky-400/20 dark:to-blue-400/20 dark:text-sky-100">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-black text-brand-navy dark:text-white">{item.name}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{item.car}</p>
                    </div>
                  </div>
                  <p className="mt-4 rounded-full bg-sky-50 px-3 py-2 text-sm font-bold text-sky-600 dark:bg-sky-400/10 dark:text-sky-200">{item.service}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
