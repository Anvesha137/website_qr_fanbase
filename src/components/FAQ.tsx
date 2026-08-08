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
  ExternalLink
} from 'lucide-react';

// Sub-component: Breadcrumbs / Flow UI
const FlowPath = ({ steps }: { steps: string[] }) => (
  <div className="flex flex-wrap items-center gap-1.5 my-1.5 text-xs sm:text-sm">
    {steps.map((step, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
        <span className="font-bold text-slate-700 font-mono">
          {step}
        </span>
      </React.Fragment>
    ))}
  </div>
);

// Sub-component: Step Guide
const StepGuide = ({ steps }: { steps: React.ReactNode[] }) => (
  <ol className="space-y-4 mt-3 pl-1">
    {steps.map((step, idx) => (
      <li key={idx} className="flex items-start gap-2.5">
        <span className="font-mono font-bold text-[#695dd4] text-sm sm:text-base mt-0.5 shrink-0 select-none">
          {idx + 1}.
        </span>
        <div className="text-slate-600 font-medium text-sm sm:text-base leading-relaxed">{step}</div>
      </li>
    ))}
  </ol>
);

// Sub-component: Warning Box
const WarningBox = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex items-start gap-2.5 border-l-2 border-rose-500 pl-3 py-0.5 text-rose-800 text-sm">
    <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-rose-500 mt-0.5" />
    <div className="font-semibold leading-relaxed">{children}</div>
  </div>
);

// Sub-component: Instagram Professional Account Check Guide
const SwitchAccountGuide = () => (
  <div className="mt-4 border-t border-slate-100 pt-4 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <h4 className="font-bold text-green-700 text-sm sm:text-base flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
          Supported Accounts
        </h4>
        <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5 list-disc pl-4 font-medium">
          <li><strong>Business Account</strong> (Highly recommended)</li>
          <li><strong>Creator Account</strong></li>
        </ul>
      </div>
      <div className="space-y-1.5">
        <h4 className="font-bold text-rose-700 text-sm sm:text-base flex items-center gap-1.5">
          <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
          Unsupported Accounts
        </h4>
        <ul className="text-xs sm:text-sm text-slate-500 space-y-1.5 list-disc pl-4 font-medium">
          <li><strong>Personal Instagram Accounts</strong></li>
        </ul>
      </div>
    </div>
    <div className="pt-2 text-xs sm:text-sm text-slate-500 font-medium">
      <span className="font-bold text-slate-700">To switch account type:</span>
      <div className="mt-1.5">
        <FlowPath steps={["Instagram App", "Settings", "Account", "Switch to Professional Account"]} />
      </div>
    </div>
  </div>
);

// Sub-component: YouTube Video Embed Card
const YouTubeEmbed = ({ videoId = "dQw4w9WgXcQ", title }: { videoId?: string; title: string }) => (
  <div className="my-4 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900">
    <div className="relative pb-[56.25%] h-0">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between text-white text-xs font-semibold">
      <span className="flex items-center gap-1.5">
        <span className="text-red-500 font-bold">▶ Video Tutorial:</span> {title}
      </span>
      <a href="https://www.youtube.com/@QuickReverttech" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-white text-[11px] font-bold underline">
        Watch on YouTube
      </a>
    </div>
  </div>
);

// Sub-component: Troubleshooting Guide for Automations
const TroubleshootGuide = () => (
  <div className="space-y-6 mt-4">
    <div className="space-y-2">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
        1. Reason: Automation is Turned Off
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        Ensure your automation is enabled inside the dashboard:
      </p>
      <FlowPath steps={["Menu", "Automations", "Click specific automation", "Activate Automation"]} />
    </div>

    <div className="space-y-2 border-t border-slate-100 pt-4">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
        2. Reason: Instagram is Disconnected
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        Check the connection status and refresh your authentication token:
      </p>
      <FlowPath steps={["Menu button", "My Account", "Connected Accounts", "Connect (or Refresh Token)"]} />
    </div>

    <div className="space-y-2 border-t border-slate-100 pt-4">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
        3. Reason: Monthly Contact Limit Reached
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        If you exceed your plan's monthly contact limit, automations pause automatically:
      </p>
      <FlowPath steps={["Dashboard", "Usage section", "Check current limits"]} />
      <p className="text-xs sm:text-sm text-slate-400 font-medium italic mt-1">
        💡 If you have exceeded limits, upgrade to Premium or Professional to resume automations.
      </p>
    </div>

    <div className="space-y-2 border-t border-slate-100 pt-4">
      <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
        <span>4. Reason: Changed your Instagram Password</span>
      </h4>
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        Instagram security automatically invalidates all active API session tokens whenever you change your account password.
      </p>
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-amber-900 text-xs font-semibold">
        <strong>How to Resolve:</strong> Re-authenticate your account to generate a fresh Meta access token:
      </div>
      <FlowPath steps={["Menu", "My Account", "Connected Accounts", "Click Refresh Token (or Re-connect Instagram)"]} />
    </div>
  </div>
);

