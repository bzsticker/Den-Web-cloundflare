import AnnouncementBar from './components/AnnouncementBar.jsx';
import BookingCTA from './components/BookingCTA.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Packages from './components/Packages.jsx';
import PortfolioPreview from './components/PortfolioPreview.jsx';
import Reviews from './components/Reviews.jsx';
import Services from './components/Services.jsx';
import Stats from './components/Stats.jsx';
import WhyChooseUs from './components/WhyChooseUs.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { SiteContentProvider } from './contexts/SiteContentContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AdminPage from './pages/AdminPage.jsx';

function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-brand-ink antialiased transition-colors duration-300 dark:bg-[#07182d] dark:text-slate-100">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <Packages />
        <PortfolioPreview />
        <Reviews />
        <BookingCTA />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname.startsWith('/admin');

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SiteContentProvider>{isAdmin ? <AdminPage /> : <LandingPage />}</SiteContentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
