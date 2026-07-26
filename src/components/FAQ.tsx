import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Wrench, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  X, 
  ChevronRight,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Sub-component: Step Badge
const StepBadge = ({ num }: { num: number | string }) => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#695dd4]/10 text-xs font-bold text-[#695dd4]">
    {num}
  </span>
);

// Sub-component: Breadcrumbs / Flow UI
const FlowPath = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-wrap items-center gap-1.5 my-2">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
        <span className="rounded-lg bg-slate-100 border border-slate-200/60 px-2.5 py-1 text-xs font-bold text-slate-800 font-mono">
          {step}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// Sub-component: Step Guide
const StepGuide = ({ steps }: { steps: React.ReactNode[] }) => (
  <ol className="space-y-3.5 mt-3 pl-1">
    {steps.map((step, idx) => (
      <li key={idx} className="flex items-start gap-3">
        <StepBadge num={idx + 1} />
        <div className="text-slate-600 font-medium text-sm sm:text-base mt-0.5 leading-relaxed">{step}</div>
      </li>
    ))}
  </ol>
);

// Sub-component: Warning Box
const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50/70 p-4 text-rose-900 text-sm">
    <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
    <div className="font-semibold leading-relaxed">{children}</div>
  </div>
);

// Sub-component: Instagram Professional Account Check Guide
const SwitchAccountGuide = () => (
  <div className="mt-4 border border-slate-200/80 rounded-2xl p-5 bg-white/60 space-y-4 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-green-100 bg-green-50/40 rounded-xl p-4">
        <h4 className="font-bold text-green-800 text-sm sm:text-base mb-2.5 flex items-center gap-2">
          <CheckCircle2 className="h-4.5 w-4.5 text-green-600" />
          Supported Accounts
        </h4>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-4 font-medium">
          <li><strong>Business Account</strong> (Highly recommended)</li>
          <li><strong>Creator Account</strong></li>
        </ul>
      </div>
      <div className="border border-red-100 bg-red-50/40 rounded-xl p-4">
        <h4 className="font-bold text-red-800 text-sm sm:text-base mb-2.5 flex items-center gap-2">
          <XCircle className="h-4.5 w-4.5 text-red-600" />
          Unsupported Accounts
        </h4>
        <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc pl-4 font-medium">
          <li><strong>Personal Instagram accounts</strong> (restricted by Meta)</li>
        </ul>
      </div>
    </div>
    <div className="pt-3.5 border-t border-slate-200/60 text-xs sm:text-sm text-slate-500 font-medium">
      <span className="font-bold text-slate-800">To switch account type:</span>
      <div className="mt-2">
        <FlowPath steps={["Instagram App", "Settings", "Account (or Creator tools)", "Switch to Professional Account"]} />
      </div>
    </div>
  </div>
);

