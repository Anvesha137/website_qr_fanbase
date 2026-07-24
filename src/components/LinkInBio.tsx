import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Instagram, ShoppingBag, Calendar, Globe,
  ExternalLink, Star, Package, FileText, Layers,
  ArrowDown, Check, Zap, Image, Palette, Shield
} from 'lucide-react';

interface LinkInBioProps {
  onBack: () => void;
}

// What the real My Store product can list — from actual store_products types
const productTypes = [
  { icon: FileText, label: 'Digital Download', desc: 'PDF guides, presets, templates, eBooks', color: '#695dd4' },
  { icon: Package, label: 'Physical Product', desc: 'Apparel, merch, prints — with shipping', color: '#7c3aed' },
  { icon: Calendar, label: '1:1 Session', desc: 'Consultation bookings with calendar sync', color: '#0891b2' },
  { icon: Layers, label: 'Collab / Rates Card', desc: 'Brand deals and partnership inquiries', color: '#059669' },
];

// A realistic creator storefront mockup — mirrors StorefrontView real UI
const mockProducts = [
  { type: 'Digital', tag: 'Best Seller', title: 'Instagram Growth Playbook', price: '₹299', img: '📘', badge: 'PDF' },
  { type: 'Session', tag: '2 Spots Left', title: 'Automation Setup Call (60 min)', price: '₹2,499', img: '🗓️', badge: 'Live' },
  { type: 'Physical', tag: 'New', title: 'QuickRevert Creator Hoodie', price: '₹1,899', img: '👕', badge: 'Merch' },
  { type: 'Digital', tag: '', title: 'Reel Strategy Template Pack', price: '₹149', img: '🎬', badge: 'ZIP' },
];

const creatorFeatures = [
  {
    icon: Instagram,
    title: 'Auto-slug from your Instagram',
    desc: 'Connect your IG account and your store is instantly live at app.quickrevert.tech/s/yourhandle — no slug to configure, ever.',
  },
  {
    icon: Palette,
    title: 'Pick a theme, make it yours',
    desc: 'Choose from curated colour themes and upload your banner. Your store matches your brand in minutes.',
  },
  {
    icon: ShoppingBag,
    title: 'All your products in one place',
    desc: 'Digital downloads, physical merch, 1:1 session slots, and collab rate cards — all managed from one creator dashboard.',
  },
  {
    icon: Zap,
    title: 'Sell inside Instagram DMs',
    desc: 'Pair My Store with a Comment-to-DM trigger. Someone comments "SHOP" → they get a carousel of your products in their DM.',
  },
  {
    icon: Calendar,
    title: 'Booking system built in',
    desc: 'Offer session products with available time slots. Bookings sync to Google Calendar with a Meet link automatically.',
  },
  {
    icon: Shield,
    title: 'Razorpay payments, zero setup',
    desc: 'Enter your UPI or bank details once. Every product order routes through Razorpay — payouts land in your account.',
  },
];

