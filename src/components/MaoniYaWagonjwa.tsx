import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS_DATA } from '../data';
import { Review } from '../types';
import { Star, Quote, Plus, Send, Heart, CheckCircle } from 'lucide-react';

export default function MaoniYaWagonjwa() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [doctorSpecialty, setDoctorSpecialty] = useState('Ushauri Mkuu');

  // Load reviews from localStorage or initial constant
  useEffect(() => {
    const saved = localStorage.getItem('ab_hospital_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(REVIEWS_DATA);
      }
    } else {
      setReviews(REVIEWS_DATA);
      localStorage.setItem('ab_hospital_reviews', JSON.stringify(REVIEWS_DATA));
    }
  }, []);

  // Compute live averages
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
    : '0.0';

  // Submitting review
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !comment.trim()) return;

    const newReview: Review = {
      id: `rev-local-${Date.now()}`,
      patientName: patientName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      doctorSpecialty: doctorSpecialty
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('ab_hospital_reviews', JSON.stringify(updated));

    // Clear and Show Success
    setPatientName('');
    setRating(5);
    setComment('');
    setDoctorSpecialty('Ushauri Mkuu');
    setIsFormOpen(false);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

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
            Sauti za Wagonjwa Wetu
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Maoni ya Wagonjwa
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg leading-relaxed"
          >
            Tunasikiliza maoni yako ili tuendelee kuboresha huduma zetu za matibabu kila siku. Angalia maoni ya wale waliopata matibabu kwetu.
          </motion.p>
        </div>

        {/* Stats and Submission Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-slate-100 mb-12">
          
          {/* Average Rating Block */}
          <div className="text-center md:text-left md:border-r border-slate-100 md:pr-8">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Wastani wa Nyota</h4>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-5xl font-extrabold text-slate-800 tracking-tight">{averageRating}</span>
              <div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${
                        star <= Math.round(Number(averageRating))
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-1 block">Kutoka kwa maoni {totalReviews}</span>
              </div>
            </div>
          </div>

          {/* Hospital Quality Statement */}
          <div className="text-center md:text-left md:px-4 col-span-1 md:col-span-1">
            <p className="text-slate-600 text-sm leading-relaxed">
              Asilimia <strong className="text-teal-600 font-bold">98%</strong> ya wagonjwa waliotibiwa katika hospitali yetu wanaridhishwa sana na weledi, usafi, na upendo wa wafanyakazi wetu.
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="text-center md:text-right md:pl-8">
            <button
              id="write-review-toggle-btn"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-teal-50 hover:shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Andika Maoni Yako
            </button>
          </div>

        </div>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-8 flex items-center gap-3 shadow-xs"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-sm font-semibold">Asante sana! Maoni yako yamewasilishwa vizuri na yameongezwa kwenye orodha.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Write Review Form Overlay/Card */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-white rounded-2xl border border-teal-100 shadow-md p-6 sm:p-8 mb-12"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-lg font-bold text-slate-800">Tathmini Huduma Yetu (Weka Maoni)</h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Ghairi
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Jina Lako Kamili</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Mf. Amina Juma"
                      className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  {/* Specialty Related */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Idara uliyopata matibabu</label>
                    <select
                      value={doctorSpecialty}
                      onChange={(e) => setDoctorSpecialty(e.target.value)}
                      className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-white"
                    >
                      <option value="Ushauri Mkuu">Ushauri wa Daktari / OPD</option>
                      <option value="Idara ya Uzazi">Uzazi na Akina Mama</option>
                      <option value="Kliniki ya Watoto">Afya ya Watoto</option>
                      <option value="Upasuaji">Idara ya Upasuaji</option>
                      <option value="Magonjwa ya Moyo / Sukari">Kadiolojia (Moyo / Kisukari)</option>
                      <option value="Idara ya Dharura">Kitengo cha Dharura</option>
                      <option value="Maabara">Maabara na Vipimo</option>
                    </select>
                  </div>
                </div>

                {/* Rating Stars Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kiwango cha Kuridhika (Nyota)</label>
                  <div className="flex gap-2 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        id={`star-btn-${star}`}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200 hover:text-amber-300'
                          }`} 
                        />
                      </button>
                    ))}
                    <span className="text-sm font-semibold text-slate-500 ml-3">
                      ({rating === 5 ? 'Bora Sana' : rating === 4 ? 'Nzuri' : rating === 3 ? 'Inaridhisha' : rating === 2 ? 'Inahitaji Marekebisho' : 'Mbaya'})
                    </span>
                  </div>
                </div>

                {/* Comments Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Maelezo ya Maoni</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Andika uzoefu wako hapa..."
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    id="submit-review-btn"
                    className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Tuma Maoni Sasa
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              layout
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs flex flex-col justify-between relative overflow-hidden"
            >
              {/* Decorative Quote Icon on upper right */}
              <Quote className="absolute right-6 top-6 w-10 h-10 text-slate-50/70" />

              <div>
                {/* Rating Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-4 h-4 ${
                        star <= rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-100'
                      }`} 
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6 relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              {/* Patient Profile Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-50 mt-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{rev.patientName}</h4>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>
                {rev.doctorSpecialty && (
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-100/50">
                    {rev.doctorSpecialty}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
