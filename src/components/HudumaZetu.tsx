import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data';
import { Stethoscope, Activity, HeartPulse, Baby, FlaskConical, Scissors, ArrowRight } from 'lucide-react';

// Safe mapping of icons
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Stethoscope,
  Activity,
  HeartPulse,
  Baby,
  FlaskConical,
  Scissors
};

interface HudumaZetuProps {
  onBookService: () => void;
}

export default function HudumaZetu({ onBookService }: HudumaZetuProps) {
  // Staggered animation configuration for list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-3"
          >
            Matatibu na Kinga ya Juu
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Huduma Zetu za Matibabu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg leading-relaxed"
          >
            Hospitali ya Afya Bora inajivunia kutoa huduma mbalimbali za afya chini ya uangalizi wa madaktari bingwa na teknolojia ya hali ya juu kabisa nchini.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((srv) => {
            const IconComponent = IconMap[srv.iconName] || Stethoscope;
            return (
              <motion.div
                key={srv.id}
                variants={itemVariants}
                id={`service-card-${srv.id}`}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
              >
                {/* Visual Top Decorative Teal Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-transparent group-hover:bg-teal-500 transition-colors duration-300" />
                
                <div>
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Title & Dept */}
                  <span className="block text-xs font-semibold text-teal-600 tracking-wider uppercase mb-1">
                    {srv.department}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors">
                    {srv.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-auto">
                  <button
                    onClick={onBookService}
                    className="flex items-center gap-2 text-sm font-semibold text-teal-600 group-hover:text-teal-700 transition-colors cursor-pointer"
                    id={`service-btn-${srv.id}`}
                  >
                    Weka Miadi ya Huduma Hii
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-teal-600 rounded-3xl p-8 sm:p-12 text-white text-center shadow-lg relative overflow-hidden"
        >
          {/* Subtle decorative background circles */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-teal-500/20 blur-xl pointer-events-none" />

          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Je, Unahitaji Uchunguzi wa Afya Yako Haraka?</h3>
          <p className="text-teal-50 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            Madaktari wetu wapo tayari kukuhudumia muda wowote. Weka miadi yako ya uchunguzi mtandaoni sasa na upate huduma bila kusubiri kwenye foleni.
          </p>
          <button
            onClick={onBookService}
            id="services-cta-miadi"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-teal-700 hover:bg-teal-50 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-base"
          >
            <Activity className="w-5 h-5 animate-pulse text-teal-600" />
            Weka Miadi ya Sasa
          </button>
        </motion.div>

      </div>
    </section>
  );
}
