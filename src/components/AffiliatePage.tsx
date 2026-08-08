import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Sparkles, Send, ShieldCheck, Instagram, ArrowRight } from 'lucide-react';

import { ViewMode } from './Navbar';

interface AffiliatePageProps {
  onBack?: () => void;
  setViewMode: (mode: ViewMode) => void;
}

export default function AffiliatePage({ setViewMode }: AffiliatePageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    instagramHandle: '',
    location: '',
    phone: '',
    contentLanguage: '',
    contentNiche: '',
    followers: '',
    usedDmAutomation: '',
    wantAffiliate: '',
    agreedToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    setLoading(true);
    try {
      // 1. Submit to FormSubmit
      const formSubmitData = {
        name: formData.fullName,
        email: formData.email,
        instagram: formData.instagramHandle,
        location: formData.location,
        phone: formData.phone,
        language: formData.contentLanguage,
        niche: formData.contentNiche,
        usedDmTool: formData.usedDmAutomation,
        followers: formData.followers,
        affiliateInterest: formData.wantAffiliate,
        _subject: 'New Collab Partner Application',
        _replyto: formData.email,
      };

      const fsPromise = fetch('https://formsubmit.co/ajax/connect@quickrevert.tech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formSubmitData),
      });

      // 2. Submit to local Express API
      const apiPromise = fetch('/api/collab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
          instagram: formData.instagramHandle,
          location: formData.location,
          phone: formData.phone,
          language: formData.contentLanguage,
          niche: formData.contentNiche,
          usedDmTool: formData.usedDmAutomation,
          followers: formData.followers,
          affiliateInterest: formData.wantAffiliate,
        }),
      });

      await Promise.allSettled([fsPromise, apiPromise]);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting forms:', err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 font-sans antialiased flex flex-col justify-between selection:bg-[#695dd4] selection:text-white">

      {/* Main Content */}
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-1">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#695dd4]/10 border border-[#695dd4]/20 text-[#695dd4] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#695dd4]" />
            <span>Collab & Affiliate Partner Program</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
            Collab Partner Application
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join the community of creators and influencers building high-converting automation workflows with QuickRevert.
          </p>
        </motion.div>

        {/* Application Form Card or Success Screen */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 sm:p-10 md:p-12 relative overflow-hidden"
        >
          {/* Subtle gradient glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#695dd4]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>Full Name</span>
                    <span className="text-xs text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>Email Address</span>
                    <span className="text-xs text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Instagram Handle */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800 flex items-center justify-between">
                    <span>Instagram Handle</span>
                    <span className="text-xs text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 font-bold text-sm">@</span>
                    <input
                      type="text"
                      required
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value.replace(/^@/, '') })}
                      placeholder="your_instagram_handle"
                      className="w-full pl-9 pr-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                    />
                  </div>
                </div>

                {/* Location (State, Country) */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Location (State, Country)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Delhi, India"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Content Language */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Content Language
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contentLanguage}
                    onChange={(e) => setFormData({ ...formData, contentLanguage: e.target.value })}
                    placeholder="e.g. Hindi, English"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Content Niche */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Content Niche
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contentNiche}
                    onChange={(e) => setFormData({ ...formData, contentNiche: e.target.value })}
                    placeholder="Fashion, Food, Tech…"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Current Instagram Followers */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Current Instagram Followers
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    placeholder="e.g. 25000"
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all"
                  />
                </div>

                {/* Used DM Automation Before? */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Used DM Automation Before?
                  </label>
                  <select
                    required
                    value={formData.usedDmAutomation}
                    onChange={(e) => setFormData({ ...formData, usedDmAutomation: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select option…</option>
                    <option value="yes_currently">Yes, currently using DM automation</option>
                    <option value="yes_past">Yes, used in the past</option>
                    <option value="no">No, this is my first time</option>
                  </select>
                </div>

                {/* Want to Become an Affiliate? */}
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-bold text-slate-800">
                    Want to Become an Affiliate?
                  </label>
                  <select
                    required
                    value={formData.wantAffiliate}
                    onChange={(e) => setFormData({ ...formData, wantAffiliate: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50/60 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:border-[#695dd4] focus:ring-2 focus:ring-[#695dd4]/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select option…</option>
                    <option value="yes">I want to become an affiliate</option>
                    <option value="no">I'm interested in collab and creator sponsorship</option>
                    <option value="both">Interested in both</option>
                  </select>
                </div>

              </div>

              {/* Confirmation Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#695dd4] focus:ring-[#695dd4] cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 leading-snug group-hover:text-slate-900 transition-colors">
                    I confirm that I am 18 years of age or older and agree to the QuickRevert terms.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !formData.agreedToTerms}
                  className="w-full py-4 px-8 rounded-2xl bg-[#695dd4] hover:bg-[#5a50c6] active:scale-[0.99] text-white font-bold text-base shadow-lg shadow-[#695dd4]/25 hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit My Application</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8 sm:py-12 space-y-6 relative z-10">
              <div className="h-20 w-20 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-3xl shadow-inner">
                🎉
              </div>

              <div className="space-y-2">
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
                  Application Submitted!
                </h2>
                <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed">
                  Thank you for applying, <strong className="text-slate-900">{formData.fullName}</strong>! We’ve received your details and sent a confirmation to <strong className="text-slate-900">{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Application Under Review</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#695dd4] shrink-0" />
                  <span className="text-sm font-semibold text-slate-700">Partner Manager Review in 24-48 Hours</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setViewMode('landing')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#695dd4] hover:bg-[#5a50c6] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Return to Homepage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      instagramHandle: '',
                      location: '',
                      phone: '',
                      contentLanguage: '',
                      contentNiche: '',
                      followers: '',
                      usedDmAutomation: '',
                      wantAffiliate: '',
                      agreedToTerms: false,
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-sm transition-all cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <div 
            onClick={() => setViewMode('landing')} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img src="/Logo_optimized.png" className="h-8 w-8 object-contain" alt="QuickRevert Logo" />
            <span className="font-manrope font-bold text-lg text-slate-900">QuickRevert</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-600">
            <button 
              onClick={() => {
                setViewMode('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#695dd4] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => {
                setViewMode('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#695dd4] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => {
                setViewMode('refund');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#695dd4] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <a 
              href="mailto:connect@quickrevert.tech" 
              className="hover:text-[#695dd4] transition-colors"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 leading-relaxed font-sans">
          <p>© 2026 QuickRevert. All rights reserved. QuickRevert is an independent service. We use the Official Instagram Graph API and are fully compliant with Meta's Platform Policies and Developer Terms.</p>
        </div>
      </footer>
    </div>
  );
}
