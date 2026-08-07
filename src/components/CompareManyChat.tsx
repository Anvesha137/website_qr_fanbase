import React from 'react';
import { Check, X, Zap } from 'lucide-react';
import { ViewMode } from './Navbar';

interface Props {
  setViewMode: (mode: ViewMode) => void;
}

type CellValue = boolean | 'planned' | 'via-integrations' | 'available' | 'blank';

interface Row {
  feature: string;
  qr: CellValue;
  qr_pro: CellValue;
  manychat: CellValue;
}

const rows: Row[] = [
  { feature: 'Instagram Comment → DM',      qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'Instagram Keyword Automation', qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'Story Reply Automation',       qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'DM Automation',               qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'Welcome Messages',            qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'Unlimited Automations',       qr: true,    qr_pro: true,        manychat: true           },
  { feature: 'Ask to Follow Growth Tool',   qr: true,    qr_pro: true,        manychat: false          },
  { feature: 'Carousel Automations',        qr: 'blank', qr_pro: true,        manychat: true           },
  { feature: 'Menu Flows',                  qr: 'blank', qr_pro: true,        manychat: true           },
  { feature: 'Lead Manager',               qr: 'blank', qr_pro: true,        manychat: 'via-integrations' },
  { feature: 'Lead Follow-Ups',            qr: 'blank', qr_pro: true,        manychat: 'via-integrations' },
  { feature: 'Creator Invoice Generator',  qr: 'blank', qr_pro: true,        manychat: false          },
  { feature: 'MyStore (Link-in-Bio)',      qr: true,    qr_pro: true,        manychat: false          },
  { feature: 'AI Replies',                 qr: 'blank', qr_pro: 'planned',   manychat: 'available'    },
  { feature: 'Multi-channel Automation',   qr: false,   qr_pro: false,       manychat: true           },
];

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50">
        <Check className="w-4 h-4 text-emerald-500 stroke-[2.8]" />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-50">
        <X className="w-4 h-4 text-rose-400 stroke-[2.2]" />
      </span>
    );
  if (value === 'blank')
    return <span className="text-slate-300 text-lg font-light">—</span>;
  if (value === 'planned')
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        <Zap className="w-2.5 h-2.5" /> Planned
      </span>
    );
  if (value === 'via-integrations')
    return (
      <span className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        Via Integrations
      </span>
    );
  if (value === 'available')
    return (
      <span className="inline-flex items-center text-[10px] font-bold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full whitespace-nowrap">
        Available
      </span>
    );
  return null;
}

export default function CompareManyChat({ setViewMode }: Props) {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ── Intro ── */}
      <section
        className="relative overflow-hidden pt-20 pb-24 px-4 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #703ded 0%, #5a42c8 60%, #3b2fa0 100%)' }}
      >
        {/* purple grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* eyebrow */}
          <span className="inline-flex items-center text-[11px] font-mono font-bold tracking-[0.18em] text-white/70 uppercase bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
            Comparison
          </span>

          {/* headline */}
          <h1 className="font-onest text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-10">
            QuickRevert vs ManyChat
          </h1>

          {/* paragraphs */}
          <div className="max-w-3xl mx-auto space-y-5">
            <p className="font-onest text-base sm:text-lg text-white/85 leading-relaxed">
              QuickRevert is an Instagram-first automation platform built for creators, coaches, agencies, and businesses that want to grow faster without paying enterprise-level prices or navigating complex automation builders.
            </p>
            <p className="font-onest text-base sm:text-lg text-white/85 leading-relaxed">
              Unlike ManyChat, which is designed for multi-channel marketing and uses contact-based pricing that grows with your audience, QuickRevert keeps things simple with transparent flat-rate plans. You get powerful Instagram automation, unlimited workflows, unlimited DMs, and essential growth tools—all without worrying about your monthly bill increasing as your account scales.
            </p>
            <p className="font-onest text-base sm:text-lg text-white/85 leading-relaxed">
              From Comment-to-DM automation and Story Reply automation to Lead Management, Appointment Booking, Ask to Follow, and Creator Store, QuickRevert combines marketing automation with practical business tools that help convert conversations into customers.
            </p>
            <p className="font-onest text-base sm:text-lg text-white/85 leading-relaxed">
              Whether you're launching your first Instagram funnel or managing thousands of conversations every month, QuickRevert helps you automate engagement, capture qualified leads, and grow your business with an interface that's intuitive from day one.
            </p>
            <p className="font-onest text-base sm:text-lg font-bold text-white leading-relaxed pt-4 border-t border-white/20">
              Built for Instagram. Designed for growth. Priced for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* ── Table ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="overflow-x-auto rounded-3xl border border-slate-100 shadow-xl">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="text-left py-5 px-6 text-sm font-extrabold text-slate-500 uppercase tracking-wider bg-slate-50 rounded-tl-3xl w-[40%]">
                  Feature
                </th>
                {/* QR Starter */}
                <th className="py-5 px-4 text-center bg-[#695dd4]/5 border-x border-[#695dd4]/10 w-[20%]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-[#695dd4] uppercase tracking-wider leading-tight">QuickRevert</span>
                    <span className="text-[10px] font-bold text-slate-400 mt-0.5">$8 / month</span>
                  </div>
                </th>
                {/* QR Pro */}
                <th className="py-5 px-4 text-center bg-[#695dd4]/10 border-r border-[#695dd4]/10 w-[20%]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-[#695dd4] uppercase tracking-wider leading-tight">QuickRevert Professional</span>
                    <span className="text-[10px] font-bold text-[#695dd4]/60 mt-0.5">$14 / month</span>
                  </div>
                </th>
                {/* ManyChat */}
                <th className="py-5 px-4 text-center bg-slate-50 rounded-tr-3xl w-[20%]">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">ManyChat</span>
                    <span className="text-[10px] font-bold text-slate-400 mt-0.5">$29 / month</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-t border-slate-50 hover:bg-slate-50/60 transition-colors"
                >
                  <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                    {row.feature}
                  </td>
                  <td className="py-4 px-4 text-center bg-[#695dd4]/[0.03] border-x border-[#695dd4]/8">
                    <div className="flex justify-center"><Cell value={row.qr} /></div>
                  </td>
                  <td className="py-4 px-4 text-center bg-[#695dd4]/[0.05] border-r border-[#695dd4]/8">
                    <div className="flex justify-center"><Cell value={row.qr_pro} /></div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex justify-center"><Cell value={row.manychat} /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
