import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Check, Sparkles, Instagram, Heart, MessageCircle, Share2, Star, Shield, ArrowRight, UserPlus, Info } from 'lucide-react';

export default function Features() {
  return (
    <>
      <SimpleToStart />
      <SmarterOverTimeSection />
    </>
  );
}

// Step 0 messages
const STEP0_MSGS = [
  { id: 0, side: 'bot', text: "Hey! Glad you're here... Tap below and I'll send you a message shortly 👀", hasButton: true, buttonText: 'Send Reading', powered: true },
  { id: 1, side: 'user', text: 'Send Reading' },
  { id: 2, side: 'bot', text: "Oops! Looks like you haven't followed me yet 👀...", hasButtons: true, buttons: ['Visit Profile', "I've Followed! ✅"], powered: true },
  { id: 3, side: 'user', text: "I've Followed! ✅" },
  { id: 4, side: 'bot', text: "If you are a mulank 1, then there is a likely energy where you might not like something and it might feel very unsatisfying, so there is some shift or walking away from the situation.\n\nIf you are a Mulank 7, the next three months is going to be a very busy month for you..." },
];

// Step 1 messages
const STEP1_MSGS = [
  { id: 0, side: 'bot', text: "👋 Hey! Thanks for reaching out. What's your first name? 😊" },
  { id: 1, side: 'user', text: 'Quickrevert' },
  { id: 2, side: 'bot', text: "Awesome, Quickrevert! 😊 What email should we use?", hasButton: true, buttonText: '✏️ Change Name', powered: true },
  { id: 3, side: 'user', text: 'Connect@quickrevert.tech' },
  { id: 4, side: 'bot', text: "Got it! ✅ We'll use that email. What's your phone number? 📱", hasButton: true, buttonText: '✏️ Change Email', powered: true },
  { id: 5, side: 'user', text: '7619479099' },
  { id: 6, side: 'bot', text: "🎉 We've got you, Quickrevert! Your details have been saved and our team will reach out soon. Thank you! 🙏" },
];

// Step 2 — MyStore (non-chat UI, we reveal cards sequentially)

function useSequentialReveal(count: number, delayBetween = 600, active = true) {
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    setVisibleCount(0);
    if (!active) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * delayBetween + 300));
    }
    return () => timers.forEach(clearTimeout);
  }, [active, count, delayBetween]);
  return visibleCount;
}

