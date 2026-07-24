import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare, UserPlus, Sliders, Database,
  Tv, Send, Flame, Sparkles, Check, RotateCcw,
  AlertCircle, Sparkle, Zap, ArrowLeft, Heart,
  Bookmark, Smile, Camera, Mic, ChevronLeft,
  MoreHorizontal, Link2, Volume2, VolumeX, Instagram,
  ArrowRight, ShieldCheck, CheckCircle2, UserCheck,
  TrendingUp, Play, Layers, X, ChevronRight, Maximize2
} from "lucide-react";

interface FeaturesPageProps {
  initialFeatureId?: string;
  onBack: () => void;
  initialActiveTab?: string;
  navigateTo?: (path: string) => void;
  soundEnabled?: boolean;
  setSoundEnabled?: (enabled: boolean) => void;
  soundType?: string;
  setSoundType?: (type: string) => void;
}

export default function FeaturesPage({
  initialFeatureId,
  onBack,
  initialActiveTab,
  soundEnabled,
  setSoundEnabled,
  soundType,
  setSoundType
}: FeaturesPageProps) {
  // Sound configuration
  const [localSoundEnabled, setLocalSoundEnabled] = useState(soundEnabled !== undefined ? soundEnabled : false);
  const [localSoundType, setLocalSoundType] = useState(soundType !== undefined ? soundType : "cyber_synth");

  const actualSoundEnabled = soundEnabled !== undefined ? soundEnabled : localSoundEnabled;
  const actualSetSoundEnabled = setSoundEnabled !== undefined ? setSoundEnabled : setLocalSoundEnabled;

  const actualSoundType = soundType !== undefined ? soundType : localSoundType;
  const actualSetSoundType = setSoundType !== undefined ? setSoundType : setLocalSoundType;

  // Active feature for full-screen modal sandbox
  const [activeModalFeature, setActiveModalFeature] = useState<string | null>(initialFeatureId || null);

  // Sound generator
  const playSoundSample = (type: string) => {
    if (!actualSoundEnabled) return;
    try {
      let url = "";
      if (type === "mechanical") {
        url = "https://raw.githubusercontent.com/ionictheme/ionic2-chat/master/src/assets/sounds/button-16.mp3";
      } else if (type === "keyboard") {
        url = "https://www.soundjay.com/buttons/sounds/button-3.mp3";
      } else if (type === "retro") {
        url = "https://www.soundjay.com/buttons/sounds/button-10.mp3";
      } else if (type === "cyber_synth") {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(3200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.012);

        filter.type = "highpass";
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0.35, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.012);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.015);

        const bufferSize = audioCtx.sampleRate * 0.01;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(3500, audioCtx.currentTime);
        noiseFilter.Q.setValueAtTime(4, audioCtx.currentTime);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.01);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);

        noiseNode.start();
        return;
      }

      if (url) {
        const audio = new Audio(url);
        audio.volume = type === "retro" ? 0.35 : 0.6;
        audio.play().catch(() => { });
      }
    } catch (e) {
      console.warn(e);
    }
  };

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

  // Simulation states inside active modal
  const [phoneScreen, setPhoneScreen] = useState<'feed' | 'dm' | 'profile' | 'story'>('feed');
  const [notification, setNotification] = useState<{ sender: string; text: string } | null>(null);

  // 1. Comment Multiplier States
  const [targetKeyword, setTargetKeyword] = useState("EASY");
  const [commentInput, setCommentInput] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(true);
  const [multiplierComments, setMultiplierComments] = useState<Array<{ sender: string; text: string; time: string; isUser?: boolean }>>([
    { sender: "natalie_codes", text: "Need this so bad! 🔥", time: "2m" },
    { sender: "growth_hacker", text: "Is this safe?", time: "1m" },
  ]);
  const [multiplierDMs, setMultiplierDMs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // 2. The Follower Gate States
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCheckStep, setFollowCheckStep] = useState<"initial" | "checking" | "failed" | "following" | "verifying" | "success">("initial");
  const [gateDMs, setGateDMs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // 3. Carousel Targeting States
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [carouselDMs, setCarouselDMs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // 4. Zero-Click Lead Capture States
  const [leadStep, setLeadStep] = useState(1);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", interested: "" });
  const [leadTyping, setLeadTyping] = useState(false);
  const [leadChat, setLeadChat] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // 5. Story Interaction Hack States
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyDMs, setStoryDMs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; char: string; left: number }>>([]);

  // 6. DM Responder States
  const [responderDMs, setResponderDMs] = useState<Array<{ sender: "bot" | "user"; text: string }>>([]);

  // Active feature item object
  const currentFeature = ALL_FEATURES.find(f => f.id === activeModalFeature || f.tabName === activeModalFeature) || ALL_FEATURES[0];

  // Open modal sandbox
  const openSimulationModal = (featureId: string) => {
    setActiveModalFeature(featureId);
    playSoundSample(actualSoundType);
    resetToTabDefaults(featureId);
  };

  // Reset tab defaults
  const resetToTabDefaults = (featureId: string) => {
    const feat = ALL_FEATURES.find(f => f.id === featureId || f.tabName === featureId);
    const tabName = feat ? feat.tabName : "Comment Multiplier";

    if (tabName === "Comment Multiplier") {
      setPhoneScreen('feed');
      setCommentsOpen(true);
      setCommentInput("");
      setTargetKeyword("EASY");
      setMultiplierComments([
        { sender: "natalie_codes", text: "Need this so bad! 🔥", time: "2m" },
        { sender: "growth_hacker", text: "Is this safe?", time: "1m" },
      ]);
      setMultiplierDMs([]);
    } else if (tabName === "The Follower Gate") {
      setPhoneScreen('dm');
      setIsFollowing(false);
      setFollowCheckStep("initial");
      setGateDMs([
        { sender: "bot", text: "Hey! Tap 'Verify Follow Status' below or test following @quickrevert_ai on the profile screen! 🔐" }
      ]);
    } else if (tabName === "Carousel Targeting") {
      setPhoneScreen('feed');
      setCommentsOpen(false);
      setSelectedSlideIndex(0);
      setCarouselDMs([
        { sender: "bot", text: "Swipe through the carousel slides on the left and click the trigger buttons to test slide-specific DMs!" }
      ]);
    } else if (tabName === "Zero-Click Lead Capture") {
      setPhoneScreen('dm');
      setLeadStep(1);
      setLeadForm({ name: "", email: "", phone: "", interested: "" });
      setLeadChat([
        { sender: "bot", text: "Hey! Let's get you set up with our Exclusive Creator Pack. What is your full name? ✍️" }
      ]);
    } else if (tabName === "Story Interaction Hack") {
      setPhoneScreen('story');
      setStoryDMs([]);
    } else if (tabName === "DM Responder") {
      setPhoneScreen('dm');
      setResponderDMs([
        { sender: "bot", text: "Welcome to QuickRevert! Choose one of the active pathways below to guide your automation flow:" }
      ]);
    }
  };

  // Story Progress effect
  useEffect(() => {
    if (currentFeature.tabName === "Story Interaction Hack") {
      setStoryProgress(0);
      const interval = setInterval(() => {
        setStoryProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentFeature.tabName]);

  // Comment submission
  const submitComment = (text: string) => {
    if (!text.trim()) return;
    const userText = text.trim();
    playSoundSample(actualSoundType);

    setMultiplierComments((prev) => [
      ...prev,
      { sender: "ig_fan_account", text: userText, time: "Just now", isUser: true }
    ]);
    setCommentInput("");

    setTimeout(() => {
      playSoundSample(actualSoundType);
      setNotification({
        sender: "quickrevert_ai",
        text: `Sent you a message: "Yo! Thanks for commenting '${userText}'. Here is your link..."`
      });

      if (currentFeature.tabName === "Comment Multiplier") {
        setMultiplierDMs([
          { sender: "user", text: `Commented "${userText}" on your Reel` },
          { sender: "bot", text: `Yo! Thank you for commenting '${userText}'. Here is your private link to claim the accelerator guide: quickrevert.com/start 🚀` }
        ]);
        setPhoneScreen('dm');
      } else if (currentFeature.tabName === "Carousel Targeting") {
        const slide = CAROUSEL_CARDS[selectedSlideIndex];
        setCarouselDMs([
          { sender: "user", text: `Commented "${userText}" under slide: ${slide.title}` },
          { sender: "bot", text: `Direct delivery! Here is the slide-specific guide for "${slide.title}": quickrevert.com/dl-${slide.id} 📥` }
        ]);
        setPhoneScreen('dm');
      }
    }, 1200);
  };

  // Follower Check
  const checkFollowStatus = () => {
    setFollowCheckStep("checking");
    playSoundSample(actualSoundType);

    setTimeout(() => {
      playSoundSample(actualSoundType);
      if (isFollowing) {
        setFollowCheckStep("success");
        setGateDMs((prev) => [
          ...prev,
          { sender: "user", text: "Verify follow status" },
          { sender: "bot", text: "Verification complete! Follower status: VALID. Here is your discount voucher code: GROWTH50 ✅" }
        ]);
      } else {
        setFollowCheckStep("failed");
        setGateDMs((prev) => [
          ...prev,
          { sender: "user", text: "Verify follow status" },
          { sender: "bot", text: "Oops! We noticed you aren't following our profile yet. Please follow @quickrevert_ai on the profile screen to unlock!" }
        ]);
        setNotification({
          sender: "quickrevert_ai",
          text: `Please follow our account to unlock the automation link.`
        });
      }
    }, 1500);
  };

  // Lead input
  const handleLeadInput = (inputVal: string, key?: keyof typeof leadForm) => {
    if (leadTyping) return;
    playSoundSample(actualSoundType);

    const updatedForm = { ...leadForm };
    if (key) {
      updatedForm[key] = inputVal;
      setLeadForm(updatedForm);
    }

    setLeadChat((prev) => [...prev, { sender: "user", text: inputVal }]);
    setLeadTyping(true);

    setTimeout(() => {
      setLeadTyping(false);
      playSoundSample(actualSoundType);

      if (leadStep === 1) {
        setLeadStep(2);
        setLeadChat((prev) => [...prev, { sender: "bot", text: `Awesome! Now, what is your email address so we can register your files? 📧` }]);
      } else if (leadStep === 2) {
        setLeadStep(3);
        setLeadChat((prev) => [...prev, { sender: "bot", text: `Got it. Lastly, enter your WhatsApp/Phone number for priority updates: 📱` }]);
      } else if (leadStep === 3) {
        setLeadStep(4);
        setLeadChat((prev) => [...prev, { sender: "bot", text: `Secure capture complete! Syncing details with your database... 🎉` }]);
      }
    }, 1200);
  };

  // Responder Select
  const handleResponderSelect = (label: string, botText: string) => {
    playSoundSample(actualSoundType);
    setResponderDMs((prev) => [
      ...prev,
      { sender: "user", text: label },
      { sender: "bot", text: botText }
    ]);
  };

  // Story Reaction
  const tapStoryEmoji = (emoji: string) => {
    playSoundSample(actualSoundType);

    const id = Date.now();
    const char = emoji;
    const left = 20 + Math.random() * 60;
    setFloatingEmojis((prev) => [...prev, { id, char, left }]);
    setTimeout(() => setFloatingEmojis((prev) => prev.filter((e) => e.id !== id)), 2000);

    setTimeout(() => {
      playSoundSample(actualSoundType);
      setNotification({
        sender: "quickrevert_ai",
        text: `Sent a link for reacting "${emoji}" on our story!`
      });
      setStoryDMs([
        { sender: "user", text: `Reacted "${emoji}" on your Story` },
        { sender: "bot", text: `Hey! Thanks for reacting to our story. Here is your fast-pass link to the live masterclass: quickrevert.com/live 🚀` }
      ]);
      setPhoneScreen('dm');
    }, 1200);
  };

  // Carousel Definition
  const CAROUSEL_CARDS = [
    { id: 1, title: "1. The Organic Myth", action: "ACCELERATE", desc: "Why traditional organic reach is dead.", bg: "from-purple-600 to-indigo-600" },
    { id: 2, title: "2. Visual Hooks", action: "HOOKS", desc: "Reverse-engineer viral Reel algorithms.", bg: "from-indigo-600 to-pink-600" },
    { id: 3, title: "3. Direct Response", action: "FUNNEL", desc: "Setting up frictionless DM funnels.", bg: "from-pink-600 to-orange-500" },
    { id: 4, title: "4. High Ticket Sales", action: "FOLLOW", desc: "Book appointments directly inside chat.", bg: "from-orange-500 to-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 flex flex-col font-sans selection:bg-[#695dd4] selection:text-white antialiased">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-1">
            <img src="/Logo_optimized.png" className="h-10 w-10 object-contain" alt="QuickRevert" />
            <span className="font-manrope font-bold text-lg tracking-tight text-[#1b1b1b]">QuickRevert</span>
          </div>
          {/* Sound Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => actualSetSoundEnabled(!actualSoundEnabled)}
              className={`p-2 rounded-xl border transition-colors shadow-xs cursor-pointer flex items-center justify-center ${actualSoundEnabled ? "bg-[#695dd4] text-white border-[#695dd4]" : "bg-white text-slate-500 border-slate-200 hover:text-slate-800"
                }`}
              title={actualSoundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {actualSoundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <select
              value={actualSoundType}
              onChange={(e) => actualSetSoundType(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 font-semibold text-slate-700 outline-none focus:border-[#695dd4] transition cursor-pointer shadow-xs"
            >
              <option value="cyber_synth">Cyber Synth</option>
              <option value="keyboard">Keyboard Tap</option>
              <option value="retro">Retro Tone</option>
              <option value="mechanical">Mechanical</option>
            </select>
          </div>
        </div>
      </header>

      {/* HERO HERO BANNER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 flex flex-col gap-10">

        <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 bg-[#695dd4]/10 border border-[#695dd4]/20 text-[#695dd4] font-mono text-[10px] font-bold uppercase px-3.5 py-1.5 rounded-full shadow-xs">
            <Sparkle className="w-3.5 h-3.5 text-[#695dd4] animate-spin" />
            <span>Interactive Feature Engine Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-tight uppercase text-slate-900">
            Supercharge Every Instagram Touchpoint
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-550 leading-relaxed max-w-2xl mx-auto">
            Explore QuickRevert's 8 powerful Instagram automation channels. Click any feature card below to launch the live interactive simulation sandbox.
          </p>
        </div>

        {/* FULL-PAGE FEATURE SHOWCASE GRID (8 CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ALL_FEATURES.map((feat) => {
            const FeatIcon = feat.icon;
            return (
              <motion.div
                key={feat.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => openSimulationModal(feat.id)}
                className="bg-white border border-slate-200/80 hover:border-[#695dd4]/40 rounded-3xl p-6 shadow-xs hover:shadow-[0_20px_50px_rgba(105,93,212,0.12)] flex flex-col justify-between space-y-6 transition-all cursor-pointer group relative overflow-hidden"
              >
                {/* Background subtle gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10 space-y-4">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${feat.iconBg} flex items-center justify-center shadow-sm font-bold`}>
                      <FeatIcon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-[#695dd4] transition-colors leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-550 font-medium leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer Action */}
                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#695dd4] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                    {feat.stat}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-[#695dd4] transition-colors">
                    <span>Test Demo</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </main>

      {/* FULL-SCREEN EXPANDABLE INTERACTIVE SIMULATION MODAL (POP-UP) */}
      <AnimatePresence>
        {activeModalFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col max-h-[92vh] overflow-hidden my-auto text-left relative"
            >
              {/* MODAL HEADER BAR */}
              <div className="px-6 py-4 border-b border-slate-150 flex items-center justify-between bg-slate-50/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${currentFeature.iconBg} flex items-center justify-center shadow-xs`}>
                    <currentFeature.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-base text-slate-900 uppercase leading-none">
                      {currentFeature.title} Sandbox
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">Interactive Client-Side Graph API Emulation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quick Feature Switcher inside Modal */}
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                    {ALL_FEATURES.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => openSimulationModal(f.id)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${currentFeature.id === f.id ? "bg-[#695dd4] text-white" : "hover:bg-slate-100 text-slate-600"
                          }`}
                      >
                        {f.title.split(" ")[0]}
                      </button>
                    ))}
                  </div>

                  {/* Close Modal Button */}
                  <button
                    onClick={() => setActiveModalFeature(null)}
                    className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shadow-xs"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* MODAL WORKSPACE BODY (SPACIOUS 2-COLUMN SANDBOX) */}
              <div className="flex-1 overflow-y-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* LEFT PANE: FEATURE CONTROLS & WORKFLOW DIAGRAM (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">

                  {/* Feature Description Card */}
                  <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#695dd4] uppercase tracking-wider">CHANNELS OVERVIEW</span>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                      {currentFeature.desc}
                    </p>
                  </div>

                  {/* 1. COMMENT MULTIPLIER CONTROLS */}
                  {currentFeature.tabName === "Comment Multiplier" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-slate-500 uppercase">Trigger Keyword Configuration</span>
                          <span className="text-[10px] font-mono font-bold text-[#695dd4] bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">ACTIVE</span>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700">Target Keyword Trigger:</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={targetKeyword}
                              onChange={(e) => setTargetKeyword(e.target.value.toUpperCase())}
                              className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-[#695dd4] outline-none focus:border-[#695dd4] w-36 uppercase"
                            />
                            <button
                              onClick={() => submitComment(targetKeyword)}
                              className="bg-[#695dd4] hover:bg-[#5a4ecb] text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                            >
                              <Zap className="w-3.5 h-3.5" /> Post "{targetKeyword}" Comment
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-200/60">
                          <label className="text-xs font-bold text-slate-700">Test Custom Comment:</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              placeholder="Type a custom comment..."
                              className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:border-[#695dd4]"
                              onKeyDown={(e) => e.key === "Enter" && submitComment(commentInput)}
                            />
                            <button
                              onClick={() => submitComment(commentInput)}
                              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Pipeline Flow Diagram */}
                      <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-3 shadow-xs">
                        <p className="text-xs font-bold text-slate-900 uppercase">Automation Pipeline Flow:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1">
                            <div className="text-[#695dd4] font-bold text-[10px] font-mono">STEP 1</div>
                            <p className="font-bold text-slate-800">User Comments</p>
                            <p className="text-[11px] text-slate-500">Listens for comment matching keyword "{targetKeyword}".</p>
                          </div>
                          <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1">
                            <div className="text-[#695dd4] font-bold text-[10px] font-mono">STEP 2</div>
                            <p className="font-bold text-slate-800">Auto Comment Reply</p>
                            <p className="text-[11px] text-slate-500">Public reply: "Check your DMs for the download!"</p>
                          </div>
                          <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1">
                            <div className="text-[#695dd4] font-bold text-[10px] font-mono">STEP 3</div>
                            <p className="font-bold text-[#695dd4]">Instant DM Pushed</p>
                            <p className="text-[11px] text-slate-600">Delivers resource link straight to private chat.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. THE FOLLOWER GATE CONTROLS */}
                  {currentFeature.tabName === "The Follower Gate" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-slate-500 uppercase">Graph API Follow Check</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isFollowing ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-500"}`}>
                            {isFollowing ? "STATE: FOLLOWING" : "STATE: NOT FOLLOWING"}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <p className="text-xs font-bold text-slate-700">Simulate Profile Follower State:</p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setIsFollowing(!isFollowing);
                                playSoundSample(actualSoundType);
                              }}
                              className={`flex-1 py-3 px-4 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${isFollowing
                                  ? "bg-slate-200 border-slate-300 text-slate-700"
                                  : "bg-[#0095f6] border-[#0095f6] text-white shadow-sm hover:bg-[#0081d6]"
                                }`}
                            >
                              <UserCheck className="w-4 h-4" />
                              {isFollowing ? "Simulate Unfollowing" : "Simulate Following @quickrevert_ai"}
                            </button>

                            <button
                              onClick={checkFollowStatus}
                              className="bg-[#695dd4] hover:bg-[#5a4ecb] text-white text-xs font-bold px-5 py-3 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                            >
                              <ShieldCheck className="w-4 h-4" /> Verify Gate Status
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Meta Graph API Verification Checklist */}
                      <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-3 shadow-xs">
                        <p className="text-xs font-bold text-slate-900 uppercase">Follow Verification Checklist:</p>
                        <div className="space-y-2.5 text-xs">
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                            <div className="flex items-center gap-2.5">
                              <CheckCircle2 className={`w-4 h-4 ${followCheckStep !== "initial" ? "text-emerald-500" : "text-slate-300"}`} />
                              <span className="font-semibold text-slate-700">1. User sends DM request for lead magnet</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-slate-400">PASSED</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                            <div className="flex items-center gap-2.5">
                              <CheckCircle2 className={`w-4 h-4 ${followCheckStep === "success" ? "text-emerald-500" : "text-slate-300"}`} />
                              <span className="font-semibold text-slate-700">2. Meta API confirms active follower check</span>
                            </div>
                            <span className={`text-[10px] font-mono font-bold ${isFollowing ? "text-emerald-600" : "text-red-500"}`}>
                              {isFollowing ? "VALIDATED" : "REQUIRES FOLLOW"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. CAROUSEL TARGETING CONTROLS */}
                  {currentFeature.tabName === "Carousel Targeting" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-[#695dd4] bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                            Slide Deck Cards (4 Slides Available)
                          </span>
                          <span className="text-xs font-bold text-slate-500">Active: Slide {selectedSlideIndex + 1}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CAROUSEL_CARDS.map((slide, index) => (
                            <div
                              key={slide.id}
                              onClick={() => {
                                setSelectedSlideIndex(index);
                                playSoundSample(actualSoundType);
                              }}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${selectedSlideIndex === index
                                  ? "border-[#695dd4] bg-white ring-2 ring-indigo-500/10 shadow-md"
                                  : "border-slate-200/80 bg-white hover:border-slate-300 opacity-90 hover:opacity-100"
                                }`}
                            >
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-bold text-slate-400">SLIDE {slide.id}</span>
                                <h4 className="text-xs font-bold text-slate-900">{slide.title}</h4>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{slide.desc}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSlideIndex(index);
                                  submitComment(slide.action);
                                }}
                                className="w-full py-2 bg-[#695dd4] hover:bg-[#5a4ecb] text-white text-[10px] font-mono font-bold rounded-xl uppercase transition cursor-pointer shadow-xs text-center"
                              >
                                Comment "{slide.action}"
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. ZERO-CLICK LEAD CAPTURE CONTROLS */}
                  {currentFeature.tabName === "Zero-Click Lead Capture" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-slate-700 uppercase">Live CRM Sync Dashboard</span>
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-full text-[10px] font-bold">
                            REAL-TIME DATABASE
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-3 border-b border-slate-200/60 pb-2">
                            <span className="font-bold text-slate-400 font-mono">NAME:</span>
                            <span className="col-span-2 font-bold text-slate-800">{leadForm.name || <span className="italic text-slate-350 font-normal">Awaiting input...</span>}</span>
                          </div>
                          <div className="grid grid-cols-3 border-b border-slate-200/60 pb-2">
                            <span className="font-bold text-slate-400 font-mono">EMAIL:</span>
                            <span className="col-span-2 font-bold text-slate-800">{leadForm.email || <span className="italic text-slate-350 font-normal">Awaiting input...</span>}</span>
                          </div>
                          <div className="grid grid-cols-3 pb-1">
                            <span className="font-bold text-slate-400 font-mono">PHONE:</span>
                            <span className="col-span-2 font-bold text-slate-800">{leadForm.phone || <span className="italic text-slate-350 font-normal">Awaiting input...</span>}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-indigo-50/50 border border-indigo-100 text-center text-xs font-semibold text-slate-700">
                          {leadStep < 4 ? "👉 Tap quick-reply buttons inside the phone DM chat to populate CRM records!" : "🎉 Contact lead successfully registered!"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. STORY INTERACTION HACK CONTROLS */}
                  {currentFeature.tabName === "Story Interaction Hack" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-slate-700 uppercase">Story Emoji Quick Reactions</span>
                          <span className="text-[10px] font-mono font-bold text-[#695dd4] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">LIVE LISTENER</span>
                        </div>

                        <p className="text-xs text-slate-600 font-medium">
                          Click any emoji below to simulate a fan reacting to your Instagram Story screen:
                        </p>

                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {["🔥", "💯", "❤️", "🙌", "😍", "⭐"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => tapStoryEmoji(emoji)}
                              className="py-3 bg-white border border-slate-200 hover:border-[#695dd4] hover:bg-indigo-50/50 rounded-2xl text-xl flex items-center justify-center transition cursor-pointer shadow-xs hover:scale-110"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. DM RESPONDER CONTROLS */}
                  {currentFeature.tabName === "DM Responder" && (
                    <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <span className="text-xs font-mono font-bold text-[#695dd4] bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase">
                          Guided Decision Tree Pathways
                        </span>
                        <p className="text-xs text-slate-600 font-medium">
                          Click option buttons below to test multi-branched customer service paths:
                        </p>

                        <div className="space-y-2.5 text-xs">
                          <button
                            onClick={() => handleResponderSelect("📅 Book Free Growth Audit", "Perfect choice! Find open slots on our calendar: calendly.com/quickrevert 📅")}
                            className="w-full text-left p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-[#695dd4] hover:bg-indigo-50/40 font-semibold shadow-xs transition cursor-pointer"
                          >
                            Pathway 1: 📅 Book Free Growth Audit
                          </button>
                          <button
                            onClick={() => handleResponderSelect("🎁 Access Free Resources Library", "Success! Here is the download folder link: drive.google.com/quickrevert-library 🎁")}
                            className="w-full text-left p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-[#695dd4] hover:bg-indigo-50/40 font-semibold shadow-xs transition cursor-pointer"
                          >
                            Pathway 2: 🎁 Access Free Resources Library
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {(currentFeature.tabName === "Live Stream Heat" || currentFeature.tabName === "Brain rot-free AI") && (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 text-center space-y-3">
                      <Sparkles className="w-8 h-8 text-[#695dd4] mx-auto animate-bounce" />
                      <h4 className="text-base font-display font-extrabold text-slate-900 uppercase">Module In Development</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
                        This channel is currently undergoing Meta Graph API compliance sandbox testing.
                      </p>
                    </div>
                  )}

                </div>

                {/* RIGHT PANE: HIGH-DENSITY IPHONE SMARTPHONE SIMULATOR (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col items-center">

                  {/* View Screen selector */}
                  <div className="w-full max-w-[310px] flex items-center justify-between mb-3 text-[10px] font-bold text-slate-500 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
                    <span className="ml-2 font-mono uppercase text-slate-400">View Screen:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setPhoneScreen('feed');
                          playSoundSample(actualSoundType);
                        }}
                        className={`px-2.5 py-1 rounded-xl border transition cursor-pointer ${phoneScreen === 'feed' ? "bg-white text-slate-900 border-slate-200 shadow-xs" : "bg-transparent border-transparent"}`}
                      >
                        Feed
                      </button>
                      <button
                        onClick={() => {
                          setPhoneScreen('dm');
                          playSoundSample(actualSoundType);
                        }}
                        className={`px-2.5 py-1 rounded-xl border transition cursor-pointer ${phoneScreen === 'dm' ? "bg-white text-slate-900 border-slate-200 shadow-xs" : "bg-transparent border-transparent"}`}
                      >
                        DMs
                      </button>
                      <button
                        onClick={() => {
                          setPhoneScreen('profile');
                          playSoundSample(actualSoundType);
                        }}
                        className={`px-2.5 py-1 rounded-xl border transition cursor-pointer ${phoneScreen === 'profile' ? "bg-white text-slate-900 border-slate-200 shadow-xs" : "bg-transparent border-transparent"}`}
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          setPhoneScreen('story');
                          playSoundSample(actualSoundType);
                        }}
                        className={`px-2.5 py-1 rounded-xl border transition cursor-pointer ${phoneScreen === 'story' ? "bg-white text-slate-900 border-slate-200 shadow-xs" : "bg-transparent border-transparent"}`}
                      >
                        Story
                      </button>
                    </div>
                  </div>

                  {/* iPhone Shell */}
                  <div className="border-[10px] border-slate-900 rounded-[42px] shadow-2xl relative overflow-hidden bg-black aspect-[9/18.5] w-full max-w-[310px] flex flex-col select-none">

                    {/* Notch */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-black rounded-full z-30" />

                    {/* Status bar */}
                    <div className="bg-black text-white text-[8px] font-mono px-5 pt-3 pb-1 flex justify-between items-center z-25 relative">
                      <span className="font-bold">9:41</span>
                      <div className="flex items-center gap-1">
                        <span>LTE</span>
                        <div className="w-4 h-2 border border-white/60 rounded-xs relative p-0.5 flex items-center">
                          <div className="h-full bg-white rounded-2xs w-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* Inner Instagram Screen */}
                    <div className="flex-1 bg-white relative flex flex-col overflow-hidden text-left text-black">

                      {/* Push Notification */}
                      <AnimatePresence>
                        {notification && (
                          <motion.div
                            initial={{ opacity: 0, y: -80 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -80 }}
                            onClick={() => {
                              setPhoneScreen('dm');
                              setNotification(null);
                            }}
                            className="absolute top-2 inset-x-2 z-40 bg-white/95 border border-slate-200 p-2.5 rounded-xl shadow-lg flex items-start gap-2 backdrop-blur-md cursor-pointer hover:bg-slate-50 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#695dd4] flex items-center justify-center font-mono text-[9px] font-bold text-white shrink-0">Q</div>
                            <div className="flex-1 min-w-0 text-[10px] font-bold">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-800">@{notification.sender}</span>
                                <span className="text-[8px] text-slate-400 font-semibold">now</span>
                              </div>
                              <p className="text-slate-500 font-medium leading-tight mt-0.5 truncate">{notification.text}</p>
                              <p className="text-[8px] text-[#695dd4] font-bold mt-1">Tap to open DM thread →</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 1. FEED SCREEN */}
                      {phoneScreen === 'feed' && (
                        <div className="flex-1 flex flex-col justify-between bg-white">
                          <div className="px-3.5 py-2 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                            <span className="font-display font-[800] text-[11px] tracking-widest text-[#1b1b1b] uppercase">Instagram</span>
                            <Send className="w-3.5 h-3.5 text-slate-700" />
                          </div>

                          <div className="flex-1 flex flex-col justify-start overflow-y-auto scrollbar-none">
                            <div className="px-3 py-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#695dd4] flex items-center justify-center font-mono text-[8px] font-bold text-white">Q</div>
                                <div>
                                  <p className="text-[9px] font-black text-slate-900 leading-none">quickrevert_ai</p>
                                  <p className="text-[7px] text-slate-400 mt-0.5">Sponsored</p>
                                </div>
                              </div>
                              <MoreHorizontal className="w-4 h-4 text-slate-500" />
                            </div>

                            {currentFeature.tabName === "Carousel Targeting" ? (
                              <div className="relative bg-slate-950 aspect-square w-full flex flex-col justify-between overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${CAROUSEL_CARDS[selectedSlideIndex].bg} opacity-90`} />

                                <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-5 text-center text-white">
                                  <span className="text-[7px] font-mono font-bold tracking-widest text-pink-300 uppercase">SLIDE {selectedSlideIndex + 1}/4</span>
                                  <h4 className="text-xs font-display font-black uppercase mt-1 tracking-tight leading-tight">{CAROUSEL_CARDS[selectedSlideIndex].title}</h4>
                                  <p className="text-[9px] text-white/80 font-medium leading-relaxed mt-1">{CAROUSEL_CARDS[selectedSlideIndex].desc}</p>
                                </div>

                                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1 z-15">
                                  {CAROUSEL_CARDS.map((_, idx) => (
                                    <div
                                      key={idx}
                                      className={`w-1.5 h-1.5 rounded-full ${selectedSlideIndex === idx ? "bg-white" : "bg-white/40"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="relative bg-slate-950 aspect-square w-full flex flex-col justify-center items-center text-center p-5 text-white">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-indigo-900" />
                                <div className="relative z-10 space-y-1">
                                  <Sparkle className="w-6 h-6 text-yellow-300 animate-spin mx-auto" />
                                  <h4 className="text-xs font-display font-black tracking-tight uppercase leading-none">FREE ACCELERATOR GUIDE</h4>
                                  <p className="text-[9px] text-white/80 font-semibold leading-relaxed">
                                    Comment <span className="bg-[#695dd4] text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase ml-0.5">{targetKeyword}</span> to trigger!
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="px-3 py-2 flex justify-between items-center">
                              <div className="flex gap-3">
                                <Heart className="w-4 h-4 text-slate-800 cursor-pointer" />
                                <MessageSquare onClick={() => setCommentsOpen(!commentsOpen)} className="w-4 h-4 text-slate-800 cursor-pointer" />
                                <Send className="w-4 h-4 text-slate-800 cursor-pointer" />
                              </div>
                              <Bookmark className="w-4 h-4 text-slate-800 cursor-pointer" />
                            </div>

                            <div className="px-3 text-[9px] font-semibold leading-relaxed">
                              <p><span className="font-black">quickrevert_ai</span> Fire up your organic lead engines in 1-click today!</p>
                            </div>
                          </div>

                          {/* COMMENTS OVERLAY */}
                          <AnimatePresence>
                            {commentsOpen && (
                              <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl z-20 shadow-lg max-h-[82%] flex flex-col text-[10px]"
                              >
                                <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center shrink-0">
                                  <span className="font-bold text-slate-800">Comments</span>
                                  <button onClick={() => setCommentsOpen(false)} className="text-slate-400 font-bold">Close</button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                                  {multiplierComments.map((cmt, idx) => (
                                    <div key={idx} className="flex gap-2 items-start text-left leading-normal border-b border-slate-50 pb-1.5">
                                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center font-mono font-bold text-[7px] shrink-0">
                                        {cmt.sender[0].toUpperCase()}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-black text-slate-900">@{cmt.sender}</p>
                                        <p className="text-slate-650 font-medium mt-0.5">{cmt.text}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="border-t border-slate-100 p-2.5 bg-slate-50 shrink-0 flex gap-1.5 items-center">
                                  <input
                                    type="text"
                                    value={commentInput}
                                    onChange={(e) => setCommentInput(e.target.value)}
                                    placeholder="Add comment..."
                                    className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1 text-[9px] outline-none font-medium text-slate-800"
                                    onKeyDown={(e) => e.key === "Enter" && submitComment(commentInput)}
                                  />
                                  <button onClick={() => submitComment(commentInput)} className="text-[#695dd4] font-bold text-[9px]">Post</button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* 2. INSTAGRAM DM SCREEN */}
                      {phoneScreen === 'dm' && (
                        <div className="flex-1 flex flex-col justify-between bg-white">
                          <div className="px-3.5 py-2 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                            <div className="flex items-center gap-2">
                              <button onClick={() => setPhoneScreen('feed')}>
                                <ChevronLeft className="w-4 h-4 text-slate-850" />
                              </button>
                              <div
                                onClick={() => setPhoneScreen('profile')}
                                className="w-6 h-6 rounded-full bg-[#695dd4] flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-xs cursor-pointer shrink-0"
                              >
                                Q
                              </div>
                              <div onClick={() => setPhoneScreen('profile')} className="cursor-pointer">
                                <p className="text-[9px] font-black text-slate-900 leading-none">quickrevert_ai</p>
                                <p className="text-[7px] text-emerald-600 font-mono font-bold mt-0.5">Active</p>
                              </div>
                            </div>
                            <MoreHorizontal className="w-4 h-4 text-slate-500" />
                          </div>

                          <div className="flex-1 overflow-y-auto p-3.5 space-y-2.5 flex flex-col">
                            {currentFeature.tabName === "Comment Multiplier" && (
                              multiplierDMs.length === 0 ? (
                                <div className="text-center py-10 text-[9px] font-semibold text-slate-400 italic leading-relaxed">
                                  Post comment "{targetKeyword}" on the Feed screen to trigger DM sequence!
                                </div>
                              ) : (
                                multiplierDMs.map((dm, idx) => (
                                  <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                        ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                        : "bg-[#efefef] text-slate-800 border-slate-100"
                                      }`}>
                                      {dm.text}
                                    </div>
                                  </div>
                                ))
                              )
                            )}

                            {currentFeature.tabName === "The Follower Gate" && (
                              gateDMs.map((dm, idx) => (
                                <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                  <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                      ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                      : "bg-[#efefef] text-slate-800 border-slate-100"
                                    }`}>
                                    {dm.text}
                                  </div>
                                </div>
                              ))
                            )}

                            {currentFeature.tabName === "Carousel Targeting" && (
                              carouselDMs.length === 0 ? (
                                <div className="text-center py-10 text-[9px] font-semibold text-slate-400 italic">
                                  Swipe carousel slides on Feed to view slide-specific DM delivery.
                                </div>
                              ) : (
                                carouselDMs.map((dm, idx) => (
                                  <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                        ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                        : "bg-[#efefef] text-slate-800 border-slate-100"
                                      }`}>
                                      {dm.text}
                                    </div>
                                  </div>
                                ))
                              )
                            )}

                            {currentFeature.tabName === "Zero-Click Lead Capture" && (
                              leadChat.map((dm, idx) => (
                                <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                  <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                      ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                      : "bg-[#efefef] text-slate-800 border-slate-100"
                                    }`}>
                                    {dm.text}
                                  </div>
                                </div>
                              ))
                            )}

                            {currentFeature.tabName === "Story Interaction Hack" && (
                              storyDMs.length === 0 ? (
                                <div className="text-center py-10 text-[9px] font-semibold text-slate-400 italic">
                                  React to Story on the Story view screen to open auto-reply DM.
                                </div>
                              ) : (
                                storyDMs.map((dm, idx) => (
                                  <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                        ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                        : "bg-[#efefef] text-slate-800 border-slate-100"
                                      }`}>
                                      {dm.text}
                                    </div>
                                  </div>
                                ))
                              )
                            )}

                            {currentFeature.tabName === "DM Responder" && (
                              responderDMs.map((dm, idx) => (
                                <div key={idx} className={`flex ${dm.sender === "user" ? "justify-end" : "justify-start"}`}>
                                  <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-[9px] font-semibold border shadow-xs leading-normal ${dm.sender === "user"
                                      ? "bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] text-white border-transparent"
                                      : "bg-[#efefef] text-slate-800 border-slate-100"
                                    }`}>
                                    {dm.text}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Quick replies bar */}
                          <div className="px-3.5 py-1.5 bg-white border-t border-slate-100 shrink-0 flex flex-wrap gap-1.5">
                            {currentFeature.tabName === "The Follower Gate" && followCheckStep === "failed" && (
                              <button
                                onClick={() => {
                                  setIsFollowing(true);
                                  setFollowCheckStep("following");
                                  playSoundSample(actualSoundType);
                                }}
                                className="bg-[#0095f6] text-white text-[8px] font-bold px-2.5 py-1 rounded-full cursor-pointer"
                              >
                                Follow @quickrevert_ai
                              </button>
                            )}
                            {currentFeature.tabName === "The Follower Gate" && followCheckStep === "following" && (
                              <button
                                onClick={() => {
                                  setFollowCheckStep("verifying");
                                  playSoundSample(actualSoundType);
                                  setTimeout(() => {
                                    setFollowCheckStep("success");
                                    setGateDMs((prev) => [
                                      ...prev,
                                      { sender: "user", text: "Verify follow status" },
                                      { sender: "bot", text: "Follow check verified! Code unlocked: VERIFIED50! ✅" }
                                    ]);
                                  }, 1500);
                                }}
                                className="bg-emerald-500 text-white text-[8px] font-bold px-2.5 py-1 rounded-full cursor-pointer"
                              >
                                ⚡ VERIFY FOLLOW NOW
                              </button>
                            )}

                            {currentFeature.tabName === "Zero-Click Lead Capture" && (
                              leadStep === 1 ? (
                                <button
                                  onClick={() => handleLeadInput("Annie Rohatgi ✍️", "name")}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[8px] font-bold px-2.5 py-1.5 rounded-full cursor-pointer"
                                >
                                  Send Name: "Annie Rohatgi"
                                </button>
                              ) : leadStep === 2 ? (
                                <button
                                  onClick={() => handleLeadInput("annierohatgi13@gmail.com 📧", "email")}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[8px] font-bold px-2.5 py-1.5 rounded-full cursor-pointer"
                                >
                                  Send Email: "annierohatgi13@gmail.com"
                                </button>
                              ) : leadStep === 3 ? (
                                <button
                                  onClick={() => handleLeadInput("+91 98765 43210 📱", "phone")}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[8px] font-bold px-2.5 py-1.5 rounded-full cursor-pointer"
                                >
                                  Send Phone: "+91 98765"
                                </button>
                              ) : null
                            )}

                            {currentFeature.tabName === "DM Responder" && responderDMs.length === 1 && (
                              <>
                                <button
                                  onClick={() => handleResponderSelect("📅 Book Free Growth Audit", "Perfect choice! Find calendar slots: calendly.com/quickrevert 📅")}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[8px] font-bold px-2 py-1 rounded-full cursor-pointer"
                                >
                                  📅 Book Free Audit
                                </button>
                                <button
                                  onClick={() => handleResponderSelect("🎁 Access Free Resources Library", "Success! Folder link: drive.google.com/quickrevert-library 🎁")}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[8px] font-bold px-2 py-1 rounded-full cursor-pointer"
                                >
                                  🎁 Free Resources
                                </button>
                              </>
                            )}
                          </div>

                          <div className="border-t border-slate-100 p-2 bg-white shrink-0 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-slate-600" />
                            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 flex items-center justify-between text-[8px] font-medium text-slate-400">
                              <span>Message...</span>
                              <Mic className="w-3 h-3 text-slate-600" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. PROFILE SCREEN */}
                      {phoneScreen === 'profile' && (
                        <div className="flex-1 flex flex-col justify-start bg-white overflow-y-auto scrollbar-none">
                          <div className="px-3.5 py-2 border-b border-slate-100 flex justify-between items-center">
                            <button onClick={() => setPhoneScreen('dm')}>
                              <ChevronLeft className="w-4 h-4 text-slate-800" />
                            </button>
                            <span className="font-bold text-[10px] text-slate-800">quickrevert_ai</span>
                            <MoreHorizontal className="w-4 h-4 text-slate-650" />
                          </div>

                          <div className="p-3.5 flex items-center justify-between gap-2.5">
                            <div className="w-12 h-12 rounded-full bg-[#695dd4] flex items-center justify-center font-mono text-sm font-black text-white shrink-0">Q</div>
                            <div className="flex-1 flex justify-around text-center text-[10px]">
                              <div>
                                <p className="font-black text-slate-900">42</p>
                                <p className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Posts</p>
                              </div>
                              <div>
                                <p className="font-black text-slate-900">14.8K</p>
                                <p className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Followers</p>
                              </div>
                              <div>
                                <p className="font-black text-slate-900">312</p>
                                <p className="text-[7px] text-slate-400 font-bold uppercase mt-0.5">Following</p>
                              </div>
                            </div>
                          </div>

                          <div className="px-3.5 text-[9px] text-left leading-normal font-semibold">
                            <p className="font-black text-slate-900">QuickRevert | DM Automation</p>
                            <p className="text-slate-400 font-bold">Software Company</p>
                            <p className="text-slate-650 mt-1">Turn comments & stories into sales. 🚀 100% Meta compliant.</p>
                          </div>

                          <div className="px-3.5 py-3 flex gap-2">
                            <button
                              onClick={() => {
                                setIsFollowing(!isFollowing);
                                playSoundSample(actualSoundType);
                              }}
                              className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold text-center border cursor-pointer transition ${isFollowing
                                  ? "bg-slate-100 border-slate-200 text-slate-700"
                                  : "bg-[#0095f6] border-[#0095f6] text-white shadow-xs"
                                }`}
                            >
                              {isFollowing ? "Following" : "Follow"}
                            </button>
                            <button
                              onClick={() => setPhoneScreen('dm')}
                              className="flex-1 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-[9px] text-slate-700 font-bold text-center cursor-pointer"
                            >
                              Message
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-0.5 bg-slate-100 pt-0.5 flex-1">
                            {[1, 2, 3, 4, 5, 6].map((val) => (
                              <div key={val} className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                <Instagram className="w-3.5 h-3.5 text-slate-350" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 4. STORY SCREEN */}
                      {phoneScreen === 'story' && (
                        <div className="flex-1 flex flex-col justify-between bg-black relative p-3">
                          <div className="flex gap-1 absolute top-2 inset-x-3.5 z-10">
                            <div className="flex-1 h-0.5 bg-white/20 rounded overflow-hidden">
                              <div className="h-full bg-white transition-all duration-100" style={{ width: `${storyProgress}%` }} />
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3 relative z-10">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5.5 h-5.5 rounded-full bg-[#695dd4] flex items-center justify-center font-mono text-[7px] font-bold text-white border border-slate-700">Q</div>
                              <span className="text-[8px] font-bold text-white leading-none">quickrevert_ai</span>
                              <span className="text-[7px] text-white/50">4h</span>
                            </div>
                            <button onClick={() => setPhoneScreen('dm')} className="text-white">X</button>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-900 flex flex-col items-center justify-center p-6 text-center text-white">
                            <div className="p-3.5 bg-white/10 border border-white/15 rounded-2xl backdrop-blur-md max-w-[170px] space-y-1.5">
                              <span className="text-[8px] font-black text-amber-300 tracking-widest uppercase">FREE MASTERCLASS</span>
                              <p className="text-[9px] font-semibold leading-relaxed text-white/90">
                                Tap an emoji quick reaction below to trigger automated DM delivery! 👇
                              </p>
                            </div>
                          </div>

                          <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {floatingEmojis.map((e) => (
                              <motion.span
                                key={e.id}
                                initial={{ opacity: 1, y: 320, scale: 0.8 }}
                                animate={{ opacity: 0, y: 50, scale: 2.5, rotate: [-10, 10, -10] }}
                                transition={{ duration: 1.8, ease: "easeOut" }}
                                className="absolute text-xl z-30"
                                style={{ left: `${e.left}%` }}
                              >
                                {e.char}
                              </motion.span>
                            ))}
                          </div>

                          <div className="relative z-10 space-y-3.5">
                            <div className="flex justify-between bg-black/40 border border-white/10 p-2.5 rounded-xl backdrop-blur-md">
                              {["🔥", "💯", "❤️", "🙌", "😍", "⭐"].map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => tapStoryEmoji(emoji)}
                                  className="text-base hover:scale-130 active:scale-90 transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                            <div className="flex gap-2.5 items-center">
                              <div className="flex-1 border border-white/20 bg-white/10 rounded-full px-3.5 py-1.5 text-[9px] text-white/50 font-medium">
                                Send message...
                              </div>
                              <Send className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

              </div>

              {/* MODAL FOOTER BAR */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-between shrink-0 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#695dd4]" /> 100% Meta Graph API Safe & Compliant
                </span>

                <button
                  onClick={() => setActiveModalFeature(null)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl transition cursor-pointer shadow-xs"
                >
                  Close Sandbox
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 lg:px-8 mt-12 text-left shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-semibold max-w-xl">
            © 2026 QuickRevert. Powered by Meta Graph API. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono font-bold bg-indigo-50 text-[#695dd4] border border-indigo-100 px-2.5 py-1 rounded-full shadow-xs">
              🛡️ Meta Verified Client
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
