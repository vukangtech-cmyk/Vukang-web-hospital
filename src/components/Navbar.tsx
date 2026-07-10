import React, { useState } from 'react';
import { Heart, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'nyumbani', label: 'Nyumbani' },
    { id: 'huduma', label: 'Huduma Zetu' },
    { id: 'madaktari', label: 'Madaktari' },
    { id: 'maoni', label: 'Maoni ya Wagonjwa' },
    { id: 'wasiliana', label: 'Wasiliana Nasi' },
    { id: 'portal', label: 'Portal ya Mgonjwa' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setActiveTab('nyumbani')}
              className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none"
              id="nav-logo"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-teal-500 text-white shadow-sm shadow-teal-100">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <span className="block text-lg font-bold text-slate-800 tracking-tight font-sans leading-none">Afya Bora</span>
                <span className="block text-xs text-teal-600 font-medium tracking-wider uppercase mt-0.5">HOSPITALI</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-teal-50 text-teal-700 font-semibold'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Booking CTA Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-btn-miadi"
              onClick={() => setActiveTab('miadi')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer ${
                activeTab === 'miadi'
                  ? 'bg-teal-700 text-white shadow-teal-100'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Weka Miadi Mtandaoni
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-slate-50 focus:outline-none"
              aria-label="Fungua orodha ya kurasa"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-3 px-4 shadow-lg animate-fade-in">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-mobile-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-500'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-teal-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="nav-btn-mobile-miadi"
              onClick={() => {
                setActiveTab('miadi');
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-3 bg-teal-600 text-white rounded-xl font-semibold tracking-wide shadow-sm hover:bg-teal-700 text-center cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Weka Miadi Sasa
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
