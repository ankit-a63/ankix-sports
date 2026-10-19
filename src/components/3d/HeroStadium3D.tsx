import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CricketBall3D } from './CricketBall3D';
import { CricketStadium3D } from './CricketStadium3D';

interface HeroStadium3DProps {
  liveCount: number;
  totalMatchesCount: number;
  isLiveLoading: boolean;
  onExploreLiveClick?: () => void;
}

export const HeroStadium3D: React.FC<HeroStadium3DProps> = ({
  liveCount,
  totalMatchesCount,
  isLiveLoading,
  onExploreLiveClick,
}) => {
  const words = ['THE', 'GAME', 'NEVER', 'STOPS.'];

  return (
    <section className="relative min-h-[85vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden stadium-mesh pt-20 pb-12 border-b border-brand-border/40">
      {/* Stadium Atmospheric Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-brand-emerald/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-1/4 w-[450px] h-[350px] bg-brand-cyan/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-brand-emerald/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Stadium Floodlight Cones */}
      <div className="absolute top-0 left-10 w-32 h-96 bg-gradient-to-b from-white/10 to-transparent transform -rotate-12 blur-2xl pointer-events-none opacity-40" />
      <div className="absolute top-0 right-10 w-32 h-96 bg-gradient-to-b from-brand-emerald/15 to-transparent transform rotate-12 blur-2xl pointer-events-none opacity-40" />

      {/* Floating Stadium Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-emerald/40"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 85 + '%',
              left: Math.random() * 95 + '%',
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Sports Typography & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Live Count Pill & Brand Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-charcoal/90 border border-brand-border/80 backdrop-blur-md shadow-card-elevated"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald"></span>
              </span>
              
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                {isLiveLoading ? (
                  'SCANNING FIXTURES...'
                ) : liveCount > 0 ? (
                  <span className="text-brand-emerald">{liveCount} MATCHES LIVE NOW</span>
                ) : (
                  <span>CRICKET MATCH CENTRE • {totalMatchesCount} FIXTURES</span>
                )}
              </span>

              <span className="hidden sm:inline text-brand-subtle text-xs">|</span>
              <span className="hidden sm:inline text-brand-muted text-xs font-semibold tracking-wider uppercase">
                EVERY RUN. EVERY MOMENT.
              </span>
            </motion.div>

            {/* Staggered Word Reveal Heading */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
              {words.map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.12 }}
                  className={`inline-block mr-3 sm:mr-4 ${
                    word === 'NEVER'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-cyan text-glow-emerald'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Supporting Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-lg sm:text-xl text-brand-muted max-w-xl font-normal leading-relaxed"
            >
              Every run. Every wicket. Follow genuine international and league cricket as it happens with high-speed updates, interactive 3D cards, and comprehensive scorecards.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onExploreLiveClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-brand-emerald text-brand-bg transition-all duration-300 hover:bg-brand-emeraldHover hover:shadow-emerald-glow active:scale-[0.98]"
              >
                <Radio className="w-4 h-4 text-brand-bg group-hover:scale-110 transition-transform" />
                <span>EXPLORE LIVE SCORES</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/upcoming"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-brand-surface/80 text-white border border-brand-border/90 hover:border-brand-emerald/40 hover:bg-brand-surface transition-all duration-300 active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-brand-cyan" />
                <span>UPCOMING FIXTURES</span>
              </Link>
            </motion.div>

            {/* Sports Integrity Guarantee Micro-Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-6 pt-4 text-xs text-brand-muted border-t border-brand-border/40"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                <span>Verified Cricket API Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-cyan" />
                <span>60s Live Auto-Polling</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-emerald" />
                <span>Asia/Kolkata (IST) Timestamps</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Cricket Stadium Hero Centerpiece */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-4 lg:mt-0">
            {/* Soft Ambient Behind-Stadium Glow Ring */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-brand-emerald/20 bg-gradient-to-tr from-brand-emerald/10 via-transparent to-brand-cyan/10 animate-spin-slow pointer-events-none" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full flex items-center justify-center"
            >
              <CricketStadium3D glowColor="#00F59B" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
