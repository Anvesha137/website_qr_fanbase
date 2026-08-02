import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TextRoll from './TextRoll';

export type ViewMode = 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing' | 'help' | 'affiliate' | 'terms' | 'privacy' | 'refund';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onSelectFeature?: (featureId: string) => void;
}

export default function Navbar({ viewMode, setViewMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-[1440px] rounded-2xl border border-white/25 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div
              onClick={() => setViewMode('landing')}
              className="flex cursor-pointer items-center space-x-1"
              id="navbar-logo"
            >
              <img src="/Logo_optimized.png" className="h-11 w-11 object-contain" alt="QuickRevert Logo" />
              <span className="font-manrope font-bold text-2xl tracking-tight text-[#1b1b1b]">
                QuickRevert
              </span>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8">

              {/* Pricing */}
              <button
                onClick={() => setViewMode('pricing')}
                className={`group text-base font-semibold transition-colors cursor-pointer ${
                  viewMode === 'pricing' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                }`}
              >
                <TextRoll>Pricing</TextRoll>
              </button>

              {/* Features */}
              <button
                onClick={() => setViewMode('features')}
                className={`group text-base font-semibold transition-colors cursor-pointer ${
                  viewMode === 'features' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                }`}
              >
                <TextRoll>Features</TextRoll>
              </button>

              {/* Affiliate */}
              <button
                onClick={() => {
                  setViewMode('affiliate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group text-base font-semibold transition-colors cursor-pointer ${
                  viewMode === 'affiliate' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                }`}
              >
                <TextRoll>Affiliate</TextRoll>
              </button>

              {/* Help */}
              <button
                onClick={() => {
                  setViewMode('help');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`group text-base font-semibold transition-colors cursor-pointer ${
                  viewMode === 'help' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                }`}
              >
                <TextRoll>Help</TextRoll>
              </button>
            </div>

            {/* Right: Get Started Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setViewMode('pricing')}
                className="group rounded-xl bg-[#695dd4] hover:bg-[#5a50c6] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
                id="nav-get-started-btn"
              >
                <TextRoll>Get Started</TextRoll>
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-50 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-100 px-6 py-4 md:hidden space-y-4 bg-white rounded-b-2xl text-left"
            >
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setViewMode('pricing');
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Pricing
                </button>
                <button
                  onClick={() => {
                    setViewMode('features');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setViewMode('affiliate');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`block w-full text-left text-base font-semibold py-1 cursor-pointer ${
                    viewMode === 'affiliate' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                  }`}
                >
                  Affiliate
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setViewMode('help');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`block w-full text-left text-base font-semibold py-1 cursor-pointer ${
                    viewMode === 'help' ? 'text-[#695dd4]' : 'text-[#1b1b1b]/70 hover:text-[#1b1b1b]'
                  }`}
                >
                  Help
                </button>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setViewMode('pricing');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#695dd4] hover:bg-[#5a50c6] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}
