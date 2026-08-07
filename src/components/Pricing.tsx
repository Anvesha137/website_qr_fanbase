import React, { useState, useRef } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import TextRoll from './TextRoll';

type Feature = {
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  description: string;
  btn: string;
  badge?: string;
  popular?: boolean;
  dark?: boolean;
  price?: string;
  isCustom?: boolean;
  quarterlyMonthlyEffective?: number;
  annuallyMonthlyEffective?: number;
  oneTimePrice?: number;
  features: Feature[];
};

export default function Pricing() {
  const [isAnnually, setIsAnnually] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const premiumCardRef = useRef<HTMLDivElement>(null);

  const handleAnnuallyClick = () => {
    setIsAnnually(true);
    setTimeout(() => {
      premiumCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const plans: Plan[] = [
    {
      name: 'Free',
      description: 'Best for getting started.',
      btn: 'Start Free',
      price: '0',
      features: [
        { text: '5 Automations', included: true },
        { text: '2,000 DMs', included: true },
        { text: 'Ask to follow', included: false },
        { text: 'Carousel messages', included: false },
        { text: 'Lead Manager', included: false },
        { text: 'Follow up messages', included: false },
        { text: '1:1 appointment manager', included: false },
      ],
    },
    {
      name: 'Try Me Out',
      description: 'Test the core experience quickly.',
      btn: 'Try Now',
      badge: 'first month only',
      oneTimePrice: 249,
      features: [
        { text: '10 Automations', included: true },
        { text: '10,000 DMs', included: true },
        { text: 'Ask to follow', included: true },
        { text: 'Carousel messages', included: true },
        { text: 'Lead Manager', included: true },
        { text: 'Follow up messages', included: true },
        { text: '1:1 appointment manager', included: true },
      ],
    },
    {
      name: 'Premium',
      description: 'For creators ready to scale.',
      btn: 'Start Premium',
      quarterlyMonthlyEffective: 399,
      annuallyMonthlyEffective: 349,
      features: [
        { text: 'Unlimited automations', included: true },
        { text: 'Unlimited DMs', included: true },
        { text: 'Ask to follow', included: true },
        { text: 'Carousel messages', included: false },
        { text: 'Lead Manager', included: false },
        { text: 'Follow up messages', included: false },
        { text: '1:1 appointment manager', included: false },
      ],
    },
    {
      name: 'Professional',
      description: 'Advanced tools for high-growth accounts.',
      btn: 'Go Professional',
      popular: true,
      dark: true,
      quarterlyMonthlyEffective: 699,
      annuallyMonthlyEffective: 599,
      features: [
        { text: 'Unlimited automations', included: true },
        { text: 'Unlimited DMs', included: true },
        { text: 'Ask to follow', included: true },
        { text: 'Carousel messages', included: true },
        { text: 'Lead Manager', included: true },
        { text: 'Follow up messages', included: true },
        { text: '1:1 appointment manager', included: true },
      ],
    },
  ];

  const fontDisplayClass = 'font-onest font-bold tracking-tight tabular-nums';

  const renderPrice = (plan: Plan) => {
    if (plan.isCustom) {
      return (
        <div>
          <span
            className={`text-3xl ${fontDisplayClass} ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            {plan.price}
          </span>
        </div>
      );
    }

    if (plan.oneTimePrice !== undefined) {
      return (
        <div>
          <span
            className={`text-3xl ${fontDisplayClass} ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            ₹{plan.oneTimePrice}
          </span>
          <span
            className={`text-[10px] align-bottom ml-1 font-bold opacity-60 ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            / one-time
          </span>
        </div>
      );
    }

    if (plan.price !== undefined) {
      return (
        <div>
          <span
            className={`text-3xl ${fontDisplayClass} ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            ₹{plan.price}
          </span>
        </div>
      );
    }

    const effectivePrice = isAnnually
      ? plan.annuallyMonthlyEffective
      : plan.quarterlyMonthlyEffective;
    const totalPrice = effectivePrice !== undefined
      ? effectivePrice * (isAnnually ? 12 : 3)
      : undefined;
    const durationLabel = isAnnually ? 'annually' : 'quarterly';

    return (
      <div>
        <div className="flex items-end gap-1">
          <span
            className={`text-3xl ${fontDisplayClass} ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            ₹{effectivePrice}
          </span>
          <span
            className={`text-[10px] mb-1 font-bold opacity-60 ${plan.dark ? 'text-white' : 'text-slate-900'}`}
          >
            /mo
          </span>
        </div>
        <p
          className={`text-[9px] mt-0.5 font-bold uppercase tracking-wider ${plan.dark ? 'text-slate-400' : 'text-slate-500'}`}
        >
          ₹{totalPrice} billed {durationLabel}
        </p>
      </div>
    );
  };

  return (
    <section
      id="pricing"
      className="py-12 lg:py-20 bg-[#703ded] relative text-white"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2 font-onest drop-shadow-md">
            Plans Built for Every Stage.
          </h2>

          <div className="mt-8 relative inline-flex flex-col items-center select-none">
            {/* Floating Tooltip Badge overlapping Annually button */}
            <div className="absolute -top-6 right-1 z-10 pointer-events-none">
              <div className="relative bg-white border border-slate-200 shadow-xl rounded-lg px-3 py-0.5 text-[11px] font-bold text-slate-500 tracking-tight flex items-center justify-center font-onest whitespace-nowrap">
                <span>Save up to 15%</span>
                {/* Pointer Caret overlapping the top border of Annually */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-slate-200 rotate-45 z-20" />
              </div>
            </div>

            <div className="inline-flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-md relative z-0">
              <button
                onClick={() => setIsAnnually(false)}
                className={`group px-6 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${!isAnnually
                  ? 'bg-[#695dd4] text-white shadow-md'
                  : 'text-slate-900 hover:text-black'
                  }`}
              >
                <TextRoll>Quarterly</TextRoll>
              </button>
              <button
                onClick={handleAnnuallyClick}
                className={`group px-6 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${isAnnually
                  ? 'bg-[#695dd4] text-white shadow-md'
                  : 'text-slate-900 hover:text-black'
                  }`}
              >
                <TextRoll>Annually</TextRoll>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={plan.name === 'Premium' ? premiumCardRef : null}
              className={`p-5 rounded-[2rem] border flex flex-col relative transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${plan.dark
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-100 text-slate-900'
                } ${plan.popular ? 'border-[#695dd4] ring-2 ring-[#695dd4]/5' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#695dd4] text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  Best Value
                </div>
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div className="mb-4">
                <h3
                  className={`text-2xl font-extrabold tracking-tight font-onest mb-1 ${plan.dark ? 'text-white' : 'text-slate-900'
                    }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-[10px] font-medium leading-relaxed ${plan.dark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">{renderPrice(plan)}</div>

              <a
                href="https://app.quickrevert.tech"
                className={`group w-full py-3 rounded-xl font-semibold text-xs text-center transition-all mb-6 cursor-pointer font-sans ${plan.name === 'Free' || plan.name === 'Try Me Out'
                  ? 'border border-slate-300 text-slate-600 hover:border-[#695dd4] hover:text-[#695dd4]'
                  : plan.dark
                    ? 'bg-[#695dd4] text-white hover:bg-[#5a50c6] shadow-lg shadow-[#695dd4]/30'
                    : 'border border-slate-300 text-slate-600 hover:border-[#695dd4] hover:text-[#695dd4]'
                  }`}
              >
                <TextRoll>{plan.btn}</TextRoll>
              </a>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex gap-2.5 items-start text-[11px] sm:text-xs font-semibold leading-tight">
                    {feature.included ? (
                      <Check className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5 stroke-[2.8]" />
                    ) : (
                      <X className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5 stroke-[2.2]" />
                    )}
                    <span className={plan.dark ? 'text-slate-300' : 'text-slate-700'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO-friendly Pricing FAQ Section */}
        <div className="mt-20 sm:mt-28 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-100 uppercase bg-white/15 border border-white/25 px-3.5 py-1 rounded-full shadow-xs mb-3 inline-block">
              ✨ Got Questions?
            </span>
            <h3 className="font-onest text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              Pricing FAQs
            </h3>
            <p className="text-white/90 font-sans text-sm sm:text-base mt-2 font-medium">
              Everything you need to know about our plans, limits, and billing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {[
              {
                q: "Is there a free plan available?",
                a: "Yes. Our Free plan includes 5 automations and a 2,000 DM limit every month — no card required, no time limit on how long you can use it."
              },
              {
                q: 'What is the "Try Me Out" plan?',
                a: "It's a one-time trial that unlocks everything in our Premium plan — 10 automations and a 10,000 DM limit — for one full month, so you can properly test QuickRevert at scale before committing. It's available once per account."
              },
              {
                q: 'What happens after my "Try Me Out" month ends?',
                a: "You'll automatically move back to the Free plan (5 automations, 2,000 DMs/month) unless you upgrade to a paid plan before it ends. We'll remind you a few days before it expires."
              },
              {
                q: "How does billing work?",
                a: "QuickRevert works on one-time payments — you pay once upfront for your chosen duration (monthly, quarterly, or annual), and that's it. There's no autopay or card-on-file setup, so you're never charged again without your knowledge."
              },
              {
                q: "What is your cancellation policy?",
                a: "Since there's no auto-renewal, there's nothing to \"cancel\" — your plan simply runs for the duration you paid for (1, 3, or 12 months) and then expires. You decide if and when to pay again."
              },
              {
                q: "What happens if I hit my monthly DM limit?",
                a: "Automations pause until your limit resets next month, or you can upgrade instantly to a higher plan to keep them running without interruption."
              },
              {
                q: "Can I upgrade my plan later?",
                a: "Absolutely — you can upgrade anytime, and it takes effect immediately. No waiting for your next billing cycle."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${idx === 6 ? 'md:col-span-2 text-center' : 'text-left'} ${isOpen
                    ? 'bg-white border-white shadow-2xl ring-2 ring-white/50'
                    : 'bg-white/90 border-white/40 hover:bg-white hover:border-white/70 shadow-lg hover:shadow-xl backdrop-blur-xl'
                    }`}
                >
                  <div className={`p-5 flex items-center font-onest font-bold text-slate-900 text-base sm:text-lg select-none ${idx === 6 ? 'justify-center gap-4' : 'justify-between'}`}>
                    <span className="text-slate-900">{faq.q}</span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 ${isOpen ? 'bg-[#695dd4] text-white rotate-180 shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-[#695dd4] hover:text-white'
                        }`}
                    >
                      <ChevronDown className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-5 pt-2 text-slate-600 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
