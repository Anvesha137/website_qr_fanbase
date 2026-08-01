import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, ShieldCheck, Lock, ChevronRight, Mail, 
  BookOpen, HelpCircle, CheckCircle2, Sparkles, Scale, AlertTriangle, Printer
} from 'lucide-react';
import { ViewMode } from './Navbar';

interface TermsPageProps {
  setViewMode: (mode: ViewMode) => void;
}

export default function TermsPage({ setViewMode }: TermsPageProps) {
  const [activeSection, setActiveSection] = useState<string>('intro');

  const sections = [
    { id: 'intro', title: 'Terms of Service' },
    { id: 'access', title: '1. Access and Registration' },
    { id: 'license', title: '2. License to Use' },
    { id: 'conduct', title: '3. User Content & Conduct' },
    { id: 'payments', title: '4. Payments & Refunds' },
    { id: 'ip', title: '5. Intellectual Property' },
    { id: 'disclaimer', title: '6. Disclaimer' },
    { id: 'liability', title: '7. Limitation of Liability' },
    { id: 'indemnity', title: '8. Indemnity' },
    { id: 'changes', title: '9. Changes to Terms' },
    { id: 'governing', title: '10. Governing Law' },
    { id: 'contact', title: '11. Contact' },
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
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-indigo-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#695dd4]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#695dd4]/30 border border-[#695dd4]/40 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-indigo-300" />
              <span>QuickRevert Legal Center</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-slate-300 text-sm font-medium">
              Updated on – 01.01.2026 • Official Terms of Service Document
            </p>
          </div>

          {/* Quick Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md border border-white/15">
            <button
              onClick={() => setViewMode('terms')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#695dd4] text-white shadow-md transition-all cursor-pointer"
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
                  Document Index
                </span>
                <span className="text-[10px] font-mono font-bold text-[#695dd4] bg-indigo-50 px-2 py-0.5 rounded">
                  11 Sections
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
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl border border-indigo-100 p-5 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-[#695dd4] text-white flex items-center justify-center font-bold">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900 text-sm">Have Questions?</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Our legal & support team is ready to clarify any clause or condition.
                </p>
              </div>
              <a
                href="mailto:connect@quickrevert.tech"
                className="block w-full py-2.5 px-4 bg-[#695dd4] hover:bg-[#5a50c6] text-white rounded-xl text-xs font-bold text-center transition-all shadow-sm"
              >
                connect@quickrevert.tech
              </a>
            </div>

          </aside>

          {/* CENTER: Main Word-for-Word Legal Text Document */}
          <main className="lg:col-span-6 space-y-6 text-left">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-10">
              
              {/* Intro Section */}
              <div id="intro" className="space-y-3 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-[#695dd4] uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Platform Agreement</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl text-slate-900">
                  Terms of Service
                </h2>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  These Terms of Service ("Terms") govern your use of Quickrevert platform– (https://quickrevert.tech) (the "Platform"), an Instagram DM automation SaaS, and any content, services, or features offered on or through the Platform. By accessing or using Quickrevert technologies, you agree to be bound by these Terms, our Privacy Policy, and any other policies referenced herein. If you do not agree, please do not use the Platform.
                </p>
              </div>

              {/* Section 1 */}
              <div id="access" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span>1. Access and Registration</span>
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  You must be at least 18 years old to use quickrevert.tech. By registering, you represent that all information provided is accurate and complete. You are responsible for maintaining the confidentiality of your account and password.
                </p>
              </div>

              {/* Section 2 */}
              <div id="license" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  2. License to Use
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Quickrevert grants you a limited, non-exclusive, non-transferable license to access and use the Platform for your personal or business Instagram account(s), subject to these Terms. You may not:
                </p>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#695dd4] font-bold mt-0.5">•</span>
                      <span>Modify, copy, or create derivative works of any part of the Platform.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#695dd4] font-bold mt-0.5">•</span>
                      <span>Use the Platform for any unlawful, abusive, or unauthorized purpose, including spam or activity prohibited by Instagram/Meta.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#695dd4] font-bold mt-0.5">•</span>
                      <span>Reverse engineer, decompile, or attempt to extract the source code of the Platform.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#695dd4] font-bold mt-0.5">•</span>
                      <span>Remove any copyright, trademark, or proprietary notices.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#695dd4] font-bold mt-0.5">•</span>
                      <span>Resell, sublicense, or transfer your access to any third party.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div id="conduct" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  3. User Content & Conduct
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  You are solely responsible for any content, messages, or data you send or automate using Quickrevert technologies. You agree not to use the Platform to harass, threaten, or violate the rights of others, or to post or transmit any unlawful, harmful, or offensive material. We reserve the right to suspend or terminate accounts for violations.
                </p>
              </div>

              {/* Section 4 */}
              <div id="payments" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  4. Payments & Refunds
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Access to certain features may require payment of a subscription fee. All payments are processed via third-party providers. All purchases are final and non-refundable, unless otherwise stated in our Refund Policy.
                </p>
              </div>

              {/* Section 5 */}
              <div id="ip" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  5. Intellectual Property
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  All content, software, trademarks, and materials on https://quickrevert.tech are the property of Quickrevert technologies or its licensors. You may not use, reproduce, or distribute any part of the Platform except as expressly permitted by these Terms.
                </p>
              </div>

              {/* Section 6 */}
              <div id="disclaimer" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>6. Disclaimer</span>
                </h3>
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 sm:p-5 rounded-2xl">
                  <p className="text-slate-800 font-bold uppercase text-xs sm:text-sm leading-relaxed tracking-wide font-mono">
                    THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. QUICKREVERT TECHNOLOGIES DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div id="liability" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  7. Limitation of Liability
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  To the maximum extent permitted by law, Quickrevert technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising from your use of the Platform.
                </p>
              </div>

              {/* Section 8 */}
              <div id="indemnity" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  8. Indemnity
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  You agree to indemnify and hold harmless Quickrevert technologies, its officers, related personal, and employees from any claims, damages, or expenses arising from your use of the Platform or violation of these Terms.
                </p>
              </div>

              {/* Section 9 */}
              <div id="changes" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  9. Changes to Terms
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  We may update these Terms at any time. Continued use of https://quickrevert.tech after changes constitutes acceptance of the new Terms. Please review this page periodically.
                </p>
              </div>

              {/* Section 10 */}
              <div id="governing" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  10. Governing Law
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
                </p>
              </div>

              {/* Section 11 */}
              <div id="contact" className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  11. Contact
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  For questions or concerns about these Terms, please contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>.
                </p>
              </div>

            </div>
          </main>

          {/* RIGHT SIDEBAR: Key Highlights, Trust Badges & Metadata */}
          <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-6 text-left">
            
            {/* Key Takeaways */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-4">
              <span className="font-display font-extrabold text-slate-900 text-sm uppercase tracking-wider block border-b border-slate-100 pb-3">
                Key Summary At A Glance
              </span>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Age Limit:</strong> Must be 18+ years old to register.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">License:</strong> Limited non-exclusive license for your Instagram account.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Jurisdiction:</strong> Governed by the laws of India (Delhi courts).
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">Support Contact:</strong> connect@quickrevert.tech
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Badge */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Meta API Compliance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                QuickRevert operates using the Official Instagram Graph API and strictly adheres to Meta Developer Terms and Platform Policies.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Official Partner SaaS</span>
                <span className="text-emerald-400 font-bold">100% Compliant</span>
              </div>
            </div>

            {/* Action Card */}
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
