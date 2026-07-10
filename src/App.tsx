import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Nyumbani from './components/Nyumbani';
import HudumaZetu from './components/HudumaZetu';
import Madaktari from './components/Madaktari';
import MaoniYaWagonjwa from './components/MaoniYaWagonjwa';
import WasilianaNasi from './components/WasilianaNasi';
import MiadiSystem from './components/MiadiSystem';
import PortalMgonjwa from './components/PortalMgonjwa';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('nyumbani');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);

  // Handler when booking a specific doctor
  const handleBookDoctor = (doctorId: string) => {
    setPreselectedDoctorId(doctorId);
    setActiveTab('miadi');
  };

  // Handler when booking a generic service
  const handleBookService = () => {
    setPreselectedDoctorId(null);
    setActiveTab('miadi');
  };

  // Safe reset of the preselection after loading it in the form
  const handleClearPreselected = () => {
    setPreselectedDoctorId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Dynamic Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Render Container with micro-transitions */}
      <main className="flex-grow">
        {activeTab === 'nyumbani' && (
          <Nyumbani setActiveTab={setActiveTab} onBookDoctor={handleBookDoctor} />
        )}
        {activeTab === 'huduma' && (
          <HudumaZetu onBookService={handleBookService} />
        )}
        {activeTab === 'madaktari' && (
          <Madaktari onBookDoctor={handleBookDoctor} />
        )}
        {activeTab === 'maoni' && (
          <MaoniYaWagonjwa />
        )}
        {activeTab === 'wasiliana' && (
          <WasilianaNasi />
        )}
        {activeTab === 'miadi' && (
          <MiadiSystem 
            preselectedDoctorId={preselectedDoctorId} 
            onClearPreselected={handleClearPreselected} 
          />
        )}
        {activeTab === 'portal' && (
          <PortalMgonjwa onGoToBooking={() => setActiveTab('miadi')} />
        )}
      </main>

      {/* Complete Footer Section matching Swahili identity */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Column 1: Brand Info */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-500 text-white">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <span className="text-white text-lg font-bold tracking-tight">Afya Bora Hospitali</span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Tunatoa huduma bora za afya kwa kutumia madaktari bingwa, vifaa vya kisasa, na teknolojia ya hali ya juu kuhakikisha wagonjwa wetu wanapata tiba salama na ya haraka.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Kurasa</h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li>
                  <button 
                    onClick={() => setActiveTab('nyumbani')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Nyumbani
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('huduma')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Huduma Zetu
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('madaktari')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Madaktari Wetu
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('maoni')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Maoni ya Wagonjwa
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('wasiliana')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Wasiliana Nasi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('portal')} 
                    className="hover:text-teal-400 transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Portal ya Mgonjwa
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className="md:col-span-5 space-y-4">
              <h4 className="text-white text-sm font-bold uppercase tracking-wider">Wasiliana Nasi</h4>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex gap-2.5 items-start">
                  <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>Mlimani Road, Dar es Salaam, Tanzania (Mita 200 karibu na Mlimani City Mall)</span>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <a href="tel:+255712345678" className="hover:text-teal-400 transition-colors">+255 712 345 678 / +255 22 212 3456</a>
                </li>
                <li className="flex gap-2.5 items-center">
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <a href="mailto:info@afyaborahospitali.co.tz" className="hover:text-teal-400 transition-colors">info@afyaborahospitali.co.tz</a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright line */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
            <span>© 2026 Hospitali ya Afya Bora. Haki zote zimehifadhiwa.</span>
            <div className="flex gap-4">
              <span className="hover:text-teal-400 cursor-pointer">Sera ya Faragha</span>
              <span>•</span>
              <span className="hover:text-teal-400 cursor-pointer">Sheria na Masharti</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
