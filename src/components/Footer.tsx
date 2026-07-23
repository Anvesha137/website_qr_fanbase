import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ========================================================================= */}
      {/* FOOTER CTA BANNER SECTION */}
      {/* ========================================================================= */}
      <div className="relative py-24 px-4 overflow-hidden text-center text-white bg-slate-950 flex flex-col items-center justify-center min-h-[440px]">
        {/* Background Image of the CTA container */}
        <div className="absolute inset-0 -z-10 bg-slate-950">
          <img 
            src="https://framerusercontent.com/images/ghm8KZVCys331Z5Fj8M7kUnamc.jpg" 
            alt="CTA Background" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Overlay to ensure rich contrast */}
          <div className="absolute inset-0 bg-[#695dd4]/25 mix-blend-multiply"></div>
        </div>

        {/* Ready when you are badge */}
        <div className="relative inline-flex items-center space-x-1.5 rounded-full bg-white/20 border border-white/20 px-4 py-1.5 backdrop-blur-md shadow-md mb-6">
          <span className="text-[11px] font-bold tracking-wider uppercase">Ready when you are</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8 max-w-2xl mx-auto leading-none">
          Turn followers <br /> into customers
        </h2>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none px-4">
          <a
            href="https://copilot.quickrevert.gg/auth/login"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white px-8 py-3.5 text-center text-sm font-bold text-[#1b1b1b] shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto hover:scale-[1.03]"
          >
            Get started
          </a>
          <a
            href="https://copilot.quickrevert.gg/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-transparent border-2 border-white/25 px-8 py-3 text-center text-sm font-bold text-white transition-all duration-300 w-full sm:w-auto hover:bg-white/10 hover:border-white/40"
          >
            Discover the app
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM COMPLIANCE & BRAND BAR */}
      {/* ========================================================================= */}
      <div className="bg-white border-t border-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Copyright & Branding */}
          <div className="flex items-center space-x-2 text-slate-500 text-xs sm:text-sm font-semibold select-none">
            <span>©</span>
            <div className="flex items-center space-x-1.5">
              <img src="/Logo_optimized.png" className="h-5 w-5 object-contain" alt="QuickRevert Logo" />
              <span className="font-display font-[800] tracking-wider text-[#1b1b1b] text-sm uppercase">QUICKREVERT</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
          {/* Center: Connected Socials rounded capsules */}
          <div className="flex items-center space-x-3.5">
            {/* X Twitter */}
            <a 
              href="https://x.com/QuickRevert" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#1b1b1b] transition-all"
              title="Follow us on X"
            >
              <span className="font-bold text-sm">𝕏</span>
            </a>
            {/* LinkedIn */}
            <a 
              href="https://www.linkedin.com/company/quickrevert/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#1b1b1b] transition-all"
              title="QuickRevert LinkedIn"
            >
              <span className="font-bold text-sm">in</span>
            </a>
            {/* Docs/Framer Symbol */}
            <a 
              href="https://copilot.quickrevert.gg/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#1b1b1b] transition-all"
              title="Documentation"
            >
              <span className="font-bold text-xs">📖</span>
            </a>
          </div>

          {/* Right: Terms & Policies links */}
          <div className="flex items-center space-x-6 text-xs sm:text-sm font-semibold text-slate-400">
            <a 
              href="https://copilot.quickrevert.gg/terms-of-services" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-800 transition-colors"
            >
              Terms of Services
            </a>
            <a 
              href="https://copilot.quickrevert.gg/privacy-policies" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-800 transition-colors"
            >
              Privacy Policy
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
