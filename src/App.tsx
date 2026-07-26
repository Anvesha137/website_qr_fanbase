import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Playground from './components/Playground';
import Features from './components/Features';
import Pricing from './components/Pricing';
import StayForRest from './components/StayForRest';
import FAQ from './components/FAQ';
import LinkInBio from './components/LinkInBio';
import FeaturesPage from './components/FeaturesPage';
import MySlotsPage from './components/MySlotsPage';
import Footer from './components/Footer';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Initial path mapping for direct page loading (no dashboard)
  const getInitialView = (): 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing' | 'help' => {
    const path = window.location.pathname;
    if (path === '/features') return 'features';
    if (path === '/slots') return 'slots';
    if (path === '/link-in-bio') return 'link-in-bio';
    if (path === '/pricing') return 'pricing';
    if (path === '/help') return 'help';
    return 'landing';
  };

  const [viewMode, setViewModeState] = useState<'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing' | 'help'>(getInitialView);
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
      else setViewModeState('landing');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Helper to change view and push browser history state
  const setViewMode = (mode: 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing' | 'help') => {
    setViewModeState(mode);
    let targetPath = '/';
    if (mode === 'features') targetPath = '/features';
    else if (mode === 'slots') targetPath = '/slots';
    else if (mode === 'link-in-bio') targetPath = '/link-in-bio';
    else if (mode === 'pricing') targetPath = '/pricing';
    else if (mode === 'help') targetPath = '/help';

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
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Activating sandbox</p>
                <p className="text-sm font-bold text-white mt-0.5">Creating 14-day trial for {checkoutNotification.plan}...</p>
                <p className="text-xs text-slate-400 mt-1">Redirecting you to the connected Features Simulator...</p>
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
            {/* Navbar + Hero share a relative container — navbar floats over hero */}
            <div className="relative">
              <Navbar
                viewMode={viewMode}
                setViewMode={setViewMode}
                onSelectFeature={(featureId) => setSelectedFeature(featureId)}
              />
              <Hero onGetStarted={() => setViewMode('features')} />
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
            className="relative pt-24 bg-[#FFF9F6]"
          >
            <Navbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              onSelectFeature={(featureId) => setSelectedFeature(featureId)}
            />
            <Pricing />
          </motion.div>
        ) : viewMode === 'link-in-bio' ? (
          <motion.div
            key="lib-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
          >
            <FeaturesPage
              initialFeatureId={selectedFeature}
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
          >
            <MySlotsPage onBack={() => setViewMode('landing')} />
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
            <Navbar
              viewMode={viewMode}
              setViewMode={setViewMode}
              onSelectFeature={(featureId) => setSelectedFeature(featureId)}
            />
            <FAQ />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer setViewMode={setViewMode} />
    </div>
  );
}
