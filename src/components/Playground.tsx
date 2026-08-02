import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RefreshCw, ShoppingBag, Calendar, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import TextRoll from './TextRoll';

export default function Playground() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll progress → horizontal translate
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-45%']);

  const capabilities = [
    {
      id: '01',
      title: 'Smart Followups',
      tag: 'AUTOMATION',
      tagBg: 'bg-purple-500/10 text-purple-600 border-purple-200',
      icon: RefreshCw,
      gradient: 'from-purple-600 to-indigo-600',
      hoverBg: 'hover:bg-purple-50',
      description: 'Automatically send gentle follow-up reminders when a follower misses a link. Convert 3x more DMs into sales.',
      mockup: (
        <div className="bg-slate-900 text-white rounded-2xl p-4 border border-white/10 shadow-xl text-left font-sans text-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Followup Trigger</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-white/90">
            "Hey! Just checking in — did you get a chance to view the link?"
          </div>
          <div className="bg-[#695dd4] text-white p-2 rounded-lg text-center font-bold text-[10px] shadow-sm">
            Automatic Reminder Sent ⚡
          </div>
        </div>
      ),
    },
    {
      id: '02',
      title: 'DM Storefront',
      tag: 'MONETIZATION',
      tagBg: 'bg-pink-500/10 text-pink-600 border-pink-200',
      icon: ShoppingBag,
      gradient: 'from-pink-500 to-rose-600',
      hoverBg: 'hover:bg-pink-50',
      description: 'Share instant buy links, swipeable product catalogs, and custom discount codes directly in conversations.',
      mockup: (
        <div className="bg-white text-slate-900 rounded-2xl p-3.5 border border-slate-200 shadow-xl text-left space-y-2">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-white text-lg">🛍️</div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Creator Masterclass</p>
              <p className="text-[10px] font-extrabold text-[#695dd4] mt-1">₹1,499 <span className="line-through text-slate-400 font-normal">₹2,999</span></p>
            </div>
          </div>
          <button className="group w-full py-1.5 bg-[#695dd4] hover:bg-[#5a50c6] text-white text-[10px] font-bold rounded-lg transition-colors cursor-pointer text-center">
            <TextRoll>Shop Catalog 🛍️</TextRoll>
          </button>
        </div>
      ),
    },
    {
      id: '03',
      title: '1:1 Appointments',
      tag: 'BOOKINGS',
      tagBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      icon: Calendar,
      gradient: 'from-emerald-500 to-teal-600',
      hoverBg: 'hover:bg-emerald-50',
      description: 'Let followers book 1:1 calls, coaching sessions, or masterclass slots directly inside Instagram DMs.',
      mockup: (
        <div className="bg-slate-900 text-white rounded-2xl p-4 border border-white/10 shadow-xl text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Available Slot</span>
            <span className="bg-emerald-500/20 text-emerald-300 text-[8px] font-bold px-2 py-0.5 rounded-full">Confirmed</span>
          </div>
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-semibold">
            <span>📅 Tomorrow, 4:00 PM</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
        </div>
      ),
    },
    {
      id: '04',
      title: 'Invoice Generator',
      tag: 'FINANCIALS',
      tagBg: 'bg-amber-500/10 text-amber-600 border-amber-200',
      icon: FileText,
      gradient: 'from-amber-500 to-orange-600',
      hoverBg: 'hover:bg-amber-50',
      description: 'Issue professional invoices, track client payments, and manage your lead pipeline right from DM chat threads.',
      mockup: (
        <div className="bg-white text-slate-900 rounded-2xl p-3.5 border border-slate-200 shadow-xl text-left space-y-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">INV-2026-08</span>
            <span className="bg-emerald-100 text-emerald-700 text-[9px] font-extrabold px-2 py-0.5 rounded-md">PAID ₹4,999</span>
          </div>
          <p className="text-[10px] text-slate-600 font-medium">1:1 Consultation + Strategy</p>
        </div>
      ),
    },
  ];

  return (
    /* Tall outer wrapper creates the scroll runway */
    <section ref={sectionRef} className="relative h-[200vh]" id="capabilities">
      {/* Sticky inner container — stays pinned while you scroll */}
      <div
        className="sticky top-0 h-screen flex items-center overflow-hidden border-t border-white/10"
        style={{
          backgroundColor: '#703ded',
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      >
        {/* Horizontal track: text block + cards */}
        <motion.div
          style={{ x }}
          className="flex items-stretch gap-10 pl-8 sm:pl-12 lg:pl-20 will-change-transform"
        >
          {/* LEFT: Pinned text block */}
          <div className="w-[380px] sm:w-[440px] lg:w-[480px] shrink-0 flex flex-col justify-center pr-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider mb-5 w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Core Capabilities
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
              Four powerful tools.<br /> Built for Instagram growth.
            </h2>
            <p className="text-white/70 font-sans text-sm sm:text-base font-medium leading-relaxed max-w-sm">
              Everything you need to automate conversations, monetize followers, and scale your business in DMs.
            </p>
          </div>

          {/* RIGHT: The 4 cards */}
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`w-[400px] sm:w-[440px] lg:w-[480px] shrink-0 bg-white rounded-3xl p-8 sm:p-9 border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-slate-300/60 transition-all duration-300 flex flex-col justify-between group min-h-[420px] ${cap.hoverBg}`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${cap.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-all`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${cap.tagBg} transition-all`}>
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-extrabold text-slate-900 mb-2 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 transition-colors">
                    {cap.description}
                  </p>
                </div>

                {/* Mockup */}
                <div className="mt-auto">
                  {cap.mockup}
                </div>
              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}
