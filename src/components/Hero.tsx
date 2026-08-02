import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  // 4-step cycle: 0=reset/blank, 1=comment, 2=creator reply, 3=DM received
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fullText = "Consider them answered.";
    let currentText = "";
    let currentIndex = 0;

    // Delay start until eclipse opening reveals the hero section (~4.2s)
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
      }, 55);
      return () => clearInterval(typingInterval);
    }, 4200);

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
              <span className="text-white drop-shadow-md">{typedText}</span>
              {!isTypingDone && (
                <span className="inline-block w-[5px] h-[0.7em] bg-white ml-2 animate-pulse rounded-full align-middle shadow-[0_0_12px_rgba(255,255,255,0.9)]"></span>
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
                *We use 100% official Meta APIs
              </p>
            </motion.div>
          </div>

          {/* ── Right Column: Instagram Comment & DM Mockups ── */}
          <div className="hidden lg:block relative h-[500px]">

            {/* Comments Mockup (Floating bubbles) */}
            <AnimatePresence mode="wait">
              {(step === 1 || step === 2) && (
                <motion.div
                  key="comments-container"
                  initial={{ opacity: 0, y: 45, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -45, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.35, 1] }}
                  className="absolute w-[260px] flex flex-col gap-3 select-none"
                  style={{ top: '22%', right: '38%' }}
                >
                  {/* Comment 1: User asking for link */}
                  <div className="flex items-start gap-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                      alt="Follower"
                      className="h-6 w-6 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="bg-[#1b272c]/95 border border-white/5 text-white text-[10px] px-3.5 py-2.5 rounded-2xl rounded-tl-none font-medium leading-normal shadow-xl">
                      <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="font-bold text-white/90">charlie_design</span>
                        <span className="text-[7.5px] text-white/40">2d</span>
                      </div>
                      <p className="text-white/90">Link please</p>
                    </div>
                  </div>

                  {/* Comment 2: Creator auto-reply */}
                  <AnimatePresence>
                    {step === 2 && (
                      <motion.div
                        key="creator-reply"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.35, 1] }}
                        className="flex items-start gap-2 pl-6 mt-1"
                      >
                        {/* Creator Avatar with gradient border */}
                        <div className="relative shrink-0 mt-0.5">
                          <div className="absolute inset-0 -m-[1.5px] rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600" style={{ animation: 'spin 12s linear infinite' }} />
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                            alt="Creator"
                            className="relative h-6 w-6 rounded-full border border-[#121212] object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="bg-[#1b272c]/95 border border-white/5 text-white text-[10px] px-3.5 py-2.5 rounded-2xl rounded-tl-none font-medium leading-normal shadow-xl">
                          <div className="flex items-baseline gap-1 flex-wrap mb-0.5">
                            <span className="font-bold text-white/90">quickrevert</span>
                            <span className="bg-white/15 px-1 rounded-[2px] text-[7px] font-extrabold text-white/90 leading-none">Author</span>
                            <span className="text-[7.5px] text-white/40">2d</span>
                          </div>
                          <p className="text-white/90">
                            <span className="text-sky-400">@charlie_design</span> heyy check your dms 👀✨
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* DM Chat Bubbles Mockup ("Hey! Thanks so much...") */}
            <AnimatePresence mode="wait">
              {step === 3 && (
                <motion.div
                  key="dm-message"
                  initial={{ opacity: 0, y: 45, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -45, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.35, 1] }}
                  className="absolute w-[260px] flex flex-col select-none"
                  style={{ top: '22%', right: '38%' }}
                >
                  {/* Light Grey Bubble (Creator Message) */}
                  <div className="bg-slate-100 text-slate-900 rounded-2xl rounded-br-none p-3.5 w-full max-w-[230px] flex flex-col shadow-xl self-end border border-slate-200/50">
                    <p className="text-[10px] font-semibold text-slate-900 leading-normal">
                      Hey! Thanks so much for your comment ❤️ Everything's been sent your way ✨
                    </p>
                    {/* Button inside the bubble */}
                    <button className="mt-2.5 w-full py-2 bg-white hover:bg-slate-50 border border-slate-200/80 active:scale-[0.98] text-slate-800 text-[9.5px] font-bold rounded-lg transition-all cursor-pointer text-center shadow-xs">
                      Link
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}
