import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Calendar, Clock, Video, CheckCircle2,
  User, Mail, MessageCircle, Shield, Star, ArrowRight,
  ChevronLeft, ChevronRight as ChevronRightIcon, Globe, Zap
} from 'lucide-react';

interface MySlotsPageProps {
  onBack: () => void;
}

// Real session types matching the actual BookingsManager product
const sessionTypes = [
  {
    id: 'strategy',
    title: 'Instagram Growth Strategy',
    duration: '45 min',
    price: '₹1,999',
    desc: 'Review your current content, automation setup, and engagement metrics. Walk away with a tailored growth plan.',
    available: true,
    spots: 3,
  },
  {
    id: 'automation',
    title: 'Automation Setup & Review',
    duration: '60 min',
    price: '₹2,499',
    desc: 'We configure your Comment-to-DM, Auto DM, and Story triggers together. Includes follow-gate setup and carousel builds.',
    available: true,
    spots: 5,
  },
  {
    id: 'store',
    title: 'My Store Launch Help',
    duration: '30 min',
    price: '₹999',
    desc: 'Get your QuickRevert storefront live. We\'ll set up your products, theme, and booking sessions from scratch.',
    available: true,
    spots: 2,
  },
  {
    id: 'leads',
    title: 'Lead Manager & CRM Walk-through',
    duration: '30 min',
    price: 'Free',
    desc: 'A quick tour of the Lead Manager. We\'ll look at your captured contacts, export flows, and tagging strategy.',
    available: false,
    spots: 0,
  },
];

// Build current month calendar
function buildCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun

  const days = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay(); // 0=Sun, 6=Sat
    const isWeekend = dow === 0 || dow === 6;
    const isPast = d < now.getDate();
    days.push({ day: d, isAvailable: !isWeekend && !isPast, isPast });
  }

  return { days, firstDayOfWeek, monthName: now.toLocaleString('default', { month: 'long' }), year };
}

const timeSlots = ['9:30 AM', '11:00 AM', '1:00 PM', '3:00 PM', '4:30 PM'];

type BookingStep = 'pick-session' | 'pick-time' | 'details' | 'success';

