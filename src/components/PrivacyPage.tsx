import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Lock, ChevronRight, Mail, 
  BookOpen, CheckCircle2, Sparkles, Eye, Key, Cookie, Printer
} from 'lucide-react';
import { ViewMode } from './Navbar';

interface PrivacyPageProps {
  setViewMode: (mode: ViewMode) => void;
}

export default function PrivacyPage({ setViewMode }: PrivacyPageProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: 'Privacy Policy Overview' },
    { id: 'personal', title: '1. Personal Information' },
    { id: 'collect', title: '2. Information We Collect' },
    { id: 'use', title: '3. How We Use and Share Information' },
    { id: 'choices', title: '4. Your Choices' },
    { id: 'rights', title: '5. Your Rights' },
    { id: 'security', title: '6. Data Security' },
    { id: 'changes', title: '7. Changes to This Policy' },
    { id: 'contact', title: '8. Contact' },
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
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-purple-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#695dd4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              Updated on – 01.01.2026 • Official Data Governance Document
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
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#695dd4] text-white shadow-md transition-all cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setViewMode('refund')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
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
                  8 Sections
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
            <div className="bg-gradient-to-br from-emerald-50 via-white to-indigo-50 rounded-3xl border border-emerald-100 p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Privacy Contact</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Request data updates or exercise your privacy rights directly.
                </p>
              </div>
              <a
                href="mailto:connect@quickrevert.tech"
                className="block w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm"
              >
                connect@quickrevert.tech
              </a>
            </div>

          </aside>

          {/* CENTER: Main Word-for-Word Privacy Text Document */}
          <main className="lg:col-span-6 space-y-6 text-left">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-10">
              
              {/* Intro Section */}
              <div id="intro" className="space-y-3 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Information Governance</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-slate-900">
                  Privacy Policy
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  This Privacy Policy (the "Policy") describes how QuickRevert Technologies ("we", "us", or "our") collects, uses, maintains, and discloses information from users of our Platform. By accessing or using www.quickrevert.tech, you consent to the practices described in this Policy. If you do not agree, please do not use the Platform.
                </p>
              </div>

              {/* Section 1 */}
              <div id="personal" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  1. Personal Information
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  "Personal Information" means information that identifies you, such as your name, email address, and Instagram account details. "Sensitive Personal Information" includes passwords, payment data, and other data protected by law. We only collect information necessary to provide our services.
                </p>
              </div>

              {/* Section 2 */}
              <div id="collect" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  2. Information We Collect
                </h3>
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 text-sm sm:text-base">
                  <p>
                    <strong className="text-slate-900">Personal Identifiable Information:</strong> We collect information you provide directly, such as your name, email, and Instagram account details, when you register or use our services.
                  </p>
                  <p>
                    <strong className="text-slate-900">Non-Personal Information:</strong> We may collect technical data such as browser type, device, IP address, and usage statistics to improve our Platform.
                  </p>
                  <p>
                    <strong className="text-slate-900">Cookies:</strong> We use cookies to enhance your experience. You may disable cookies in your browser, but some features may not function properly.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div id="use" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  3. How We Use and Share Information
                </h3>
                <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>To provide and operate our Platform and services, including customer support and account management.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>To improve, secure, and customize our Platform.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>To communicate with you about your account, updates, offers, and respond to inquiries.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>We do not sell, trade, or rent your personal information. We may share aggregated, non- identifiable data for analytics or business purposes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>We may disclose information if required by law or to protect our rights, users, or the public.</span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div id="choices" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  4. Your Choices
                </h3>
                <ul className="space-y-2.5 text-slate-700 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>You may update or delete your information by contacting us. Some information may be required to use our services.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>You may opt out of marketing communications at any time by contacting us.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 font-bold mt-0.5">•</span>
                    <span>You may disable cookies in your browser settings.</span>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div id="rights" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  5. Your Rights
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Depending on your location, you may have rights regarding your personal information, such as access, correction, deletion, or restriction. To exercise your rights, contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>
                </p>
              </div>

              {/* Section 6 */}
              <div id="security" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <span>6. Data Security</span>
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  We implement reasonable security measures to protect your information. However, no method of transmission or storage is 100% secure. Use the Platform at your own risk.
                </p>
              </div>

              {/* Section 7 */}
              <div id="changes" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  7. Changes to This Policy
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  We may update this Policy from time to time. Changes will be posted on this page. Continued use of www.quickrevert.tech after changes means you accept the updated policy.
                </p>
              </div>

              {/* Section 8 */}
              <div id="contact" className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  8. Contact
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  For questions or concerns about this Policy, contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>
                </p>
              </div>

            </div>
          </main>

          {/* RIGHT SIDEBAR: Key Principles & Security Badges */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6 text-left">
            
            {/* Key Principles Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <span className="font-display font-extrabold text-slate-900 text-sm uppercase tracking-wider block border-b border-slate-100 pb-3">
                Privacy Principles
              </span>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">No Data Selling:</strong> We never sell, rent, or trade your personal data.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Minimal Collection:</strong> Only data required for DM automation service.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Full Control:</strong> Request deletion or updates anytime via email.
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-emerald-950 text-white rounded-3xl p-5 space-y-3 shadow-lg border border-emerald-900/50">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>SSL Encrypted Data</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                All communications and API tokens are transmitted over TLS 1.3 encrypted connections.
              </p>
              <div className="pt-2 border-t border-emerald-900 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                <span>Data Safeguarded</span>
                <span>256-Bit Encryption</span>
              </div>
            </div>

            {/* Print Action */}
            <button
              onClick={() => window.print()}
              className="w-full py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 rounded-2xl text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save Copy</span>
            </button>

          </aside>

        </div>
      </div>
    </div>
  );
}
