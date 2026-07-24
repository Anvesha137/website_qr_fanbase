import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does this product work?',
      a: 'QuickRevert helps creators and brands turn social followers into customers. Start with Instagram DM automation: keyword-triggered DMs, auto-replies to comments, welcome messages for new followers, and follow-up flows. The full product also includes a fan CRM, cross-platform tracking across Discord, Twitch, X, and YouTube, and an AI Copilot that helps you manage your community in one place.'
    },
    {
      q: 'How much does it cost?',
      a: 'QuickRevert has four plans: a Free Plan, a Try Me Out plan, a Premium Plan, and a Professional Plan designed to scale with your growth stage.'
    },
    {
      q: 'How does billing work?',
      a: 'QuickRevert works on one-time payments — you pay once upfront for your chosen duration (monthly, quarterly, or annual), and that\'s it. There\'s no autopay or card-on-file setup, so you\'re never charged again without your knowledge.'
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Since there\'s no auto-renewal, there\'s nothing to "cancel" — your plan simply runs for the duration you paid for (1, 3, or 12 months) and then expires. You decide if and when to pay again.'
    },
    {
      q: 'Is QuickRevert officially approved by Instagram?',
      a: 'Yes, QuickRevert is 100% official and compliant. We connect directly with Instagram and Meta official APIs. We never ask for your password, and our automated responses run entirely through secure, official Meta server infrastructure, meaning your account remains completely safe and compliant.'
    },
    {
      q: 'What is the AI Copilot?',
      a: 'The AI Copilot is an intelligent assistant connected directly to your platforms. It tracks fan engagement, learns from what happens within your community, and automatically populates a knowledge base from your content and posts. It can suggest who to follow up with and assist with draft replies on autopilot.'
    },
    {
      q: 'Who\'s the team behind QuickRevert?',
      a: 'QuickRevert is built by XBorg, a leading digital identity and community platform that specializes in building tools for audience engagement, social credentials, and next-generation fan loyalty networks.'
    }
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-onest text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-4">
            Frequently Asked <br /> Questions
          </h2>
        </div>

        {/* FAQ List matching quickrevert.gg exactly */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#f2f2f4] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full flex items-center justify-between px-8 py-6 text-left focus:outline-none"
                  id={`faq-item-toggle-${idx}`}
                >
                  <span className="font-onest text-lg sm:text-xl font-bold text-[#1b1b1b] pr-4 leading-snug">
                    {faq.q}
                  </span>
                  
                  {/* Custom Blue Plus/Minus Toggle Symbol */}
                  <div className="h-6 w-6 flex items-center justify-center shrink-0 relative">
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
                      <div className="px-8 pb-8 pt-1 text-slate-500 font-sans font-medium text-sm sm:text-base leading-relaxed">
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
    </section>
  );
}