// Sub-component: Troubleshooting Guide for Automations
const TroubleshootGuide = () => (
  <div className="space-y-4 mt-4">
    <div className="border border-slate-200/80 rounded-2xl p-5 bg-white/60 space-y-3.5 shadow-sm">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs font-extrabold text-[#695dd4]">1</span>
        Reason 1: Automation is Turned Off
      </h4>
      <p className="text-xs sm:text-sm text-slate-600 pl-8.5 font-medium">
        Ensure your automation is enabled inside the dashboard:
      </p>
      <div className="pl-8.5">
        <FlowPath steps={["Menu", "Automations", "Click on specific automation", "Activate Automation"]} />
      </div>
    </div>

    <div className="border border-slate-200/80 rounded-2xl p-5 bg-white/60 space-y-3.5 shadow-sm">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs font-extrabold text-[#695dd4]">2</span>
        Reason 2: Instagram is Disconnected
      </h4>
      <p className="text-xs sm:text-sm text-slate-600 pl-8.5 font-medium">
        Check the connection status and refresh your authentication token:
      </p>
      <div className="pl-8.5">
        <FlowPath steps={["Menu button", "My Account", "Under Connected Accounts", "Click Connect (or Refresh Token)"]} />
      </div>
    </div>

    <div className="border border-slate-200/80 rounded-2xl p-5 bg-white/60 space-y-3.5 shadow-sm">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-xs font-extrabold text-[#695dd4]">3</span>
        Reason 3: Monthly Contact Limit Reached
      </h4>
      <p className="text-xs sm:text-sm text-slate-600 pl-8.5 font-medium">
        If you exceed your plan's monthly contact limit, automations pause automatically:
      </p>
      <div className="pl-8.5 space-y-2.5">
        <FlowPath steps={["Dashboard", "Usage section", "Check current limits"]} />
        <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
          💡 If you have exceeded limits, upgrade to Premium or Professional to resume automations and get unlimited DMs.
        </p>
      </div>
    </div>
  </div>
);

// Sub-component: Auto DM creation guide
const AutoDMGuide = () => (
  <div className="space-y-4 mt-3">
    <p className="text-slate-600 text-sm sm:text-base font-semibold">
      Auto DM automatically replies to users when they send you a direct message on Instagram:
    </p>
    
    <div className="relative pl-6 border-l-2 border-slate-200/80 space-y-6">
      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={1} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Open Automations</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Go to your QuickRevert dashboard and click <span className="font-bold text-slate-700">Automations</span> from the main menu.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={2} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Create a New Automation</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Click the <span className="font-bold text-slate-700">Create Automation</span> button.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={3} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Name Your Automation</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Enter a reference name (e.g. <em className="text-slate-700 font-medium">Test Automation</em>) for your internal reference only, then click <span className="font-bold text-slate-700">Continue</span>.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={4} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Select Trigger</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Choose the <span className="font-bold text-[#695dd4]">Someone sends me a DM</span> option, then click <span className="font-bold text-slate-700">Continue</span>.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={5} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Configure Trigger</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Choose how the automation should trigger:
        </p>
        <ul className="text-xs sm:text-sm text-slate-500 mt-2 list-disc pl-5 space-y-1.5 font-medium">
          <li><strong>All Messages:</strong> triggers for every incoming DM.</li>
          <li><strong>Specific Keywords:</strong> triggers only if the DM contains keywords like <code className="bg-slate-100 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold">price</code>, <code className="bg-slate-100 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold">link</code>, or <code className="bg-slate-100 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold">details</code>.</li>
        </ul>
      </div>

      <div className="relative">
        <div className="absolute -left-[37px] top-0 bg-white p-1">
          <StepBadge num={6} />
        </div>
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">Set Up Your Response</h5>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Configure the reply message options:
        </p>
        <ul className="text-xs sm:text-sm text-slate-500 mt-2 list-disc pl-5 space-y-1.5 font-medium">
          <li><strong>Message:</strong> Write a short, clear message (3–4 lines max).</li>
          <li><strong>Image (optional):</strong> Paste a public image URL.</li>
          <li><strong>Button (optional):</strong> Add a button name and link (e.g. name: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs font-bold">Access Now</code> pointing to your URL).</li>
        </ul>
      </div>
    </div>

    <div className="pt-3 flex items-center gap-2">
      <span className="text-slate-600 text-xs sm:text-sm font-medium">
        When you are done, click
      </span>
      <span className="inline-flex items-center gap-1 bg-[#695dd4] text-white px-3 py-1 rounded-xl text-xs font-bold shadow-sm">
        Launch Automation <ArrowRight className="h-3 w-3" />
      </span>
    </div>
  </div>
);

type Category = 'general' | 'howto' | 'troubleshoot';

interface FAQItem {
  category: Category;
  q: string;
  a: React.ReactNode;
  keywords: string[];
}

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const faqCategories = [
    { id: 'general', name: 'General Questions', icon: HelpCircle },
    { id: 'howto', name: 'How-To Guides', icon: BookOpen },
    { id: 'troubleshoot', name: 'Troubleshooting', icon: Wrench },
  ] as const;

  const faqs: FAQItem[] = [
    // --- General Category ---
    {
      category: 'general',
      q: 'How does this product work?',
      a: 'QuickRevert helps creators and brands turn social followers into customers. Start with Instagram DM automation: keyword-triggered DMs, auto-replies to comments, welcome messages for new followers, and follow-up flows. The full product also includes a fan CRM, cross-platform tracking across Discord, Twitch, X, and YouTube, and an AI Copilot that helps you manage your community in one place.',
      keywords: ['features', 'about', 'how works', 'crm', 'instagram dm automation', 'bot', 'copilot']
    },
    {
      category: 'general',
      q: 'How much does it cost?',
      a: 'QuickRevert has four plans: a Free Plan, a Try Me Out plan, a Premium Plan, and a Professional Plan designed to scale with your growth stage.',
      keywords: ['price', 'pricing', 'plans', 'cost', 'subscription', 'free plan', 'premium', 'professional']
    },
    {
      category: 'general',
      q: 'How does billing work?',
      a: "QuickRevert works on one-time payments — you pay once upfront for your chosen duration (monthly, quarterly, or annual), and that's it. There's no autopay or card-on-file setup, so you're never charged again without your knowledge.",
      keywords: ['payment', 'billing', 'upi', 'card', 'autopay', 'charge', 'invoice']
    },
    {
      category: 'general',
      q: 'What is your cancellation policy?',
      a: "Since there's no auto-renewal, there's nothing to \"cancel\" — your plan simply runs for the duration you paid for (1, 3, or 12 months) and then expires. You decide if and when to pay again.",
      keywords: ['cancel', 'refund', 'cancellation', 'renew', 'expire', 'duration']
    },
    {
      category: 'general',
      q: 'Is QuickRevert officially approved by Instagram?',
      a: 'Yes, QuickRevert is 100% official and compliant. We connect directly with Instagram and Meta official APIs. We never ask for your password, and our automated responses run entirely through secure, official Meta server infrastructure, meaning your account remains completely safe and compliant.',
      keywords: ['safe', 'official', 'compliant', 'ban', 'instagram approval', 'meta api', 'password', 'security']
    },
    {
      category: 'general',
      q: 'What is the AI Copilot?',
      a: 'The AI Copilot is an intelligent assistant connected directly to your platforms. It tracks fan engagement, learns from what happens within your community, and automatically populates a knowledge base from your content and posts. It can suggest who to follow up with and assist with draft replies on autopilot.',
      keywords: ['ai', 'copilot', 'assistant', 'draft replies', 'engagement', 'tracking']
    },
    {
      category: 'general',
      q: 'Who\'s the team behind QuickRevert?',
      a: 'QuickRevert is built by XBorg, a leading digital identity and community platform that specializes in building tools for audience engagement, social credentials, and next-generation fan loyalty networks.',
      keywords: ['team', 'about', 'xborg', 'company', 'developer', 'creator']
    },

    // --- How-To Category ---
    {
      category: 'howto',
      q: 'How to Sign Up on QuickRevert?',
      a: (
        <StepGuide 
          steps={[
            <span>Visit the web application dashboard at <a href="https://app.quickrevert.tech" target="_blank" rel="noopener noreferrer" className="text-[#695dd4] font-bold hover:underline inline-flex items-center gap-0.5">app.quickrevert.tech <ExternalLink className="h-3 w-3" /></a></span>,
            <span>Read and agree to the <strong>Terms & Conditions</strong>.</span>,
            <span>Click the <strong>Continue with Google</strong> button.</span>,
            <span>That's it — you are logged in and ready!</span>
          ]}
        />
      ),
      keywords: ['sign up', 'register', 'create account', 'login', 'google login', 'terms and conditions']
    },
    {
      category: 'howto',
      q: 'How to Connect Your Instagram Account?',
      a: (
        <StepGuide 
          steps={[
            <span>Click <strong>Connect Instagram</strong> on your dashboard to get started.</span>,
            <span>Click the <strong>Connect Now</strong> button.</span>,
            <span>Click <strong>Continue to Instagram</strong> to redirect to Meta's secure integration page.</span>,
            <span>Enter your Instagram professional account credentials.</span>,
            <span>You'll see a green confirmation: <span className="text-green-600 font-bold">"Your account is successfully connected" ✓</span></span>
          ]}
        />
      ),
      keywords: ['connect instagram', 'link account', 'instagram login', 'integration', 'connect now']
    },
    {
      category: 'howto',
      q: 'How to Disconnect Instagram from QuickRevert?',
      a: (
        <StepGuide 
          steps={[
            <span>Click the <strong>Menu</strong> button in the navigation panel.</span>,
            <span>Navigate to <strong>My Account</strong>.</span>,
            <span>Under <strong>Connected Accounts</strong>, locate your Instagram and click <strong>Disconnect</strong>.</span>,
            <span>Confirm the action in the prompt.</span>
          ]}
        />
      ),
      keywords: ['disconnect instagram', 'remove instagram', 'unlink', 'delete connection', 'remove account']
    },
    {
      category: 'howto',
      q: 'How to Refresh Token?',
      a: (
        <StepGuide 
          steps={[
            <span>Click the <strong>Menu</strong> button.</span>,
            <span>Go to the <strong>My Account</strong> page.</span>,
            <span>Under <strong>Connected Accounts</strong>, click the <strong>Refresh Token</strong> button.</span>
          ]}
        />
      ),
      keywords: ['refresh token', 'reauthenticate', 'token expired', 'session refresh', 'fix token']
    },
    {
      category: 'howto',
      q: 'How to Upgrade Your Plan?',
      a: (
        <StepGuide 
          steps={[
            <span>Click the <strong>Upgrade</strong> button on the dashboard.</span>,
            <span>Click <strong>Upgrade Plan</strong>.</span>,
            <span>Select either <strong>Quarterly</strong> or <strong>Annual</strong> billing.</span>,
            <span>Choose your package (<strong>Premium</strong> or <strong>Professional</strong>) and click <strong>Upgrade</strong>.</span>,
            <span>Click <strong>Continue to Checkout</strong>.</span>,
            <span>Enter your Instagram handle, promo code (if any), and referral username (if any).</span>,
            <span>Click <strong>Purchase Access</strong>.</span>,
            <span>Complete your payment using UPI, Card, or available payment methods.</span>
          ]}
        />
      ),
      keywords: ['upgrade plan', 'premium', 'professional', 'payment', 'purchase access', 'upi', 'billing cycle', 'quarterly', 'annual']
    },
    {
      category: 'howto',
      q: 'How to Delete Your QuickRevert Account?',
      a: (
        <div>
          <WarningBox>
            This action is permanent and cannot be undone! Your account will be permanently deleted and all active automations will stop working immediately.
          </WarningBox>
          <StepGuide 
            steps={[
              <span>Log in to your QuickRevert dashboard.</span>,
              <span>Navigate to <strong>Settings</strong> from the dashboard sidebar menu.</span>,
              <span>Select the <strong>My Account</strong> section.</span>,
              <span>Under Profile Settings, scroll down to the <strong>Danger Zone</strong> section.</span>,
              <span>Click the <strong>Delete My Data</strong> button.</span>,
              <span>Confirm the deletion when prompted.</span>
            ]}
          />
        </div>
      ),
      keywords: ['delete account', 'danger zone', 'delete data', 'close account', 'terminate']
    },
    {
      category: 'howto',
      q: 'How to Create an Auto DM in QuickRevert?',
      a: <AutoDMGuide />,
      keywords: ['auto dm', 'create automation', 'keyword trigger', 'automatic response', 'set up dm', 'responses', 'setup automation']
    },

    // --- Troubleshooting Category ---
    {
      category: 'troubleshoot',
      q: 'Not able to connect Instagram account',
      a: (
        <div>
          <p className="text-slate-600 text-sm sm:text-base font-semibold mb-3">
            Instagram requires a Professional account to authorize third-party automations. Let's make sure your settings are correct:
          </p>
          <SwitchAccountGuide />
        </div>
      ),
      keywords: ['cannot connect', 'connection failure', 'instagram error', 'business account', 'creator account', 'personal account', 'meta restriction', 'switch professional']
    },
    {
      category: 'troubleshoot',
      q: 'How to Troubleshoot Automations Not Working?',
      a: <TroubleshootGuide />,
      keywords: ['automations paused', 'not working', 'turned off', 'disconnected', 'limit reached', 'monthly contact limit', 'usage limits', 'refresh token']
    }
  ];

  // Filtering Logic
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchQuery.trim() === '' || 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (typeof faq.a === 'string' && faq.a.toLowerCase().includes(searchQuery.toLowerCase()));

    if (searchQuery.trim() !== '') {
      return matchesSearch;
    }
    
    return faq.category === selectedCategory && matchesSearch;
  });

  // Set default open item on category switch
  useEffect(() => {
    if (searchQuery.trim() === '') {
      const firstInCat = faqs.find(f => f.category === selectedCategory);
      setOpenQuestion(firstInCat ? firstInCat.q : null);
    } else {
      setOpenQuestion(filteredFaqs[0]?.q || null);
    }
  }, [selectedCategory, searchQuery]);

  const handleToggle = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-onest text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-4">
            Help Center & FAQ
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg max-w-lg mx-auto">
            Find answers to commonly asked questions, step-by-step setup guides, and troubleshooting steps.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search help articles & FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-10 py-3.5 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#695dd4] focus:border-transparent transition-all font-medium shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category Selector Tabs (Hidden when search query is active) */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-[#695dd4] text-white shadow-lg shadow-[#695dd4]/25'
                      : 'bg-[#f2f2f4] text-[#1b1b1b]/70 hover:bg-[#e6e6e8] hover:text-[#1b1b1b]'
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic header for search results */}
        {searchQuery && (
          <div className="flex justify-between items-center mb-6 px-1">
            <h3 className="font-onest text-lg font-bold text-slate-800">
              Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </h3>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#695dd4] hover:text-[#5a50c6] font-bold text-sm cursor-pointer"
            >
              Clear search
            </button>
          </div>
        )}

        {/* FAQ list */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isOpen = openQuestion === faq.q;
                
                // Find matching category name for search badges
                const categoryObj = faqCategories.find(c => c.id === faq.category);
                
                return (
                  <motion.div
                    key={faq.q}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-2xl bg-[#f2f2f4] overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => handleToggle(faq.q)}
                      className="w-full flex items-start justify-between px-6 sm:px-8 py-5 sm:py-6 text-left focus:outline-none cursor-pointer"
                    >
                      <div className="flex-1 pr-4">
                        {/* Search Category Badge */}
                        {searchQuery && categoryObj && (
                          <span className="inline-block text-[10px] uppercase tracking-wider font-extrabold bg-[#695dd4]/10 text-[#695dd4] px-2 py-0.5 rounded-md mb-2">
                            {categoryObj.name}
                          </span>
                        )}
                        <span className="block font-onest text-lg sm:text-xl font-bold text-[#1b1b1b] leading-snug">
                          {faq.q}
                        </span>
                      </div>
                      
                      {/* Plus/Minus Toggle Symbol */}
                      <div className="h-6 w-6 flex items-center justify-center shrink-0 relative mt-1">
                        <div className="h-0.5 w-4 bg-[#695dd4] rounded-full"></div>
                        <div className={`absolute h-4 w-0.5 bg-[#695dd4] rounded-full transition-transform duration-300 ${isOpen ? 'rotate-90 scale-y-0' : ''}`}></div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-1 text-slate-500 font-sans font-medium text-sm sm:text-base leading-relaxed border-t border-slate-200/40">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-[#f2f2f4] rounded-2xl p-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-400 mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h4 className="font-onest text-lg font-bold text-[#1b1b1b] mb-1">No FAQ entries found</h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                  We couldn't find anything matching "{searchQuery}". Try using keywords like "token", "switch", "delete", or "connect".
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
