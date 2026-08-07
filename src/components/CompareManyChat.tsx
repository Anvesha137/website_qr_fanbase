import React, { useState } from 'react';
import { Check, X, ArrowRight, Zap, Shield, DollarSign, Star, ChevronDown, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ViewMode } from './Navbar';

interface Props {
  setViewMode: (mode: ViewMode) => void;
}

type CellValue = boolean | 'planned' | 'via-integrations' | string;

interface FeatureRow {
  feature: string;
  category?: string;
  qr_starter: CellValue;
  qr_pro: CellValue;
  manychat: CellValue;
  highlight?: boolean;
}

const features: FeatureRow[] = [
  // Core Automation
  { feature: 'Instagram Comment → DM', category: 'Core Automation', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'Instagram Keyword Automation', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'Story Reply Automation', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'DM Automation', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'Welcome Messages', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'Unlimited Automations', qr_starter: true, qr_pro: true, manychat: true },
  { feature: 'Carousel Automations', category: 'Advanced Flows', qr_starter: false, qr_pro: true, manychat: true },
  { feature: 'Menu Flows', qr_starter: false, qr_pro: true, manychat: true },
  // Growth
  { feature: 'Ask to Follow Growth Tool', category: 'Growth Tools', qr_starter: true, qr_pro: true, manychat: false, highlight: true },
  // Business Tools
  { feature: 'Lead Manager', category: 'Business Tools', qr_starter: false, qr_pro: true, manychat: 'via-integrations', highlight: true },
  { feature: 'Lead Follow-Ups', qr_starter: false, qr_pro: true, manychat: 'via-integrations' },
  { feature: 'Appointment Booking', qr_starter: false, qr_pro: true, manychat: 'via-integrations', highlight: true },
  { feature: 'Invoice Generator', qr_starter: false, qr_pro: true, manychat: false, highlight: true },
  { feature: 'Creator Store', qr_starter: false, qr_pro: true, manychat: false, highlight: true },
  { feature: 'Financial Planner', qr_starter: false, qr_pro: true, manychat: false, highlight: true },
  // AI & Multi-Channel
  { feature: 'AI Replies', category: 'AI & Integrations', qr_starter: 'planned', qr_pro: 'planned', manychat: true },
  { feature: 'Multi-channel Automation', qr_starter: false, qr_pro: false, manychat: true },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50">
        <Check className="w-4 h-4 text-emerald-500 stroke-[2.8]" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50">
        <X className="w-4 h-4 text-rose-400 stroke-[2.2]" />
      </span>
    );
  }
  if (value === 'planned') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        <Zap className="w-2.5 h-2.5" /> Coming Soon
      </span>
    );
  }
  if (value === 'via-integrations') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        Via Integrations
      </span>
    );
  }
  return <span className="text-xs font-semibold text-slate-600">{value}</span>;
}

const faqs = [
  {
    q: 'Why is QuickRevert cheaper than ManyChat?',
    a: "ManyChat charges based on the number of contacts in your list — so your bill grows as your audience grows. QuickRevert uses simple flat-rate plans, so you pay the same amount whether you have 100 or 100,000 followers. No surprises, no scaling costs.",
  },
  {
    q: 'Does QuickRevert support multi-channel automation like ManyChat?',
    a: "QuickRevert is laser-focused on Instagram — we believe doing one thing exceptionally well beats doing many things poorly. ManyChat supports multiple channels, but if Instagram is your primary platform, QuickRevert gives you deeper, more powerful Instagram-specific tools.",
  },
  {
    q: 'What makes Ask to Follow unique to QuickRevert?',
    a: "Ask to Follow is a native QuickRevert growth tool that lets your automation workflows prompt users to follow your account as part of a conversation flow. ManyChat doesn't offer this natively — it's one of the features that helps QuickRevert users grow their follower count organically.",
  },
  {
    q: 'Can I manage leads without a third-party integration?',
    a: "Yes! QuickRevert Professional includes a built-in Lead Manager, Lead Follow-Ups, and even Appointment Booking — all without needing to connect external tools like Zapier or HubSpot. ManyChat requires integrations for all of these.",
  },
  {
    q: 'Is my data safe with QuickRevert?',
    a: "Absolutely. QuickRevert uses the Official Instagram Graph API and is fully compliant with Meta's Platform Policies and Developer Terms. Your account and your audience's data are handled securely.",
  },
  {
    q: 'Can I switch from ManyChat to QuickRevert easily?',
    a: "Yes. Getting started with QuickRevert takes minutes — sign up, connect your Instagram account, and your first automation can be live within a few minutes. No complex migration or onboarding required.",
  },
];

// Group features by category for rendering
function groupFeatures(rows: FeatureRow[]) {
  const groups: { category: string | null; rows: FeatureRow[] }[] = [];
  let currentGroup: { category: string | null; rows: FeatureRow[] } | null = null;

  for (const row of rows) {
    if (row.category) {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = { category: row.category, rows: [row] };
    } else if (currentGroup) {
      currentGroup.rows.push(row);
    } else {
      currentGroup = { category: null, rows: [row] };
    }
  }
  if (currentGroup) groups.push(currentGroup);
  return groups;
}

