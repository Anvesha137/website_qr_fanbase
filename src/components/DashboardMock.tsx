import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Play, Power, ShieldAlert, Sparkles, Sliders, 
  BarChart3, RefreshCw, Send, CheckCircle2, MessageSquare, 
  Trash2, ToggleLeft, ToggleRight, Zap, Users, ArrowUpRight, 
  Search, ExternalLink, Calendar, Filter, Star, TrendingUp
} from 'lucide-react';
import { AutomationRule } from '../types';

export default function DashboardMock() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'analytics' | 'logs'>('campaigns');
  
  // Base default rules for user
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: 'rule_1',
      name: 'Ebook Lead Magnet',
      triggerType: 'comment',
      triggerKeyword: 'EBOOK',
      replyText: 'Hey! Thanks for commenting EBOOK on my post. Here is your free growth guide! 📚 Click below to download.',
      commentReplyText: 'Just sent you a DM with the download link! Check your request folder if not seen. 📬',
      buttonText: 'Download PDF',
      buttonUrl: 'https://example.com/ebook.pdf',
      isActive: true,
      timesTriggered: 142
    },
    {
      id: 'rule_2',
      name: 'Discount Voucher Code',
      triggerType: 'comment',
      triggerKeyword: 'DISCOUNT',
      replyText: 'Wow, awesome! Here is your exclusive 20% discount code: QUICKREVERT20. Click below to claim and shop! 🛍️',
      commentReplyText: 'DM sent! Use the discount code inside to save 20%! ✨',
      buttonText: 'Claim 20% Off',
      buttonUrl: 'https://example.com/shop',
      isActive: true,
      timesTriggered: 89
    },
    {
      id: 'rule_3',
      name: 'Instagram Story Mention Reward',
      triggerType: 'story_mention',
      triggerKeyword: '*',
      replyText: 'Thank you so much for the story mention! 💖 Here is an exclusive 10% coupon code for your next purchase: THANKYOU10.',
      buttonText: 'Shop Creator Collection',
      buttonUrl: 'https://example.com/store',
      isActive: true,
      timesTriggered: 54
    }
  ]);

  // Form states for creating rule
  const [isCreating, setIsCreating] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newTriggerType, setNewTriggerType] = useState<'comment' | 'dm' | 'story_mention'>('comment');
  const [newKeyword, setNewKeyword] = useState('');
  const [newReply, setNewReply] = useState('');
  const [newCommentReply, setNewCommentReply] = useState('');
  const [newBtnText, setNewBtnText] = useState('');
  const [newBtnUrl, setNewBtnUrl] = useState('');

  // Live trigger logs
  const [logs, setLogs] = useState([
    { id: 'l1', username: 'alex_marketing', type: 'Comment comment', keyword: 'EBOOK', time: '1m ago', status: 'Sent DM + Comment Reply' },
    { id: 'l2', username: 'sarah.creatives', type: 'Story Mention', keyword: 'Any tag', time: '5m ago', status: 'Sent DM Coupon' },
    { id: 'l3', username: 'dan_growth', type: 'Comment comment', keyword: 'EBOOK', time: '12m ago', status: 'Sent DM + Comment Reply' },
    { id: 'l4', username: 'julie_fit', type: 'Direct message', keyword: 'HELP', time: '30m ago', status: 'No rule matched - standard inbox' },
    { id: 'l5', username: 'brent_travels', type: 'Comment comment', keyword: 'DISCOUNT', time: '42m ago', status: 'Sent DM + Comment Reply' }
  ]);

  // Simulate incoming live trigger log ticks to make the dashboard feel alive!
  useEffect(() => {
    const usernames = ['vicky_styles', 'kevin_codes', 'travel_guru', 'boutique_nyc', 'fit_queen', 'tech_nomad'];
    const keywords = ['EBOOK', 'DISCOUNT', 'HELP', 'GUIDE'];
    
    const interval = setInterval(() => {
      // Create random log
      const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      const isMatch = randomKeyword !== 'HELP';
      
      const newLog = {
        id: 'log_' + Date.now(),
        username: randomUser,
        type: Math.random() > 0.4 ? 'Comment comment' : 'Story Mention',
        keyword: randomKeyword,
        time: 'Just now',
        status: isMatch ? `Sent DM: "${randomKeyword}" rule triggered` : 'No rule matched - standard inbox'
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);

      // Increment random active rule trigger count if match
      if (isMatch) {
        setRules((prevRules) => 
          prevRules.map((rule) => {
            if (rule.triggerKeyword.toUpperCase() === randomKeyword) {
              return { ...rule, timesTriggered: rule.timesTriggered + 1 };
            }
            return rule;
          })
        );
      }
    }, 12000); // Trigger every 12s

    return () => clearInterval(interval);
  }, []);

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || !newReply) return;

    const newRule: AutomationRule = {
      id: 'rule_' + Date.now(),
      name: newRuleName,
      triggerType: newTriggerType,
      triggerKeyword: newKeyword || '*',
      replyText: newReply,
      commentReplyText: newCommentReply || undefined,
      buttonText: newBtnText || undefined,
      buttonUrl: newBtnUrl || undefined,
      isActive: true,
      timesTriggered: 0
    };

    setRules((prev) => [...prev, newRule]);
    setIsCreating(false);
    
    // Reset form
    setNewRuleName('');
    setNewKeyword('');
    setNewReply('');
    setNewCommentReply('');
    setNewBtnText('');
    setNewBtnUrl('');
  };

  const handleToggleRule = (id: string) => {
    setRules((prev) => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter(r => r.id !== id));
  };

  // Compute stats
  const totalTriggers = rules.reduce((acc, r) => acc + r.timesTriggered, 0);
  const clickThroughRate = 68.4;
  const estimatedRevenue = totalTriggers * 4.25;

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl max-w-7xl mx-auto my-12" id="dashboard-mock-container">
      {/* Dashboard Top Header */}
      <div className="border-b border-slate-800 px-6 py-5 flex flex-col sm:flex-row items-center justify-between bg-slate-950 gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-brand-primary text-white flex items-center justify-center font-display font-black text-xl">
            F
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2">
              <span>My Creator Dashboard</span>
              <span className="bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Live & Connected
              </span>
            </h3>
            <p className="text-xs text-slate-400">@sofia_designs • Official Meta API Integration</p>
          </div>
        </div>

        {/* Sync Status Button */}
        <div className="flex items-center space-x-3.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-slate-300 font-medium">Synced with Instagram</span>
          <button 
            onClick={() => {
              // Quick mock trigger log refresh
              const newLog = {
                id: 'log_' + Date.now(),
                username: 'live_refresh_test',
                type: 'Direct message',
                keyword: 'HELP',
                time: 'Just now',
                status: 'Campaign rule check completed'
              };
              setLogs(prev => [newLog, ...prev]);
            }}
            className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            id="dash-sync-btn"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left Sidebar Navigation (3 columns) */}
        <div className="lg:col-span-3 border-r border-slate-850 bg-slate-950/40 p-6 flex flex-col justify-between gap-6">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-3.5 mb-2.5">Menu</p>
            
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'campaigns' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}
              id="dash-tab-campaigns"
            >
              <Zap className="h-4 w-4 shrink-0" />
              <span>DM Automations</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'analytics' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}
              id="dash-tab-analytics"
            >
              <BarChart3 className="h-4 w-4 shrink-0" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'logs' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}
              id="dash-tab-logs"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span>Activity Log</span>
            </button>
          </div>

          {/* Connected Instagram Profile summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
              alt="Connected User" 
              className="h-9 w-9 rounded-full object-cover border border-slate-700"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Sofia Designs</p>
              <p className="text-[10px] text-slate-500 truncate">12.5K Followers connected</p>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Right Dashboard Body Content (9 columns) */}
        <div className="lg:col-span-9 p-6 bg-slate-900 flex flex-col justify-between">
          <div>
            
            {/* Dynamic Content Switching based on Sidebar Tabs */}
            <AnimatePresence mode="wait">
              {activeTab === 'campaigns' && (
                <motion.div
                  key="campaigns"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  {/* Stats Overview Pill */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total DMs Triggered</p>
                      <h4 className="font-display text-2xl font-black text-white mt-1.5">{totalTriggers}</h4>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        <span>+14.2% from last week</span>
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Conversion Rate</p>
                      <h4 className="font-display text-2xl font-black text-white mt-1.5">{clickThroughRate}%</h4>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        <span>Highly optimized</span>
                      </p>
                    </div>
                    <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimated Revenue</p>
                      <h4 className="font-display text-2xl font-black text-white mt-1.5">${estimatedRevenue.toFixed(2)}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">Based on download CTAs</p>
                    </div>
                  </div>

                  {/* Header list of campaigns */}
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <h4 className="font-display font-bold text-base text-white">Active DM Trigger Funnels</h4>
                      <p className="text-xs text-slate-400">Rules configured to auto-reply to your followers</p>
                    </div>
                    
                    <button
                      onClick={() => setIsCreating(!isCreating)}
                      className="flex items-center space-x-1.5 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-primary/95 transition-all"
                      id="dash-create-rule-btn"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create New Automation</span>
                    </button>
                  </div>

                  {/* Create New Trigger Rules Form Overlay */}
                  {isCreating && (
                    <motion.form 
                      onSubmit={handleCreateRule}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4"
                      id="create-rule-form"
                    >
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-850 pb-2">New Instagram DM Automator</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Campaign Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Free Playbook Magnet"
                            value={newRuleName}
                            onChange={(e) => setNewRuleName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trigger Keyword</label>
                          <input 
                            type="text" 
                            placeholder="e.g. EBOOK"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Trigger Source</label>
                          <select 
                            value={newTriggerType}
                            onChange={(e: any) => setNewTriggerType(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-indigo-500"
                          >
                            <option value="comment">Instagram Comment (Posts & Reels)</option>
                            <option value="dm">Direct Message (Standard Inbox)</option>
                            <option value="story_mention">Story Mention (Tag/Mention in Story)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Auto comment response (optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Just sent you a DM with the link! 📬"
                            value={newCommentReply}
                            onChange={(e) => setNewCommentReply(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Automated Direct Message (DM Content)</label>
                        <textarea 
                          rows={2}
                          required
                          placeholder="Hey! Here is your free file..."
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">DM CTA Button Text (optional)</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Download Now"
                            value={newBtnText}
                            onChange={(e) => setNewBtnText(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">DM CTA Button Link (optional)</label>
                          <input 
                            type="url" 
                            placeholder="e.g. https://example.com/file"
                            value={newBtnUrl}
                            onChange={(e) => setNewBtnUrl(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-3 pt-2">
                        <button 
                          type="button" 
                          onClick={() => setIsCreating(false)}
                          className="px-4 py-2 bg-slate-900 text-slate-400 text-xs font-bold rounded-xl hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-lg hover:bg-brand-primary/95 transition-all"
                        >
                          Add Automation Trigger
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* Rules Cards List */}
                  <div className="space-y-3">
                    {rules.length === 0 ? (
                      <div className="bg-slate-950 rounded-2xl p-10 border border-slate-800 text-center space-y-2">
                        <ShieldAlert className="h-8 w-8 text-slate-500 mx-auto" />
                        <p className="text-slate-300 font-bold text-sm">No automation rules configured</p>
                        <p className="text-xs text-slate-500">Create your first Instagram DM campaign above to get started.</p>
                      </div>
                    ) : (
                      rules.map((rule) => (
                        <div 
                          key={rule.id}
                          className={`bg-slate-950 border border-slate-850 rounded-2xl p-5 hover:border-slate-800 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${!rule.isActive ? 'opacity-65' : ''}`}
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center space-x-2.5">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${rule.triggerType === 'comment' ? 'bg-indigo-500/10 border border-indigo-400/25 text-indigo-400' : rule.triggerType === 'story_mention' ? 'bg-amber-500/10 border border-amber-400/25 text-amber-400' : 'bg-emerald-500/10 border border-emerald-400/25 text-emerald-400'}`}>
                                {rule.triggerType} Trigger
                              </span>
                              <h5 className="text-sm font-bold text-white">{rule.name}</h5>
                            </div>

                            <p className="text-xs font-medium text-slate-300">
                              Keyword matching: <span className="text-amber-400 font-bold font-mono">"{rule.triggerKeyword}"</span>
                            </p>

                            <p className="text-xs text-slate-400 line-clamp-2 italic">
                              "{rule.replyText}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t sm:border-t-0 border-slate-850 pt-3 sm:pt-0">
                            {/* Trigger metrics counter */}
                            <div className="text-left sm:text-right">
                              <span className="text-base font-extrabold text-white">{rule.timesTriggered}</span>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">Automated DMs</p>
                            </div>

                            {/* Actions & Toggles */}
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleToggleRule(rule.id)}
                                className="p-1 text-slate-400 hover:text-white transition-colors"
                              >
                                {rule.isActive ? (
                                  <ToggleRight className="h-7 w-7 text-emerald-500" />
                                ) : (
                                  <ToggleLeft className="h-7 w-7 text-slate-600" />
                                )}
                              </button>

                              <button
                                onClick={() => handleDeleteRule(rule.id)}
                                className="p-2 bg-slate-900 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-lg transition-all"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {/* Analytics View */}
              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-white">Campaign Conversion Analytics</h4>
                      <p className="text-xs text-slate-400">Review automated campaign conversions and revenue logs</p>
                    </div>
                  </div>

                  {/* Dynamic custom responsive charts (Pure SVG style) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    
                    {/* SVG Chart 1 */}
                    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                        <span>Campaign Conversions</span>
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                          <TrendingUp className="h-3 w-3 mr-0.5" /> +18%
                        </span>
                      </h5>
                      <div className="relative h-44 w-full flex items-end space-x-3.5 pt-4">
                        {/* Custom responsive pure CSS/SVG bars for flawless execution */}
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary/20 rounded-t-lg relative h-[45%] hover:bg-brand-primary/40 transition-colors">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Mon</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary/20 rounded-t-lg relative h-[65%] hover:bg-brand-primary/40 transition-colors">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Tue</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary/20 rounded-t-lg relative h-[55%] hover:bg-brand-primary/40 transition-colors">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Wed</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary rounded-t-lg relative h-[90%] bg-indigo-500/30">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Thu</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary/20 rounded-t-lg relative h-[75%] hover:bg-brand-primary/40 transition-colors">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-full"></div>
                          </div>
                          <span className="text-[9px] font-bold text-slate-500">Fri</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-end items-center h-full space-y-2">
                          <div className="w-full bg-brand-primary/20 rounded-t-lg relative h-[100%] bg-indigo-400/40">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                          </div>
                          <span className="text-[9px] font-bold text-indigo-400">Today</span>
                        </div>
                      </div>
                    </div>

                    {/* SVG Chart 2 (Cumulative Growth) */}
                    <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
                        <span>Leads Generated Funnel</span>
                        <span className="text-[10px] text-amber-400 font-bold">Total: {totalTriggers}</span>
                      </h5>
                      <div className="relative h-44 w-full flex flex-col justify-between pt-2">
                        {/* Lead sources listing */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400 font-semibold">Comment Lead Magnets</span>
                              <span className="text-white font-bold">72%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-brand-primary h-full rounded-full" style={{ width: '72%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400 font-semibold">Story Mention Rewards</span>
                              <span className="text-white font-bold">18%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-slate-400 font-semibold">Direct Message Keywords</span>
                              <span className="text-white font-bold">10%</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* Inbox Trigger Activity Logs View */}
              {activeTab === 'logs' && (
                <motion.div
                  key="logs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-white">Live Activity Inflow Logs</h4>
                      <p className="text-xs text-slate-400">Logs refresh dynamically when users comment or DM Sofia</p>
                    </div>
                  </div>

                  {/* Logs Table */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 bg-slate-950 p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-850">
                      <div className="col-span-3">User</div>
                      <div className="col-span-3">Activity Trigger</div>
                      <div className="col-span-2">Keyword</div>
                      <div className="col-span-4 text-right">Status</div>
                    </div>

                    <div className="divide-y divide-slate-900 text-xs">
                      {logs.map((log) => (
                        <div key={log.id} className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-slate-900/40 transition-colors">
                          <div className="col-span-3 font-bold text-white">@{log.username}</div>
                          <div className="col-span-3 text-slate-300 font-medium">{log.type}</div>
                          <div className="col-span-2"><span className="bg-slate-900 px-2.5 py-0.5 rounded-full font-mono text-[10px] text-amber-400 font-bold">"{log.keyword}"</span></div>
                          <div className="col-span-4 text-right text-slate-400 font-semibold">{log.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Quick Notice Banner on connected app */}
          <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mr-1.5" />
              <span>Full Meta platform safety guarantee active</span>
            </span>
            <span>QuickRevert Sandbox v2.4</span>
          </div>

        </div>

      </div>
    </div>
  );
}
