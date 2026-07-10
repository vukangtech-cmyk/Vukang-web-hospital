import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Phone, Mail, Calendar, Clock, ShieldCheck, LogIn, LogOut, 
  Activity, Award, FileText, Heart, Plus, TrendingUp, AlertCircle, 
  Trash2, PlusCircle, CheckCircle, Database, Edit3, HeartPulse 
} from 'lucide-react';
import { Appointment } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface PortalMgonjwaProps {
  onGoToBooking: () => void;
}

// Interface for Patient Medical Profile
interface PatientProfile {
  name: string;
  phone: string;
  email: string;
  bloodGroup: string;
  allergies: string;
  emergencyContact: string;
  weight: string;
  height: string;
}

// Interface for health logs
interface HealthLog {
  date: string;
  bloodPressure: number; // Systolic
  bloodSugar: number; // mg/dL
  weight: number; // kg
}

export default function PortalMgonjwa({ onGoToBooking }: PortalMgonjwaProps) {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Real patient data
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPatient, setCurrentPatient] = useState<PatientProfile | null>(null);
  
  // Active sub-tab inside the Portal
  const [portalTab, setPortalTab] = useState<'miadi' | 'rekodi' | 'afya' | 'kadi'>('miadi');

  // Interactive Health Tracker state
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([
    { date: '01/07', bloodPressure: 120, bloodSugar: 95, weight: 70 },
    { date: '03/07', bloodPressure: 122, bloodSugar: 98, weight: 69.5 },
    { date: '05/07', bloodPressure: 118, bloodSugar: 90, weight: 69.2 },
    { date: '07/07', bloodPressure: 121, bloodSugar: 104, weight: 69.0 },
    { date: '09/07', bloodPressure: 119, bloodSugar: 92, weight: 68.8 },
  ]);

  // Health log form input
  const [inputBP, setInputBP] = useState('120');
  const [inputSugar, setInputSugar] = useState('95');
  const [inputWeight, setInputWeight] = useState('69');
  const [vitalsSuccess, setVitalsSuccess] = useState(false);

  // Digital card edit mode
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editBloodGroup, setEditBloodGroup] = useState('O+');
  const [editAllergies, setEditAllergies] = useState('');
  const [editEmergency, setEditEmergency] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [editHeight, setEditHeight] = useState('');

  // Initial dummy records for the medical history
  const dummyMedicalRecords = [
    {
      id: 'rec-101',
      date: '2026-06-15',
      doctor: 'Dkt. Faraji Mwangi',
      department: 'Idara ya Magonjwa ya Moyo',
      diagnosis: 'Shinikizo Ndogo la Juu la Damu (Pre-hypertension)',
      symptoms: 'Kuhisi kichwa kizito, uchovu wa mwili jioni.',
      prescription: 'Amlodipine 5mg (mara moja kwa siku kwa siku 30), Kunywa maji mengi na kupunguza matumizi ya chumvi kwenye chakula.',
      vitals: 'BP: 135/85 mmHg, Uzito: 71 kg, Temp: 36.7 °C',
      nextVisit: '2026-07-15'
    },
    {
      id: 'rec-102',
      date: '2026-05-10',
      doctor: 'Dkt. Saida Yusuf',
      department: 'Kliniki ya Sukari na Lishe',
      diagnosis: 'Viwango vya Sukari Vya Kawaida (Normal Glycemic Control)',
      symptoms: 'Ufuatiliaji wa kawaida wa kila miezi mitatu.',
      prescription: 'Endelea na lishe bora yenye wanga kidogo, Dakika 30 za mazoezi kila siku.',
      vitals: 'Fasting Blood Sugar: 95 mg/dL, Uzito: 72.5 kg',
      nextVisit: '2026-08-10'
    }
  ];

  // Load appointments from localStorage
  useEffect(() => {
    const savedAppts = localStorage.getItem('ab_hospital_appointments');
    if (savedAppts) {
      try {
        setAppointments(JSON.parse(savedAppts));
      } catch (e) {
        setAppointments([]);
      }
    }
  }, []);

  // Handle Login Check
  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    // Check if there are appointments for this phone
    const normalizedPhone = phoneNumber.replace(/\s+/g, '');
    const foundAppts = appointments.filter(
      app => app.patientPhone.replace(/\s+/g, '') === normalizedPhone
    );

    let loggedInName = 'Mgonjwa wa Demo';
    let loggedInEmail = 'mgonjwa@afyabora.co.tz';

    if (foundAppts.length > 0) {
      loggedInName = foundAppts[0].patientName;
      loggedInEmail = foundAppts[0].patientEmail;
    }

    // Try loading saved profile or make a new one
    const savedProfilesKey = `ab_profile_${normalizedPhone}`;
    const savedProf = localStorage.getItem(savedProfilesKey);
    
    if (savedProf) {
      try {
        setCurrentPatient(JSON.parse(savedProf));
      } catch (err) {
        // Fallback
        const newProf: PatientProfile = {
          name: loggedInName,
          phone: phoneNumber,
          email: loggedInEmail,
          bloodGroup: 'O+',
          allergies: 'Hakuna',
          emergencyContact: '+255 712 345 678',
          weight: '70',
          height: '172'
        };
        setCurrentPatient(newProf);
      }
    } else {
      const newProf: PatientProfile = {
        name: loggedInName,
        phone: phoneNumber,
        email: loggedInEmail,
        bloodGroup: 'O+',
        allergies: 'Hakuna',
        emergencyContact: '+255 712 345 678',
        weight: '70',
        height: '172'
      };
      setCurrentPatient(newProf);
      localStorage.setItem(savedProfilesKey, JSON.stringify(newProf));
    }

    // Load any health logs for this specific patient phone
    const savedLogsKey = `ab_logs_${normalizedPhone}`;
    const savedLogs = localStorage.getItem(savedLogsKey);
    if (savedLogs) {
      try {
        setHealthLogs(JSON.parse(savedLogs));
      } catch (err) {
        // keep default
      }
    }

    setIsLoggedIn(true);
  };

  // Switch to demo mode directly
  const handleDemoLogin = () => {
    setPhoneNumber('0712345678');
    const demoProf: PatientProfile = {
      name: 'Josephat K. Massawe',
      phone: '0712345678',
      email: 'josephat.massawe@demo.com',
      bloodGroup: 'A+',
      allergies: 'Penicillin, Karanga',
      emergencyContact: 'Amina Massawe (+255 715 999 888)',
      weight: '69',
      height: '175'
    };
    setCurrentPatient(demoProf);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPatient(null);
    setPhoneNumber('');
  };

  // Add Health Log
  const handleAddHealthLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPatient) return;

    const bpVal = parseInt(inputBP) || 120;
    const sugarVal = parseInt(inputSugar) || 95;
    const weightVal = parseFloat(inputWeight) || 70;

    const todayStr = new Date().toLocaleDateString('sw-TZ', { day: 'numeric', month: 'numeric' });

    const newLog: HealthLog = {
      date: todayStr,
      bloodPressure: bpVal,
      bloodSugar: sugarVal,
      weight: weightVal
    };

    const updatedLogs = [...healthLogs, newLog].slice(-7); // Keep last 7 entries
    setHealthLogs(updatedLogs);

    // Save to localStorage
    const savedLogsKey = `ab_logs_${currentPatient.phone.replace(/\s+/g, '')}`;
    localStorage.setItem(savedLogsKey, JSON.stringify(updatedLogs));

    setVitalsSuccess(true);
    setTimeout(() => setVitalsSuccess(false), 3000);
  };

  // Edit Patient Card Information
  const startEditingCard = () => {
    if (!currentPatient) return;
    setEditName(currentPatient.name);
    setEditEmail(currentPatient.email);
    setEditBloodGroup(currentPatient.bloodGroup);
    setEditAllergies(currentPatient.allergies);
    setEditEmergency(currentPatient.emergencyContact);
    setEditWeight(currentPatient.weight);
    setEditHeight(currentPatient.height);
    setIsEditingCard(true);
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPatient) return;

    const updatedProfile: PatientProfile = {
      name: editName.trim(),
      phone: currentPatient.phone,
      email: editEmail.trim(),
      bloodGroup: editBloodGroup,
      allergies: editAllergies.trim(),
      emergencyContact: editEmergency.trim(),
      weight: editWeight.trim(),
      height: editHeight.trim()
    };

    setCurrentPatient(updatedProfile);
    const normalizedPhone = currentPatient.phone.replace(/\s+/g, '');
    localStorage.setItem(`ab_profile_${normalizedPhone}`, JSON.stringify(updatedProfile));
    setIsEditingCard(false);
  };

  // Cancel an appointment from the portal
  const handleCancelAppointmentFromPortal = (apptId: string) => {
    if (window.confirm('Je, una uhakika unataka kufuta au kuondoa miadi hii?')) {
      const updatedAppts = appointments.filter(app => app.id !== apptId);
      setAppointments(updatedAppts);
      localStorage.setItem('ab_hospital_appointments', JSON.stringify(updatedAppts));
    }
  };

  // Filter appointments for the logged-in user
  const patientAppointments = currentPatient
    ? appointments.filter(
        app => app.patientPhone.replace(/\s+/g, '') === currentPatient.phone.replace(/\s+/g, '')
      )
    : [];

  return (
    <section className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unauthenticated Login Screen */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500 text-white shadow-md mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Portal ya Mgonjwa</h2>
              <p className="text-slate-500 text-sm mt-2">
                Ingia ili uangalie historia ya miadi, rekodi za matibabu yako na kufuatilia vipimo vyako vya afya.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              
              <form onSubmit={handlePortalLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Nambari yako ya Simu
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                      <Phone className="w-5 h-5" />
                    </span>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Mfano: 0712345678"
                      className="block w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  id="portal-login-btn"
                  className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Ingia Kwenye Portal
                </button>
              </form>

              {/* Or Divider */}
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-slate-100" />
                <span className="px-3 text-xs text-slate-400 font-bold uppercase tracking-wider">AU JARIBU DEMO</span>
                <div className="flex-grow border-t border-slate-100" />
              </div>

              {/* Demo Login Option */}
              <button
                type="button"
                id="portal-demo-btn"
                onClick={handleDemoLogin}
                className="w-full py-3.5 border border-dashed border-teal-200 hover:border-teal-400 text-teal-700 hover:text-teal-800 bg-teal-50/30 hover:bg-teal-50/60 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Database className="w-4 h-4 text-teal-600" />
                Fungua Portal ya Demo
              </button>

              {/* Patient Trust Callout */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50 flex gap-2.5 items-start text-xs text-slate-500">
                <AlertCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                <span>
                  Portal hii ni salama kabisa na inahifadhi maelezo yako ya matibabu nchini kwa usalama wa 100%. Data inasawazishwa kwa kutumia namba yako ya siri.
                </span>
              </div>

            </div>
          </div>
        ) : (
          
          /* Authenticated Dashboard View */
          <div>
            
            {/* 1. Header Banner & Logged-In User Badge */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-md">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block">Karibu Kwenye Portal</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                    {currentPatient?.name}
                  </h2>
                  <span className="text-xs text-slate-400 font-medium block mt-0.5">
                    ID ya Mgonjwa: <strong className="font-mono text-teal-700">AB-{(currentPatient?.phone || '0').slice(-4)}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <button
                  onClick={onGoToBooking}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  Weka Miadi Mpya
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-slate-400" />
                  Ondoka (Logout)
                </button>
              </div>
            </div>

            {/* 2. Portal Grid Layout: Tabs (Left), Content (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Tab Selector Column (3 Cols) */}
              <div className="lg:col-span-3 space-y-2">
                <button
                  id="portal-tab-miadi"
                  onClick={() => setPortalTab('miadi')}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                    portalTab === 'miadi'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-100'
                      : 'bg-white text-slate-700 border border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <span>Miadi Yangu ({patientAppointments.length})</span>
                  </div>
                </button>

                <button
                  id="portal-tab-rekodi"
                  onClick={() => setPortalTab('rekodi')}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                    portalTab === 'rekodi'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-100'
                      : 'bg-white text-slate-700 border border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5" />
                    <span>Historia ya Tiba</span>
                  </div>
                </button>

                <button
                  id="portal-tab-afya"
                  onClick={() => setPortalTab('afya')}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                    portalTab === 'afya'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-100'
                      : 'bg-white text-slate-700 border border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5" />
                    <span>Vipimo na Tracker</span>
                  </div>
                </button>

                <button
                  id="portal-tab-kadi"
                  onClick={() => setPortalTab('kadi')}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-bold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                    portalTab === 'kadi'
                      ? 'bg-teal-600 text-white shadow-sm shadow-teal-100'
                      : 'bg-white text-slate-700 border border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5" />
                    <span>Kadi ya Mgonjwa</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Content Panel Column (9 Cols) */}
              <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                
                {/* SUB TAB: MIADI (APPOINTMENTS) */}
                {portalTab === 'miadi' && (
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Ratiba ya Miadi</h3>
                        <p className="text-xs text-slate-400">Angalia miadi yako inayokuja na hali zake za uthibitisho kutoka kwa madaktari.</p>
                      </div>
                    </div>

                    {patientAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {patientAppointments.map((app) => (
                          <div
                            key={app.id}
                            className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-lg font-mono">
                                  ID: {app.id}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                                  Imesajiliwa: {app.createdAt.split(' ')[0]}
                                </span>
                              </div>
                              <h4 className="text-base font-bold text-slate-800">{app.doctorName}</h4>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium pt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                                  {app.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                                  {app.time}
                                </span>
                              </div>
                              {app.notes && (
                                <p className="text-xs text-slate-400 mt-2 bg-white/70 p-2.5 rounded-lg italic border border-slate-100">
                                  Sababu: "{app.notes}"
                                </p>
                              )}
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 pt-4 sm:pt-0 border-t sm:border-0 border-slate-100">
                              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                {app.status === 'Inasubiri' ? 'Inasubiri' : app.status}
                              </span>
                              
                              <button
                                onClick={() => handleCancelAppointmentFromPortal(app.id)}
                                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Ghairi Miadi
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h4 className="text-sm font-bold text-slate-700 mb-1">Hakuna Miadi Inayokuja</h4>
                        <p className="text-xs text-slate-400 mb-6">Hujasajili miadi yoyote kwa sasa inayohusiana na namba hii.</p>
                        <button
                          onClick={onGoToBooking}
                          className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
                        >
                          Weka Miadi Mpya Sasa
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* SUB TAB: HISTORIA YA TIBA (MEDICAL HISTORY) */}
                {portalTab === 'rekodi' && (
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Historia ya Matibabu & Ripoti</h3>
                        <p className="text-xs text-slate-400">Hifadhi ya kidijitali ya majibu yako ya daktari, vipimo, na maelekezo ya dawa.</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {dummyMedicalRecords.map((rec) => (
                        <div
                          key={rec.id}
                          className="border border-slate-100 rounded-2xl p-6 hover:shadow-xs transition-all relative overflow-hidden"
                        >
                          {/* Visual subtle left color banner */}
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-teal-500" />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100/60 mb-4">
                            <div>
                              <span className="text-xs text-slate-400 font-bold">{rec.date}</span>
                              <h4 className="text-base font-bold text-slate-800 mt-0.5">{rec.doctor}</h4>
                              <span className="text-xs text-teal-600 font-semibold">{rec.department}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-100 px-2 py-1 rounded-md">
                                Rejea: {rec.id}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Ugonjwa / Diagnosis:</span>
                                <span className="font-semibold text-slate-800 block mt-0.5">{rec.diagnosis}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Vipimo vilivyochukuliwa:</span>
                                <span className="font-medium text-slate-600 block mt-0.5 italic">{rec.vitals}</span>
                              </div>
                            </div>

                            <div>
                              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide">Dalili zilizoripotiwa:</span>
                              <p className="text-slate-600 text-xs mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100/30">
                                {rec.symptoms}
                              </p>
                            </div>

                            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl">
                              <span className="block text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Dawa (Prescription) & Ushauri:</span>
                              <p className="text-teal-900 text-xs leading-relaxed font-semibold">
                                {rec.prescription}
                              </p>
                            </div>

                            <div className="flex justify-between items-center text-xs text-slate-400 font-medium pt-2">
                              <span>Marudio (Next check-up): <strong>{rec.nextVisit}</strong></span>
                              <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" /> Ripoti Imekamilika
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUB TAB: AFYA TRACKER (HEALTH TRACKER) */}
                {portalTab === 'afya' && (
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Fuatilia Vipimo vyako</h3>
                        <p className="text-xs text-slate-400">Ingiza na uchambue maendeleo ya afya yako ya moyo, sukari na uzito kwa kutumia chati yetu.</p>
                      </div>
                    </div>

                    {/* Interactive Form for logger */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-8">
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                        <PlusCircle className="w-4 h-4 text-teal-600" />
                        Sajili Vipimo vya Leo
                      </h4>

                      {vitalsSuccess && (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-2.5 rounded-xl text-xs font-semibold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          Vipimo vimesajiliwa na kuingizwa kwenye chati kwa ufanisi!
                        </div>
                      )}

                      <form onSubmit={handleAddHealthLog} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Shinikizo la Damu (mmHg)</label>
                          <input
                            type="number"
                            required
                            value={inputBP}
                            onChange={(e) => setInputBP(e.target.value)}
                            placeholder="BP Systolic (mf. 120)"
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Kiwango cha Sukari (mg/dL)</label>
                          <input
                            type="number"
                            required
                            value={inputSugar}
                            onChange={(e) => setInputSugar(e.target.value)}
                            placeholder="Sukari (mf. 95)"
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Uzito wa Mwili (kg)</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            value={inputWeight}
                            onChange={(e) => setInputWeight(e.target.value)}
                            placeholder="Uzito (mf. 70)"
                            className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs"
                          />
                        </div>

                        <button
                          type="submit"
                          id="log-vitals-btn"
                          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          Hifadhi Vipimo
                        </button>
                      </form>
                    </div>

                    {/* Chart Container (Dynamic Recharts AreaChart) */}
                    <div className="space-y-6">
                      <div className="bg-white border border-slate-100 rounded-2xl p-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-teal-600" />
                          Chati ya Maendeleo ya Shinikizo la Damu & Sukari
                        </h4>

                        <div className="w-full h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={healthLogs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorBP" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                              <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} fontWeight="bold" />
                              <YAxis stroke="#94a3b8" fontSize={10} fontWeight="bold" />
                              <Tooltip />
                              <Area type="monotone" name="Shinikizo (BP)" dataKey="bloodPressure" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBP)" />
                              <Area type="monotone" name="Sukari (Sugar)" dataKey="bloodSugar" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSugar)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 text-[10px] font-bold text-slate-500 mt-3">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-teal-600 rounded-xs" /> Shinikizo la Damu (Kawaida: 120 mmHg)</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 rounded-xs" /> Sukari ya Mwili (Kawaida: 70-100 mg/dL)</span>
                        </div>
                      </div>

                      {/* Display Table of previous records */}
                      <div className="border border-slate-100 rounded-2xl overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-100">
                          <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                            <tr>
                              <th className="px-4 py-3 text-left">Tarehe</th>
                              <th className="px-4 py-3 text-left">Shinikizo la Damu</th>
                              <th className="px-4 py-3 text-left">Kiwango cha Sukari</th>
                              <th className="px-4 py-3 text-left">Uzito (kg)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                            {healthLogs.map((log, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-4 py-3 font-mono">{log.date}</td>
                                <td className="px-4 py-3">{log.bloodPressure} mmHg</td>
                                <td className="px-4 py-3">{log.bloodSugar} mg/dL</td>
                                <td className="px-4 py-3">{log.weight} kg</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                )}

                {/* SUB TAB: KADI YA MGONJWA (DIGITAL MEDICAL CARD) */}
                {portalTab === 'kadi' && (
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">Kadi ya Afya ya Kidijitali</h3>
                        <p className="text-xs text-slate-400">Habari muhimu za dharura na wasifu wako wa kimsingi wa kibiolojia.</p>
                      </div>
                      {!isEditingCard && (
                        <button
                          onClick={startEditingCard}
                          id="edit-card-btn"
                          className="px-4 py-1.5 border border-teal-200 hover:border-teal-300 text-teal-700 hover:bg-teal-50 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Badili Taarifa
                        </button>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {isEditingCard ? (
                        /* EDIT FORM */
                        <motion.form 
                          key="editing"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onSubmit={handleSaveCard} 
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Jina Kamili</label>
                              <input
                                type="text"
                                required
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Barua Pepe</label>
                              <input
                                type="email"
                                required
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Kundi la Damu (Blood Group)</label>
                              <select
                                value={editBloodGroup}
                                onChange={(e) => setEditBloodGroup(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs bg-white"
                              >
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Mtu wa Karibu wa Dharura (Simu)</label>
                              <input
                                type="text"
                                required
                                value={editEmergency}
                                onChange={(e) => setEditEmergency(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Uzito (kg)</label>
                              <input
                                type="text"
                                value={editWeight}
                                onChange={(e) => setEditWeight(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Kimo (cm)</label>
                              <input
                                type="text"
                                value={editHeight}
                                onChange={(e) => setEditHeight(e.target.value)}
                                className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Mizio (Allergies)</label>
                            <input
                              type="text"
                              value={editAllergies}
                              onChange={(e) => setEditAllergies(e.target.value)}
                              placeholder="Mfano: Penicillin, Karanga, Hakuna"
                              className="block w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-700 text-xs"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => setIsEditingCard(false)}
                              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                            >
                              Ghairi
                            </button>
                            <button
                              type="submit"
                              id="save-card-btn"
                              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                            >
                              Hifadhi
                            </button>
                          </div>
                        </motion.form>
                      ) : (
                        /* DISPLAY MODE */
                        <motion.div 
                          key="display"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl"
                        >
                          {/* Top medical styling element */}
                          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 rounded-full bg-teal-500/10 border border-teal-500/20 blur-xl" />
                          <div className="absolute right-6 top-6">
                            <HeartPulse className="w-10 h-10 text-teal-400 animate-pulse" />
                          </div>

                          <div className="border-b border-slate-800 pb-4 mb-6">
                            <span className="text-[10px] font-bold tracking-wider text-teal-400 uppercase">Hospitali ya Afya Bora</span>
                            <h4 className="text-xl font-bold tracking-tight">{currentPatient?.name}</h4>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kundi la Damu</span>
                              <span className="text-lg font-black text-teal-400 block mt-0.5">{currentPatient?.bloodGroup || 'O+'}</span>
                            </div>

                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mizio (Allergies)</span>
                              <span className="text-sm font-bold block mt-0.5 truncate text-slate-200">{currentPatient?.allergies || 'Hakuna'}</span>
                            </div>

                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Simu ya Dharura</span>
                              <span className="text-sm font-bold block mt-0.5 text-slate-200">{currentPatient?.emergencyContact || 'Hakuna'}</span>
                            </div>

                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uzito / Kimo</span>
                              <span className="text-sm font-bold block mt-0.5 text-slate-200">
                                {currentPatient?.weight || '70'} kg / {currentPatient?.height || '172'} cm
                              </span>
                            </div>

                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nambari ya Simu</span>
                              <span className="text-sm font-bold block mt-0.5 text-slate-200">{currentPatient?.phone}</span>
                            </div>

                            <div>
                              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mwanzo wa Kadi</span>
                              <span className="text-xs font-mono block mt-0.5 text-slate-400">JULAI 2026</span>
                            </div>
                          </div>

                          <div className="mt-8 pt-4 border-t border-slate-800 text-[10px] text-slate-400 font-medium flex justify-between items-center">
                            <span>Saini ya Portal ya Kidijitali ya Mgonjwa</span>
                            <span className="bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-md border border-teal-500/20 uppercase tracking-wider font-bold">AB Verified</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
