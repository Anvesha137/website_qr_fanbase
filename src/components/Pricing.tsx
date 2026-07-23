import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (planName: string, price: number) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const plans = [
    {
      name: 'Free',
      badge: 'START',
      price: 'Free',
      period: 'forever',
      description: 'Launch your first Instagram automations',
      features: [
        'Comment to DMs',
        'Auto reply',
        'Follower CRM'
      ],
      bgClass: 'bg-[#695dd4]',
      textClass: 'text-white',
      badgeClass: 'bg-white text-[#695dd4]',
      btnClass: 'bg-white hover:bg-slate-100 text-[#695dd4]',
      checkBgClass: 'bg-white/20',
      checkColorClass: 'text-white'
    },
    {
      name: 'Pro',
      badge: 'PRO',
      price: '$20',
      period: '/ month',
      description: 'More DMs, AI replies and audience insights',
      features: [
        'Unlimited DMs campaigns',
        'Auto reply',
        'AI assisted replies',
        'AI Copilot',
        'Conversation Management',
        'Custom triggers'
      ],
      bgClass: 'bg-[#1b1b1b]',
      textClass: 'text-white',
      badgeClass: 'bg-[#1b1b1b] border border-white/25 text-white',
      btnClass: 'bg-white hover:bg-slate-100 text-[#1b1b1b]',
      checkBgClass: 'bg-white/20',
      checkColorClass: 'text-white'
    }
  ];

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-4">
            Choose the plan that is right <br className="hidden sm:inline" /> for you
          </h2>
        </div>

        {/* Side-by-side layout precisely matching quickrevert.gg */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden text-left ${plan.bgClass} ${plan.textClass}`}
            >
              <div>
                {/* Badge Tag */}
                <div className="mb-6">
                  <span className={`inline-flex px-3.5 py-1 text-[11px] font-extrabold rounded-full tracking-wider uppercase ${plan.badgeClass}`}>
                    {plan.badge}
                  </span>
                </div>

                {/* Pricing amount & Period */}
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="font-display text-5xl sm:text-6xl font-extrabold leading-none tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-semibold opacity-90">
                    {plan.period}
                  </span>
                </div>

                {/* Short description */}
                <p className="text-sm font-semibold opacity-90 mb-8 max-w-[260px]">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/10 w-full mb-8" />

                {/* Feature Bullets with White Circles */}
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3.5 text-sm sm:text-base font-semibold leading-relaxed">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${plan.checkBgClass}`}>
                        <Check className={`h-3 w-3 ${plan.checkColorClass} stroke-[3.5]`} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get started button */}
              <button
                onClick={() => onSelectPlan(plan.name, plan.name === 'Free' ? 0 : 20)}
                className={`w-full py-4 text-center rounded-2xl text-sm font-bold shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 ${plan.btnClass}`}
              >
                Get started
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
