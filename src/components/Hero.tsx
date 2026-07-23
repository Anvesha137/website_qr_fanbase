import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  // 5-step cycle: 0=reset/blank, 1=question, 2=+trigger, 3=+hello, 4=+product card
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">

      {/* Full-bleed background image — no dark overlay, let the natural sky show */}
      <img
        src="/image.png"
        alt="Woman using Instagram DM automation"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '78% 88%', transform: 'scale(1.2)', transformOrigin: 'center center' }}
      />


      {/* Very subtle left gradient only for text legibility — much lighter than before */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-44 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">

          {/* ── Left Column ── */}
          <div className="flex flex-col items-start text-left">

            {/* Trusted Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 rounded-2xl bg-[#5b88c8]/70 border border-white/20 backdrop-blur-sm px-5 py-2.5 text-white mb-8 select-none"
              id="hero-trusted-badge"
            >
              <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 text-blue-600 stroke-[3]" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                Trusted by 1,000+ creators and brands
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[68px] sm:text-[80px] lg:text-[92px] font-[800] leading-[0.9] tracking-tight text-white mb-6"
              id="hero-title"
            >
              Turn followers<br />
              into customers
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-lg mb-12"
              id="hero-subtitle"
            >
              Automate DMs and replies to grow your audience and follow up with Instagram followers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-row items-center gap-6"
            >
              <button
                onClick={onGetStarted}
                className="rounded-xl bg-white px-10 py-4 text-base font-bold text-[#1b1b1b] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                id="hero-cta-btn"
              >
                Get started
              </button>

              {/* Meta Business Partners */}
              <div className="flex items-center gap-2.5 border-l border-white/30 pl-6" id="hero-meta-badge">
                {/* Meta logo */}
                <svg className="h-5 w-10 fill-white opacity-80" viewBox="0 0 50 30">
                  <path d="M6.3 23.8C4.4 23.8 3 22.9 2 21.2 1 19.5.5 17.3.5 14.6c0-2.8.5-5 1.6-6.7C3.3 6.3 4.9 5.5 6.9 5.5c1.1 0 2 .3 2.7.8.7.6 1.3 1.4 1.8 2.5.4-1 1-1.8 1.6-2.4.7-.6 1.5-.9 2.5-.9 1.9 0 3.4.9 4.4 2.6 1 1.7 1.5 3.9 1.5 6.5 0 2.7-.5 4.9-1.5 6.6-1 1.7-2.5 2.6-4.3 2.6-1.1 0-2-.3-2.7-.9-.7-.6-1.3-1.5-1.8-2.7-.4 1.1-.9 2-1.6 2.6-.7.6-1.6.9-2.7.9zm.8-3.1c.6 0 1.1-.3 1.5-.9.4-.6.8-1.6 1-3L9 15.2l-.3-1.5c-.1-.6-.2-1.1-.4-1.6-.2-.5-.4-.9-.7-1.1-.3-.3-.6-.4-1-.4-.6 0-1.1.3-1.5.9-.4.6-.7 1.6-.8 2.9v1.3c0 1.5.3 2.7.8 3.5.4.4.9.5 1.3.5zm9.3 0c.5 0 .9-.2 1.3-.5.4-.4.7-1 .9-1.9.2-.8.3-1.8.3-2.9 0-1.2-.1-2.2-.4-3-.2-.8-.5-1.3-.9-1.7-.4-.3-.8-.5-1.3-.5-.6 0-1.1.3-1.5.9-.4.6-.7 1.6-.8 3l-.1 1.3c0 1.5.3 2.7.8 3.5.5.5.9.8 1.4.8h.3z" />
                </svg>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Meta Business</span>
                  <span className="text-sm font-bold text-white">Partners</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Chat bubbles ── */}
          <div className="hidden lg:block relative h-[500px]">

            {/* Bubble 1: "Do you have a shop?" — step 1+ */}
            <AnimatePresence>
              {step >= 1 && (
                <motion.div
                  key="bubble-question"
                  initial={{ opacity: 0, y: -12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  className="absolute flex items-center gap-2.5 bg-[#1b1b1b] text-white px-3.5 py-2.5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm"
                  style={{ top: '12%', left: '8%' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                    alt="User"
                    className="h-7 w-7 rounded-full border-2 border-[#695dd4] object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <p className="text-xs font-bold whitespace-nowrap">Do you have a shop?</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trigger Pill — step 2+ */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="trigger-pill"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="absolute flex items-center gap-1.5 text-white/85 text-[11px] font-medium"
                  style={{ top: '28%', left: '8%' }}
                >
                  <span className="text-yellow-300 text-xs">✦</span>
                  <span>Shopping flow automation triggered</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble 2: "Hello 👋" — step 3+ */}
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  key="bubble-hello"
                  initial={{ opacity: 0, x: -25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -25, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  className="absolute bg-white text-[#1b1b1b] px-4 py-2.5 rounded-full shadow-xl"
                  style={{ top: '40%', left: '18%' }}
                >
                  <p className="text-xs font-semibold whitespace-nowrap">Hello 👋 Here we go!</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bubble 3: Product card — step 4+ */}
            <AnimatePresence>
              {step >= 4 && (
                <motion.div
                  key="bubble-product"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                  className="absolute bg-white p-3.5 rounded-2xl shadow-2xl w-[200px] border border-slate-100 flex flex-col gap-2.5"
                  style={{ top: '55%', left: '18%' }}
                >
                  <p className="text-xs text-[#1b1b1b] font-semibold leading-snug">
                    Check out all available products of our shop
                  </p>
                  <button className="w-full py-2 bg-[#695dd4] text-white text-xs font-bold rounded-lg hover:bg-[#5b51c1] transition-all">
                    Click here!
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