function ChatBubble({ msg, visible, index }: { msg: typeof STEP0_MSGS[0]; visible: boolean; index: number }) {
  const isUser = msg.side === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.94 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {isUser ? (
        <div className="bg-[#9333ea] text-white px-3.5 py-2 rounded-2xl rounded-tr-none max-w-[70%] text-[11px] font-semibold">
          {msg.text}
        </div>
      ) : (
        <div className="bg-[#262626] p-3 rounded-2xl rounded-tl-none max-w-[85%] space-y-1.5">
          <p className="text-white/90 text-[11px] leading-relaxed whitespace-pre-line">{msg.text}</p>
          {(msg as any).powered && <p className="text-[8px] text-white/35 font-medium">Powered by QuickRevert</p>}
          {(msg as any).hasButton && (
            <div className="bg-white/10 py-1.5 px-3 rounded-xl text-center font-bold text-white text-[10px]">
              {(msg as any).buttonText}
            </div>
          )}
          {(msg as any).hasButtons && (
            <div className="space-y-1">
              {(msg as any).buttons.map((b: string) => (
                <div key={b} className="bg-white/10 py-1.5 px-3 rounded-xl text-center font-bold text-white text-[10px]">{b}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function SmarterOverTimeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= 0.28) {
      setActiveStep(0);
    } else if (latest <= 0.55) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const stepScrollRatio = [0, 0.45, 0.82];
      const targetScroll = sectionTop + sectionHeight * stepScrollRatio[idx];
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  // Sequential reveal for each step — slower delays so first msg is readable
  const step0Visible = useSequentialReveal(STEP0_MSGS.length, 1400, activeStep === 0);
  const step1Visible = useSequentialReveal(STEP1_MSGS.length, 1200, activeStep === 1);
  // step 2 cards
  const step2Visible = useSequentialReveal(4, 1000, activeStep === 2);

  const phoneScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (phoneScrollRef.current) {
      phoneScrollRef.current.scrollTop = 0;
    }
  }, [activeStep]);

  // Auto-scroll phone as messages appear — only after 3rd message so first msg stays visible
  useEffect(() => {
    const el = phoneScrollRef.current;
    if (!el) return;
    // Only scroll down once there are enough messages to fill the view
    const shouldScroll = (activeStep === 0 && step0Visible > 2) ||
      (activeStep === 1 && step1Visible > 2) ||
      (activeStep === 2 && step2Visible > 2);
    if (shouldScroll) el.scrollTop = el.scrollHeight;
  }, [step0Visible, step1Visible, step2Visible, activeStep]);

  const smartSteps = [
    { id: 0, title: 'Ask to Follow Growth Check', description: 'Automatically check if a commenter follows your account before delivering links, boosting organic growth.', badge: '1/3' },
    { id: 1, title: 'Automated DM Lead Capture', description: 'Capture lead contacts, email handles, and intent data seamlessly inside instant DM response flows.', badge: '2/3' },
    { id: 2, title: 'Creator Invoices & MyStore', description: 'Send professional brand collab invoices and direct followers to your custom MyStore Link-in-Bio hub.', badge: '3/3' },
  ];

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-br from-[#2563eb] via-[#4f46e5] to-[#312e81] text-white" id="features">
      {/* CSS Grid Pattern Lines across full section width */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff18_1px,transparent_1px),linear-gradient(to_bottom,#ffffff18_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Glowing Ambient Light Orbs — inset so they don't cause horizontal overflow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Sticky Container */}
      <div className="relative h-[450vh] z-10" id="crm">
        <div className="sticky top-16 flex flex-col justify-center h-[calc(100vh-4rem)] py-4">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">

            {/* Left: Steps */}
            <div className="lg:col-span-5 flex flex-col space-y-3.5">
              {/* Progress Dashes */}
              <div className="flex items-center space-x-2 mb-1 select-none pl-1">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeStep === idx ? 'w-10 bg-white' : 'w-3.5 bg-white/30 hover:bg-white/50'}`}
                  />
                ))}
              </div>

              {smartSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 flex items-start space-x-4 border ${isActive ? 'bg-white text-slate-900 shadow-2xl border-white ring-4 ring-white/20 scale-[1.02]' : 'bg-white/15 text-white/90 border-white/10 hover:bg-white/25 backdrop-blur-md'}`}
                  >
                    <div className="shrink-0 mt-0.5 flex flex-col items-center gap-1">
                      <div className={`h-8 w-1 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#695dd4]' : 'bg-white/40'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-display text-base font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-white'}`}>{step.title}</h3>
                        <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full ${isActive ? 'bg-[#695dd4] text-white' : 'bg-white/20 text-white'}`}>{step.badge}</span>
                      </div>
                      <p className={`text-xs font-medium leading-relaxed mt-1 transition-colors ${isActive ? 'text-slate-600' : 'text-white/80'}`}>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Big Phone */}
            <div className="lg:col-span-7 flex justify-center items-end pb-10">
              <div className="relative w-[320px] sm:w-[360px] h-[540px] sm:h-[590px] rounded-[44px] bg-slate-950 border-[9px] border-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col select-none">

                {/* Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-[14px] bg-slate-900 rounded-full z-30 flex items-center justify-center pointer-events-none">
                  <div className="h-2 w-2 rounded-full bg-slate-700 mr-2" />
                  <div className="h-1.5 w-10 rounded-full bg-slate-700" />
                </div>

                <AnimatePresence mode="wait">
                  {/* â”€â”€ STEP 0 â”€â”€ */}
                  {/* ——— STEP 0 ——— */}
                  {activeStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex flex-col bg-[#121212] text-white font-sans text-xs"
                    >
                      {/* DM Header */}
                      <div className="flex items-center justify-between px-3 pt-8 pb-2 border-b border-white/10 shrink-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-white/70 text-sm">←</span>
                          <img src="/Logo_optimized.png" className="h-6 w-6 object-contain shrink-0" alt="QuickRevert" />
                          <div>
                            <span className="font-bold text-white text-xs block">quickrevert.tech</span>
                            <p className="text-[8px] text-white/50">Business chat</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70 text-xs">📹 📞</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold border-b border-white/10 pb-2 shrink-0 px-3 pt-2">
                        <div className="bg-white/10 py-1.5 rounded-lg">Inquire</div>
                        <div className="bg-white/10 py-1.5 rounded-lg">View Profile</div>
                      </div>
                      <p className="text-[9px] text-indigo-300/90 text-center font-medium pt-2 px-3 shrink-0">quickrevert.tech messaged you about a comment. <span className="underline">See Post</span></p>
                      <div className="text-[9px] text-white/40 text-center uppercase tracking-wider font-semibold pt-1 shrink-0">16 JUL, 1:54 PM</div>

                      {/* Messages */}
                      <div ref={phoneScrollRef} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] px-3 py-3 flex flex-col gap-3">
                        {STEP0_MSGS.map((msg, i) => (
                          <ChatBubble key={msg.id} msg={msg} visible={step0Visible > i} index={i} />
                        ))}
                        {/* Typing indicator */}
                        {step0Visible < STEP0_MSGS.length && step0Visible > 0 && step0Visible % 2 === 0 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 px-3 py-2 bg-[#262626] rounded-2xl rounded-tl-none w-16">
                            {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* â”€â”€ STEP 1 â”€â”€ */}
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex flex-col bg-[#121212] text-white font-sans text-xs"
                    >
                      <div className="flex items-center justify-between px-3 pt-8 pb-2 border-b border-white/10 shrink-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-white/70 text-sm">←</span>
                          <img src="/Logo_optimized.png" className="h-6 w-6 object-contain shrink-0" alt="QuickRevert" />
                          <div>
                            <span className="font-bold text-white text-xs block">quickrevert.tech</span>
                            <p className="text-[8px] text-white/50">Business chat</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70 text-xs">📹 📞</div>
                      </div>
                      <p className="text-[9px] text-indigo-300/90 text-center font-medium pt-2 px-3 shrink-0">quickrevert.tech messaged you about a comment. <span className="underline">See post</span></p>

                      <div ref={activeStep === 1 ? phoneScrollRef : undefined} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] px-3 py-3 flex flex-col gap-3">
                        {STEP1_MSGS.map((msg, i) => (
                          <ChatBubble key={msg.id} msg={msg} visible={step1Visible > i} index={i} />
                        ))}
                        {step1Visible < STEP1_MSGS.length && step1Visible > 0 && step1Visible % 2 === 0 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 px-3 py-2 bg-[#262626] rounded-2xl rounded-tl-none w-16">
                            {[0, 1, 2].map(i => <span key={i} className="h-1.5 w-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* â”€â”€ STEP 2 â”€â”€ */}
                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex flex-col bg-[#fafafa] text-slate-800 font-sans text-xs"
                    >
                      <div className="flex items-center justify-between px-3 pt-8 pb-2.5 border-b border-slate-200 shrink-0">
                        <span className="font-bold text-slate-900 text-xs">Shahini</span>
                        <div className="flex space-x-2 text-[10px] font-semibold text-slate-500">
                          <span>Shop</span><span>Bookings</span>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] px-3 py-3 flex flex-col gap-3">
                        {/* Profile Card */}
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={step2Visible > 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.3 }}
                          className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-1.5 shrink-0">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 p-[2px]">
                            <div className="h-full w-full bg-[#5b52e0] rounded-full flex items-center justify-center text-white font-extrabold text-sm">SH</div>
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-xs">Shahini</h4>
                            <p className="text-[8.5px] text-pink-600 font-bold">@shahini_mehendi_artist</p>
                          </div>
                          <p className="text-[8.5px] text-slate-500 leading-tight">Organic Henna Cones Fresh | Chemical-Free | Dark Stain</p>
                          <div className="flex items-center text-[7.5px] text-slate-400 font-semibold gap-0.5"><span>📍</span> YELAHANKA, BENGALURU</div>
                          <div className="grid grid-cols-2 gap-1 w-full pt-0.5">
                            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-1 rounded-xl text-[8.5px] text-center">Follow</div>
                            <div className="bg-slate-50 border border-slate-200 text-slate-800 font-bold py-1 rounded-xl text-[8.5px] text-center">Message</div>
                          </div>
                        </motion.div>

                        {/* Booking Banner */}
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={step2Visible > 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.3 }}
                          className="bg-gradient-to-r from-[#9333ea] to-[#695dd4] text-white p-3 rounded-2xl shadow-md space-y-0.5 shrink-0">
                          <span className="text-[7px] font-black uppercase tracking-widest text-indigo-200">EXCLUSIVE ACCESS</span>
                          <h5 className="font-bold text-[11px]">Booking</h5>
                          <p className="text-[8.5px] text-white/80">Napkin and stool</p>
                          <div className="mt-1.5 inline-block bg-white text-[#695dd4] font-extrabold text-[8.5px] px-2.5 py-0.5 rounded-full cursor-pointer">Check Availability</div>
                        </motion.div>

                        {/* Products */}
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={step2Visible > 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.3 }}
                          className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-[9.5px] font-bold text-slate-800">Featured Products</span>
                            <span className="text-[7.5px] text-slate-400">Search products...</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[{ name: 'Bridal mehendi cones', desc: 'Freshly prepared Organic...', price: '₹50' }, { name: 'Essential oils for mehendi', desc: 'Essential oils for making...', price: '₹100' }].map(p => (
                              <div key={p.name} className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                                <div className="h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-1">
                                  <img src="/Logo_optimized.png" className="h-5 w-5 object-contain" alt="Product" />
                                </div>
                                <p className="font-bold text-slate-900 text-[8.5px] line-clamp-1">{p.name}</p>
                                <p className="text-[7.5px] text-slate-400 line-clamp-1">{p.desc}</p>
                                <p className="font-extrabold text-[#695dd4] text-[9px] mt-0.5">{p.price}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Brand Collabs */}
                        <motion.div initial={{ opacity: 0, y: 14 }} animate={step2Visible > 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }} transition={{ duration: 0.3 }}
                          className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm shrink-0">
                          <div className="flex justify-between items-center mb-0.5">
                            <span className="text-[8.5px] font-bold text-slate-800">Brand Collaborations</span>
                            <span className="text-[7px] text-slate-400">1 partners</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-50 p-1 rounded-lg border border-slate-100">
                            <div className="flex items-center gap-1">
                              <div className="h-5 w-5 rounded bg-pink-100 text-pink-600 font-bold text-[7.5px] flex items-center justify-center">GE</div>
                              <div>
                                <p className="text-[8.5px] font-bold text-slate-800">Geetanjali mehendi</p>
                                <span className="bg-pink-100 text-pink-600 text-[6.5px] font-extrabold px-1 rounded">MEHENDI</span>
                              </div>
                            </div>
                            <span className="text-[7.5px] text-slate-400 font-medium">June 2025</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
/* GSAP-style Stacking Cards: "Simple to start"   */
/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function StackingCard({
  index,
  children,
}: {
  index: number;
  total: number;
  key: number;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <div ref={cardRef} className="h-[45vh]" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity, top: `${index * 28}px` }}
        className="sticky top-20 origin-top will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

function SimpleToStart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headingText = 'Simple to start';
  const subtitleText = 'Sign up for free, set up an automation and start sending DMs to followers automatically.';

  // Combine both texts for scatter
  const allChars = (headingText + subtitleText).split('');
  // Pre-compute deterministic scatter destinations for each character
  const scatterData = React.useMemo(() => {
    return allChars.map((_, i) => ({
      x: ((i * 137 + 43) % 200 - 100) * 8, // -800 to +800
      y: ((i * 89 + 17) % 200 - 100) * 5,  // -500 to +500
      rotate: ((i * 53 + 29) % 360) - 180,  // -180 to +180
      scale: 0.6 + ((i * 31) % 40) / 40 * 2, // 0.6 to 2.6
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* â”€â”€ Scroll phases â”€â”€
     0.00â€“0.15 â†’ Typewriter heading
     0.10â€“0.25 â†’ Typewriter subtitle
     0.25â€“0.38 â†’ Scatter letters
     0.32â€“0.48 â†’ Card 1 slams in (-7deg)
     0.46â€“0.62 â†’ Card 2 slams in (-2deg)
     0.60â€“0.76 â†’ Card 3 slams in (+4deg)
  â”€â”€ */
  const headingCharCount = useTransform(scrollYProgress, [0, 0.15], [0, headingText.length]);
  const subtitleCharCount = useTransform(scrollYProgress, [0.10, 0.25], [0, subtitleText.length]);
  const scatterProgress = useTransform(scrollYProgress, [0.25, 0.38], [0, 1]);

  // Letters fade away smoothly as Card 1 begins entering
  const lettersOpacity = useTransform(scrollYProgress, [0.25, 0.35, 0.38], [1, 0.8, 0]);

  // Screen Shake Vibration Effect on every Card Impact
  const shakeX = useTransform(scrollYProgress,
    [0.32, 0.35, 0.38, 0.41, 0.44, 0.46, 0.49, 0.52, 0.55, 0.58, 0.60, 0.63, 0.66, 0.69, 0.72, 0.76],
    [0, -14, 14, -8, 8, 0, -16, 16, -10, 10, 0, -18, 18, -12, 0, 0]
  );
  const shakeY = useTransform(scrollYProgress,
    [0.32, 0.35, 0.38, 0.41, 0.44, 0.46, 0.49, 0.52, 0.55, 0.58, 0.60, 0.63, 0.66, 0.69, 0.72, 0.76],
    [0, 9, -9, 6, -6, 0, 11, -11, 7, -7, 0, 13, -13, 8, 0, 0]
  );

  // Card 1 Pop & Rigid Shake (0.32 -> 0.48)
  const card1Scale = useTransform(scrollYProgress, [0.32, 0.38, 0.43, 0.48], [0, 1.1, 0.94, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.32, 0.36], [0, 1]);
  const card1RotateVal = useTransform(scrollYProgress, [0.32, 0.37, 0.41, 0.44, 0.48], [-20, -3, -10, -5, -7]);

  // Card 2 Pop & Rigid Shake (0.46 -> 0.62)
  const card2Scale = useTransform(scrollYProgress, [0.46, 0.52, 0.57, 0.62], [0, 1.12, 0.93, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.46, 0.49], [0, 1]);
  const card2RotateVal = useTransform(scrollYProgress, [0.46, 0.51, 0.54, 0.58, 0.62], [16, -6, 2, -4, -2]);

  // Card 3 Pop & Rigid Shake (0.60 -> 0.76)
  const card3Scale = useTransform(scrollYProgress, [0.60, 0.66, 0.71, 0.76], [0, 1.14, 0.92, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.60, 0.63], [0, 1]);
  const card3RotateVal = useTransform(scrollYProgress, [0.60, 0.65, 0.69, 0.73, 0.76], [-14, 10, 2, 7, 4]);

  const steps = [
    {
      id: 'step-1',
      num: '1',
      arcTitle: 'PICK A TRIGGER',
      stepTitle: 'Pick a trigger',
      description: 'Choose a keyword or a specific post',
      bg: 'bg-[#6be3a3]',
      numColor: 'text-[#39855b]/25',
      rotateVal: card1RotateVal,
      zIndex: 'z-10',
      scale: card1Scale,
      opacity: card1Opacity,
      mockup: (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-black/10 flex flex-col space-y-1.5 w-full text-left text-[11px]">
          <div className="flex items-center justify-between bg-black/5 p-1.5 rounded-lg border border-black/5 font-semibold text-black">
            <span>Comment with a keyword</span>
            <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
          </div>
          <div className="p-1.5 text-black/60 font-medium">
            Reply to a comment
          </div>
        </div>
      ),
    },
    {
      id: 'step-2',
      num: '2',
      arcTitle: 'CHOOSE WHAT TO SEND',
      stepTitle: 'Choose what to send',
      description: 'Includes images or tracked links',
      bg: 'bg-[#d2fb44]',
      numColor: 'text-[#81a11e]/25',
      rotateVal: card2RotateVal,
      zIndex: 'z-20',
      scale: card2Scale,
      opacity: card2Opacity,
      mockup: (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow-md border border-black/10 flex flex-col space-y-2 w-full text-left">
          <div className="flex justify-between items-center text-[9px] text-black/50 font-extrabold uppercase tracking-wider">
            <span>Direct Message</span>
            <span className="text-[#695dd4] font-black">âœ¦ AI</span>
          </div>
          <p className="text-[10px] font-semibold text-black leading-tight">
            Hey <span className="text-[#695dd4] font-bold">{"{{username}}"}</span>, thanks for engaging! Hereâ€™s the invite link:
          </p>
          <div className="flex space-x-1.5 bg-black/5 p-1 rounded-lg text-[8px] font-bold text-black/60">
            <span className="bg-white text-black px-1.5 py-0.5 rounded shadow-xs">Manual</span>
            <span className="px-1.5 py-0.5">Let AI decide</span>
          </div>
        </div>
      ),
    },
    {
      id: 'step-3',
      num: '3',
      arcTitle: 'LET IT RUN',
      stepTitle: 'Let it run',
      description: 'On autopilot or you approve',
      bg: 'bg-[#9be5ff]',
      numColor: 'text-[#488ea8]/25',
      rotateVal: card3RotateVal,
      zIndex: 'z-30',
      scale: card3Scale,
      opacity: card3Opacity,
      mockup: (
        <div className="flex flex-col items-center space-y-2 w-full">
          <div className="bg-black/15 backdrop-blur-sm text-black rounded-full px-3 py-1 text-[10px] font-black tracking-wide uppercase flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
            Automation Live
          </div>
          {/* Stats Badges: 200K, 7.1K, 32K */}
          <div className="bg-white/90 text-black rounded-xl py-1.5 px-3 flex items-center justify-between w-full shadow-sm text-[10px] font-extrabold">
            <span className="flex items-center gap-0.5"><Heart className="h-3 w-3 fill-red-500 text-red-500" /> 200K</span>
            <span className="flex items-center gap-0.5"><MessageCircle className="h-3 w-3 text-blue-600 fill-blue-600" /> 7.1K</span>
            <span className="flex items-center gap-0.5"><Share2 className="h-3 w-3 text-purple-600" /> 32K</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="how-it-works">
      <section ref={sectionRef} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen bg-[#0e0e0e] flex items-center justify-center overflow-hidden">

          {/* â”€â”€ Scattered Letters Layer (fades away completely by 0.45) â”€â”€ */}
          <motion.div
            style={{ opacity: lettersOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center px-4 sm:px-8 max-w-4xl mx-auto relative">
              {/* Heading chars */}
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
                {headingText.split('').map((char, i) => (
                  <ScatterChar
                    key={`h-${i}`}
                    char={char}
                    index={i}
                    totalBefore={0}
                    totalChars={headingText.length}
                    charCountMV={headingCharCount}
                    scatterProgress={scatterProgress}
                    scatterData={scatterData[i]}
                  />
                ))}
              </h2>

              {/* Subtitle chars */}
              <p className="font-sans text-lg sm:text-xl lg:text-2xl font-medium text-white/80 leading-relaxed max-w-2xl mx-auto">
                {subtitleText.split('').map((char, i) => (
                  <ScatterChar
                    key={`s-${i}`}
                    char={char}
                    index={i}
                    totalBefore={headingText.length}
                    totalChars={subtitleText.length}
                    charCountMV={subtitleCharCount}
                    scatterProgress={scatterProgress}
                    scatterData={scatterData[headingText.length + i]}
                  />
                ))}
              </p>
            </div>
          </motion.div>

          {/* â”€â”€ Cards Layer (Tightly overlapping with Screen Shake Vibration Effect) â”€â”€ */}
          <motion.div
            style={{ x: shakeX, y: shakeY }}
            className="relative z-10 flex items-center justify-center -space-x-14 sm:-space-x-20 lg:-space-x-24 px-4 max-w-6xl w-full will-change-transform"
          >
            {steps.map((step) => (
              <motion.div
                key={step.id}
                style={{
                  scale: step.scale,
                  opacity: step.opacity,
                  rotate: step.rotateVal,
                }}
                className={`w-[270px] sm:w-[320px] lg:w-[350px] h-[410px] sm:h-[470px] ${step.bg} ${step.zIndex} rounded-[32px] p-6 sm:p-7 flex flex-col justify-between text-center text-black shadow-2xl origin-bottom will-change-transform border border-black/10 hover:z-40 transition-transform duration-100`}
              >
                {/* Curved SVG Arc Header */}
                <div className="pt-1">
                  <ArcTitle text={step.arcTitle} id={step.id} />
                </div>

                {/* Card Feature Mockup Widget */}
                <div className="my-1">
                  {step.mockup}
                </div>

                {/* Giant Center Number */}
                <div className="my-auto relative py-1">
                  <span className={`font-display text-7xl sm:text-8xl font-black ${step.numColor} select-none leading-none block`}>
                    {step.num}
                  </span>
                </div>

                {/* Bottom Step Title & Description Text */}
                <div className="pb-1">
                  <h4 className="font-display text-lg sm:text-xl font-extrabold text-black mb-0.5">
                    {step.stepTitle}
                  </h4>
                  <p className="text-black/80 font-sans text-xs font-semibold leading-snug max-w-[240px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}

/* Curved text path component matching image 2 */
function ArcTitle({ text, id }: { text: string; id: string }) {
  const pathId = `curve-path-${id}`;
  return (
    <svg viewBox="0 0 300 70" className="w-full h-16 sm:h-20 overflow-visible">
      <path id={pathId} d="M 10,65 A 250,250 0 0,1 290,65" fill="none" />
      <text fill="black" className="font-display font-black text-2xl sm:text-[27px] uppercase tracking-tighter">
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/* â”€â”€ Single character: typewriter in â†’ scatter out â”€â”€ */
function ScatterChar({
  char,
  index,
  totalChars,
  charCountMV,
  scatterProgress,
  scatterData,
}: {
  key: string;
  char: string;
  index: number;
  totalBefore: number;
  totalChars: number;
  charCountMV: any;
  scatterProgress: any;
  scatterData: { x: number; y: number; rotate: number; scale: number };
}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const unsub = charCountMV.on('change', (v: number) => {
      setVisible(Math.round(v) > index);
    });
    return unsub;
  }, [charCountMV, index]);

  // Scatter transforms & fade out opacity during scatter
  const x = useTransform(scatterProgress, [0, 1], [0, scatterData.x]);
  const y = useTransform(scatterProgress, [0, 1], [0, scatterData.y]);
  const rotate = useTransform(scatterProgress, [0, 1], [0, scatterData.rotate]);
  const scale = useTransform(scatterProgress, [0, 1], [1, scatterData.scale]);
  const opacity = useTransform(scatterProgress, [0, 0.6, 1], [visible ? 1 : 0, 0.7, 0]);

  if (char === ' ') {
    return <span className={visible ? '' : 'invisible'}>&nbsp;</span>;
  }

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity }}
      className="inline-block will-change-transform transition-opacity duration-75"
    >
      {char}
    </motion.span>
  );
}