// Sub-component: Auto DM creation guide
const AutoDMGuide = () => (
  <div className="space-y-5 mt-3">
    <p className="text-slate-600 text-sm sm:text-base font-semibold">
      Auto DM automatically replies to users when they send you a direct message on Instagram:
    </p>

    <YouTubeEmbed videoId="MzRqEbfqVH0" title="How to Create Auto DM Automations Step-by-Step" />

    <div className="space-y-5 border-l-2 border-slate-100 pl-4 py-1">
      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">1. Open Automations</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Go to your QuickRevert dashboard and click <span className="font-bold text-slate-700">Automations</span> from the main menu.
        </p>
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">2. Create a New Automation</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Click the <span className="font-bold text-slate-700">Create Automation</span> button.
        </p>
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">3. Name Your Automation</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Enter a reference name (e.g. <em className="text-slate-700 font-medium">Test Automation</em>) for your internal reference only, then click <span className="font-bold text-slate-700">Continue</span>.
        </p>
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">4. Select Trigger</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Choose the <span className="font-bold text-[#695dd4]">Someone sends me a DM</span> option, then click <span className="font-bold text-slate-700">Continue</span>.
        </p>
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">5. Configure Trigger</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Choose how the automation should trigger:
        </p>
        <ul className="text-xs sm:text-sm text-slate-400 mt-1.5 list-disc pl-5 space-y-1.5 font-medium">
          <li><strong>All Messages:</strong> triggers for every incoming DM.</li>
          <li><strong>Specific Keywords:</strong> triggers only if the DM contains keywords like <code className="bg-slate-50 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold border border-slate-100">price</code>, <code className="bg-slate-50 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold border border-slate-100">link</code>, or <code className="bg-slate-50 text-rose-600 px-1 py-0.5 rounded text-xs font-mono font-bold border border-slate-100">details</code>.</li>
        </ul>
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-slate-900 text-sm sm:text-base">6. Set Up Your Response</h5>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Configure the reply message options:
        </p>
        <ul className="text-xs sm:text-sm text-slate-400 mt-1.5 list-disc pl-5 space-y-1.5 font-medium">
          <li><strong>Message:</strong> Write a short, clear message (3–4 lines max).</li>
          <li><strong>Image (optional):</strong> Paste a public image URL.</li>
          <li><strong>Button (optional):</strong> Add a button name and link (e.g. name: <span className="underline text-slate-700">Access Now</span> pointing to your URL).</li>
        </ul>
      </div>
    </div>

    <div className="pt-2">
      <p className="text-xs sm:text-sm text-slate-500 font-medium">
        When done, click <span className="font-bold text-[#695dd4]">Launch Automation</span> to activate! 🚀
      </p>
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
    { 
      id: 'general', 
      name: 'General Questions', 
      icon: HelpCircle,
      count: 5
    },
    { 
      id: 'howto', 
      name: 'How-To Guides', 
      icon: BookOpen,
      count: 7
    },
    { 
      id: 'troubleshoot', 
      name: 'Troubleshooting', 
      icon: Wrench,
      count: 2
    },
  ] as const;

  const faqs: FAQItem[] = [
    // --- General Category ---
    {
      category: 'general',
      q: 'How does this product work?',
      a: 'Someone messages your Instagram → the system checks what kind of message it is and matches it to a rule you set up ("if they comment X, reply Y and DM them Z") → it sends the reply/DM automatically and saves their info as a lead.',
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

  // Set default open item on category switch or search
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
    <section className="py-12 bg-white" id="faq">
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Area */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 py-8 px-6 sm:px-12 text-center border border-white/5 shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#695dd4,transparent_45%)] opacity-25"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-1">
            <h1 className="font-onest text-2xl sm:text-3xl font-extrabold tracking-tight text-white animate-fade-in">
              How can we help you?
            </h1>
            <p className="text-slate-300 font-medium text-xs sm:text-sm leading-normal">
              Search our guides, configure your account, and troubleshoot automations.
            </p>
          </div>
        </div>

        {/* Main Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column: Sidebar Widgets */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 select-none">
                Categories
              </h3>
              <div className="flex flex-col space-y-1">
                {faqCategories.map((cat) => {
                  const isActive = selectedCategory === cat.id && !searchQuery;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left py-2 px-3 font-semibold text-sm sm:text-base cursor-pointer flex items-center justify-between transition-all border-l-2 ${
                          isActive 
                            ? 'text-[#695dd4] font-bold border-[#695dd4] pl-4' 
                            : 'text-slate-400 border-transparent hover:text-slate-800 hover:translate-x-0.5 pl-3'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">({cat.count})</span>
                      </button>

                      {/* Nested Question Titles */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="pl-3.5 space-y-1 border-l border-slate-200 ml-4 py-1"
                          >
                            {faqs
                              .filter((faq) => faq.category === cat.id)
                              .map((faq) => {
                                const isFaqOpen = openQuestion === faq.q;
                                return (
                                  <button
                                    key={faq.q}
                                    onClick={() => {
                                      setOpenQuestion(faq.q);
                                      // Smooth scroll to element on the right
                                      const element = document.getElementById(faq.q);
                                      if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      }
                                    }}
                                    className={`w-full text-left text-xs sm:text-sm font-medium py-1.5 transition-all cursor-pointer block select-none truncate border-l ${
                                      isFaqOpen
                                        ? 'text-[#695dd4] font-semibold border-[#695dd4] pl-3'
                                        : 'text-slate-400 hover:text-slate-700 hover:translate-x-0.5 border-slate-100 hover:border-slate-300 pl-3'
                                    }`}
                                  >
                                    {faq.q}
                                  </button>
                                );
                              })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Support CTA Link */}
            <div className="pt-6 border-t border-slate-200/80">
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Still need help? Email our support team available 24/7 at{' '}
                <a
                  href="mailto:connect@quickrevert.tech"
                  className="font-bold text-[#695dd4] hover:underline transition-colors"
                >
                  connect@quickrevert.tech
                </a>
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Search & Content List */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search Bar Widget */}
            <div className="relative border-b border-slate-200 pb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles, guides, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 bg-transparent border-0 text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-semibold text-sm sm:text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              )}
            </div>

            {/* Dynamic Results Header */}
            {searchQuery && (
              <div className="flex justify-between items-center px-1">
                <h3 className="font-onest text-base font-bold text-slate-800">
                  Showing {filteredFaqs.length} match{filteredFaqs.length !== 1 ? 'es' : ''} for "{searchQuery}"
                </h3>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#695dd4] hover:text-[#5a50c6] font-bold text-xs cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Accordion Container */}
            <div className="divide-y divide-slate-100 border-t border-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => {
                    const isOpen = openQuestion === faq.q;
                    
                    return (
                      <motion.div
                        key={faq.q}
                        id={faq.q}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="scroll-mt-24 py-1"
                      >
                        <button
                          onClick={() => handleToggle(faq.q)}
                          className="w-full flex items-start justify-between py-5 text-left focus:outline-none cursor-pointer group"
                        >
                          <span className="block font-onest text-lg sm:text-xl font-bold text-slate-900 leading-snug group-hover:text-[#695dd4] transition-colors">
                            {faq.q}
                          </span>
                          
                          {/* Chevron Indicator */}
                          <div className="h-6 w-6 flex items-center justify-center shrink-0 relative mt-1 text-slate-400 group-hover:text-[#695dd4] transition-colors">
                            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#695dd4]' : ''}`} />
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                            >
                              <div className="pb-6 pt-1 text-slate-500 font-sans font-medium text-sm sm:text-base leading-relaxed">
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
                    className="text-center py-16"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 mb-3 border border-slate-100">
                      <Search className="h-5 w-5" />
                    </div>
                    <h4 className="font-onest text-base font-bold text-slate-800 mb-1.5">No articles found</h4>
                    <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto font-medium leading-relaxed">
                      We couldn't find anything matching "{searchQuery}". Check your spelling or select a category to clear filters.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
