import React, { useEffect } from 'react';
import { ArrowLeft, UserPlus, LayoutGrid, Sliders, Database, MessageSquare, Image, Mail, CheckCircle2 } from 'lucide-react';

interface FeaturesPageProps {
  initialFeatureId?: string;
  onBack: () => void;
}

const features = [
  {
    id: 'ask-to-follow',
    badge: 'Follow-Gate Your Rewards',
    icon: UserPlus,
    color: '#695dd4',
    title: 'Ask to Follow',
    tagline: 'Only give the reward after they follow you.',
    what: 'When someone comments a keyword (like "GUIDE" or "FREE") on your post or reel, QuickRevert can check whether they already follow you before sending the DM reward. If they don\'t follow yet, it first sends a gentle nudge asking them to follow — then auto-sends the reward once they do.',
    steps: [
      { label: 'Set a trigger keyword', desc: 'e.g. "EBOOK", "FREE", "LINK" — any word you want people to comment' },
      { label: 'Toggle "Require Follow"', desc: 'Inside the automation builder, switch on Follow-Gate under the action settings' },
      { label: 'Write two messages', desc: 'One for non-followers ("Hey! Follow us first 👉"), one for the reward ("Here\'s your link!")' },
      { label: 'Publish the automation', desc: 'QuickRevert handles the rest — checking follow status and routing automatically' },
    ],
    why: 'Turns viral comment threads into permanent follower growth. People who want the reward have to follow first — so every giveaway or freebie doubles as a follower campaign.',
    triggerBadge: 'Works with: Comment to DM',
  },
  {
    id: 'carousel-cards',
    badge: 'In-DM Product Browse',
    icon: LayoutGrid,
    color: '#7c3aed',
    title: 'Carousel Cards',
    tagline: 'Let followers browse your products right inside the DM.',
    what: 'Instead of just sending a text reply, QuickRevert can send a scrollable card carousel inside the DM chat. Each card shows a product image, title, price, and a "Buy Now" or "Book Now" button — linked directly to your store or checkout page.',
    steps: [
      { label: 'Connect your My Store products', desc: 'Pick existing products from your QuickRevert store (ebooks, merch, coaching sessions)' },
      { label: 'Add carousel cards to an action', desc: 'In the automation builder, choose "Send Carousel" as the DM action type' },
      { label: 'Customise each card', desc: 'Add images, pricing, short descriptions, and a button URL for each product card' },
      { label: 'Link to your trigger', desc: 'Attach this to a comment keyword or menu button — DM triggers the carousel' },
    ],
    why: 'Removes the friction of "DM me for info." Followers see a real product listing inside the chat and can tap to buy without ever leaving Instagram.',
    triggerBadge: 'Works with: Comment to DM, Auto DM',
  },
  {
    id: 'menu-flow',
    badge: 'Guided Chat Navigation',
    icon: Sliders,
    color: '#0891b2',
    title: 'Menu Flow',
    tagline: 'Give followers a tap-to-navigate menu inside their DM.',
    what: 'Instead of a one-shot reply, you can build a multi-level conversation flow. When someone DMs you a keyword, they get a message with tap buttons: "🛒 Shop", "🗓️ Book a Call", "❓ FAQs". Each button leads to the next relevant message, resource, or checkout link.',
    steps: [
      { label: 'Choose "Conversation Flow" as trigger type', desc: 'This is found in the automation builder under trigger selection' },
      { label: 'Build your root menu', desc: 'Define 2–4 quick-reply button options with clear labels' },
      { label: 'Map each button to a response', desc: 'Set the message that fires when a follower taps each option — can nest sub-menus' },
      { label: 'Add exit actions', desc: 'Each branch can end with a link, a carousel, or a "Back to menu" button' },
    ],
    why: 'Works as a 24/7 AI assistant. Handles FAQs, routes to products, books calls, and guides customers to checkout — all automatically, without you touching your inbox.',
    triggerBadge: 'Works with: Auto DM, Comment to DM',
  },
  {
    id: 'lead-manager',
    badge: 'Your Audience Database',
    icon: Database,
    color: '#059669',
    title: 'Lead Manager',
    tagline: 'Every person who interacts becomes a saved contact you own.',
    what: 'Every time someone comments a keyword, replies to a story, or sends you a DM that triggers an automation, QuickRevert automatically creates a contact record for them. You can see their Instagram handle, which automation they triggered, when they interacted, and any email or phone they submitted via a form.',
    steps: [
      { label: 'It\'s automatic', desc: 'No setup needed. Every triggered automation creates or updates a contact entry' },
      { label: 'View Leads vs. Audience tabs', desc: 'Leads = people who submitted a form (email/phone). Audience = anyone who triggered any automation' },
      { label: 'Search and filter', desc: 'Find by username, automation name, or date — and see which automation each person came from' },
      { label: 'Export as CSV', desc: 'One-click export of all leads with name, email, phone, automation source, and timestamp' },
    ],
    why: 'You own your audience list — not Instagram. Use it for email campaigns, personalised follow-ups, or syncing to tools like Mailchimp, ConvertKit, or your CRM.',
    triggerBadge: 'Works with: All trigger types',
  },
];

