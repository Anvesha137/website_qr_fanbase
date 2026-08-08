import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const AUTOMATIC_FEATURES = [
  {
    id: "reply-comments",
    title: "Reply to comments",
    bubbles: [
      {
        type: "user-comment",
        sender: "alex_creator",
        text: "Where can I get the accelerator guide link? 🚀",
        button: null
      },
      {
        type: "creator-reply",
        sender: "quickrevert",
        text: "@alex_creator Check your DM! Just sent you the download link 📩✨",
        button: null
      },
      {
        type: "user-comment",
        sender: "sarah_design",
        text: "Commented 'AUTOMATE' under your reel! 🔥",
        button: null
      },
      {
        type: "creator-reply",
        sender: "quickrevert",
        text: "@sarah_design Doneee, sent you the full automation playbook 🛍️",
        button: null
      }
    ]
  },
  {
    id: "send-links",
    title: "Send links",
    bubbles: [
      {
        type: "creator",
        sender: "quickrevert",
        text: "Hey! Are you ready to get that link?",
        button: null
      },
      {
        type: "user",
        sender: "fan",
        text: "Yeah, send it over!",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Here's the link you asked for. Enjoy!",
        button: "Open"
      }
    ]
  },
  {
    id: "reply-dms",
    title: "Reply to DMs",
    bubbles: [
      {
        type: "user",
        sender: "creator_fan",
        text: "Do you have any promo code for the VIP plan?",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Yes! Use code VIP20 at checkout to get 20% off today 🎉",
        button: "Claim 20% Off"
      }
    ]
  },
  {
    id: "story-replies",
    title: "Story Replies",
    bubbles: [
      {
        type: "user",
        sender: "story_fan",
        text: "Reacted 🔥 to your Story",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Thanks for reacting to our story! Here is your instant access link to the live masterclass 🍿✨",
        button: "Join Live Stream"
      }
    ]
  }
];

interface PlaygroundProps {
  setViewMode?: (mode: any) => void;
}

export default function Playground({ setViewMode }: PlaygroundProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % AUTOMATIC_FEATURES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isManual]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsManual(true);
    const timer = setTimeout(() => setIsManual(false), 9000);
    return () => clearTimeout(timer);
  };

  return (
    <section
      className="w-full bg-[#703ded] py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden"
      id="capabilities"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        {/* CARD 1 (Female Model f-c1.png) */}
        <div className="w-full rounded-[32px] sm:rounded-[36px] overflow-hidden relative shadow-2xl bg-slate-900 border border-white/15 min-h-[500px] sm:min-h-[560px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 lg:p-14">
          <img
            src="/f-c1.png"
            alt="Female Creator using Instagram DM Automation"
            className="absolute inset-0 w-full h-full object-cover object-[82%_center] sm:object-center pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full flex-1">
            {/* Left Column: 4 Automatic Items */}
            <div className="lg:col-span-7 space-y-4 text-left self-start pt-2 sm:pt-4">
              <p className="text-[10px] sm:text-xs font-bold tracking-widest text-white/70 uppercase">
                Automatically
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                {AUTOMATIC_FEATURES.map((feat, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={feat.id}
                      onClick={() => handleSelect(idx)}
                      className={`flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer transition-all duration-300 group ${
                        isSelected ? 'translate-x-1.5 opacity-100' : 'opacity-55 hover:opacity-85'
                      }`}
                    >
                      <div className={`shrink-0 transition-all ${isSelected ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-95'}`}>
                        <img src="/icon.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-md min-w-[36px] sm:min-w-[48px]" />
                      </div>
                      <span className={`font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug transition-all ${
                        isSelected ? 'text-white drop-shadow-md' : 'text-white/70'
                      }`}>
                        {feat.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              <a
                href="/features"
                onClick={(e) => {
                  if (setViewMode) {
                    e.preventDefault();
                    setViewMode('features');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2.5 mt-6 sm:mt-8 px-6 py-3 rounded-2xl bg-white text-[#1b1b1b] hover:bg-slate-100 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer group select-none"
              >
                Explore Now
                <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Column: Chat Bubbles Animation */}
            <div className="lg:col-span-5 flex flex-col justify-end items-end relative min-h-[260px] sm:min-h-[280px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  className="w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[340px] flex flex-col gap-2.5 sm:gap-3"
                >
                  {AUTOMATIC_FEATURES[selectedIndex].bubbles.map((bubble, bIdx) => (
                    <motion.div
                      key={`${selectedIndex}-${bIdx}`}
                      initial={{ opacity: 0, y: 35, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -35, scale: 0.95 }}
                      transition={{
                        duration: 0.45,
                        delay: bIdx * 0.16,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }}
                      className={`flex items-end gap-2.5 ${
                        bubble.type === "user" || bubble.type === "user-comment"
                          ? "justify-end self-end"
                          : "justify-start self-start"
                      }`}
                    >
                      {bubble.type === "user-comment" ? (
                        <div className="bg-gradient-to-r from-[#804bf2] to-[#6939dc] border border-white/15 text-white text-[10px] sm:text-xs p-2.5 sm:p-3.5 rounded-2xl rounded-tr-none shadow-xl max-w-[220px] sm:max-w-[280px]">
                          <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                            <span className="font-bold text-white/90 text-[10px] sm:text-[11px]">@{bubble.sender}</span>
                            <span className="text-[8px] text-white/40">2m</span>
                          </div>
                          <p className="text-white/90 font-medium">{bubble.text}</p>
                        </div>
                      ) : bubble.type === "creator-reply" ? (
                        <div className="bg-[#1e252a]/95 border border-white/10 text-white text-[10px] sm:text-xs p-2.5 sm:p-3.5 rounded-2xl rounded-tl-none shadow-xl max-w-[220px] sm:max-w-[280px]">
                          <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                            <span className="font-bold text-white/90 text-[10px] sm:text-[11px]">{bubble.sender}</span>
                            <span className="bg-white/15 px-1.5 py-0.5 rounded text-[8px] font-bold">Author</span>
                          </div>
                          <p className="text-white/90 font-medium">{bubble.text}</p>
                        </div>
                      ) : bubble.type === "user" ? (
                        <div className="bg-gradient-to-r from-[#804bf2] to-[#6939dc] text-white text-[10px] sm:text-xs px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tr-none shadow-lg max-w-[200px] sm:max-w-[260px] font-semibold border border-white/15">
                          {bubble.text}
                        </div>
                      ) : (
                        <div className="bg-[#1e252a]/95 text-white p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-2xl max-w-[230px] sm:max-w-[290px] border border-white/10">
                          <p className="text-[10px] sm:text-xs font-medium leading-relaxed text-white/95">
                            {bubble.text}
                          </p>
                          {bubble.button && (
                            <button className="mt-2 sm:mt-3 w-full py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-bold rounded-xl transition cursor-pointer text-center border border-white/10 shadow-xs">
                              {bubble.button}
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
