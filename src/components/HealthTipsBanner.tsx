import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Droplets, HeartPulse, Activity, Moon, Salad, ShieldCheck, Sparkles, 
  Flame, Play, Pause, ChevronLeft, ChevronRight, X, Info, Lightbulb, 
  ArrowRight, Heart, Share2, CheckCircle, Apple
} from 'lucide-react';
import { HEALTH_TIPS_DATA } from '../data';
import { HealthTip } from '../types';

// Map icon strings to Lucide components safely
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  HeartPulse,
  Activity,
  Moon,
  Salad,
  ShieldCheck,
  Sparkles,
  Flame,
};

export default function HealthTipsBanner() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedTip, setSelectedTip] = useState<HealthTip | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Dynamic advice context or action points depending on categories
  const getCategoryDetails = (category: string) => {
    switch (category) {
      case 'Maji':
        return {
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-100',
          gradientBg: 'from-blue-500/10 to-teal-500/10',
          cardBorder: 'border-blue-100',
          advices: [
            'Anza siku yako kwa kunywa glasi moja ya maji vuguvugu kuamsha viungo.',
            'Beba chupa ya maji kila unapoenda kazini au mazoezini.',
            'Kunywa maji hata kama usipohisi kiu – kiu ni ishara ya mwili kuishiwa maji tayari.',
            'Punguza vinywaji vyenye sukari nyingi kwani huongeza upungufu wa maji.'
          ]
        };
      case 'Moyo':
        return {
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-100',
          gradientBg: 'from-rose-500/10 to-orange-500/10',
          cardBorder: 'border-rose-100',
          advices: [
            'Kula mafuta yenye afya kama yale ya mizeituni, karanga, au parachichi.',
            'Punguza vyakula vya kukaanga sana na vyenye mafuta mabaya (trans fats).',
            'Soma vibandiko vya vyakula vya viwandani ili kuepuka viwango vikubwa vya sodiamu.',
            'Cheka mara kwa mara! Kicheko hupunguza shinikizo na kutanua mishipa ya damu.'
          ]
        };
      case 'Mazoezi':
        return {
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          gradientBg: 'from-emerald-500/10 to-teal-500/10',
          cardBorder: 'border-emerald-100',
          advices: [
            'Tumia ngazi badala ya lifti kila inapowezekana kazini au maghorofani.',
            'Simama na nyoosha viungo kwa dakika 5 kila baada ya saa 1 ya kukaa.',
            'Kutembea kwa haraka jioni kuna ufanisi mkubwa sawa na kukimbia kwa baadhi ya watu.',
            'Sikiliza mwili wako na pumzika unapohisi maumivu makali kwenye viungo.'
          ]
        };
      case 'Pumzika':
        return {
          badgeBg: 'bg-violet-50 text-violet-700 border-violet-100',
          gradientBg: 'from-violet-500/10 to-indigo-500/10',
          cardBorder: 'border-violet-100',
          advices: [
            'Weka mazingira ya chumba chako kuwa meusi na yenye joto la wastani ili kulala vizuri.',
            'Epuka kutumia simu, tablet, au TV angalau dakika 30 kabla ya kulala.',
            'Fanya tafakari fupi ya utulivu ya dakika 5-10 kabla ya kupanda kitandani.',
            'Kunywa chai ya mitishamba (isiyo na kafeini) kama chamomile ili kutuliza mishipa.'
          ]
        };
      case 'Lishe':
        return {
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-100',
          gradientBg: 'from-amber-500/10 to-yellow-500/10',
          cardBorder: 'border-amber-100',
          advices: [
            'Jaza nusu ya sahani yako na mboga za majani na matunda ya rangi tofauti.',
            'Chagua nafaka zisizokobolewa kama ngano nzima au mchele wa kahawia.',
            'Kula polepole na utafune chakula vizuri ili kusaidia mmeng\'enyo sahihi.',
            'Punguza kiwango cha sukari iliyosafishwa kwenye vinywaji vyako vya kila siku.'
          ]
        };
      case 'Ulinzi':
      default:
        return {
          badgeBg: 'bg-teal-50 text-teal-700 border-teal-100',
          gradientBg: 'from-teal-500/10 to-emerald-500/10',
          cardBorder: 'border-teal-100',
          advices: [
            'Nawa mikono kwa sabuni na maji tiririka mara kwa mara.',
            'Weka rekodi sahihi za chanjo na vipimo vyako kwenye Portal ya Mgonjwa.',
            'Epuka kujitibia dawa (self-medication) bila kupata maelekezo ya daktari.',
            'Hakikisha unakunywa maji yaliyochemshwa au kuchujwa vizuri kuepuka maambukizi.'
          ]
        };
    }
  };

  // Autoplay functionality using interval
  useEffect(() => {
    if (!isPlaying || isHovered || selectedTip !== null) return;
    
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HEALTH_TIPS_DATA.length);
    }, 8000); // changes tip every 8 seconds

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, selectedTip]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % HEALTH_TIPS_DATA.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + HEALTH_TIPS_DATA.length) % HEALTH_TIPS_DATA.length);
  };

  const handleShare = (tip: HealthTip, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `🏥 *Ushauri wa Afya Bora* - ${tip.title}\n\n"${tip.description}"\n\nSoma ushauri zaidi kwenye Portal yetu ya Afya Bora!`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    });
  };

  const currentTip = HEALTH_TIPS_DATA[currentIdx];
  const IconComponent = ICON_MAP[currentTip.iconName] || Lightbulb;
  const details = getCategoryDetails(currentTip.category);

  return (
    <div className="w-full relative px-4 sm:px-6 lg:px-8 mt-4 max-w-7xl mx-auto">
      
      {/* 1. HEALTH TIPS NOTIFICATION BAR */}
      <div 
        id="health-tips-notification-bar"
        className="relative bg-white border border-slate-100 rounded-3xl p-5 shadow-sm overflow-hidden group transition-all hover:shadow-md cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setSelectedTip(currentTip)}
      >
        {/* Subtle decorative gradient background based on tip category */}
        <div className={`absolute inset-0 bg-gradient-to-r ${details.gradientBg} opacity-60 transition-all duration-500`} />
        
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10">
          
          {/* Main content: Icon, Badge, and Message */}
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center flex-shrink-0 border border-teal-500/10">
              <IconComponent className="w-6 h-6 text-teal-600" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${details.badgeBg}`}>
                  {currentTip.category}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-500" /> Ushauri wa Afya
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-tight">
                    {currentTip.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium mt-0.5 line-clamp-2 md:line-clamp-1">
                    {currentTip.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Action and controls buttons */}
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100/60">
            {/* Interactive play/pause status and direct soma zaidi button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="w-8 h-8 rounded-full hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                title={isPlaying ? 'Sitisha uhuishaji' : 'Washa uhuishaji'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              
              <button
                type="button"
                onClick={(e) => handleShare(currentTip, e)}
                className="w-8 h-8 rounded-full hover:bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                title="Nakili ushauri huu"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Manual Carousel controls */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-full border border-slate-100/50">
              <button
                type="button"
                onClick={handlePrev}
                className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-bold text-slate-400 px-1 select-none">
                {currentIdx + 1}/{HEALTH_TIPS_DATA.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* CTA to read detailed tip pop-up */}
            <span className="hidden lg:inline-flex items-center gap-1 px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold rounded-xl text-xs transition-colors cursor-pointer flex-shrink-0">
              Soma Zaidi
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </div>

      {/* 2. SHARE SUCCESS NOTIFICATION TOAST */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl flex items-center gap-2.5 shadow-xl border border-slate-800 text-xs font-bold"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Ushauri umesafirishwa na kunakiliwa kwenye clipboard yako!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. INTERACTIVE POPUP MODAL (DETAILED CHECKPOINT DIALOG) */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg border border-slate-100 shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTip(null)}
                className="absolute right-4 top-4 w-9 h-9 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full flex items-center justify-center transition-colors border border-slate-100 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative top banner */}
              <div className={`h-24 bg-gradient-to-r ${getCategoryDetails(selectedTip.category).gradientBg} relative flex items-end px-6 pb-2 border-b border-slate-100/50`}>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryDetails(selectedTip.category).badgeBg} bg-white`}>
                    {selectedTip.category}
                  </span>
                  <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1 bg-white/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    <Apple className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Ushauri wa Siku
                  </span>
                </div>
              </div>

              {/* Detailed Content */}
              <div className="p-6 space-y-6">
                
                {/* Header */}
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center border border-teal-500/10 flex-shrink-0">
                    {React.createElement(ICON_MAP[selectedTip.iconName] || Lightbulb, { className: "w-6 h-6 text-teal-600" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800 leading-snug tracking-tight">
                      {selectedTip.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">Kitengo cha Afya ya Jamii - Hospitali ya Afya Bora</p>
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-slate-50 border border-slate-100/70 rounded-2xl">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                    "{selectedTip.description}"
                  </p>
                </div>

                {/* Practical Bullet Advices (Dynamic) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-teal-600" />
                    Miongozo ya Kila Siku (Do's)
                  </h4>
                  <ul className="space-y-2.5">
                    {getCategoryDetails(selectedTip.category).advices.map((adv, index) => (
                      <li key={index} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-500 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-[10px] font-black mt-0.5">
                          {index + 1}
                        </span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Standard Hospital Callout */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex gap-2 items-center text-[10px] text-slate-400 font-semibold">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Linaletwa kwako kwa ushirika wa Dkt. Faraji</span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={(e) => handleShare(selectedTip, e)}
                      className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-3.5 h-3.5 text-slate-400" />
                      Sambaza
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTip(null)}
                      className="flex-1 sm:flex-none px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors"
                    >
                      Nimeelewa
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
