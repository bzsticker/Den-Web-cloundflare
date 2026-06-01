import { BadgeCheck, Star, ExternalLink } from 'lucide-react';
import { reviewMeta } from '../data/reviews.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

export default function Reviews() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();

  const sec = content.sections?.reviews?.[language] || t.sections.reviews;
  const items = (content.reviews || []).map((review) => {
    return {
      ...review,
      name: review[language]?.name || review.th?.name,
      car: review[language]?.car || review.th?.car,
      service: review[language]?.service || review.th?.service,
      text: review[language]?.text || review.th?.text,
    };
  });

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-brand-ink lg:py-28">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{sec.eyebrow}</p>
          <h2 id="reviews-title" className="section-heading mt-5">{sec.title}</h2>
          <p className="muted-copy mt-4">{sec.description}</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => {
            const isClickable = Boolean(item.link);
            const CardComponent = isClickable ? 'a' : 'article';
            const cardProps = isClickable
              ? {
                  href: item.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'card p-6 block hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft dark:hover:border-sky-300/30 transition duration-300 cursor-pointer group',
                }
              : {
                  className: 'card p-6 hover:-translate-y-1 hover:border-sky-200 hover:shadow-soft dark:hover:border-sky-300/30 transition duration-300',
                };

            return (
              <CardComponent key={item.id} {...cardProps}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-1 text-brand-gold" aria-label="5-star rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BadgeCheck className="h-6 w-6 text-sky-500" aria-hidden="true" />
                    {isClickable && (
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-sky-500 transition duration-200" aria-hidden="true" />
                    )}
                  </div>
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
              </CardComponent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
