import React, { useState, useRef } from 'react';
import { 
  ChevronDown, Menu, X, Globe, Users, BookOpen, HelpCircle,
  Zap, MessageSquare, Instagram, UserPlus, LayoutGrid, Sliders, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  viewMode: 'landing' | 'link-in-bio' | 'features' | 'slots';
  setViewMode: (mode: 'landing' | 'link-in-bio' | 'features' | 'slots') => void;
  onSelectFeature?: (featureId: string) => void;
}

const triggersItems = [
  {
    icon: Zap,
    title: 'AutoDM',
    desc: 'Send instant, automated direct messages to active chats',
    id: 'autodm',
  },
  {
    icon: MessageSquare,
    title: 'Comment to DM',
    desc: 'Automatically message anyone who comments a keyword',
    id: 'comment-to-dm',
  },
  {
    icon: Instagram,
    title: 'Story Interactions',
    desc: 'Instantly reply to story replies, mentions, and reactions',
    id: 'story-interactions',
  },
];

const featuresItems = [
  {
    icon: UserPlus,
    title: 'Ask to Follow',
    desc: 'Verify follow status before delivering download links or codes',
    id: 'ask-to-follow',
  },
  {
    icon: LayoutGrid,
    title: 'Carousel Cards',
    desc: 'Display interactive multi-card carousels inside the chat',
    id: 'carousel-cards',
  },
  {
    icon: Sliders,
    title: 'Menu Flow',
    desc: 'Build guide menus with options to direct customers',
    id: 'menu-flow',
  },
  {
    icon: Users,
    title: 'Lead Manager',
    desc: 'Store, tag, and export contacts captured via automations',
    id: 'lead-manager',
  },
];

const otherProducts = [
  {
    icon: Globe,
    title: 'Link-in-Bio - My Store',
    desc: 'Create a free, custom link-in-bio page displaying your products',
    id: 'link-in-bio',
  },
  {
    icon: Calendar,
    title: '1:1 Appointments - My Slots',
    desc: 'Let users book slots and meetings directly through chat messages',
    id: 'slots',
  },
];

const resourcesItems = [
  {
    icon: BookOpen,
    title: 'Blog',
    desc: 'Playbooks, research, product updates',
  },
  {
    icon: HelpCircle,
    title: 'Help center',
    desc: 'Docs, FAQ and guides',
  },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.12 } },
};


