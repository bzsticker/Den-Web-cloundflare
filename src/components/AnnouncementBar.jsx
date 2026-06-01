import { Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <div className="border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 text-sky-900 transition-colors duration-300 dark:border-white/10 dark:from-sky-400/10 dark:via-[#0b1f3a] dark:to-sky-400/10 dark:text-sky-100">
      <div className="section-shell flex items-center justify-center gap-2 py-3 text-center text-sm font-bold">
        <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden="true" />
        <span>{t.announcement}</span>
      </div>
    </div>
  );
}
