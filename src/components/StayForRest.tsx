import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const THUMBS = [
  '/creator_thumb_1.png',
  '/creator_thumb_2.png',
  '/creator_thumb_3.png',
  '/creator_thumb_4.png',
  '/creator_thumb_5.png',
];

/* ─── Flying image — springs in from an offset when section is in view ─── */
function FlyingImage({
  src, fromX, fromY, rotate, width, height, rounded, delay,
  inView,
}: {
  src: string; fromX: number; fromY: number; rotate: number;
  width: string; height: string; rounded: string; delay: number;
  inView: boolean;
}) {
  return (
    <motion.span
      initial={{ x: fromX, y: fromY, scale: 0.4, opacity: 0, rotate: rotate * 2 }}
      animate={inView ? { x: 0, y: 0, scale: 1, opacity: 1, rotate } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`${width} ${height} ${rounded} overflow-hidden inline-block align-middle mx-1.5 shrink-0 shadow-xl shadow-black/60 border border-white/10`}
      style={{ verticalAlign: 'middle' }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </motion.span>
  );
}

/* ─── Word fade-up ─── */
function Word({ children, delay, dim = false, inView }: {
  children: React.ReactNode; delay: number; dim?: boolean; inView: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: dim ? 0.35 : 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block mx-[0.12em]"
    >
      {children}
    </motion.span>
  );
}

export default function StayForRest() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="bg-[#080808] py-24 relative overflow-hidden" id="how-it-works">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(105,93,212,0.12),transparent)] pointer-events-none" />

      <div
        ref={ref}
        className="relative max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center"
      >
        {/* Headline with inline flying images */}
        <div
          className="font-display font-extrabold text-white leading-[1.25] select-none"
          style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)' }}
        >
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center">
            <Word inView={inView} delay={0.05}>Turn</Word>
            <Word inView={inView} delay={0.1}>your</Word>
            <FlyingImage src={THUMBS[0]} inView={inView} delay={0.15}
              fromX={-180} fromY={-120} rotate={-6}
              width="w-9 sm:w-11" height="h-9 sm:h-11" rounded="rounded-xl" />
            <Word inView={inView} delay={0.2}>content</Word>
            <Word inView={inView} delay={0.25} dim>into</Word>
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center mt-1">
            <Word inView={inView} delay={0.3} dim>comments</Word>
            <FlyingImage src={THUMBS[2]} inView={inView} delay={0.38}
              fromX={200} fromY={100} rotate={5}
              width="w-11 sm:w-14" height="h-11 sm:h-14" rounded="rounded-2xl" />
            <FlyingImage src={THUMBS[3]} inView={inView} delay={0.46}
              fromX={160} fromY={-140} rotate={3}
              width="w-7 sm:w-9" height="h-7 sm:h-9" rounded="rounded-lg" />
            <Word inView={inView} delay={0.4} dim>into</Word>
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap items-center justify-center mt-1">
            <Word inView={inView} delay={0.5} dim>DMs</Word>
            <FlyingImage src={THUMBS[1]} inView={inView} delay={0.58}
              fromX={-180} fromY={140} rotate={-4}
              width="w-9 sm:w-11" height="h-9 sm:h-11" rounded="rounded-xl" />
            <Word inView={inView} delay={0.55}>automatically</Word>
            <FlyingImage src={THUMBS[4]} inView={inView} delay={0.65}
              fromX={100} fromY={-180} rotate={7}
              width="w-7 sm:w-8" height="h-7 sm:h-8" rounded="rounded-lg" />
          </div>

          {/* Row 4 */}
          <div className="flex flex-wrap items-center justify-center mt-1">
            {['—', 'in', 'just', 'three', 'simple', 'steps'].map((w, i) => (
              <Word key={w + i} inView={inView} delay={0.7 + i * 0.05} dim>{w}</Word>
            ))}
          </div>
        </div>

        {/* Subtle sub-line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 text-white/30 text-sm font-medium tracking-wide"
        >
          One comment. One DM. One new follower — on autopilot.
        </motion.p>
      </div>
    </section>
  );
}
