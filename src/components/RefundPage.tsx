import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  RotateCcw, ShieldCheck, ChevronRight, Mail, 
  CheckCircle2, Sparkles, AlertCircle, CreditCard, Clock, Printer
} from 'lucide-react';
import { ViewMode } from './Navbar';

interface RefundPageProps {
  setViewMode: (mode: ViewMode) => void;
}

export default function RefundPage({ setViewMode }: RefundPageProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: 'Subscription & Refund Policy' },
    { id: 'non-refundable', title: 'Non-Refundable Subscriptions' },
    { id: 'understanding', title: 'Service Understanding' },
    { id: 'overview', title: 'Policy Overview' },
    { id: 'cancellation', title: 'Cancellation' },
    { id: 'contact', title: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFD] text-slate-800 font-sans antialiased flex flex-col justify-between selection:bg-[#695dd4] selection:text-white pt-24 pb-16">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#695dd4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>Billing & Subscriptions</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Refund Policy
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              Last updated: 1/1/2026 • Billing Rules & Service Agreement
            </p>
          </div>

          {/* Quick Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/15">
            <button
              onClick={() => setViewMode('terms')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setViewMode('privacy')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setViewMode('refund')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#695dd4] text-white shadow-md transition-all cursor-pointer"
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>

      {/* Main Full-Width Layout */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR: Table of Contents & Quick Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6 text-left">
            
            {/* TOC Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-display font-extrabold text-slate-900 text-sm uppercase tracking-wider">
                  Policy Index
                </span>
                <span className="text-[10px] font-mono font-bold text-[#695dd4] bg-indigo-50 px-2 py-0.5 rounded">
                  6 Sections
                </span>
              </div>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group cursor-pointer ${
                      activeSection === sec.id
                        ? 'bg-[#695dd4] text-white font-bold shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 opacity-60 group-hover:translate-x-0.5 transition-transform ${activeSection === sec.id ? 'text-white' : ''}`} />
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Support Card */}
            <div className="bg-gradient-to-br from-rose-50 via-white to-indigo-50 rounded-3xl border border-rose-100 p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Billing Inquiries</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Questions about plan upgrades or account cancellation?
                </p>
              </div>
              <a
                href="mailto:connect@quickrevert.tech"
                className="block w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm"
              >
                connect@quickrevert.tech
              </a>
            </div>

          </aside>

          {/* CENTER: Main Word-for-Word Refund Text Document */}
          <main className="lg:col-span-9 space-y-6 text-left">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-10">
              
              {/* Intro Section */}
              <div id="intro" className="space-y-3 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Subscription Framework</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-slate-900">
                  Subscription & Refund Policy
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  At Quickrevert technologies, we provide Instagram DM automation services through a subscription- based model. Our policy reflects the unique nature of automation services and the resources required to maintain them.
                </p>
              </div>

              {/* Section 1 */}
              <div id="non-refundable" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Non-Refundable Subscriptions
                </h3>
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl">
                  <ul className="space-y-2 text-slate-800 font-semibold text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold mt-0.5">•</span>
                      <span>All subscription payments are non-refundable.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold mt-0.5">•</span>
                      <span>Subscription services are provided on an as-is basis.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold mt-0.5">•</span>
                      <span>Once a subscription period has started, it cannot be refunded.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 2 */}
              <div id="understanding" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Service Understanding
                </h3>
                <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>By purchasing a subscription, you acknowledge that automation technology has inherent limitations.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>Service performance may be affected by third-party platform changes (e.g., Instagram policies).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>Results may vary based on your use case and Instagram's terms.</span>
                  </li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="overview" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Policy Overview
                </h3>
                <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>Subscriptions are final sale and cannot be partially refunded.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>Unused subscription time cannot be exchanged for cash.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>Users are advised to carefully consider their needs before subscribing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold mt-0.5">•</span>
                    <span>You may cancel your subscription at any time to prevent future billing.</span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div id="cancellation" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-rose-600" />
                  <span>Cancellation</span>
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  You may cancel your subscription at any time through your account dashboard. Cancellation will stop future billing but will not generate any refund for the current billing period. Your service will remain active until the end of the current billing period.
                </p>
              </div>

              {/* Section 5 */}
              <div id="contact" className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Contact
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  For any questions about our policy, please contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>
                </p>
              </div>

            </div>
          </main>



        </div>
      </div>
    </div>
  );
}
