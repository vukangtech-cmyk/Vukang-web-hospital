import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS_DATA } from '../data';
import { Doctor } from '../types';
import { Search, Star, Clock, GraduationCap, Award, Calendar, X, Heart } from 'lucide-react';

interface MadaktariProps {
  onBookDoctor: (doctorId: string) => void;
}

export default function Madaktari({ onBookDoctor }: MadaktariProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Filter logic
  const filteredDoctors = DOCTORS_DATA.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedDay === 'all') {
      return matchesSearch;
    } else {
      return matchesSearch && doc.availability.includes(selectedDay);
    }
  });

  const availableDays = ['all', 'Jumatatu', 'Jumanne', 'Jumatano', 'Alhamisi', 'Ijumaa'];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-3"
          >
            Wataalamu wa Afya Yako
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Kutana na Madaktari Bingwa
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg leading-relaxed"
          >
            Tuna jopo la madaktari wenye uzoefu wa hali ya juu nchini na kimataifa, waliojitolea kutoa matibabu yenye viwango vya juu vya usalama na upendo.
          </motion.p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                id="doctor-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tafuta daktari kwa jina au ubobezi..."
                className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
              />
            </div>

            {/* Day Filter Chips */}
            <div className="w-full lg:w-auto flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-500 mr-2 block w-full lg:w-auto">Muda wa Kazi:</span>
              <div className="flex flex-wrap gap-1.5">
                {availableDays.map((day) => (
                  <button
                    key={day}
                    id={`day-filter-${day}`}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      selectedDay === day
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {day === 'all' ? 'Siku Zote' : day}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc, idx) => (
              <motion.div
                key={doc.id}
                id={`doctor-card-${doc.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Doctor Photo */}
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-slate-800">{doc.rating}</span>
                  </div>
                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide shadow-xs flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Miaka {doc.experience}+ Kazini
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-snug mb-1 group-hover:text-teal-600 transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-teal-700 text-xs font-bold uppercase tracking-wider mb-4">
                      {doc.specialty}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                        <GraduationCap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{doc.education}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                        <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="truncate">Siku: {doc.availability.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                    <button
                      id={`doctor-bio-btn-${doc.id}`}
                      onClick={() => setSelectedDoctor(doc)}
                      className="w-full py-2.5 px-3 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-center"
                    >
                      Angalia Wasifu
                    </button>
                    <button
                      id={`doctor-book-btn-${doc.id}`}
                      onClick={() => onBookDoctor(doc.id)}
                      className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-teal-50 cursor-pointer text-center"
                    >
                      Weka Miadi
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 max-w-lg mx-auto">
            <p className="text-slate-500 font-medium mb-4 text-lg">Samahani, daktari anayekidhi vigezo hivyo hajapatikana.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedDay('all'); }}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
            >
              Onyesha Madaktari Wote
            </button>
          </div>
        )}

      </div>

      {/* Doctor Biography Modal / Detail Overlay */}
      <AnimatePresence>
        {selectedDoctor && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setSelectedDoctor(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center z-10">
                <h4 className="text-lg font-bold text-slate-800">Wasifu Kamili wa Daktari</h4>
                <button 
                  id="close-bio-modal"
                  onClick={() => setSelectedDoctor(null)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 mx-auto sm:mx-0 shadow-sm">
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-extrabold text-slate-800 leading-tight mb-1">{selectedDoctor.name}</h3>
                    <p className="text-teal-600 font-bold text-sm uppercase mb-3">{selectedDoctor.specialty}</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <div className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
                        {selectedDoctor.rating} Rating
                      </div>
                      <div className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-slate-600" />
                        Miaka {selectedDoctor.experience} Kazini
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Maelezo na Historia</h5>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      {selectedDoctor.biography}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-teal-500" />
                        Elimu na Vyeti
                      </h5>
                      <p className="text-slate-800 text-sm font-semibold">{selectedDoctor.education}</p>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-teal-500" />
                        Siku za Uwepo Clinic
                      </h5>
                      <p className="text-slate-800 text-sm font-semibold">{selectedDoctor.availability.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <button
                    id="modal-cancel-btn"
                    onClick={() => setSelectedDoctor(null)}
                    className="px-5 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Funga
                  </button>
                  <button
                    id="modal-book-btn"
                    onClick={() => {
                      onBookDoctor(selectedDoctor.id);
                      setSelectedDoctor(null);
                    }}
                    className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-50 cursor-pointer"
                  >
                    Weka Miadi Sasa
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
