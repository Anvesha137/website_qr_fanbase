import React from 'react';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';

export default function StayForRest() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="stay-for-rest">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1b1b1b] mb-4">
            Join for DM automation.<br className="hidden sm:inline" /> Stay for the rest.
          </h2>
          <p className="text-slate-500 font-sans text-base sm:text-lg max-w-2xl mx-auto font-medium">
            QuickRevert includes other tools to help you manage and grow your audience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1: Beyond just Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-sm hover:shadow-xl hover:shadow-[#695dd4]/10 border border-slate-200/60 transition-all duration-300 md:col-span-2 lg:col-span-2 group"
          >
            <div className="relative w-full h-48 rounded-2xl bg-gradient-to-br from-indigo-900/10 via-purple-600/5 to-slate-200 overflow-hidden flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3.5 shadow-2xl flex items-center space-x-4 group-hover:scale-105 transition-transform">
                <span className="text-xl">🎵</span>
                <span className="text-xl">🎮</span>
                <span className="text-xl">📺</span>
                <span className="text-xl">💬</span>
                <span className="text-xl">𝕏</span>
                <span className="text-xl">📸</span>
                <span className="text-xl">🛍️</span>
              </div>
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-display text-xl font-bold text-[#1b1b1b] mb-2">Beyond just Instagram</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Connect all your socials to manage your whole community from one place and engage every follower, wherever they show up online.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Automated actions, on your schedule */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-sm hover:shadow-xl hover:shadow-[#695dd4]/10 border border-slate-200/60 transition-all duration-300 md:col-span-1 lg:col-span-1 group"
          >
            <div className="relative w-full h-48 bg-white rounded-2xl p-4 shadow-inner overflow-hidden border border-slate-100 text-left">
              <div className="flex space-x-1 mb-2">
                <span className="text-xs font-bold text-[#695dd4]">Schedule</span>
                <span className="text-xs text-slate-400 font-medium">weekly view</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <span className="text-[8px] font-bold text-slate-400">Mon 13</span>
                  <div className="bg-[#695dd4]/10 text-[#695dd4] text-[8px] font-bold px-1 py-0.5 rounded mt-1.5">Reply DMs</div>
                </div>
                <div className="bg-indigo-50 p-1.5 rounded-lg border border-indigo-100">
                  <span className="text-[8px] font-bold text-slate-400">Tue 14</span>
                  <div className="bg-emerald-500/10 text-emerald-600 text-[8px] font-bold px-1 py-0.5 rounded mt-1.5">Auto Reply</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <span className="text-[8px] font-bold text-slate-400">Wed 15</span>
                  <div className="bg-[#695dd4]/10 text-[#695dd4] text-[8px] font-bold px-1 py-0.5 rounded mt-1.5">Report</div>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <span className="text-[8px] font-bold text-slate-400">Thu 16</span>
                  <div className="bg-amber-500/10 text-amber-600 text-[8px] font-bold px-1 py-0.5 rounded mt-1.5">Repost</div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-display text-xl font-bold text-[#1b1b1b] mb-2">Automated actions, on your schedule</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Replies, drafts, digests, alerts. Define what runs and when. Your community stays active even when you're not.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Track followers interactions */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-sm hover:shadow-xl hover:shadow-[#695dd4]/10 border border-slate-200/60 transition-all duration-300 md:col-span-1 lg:col-span-1 group"
          >
            <div className="relative w-full h-48 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center p-6">
              <div className="bg-white rounded-xl p-3 shadow-2xl border border-slate-100 flex items-center space-x-3 w-full group-hover:scale-105 transition-transform">
                <div className="h-8 w-8 rounded-full bg-[#695dd4]/10 flex items-center justify-center text-[#695dd4]">
                  <Instagram className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] font-bold text-slate-800 leading-none">New Instagram mention</p>
                  <span className="text-[8px] text-[#695dd4] font-semibold mt-1 inline-block bg-[#695dd4]/10 px-1.5 py-0.5 rounded">Social CRM</span>
                </div>
              </div>
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-display text-xl font-bold text-[#1b1b1b] mb-2">Track followers interactions</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Every mention, reply, and DM builds a complete picture of your community, automatically populating a social CRM.
              </p>
            </div>
          </motion.div>

          {/* Card 4: All your analytics in one view */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-sm hover:shadow-xl hover:shadow-[#695dd4]/10 border border-slate-200/60 transition-all duration-300 md:col-span-1 lg:col-span-1 group"
          >
            <div className="relative w-full h-48 bg-gradient-to-tr from-indigo-900 to-slate-900 rounded-2xl flex flex-col justify-center px-4 space-y-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex justify-between items-center border border-white/5 text-left">
                <span className="text-[9px] font-bold text-white/50 uppercase">Total Reach</span>
                <span className="text-xs font-extrabold text-white">103,456</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex justify-between items-center border border-white/5 text-left">
                <span className="text-[9px] font-bold text-white/50 uppercase">Active</span>
                <span className="text-xs font-extrabold text-white">13,456</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 flex justify-between items-center border border-white/5 text-left">
                <span className="text-[9px] font-bold text-white/50 uppercase">Superfans</span>
                <span className="text-xs font-extrabold text-white">3,456</span>
              </div>
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-display text-xl font-bold text-[#1b1b1b] mb-2">All your analytics in one view</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Reach, sentiment, and engagement across every platform are now available in one place to give you the full picture.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Knowledge base */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#f2f2f4] rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative min-h-[440px] shadow-sm hover:shadow-xl hover:shadow-[#695dd4]/10 border border-slate-200/60 transition-all duration-300 md:col-span-1 lg:col-span-1 group"
          >
            <div className="relative w-full h-48 bg-slate-950 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="h-16 w-32 border-t-[8px] border-x-[8px] border-[#695dd4] rounded-t-full flex flex-col items-center justify-end pb-1.5 group-hover:scale-105 transition-transform">
                <span className="text-[8px] text-white/40 uppercase font-bold tracking-widest">Mind Quality</span>
                <span className="text-xs font-extrabold text-white">Brilliant</span>
              </div>
            </div>
            <div className="mt-6 text-left">
              <h3 className="font-display text-xl font-bold text-[#1b1b1b] mb-2">Knowledge base</h3>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Your knowledge base updates itself from your content, conversations, and recent posts so every automation runs with the latest context.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
