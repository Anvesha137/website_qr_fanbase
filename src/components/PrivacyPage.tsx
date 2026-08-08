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
    { id: 'google', title: '4. Google User Data — Limited Use Disclosure' },
    { id: 'choices', title: '5. Your Choices' },
    { id: 'rights', title: '6. Your Rights' },
    { id: 'security', title: '7. Data Security' },
    { id: 'changes', title: '8. Changes to This Policy' },
    { id: 'contact', title: '9. Contact' },
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
              Updated on – 06.08.2026 • Official Data Governance Document
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
                  {sections.length} Sections
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
          <main className="lg:col-span-9 space-y-6 text-left">
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
              <div id="google" className="space-y-4 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  4. Google User Data — Limited Use Disclosure
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  If you choose to connect your Google account to enable Google Meet link generation for online sessions, we receive an OAuth refresh token that grants us permission to manage Google Calendar events on your behalf. We also receive your Google email address to identify which account the token belongs to.
                </p>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  This section specifically addresses our use of data obtained through Google APIs, in compliance with Google's API Services User Data Policy and Limited Use requirements.
                </p>

                <div className="space-y-4 mt-6 pl-4 border-l-2 border-[#695dd4]/25">
                  {/* 4.1 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.1 What Google data we access
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      When you connect Google Meet (Dashboard → My 1:1 Appointments → Connect Google Meet), we request:
                    </p>
                    <ul className="space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
                      <li>
                        Google Calendar Events API (calendar.events scope) — to create, update, and delete calendar events with auto-generated Google Meet links for your online sessions.
                      </li>
                      <li>
                        Your Google email address — to identify which Google account the OAuth token belongs to.
                      </li>
                    </ul>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      We use the narrower calendar.events scope (not the broad calendar scope), which limits our access to event-level operations only. We do not access Gmail, Google Drive, Google Contacts, Google Docs, or any other Google service or data.
                    </p>
                  </div>

                  {/* 4.2 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.2 How we use Google data
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Your Google OAuth refresh token is used solely to manage Google Calendar events when you or your customers interact with online session bookings. Specifically:
                    </p>
                    <ul className="space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
                      <li>We create a calendar event with a Meet link at the time a booking is confirmed.</li>
                      <li>We update the calendar event if a booking is rescheduled.</li>
                      <li>We delete the calendar event if a booking is cancelled.</li>
                      <li>The Meet link is sent to you and your customer in their booking confirmation email.</li>
                    </ul>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      We do not use Google data to serve advertisements, build user profiles, or for any purpose other than managing these calendar events.
                    </p>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      We do not sell, rent, or transfer your Google data to any third party.
                    </p>
                  </div>

                  {/* 4.3 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.3 How we store Google data
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Your Google OAuth refresh token is stored encrypted in our database (Supabase). It is never exposed to the browser, never logged in plaintext, and is accessible only server-side. Row-Level Security (RLS) is enforced, meaning only your own records are accessible to your account.
                    </p>
                  </div>

                  {/* 4.4 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.4 How we share Google data
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      We do not share, sell, transfer, or disclose your Google user data (including the OAuth refresh token or your Google email address) to any third party, except as required by law or to respond to a valid legal process. We do not use Google data for data brokerage or information resale.
                    </p>
                  </div>

                  {/* 4.5 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.5 Limited Use compliance statement
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Our use of data received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. In plain terms:
                    </p>
                    <ul className="space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
                      <li>Google data is used only to provide and improve the Google Calendar event management feature (creating, updating, and deleting calendar events with Google Meet links).</li>
                      <li>We do not use it for advertising, profiling, or any secondary purpose.</li>
                      <li>We do not sell or transfer it to third parties for their independent use.</li>
                    </ul>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      The use of raw or derived user data received from Google Workspace APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
                    </p>
                  </div>

                  {/* 4.6 */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-slate-900">
                      4.6 How to revoke Google access
                    </h4>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      You can disconnect your Google account from QuickRevert at any time:
                    </p>
                    <ul className="space-y-2 text-slate-700 text-sm sm:text-base list-disc pl-5">
                      <li>Within QuickRevert: Dashboard → My 1:1 Appointments → Disconnect Google Meet</li>
                      <li>Via Google: Visit myaccount.google.com/permissions and revoke access for QuickRevert.</li>
                    </ul>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                      Upon disconnection, we delete the stored refresh token from our database within 48 hours. Previously generated Meet links for past or upcoming sessions will remain functional until they expire on Google's end.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5 */}
              <div id="choices" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  5. Your Choices
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

              {/* Section 6 */}
              <div id="rights" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  6. Your Rights
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Depending on your location, you may have rights regarding your personal information, such as access, correction, deletion, or restriction. To exercise your rights, contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>
                </p>
              </div>

              {/* Section 7 */}
              <div id="security" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600" />
                  <span>7. Data Security</span>
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  We implement reasonable security measures to protect your information. However, no method of transmission or storage is 100% secure. Use the Platform at your own risk.
                </p>
              </div>

              {/* Section 8 */}
              <div id="changes" className="space-y-3 border-b border-slate-100 pb-8">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  8. Changes to This Policy
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  We may update this Policy from time to time. Changes will be posted on this page. Continued use of www.quickrevert.tech after changes means you accept the updated policy.
                </p>
              </div>

              {/* Section 9 */}
              <div id="contact" className="space-y-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  9. Contact
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  For questions or concerns about this Policy, contact us at <a href="mailto:connect@quickrevert.tech" className="text-[#695dd4] font-bold hover:underline">connect@quickrevert.tech</a>
                </p>
              </div>

            </div>
          </main>



        </div>
      </div>
    </div>
  );
}