const triggerTypes = [
  {
    icon: MessageSquare,
    name: 'Comment to DM',
    desc: 'Someone comments a keyword on your post or reel → they get a DM',
    color: '#695dd4',
  },
  {
    icon: Image,
    name: 'Story Interactions',
    desc: 'Someone replies to or mentions your story → they get a DM',
    color: '#7c3aed',
  },
  {
    icon: Mail,
    name: 'Auto DM',
    desc: 'Someone sends you a direct message with a keyword → you reply automatically',
    color: '#0891b2',
  },
];

export default function FeaturesPage({ initialFeatureId, onBack }: FeaturesPageProps) {
  useEffect(() => {
    if (initialFeatureId) {
      setTimeout(() => {
        const el = document.getElementById(initialFeatureId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [initialFeatureId]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800 font-sans antialiased">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <img src="/Logo_optimized.png" className="h-6 w-6 object-contain" alt="QuickRevert" />
            <span className="font-display font-[800] text-sm tracking-widest text-[#1b1b1b] uppercase">QUICKREVERT</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">

        {/* Page intro */}
        <div className="mb-16 text-center">
          <span className="text-[11px] font-bold text-[#695dd4] tracking-[0.18em] uppercase">Product Features</span>
          <h1 className="font-display text-4xl sm:text-5xl font-[900] text-[#1b1b1b] tracking-tight mt-3 leading-tight">
            What QuickRevert<br />actually does
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium mt-4 max-w-lg mx-auto leading-relaxed">
            Connect your Instagram account, pick a trigger, configure your reply — and QuickRevert handles every DM automatically.
          </p>
        </div>

        {/* Triggers explainer */}
        <section className="mb-16">
          <p className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-5">Step 1 — Choose a Trigger</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {triggerTypes.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: t.color + '18' }}
                  >
                    <Icon className="h-4.5 w-4.5" style={{ color: t.color }} />
                  </div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase">Step 2 — Configure the Features</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Feature cards */}
        <div className="space-y-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <section
                key={f.id}
                id={f.id}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm scroll-mt-24"
              >
                {/* Top bar accent */}
                <div className="h-1 w-full" style={{ backgroundColor: f.color }} />

                <div className="p-6 sm:p-9 space-y-7">

                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: f.color + '18' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: f.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                          style={{ color: f.color, backgroundColor: f.color + '14' }}
                        >
                          {f.badge}
                        </span>
                      </div>
                      <h2 className="text-xl font-[800] text-slate-900 mt-1.5 font-display">{f.title}</h2>
                      <p className="text-sm text-slate-500 font-medium mt-0.5">{f.tagline}</p>
                    </div>
                  </div>

                  {/* What it does */}
                  <p className="text-sm text-slate-600 leading-relaxed">{f.what}</p>

                  {/* Setup steps */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-3">
                      How you set it up in the dashboard
                    </p>
                    <div className="space-y-2.5">
                      {f.steps.map((s, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div
                            className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5"
                            style={{ backgroundColor: f.color }}
                          >
                            {i + 1}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-slate-800">{s.label} — </span>
                            <span className="text-sm text-slate-500">{s.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why it matters + trigger badge */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 pt-2 border-t border-slate-100">
                    <div className="flex-1 flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: f.color }} />
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{f.why}</p>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg whitespace-nowrap self-start"
                      style={{ color: f.color, backgroundColor: f.color + '12' }}
                    >
                      {f.triggerBadge}
                    </span>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-[#1b1b1b] rounded-3xl p-10">
          <h3 className="font-display text-2xl font-[800] text-white mb-2">Ready to build your first automation?</h3>
          <p className="text-white/50 text-sm font-medium mb-6">Connect Instagram, set a keyword, write a reply. Live in 5 minutes.</p>
          <button
            onClick={onBack}
            className="bg-[#695dd4] hover:bg-[#5b51c1] text-white text-sm font-bold px-8 py-3 rounded-xl transition-all"
          >
            Go to Dashboard →
          </button>
        </div>

      </main>
    </div>
  );
}
