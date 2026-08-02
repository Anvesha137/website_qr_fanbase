import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useSpring } from "motion/react";
import {
  CheckCheck, MessageSquare, UserPlus, Sliders, Database,
  Tv, Send, Flame, Sparkles, Calendar, ShoppingBag, ArrowRight,
  ChevronLeft, ChevronRight, Heart, CheckCircle2, Image, Smile,
  RefreshCw, Receipt
} from "lucide-react";
import { ViewMode } from "./Navbar";

interface FeaturesPageProps {
  initialFeatureId?: string;
  onBack?: () => void;
  initialActiveTab?: string;
  navigateTo?: (path: string) => void;
  setViewMode?: (mode: ViewMode) => void;
}

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

const ADVANCED_FEATURES = [
  {
    id: "ask-to-follow",
    title: "Ask to follow",
    bubbles: [
      {
        type: "user",
        sender: "fan",
        text: "Hey! Can I get the discount code?",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Please follow @quickrevert to unlock your discount code! 🔐",
        button: null
      },
      {
        type: "user",
        sender: "fan",
        text: "Followed @quickrevert! ✅",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Follower verified! Here is your discount voucher code: SAVE50 🎉",
        button: "Use Code"
      }
    ]
  },
  {
    id: "carousel-cards",
    title: "Carousel cards",
    isCarousel: true,
    carouselCards: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=400",
        headline: "Oversized Heavy Hoodie 🧥",
        desc: "Heavyweight 450gsm organic cotton streetwear fit.",
        button: "Shop Hoodie"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400",
        headline: "Italian Leather Tote 👜",
        desc: "Handcrafted full-grain leather everyday tote bag.",
        button: "View Bag"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=400",
        headline: "Retro Runner Sneakers 👟",
        desc: "Limited edition drop with cushioned impact sole.",
        button: "Shop Sneakers"
      },
      {
        id: 4,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400",
        headline: "Designer Acetate Shades 🕶️",
        desc: "UV400 polarized scratch-proof luxury lenses.",
        button: "Shop Shades"
      },
      {
        id: 5,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400",
        headline: "Vintage Denim Jacket 🧥",
        desc: "Relaxed vintage wash with custom brass hardware.",
        button: "Get Jacket"
      },
      {
        id: 6,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
        headline: "Canvas Travel Duffle 🧳",
        desc: "Water-resistant weekend travel & gym duffle bag.",
        button: "Shop Duffle"
      }
    ],
    bubbles: []
  },
  {
    id: "menu-flow",
    title: "Menu flow",
    bubbles: [
      {
        type: "creator-card-1",
        avatar: "/f-c2.png",
        text: "Hey! Glad you're here... Tap below and I'll send you a message shortly",
        subtext: "Powered by QuickRevert",
        button: "Send link"
      },
      {
        type: "user-pill",
        text: "Send link"
      },
      {
        type: "creator-card-2",
        avatar: "/f-c2.png",
        text: "Hey _chetan_prasad_! Thanks so much for your comment 💌 Everything's been sent your way ✨",
        buttons: ["Red Trip DW 291", "Grey Trip DW 291"]
      }
    ]
  },
  {
    id: "lead-manager",
    title: "Lead manager",
    bubbles: [
      {
        type: "creator",
        sender: "quickrevert",
        text: "Let's set up your account! What is your primary email address?",
        button: null
      },
      {
        type: "user",
        sender: "fan",
        text: "sarah.creator@gmail.com 📧",
        button: null
      },
      {
        type: "creator",
        sender: "quickrevert",
        text: "Contact captured! Syncing details with your Social CRM database... ✅",
        button: "View CRM Record"
      }
    ]
  }
];

