import { CalendarCheck, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useSiteContent } from '../contexts/SiteContentContext.jsx';
import BookingForm from './BookingForm.jsx';

export default function BookingCTA() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();

  const bookingText = content.booking?.[language] || t.booking;
  const navText = content.brand?.[language]?.short || t.nav.booking;

  return (
    <section id="booking" className="bg-white py-20 transition-colors duration-300 dark:bg-[#10213d] lg:py-28">
      <div className="section-shell">
        <div className="overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.32),transparent_32%),linear-gradient(135deg,#0b1f3a,#123b66)] p-8 text-white shadow-glow dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.2),transparent_32%),linear-gradient(135deg,#07182d,#0f2948)] sm:p-10 lg:p-14">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-100">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {navText}
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">{bookingText.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">{bookingText.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="#contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-sky-400">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                {bookingText.primaryCta}
              </a>
              <a href="#contact" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {bookingText.secondaryCta}
              </a>
            </div>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
