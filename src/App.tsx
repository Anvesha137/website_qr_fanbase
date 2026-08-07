import React, { useState } from 'react';
import Navbar, { ViewMode } from './components/Navbar';
import Hero from './components/Hero';
import Playground from './components/Playground';
import Features from './components/Features';
import Pricing from './components/Pricing';
import StayForRest from './components/StayForRest';
import FAQ from './components/FAQ';
import LinkInBio from './components/LinkInBio';
import FeaturesPage from './components/FeaturesPage';
import MySlotsPage from './components/MySlotsPage';
import AffiliatePage from './components/AffiliatePage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import RefundPage from './components/RefundPage';
import CompareManyChat from './components/CompareManyChat';
import Footer from './components/Footer';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SplashLoader from './components/SplashLoader';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Initial path mapping for direct page loading (no dashboard)
  const getInitialView = (): ViewMode => {
    const path = window.location.pathname;
    if (path === '/features') return 'features';
    if (path === '/slots') return 'slots';
    if (path === '/link-in-bio') return 'link-in-bio';
    if (path === '/pricing') return 'pricing';
    if (path === '/help') return 'help';
    if (path === '/affiliate') return 'affiliate';
    if (path === '/terms') return 'terms';
    if (path === '/privacy') return 'privacy';
    if (path === '/refund') return 'refund';
    if (path === '/compare/manychat') return 'compare-manychat';
    return 'landing';
  };

  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialView);
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(undefined);
  const [checkoutNotification, setCheckoutNotification] = useState<{ plan: string; price: number } | null>(null);

  // Sync state on popstate (back/forward button navigation)
  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/features') setViewModeState('features');
      else if (path === '/slots') setViewModeState('slots');
      else if (path === '/link-in-bio') setViewModeState('link-in-bio');
      else if (path === '/pricing') setViewModeState('pricing');
      else if (path === '/help') setViewModeState('help');
      else if (path === '/affiliate') setViewModeState('affiliate');
      else if (path === '/terms') setViewModeState('terms');
      else if (path === '/privacy') setViewModeState('privacy');
      else if (path === '/refund') setViewModeState('refund');
      else if (path === '/compare/manychat') setViewModeState('compare-manychat');
      else setViewModeState('landing');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper to change view and push browser history state
  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    let targetPath = '/';
    if (mode === 'features') targetPath = '/features';
    else if (mode === 'slots') targetPath = '/slots';
    else if (mode === 'link-in-bio') targetPath = '/link-in-bio';
    else if (mode === 'pricing') targetPath = '/pricing';
    else if (mode === 'help') targetPath = '/help';
    else if (mode === 'affiliate') targetPath = '/affiliate';
    else if (mode === 'terms') targetPath = '/terms';
    else if (mode === 'privacy') targetPath = '/privacy';
    else if (mode === 'refund') targetPath = '/refund';
    else if (mode === 'compare-manychat') targetPath = '/compare/manychat';

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  const handleSelectPlan = (planName: string, price: number) => {
    setCheckoutNotification({ plan: planName, price });
    setTimeout(() => {
      setCheckoutNotification(null);
      setViewMode('features');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-brand-primary selection:text-white font-sans antialiased">

      {/* Website Loading Splash Video Loader */}
      <AnimatePresence>
        {showSplash && (
          <SplashLoader onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Global Navbar — rendered across all pages including /features */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Floating Checkout Notification */}
      <AnimatePresence>
        {checkoutNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-indigo-500/20 flex items-start space-x-3.5">
              <div className="h-10 w-10 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Activating plan</p>
                <p className="text-sm font-bold text-white mt-0.5">Creating 14-day trial for {checkoutNotification.plan}...</p>
                <p className="text-xs text-slate-400 mt-1">Redirecting you to Features...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Views */}
      <AnimatePresence mode="wait">
        {viewMode === 'landing' ? (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <Hero
                onGetStarted={() => setViewMode('features')}
                onBookCall={() => window.open('https://wa.me/917619479099?text=Tell%20me%20more%20about%20QuickRevert', '_blank')}
                isInitialLoad={showSplash}
              />
            </div>

            <Playground />
            <Features />
            <StayForRest />
          </motion.div>
        ) : viewMode === 'pricing' ? (
          <motion.div
            key="pricing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24 bg-[#703ded]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          >
            <Pricing />
          </motion.div>
        ) : viewMode === 'link-in-bio' ? (
          <motion.div
            key="lib-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24"
          >
            <LinkInBio onBack={() => setViewMode('landing')} />
          </motion.div>
        ) : viewMode === 'features' ? (
          <motion.div
            key="features-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24 bg-[#703ded]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          >
            <FeaturesPage
              initialFeatureId={selectedFeature}
              setViewMode={setViewMode}
              onBack={() => {
                setSelectedFeature(undefined);
                setViewMode('landing');
              }}
            />
          </motion.div>
        ) : viewMode === 'slots' ? (
          <motion.div
            key="slots-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24"
          >
            <MySlotsPage onBack={() => setViewMode('landing')} />
          </motion.div>
        ) : viewMode === 'affiliate' ? (
          <motion.div
            key="affiliate-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AffiliatePage setViewMode={setViewMode} />
          </motion.div>
        ) : viewMode === 'terms' ? (
          <motion.div
            key="terms-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TermsPage setViewMode={setViewMode} />
          </motion.div>
        ) : viewMode === 'privacy' ? (
          <motion.div
            key="privacy-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PrivacyPage setViewMode={setViewMode} />
          </motion.div>
        ) : viewMode === 'refund' ? (
          <motion.div
            key="refund-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <RefundPage setViewMode={setViewMode} />
          </motion.div>
        ) : viewMode === 'compare-manychat' ? (
          <motion.div
            key="compare-manychat-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24 bg-[#703ded]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          >
            <CompareManyChat setViewMode={setViewMode} />
          </motion.div>
        ) : (
          <motion.div
            key="help-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative pt-24 bg-white"
          >
            <FAQ />
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode !== 'affiliate' && <Footer setViewMode={setViewMode} />}
    </div>
  );
}