export default function LinkInBio({ onBack }: LinkInBioProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'sessions' | 'collabs'>('store');

  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── HERO ── */}
      <section className="bg-[#0d0d0d] flex flex-col items-center justify-start pt-10 pb-24 relative overflow-visible">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(105,93,212,0.15),transparent)] pointer-events-none" />

        {/* Top nav */}
        <div className="w-full flex items-center justify-between px-8 mb-16 relative z-10">
          <button onClick={onBack} className="text-white/40 text-xs font-semibold hover:text-white/70 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <div className="flex items-center gap-1 cursor-pointer" onClick={onBack}>
            <img src="/Logo_optimized.png" className="h-10 w-10 object-contain" alt="QuickRevert" />
            <span className="font-manrope font-bold text-lg tracking-tight text-white">QuickRevert</span>
          </div>
          <button onClick={onBack} className="text-xs font-semibold text-white/60 hover:text-white transition-colors">
            Log in →
          </button>
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl px-6 z-10 relative"
        >
          <span className="text-[10px] font-bold text-[#9d94ff] tracking-widest uppercase bg-[#695dd4]/15 border border-[#695dd4]/25 px-3.5 py-1.5 rounded-full">
            My Store — Link-in-Bio
          </span>
          <h1 className="font-display text-[48px] sm:text-[60px] font-[900] leading-[1.0] tracking-tight text-white mb-6 mt-5">
            Your Instagram store,<br />live in 5 minutes.
          </h1>
          <p className="text-white/55 text-base sm:text-lg font-medium leading-relaxed mb-10 max-w-xl mx-auto">
            A beautiful creator storefront that sits at your Instagram link. Sell digital products, physical merch, and consultation sessions — all without leaving your QuickRevert dashboard.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onBack}
              className="rounded-2xl bg-[#695dd4] hover:bg-[#5b51c1] text-white px-8 py-3.5 text-sm font-bold shadow-xl transition-all"
            >
              Set up your store →
            </button>
            <button className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors">
              See how it works <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Storefront mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-3xl mx-auto mt-16 px-4 z-20 -mb-64 lg:-mb-72"
        >
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
            {/* Browser bar */}
            <div className="bg-[#1a1a1a] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-[10px] text-white/30 font-mono">app.quickrevert.tech/s/nishacreates</span>
              </div>
            </div>

            {/* Storefront content */}
            <div className="bg-[#0a0a0a] p-5">
              {/* Creator header */}
              <div className="relative h-24 rounded-2xl bg-gradient-to-br from-[#695dd4]/50 via-[#1b1b1b] to-black overflow-hidden mb-4 flex items-end p-3">
                <div className="absolute top-3 right-3">
                  <span className="bg-[#695dd4] text-white text-[8px] font-bold px-2 py-0.5 rounded">PRO</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4 -mt-8 px-1">
                <div className="h-12 w-12 rounded-full border-2 border-[#695dd4] bg-[#1b1b1b] flex items-center justify-center text-lg font-bold text-white">N</div>
                <div>
                  <p className="text-white text-sm font-bold">Nisha Creates</p>
                  <p className="text-white/40 text-[10px]">@nishacreates · 47.2K followers</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-3">
                {(['store', 'sessions', 'collabs'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg transition-all ${
                      activeTab === t
                        ? 'bg-[#695dd4] text-white'
                        : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Products grid */}
              {activeTab === 'store' && (
                <div className="grid grid-cols-2 gap-2.5">
                  {mockProducts.map((p, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-xl mb-2">{p.img}</div>
                      {p.tag && (
                        <span className="text-[8px] font-bold text-[#9d94ff] bg-[#695dd4]/20 px-1.5 py-0.5 rounded">{p.tag}</span>
                      )}
                      <p className="text-white text-[11px] font-bold mt-1 leading-tight">{p.title}</p>
                      <p className="text-[#9d94ff] text-[10px] font-bold mt-1">{p.price}</p>
                      <button className="mt-2 w-full bg-[#695dd4]/20 hover:bg-[#695dd4]/40 text-white text-[9px] font-bold py-1 rounded-lg transition-all">
                        Buy Now
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'sessions' && (
                <div className="space-y-2.5">
                  {[
                    { title: 'Automation Setup (60 min)', price: '₹2,499', slots: '2 slots left', emoji: '⚡' },
                    { title: 'Growth Strategy (45 min)', price: '₹1,999', slots: '5 slots open', emoji: '📈' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#695dd4]/15 flex items-center justify-center text-lg">{s.emoji}</div>
                      <div className="flex-1">
                        <p className="text-white text-[11px] font-bold">{s.title}</p>
                        <p className="text-white/30 text-[9px] mt-0.5">{s.slots}</p>
                      </div>
                      <p className="text-[#9d94ff] text-[10px] font-bold">{s.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'collabs' && (
                <div className="space-y-2.5">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold text-[#9d94ff] uppercase tracking-wider mb-1">Brand Deal</p>
                    <p className="text-white text-xs font-bold">Dedicated Instagram Reel</p>
                    <p className="text-white/40 text-[10px] mt-0.5">Includes 1× story mention + link in bio for 7 days</p>
                    <p className="text-[#9d94ff] text-xs font-bold mt-2">Starting ₹15,000</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">UGC Package</p>
                    <p className="text-white text-xs font-bold">3× Raw UGC Videos</p>
                    <p className="text-white/40 text-[10px] mt-0.5">No posting required — raw content delivered in 5 days</p>
                    <p className="text-[#9d94ff] text-xs font-bold mt-2">Starting ₹8,000</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PRODUCT TYPES ── */}
      <section className="bg-white pt-80 lg:pt-96 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#695dd4] uppercase mb-4">Everything in one storefront</p>
            <h2 className="font-display text-3xl sm:text-4xl font-[900] text-[#1b1b1b] tracking-tight">
              Four types of things you can sell
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-3 max-w-lg mx-auto">
              All managed from the same QuickRevert dashboard. One link. Every product type.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {productTypes.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="bg-[#fafafa] rounded-2xl p-6 border border-slate-100">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: p.color + '18' }}
                  >
                    <Icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1b1b1b] mb-1">{p.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="bg-[#f7f7f9] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-[900] text-[#1b1b1b] tracking-tight">
              Built for creators who sell
            </h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium mt-3 max-w-lg mx-auto">
              My Store isn't just a link page. It's a full creator commerce layer built into your QuickRevert account.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {creatorFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="h-9 w-9 rounded-xl bg-[#f0edfc] flex items-center justify-center mb-4">
                    <Icon className="h-4.5 w-4.5 text-[#695dd4]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1b1b1b] mb-1.5">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW TO SET UP ── */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-[900] text-[#1b1b1b] tracking-tight">
              Get your store live in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Instagram',
                desc: 'Log in and link your Instagram Business profile. Your store slug is set automatically to your IG username.',
              },
              {
                step: '02',
                title: 'Add products & sessions',
                desc: 'Use the product form to add digital downloads, physical items, or 1:1 session packages with available time slots.',
              },
              {
                step: '03',
                title: 'Drop the link in your bio',
                desc: 'Share app.quickrevert.tech/s/yourhandle in your Instagram bio. Visitors land on your branded storefront immediately.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-12 w-12 rounded-2xl bg-[#f0edfc] flex items-center justify-center mx-auto mb-5">
                  <span className="text-base font-[900] text-[#695dd4]">{s.step}</span>
                </div>
                <h3 className="text-base font-bold text-[#1b1b1b] mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1b1b1b] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-[900] text-white tracking-tight mb-4">
            Your store, at your Instagram link.
          </h2>
          <p className="text-white/50 text-sm sm:text-base font-medium mb-8 max-w-md mx-auto">
            Included in every QuickRevert Pro plan. One link. Every product. Zero setup complexity.
          </p>
          <button
            onClick={onBack}
            className="bg-[#695dd4] hover:bg-[#5b51c1] text-white text-sm font-bold px-10 py-4 rounded-2xl shadow-xl transition-all"
          >
            Open My Store dashboard →
          </button>
        </div>
      </section>

    </div>
  );
}
