import React from 'react';
import { Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  setViewMode?: (mode: 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing') => void;
}

export default function Footer({ setViewMode }: FooterProps) {
  const handlePricingClick = (e: React.MouseEvent) => {
    if (setViewMode) {
      e.preventDefault();
      setViewMode('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-16 pb-72 md:pb-80 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left relative z-10">
        
        {/* Left: Brand info & security badge */}
        <div className="md:col-span-6 flex flex-col items-start">
          <div className="flex items-center gap-1 mb-4 select-none">
            <img src="/Logo_optimized.png" className="h-9 w-9 object-contain" alt="QuickRevert Logo" />
            <span className="font-manrope font-bold tracking-tight text-[#1b1b1b] text-xl">QuickRevert</span>
          </div>
          <p className="text-slate-500 text-sm font-sans mb-6 max-w-sm leading-relaxed">
            Automate your Instagram DMs and grow your business with 24/7 engagement.
          </p>
          
          {/* Socials */}
          <div className="flex items-center space-x-4 mb-6">
            <a 
              href="https://www.instagram.com/quickrevert.tech/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.youtube.com/@QuickReverttech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-slate-400 text-xs font-sans mb-6 select-none">
            © 2026 QuickRevert. All rights reserved.
          </p>
        </div>

        {/* Company Column */}
        <div className="md:col-span-3 flex flex-col space-y-3.5">
          <span className="font-sans font-bold text-slate-800 text-sm select-none">Company</span>
          <a 
            href="/pricing"
            onClick={handlePricingClick}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Pricing
          </a>
          <a 
            href="https://copilot.quickrevert.gg/terms-of-services" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Terms & Conditions
          </a>
          <a 
            href="https://copilot.quickrevert.gg/privacy-policies" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <a 
            href="mailto:support@quickrevert.gg" 
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Contact Us
          </a>
          <a 
            href="https://copilot.quickrevert.gg/refund-policy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Refund Policy
          </a>
        </div>

        {/* Compare Column */}
        <div className="md:col-span-3 flex flex-col space-y-3.5">
          <span className="font-sans font-bold text-slate-800 text-sm select-none">Compare</span>
          <span className="font-sans text-xs sm:text-sm text-slate-400 select-none cursor-default">
            Vs Manychat
          </span>
          <span className="font-sans text-xs sm:text-sm text-slate-400 select-none cursor-default">
            Vs LinkDM
          </span>
        </div>

      </div>

      {/* Giant Watermark Text */}
      <div className="absolute left-0 right-0 bottom-0 flex justify-center translate-y-[15%] pointer-events-none select-none z-0">
        <span className="text-[14vw] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#695dd4]/25 via-[#695dd4]/8 to-transparent leading-none font-onest">
          QuickRevert
        </span>
      </div>
    </footer>
  );
}
