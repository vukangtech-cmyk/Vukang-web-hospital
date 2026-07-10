import React from 'react';
import { motion } from 'motion/react';
import { DOCTORS_DATA, SERVICES_DATA } from '../data';
import { Heart, Activity, Shield, Users, Clock, ArrowRight, Star, Calendar, PhoneCall, Award } from 'lucide-react';
import HealthTipsBanner from './HealthTipsBanner';

interface NyumbaniProps {
  setActiveTab: (tab: string) => void;
  onBookDoctor: (doctorId: string) => void;
}

export default function Nyumbani({ setActiveTab, onBookDoctor }: NyumbaniProps) {
  // Top 3 doctors for preview
  const topDoctors = DOCTORS_DATA.slice(0, 3);
  
  // Top 3 services for preview
  const topServices = SERVICES_DATA.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-teal-900 to-slate-900 text-white overflow-hidden py-20 sm:py-28">
        {/* Abstract vector backgrounds */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0d9488_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-500/20 blur-2xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-teal-600/25 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30"
              >
                <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                Hospitali Inayoaminika Zaidi
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight"
              >
                Tunatunza Afya Yako kwa <span className="text-teal-400">Weledi na Upendo</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Karibu Hospitali ya Afya Bora. Tunatoa huduma za kisasa za matibabu chini ya madaktari bingwa, vifaa vya kisasa, na mfumo wa miadi ya haraka ili kuhakikisha afya yako inalindwa vizuri.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <button
                  id="hero-book-btn"
                  onClick={() => setActiveTab('miadi')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer text-base"
                >
                  <Calendar className="w-5 h-5" />
                  Weka Miadi Mtandaoni
                </button>
                <button
                  id="hero-services-btn"
                  onClick={() => setActiveTab('huduma')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-teal-400 border border-slate-700 rounded-xl font-bold transition-all cursor-pointer text-base"
                >
                  Tazama Huduma Zetu
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Hero Badge Illustration or Image */}
            <div className="lg:col-span-5 hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative bg-gradient-to-tr from-teal-500/10 to-teal-500/30 border border-teal-500/20 rounded-3xl p-8"
              >
                {/* Visual statistics card inside hero */}
                <div className="space-y-4">
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold">Ubora wa Kimataifa</span>
                      <span className="block text-xs text-slate-400">Teknoloji ya hali ya juu kabisa nchini</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 fill-amber-400" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold">Wagonjwa 15,000+</span>
                      <span className="block text-xs text-slate-400">Wameridhika na kuponywa kwa ufanisi</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-700/50 shadow-lg flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xl font-bold">Masaa 24/7 Wazi</span>
                      <span className="block text-xs text-slate-400">Kitengo cha dharura kila sekunde</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* HEALTH TIPS BANNER */}
      <div className="-mt-10 relative z-20">
        <HealthTipsBanner />
      </div>

      {/* 2. VALUE PROPOSITIONS BENTO GRID */}
      <section className="py-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Huduma ya Uhakika</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Tunatoa huduma zenye ubora, viwango vya usalama vya hali ya juu kwa wagonjwa wote.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Madaktari Bingwa</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Jopo letu lina madaktari bingwa waliobobea katika magonjwa mbalimbali nchini.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Foleni Sifuri (0 min)</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Weka miadi yako mtandaoni, uje kufika hospitali na kumuona daktari mara moja bila kusubiri.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MINI SERVICES HIGHLIGHTS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Unachoweza Kupata</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">Huduma Zetu Kuu</h2>
            </div>
            <button
              id="home-all-services-btn"
              onClick={() => setActiveTab('huduma')}
              className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              Angalia Huduma Zote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topServices.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-500 text-white mb-5 shadow-xs">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{srv.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4">{srv.description}</p>
                <button
                  onClick={() => setActiveTab('miadi')}
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer"
                >
                  Weka Miadi Sasa
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLINIC DOCTORS BANNER */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Wataalamu Wetu</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">Kutana na Madaktari Bingwa</h2>
            </div>
            <button
              id="home-all-doctors-btn"
              onClick={() => setActiveTab('madaktari')}
              className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              Tazama Madaktari Wote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between"
              >
                <div className="aspect-square bg-slate-200 relative overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 bg-teal-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    {doc.specialty.split('(')[0]}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{doc.name}</h3>
                    <div className="flex items-center gap-1.5 mb-3 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-bold text-slate-700">{doc.rating} Rating</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onBookDoctor(doc.id)}
                    className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Weka Miadi na {doc.name.split(' ')[1]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMFORT CALL OUT FOR ASSISTANCE */}
      <section className="bg-slate-900 py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <Heart className="w-12 h-12 text-teal-400 mx-auto fill-teal-400 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Afya Yako Ndiyo Furaha Yetu Kuu</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Tunashirikiana nanyi kuhakikisha huduma bora ya kinga na matibabu ya dharura inapatikana muda wote. Wasiliana nasi kupitia simu ya huduma kwa haraka masaa 24.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <a
              href="tel:+255712345678"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow-md text-sm cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              Piga Simu: +255 712 345 678
            </a>
            <button
              onClick={() => setActiveTab('wasiliana')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl font-bold text-sm cursor-pointer"
            >
              Tujulishe Shida Yako
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
