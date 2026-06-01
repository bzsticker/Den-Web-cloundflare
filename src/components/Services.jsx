import { ArrowRight, Camera, Gauge, Lightbulb, MonitorSmartphone, Volume2, Zap } from 'lucide-react';
import { serviceMeta } from '../data/services.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

const icons = { Camera, Gauge, Lightbulb, MonitorSmartphone, Volume2, Zap };

export default function Services() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();

  const sec = content.sections?.services?.[language] || t.sections.services;
  const servicesCta = content.services?.[language]?.cta || t.services.cta;

  const serviceList = (content.services?.items || serviceMeta).map((service, index) => {
    const defaultMeta = serviceMeta[index] || {};
    const defaultText = t.services[service.id || defaultMeta.id] || {};
    return {
      id: service.id || defaultMeta.id,
      icon: service.icon || defaultMeta.icon,
      title: service[language]?.title || defaultText.title,
      description: service[language]?.description || defaultText.description,
    };
  });

  return (
    <section id="services" aria-labelledby="services-title" className="bg-slate-50 py-20 transition-colors duration-300 dark:bg-[#07182d] lg:py-28">
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{sec.eyebrow}</p>
          <h2 id="services-title" className="section-heading mt-5">{sec.title}</h2>
          <p className="muted-copy mt-4">{sec.description}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceList.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article key={service.id} className="card group flex min-h-[270px] flex-col p-6 hover:-translate-y-1 hover:border-sky-200 hover:shadow-glow dark:hover:border-sky-300/30">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 transition group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-400/15 dark:text-sky-200">
                  {Icon && <Icon className="h-6 w-6" aria-hidden="true" />}
                </div>
                <h3 className="mt-5 text-xl font-black text-brand-navy dark:text-white">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                <a href="#booking" className="focus-ring mt-auto inline-flex w-fit items-center gap-2 rounded-full pt-5 text-sm font-black text-sky-600 transition hover:text-blue-700 dark:text-sky-200 dark:hover:text-white">
                  {servicesCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
