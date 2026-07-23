import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Instagram, MessageSquare, Shield, Smartphone, Compass, Clock, RefreshCw } from 'lucide-react';

export default function Playground() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-slate-50/50 py-24 border-t border-slate-100" id="playground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION 1: Automate DMs, replies to comments and conversations */}
        {/* ========================================================================= */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b]">
            Automate DMs, replies <br className="hidden sm:inline" /> to comments and conversations
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          
          {/* Block 1: Comment to DM */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative min-h-[520px] shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Icon */}
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#695dd4]">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 30 27">
                  <use href="#svg-1457083296_339"></use>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1b1b1b] mb-2">Comment to DM</h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                Send a link or message when someone comments a keyword.
              </p>
            </div>

            {/* Visual Chat Mockup */}
            <div className="relative h-64 w-full flex flex-col justify-end">
              {/* Instagram notification comment bubble */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-start space-x-3 max-w-[340px] absolute top-2 left-4 z-10"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center shrink-0">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                    <Instagram className="h-4.5 w-4.5 text-pink-600" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-800">TOM COMMENTED</span>
                    <span className="text-[10px] text-slate-400 font-medium">16s ago</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">Where can I get this merch?</p>
                </div>
              </motion.div>

              {/* Reply message bubble */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-[#695dd4] text-white p-5 rounded-2xl rounded-tr-none shadow-xl max-w-[280px] self-end mr-4 mb-4 text-left"
              >
                <p className="text-xs font-semibold leading-relaxed mb-3">
                  Hey, here's the link, and a 20% discount code because... why not!
                </p>
                <button className="w-full py-2 bg-white/25 hover:bg-white/35 transition-colors text-white text-xs font-bold rounded-lg tracking-tight">
                  Open Link
                </button>
              </motion.div>
            </div>
          </div>

          {/* Block 2: Auto Replies */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative min-h-[520px] shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Icon */}
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#695dd4]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1b1b1b] mb-2">Auto Replies</h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                Reply to comments, DMs and story mentions automatically.
              </p>
            </div>

            {/* Instagram Mock Drawer */}
            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-100 p-5 w-[85%] mx-auto flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold text-slate-800">Comments</span>
                <span className="h-1 w-8 bg-slate-300 rounded-full"></span>
              </div>

              {/* Comment Thread 1 */}
              <div className="flex items-start space-x-3 text-left">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                  alt="Avatar" 
                  className="h-8 w-8 rounded-full object-cover shrink-0" 
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900">Jen Kensington <span className="text-slate-400 font-normal">2h</span></p>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">Where can I watch the replay?</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Reply</p>
                </div>
                <div className="text-center text-[10px] text-slate-400 font-medium">
                  <span>❤️</span>
                  <p className="mt-0.5">500</p>
                </div>
              </div>

              {/* Your Auto Reply 1 */}
              <div className="flex items-start space-x-3 text-left pl-8 border-l border-slate-100">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-xs">👋</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900">You <span className="text-slate-400 font-normal">2h</span></p>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    <span className="text-[#695dd4] font-semibold">@Jen Kensington</span> here's the link
                  </p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Reply</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: Engage with new followers & Manage conversations */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Block 3: Engage with new followers */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative min-h-[520px] shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Icon */}
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#695dd4]">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1b1b1b] mb-2">Engage with new followers</h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                Start conversations with new followers who interact with you.
              </p>
            </div>

            {/* Custom high-fidelity Phone screen mockup */}
            <div className="relative w-[280px] mx-auto h-64 bg-slate-950 rounded-t-3xl p-3 border-x-4 border-t-4 border-slate-900 overflow-hidden flex flex-col">
              <div className="w-full flex justify-between items-center text-[10px] text-white/50 px-3 py-1 font-semibold">
                <span>9:41</span>
                <div className="h-3 w-16 bg-black rounded-full"></div>
                <span>100%</span>
              </div>

              {/* Inner screen area */}
              <div className="bg-white rounded-t-2xl flex-1 p-3 flex flex-col justify-between">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                    alt="Emma Avatar" 
                    className="h-7 w-7 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-800 leading-none">Emma Winterton</h5>
                    <span className="text-[8px] text-slate-400 font-medium">@emwinter</span>
                  </div>
                </div>

                <div className="space-y-2 mt-4 flex-1 flex flex-col justify-end">
                  <div className="self-center bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 text-[8px] font-semibold mb-2">
                    ⚡ New follower automation started
                  </div>
                  <div className="bg-[#695dd4] text-white p-2.5 rounded-xl rounded-bl-none text-[10px] max-w-[180px] font-medium leading-relaxed">
                    Hi Emma 👋 I noticed you followed us, welcome!
                  </div>
                  <div className="bg-[#695dd4] text-white p-2.5 rounded-xl rounded-bl-none text-[10px] max-w-[180px] font-medium leading-relaxed">
                    If you want to join our community or chat with our team, we’re active on Discord!
                    <button className="w-full py-1 bg-white/20 hover:bg-white/30 text-white rounded-md mt-2 font-bold text-[9px]">
                      Join Discord
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 4: Manage conversations */}
          <div className="bg-[#f2f2f4] rounded-3xl p-8 sm:p-12 flex flex-col justify-between overflow-hidden relative min-h-[520px] shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              {/* Icon */}
              <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-[#695dd4]">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 32 32">
                  <use href="#svg-1749685794_1949"></use>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1b1b1b] mb-2">Manage conversations</h3>
              <p className="text-slate-500 font-medium text-sm sm:text-base leading-relaxed mb-10 max-w-md">
                Keep campaign replies and DMs organised in one place.
              </p>
            </div>

            {/* Dashboard Screenshot Mockup */}
            <div className="relative h-64 w-[90%] mx-auto rounded-t-2xl shadow-2xl border-t border-x border-slate-200 overflow-hidden">
              <img 
                src="https://framerusercontent.com/images/tFr6Yxliq8Nbul1HzqGEp5UscY.png" 
                alt="QuickRevert App dashboard CRM preview" 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