export default function CompareManyChat({ setViewMode }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const grouped = groupFeatures(features);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#703ded] via-[#5a42c8] to-[#3b2fa0] pt-32 pb-20 px-4 sm:px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-indigo-100 uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
              <Instagram className="w-3 h-3" /> Instagram Automation Showdown
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight font-onest leading-[1.1] mb-6"
          >
            QuickRevert vs ManyChat
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg sm:text-xl text-indigo-100/90 font-sans font-medium max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Same Instagram automation power. Built-in business tools ManyChat doesn't have.
            Starting at{' '}
            <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-lg">$8/mo</span>{' '}
            flat — not{' '}
            <span className="line-through text-indigo-300">$29/mo</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://app.quickrevert.tech"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#5a42c8] rounded-2xl font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free on QuickRevert
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setViewMode('pricing')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white border border-white/25 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              View Pricing
            </button>
          </motion.div>
        </div>

        {/* Price callout strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="max-w-3xl mx-auto mt-16 relative z-10"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10 bg-white/8 backdrop-blur-md border border-white/15 rounded-3xl overflow-hidden">
            {[
              { label: 'QuickRevert Starter', price: '$8', sub: 'per month, flat' },
              { label: 'QuickRevert Pro', price: '$14', sub: 'per month, flat' },
              { label: 'ManyChat Pro', price: '$29+', sub: 'contact-based pricing', bad: true },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center py-6 px-4 ${item.bad ? 'opacity-70' : ''}`}>
                <span className={`text-3xl sm:text-4xl font-extrabold font-onest tracking-tight ${item.bad ? 'text-rose-300 line-through decoration-rose-400' : 'text-white'}`}>
                  {item.price}
                </span>
                <span className={`text-[11px] font-bold mt-1 ${item.bad ? 'text-rose-300' : 'text-indigo-200'}`}>{item.label}</span>
                <span className={`text-[10px] mt-0.5 ${item.bad ? 'text-rose-300/70' : 'text-white/50'}`}>{item.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Key Differentiators ───────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#695dd4] uppercase bg-[#695dd4]/8 border border-[#695dd4]/20 px-4 py-1.5 rounded-full mb-4 inline-block">
              Why QuickRevert Wins
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-onest mt-3">
              More tools. Less cost. Zero complexity.
            </h2>
            <p className="text-slate-500 text-base mt-3 max-w-xl mx-auto">
              QuickRevert is purpose-built for Instagram creators and businesses who want real results without enterprise overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: DollarSign,
                color: 'emerald',
                title: 'Flat-Rate Pricing',
                desc: "ManyChat's pricing scales with your contact list — your costs explode as you grow. QuickRevert charges a flat monthly fee. No surprises.",
                badge: 'Save 3.6x',
              },
              {
                icon: Zap,
                color: 'violet',
                title: 'Built-in Business Tools',
                desc: 'Lead Manager, Appointment Booking, Invoice Generator, Creator Store, Financial Planner — all built in. ManyChat needs third-party integrations for all of these.',
                badge: '7 Exclusive Tools',
              },
              {
                icon: Star,
                color: 'amber',
                title: 'Ask to Follow',
                desc: "Grow your Instagram following automatically with Ask to Follow — a native QuickRevert tool that prompts users to follow your account inside any conversation flow. ManyChat doesn't have this.",
                badge: 'Only on QuickRevert',
              },
              {
                icon: Shield,
                color: 'sky',
                title: 'Instagram-Native',
                desc: 'We use the Official Instagram Graph API and are fully compliant with Meta Platform Policies. Purpose-built for Instagram, not bolted-on.',
                badge: 'Meta Compliant',
              },
              {
                icon: ArrowRight,
                color: 'rose',
                title: 'No Contact-Based Billing',
                desc: "With ManyChat, 10K contacts costs $85/mo. 25K is $200+/mo. QuickRevert is always $8 or $14 — forever.",
                badge: 'Truly Unlimited',
              },
              {
                icon: Instagram,
                color: 'pink',
                title: 'Simpler Onboarding',
                desc: "ManyChat's multi-channel builder is complex. QuickRevert is designed for Instagram from the ground up — intuitive from day one.",
                badge: 'Live in Minutes',
              },
            ].map((card, i) => {
              const colorMap: Record<string, string> = {
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                violet: 'bg-violet-50 text-violet-600 border-violet-100',
                amber: 'bg-amber-50 text-amber-600 border-amber-100',
                sky: 'bg-sky-50 text-sky-600 border-sky-100',
                rose: 'bg-rose-50 text-rose-600 border-rose-100',
                pink: 'bg-pink-50 text-pink-600 border-pink-100',
              };
              const badgeMap: Record<string, string> = {
                emerald: 'bg-emerald-100 text-emerald-700',
                violet: 'bg-violet-100 text-violet-700',
                amber: 'bg-amber-100 text-amber-700',
                sky: 'bg-sky-100 text-sky-700',
                rose: 'bg-rose-100 text-rose-700',
                pink: 'bg-pink-100 text-pink-700',
              };
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border mb-4 ${colorMap[card.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${badgeMap[card.color]}`}>
                    {card.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 font-onest mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Feature Comparison Table ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#695dd4] uppercase bg-[#695dd4]/8 border border-[#695dd4]/20 px-4 py-1.5 rounded-full mb-4 inline-block">
              Feature Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-onest mt-3">
              Everything, side by side
            </h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-5 px-6 text-sm font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tl-3xl w-[40%]">
                    Feature
                  </th>
                  <th className="py-5 px-4 text-center bg-[#695dd4]/5 border-x border-[#695dd4]/10 w-[20%]">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-[#695dd4] uppercase tracking-wider">QuickRevert</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-0.5">$8 / mo</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center bg-[#695dd4]/10 border-r border-[#695dd4]/10 w-[20%]">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-[#695dd4] uppercase tracking-wider">QuickRevert Pro</span>
                      <span className="text-[10px] font-bold text-[#695dd4]/60 mt-0.5">$14 / mo</span>
                    </div>
                  </th>
                  <th className="py-5 px-4 text-center bg-slate-50 rounded-tr-3xl w-[20%]">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-wider">ManyChat Pro</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-0.5">$29+ / mo</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {grouped.map((group, gi) => (
                  <React.Fragment key={gi}>
                    {group.category && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-3 px-6 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 bg-slate-50/80 border-t border-slate-100"
                        >
                          {group.category}
                        </td>
                      </tr>
                    )}
                    {group.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className={`border-t border-slate-50 transition-colors ${row.highlight ? 'bg-[#695dd4]/[0.02]' : 'hover:bg-slate-50/60'}`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-slate-700">{row.feature}</span>
                            {row.highlight && (
                              <span className="text-[9px] font-black uppercase tracking-wider text-[#695dd4] bg-[#695dd4]/10 px-2 py-0.5 rounded-full">
                                Exclusive
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center bg-[#695dd4]/[0.03] border-x border-[#695dd4]/8">
                          <div className="flex justify-center"><CellIcon value={row.qr_starter} /></div>
                        </td>
                        <td className="py-4 px-4 text-center bg-[#695dd4]/[0.05] border-r border-[#695dd4]/8">
                          <div className="flex justify-center"><CellIcon value={row.qr_pro} /></div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center"><CellIcon value={row.manychat} /></div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                {/* Totals row */}
                <tr className="border-t-2 border-slate-200 bg-slate-50">
                  <td className="py-5 px-6 text-sm font-extrabold text-slate-800 rounded-bl-3xl">Monthly Price</td>
                  <td className="py-5 px-4 text-center bg-[#695dd4]/[0.05] border-x border-[#695dd4]/10">
                    <span className="text-lg font-black text-[#695dd4] font-onest">$8</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">/mo</span>
                  </td>
                  <td className="py-5 px-4 text-center bg-[#695dd4]/[0.08] border-r border-[#695dd4]/10">
                    <span className="text-lg font-black text-[#695dd4] font-onest">$14</span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">/mo</span>
                  </td>
                  <td className="py-5 px-4 text-center rounded-br-3xl">
                    <span className="text-lg font-black text-rose-400 line-through font-onest">$29+</span>
                    <span className="text-[10px] text-rose-300 ml-1 font-bold">/mo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-50 inline-flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
              </span>
              Included
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-rose-50 inline-flex items-center justify-center">
                <X className="w-3 h-3 text-rose-400 stroke-[2.5]" />
              </span>
              Not Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Coming Soon</span>
              In Development
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">Via Integrations</span>
              Needs External Tools
            </span>
          </div>
        </div>
      </section>


      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#695dd4] uppercase bg-[#695dd4]/8 border border-[#695dd4]/20 px-4 py-1.5 rounded-full mb-4 inline-block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-onest mt-3">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                  openFaq === i
                    ? 'bg-white border-[#695dd4]/30 shadow-lg ring-1 ring-[#695dd4]/10'
                    : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
                }`}
              >
                <div className="px-6 py-5 flex items-center justify-between select-none">
                  <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openFaq === i ? 'bg-[#695dd4] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-[#703ded] via-[#5a42c8] to-[#3b2fa0] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-mono font-bold tracking-widest text-indigo-200 uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
              Ready to Switch?
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-onest leading-[1.1] mb-5">
              Stop paying more for less.<br />
              <span className="text-indigo-200">Start with QuickRevert today.</span>
            </h2>
            <p className="text-indigo-100/80 text-lg mb-10 max-w-xl mx-auto">
              Powerful Instagram automation. Built-in business tools. Flat-rate pricing that scales with you — not against you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.quickrevert.tech"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5a42c8] rounded-2xl font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setViewMode('pricing')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/25 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all duration-300"
              >
                See All Plans
              </button>
            </div>
            <p className="text-indigo-200/60 text-xs mt-6">
              Free plan available. No credit card required. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
