import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Info } from 'lucide-react';
import { ContactMessage } from '../types';

export default function WasilianaNasi() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      date: new Date().toLocaleString('sw-TZ')
    };

    // Save message to localStorage
    const saved = localStorage.getItem('ab_hospital_messages');
    let messages: ContactMessage[] = [];
    if (saved) {
      try {
        messages = JSON.parse(saved);
      } catch (e) {
        messages = [];
      }
    }
    messages.push(newMessage);
    localStorage.setItem('ab_hospital_messages', JSON.stringify(messages));

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
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
            Tupo kwa Ajili Yako
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Wasiliana Nasi Sasa
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg leading-relaxed"
          >
            Una swali, maoni, au unahitaji msaada wowote? Timu yetu ya huduma kwa wateja ipo tayari kukujibu kwa haraka na ufanisi.
          </motion.p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (Left Pane, 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Information Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-6 pb-3 border-b border-slate-50">Mawasiliano ya Haraka</h3>
              
              <div className="space-y-6">
                {/* Physical Address */}
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Mahali Tulipo</h4>
                    <p className="text-slate-600 text-sm">Barabara ya Mlimani, Karibu na Mlimani City Mall, Dar es Salaam, Tanzania.</p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Nambari za Simu</h4>
                    <p className="text-slate-600 text-sm font-semibold hover:text-teal-600 transition-colors">
                      <a href="tel:+255222123456">+255 (0) 22 212 3456</a>
                    </p>
                    <p className="text-slate-500 text-xs">Simu ya Dharura: +255 (0) 712 345 678 (24/7)</p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Barua Pepe (Email)</h4>
                    <p className="text-slate-600 text-sm font-semibold hover:text-teal-600 transition-colors">
                      <a href="mailto:info@afyaborahospitali.co.tz">info@afyaborahospitali.co.tz</a>
                    </p>
                    <p className="text-slate-500 text-xs">Msaada wa Miadi: miadi@afyaborahospitali.co.tz</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">Masaa ya Kazi</h4>
                    <p className="text-slate-600 text-sm">Jumatatu - Ijumaa: Saa 2:00 Asubuhi - Saa 12:00 Jioni</p>
                    <p className="text-slate-600 text-sm">Jumamosi: Saa 3:00 Asubuhi - Saa 8:00 Mchana</p>
                    <p className="text-teal-600 text-xs font-bold mt-1 uppercase tracking-wider">Magonjwa ya Dharura: Wazi Masaa 24 kila siku</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Notice */}
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Huduma ya Dharura Kwanza</h4>
                <p className="text-teal-900 text-xs leading-relaxed">
                  Tafadhali, iwapo una dharura kubwa ya matibabu au una maumivu makali, usisubiri jibu la ujumbe huu. Pigia simu yetu ya dharura ya masaa 24 mara moja au fika hospitalini haraka iwezekanavyo.
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form (Right Pane, 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
              <h3 className="text-lg font-bold text-slate-800 mb-6 pb-3 border-b border-slate-50">Tuma Ujumbe wa Moja kwa Moja</h3>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-semibold">Ujumbe wako umepokelewa kwa ufanisi! Idara yetu ya mawasiliano itakujibu hivi punde.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Jina Lako Kamili</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Mf. Juma Hussein"
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Anwani ya Barua Pepe (Email)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="juma@mfano.com"
                      className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nambari ya Simu</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+255 712 345 678"
                      className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Maelezo ya Ujumbe / Swali</label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Andika ujumbe au swali lako kwa kina hapa..."
                    className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Tuma Ujumbe
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Dynamic Stylized Hospital Location Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Ramani ya Eneo la Hospitali</h3>
              <p className="text-slate-500 text-xs">Urahisi wa kutufikia ukiwa popote pale ndani ya Jiji la Dar es Salaam</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Kituo cha Usafiri wa Umma: Mlimani City (Mita 200)</span>
            </div>
          </div>
          
          {/* Aesthetic Mock Map Display */}
          <div className="w-full h-80 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-center justify-center relative overflow-hidden">
            {/* Visual background lines depicting map grids */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/4 left-1/3 w-32 h-20 bg-slate-200 rounded-lg border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-bold rotate-6">
              Barabara Kuu ya Bagamoyo
            </div>
            <div className="absolute top-2/3 right-1/4 w-44 h-16 bg-slate-200 rounded-lg border border-slate-300 flex items-center justify-center text-[10px] text-slate-400 font-bold -rotate-12">
              Mlimani City Mall
            </div>
            
            {/* Pulsing Target Dot signifying hospital */}
            <div className="relative z-10 flex flex-col items-center">
              <span className="absolute inline-flex h-12 w-12 rounded-full bg-teal-400 opacity-75 animate-ping" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 text-white shadow-xl">
                <MapPin className="w-8 h-8 fill-white" />
              </div>
              <div className="mt-3 bg-slate-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide shadow-md">
                Hospitali ya Afya Bora
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