export default function Navbar({ viewMode, setViewMode, onSelectFeature }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'resources' | null>(null);

  const featuresTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (key: 'features' | 'resources') => {
    if (key === 'features') {
      if (featuresTimeout.current) clearTimeout(featuresTimeout.current);
    } else {
      if (resourcesTimeout.current) clearTimeout(resourcesTimeout.current);
    }
    setActiveDropdown(key);
  };

  const handleLeave = (key: 'features' | 'resources') => {
    const ref = key === 'features' ? featuresTimeout : resourcesTimeout;
    ref.current = setTimeout(() => {
      setActiveDropdown((prev) => (prev === key ? null : prev));
    }, 120);
  };

  const scrollToSection = (id: string) => {
    setViewMode('landing');
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="absolute top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/25 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div
              onClick={() => setViewMode('landing')}
              className="flex cursor-pointer items-center space-x-2"
              id="navbar-logo"
            >
              <img src="/Logo_optimized.png" className="h-6 w-6 object-contain" alt="QuickRevert Logo" />
              <span className="font-display font-[800] text-lg tracking-wider text-[#1b1b1b] uppercase">
                QUICKREVERT
              </span>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8">

              {/* Features */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter('features')}
                onMouseLeave={() => handleLeave('features')}
              >
                <button className="flex items-center space-x-1 text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors">
                  <span>Features</span>
                  <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'features' && (
                    <motion.div
                      key="features-dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 overflow-y-auto max-h-[80vh] scrollbar-thin"
                      onMouseEnter={() => handleEnter('features')}
                      onMouseLeave={() => handleLeave('features')}
                    >
                      {/* Triggers Section */}
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 mb-1.5">
                          Triggers
                        </p>
                        <div className="space-y-0.5">
                          {triggersItems.map((item) => (
                            <button
                              key={item.title}
                              onClick={() => {
                                setViewMode('features');
                                setActiveDropdown(null);
                                if (onSelectFeature) {
                                  onSelectFeature(item.id);
                                }
                              }}
                              className="w-full flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                            >
                              <div className="h-8 w-8 rounded-lg bg-[#e8e6fc] flex items-center justify-center shrink-0 mt-0.5">
                                <item.icon className="h-4 w-4 text-[#695dd4]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-[#1b1b1b] group-hover:text-[#695dd4] transition-colors">
                                  {item.title}
                                </span>
                                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Features Section */}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 mb-1.5">
                          Features
                        </p>
                        <div className="space-y-0.5">
                          {featuresItems.map((item) => (
                            <button
                              key={item.title}
                              onClick={() => {
                                setViewMode('features');
                                setActiveDropdown(null);
                                if (onSelectFeature) {
                                  onSelectFeature(item.id);
                                }
                              }}
                              className="w-full flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                            >
                              <div className="h-8 w-8 rounded-lg bg-[#e8e6fc] flex items-center justify-center shrink-0 mt-0.5">
                                <item.icon className="h-4 w-4 text-[#695dd4]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-[#1b1b1b] group-hover:text-[#695dd4] transition-colors">
                                  {item.title}
                                </span>
                                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Other Products Section */}
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-3 mb-1.5">
                          Other Products
                        </p>
                        <div className="space-y-0.5">
                          {otherProducts.map((item) => (
                            <button
                              key={item.title}
                              onClick={() => {
                                if (item.id === 'link-in-bio') {
                                  setViewMode('link-in-bio');
                                } else if (item.id === 'slots') {
                                  setViewMode('slots');
                                }
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                            >
                              <div className="h-8 w-8 rounded-lg bg-[#e8e6fc] flex items-center justify-center shrink-0 mt-0.5">
                                <item.icon className="h-4 w-4 text-[#695dd4]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-[#1b1b1b] group-hover:text-[#695dd4] transition-colors">
                                  {item.title}
                                </span>
                                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter('resources')}
                onMouseLeave={() => handleLeave('resources')}
              >
                <button className="flex items-center space-x-1 text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors">
                  <span>Resources</span>
                  <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'resources' && (
                    <motion.div
                      key="resources-dropdown"
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50"
                      onMouseEnter={() => handleEnter('resources')}
                      onMouseLeave={() => handleLeave('resources')}
                    >
                      <div className="space-y-1">
                        {resourcesItems.map((item) => (
                          <button
                            key={item.title}
                            onClick={() => scrollToSection('stay-for-rest')}
                            className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                          >
                            <div className="h-9 w-9 rounded-xl bg-[#f0edfc] flex items-center justify-center shrink-0 mt-0.5">
                              <item.icon className="h-4.5 w-4.5 text-[#695dd4]" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1b1b1b] group-hover:text-[#695dd4] transition-colors mb-0.5">
                                {item.title}
                              </p>
                              <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors"
              >
                Pricing
              </button>

              {/* FAQ */}
              <button
                onClick={() => scrollToSection('faq')}
                className="text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors"
              >
                FAQ
              </button>
            </div>

            {/* Right: Sandbox Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setViewMode(viewMode === 'features' ? 'landing' : 'features')}
                className="rounded-xl bg-[#695dd4] hover:bg-[#5a50c6] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                id="nav-login-btn"
              >
                {viewMode === 'features' ? 'Exit Sandbox' : 'Sandbox Mode'}
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-50 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-slate-100 px-6 py-4 md:hidden space-y-4 bg-white rounded-b-2xl text-left"
            >
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setViewMode('features');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Features Simulator
                </button>
                <button
                  onClick={() => {
                    setViewMode('link-in-bio');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Link-in-Bio Store
                </button>
                <button
                  onClick={() => {
                    setViewMode('slots');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  1:1 Appointments
                </button>
                {['Pricing', 'FAQ'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left text-sm font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setViewMode(viewMode === 'features' ? 'landing' : 'features');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#695dd4] hover:bg-[#5a50c6] text-white rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  {viewMode === 'features' ? 'Exit Sandbox' : 'Sandbox Mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
}
