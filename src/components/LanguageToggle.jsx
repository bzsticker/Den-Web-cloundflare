import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/95 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
      <Languages className="ml-2 h-4 w-4 text-sky-600 dark:text-sky-300" aria-hidden="true" />
      {['th', 'en'].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`focus-ring rounded-full px-3 py-1.5 text-sm font-bold transition ${
            language === item
              ? 'bg-sky-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'
          }`}
          aria-pressed={language === item}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
