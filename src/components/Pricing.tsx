import React, { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';

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

  const plans: Plan[] = [
    {
      name: 'FREE',
      description: 'Best for getting started.',
      btn: 'Start Free',
      price: '0',
      features: [
        { text: '1 Instagram Account', included: true },
        { text: '5 Automations', included: true },
        { text: '2,000 DMs', included: true },
        { text: 'Ask to follow', included: false },
        { text: 'Carousel msgs', included: false },
        { text: 'Lead Manager', included: false },
        { text: 'Follow up msgs', included: false },
        { text: '1:1 appointment manager*', included: false },
      ],
    },
    {
      name: 'TRY ME OUT',
      description: 'Test the core experience quickly.',
      btn: 'Try Now',
      badge: '1 month only',
      oneTimePrice: 249,
      features: [
        { text: '1 Instagram Account', included: true },
        { text: '10 Automations', included: true },
        { text: '10,000 DMs', included: true },
        { text: 'Ask to follow', included: true },
        { text: 'Carousel msgs', included: true },
        { text: 'Lead Manager', included: true },
        { text: 'Follow up msgs', included: true },
        { text: '1:1 appointment manager*', included: true },
      ],
    },
    {
      name: 'PREMIUM',
      description: 'For creators ready to scale.',
      btn: 'Start Premium',
      quarterlyMonthlyEffective: 399,
      annuallyMonthlyEffective: 349,
      features: [
        { text: '1 Instagram Account', included: true },
        { text: 'Unlimited automations', included: true },
        { text: 'Unlimited DMs', included: true },
        { text: 'Ask to follow', included: true },
        { text: 'Carousel msgs', included: false },
        { text: 'Lead Manager', included: false },
        { text: 'Follow up msgs', included: false },
        { text: '1:1 appointment manager*', included: false },
      ],
    },
    {
      name: 'PROFESSIONAL',
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
        { text: 'Carousel msgs', included: true },
        { text: 'Lead Manager', included: true },
        { text: 'Follow up msgs', included: true },
        { text: '1:1 appointment manager*', included: true },
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
    <section id="pricing" className="py-12 lg:py-20 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 font-onest">
            Simple, scalable pricing
          </h2>
          <p className="text-slate-500 text-lg font-medium font-sans">
            Choose the plan that fits your growth stage.
          </p>

          <div className="mt-8 inline-flex flex-col items-center select-none">
            <div className="inline-flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setIsAnnually(false)}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${!isAnnually
                  ? 'bg-[#695dd4] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setIsAnnually(true)}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isAnnually
                  ? 'bg-[#695dd4] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
                  }`}
              >
                Annually
              </button>
            </div>
            <div className="w-full flex justify-end pr-2 mt-1.5">
              <span className="text-[10px] font-black text-orange-500 tracking-widest animate-pulse">
                Save ₹600/year
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-5 rounded-[2rem] border flex flex-col relative transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${plan.dark
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-100'
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
                  className={`text-xl font-semibold tracking-tight font-onest mb-1 ${plan.dark ? 'text-white' : 'text-slate-900'
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
                className={`w-full py-3 rounded-xl font-semibold text-xs text-center transition-all mb-6 cursor-pointer font-sans ${plan.name === 'FREE' || plan.name === 'TRY ME OUT'
                  ? 'border border-slate-300 text-slate-600 hover:border-[#695dd4] hover:text-[#695dd4]'
                  : plan.dark
                    ? 'bg-[#695dd4] text-white hover:bg-[#5a50c6] shadow-lg shadow-[#695dd4]/30'
                    : 'border border-slate-300 text-slate-600 hover:border-[#695dd4] hover:text-[#695dd4]'
                  }`}
              >
                {plan.btn}
              </a>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex gap-2 text-[10px] font-medium leading-tight">
                    {feature.included ? (
                      <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={plan.dark ? 'text-slate-300' : 'text-slate-600'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO-friendly Pricing FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-onest text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pricing FAQs
            </h3>
            <p className="text-slate-500 font-sans text-sm sm:text-base mt-2">
              Common questions about our plans, limits, and billing
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is there a free plan available?",
                a: "Yes. Our Free plan includes 3 automations and a 2,000 DM limit every month — no card required, no time limit on how long you can use it."
              },
              {
                q: 'What is the "Try Me Out" plan?',
                a: "It's a one-time trial that unlocks everything in our Premium plan — 10 automations and a 10,000 DM limit — for one full month, so you can properly test QuickRevert at scale before committing. It's available once per account."
              },
              {
                q: 'What happens after my "Try Me Out" month ends?',
                a: "You'll automatically move back to the Free plan (3 automations, 2,000 DMs/month) unless you upgrade to a paid plan before it ends. We'll remind you a few days before it expires."
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
              },
              {
                q: "Can I downgrade or cancel anytime?",
                a: "Yes, no lock-in contracts. You can downgrade or cancel whenever you like from your account settings."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 bg-white rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden transition-all duration-300 open:shadow-md text-left"
              >
                <summary className="flex items-center justify-between font-onest font-bold text-slate-800 cursor-pointer list-none text-base sm:text-lg focus:outline-none select-none">
                  <span>{faq.q}</span>
                  <span className="transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4">
                    <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </span>
                </summary>
                <p className="mt-3 text-slate-600 font-sans text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