const ALL_FEATURES = [
  {
    id: "comment-to-dm",
    title: "Comment Multiplier",
    tabName: "Comment Multiplier",
    icon: MessageSquare,
    tag: "Popular",
    badge: "Keyword Auto-Reply",
    stat: "98.4% Conversion",
    desc: "Automatically reply to Reel comments and slide private download links straight into their DM inbox.",
    bg: "from-purple-500/10 via-indigo-500/5 to-pink-500/10",
    iconBg: "bg-[#695dd4] text-white"
  },
  {
    id: "ask-to-follow",
    title: "The Follower Gate",
    tabName: "The Follower Gate",
    icon: UserPlus,
    tag: "Viral Loop",
    badge: "Graph API Guard",
    stat: "3.2x Follower Boost",
    desc: "Verify whether users actively follow your Instagram profile before unlocking discount codes or links.",
    bg: "from-blue-500/10 via-indigo-500/5 to-cyan-500/10",
    iconBg: "bg-blue-600 text-white"
  },
  {
    id: "carousel-cards",
    title: "Carousel Targeting",
    tabName: "Carousel Targeting",
    icon: Sliders,
    tag: "High Engagement",
    badge: "Multi-Slide Engine",
    stat: "+140% Slide Score",
    desc: "Deliver custom resource packages based on which specific slide card a user commented on.",
    bg: "from-pink-500/10 via-[#695dd4]/5 to-orange-500/10",
    iconBg: "bg-pink-600 text-white"
  },
  {
    id: "lead-manager",
    title: "Zero-Click Lead Capture",
    tabName: "Zero-Click Lead Capture",
    icon: Database,
    tag: "CRM Integration",
    badge: "Zero Form Friction",
    stat: "100% Valid Leads",
    desc: "Scrape qualified prospect names, emails, and phone numbers inside the DM chat automatically.",
    bg: "from-[#695dd4]/10 via-emerald-500/5 to-indigo-500/10",
    iconBg: "bg-emerald-600 text-white"
  },
  {
    id: "story-interactions",
    title: "Story Interaction Hack",
    tabName: "Story Interaction Hack",
    icon: Flame,
    tag: "Instant DM",
    badge: "Emoji & Tag Intercept",
    stat: "Instant Dispatch",
    desc: "Turn story reactions, mentions, and emoji taps into automated link dispatches in real-time.",
    bg: "from-orange-500/10 via-amber-500/5 to-[#695dd4]/10",
    iconBg: "bg-orange-500 text-white"
  },
  {
    id: "menu-flow",
    title: "DM Responder",
    tabName: "DM Responder",
    icon: Send,
    tag: "Decision Tree",
    badge: "1-Click Options Menu",
    stat: "24/7 Auto-Guide",
    desc: "Direct leads to calendars, support chats, or freebies using guided quick-reply option menus.",
    bg: "from-indigo-500/10 via-[#695dd4]/5 to-purple-500/10",
    iconBg: "bg-indigo-600 text-white"
  },
  {
    id: "live-stream",
    title: "Live Stream Heat",
    tabName: "Live Stream Heat",
    icon: Tv,
    tag: "Coming Soon",
    badge: "Broadcast Listener",
    stat: "RTMP Hook",
    desc: "Auto-dispatch DM gates to live stream viewers during your broadcasts in real-time.",
    bg: "from-red-500/10 via-rose-500/5 to-purple-500/10",
    iconBg: "bg-red-500 text-white"
  },
  {
    id: "brainrot-ai",
    title: "Brain rot-free AI",
    tabName: "Brain rot-free AI",
    icon: Sparkles,
    tag: "Coming Soon",
    badge: "Personal Voice Model",
    stat: "Zero Fluff NLP",
    desc: "Ultra-personalized response engine tailored strictly to your brand guidelines and voice.",
    bg: "from-purple-500/10 via-fuchsia-500/5 to-[#695dd4]/10",
    iconBg: "bg-purple-600 text-white"
  },
];

