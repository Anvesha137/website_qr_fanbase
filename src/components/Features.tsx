import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Check, Sparkles, Instagram, Heart, MessageCircle, Share2, Star, Shield, ArrowRight, UserPlus, Info } from 'lucide-react';

export default function Features() {
  // Stepper state for "Smarter over time"
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through steps
  React.useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 3), 3000);
    return () => clearInterval(t);
  }, []);

  const smartSteps = [
    {
      title: 'Learns who engages',
      description: 'Every comment, like, click and DM helps QuickRevert understand your audience.',
    },
    {
      title: 'Suggests who to follow up with',
      description: 'Spot comments and DM requests worth answering to.',
    },
    {
      title: 'Convert followers automatically',
      description: 'Detect when a follower shows intent and send a DM with the right message, link, or discount code.',
    }
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 2: Simple to start — GSAP-style stacking cards */}
      {/* ========================================================================= */}
      <SimpleToStart />

      <section className="py-24 bg-white" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">



        {/* ========================================================================= */}
        {/* SECTION 3: Smarter over time */}
        {/* ========================================================================= */}
        <div className="text-center mb-16" id="crm">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b]">
            Smarter over time
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 bg-[#f2f2f4] rounded-[36px] p-8 sm:p-16">
          
          {/* Left Side: Interactive Steps */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {smartSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer rounded-2xl p-5 transition-all duration-300 flex items-start space-x-4 ${isActive ? 'bg-white shadow-xl' : 'hover:bg-white/40'}`}
                >
                  <div className="shrink-0 mt-0.5 flex flex-col items-center gap-1">
                    <div className={`h-1 w-0.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#695dd4]' : 'bg-slate-200'}`} style={{ height: '24px', width: '2px' }} />
                  </div>
                  <div>
                    <h3 className={`font-display text-base font-bold mb-0.5 transition-colors ${isActive ? 'text-[#1b1b1b]' : 'text-slate-400'}`}>{step.title}</h3>
                    <p className={`text-xs font-medium leading-relaxed transition-colors ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Animated visual per step */}
          <div className="lg:col-span-7 flex justify-center">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-[380px] border border-slate-100 flex flex-col space-y-4 text-left"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Follower Profile</span>
                    <span className="text-xs text-slate-400">✖</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-1.5 py-2">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#695dd4]/20 shadow-md">
                      <img src="https://framerusercontent.com/images/cNk6GgDSCX7JmN8XcaypNOrPUs.png" alt="MigasXBG" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">MigasXBG</h4>
                    <span className="text-xs text-slate-400">@migas2k8</span>
                  </div>
                  <div className="bg-[#f2f2f4]/60 rounded-xl p-3 flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest activity</span>
                    <span className="text-[10px] font-bold text-slate-700">Today</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Connected Identities</span>
                    <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3.5 w-3.5 text-pink-500" /></div>
                        <div><p className="text-[10px] font-bold text-slate-800">MigasXBG</p><p className="text-[9px] text-slate-400">@migasxbg</p></div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-[#f2f2f4] px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-500">2.3</span>
                        <span className="bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded text-[9px] font-bold">Supporter</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center"><span className="text-[10px] font-bold">𝕏</span></div>
                        <div><p className="text-[10px] font-bold text-slate-800">MigasXBG</p><p className="text-[9px] text-slate-400">@migas2k8</p></div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-[#f2f2f4] px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-500">0.5</span>
                        <span className="bg-[#f2f2f4] text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-bold">Newcomer</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Activity History</span>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold">𝕏</span><span className="text-xs font-semibold text-slate-700">Like</span></div>
                      <span className="text-[10px] text-slate-400">1h ago</span>
                    </div>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2"><div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3 w-3 text-pink-400" /></div><span className="text-xs font-semibold text-slate-700">Commented</span></div>
                      <span className="text-[10px] text-slate-400">2h ago</span>
                    </div>
                    <div className="bg-[#695dd4]/8 border border-[#695dd4]/15 rounded-xl p-2.5 text-right">
                      <p className="text-[10px] font-semibold text-slate-600 text-right">We're dropping something new next week, stay tuned!!</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">✦ Auto-reply</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-[380px] border border-slate-100 flex flex-col space-y-4 text-left"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Follower Profile</span>
                    <span className="text-xs text-slate-400">✖</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-1.5 py-2">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#695dd4]/20 shadow-md">
                      <img src="https://framerusercontent.com/images/cNk6GgDSCX7JmN8XcaypNOrPUs.png" alt="MigasXBG" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">MigasXBG</h4>
                    <span className="text-xs text-slate-400">@migas2k8</span>
                  </div>
                  <div className="bg-[#f2f2f4]/60 rounded-xl p-3 flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest activity</span>
                    <span className="text-[10px] font-bold text-slate-700">Today</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Connected Identities</span>
                    <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3.5 w-3.5 text-pink-500" /></div>
                        <div><p className="text-[10px] font-bold text-slate-800">MigasXBG</p><p className="text-[9px] text-slate-400">@migasxbg</p></div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-[#f2f2f4] px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-500">9.8</span>
                        <span className="bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded text-[9px] font-bold">Legend</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl flex items-center justify-between border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center"><span className="text-[10px] font-bold">𝕏</span></div>
                        <div><p className="text-[10px] font-bold text-slate-800">MigasXBG</p><p className="text-[9px] text-slate-400">@migas2k8</p></div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="bg-[#f2f2f4] px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-500">0.5</span>
                        <span className="bg-[#f2f2f4] text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-bold">Newcomer</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Activity History</span>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3 w-3 text-pink-400" /></div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Commented</p>
                          <p className="text-[9px] text-slate-400">"This merch looks fire, I want it 🔥"</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#695dd4]/10 rounded-xl px-3 py-2 flex items-center gap-2">
                      <span className="text-sm">🎯</span>
                      <span className="text-[10px] font-bold text-[#695dd4]">Buying intent detected</span>
                    </div>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold">𝕏</span><span className="text-xs font-semibold text-slate-700">Like</span></div>
                      <span className="text-[10px] text-slate-400">1h ago</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-[380px] border border-slate-100 flex flex-col space-y-4 text-left"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">Follower Profile</span>
                    <span className="text-xs text-slate-400">✖</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-1.5 py-2">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#695dd4]/20 shadow-md">
                      <img src="https://framerusercontent.com/images/cNk6GgDSCX7JmN8XcaypNOrPUs.png" alt="MigasXBG" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-slate-900">MigasXBG</h4>
                    <span className="text-xs text-slate-400">@migas2k8</span>
                  </div>
                  <div className="bg-[#f2f2f4]/60 rounded-xl p-3 flex justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latest activity</span>
                    <span className="text-[10px] font-bold text-slate-700">Today</span>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Activity History</span>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3 w-3 text-pink-400" /></div>
                        <div>
                          <p className="text-xs font-semibold text-slate-700">Commented</p>
                          <p className="text-[9px] text-slate-400">"When's the next merch drop?"</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#f2f2f4] rounded-xl px-3 py-2">
                      <p className="text-[10px] font-semibold text-[#695dd4]">You should reply to this comment</p>
                    </div>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold">𝕏</span><span className="text-xs font-semibold text-slate-700">Like</span></div>
                      <span className="text-[10px] text-slate-400">1h ago</span>
                    </div>
                    <div className="flex justify-between items-center px-1 py-1">
                      <div className="flex items-center gap-2"><div className="h-6 w-6 rounded-lg bg-pink-50 flex items-center justify-center"><Instagram className="h-3 w-3 text-pink-400" /></div><span className="text-xs font-semibold text-slate-700">Commented</span></div>
                      <span className="text-[10px] text-slate-400">3h ago</span>
                    </div>
                  </div>
                  <div className="bg-[#695dd4] rounded-2xl p-3 text-white text-right">
                    <p className="text-xs font-semibold">Here's a one-time 50% discount to get what you like</p>
                    <button className="mt-2 bg-white text-[#695dd4] text-[10px] font-bold px-3 py-1 rounded-lg">Shop Now</button>
                    <p className="text-[9px] text-white/60 mt-1">✦ DM sent</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/* GSAP-style Stacking Cards: "Simple to start"   */
/* ─────────────────────────────────────────────── */
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

  /* ── Scroll phases ──
     0.00–0.15 → Typewriter heading
     0.12–0.30 → Typewriter subtitle
     0.35–0.45 → Scatter letters (letters fade out to 0 HERE)
     0.46–0.58 → Card 1 slams in (-7deg) + Screen Vibration 1
     0.56–0.68 → Card 2 slams in (-2deg) + Screen Vibration 2
     0.66–0.78 → Card 3 slams in (+4deg) + Screen Vibration 3
  ── */
  const headingCharCount = useTransform(scrollYProgress, [0, 0.15], [0, headingText.length]);
  const subtitleCharCount = useTransform(scrollYProgress, [0.12, 0.30], [0, subtitleText.length]);
  const scatterProgress = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  // Letters fade away COMPLETELY by 0.45 (before card 1 even lands!)
  const lettersOpacity = useTransform(scrollYProgress, [0.35, 0.42, 0.45], [1, 1, 0]);

  // Screen Shake Vibration Effect on every Card Impact
  const shakeX = useTransform(scrollYProgress,
    [0.46, 0.48, 0.50, 0.52, 0.54, 0.56, 0.58, 0.60, 0.62, 0.64, 0.66, 0.68, 0.70, 0.72, 0.74, 0.76],
    [0,   -14,   14,   -8,    8,    0,   -16,   16,  -10,   10,    0,   -18,   18,  -12,    0, 0]
  );
  const shakeY = useTransform(scrollYProgress,
    [0.46, 0.48, 0.50, 0.52, 0.54, 0.56, 0.58, 0.60, 0.62, 0.64, 0.66, 0.68, 0.70, 0.72, 0.74, 0.76],
    [0,     9,   -9,    6,   -6,    0,    11,  -11,    7,   -7,    0,    13,  -13,    8,    0, 0]
  );

  // Card 1 Pop & Rigid Shake (0.46 -> 0.58)
  const card1Scale = useTransform(scrollYProgress, [0.46, 0.52, 0.55, 0.58], [0, 1.1, 0.94, 1]);
  const card1Opacity = useTransform(scrollYProgress, [0.46, 0.49], [0, 1]);
  const card1RotateVal = useTransform(scrollYProgress, [0.46, 0.51, 0.54, 0.56, 0.58], [-20, -3, -10, -5, -7]);

  // Card 2 Pop & Rigid Shake (0.56 -> 0.68)
  const card2Scale = useTransform(scrollYProgress, [0.56, 0.62, 0.65, 0.68], [0, 1.12, 0.93, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0.56, 0.59], [0, 1]);
  const card2RotateVal = useTransform(scrollYProgress, [0.56, 0.61, 0.64, 0.66, 0.68], [16, -6, 2, -4, -2]);

  // Card 3 Pop & Rigid Shake (0.66 -> 0.78)
  const card3Scale = useTransform(scrollYProgress, [0.66, 0.72, 0.75, 0.78], [0, 1.14, 0.92, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0.66, 0.69], [0, 1]);
  const card3RotateVal = useTransform(scrollYProgress, [0.66, 0.71, 0.74, 0.76, 0.78], [-14, 10, 2, 7, 4]);

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
            <span className="text-[#695dd4] font-black">✦ AI</span>
          </div>
          <p className="text-[10px] font-semibold text-black leading-tight">
            Hey <span className="text-[#695dd4] font-bold">{"{{username}}"}</span>, thanks for engaging! Here’s the invite link:
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

          {/* ── Scattered Letters Layer (fades away completely by 0.45) ── */}
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

          {/* ── Cards Layer (Tightly overlapping with Screen Shake Vibration Effect) ── */}
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

/* ── Single character: typewriter in → scatter out ── */
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

