import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    <section className="py-24 bg-white" id="features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ========================================================================= */}
        {/* SECTION 2: Simple to start */}
        {/* ========================================================================= */}
        <div className="text-center mb-16" id="how-it-works">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-4">
            Simple to start
          </h2>
          <p className="text-slate-500 font-sans text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Sign up for free, set up an automation and start sending DMs to followers automatically.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          
          {/* Card 1 */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Mock Selector */}
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col space-y-2 max-w-[280px] mx-auto mt-4 w-full">
              <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-800">Comment with a keyword</span>
                <Check className="h-4 w-4 text-emerald-500 stroke-[3]" />
              </div>
              <div className="p-2.5 rounded-xl text-slate-400 text-xs font-semibold">
                Reply to a comment
              </div>
            </div>

            <div className="mt-8">
              <div className="h-8 w-8 bg-[#1b1b1b] text-white rounded-full flex items-center justify-center font-bold text-xs mb-4">
                1
              </div>
              <h4 className="font-display text-lg font-bold text-[#1b1b1b] mb-1">Pick a trigger</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold">Choose a keyword or a specific post</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Message composer box mockup */}
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[280px] mx-auto mt-4 w-full flex flex-col space-y-3">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Direct Message</span>
                <span className="text-[#695dd4]">✦ AI</span>
              </div>
              <p className="text-[10px] font-medium text-slate-700 leading-normal">
                Hey <span className="text-[#695dd4] font-semibold">{"{{username}}"}</span>, thanks for engaging! Here’s the invite link:
              </p>
              <div className="flex space-x-2 bg-slate-50 p-1.5 rounded-lg text-[9px] font-bold text-slate-400">
                <span className="bg-white text-slate-800 px-2 py-0.5 rounded shadow-sm">Manual</span>
                <span className="px-2 py-0.5">Let AI decide</span>
              </div>
            </div>

            <div className="mt-8">
              <div className="h-8 w-8 bg-[#1b1b1b] text-white rounded-full flex items-center justify-center font-bold text-xs mb-4">
                2
              </div>
              <h4 className="font-display text-lg font-bold text-[#1b1b1b] mb-1">Choose what to send</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold">Includes images or tracked links</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Floating stats block */}
            <div className="relative h-24 w-full mt-4 flex items-center justify-center">
              <div className="bg-[#ff2e3f] text-white rounded-2xl py-2.5 px-4 flex items-center space-x-4 shadow-2xl">
                <div className="flex items-center space-x-1 text-xs font-bold">
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  <span>200K</span>
                </div>
                <div className="flex items-center space-x-1 text-xs font-bold">
                  <MessageCircle className="h-3.5 w-3.5 fill-white" />
                  <span>7.1K</span>
                </div>
                <div className="flex items-center space-x-1 text-xs font-bold">
                  <Share2 className="h-3.5 w-3.5 fill-white" />
                  <span>32K</span>
                </div>
              </div>
              {/* Floating avatar circle */}
              <div className="absolute -bottom-2 h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                  alt="Creator Avatar" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="mt-8">
              <div className="h-8 w-8 bg-[#1b1b1b] text-white rounded-full flex items-center justify-center font-bold text-xs mb-4">
                3
              </div>
              <h4 className="font-display text-lg font-bold text-[#1b1b1b] mb-1">Let it run</h4>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold">On autopilot or you approve</p>
            </div>
          </div>

        </div>

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
  );
}
