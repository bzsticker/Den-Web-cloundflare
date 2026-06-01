import { ArrowRight, CheckCircle2, Clock3, Gauge, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';

export default function Hero() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const heroContent = content.hero[language] || content.hero.th;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative bg-[linear-gradient(180deg,#eff9ff_0%,#ffffff_52%,#f8fbff_100%)] py-18 transition-colors duration-300 dark:bg-gradient-to-b dark:from-brand-ink dark:via-brand-card dark:to-brand-navy sm:py-20 lg:py-28"
    >
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_12%,rgba(14,165,233,0.25),transparent_34%),radial-gradient(circle_at_82%_4%,rgba(245,184,65,0.13),transparent_30%)]" />
      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <div className="eyebrow shadow-white/60">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {heroContent.badge || t.hero.badge}
          </div>
          <h1 id="hero-title" className="mt-6 max-w-4xl text-[2.65rem] font-black leading-[1.08] text-brand-navy sm:text-6xl lg:text-7xl dark:text-white">
            {heroContent.headline || t.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 dark:text-slate-200">{heroContent.description || t.hero.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#booking"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 px-7 py-4 text-base font-black text-white shadow-glow transition hover:-translate-y-1 hover:shadow-xl"
            >
              {t.hero.primaryCta}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#portfolio"
              className="focus-ring inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-base font-black text-brand-navy shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:text-sky-600 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-sky-200"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {t.hero.trustChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="card relative mx-auto w-full max-w-xl p-4 sm:p-5">
          <div className="absolute -right-4 -top-4 hidden rounded-3xl bg-brand-red px-4 py-2 text-sm font-black text-white shadow-soft sm:block">
            QC
          </div>
          <div className="rounded-[1.35rem] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 dark:border-white/10 dark:from-brand-card dark:to-brand-navy sm:p-5">
            {content.hero.dashboardImageUrl && (
              <img
                className="mb-5 h-48 w-full rounded-3xl object-cover"
                src={content.hero.dashboardImageUrl}
                alt=""
              />
            )}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 dark:text-sky-200">
                  <Wrench className="h-4 w-4" aria-hidden="true" />
                  {t.hero.visualTitle}
                </p>
                <h2 className="mt-1 text-2xl font-black text-brand-navy dark:text-white">{t.hero.visualSubtitle}</h2>
                <p className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-300">{t.hero.cardMeta.car}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-700 shadow-sm dark:bg-emerald-400/15 dark:text-emerald-200">
                {t.hero.cardMeta.quality}
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: t.hero.cardMeta.technician, icon: Sparkles },
                { label: t.hero.cardMeta.eta, icon: Clock3 },
                { label: '82%', icon: Gauge },
              ].map((meta) => {
                const Icon = meta.icon;
                return (
                  <div key={meta.label} className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/10">
                    <Icon className="h-4 w-4 text-sky-500" aria-hidden="true" />
                    <p className="mt-2 text-xs font-black text-slate-600 dark:text-slate-200">{meta.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3">
              {t.hero.workSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/10"
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      index < 3 ? 'bg-sky-500 text-white' : 'bg-brand-gold text-brand-navy'
                    }`}
                  >
                    {index < 3 ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className={`h-2 rounded-full ${index < 3 ? 'bg-sky-500' : 'bg-brand-gold'}`}
                      style={{ width: `${index < 3 ? 100 : 76}%` }}
                    />
                  </div>
                  <span className="min-w-24 text-right text-sm font-black text-slate-700 dark:text-slate-100">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-300">{t.hero.tagsLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-bold text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
