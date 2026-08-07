import React, { useState } from 'react';
import { Instagram, Youtube, X, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from './Navbar';

interface FooterProps {
  setViewMode?: (mode: ViewMode) => void;
}

export default function Footer({ setViewMode }: FooterProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    message: '',
  });

  const handlePricingClick = (e: React.MouseEvent) => {
    if (setViewMode) {
      e.preventDefault();
      setViewMode('pricing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowContactModal(false);
      setFormData({ name: '', email: '', handle: '', message: '' });
    }, 2800);
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
          
          {/* Copyright & Disclaimer */}
          <p className="text-slate-400 text-xs font-sans mb-6 leading-relaxed max-w-md">
            © 2026 QuickRevert. All rights reserved. QuickRevert is an independent service. We use the Official Instagram Graph API and are fully compliant with Meta's Platform Policies and Developer Terms.
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
            href="/help"
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('help');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Help Center
          </a>
          <a 
            href="/affiliate"
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('affiliate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Collab & Affiliate
          </a>
          <a 
            href="/terms" 
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Terms & Conditions
          </a>
          <a 
            href="/privacy" 
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-[#1b1b1b] transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <button 
            onClick={() => setShowContactModal(true)} 
            className="font-sans text-left text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Contact Us
          </button>
          <a 
            href="/refund" 
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('refund');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Refund Policy
          </a>
        </div>

        {/* Compare Column */}
        <div className="md:col-span-3 flex flex-col space-y-3.5">
          <span className="font-sans font-bold text-slate-800 text-sm select-none">Compare</span>
          <a
            href="/compare/manychat"
            onClick={(e) => {
              if (setViewMode) {
                e.preventDefault();
                setViewMode('compare-manychat');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-sans text-xs sm:text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Vs ManyChat
          </a>
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

      {/* Contact Us Interactive Modal Form */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden text-left relative"
            >
              {/* Header */}
              <div className="bg-[#695dd4] p-6 text-white relative">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors cursor-pointer p-1 rounded-full hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-200 font-bold">QuickRevert Support</span>
                <h3 className="text-2xl font-bold font-onest mt-1">Get in touch with us</h3>
                <p className="text-xs text-white/80 mt-1">Fill out the form below or email <span className="font-bold underline">connect@quickrevert.tech</span></p>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8">
                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Message Sent!</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto">
                      Thank you! Your inquiry has been routed to <strong>connect@quickrevert.tech</strong>. We will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="alex@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Instagram Handle</label>
                        <input
                          type="text"
                          placeholder="@creator_handle"
                          value={formData.handle}
                          onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="How can we help you today?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/20 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#695dd4] hover:bg-[#5a50c6] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#695dd4]/30 hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