export default function FeaturesPage({ setViewMode }: FeaturesPageProps) {
  // Box 1 state (Triggers - Female Model)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  // Box 2 state (Advanced Features - Male Model)
  const [box2Index, setBox2Index] = useState(0);
  const [box2Manual, setBox2Manual] = useState(false);

  // Carousel cards slide state
  const [carouselSlide, setCarouselSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Capabilities row hover state (0 = Followups active by default)
  const [hoveredCapabilityRow, setHoveredCapabilityRow] = useState<number | null>(0);

  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % AUTOMATIC_FEATURES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isManual]);

  useEffect(() => {
    if (box2Manual) return;
    const interval = setInterval(() => {
      setBox2Index((prev) => (prev + 1) % ADVANCED_FEATURES.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [box2Manual]);

  useEffect(() => {
    if (box2Index !== 1) return;
    const interval = setInterval(() => {
      setCarouselSlide((prev) => {
        const next = (prev + 1) % 6;
        if (carouselRef.current) {
          carouselRef.current.scrollTo({ left: next * 230, behavior: 'smooth' });
        }
        return next;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, [box2Index]);

  const scrollCarousel = (dir: 'left' | 'right') => {
    const next = dir === 'left'
      ? Math.max(0, carouselSlide - 1)
      : Math.min(5, carouselSlide + 1);
    setCarouselSlide(next);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: next * 230, behavior: 'smooth' });
    }
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsManual(true);
    const timer = setTimeout(() => setIsManual(false), 9000);
    return () => clearTimeout(timer);
  };

  const handleSelectBox2 = (index: number) => {
    setBox2Index(index);
    setBox2Manual(true);
    const timer = setTimeout(() => setBox2Manual(false), 9000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 flex flex-col font-sans selection:bg-[#695dd4] selection:text-white antialiased">

      {/* TWO FEATURE CARDS SECTION (CARD 1 & CARD 2 BELOW IT) */}
      <section
        className="w-full bg-[#703ded] pt-2 pb-16 sm:pb-24 px-4 sm:px-8 relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      >
        <div className="w-full max-w-[1440px] mx-auto space-y-5 sm:space-y-6">

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
                        className={`flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer transition-all duration-300 group ${isSelected ? 'translate-x-1.5 opacity-100' : 'opacity-55 hover:opacity-85'
                          }`}
                      >
                        <div className={`shrink-0 transition-all ${isSelected ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-95'}`}>
                          <img src="/icon.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-md min-w-[36px] sm:min-w-[48px]" />
                        </div>
                        <span className={`font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug transition-all ${isSelected ? 'text-white drop-shadow-md' : 'text-white/70'
                          }`}>
                          {feat.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
                        className={`flex items-end gap-2.5 ${bubble.type === "user" || bubble.type === "user-comment"
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

          {/* CARD 2 (Male Model f-c2.png) */}
          <div className="w-full rounded-[32px] sm:rounded-[36px] overflow-hidden relative shadow-2xl bg-slate-900 border border-white/15 min-h-[500px] sm:min-h-[560px] lg:min-h-[580px] flex flex-col justify-between p-6 sm:p-12 lg:p-14">
            <img
              src="/f-c2.png"
              alt="Male Creator using Instagram DM Automation"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full flex-1">
              {/* Left Column: 4 Advanced Items */}
              <div className="lg:col-span-7 space-y-4 text-left self-start pt-2 sm:pt-4">
                <p className="text-[10px] sm:text-xs font-bold tracking-widest text-white/70 uppercase">
                  Automatically
                </p>

                <div className="space-y-2.5 sm:space-y-3">
                  {ADVANCED_FEATURES.map((feat, idx) => {
                    const isSelected = box2Index === idx;
                    return (
                      <div
                        key={feat.id}
                        onClick={() => handleSelectBox2(idx)}
                        className={`flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer transition-all duration-300 group ${isSelected ? 'translate-x-1.5 opacity-100' : 'opacity-55 hover:opacity-85'
                          }`}
                      >
                        <div className={`shrink-0 transition-all ${isSelected ? 'opacity-100 scale-110' : 'opacity-70 hover:opacity-95'}`}>
                          <img src="/icon.png" alt="" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain shrink-0 drop-shadow-md min-w-[36px] sm:min-w-[48px]" />
                        </div>
                        <span className={`font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug transition-all ${isSelected ? 'text-white drop-shadow-md' : 'text-white/70'
                          }`}>
                          {feat.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Chat Bubbles or Carousel */}
              <div className="lg:col-span-5 flex flex-col justify-end items-end relative min-h-[280px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={box2Index}
                    className="w-full flex flex-col gap-3"
                  >
                    {ADVANCED_FEATURES[box2Index].isCarousel ? (
                      <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] flex flex-col gap-3">
                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="bg-gradient-to-r from-[#804bf2] to-[#6939dc] border border-white/15 text-white text-xs p-3 rounded-2xl rounded-tr-none shadow-xl max-w-[280px] self-end"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-white/90 text-[11px]">@alex_design</span>
                            <span className="text-[8px] text-white/40">2m</span>
                          </div>
                          <p className="text-white/90 font-medium">Commented 'CATALOG' 📸</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.15 }}
                          className="bg-[#1e252a]/95 text-white p-3.5 rounded-2xl rounded-tl-none shadow-xl max-w-[300px] border border-white/10 self-start"
                        >
                          <p className="text-xs font-medium leading-relaxed text-white/95">
                            Here is our exclusive fashion catalog! Swipe through the 6 items below to shop 🛍️✨
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.3 }}
                          className="flex flex-col gap-2 pt-1"
                        >
                          <div className="flex items-center justify-end text-white/80 text-xs px-1 font-semibold">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => scrollCarousel('left')}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition shadow-xs"
                                title="Previous Card"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => scrollCarousel('right')}
                                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition shadow-xs"
                                title="Next Card"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div
                            ref={carouselRef}
                            className="flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1 scroll-smooth"
                          >
                            {ADVANCED_FEATURES[box2Index].carouselCards?.map((card, cIdx) => (
                              <motion.div
                                key={card.id}
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: cIdx * 0.08 }}
                                className="w-[200px] sm:w-[220px] shrink-0 snap-center bg-gradient-to-b from-[#25174f] to-[#170e34] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-white/45 transition-all text-left"
                              >
                                <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-800">
                                  <img
                                    src={card.image}
                                    alt={card.headline}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  />
                                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-[#fafafa] border border-white/15">
                                    {cIdx + 1}/6
                                  </div>
                                </div>

                                <div className="p-3.5 flex flex-col justify-between flex-1 gap-3">
                                  <div className="space-y-1">
                                    <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                                      {card.headline}
                                    </h4>
                                    <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                                      {card.desc}
                                    </p>
                                  </div>

                                  <button className="w-full py-2 bg-gradient-to-r from-[#804bf2] to-[#6939dc] hover:from-[#8f5cf5] hover:to-[#7846e3] text-white text-xs font-bold rounded-xl transition cursor-pointer text-center shadow-md border border-white/15">
                                    {card.button}
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    ) : (
                      ADVANCED_FEATURES[box2Index].bubbles.map((bubble, bIdx) => (
                        <motion.div
                          key={`box2-${box2Index}-${bIdx}`}
                          initial={{ opacity: 0, y: 35, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -35, scale: 0.95 }}
                          transition={{
                            duration: 0.45,
                            delay: bIdx * 0.16,
                            ease: [0.25, 0.1, 0.25, 1.0]
                          }}
                          className={`flex items-end gap-2.5 ${bubble.type === "user" || bubble.type === "user-pill"
                              ? "justify-end self-end"
                              : "justify-start self-start"
                            }`}
                        >
                          {bubble.type === "user-comment" ? (
                            <div className="bg-[#1b272c]/95 border border-white/10 text-white text-xs p-3.5 rounded-2xl rounded-tl-none shadow-xl max-w-[280px]">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="font-bold text-white/90 text-[11px]">@{bubble.sender}</span>
                                <span className="text-[8px] text-white/40">2m</span>
                              </div>
                              <p className="text-white/90 font-medium">{bubble.text}</p>
                            </div>
                          ) : bubble.type === "creator-card-1" ? (
                            <div className="flex items-start gap-2.5 self-start max-w-[310px]">
                              <img
                                src={bubble.avatar}
                                alt="Creator Avatar"
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-white/20 mt-1 shadow-md"
                              />
                              <div className="bg-[#1e252a]/95 border border-white/10 text-white p-3.5 rounded-2xl rounded-tl-xs shadow-xl space-y-2.5 w-full text-left">
                                <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-white/95">
                                  {bubble.text}
                                </p>
                                <p className="text-[10px] text-white/45 font-medium">
                                  {bubble.subtext}
                                </p>
                                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition cursor-pointer text-center border border-white/10 shadow-xs">
                                  {bubble.button}
                                </button>
                              </div>
                            </div>
                          ) : bubble.type === "user-pill" ? (
                            <div className="bg-gradient-to-r from-[#804bf2] to-[#6939dc] text-white text-xs font-bold px-4.5 py-2.5 rounded-full shadow-xl border border-white/15">
                              {bubble.text}
                            </div>
                          ) : bubble.type === "creator-card-2" ? (
                            <div className="flex items-start gap-2.5 self-start max-w-[310px]">
                              <img
                                src={bubble.avatar}
                                alt="Creator Avatar"
                                className="w-7 h-7 rounded-full object-cover shrink-0 border border-white/20 mt-1 shadow-md"
                              />
                              <div className="bg-[#1e252a]/95 border border-white/10 text-white p-3.5 rounded-2xl rounded-tl-xs shadow-xl space-y-2.5 w-full text-left">
                                <p className="text-xs sm:text-[13px] font-medium leading-relaxed text-white/95">
                                  {bubble.text}
                                </p>
                                <div className="space-y-2 pt-1">
                                  {bubble.buttons?.map((btnText: string, bIndex: number) => (
                                    <button
                                      key={bIndex}
                                      className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition cursor-pointer text-center border border-white/10 shadow-xs"
                                    >
                                      {btnText}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ) : bubble.type === "user" ? (
                            <div className="bg-gradient-to-r from-[#804bf2] to-[#6939dc] text-white text-xs px-4 py-3 rounded-2xl rounded-tr-none shadow-lg max-w-[260px] font-semibold border border-white/15">
                              {bubble.text}
                            </div>
                          ) : (
                            <div className="bg-[#1e252a]/95 text-white p-4 rounded-2xl rounded-tl-none shadow-2xl max-w-[290px] border border-white/10">
                              <p className="text-xs font-medium leading-relaxed text-white/95">
                                {bubble.text}
                              </p>
                              {bubble.button && (
                                <button className="mt-3 w-full py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition cursor-pointer text-center border border-white/10 shadow-xs">
                                  {bubble.button}
                                </button>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CAPABILITIES ROWS SECTION */}
      <section
        className="w-full bg-[#faf8f4] py-28 sm:py-36 px-4 sm:px-8 relative overflow-visible"
      >
        <div className="w-full max-w-[1320px] mx-auto space-y-0">

          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono font-bold tracking-[0.25em] text-slate-500 uppercase mb-8 sm:mb-12"
          >
            CAPABILITIES
          </motion.p>

          {/* Row 1 — Followups */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCapabilityRow(0)}
            className={`rounded-none py-10 sm:py-14 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative group cursor-pointer transition-colors duration-300 ${
              hoveredCapabilityRow === 0 ? 'bg-[#c6d2ff]' : 'bg-transparent hover:bg-[#c6d2ff]/30'
            }`}
          >
            <div className="flex items-baseline gap-3.5 md:contents">
              <div className="md:col-span-1 text-lg sm:text-base font-sans text-[#2d323e] font-normal shrink-0">1</div>
              
              {/* Breakout Overlapping Image Container - Visible ONLY on md+ when hovered */}
              <div className="hidden md:flex md:col-span-4 justify-start items-center relative pointer-events-none">
                <div
                  className={`w-[200px] sm:w-[250px] lg:w-[285px] h-[280px] sm:h-[360px] lg:h-[420px] transition-all duration-300 relative z-30 -my-16 sm:-my-24 lg:-my-28 drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] ${
                    hoveredCapabilityRow === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img src="/followup.png" alt="Followups" className="w-full h-full object-contain object-center" />
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4 px-0 md:px-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1a1d24] tracking-tight leading-[1.08]">
                  Followups
                </h3>
              </div>
            </div>

            {/* Right List */}
            <div className="md:col-span-3 space-y-1.5 text-sm sm:text-base text-[#333742] font-normal leading-relaxed">
              <p>Timed DM sequences</p>
              <p>Cold lead re-engagement</p>
              <p>Abandoned cart recovery</p>
              <p>Inactive follower nudges</p>
              <p>Smart delay scheduling</p>
              <p>Auto-stop on reply</p>
            </div>
          </motion.div>

          {/* Row 2 — My Store */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCapabilityRow(1)}
            onClick={() => setViewMode && setViewMode('link-in-bio')}
            className={`rounded-none py-10 sm:py-14 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative group cursor-pointer transition-colors duration-300 ${
              hoveredCapabilityRow === 1 ? 'bg-[#fae2cb]' : 'bg-transparent hover:bg-[#fae2cb]/30'
            }`}
          >
            <div className="flex items-baseline gap-3.5 md:contents">
              <div className="md:col-span-1 text-lg sm:text-base font-sans text-[#2d323e] font-normal shrink-0">2</div>
              
              {/* Breakout Overlapping Image Container - Visible ONLY on md+ when hovered */}
              <div className="hidden md:flex md:col-span-4 justify-start items-center relative pointer-events-none">
                <div
                  className={`w-[200px] sm:w-[250px] lg:w-[285px] h-[280px] sm:h-[360px] lg:h-[420px] transition-all duration-300 relative z-30 -my-16 sm:-my-24 lg:-my-28 drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] ${
                    hoveredCapabilityRow === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img src="/store.png" alt="My Store" className="w-full h-full object-contain object-center" />
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4 px-0 md:px-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1a1d24] tracking-tight leading-[1.08]">
                  My Store
                </h3>
              </div>
            </div>

            {/* Right List */}
            <div className="md:col-span-3 space-y-1.5 text-sm sm:text-base text-[#333742] font-normal leading-relaxed">
              <p>Link-in-bio storefront</p>
              <p>Digital product sales</p>
              <p>Instant checkout</p>
              <p>Custom themes</p>
              <p>Analytics dashboard</p>
              <p>Guide & course hosting</p>
            </div>
          </motion.div>

          {/* Row 3 — 1:1 Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCapabilityRow(2)}
            onClick={() => setViewMode && setViewMode('slots')}
            className={`rounded-none py-10 sm:py-14 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative group cursor-pointer transition-colors duration-300 ${
              hoveredCapabilityRow === 2 ? 'bg-[#dcf0e3]' : 'bg-transparent hover:bg-[#dcf0e3]/30'
            }`}
          >
            <div className="flex items-baseline gap-3.5 md:contents">
              <div className="md:col-span-1 text-lg sm:text-base font-sans text-[#2d323e] font-normal shrink-0">3</div>
              
              {/* Breakout Overlapping Image Container - Visible ONLY on md+ when hovered */}
              <div className="hidden md:flex md:col-span-4 justify-start items-center relative pointer-events-none">
                <div
                  className={`w-[200px] sm:w-[250px] lg:w-[285px] h-[280px] sm:h-[360px] lg:h-[420px] transition-all duration-300 relative z-30 -my-16 sm:-my-24 lg:-my-28 drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] ${
                    hoveredCapabilityRow === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img src="/calender.png" alt="1:1 Appointments" className="w-full h-full object-contain object-center" />
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4 px-0 md:px-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1a1d24] tracking-tight leading-[1.08]">
                  1:1 Appointments
                </h3>
              </div>
            </div>

            {/* Right List */}
            <div className="md:col-span-3 space-y-1.5 text-sm sm:text-base text-[#333742] font-normal leading-relaxed">
              <p>In-DM booking flow</p>
              <p>Google Calendar sync</p>
              <p>Auto Meet link generation</p>
              <p>Paid session support</p>
              <p>Reminder notifications</p>
              <p>Strategy call templates</p>
            </div>
          </motion.div>

          {/* Row 4 — Invoice Generator & Financial Planner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHoveredCapabilityRow(3)}
            className={`rounded-none py-10 sm:py-14 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative group cursor-pointer transition-colors duration-300 ${
              hoveredCapabilityRow === 3 ? 'bg-[#f3dbf7]' : 'bg-transparent hover:bg-[#f3dbf7]/30'
            }`}
          >
            <div className="flex items-baseline gap-3.5 md:contents">
              <div className="md:col-span-1 text-lg sm:text-base font-sans text-[#2d323e] font-normal shrink-0">4</div>
              
              {/* Breakout Overlapping Image Container - Visible ONLY on md+ when hovered */}
              <div className="hidden md:flex md:col-span-4 justify-start items-center relative pointer-events-none">
                <div
                  className={`w-[200px] sm:w-[250px] lg:w-[285px] h-[280px] sm:h-[360px] lg:h-[420px] transition-all duration-300 relative z-30 -my-16 sm:-my-24 lg:-my-28 drop-shadow-[0_20px_35px_rgba(0,0,0,0.3)] ${
                    hoveredCapabilityRow === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <img src="/invoice.png" alt="Invoice Generator & Financial Planner" className="w-full h-full object-contain object-center" />
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4 px-0 md:px-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#1a1d24] tracking-tight leading-[1.08]">
                  Invoice Generator & Financial Planner
                </h3>
              </div>
            </div>

            {/* Right List */}
            <div className="md:col-span-3 space-y-1.5 text-sm sm:text-base text-[#333742] font-normal leading-relaxed">
              <p>Professional invoices</p>
              <p>Payment tracking</p>
              <p>Revenue dashboard</p>
              <p>Expense management</p>
              <p>Tax-ready reports</p>
              <p>DM sales pipeline sync</p>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

