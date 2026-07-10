import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DOCTORS_DATA } from '../data';
import { Appointment } from '../types';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, Trash2, Search, CalendarCheck, AlertTriangle } from 'lucide-react';

interface MiadiSystemProps {
  preselectedDoctorId: string | null;
  onClearPreselected: () => void;
}

export default function MiadiSystem({ preselectedDoctorId, onClearPreselected }: MiadiSystemProps) {
  // Global Appointments list loaded from localStorage
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Tab within appointment system: 'weka' (book) or 'fuatilia' (track/view)
  const [subTab, setSubTab] = useState<'weka' | 'fuatilia'>('weka');
  
  // Search query for tracking
  const [trackPhone, setTrackPhone] = useState('');
  const [searchedBookings, setSearchedBookings] = useState<Appointment[] | null>(null);

  // Form State
  const [doctorId, setDoctorId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  
  // Confirmation State
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Today's date for limiting selection (no past bookings allowed)
  const todayDateStr = new Date().toISOString().split('T')[0];

  // Available slots
  const availableSlots = [
    '08:30 Asubuhi',
    '09:30 Asubuhi',
    '10:30 Asubuhi',
    '11:30 Asubuhi',
    '14:00 Mchana',
    '15:00 Mchana',
    '16:00 Jioni',
  ];

  // Load appointments from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('ab_hospital_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        setAppointments([]);
      }
    }
  }, []);

  // Sync preselected doctor ID
  useEffect(() => {
    if (preselectedDoctorId) {
      setDoctorId(preselectedDoctorId);
      setSubTab('weka'); // Switch subtab to form
    }
  }, [preselectedDoctorId]);

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId || !patientName || !patientPhone || !patientEmail || !date || !time) return;

    const selectedDoc = DOCTORS_DATA.find((d) => d.id === doctorId);
    if (!selectedDoc) return;

    const newAppointment: Appointment = {
      id: `miadi-${Math.floor(100000 + Math.random() * 900000)}`, // Numeric booking ID
      doctorId,
      doctorName: selectedDoc.name,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      date,
      time,
      notes: notes.trim(),
      status: 'Inasubiri', // Starts as pending, but is persistent
      createdAt: new Date().toLocaleString('sw-TZ')
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('ab_hospital_appointments', JSON.stringify(updated));

    // Clear state
    setConfirmedBooking(newAppointment);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setDate('');
    setTime('');
    setNotes('');
    onClearPreselected(); // Reset preselection
  };

  // Cancel Booking
  const handleCancelBooking = (id: string) => {
    if (window.confirm('Je, una uhakika unataka kufuta miadi hii?')) {
      const updated = appointments.filter((app) => app.id !== id);
      setAppointments(updated);
      localStorage.setItem('ab_hospital_appointments', JSON.stringify(updated));
      
      // Update search state if currently searching
      if (searchedBookings) {
        setSearchedBookings(searchedBookings.filter((app) => app.id !== id));
      }
    }
  };

  // Search/Track bookings by phone
  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackPhone.trim()) {
      setSearchedBookings([]);
      return;
    }

    const filtered = appointments.filter(
      (app) => app.patientPhone.replace(/\s+/g, '').includes(trackPhone.trim().replace(/\s+/g, ''))
    );
    setSearchedBookings(filtered);
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold tracking-wider uppercase rounded-full mb-3"
          >
            Mfumo wa Kidijitali wa Miadi
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight"
          >
            Weka Miadi ya Daktari Mtandaoni
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg leading-relaxed"
          >
            Chagua daktari bingwa, weka tarehe na muda unaokufaa zaidi, na utapokea thibitisho la miadi yako mara moja bila usumbufu.
          </motion.p>
        </div>

        {/* Sub-Tab Navigation inside Booking system */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-xs inline-flex">
            <button
              id="subtab-weka-btn"
              onClick={() => { setSubTab('weka'); setConfirmedBooking(null); }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                subTab === 'weka'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              Weka Miadi Mpya
            </button>
            <button
              id="subtab-fuatilia-btn"
              onClick={() => setSubTab('fuatilia')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer ${
                subTab === 'fuatilia'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              <Search className="w-4 h-4" />
              Fuatilia Miadi Yako
            </button>
          </div>
        </div>

        {/* Sub-Tab Content Render */}
        <div className="max-w-3xl mx-auto">
          
          {/* TAB 1: Booking form or Confirmation Card */}
          {subTab === 'weka' && (
            <div>
              <AnimatePresence mode="wait">
                {confirmedBooking ? (
                  /* Confirmation Success Display */
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl border border-emerald-100 shadow-lg p-8 text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-6 shadow-xs">
                      <CheckCircle className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-2">Miadi Imewekwa kwa Ufanisi!</h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                      Miadi yako imesajiliwa katika mfumo. Tafadhali hifadhi nambari yako ya kumbukumbu hapa chini kwa ajili ya kufika hospitali.
                    </p>

                    {/* Receipt Details Card */}
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 text-left space-y-4 max-w-md mx-auto mb-8">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kumbukumbu No:</span>
                        <span className="text-sm font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">{confirmedBooking.id}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="block text-xs text-slate-400 font-medium">Daktari Bingwa:</span>
                          <span className="font-semibold text-slate-800">{confirmedBooking.doctorName}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-slate-400 font-medium">Mgonjwa:</span>
                          <span className="font-semibold text-slate-800">{confirmedBooking.patientName}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-slate-400 font-medium">Tarehe ya Miadi:</span>
                          <span className="font-semibold text-slate-800">{confirmedBooking.date}</span>
                        </div>
                        <div>
                          <span className="block text-xs text-slate-400 font-medium">Muda/Saa:</span>
                          <span className="font-semibold text-slate-800">{confirmedBooking.time}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Hali ya Miadi:</span>
                        <span className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold">{confirmedBooking.status} (Inasubiri)</span>
                      </div>
                    </div>

                    {/* Action buttons on Success */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => {
                          setTrackPhone(confirmedBooking.patientPhone);
                          setSubTab('fuatilia');
                          // Trigger search right away
                          const filtered = appointments.filter(
                            (app) => app.patientPhone === confirmedBooking.patientPhone
                          );
                          setSearchedBookings(filtered);
                          setConfirmedBooking(null);
                        }}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all cursor-pointer"
                      >
                        Fuatilia Miadi Yangu
                      </button>
                      <button
                        onClick={() => setConfirmedBooking(null)}
                        className="px-6 py-3 border border-slate-200 hover:border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                      >
                        Weka Miadi Mpya
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  /* Interactive Form Input Cards */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs"
                  >
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      
                      {/* Section Title 1 */}
                      <div className="border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-teal-600 rounded-full" />
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Hatua ya 1: Chagua Daktari & Muda</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Select Doctor */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Chagua Daktari Bingwa</label>
                          <select
                            required
                            id="form-doctor-select"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm bg-white"
                          >
                            <option value="">-- Chagua Daktari Hapa --</option>
                            {DOCTORS_DATA.map((doc) => (
                              <option key={doc.id} value={doc.id}>
                                {doc.name} - {doc.specialty}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Date selection */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Chagua Tarehe ya Mahudhurio</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                              <Calendar className="w-5 h-5" />
                            </span>
                            <input
                              type="date"
                              required
                              id="form-date-input"
                              min={todayDateStr}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Time Slots Selector as interactive Radio Grid */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Chagua Saa ya Miadi</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              id={`slot-btn-${slot.replace(/\s+/g, '')}`}
                              onClick={() => setTime(slot)}
                              className={`py-3 px-2 text-center rounded-xl text-xs font-bold tracking-wide transition-all border cursor-pointer ${
                                time === slot
                                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                  : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-85" />
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Section Title 2 */}
                      <div className="border-b border-slate-100 pb-3 mb-4 mt-8 flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-teal-600 rounded-full" />
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Hatua ya 2: Maelezo ya Mgonjwa</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Patient Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Jina Lako Kamili</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                              <User className="w-5 h-5" />
                            </span>
                            <input
                              type="text"
                              required
                              id="form-patient-name"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              placeholder="Mf. Juma Selemani"
                              className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                            />
                          </div>
                        </div>

                        {/* Patient Phone */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nambari ya Simu</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                              <Phone className="w-5 h-5" />
                            </span>
                            <input
                              type="tel"
                              required
                              id="form-patient-phone"
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              placeholder="Mf. 0712345678"
                              className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Patient Email */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Anwani ya Barua Pepe (Email)</label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <Mail className="w-5 h-5" />
                          </span>
                          <input
                            type="email"
                            required
                            id="form-patient-email"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            placeholder="selemani@juma.com"
                            className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Reason / Notes */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Sababu ya Kuona Daktari (Sababu Fupi)</label>
                        <div className="relative">
                          <span className="absolute top-3 left-3 pointer-events-none text-slate-400">
                            <FileText className="w-5 h-5" />
                          </span>
                          <textarea
                            rows={3}
                            id="form-patient-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Andika kwa ufupi matatizo au dalili unazohisi (Si lazima)..."
                            className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                          />
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          type="submit"
                          id="submit-booking-btn"
                          className="w-full sm:w-auto px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-base transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
                        >
                          Thibitisha na Weka Miadi
                        </button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 2: Track Appointments */}
          {subTab === 'fuatilia' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-2">Tafuta Miadi Yako</h3>
              <p className="text-xs text-slate-400 mb-6">Ingiza nambari yako ya simu uliyotumia kufanya miadi ili kuangalia historia au kufuta miadi yako.</p>

              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={trackPhone}
                    onChange={(e) => setTrackPhone(e.target.value)}
                    placeholder="Weka namba ya simu..."
                    className="block w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  id="track-search-btn"
                  className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm cursor-pointer"
                >
                  Tafuta Miadi
                </button>
              </form>

              {/* Searched bookings results */}
              <div>
                {searchedBookings !== null ? (
                  searchedBookings.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-2">Imepatikana Miadi ({searchedBookings.length})</h4>
                      {searchedBookings.map((app) => (
                        <div
                          key={app.id}
                          className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-mono">ID: {app.id}</span>
                              <span className="text-xs text-slate-400 font-medium">Imewekwa: {app.createdAt}</span>
                            </div>
                            <h5 className="text-base font-bold text-slate-800">{app.doctorName}</h5>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-1 font-medium">
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {app.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {app.time}</span>
                              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-slate-400" /> {app.patientName}</span>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2.5 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
                            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
                              {app.status}
                            </span>
                            <button
                              onClick={() => handleCancelBooking(app.id)}
                              className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 p-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Futa Miadi
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                      <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 text-sm font-bold">Hakuna miadi iliyopatikana kwa namba hii.</p>
                      <p className="text-xs text-slate-400 mt-1">Tafadhali hakikisha umeingiza nambari sahihi uliyotumia wakati wa usajili.</p>
                    </div>
                  )
                ) : (
                  // Initial guidance placeholder
                  <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <p className="text-slate-500 text-xs font-semibold">Tafadhali ingiza nambari yako ya simu hapo juu ili kuorodhesha miadi yako yote.</p>
                  </div>
                )}
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
}
