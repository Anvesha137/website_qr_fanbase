import React, { useState, useRef } from 'react';
import { 
  ChevronDown, Menu, X, Globe, Users, BookOpen, HelpCircle,
  Zap, MessageSquare, Instagram, UserPlus, LayoutGrid, Sliders, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  viewMode: 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing';
  setViewMode: (mode: 'landing' | 'link-in-bio' | 'features' | 'slots' | 'pricing') => void;
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
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);
  const [affiliateForm, setAffiliateForm] = useState({ name: '', email: '', promoPlan: '' });
  const [affiliateSubmitted, setAffiliateSubmitted] = useState(false);

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
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-[1440px] rounded-2xl border border-white/25 bg-white/95 shadow-lg backdrop-blur-md transition-all duration-300">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <div
              onClick={() => setViewMode('landing')}
              className="flex cursor-pointer items-center space-x-1"
              id="navbar-logo"
            >
              <img src="/Logo_optimized.png" className="h-11 w-11 object-contain" alt="QuickRevert Logo" />
              <span className="font-manrope font-bold text-2xl tracking-tight text-[#1b1b1b]">
                QuickRevert
              </span>
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8">

              {/* Pricing */}
              <button
                onClick={() => setViewMode('pricing')}
                className="text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors"
              >
                Pricing
              </button>

              {/* Features */}
              <div
                className="relative"
                onMouseEnter={() => handleEnter('features')}
                onMouseLeave={() => handleLeave('features')}
              >
                <button className="flex items-center space-x-1 text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors">
                  <span>Features</span>
                  <ChevronDown className={`h-4 w-4 opacity-60 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} />
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

              {/* Affiliate */}
              <button
                onClick={() => {
                  setAffiliateSubmitted(false);
                  setAffiliateForm({ name: '', email: '', promoPlan: '' });
                  setShowAffiliateModal(true);
                }}
                className="text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors"
              >
                Affiliate
              </button>

              {/* Help */}
              <button
                onClick={() => scrollToSection('faq')}
                className="text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] transition-colors"
              >
                Help
              </button>
            </div>

            {/* Right: Get Started Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setViewMode(viewMode === 'features' ? 'landing' : 'features')}
                className="rounded-xl bg-[#695dd4] hover:bg-[#5a50c6] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                id="nav-get-started-btn"
              >
                {viewMode === 'features' ? 'Exit Sandbox' : 'Get Started'}
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
                    setMobileMenuOpen(false);
                    setViewMode('pricing');
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Pricing
                </button>
                <button
                  onClick={() => {
                    setViewMode('features');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAffiliateSubmitted(false);
                    setAffiliateForm({ name: '', email: '', promoPlan: '' });
                    setShowAffiliateModal(true);
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Affiliate
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection('faq');
                  }}
                  className="block w-full text-left text-base font-semibold text-[#1b1b1b]/70 hover:text-[#1b1b1b] py-1"
                >
                  Help
                </button>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setViewMode(viewMode === 'features' ? 'landing' : 'features');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#695dd4] hover:bg-[#5a50c6] text-white rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  {viewMode === 'features' ? 'Exit Sandbox' : 'Get Started'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Affiliate Modal */}
      <AnimatePresence>
        {showAffiliateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-left relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowAffiliateModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {!affiliateSubmitted ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#695dd4]/10 border border-[#695dd4]/20 text-[#695dd4] text-xs font-bold mb-4 select-none">
                    <span>🤝 Partner Program</span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 leading-tight">
                    QuickRevert Affiliate Program
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-2">
                    Partner with us and earn <strong className="text-slate-900">30% recurring lifetime commission</strong> for every creator or brand you refer.
                  </p>

                  <div className="my-6 space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg leading-none mt-0.5">💰</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">30% Recurring Commission</p>
                        <p className="text-[11px] text-slate-500 leading-normal">Earn monthly payouts for as long as your referred customers stay active.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg leading-none mt-0.5">📈</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Partner Dashboard</p>
                        <p className="text-[11px] text-slate-500 leading-normal">Real-time stats on your link clicks, conversions, and upcoming payouts.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg leading-none mt-0.5">⚡</span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">Dedicated Support</p>
                        <p className="text-[11px] text-slate-500 leading-normal">Marketing assets, swipe copies, and direct access to our team to help you succeed.</p>
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setAffiliateSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={affiliateForm.name}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#695dd4] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={affiliateForm.email}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#695dd4] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        How do you plan to promote QuickRevert?
                      </label>
                      <textarea
                        required
                        value={affiliateForm.promoPlan}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, promoPlan: e.target.value })}
                        placeholder="e.g. Social media channels, newsletter, blog reviews..."
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:border-[#695dd4] transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-3 rounded-xl bg-[#695dd4] hover:bg-[#5a50c6] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl mb-4 select-none">
                    🎉
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-900 leading-tight">
                    Application Submitted!
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
                    Thank you for applying, <strong className="text-slate-800">{affiliateForm.name}</strong>! We've received your request to join the program at <strong className="text-slate-800">{affiliateForm.email}</strong>.
                  </p>
                  <p className="text-slate-400 text-xs font-medium mt-2 leading-relaxed">
                    Our partner manager will review your details and send you an email with your affiliate portal setup and custom referral link within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setShowAffiliateModal(false)}
                    className="mt-8 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 text-sm font-bold transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
}