export default function MySlotsPage({ onBack }: MySlotsPageProps) {
  const [step, setStep] = useState<BookingStep>('pick-session');
  const [selectedSession, setSelectedSession] = useState<typeof sessionTypes[0] | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [igHandle, setIgHandle] = useState('');
  const [note, setNote] = useState('');

  const { days, firstDayOfWeek, monthName, year } = buildCalendar();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep('success');
  };

  const reset = () => {
    setStep('pick-session');
    setSelectedSession(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setName('');
    setEmail('');
    setIgHandle('');
    setNote('');
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white font-sans antialiased relative overflow-x-hidden">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(105,93,212,0.13),transparent)] pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 w-full flex items-center justify-between px-6 py-5 border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/40 text-xs font-semibold hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </button>
        <div className="flex items-center gap-1 cursor-pointer" onClick={onBack}>
          <img src="/Logo_optimized.png" className="h-10 w-10 object-contain" alt="QuickRevert" />
          <span className="font-manrope font-bold text-lg tracking-tight text-white">QuickRevert</span>
        </div>
        <div className="w-16" />
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6">

        {/* Hero */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-[#9d94ff] tracking-widest uppercase bg-[#695dd4]/15 border border-[#695dd4]/25 px-3.5 py-1.5 rounded-full">
            1:1 Appointments — My Slots
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-[900] tracking-tight text-white mt-5 leading-tight">
            Book a session
          </h1>
          <p className="text-white/50 text-sm sm:text-base font-medium mt-3 max-w-md mx-auto">
            Powered by QuickRevert My Slots — Google Calendar sync, automatic DM confirmations, and smart scheduling built in.
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* STEP 1: Pick Session Type */}
          {step === 'pick-session' && (
            <motion.div
              key="pick-session"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase mb-5">
                Choose a session type
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sessionTypes.map((s) => (
                  <button
                    key={s.id}
                    disabled={!s.available}
                    onClick={() => {
                      setSelectedSession(s);
                      setStep('pick-time');
                    }}
                    className={`text-left p-6 rounded-2xl border transition-all ${
                      s.available
                        ? 'border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 cursor-pointer'
                        : 'border-white/5 bg-white/[0.02] cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        s.price === 'Free'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-[#695dd4]/20 text-[#9d94ff]'
                      }`}>
                        {s.price}
                      </span>
                      {!s.available && (
                        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider">Full</span>
                      )}
                      {s.available && s.spots <= 3 && (
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                          {s.spots} spots left
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">{s.desc}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {s.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="h-3.5 w-3.5" />
                        Google Meet
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* How it works strip */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Calendar, label: 'Pick your time', desc: 'Choose any open weekday slot' },
                  { icon: Zap, label: 'Instant DM confirmation', desc: 'QuickRevert sends booking details to your Instagram DM' },
                  { icon: Shield, label: 'Google Calendar sync', desc: 'Event added automatically with Meet link' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-4 border border-white/5">
                      <div className="h-8 w-8 rounded-lg bg-[#695dd4]/20 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-[#9d94ff]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{item.label}</p>
                        <p className="text-[11px] text-white/40 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Pick Date & Time */}
          {step === 'pick-time' && (
            <motion.div
              key="pick-time"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl mx-auto"
            >
              <button
                onClick={() => { setStep('pick-session'); setSelectedDay(null); setSelectedTime(null); }}
                className="text-white/30 text-xs font-bold hover:text-white/60 mb-6 block"
              >
                ← Change session
              </button>

              {/* Selected session summary */}
              {selectedSession && (
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 mb-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-white">{selectedSession.title}</p>
                    <p className="text-[11px] text-white/40 mt-0.5">{selectedSession.duration} · {selectedSession.price}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#9d94ff] bg-[#695dd4]/15 px-2 py-1 rounded-lg">Selected</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <div>
                  <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase mb-4">
                    {monthName} {year}
                  </p>
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => (
                      <div key={w} className="text-white/25 font-bold py-1 select-none">{w}</div>
                    ))}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`e-${i}`} />
                    ))}
                    {days.map((d) => (
                      <button
                        key={d.day}
                        disabled={!d.isAvailable}
                        onClick={() => { setSelectedDay(d.day); setSelectedTime(null); }}
                        className={`py-2 rounded-lg font-bold relative transition-all ${
                          d.isAvailable
                            ? selectedDay === d.day
                              ? 'bg-[#695dd4] text-white shadow-md'
                              : 'bg-white/5 text-white hover:bg-white/15'
                            : 'text-white/12 cursor-not-allowed'
                        }`}
                      >
                        {d.day}
                        {d.isAvailable && selectedDay !== d.day && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#695dd4]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slots */}
                <div>
                  <p className="text-[11px] font-bold text-white/30 tracking-widest uppercase mb-4">
                    {selectedDay ? `Available times — ${monthName} ${selectedDay}` : 'Select a date first'}
                  </p>
                  {selectedDay ? (
                    <div className="space-y-2">
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all border ${
                            selectedTime === t
                              ? 'bg-white text-black border-white font-bold'
                              : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:border-white/15'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-white/15 text-sm font-medium py-16">
                      ← Pick a day
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <button
                  disabled={!selectedDay || !selectedTime}
                  onClick={() => setStep('details')}
                  className="w-full py-3.5 bg-[#695dd4] hover:bg-[#5b51c1] disabled:bg-white/5 text-white disabled:text-white/20 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Continue to your details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Contact Details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="max-w-lg mx-auto"
            >
              <button
                onClick={() => setStep('pick-time')}
                className="text-white/30 text-xs font-bold hover:text-white/60 mb-6 block"
              >
                ← Change date / time
              </button>

              {/* Booking summary */}
              <div className="bg-[#695dd4]/10 border border-[#695dd4]/25 rounded-2xl p-4 mb-8 space-y-1.5">
                <p className="text-xs font-bold text-[#9d94ff] uppercase tracking-wider">Your booking</p>
                <p className="text-sm font-semibold text-white">{selectedSession?.title}</p>
                <p className="text-xs text-white/50">{monthName} {selectedDay}, {year} at {selectedTime} · {selectedSession?.duration}</p>
              </div>

              <form onSubmit={handleConfirm} className="space-y-4">
                {[
                  { label: 'Full Name', icon: User, type: 'text', placeholder: 'Your Name', val: name, set: setName, required: true },
                  { label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@email.com', val: email, set: setEmail, required: true },
                  { label: 'Instagram Handle', icon: MessageCircle, type: 'text', placeholder: '@yourhandle', val: igHandle, set: setIgHandle, required: false },
                ].map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">{f.label}</label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-3 h-4 w-4 text-white/25" />
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={f.val}
                          onChange={(e) => f.set(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#695dd4] focus:ring-1 focus:ring-[#695dd4] transition-colors"
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                    What would you like to cover? <span className="text-white/20 normal-case font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share any context or questions ahead of the session..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#695dd4] focus:ring-1 focus:ring-[#695dd4] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3.5 bg-[#695dd4] hover:bg-[#5b51c1] text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Confirm Booking
                </button>

                <p className="text-[11px] text-white/25 text-center leading-relaxed">
                  A Google Meet invite will be sent to your email. You'll also receive an Instagram DM confirmation via QuickRevert.
                </p>
              </form>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-sm mx-auto text-center py-10 flex flex-col items-center"
            >
              <div className="h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-[800] text-white font-display mb-2">You're booked!</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                A confirmation has been sent to{' '}
                <span className="text-white font-semibold">{email}</span>. Check your Instagram DM too — QuickRevert auto-sends a booking summary.
              </p>

              <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-left space-y-3 mb-8">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Session Summary</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Calendar className="h-3.5 w-3.5 text-[#9d94ff]" />
                    <span>{monthName} {selectedDay}, {year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-3.5 w-3.5 text-[#9d94ff]" />
                    <span>{selectedTime} · {selectedSession?.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Video className="h-3.5 w-3.5 text-[#9d94ff]" />
                    <span>Google Meet (link in email)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <User className="h-3.5 w-3.5 text-[#9d94ff]" />
                    <span>{name}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-3 border border-[#695dd4]/50 bg-[#695dd4]/15 text-[#9d94ff] font-bold text-sm rounded-xl hover:bg-[#695dd4]/25 transition-all"
              >
                Book Another Slot
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
