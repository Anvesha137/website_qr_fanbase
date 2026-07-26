import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  // 5-step cycle: 0=reset/blank, 1=question, 2=+trigger, 3=+hello, 4=+product card
  const [step, setStep] = useState(1);
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fullText = "Consider them answered.";
    let currentText = "";
    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (currentIndex < fullText.length) {
          currentText += fullText[currentIndex];
          setTypedText(currentText);
          currentIndex++;
        } else {
          setIsTypingDone(true);
          clearInterval(typingInterval);
        }
      }, 70);
      return () => clearInterval(typingInterval);
    }, 600);

    return () => clearTimeout(startDelay);
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
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 w-full pt-32 lg:pt-36 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">

          {/* ── Left Column ── */}
          <div className="flex flex-col items-start text-left">

            {/* Top spacing */}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[56px] sm:text-[72px] lg:text-[86px] font-[800] leading-[0.95] tracking-tight text-white mb-6"
              id="hero-title"
            >
              Comments?<br />
              <span>{typedText}</span>
              {!isTypingDone && (
                <span className="inline-block w-[4px] h-[0.7em] bg-white ml-2 animate-pulse rounded-full align-middle"></span>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed max-w-lg mb-6"
              id="hero-subtitle"
            >
              Reply to <span className="font-instagram text-[1.35em] leading-none inline-block align-middle px-1 pb-1.5 font-normal text-white select-none italic">Instagram</span> comments instantly with DMs, keeping followers engaged and the algorithm on your side.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-start gap-2"
            >
              {/* Trusted Meta Tech Providers Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-2xl bg-white border border-white/20 shadow-lg px-5 py-2.5 text-slate-800 select-none">
                <img src="/meta.png" className="h-5 w-auto object-contain shrink-0" alt="Meta Logo" />
                <span className="text-base font-bold tracking-tight text-slate-800">
                  Trusted Meta Tech Providers
                </span>
              </div>
              
              {/* Official APIs Caption */}
              <p className="text-xs text-white/70 font-medium select-none pl-2 tracking-tight">
                *we use 100% official meta apis
              </p>
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
                  style={{ top: '8%', right: '8%' }}
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
                  style={{ top: '24%', right: '8%' }}
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
                  initial={{ opacity: 0, x: 25, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 25, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  className="absolute bg-white text-[#1b1b1b] px-4 py-2.5 rounded-full shadow-xl"
                  style={{ top: '34%', right: '14%' }}
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
                  style={{ top: '48%', right: '14%' }}
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
