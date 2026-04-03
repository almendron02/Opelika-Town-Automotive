/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Wrench, 
  Settings, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Menu, 
  X,
  CheckCircle2,
  AlertCircle,
  Thermometer,
  Droplets,
  Gauge
} from "lucide-react";
import { useState, useEffect } from "react";

const SERVICES = [
  { id: "ENG-01", name: "Auto engine diagnostic", category: "Diagnostics", icon: <Zap className="w-5 h-5" /> },
  { id: "TNE-02", name: "Auto engine tuning", category: "Diagnostics", icon: <Settings className="w-5 h-5" /> },
  { id: "ELE-05", name: "Electrical repair", category: "Diagnostics", icon: <Zap className="w-5 h-5" /> },
  { id: "SFT-09", name: "Vehicle safety inspection", category: "Diagnostics", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: "TRN-11", name: "Transmission repair", category: "Mechanical", icon: <Settings className="w-5 h-5" /> },
  { id: "STR-04", name: "Steering & suspension", category: "Mechanical", icon: <Wrench className="w-5 h-5" /> },
  { id: "GEN-00", name: "General repairs", category: "Mechanical", icon: <Wrench className="w-5 h-5" /> },
  { id: "WHL-08", name: "Wheel alignment", category: "Mechanical", icon: <Settings className="w-5 h-5" /> },
  { id: "MNT-01", name: "Oil change & fluids", category: "Maintenance", icon: <Droplets className="w-5 h-5" /> },
  { id: "BRK-05", name: "Brake service & repair", category: "Maintenance", icon: <ShieldCheck className="w-5 h-5" /> },
  { id: "BTT-02", name: "Battery replacement", category: "Maintenance", icon: <Zap className="w-5 h-5" /> },
  { id: "AC-01", name: "A/C installation & repair", category: "Climate", icon: <Thermometer className="w-5 h-5" /> },
];

const DiagnosticChip = ({ status, message }: { status: 'ok' | 'error', message: string }) => (
  <div className={`p-4 rounded-lg flex items-start gap-3 ghost-border ${status === 'ok' ? 'bg-surface-container-lowest' : 'bg-error-container'}`}>
    {status === 'ok' ? (
      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
    ) : (
      <AlertCircle className="w-5 h-5 text-error shrink-0" />
    )}
    <div>
      <p className="text-xs font-bold uppercase tracking-tighter text-primary">Diagnostic Report</p>
      <p className="text-sm text-on-surface-variant font-medium">{message}</p>
    </div>
  </div>
);

const ServiceProgressBar = ({ stage }: { stage: number }) => {
  const stages = ["Inspection", "Diagnostic", "Repair", "Testing", "Complete"];
  return (
    <div className="w-full py-4 sm:py-8">
      <div className="relative h-2 bg-secondary-fixed rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(stage / (stages.length - 1)) * 100}%` }}
          className="absolute h-full bg-primary"
        />
      </div>
      <div className="flex justify-between mt-4 gap-1">
        {stages.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mb-2 ${i <= stage ? (i === stage ? 'bg-tertiary' : 'bg-primary') : 'bg-secondary-fixed'}`} />
            <span className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-center leading-tight ${i === stage ? 'text-primary' : 'text-on-surface-variant'}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 sm:py-4 shadow-sm' : 'bg-transparent py-5 sm:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          <div className="text-lg sm:text-xl font-black uppercase tracking-tighter text-primary font-headline leading-tight max-w-[200px] sm:max-w-none">
            Opelika Town Automotive
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-sm font-bold uppercase tracking-widest text-on-surface hover:text-tertiary-container transition-colors"
              >
                {item}
              </a>
            ))}
            <a 
              href="tel:3347376636"
              className="bg-tertiary-container text-on-tertiary px-6 py-2 rounded-lg font-bold tracking-tight hover:bg-on-tertiary-container transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
          </div>

          <button 
            className="md:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 glass pt-24 px-8 md:hidden">
          <div className="flex flex-col gap-6">
            {["Home", "Services", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-2xl font-black uppercase tracking-tighter text-primary font-headline"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="tel:3347376636"
              className="bg-tertiary-container text-on-tertiary px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call
            </a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative pt-32 sm:pt-40 md:pt-48 pb-20 sm:pb-24 md:pb-32 overflow-hidden bg-primary">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--color-primary-container),_var(--color-primary))]" />
        
        {/* Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
          <Settings className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] animate-spin-slow" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center lg:text-left"
          >
            <div className="inline-block py-1 px-3 bg-tertiary-container text-on-tertiary text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded">
              Precision Performance
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] sm:leading-[0.9] text-machined text-fluid-h1">
              EXPERT AUTO REPAIR & MAINTENANCE IN OPELIKA
            </h1>
            <p className="text-primary-fixed-dim text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Engineering excellence for your everyday drive. From precision diagnostics to master-level mechanics, we treat every vehicle like a masterpiece.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2 sm:pt-4">
              <a 
                href="tel:3347376636"
                className="bg-tertiary-container text-on-tertiary px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-on-tertiary-container transition-colors shadow-2xl w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 px-4 sm:px-0"
          >
            <div className="aspect-square rounded-xl overflow-hidden shadow-2xl transform rotate-1 sm:rotate-3 scale-100 sm:scale-105 border-4 border-white/10">
              <img 
                src="https://i.imgur.com/w1cKLxG.jpg" 
                alt="High-end engine"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Diagnostic Chip Overlays */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 max-w-[240px] sm:max-w-xs z-10">
              <DiagnosticChip status="ok" message="All systems operational. Vehicle health: 100% Precision Verified." />
            </div>
            <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-6 hidden sm:block">
              <div className="bg-surface-container-highest/80 backdrop-blur-md p-3 sm:p-4 rounded-lg ghost-border">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">Live Diagnostics</span>
                </div>
                <div className="h-1 w-24 sm:w-32 bg-secondary-fixed rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["20%", "80%", "45%", "90%"] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="h-full bg-tertiary"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us - Bento Grid */}
      <section id="about" className="py-16 sm:py-24 bg-surface px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 text-center sm:text-left">
            <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-tertiary mb-2">Why Choose Us</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary text-machined">ENGINEERED FOR EXCELLENCE</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl flex flex-col justify-between h-full group hover:bg-surface-container transition-colors">
              <div>
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Accurate Diagnosis</h4>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  Using the industry's most advanced software to pinpoint issues before they become expensive failures.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-primary uppercase">Precision 01</span>
                <ChevronRight className="w-4 h-4 text-outline" />
              </div>
            </div>

            <div className="bg-primary p-6 sm:p-8 rounded-xl flex flex-col justify-between h-full text-white shadow-xl lg:transform lg:-translate-y-4">
              <div>
                <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-primary-fixed-dim mb-4 sm:mb-6" />
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">All Makes and Models</h4>
                <p className="text-primary-fixed-dim text-sm sm:text-base leading-relaxed">
                  From domestic heavyweights to European performance icons, our technicians are trained across the spectrum.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-primary-fixed-dim uppercase">Universal 02</span>
                <ChevronRight className="w-4 h-4 text-primary-fixed-dim" />
              </div>
            </div>

            <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl flex flex-col justify-between h-full group hover:bg-surface-container transition-colors sm:col-span-2 lg:col-span-1">
              <div>
                <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6" />
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Advanced Equipment</h4>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  Our facility is equipped with state-of-the-art alignment racks, lifts, and diagnostic arrays.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="text-[10px] sm:text-xs font-bold text-primary uppercase">Equipment 03</span>
                <ChevronRight className="w-4 h-4 text-outline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-surface-container-lowest px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-tertiary mb-2">Service Menu</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary text-machined">COMPREHENSIVE CARE FOR YOUR MACHINE</h3>
            </div>
            <div className="text-on-surface-variant border-l-4 border-tertiary pl-6 italic text-sm sm:text-base">
              All services include a complimentary multi-point digital inspection.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {["Diagnostics", "Mechanical", "Maintenance"].map((cat) => (
              <div key={cat} className="space-y-6 sm:space-y-8">
                <h5 className="font-black text-[10px] sm:text-xs uppercase tracking-tighter text-primary border-b border-outline-variant/30 pb-3 sm:pb-4">
                  {cat} & Systems
                </h5>
                <div className="space-y-5 sm:space-y-6">
                  {SERVICES.filter(s => s.category === cat || (cat === "Maintenance" && s.category === "Climate")).map((service) => (
                    <div key={service.id} className="flex justify-between items-start group">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="mt-1 text-on-surface-variant group-hover:text-tertiary transition-colors shrink-0">
                          {service.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm sm:text-base text-on-surface group-hover:text-primary transition-colors leading-tight">{service.name}</p>
                          <p className="text-[8px] sm:text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{service.id}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] sm:text-xs font-bold text-primary">Inquire</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Service Progress Bar Component Demo */}
          <div className="mt-16 sm:mt-24 p-6 sm:p-12 bg-surface-container-low rounded-xl ghost-border">
            <div className="max-w-2xl mx-auto">
              <h4 className="text-center text-lg sm:text-xl font-black text-primary mb-6 sm:mb-8">TRACK YOUR SERVICE IN REAL-TIME</h4>
              <ServiceProgressBar stage={2} />
              <p className="text-center text-xs sm:text-sm text-on-surface-variant mt-4">
                Current Status: <span className="font-bold text-primary">REPAIR IN PROGRESS</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location */}
      <section id="contact" className="py-16 sm:py-24 bg-surface px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
          <div className="flex-1 space-y-6 sm:space-y-8 w-full">
            <div className="text-center lg:text-left">
              <h2 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-tertiary mb-2">Visit the Shop</h2>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary text-machined">ALWAYS READY FOR DUTY</h3>
            </div>
            
            <div className="bg-surface-container-low p-6 sm:p-8 rounded-xl space-y-6 sm:space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-primary uppercase text-[10px] sm:text-xs tracking-widest mb-1 sm:mb-2">Business Hours</p>
                  <p className="text-xl sm:text-2xl font-black text-primary font-headline">MON-FRI 8:00 AM - 5:00 PM</p>
                  <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Closed Weekends & Federal Holidays</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-primary uppercase text-[10px] sm:text-xs tracking-widest mb-1 sm:mb-2">Service Hub</p>
                  <p className="text-lg sm:text-xl font-bold text-primary">3403 Pepperell Pkwy</p>
                  <p className="text-on-surface-variant text-xs sm:text-sm mt-1">Opelika, AL 36801</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary mt-1 shrink-0" />
                <div>
                  <p className="font-bold text-primary uppercase text-[10px] sm:text-xs tracking-widest mb-1 sm:mb-2">Direct Line</p>
                  <p className="text-lg sm:text-xl font-bold text-primary">(334) 737-6636</p>
                </div>
              </div>
            </div>

            <a 
              href="tel:3347376636"
              className="w-full bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-primary-container transition-colors flex items-center justify-center gap-2 text-base sm:text-lg"
            >
              <Phone className="w-5 h-5" />
              Call For Appointment
            </a>
          </div>

          <div className="flex-1 w-full">
            <div className="aspect-video bg-surface-container rounded-xl overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://i.imgur.com/JThfgXI.jpg" 
                alt="Workshop exterior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2 space-y-4 sm:space-y-6">
            <div className="text-xl sm:text-2xl font-black uppercase tracking-tighter font-headline">
              Opelika Town Automotive
            </div>
            <p className="text-primary-fixed-dim max-w-sm leading-relaxed text-sm sm:text-base">
              Precision maintenance for the discerning driver. Locally owned and operated in Opelika. We elevate automotive service to an art form.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <h5 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-tertiary-container">Quick Links</h5>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-primary-fixed-dim">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h5 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs text-tertiary-container">Legal</h5>
            <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-primary-fixed-dim">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Info</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-primary-fixed-dim uppercase tracking-widest text-center md:text-left">
          <p>© 2026 Opelika Town Automotive. All Rights Reserved.</p>
          <p>Precision Engineered in Alabama</p>
        </div>
      </footer>
    </div>
  );
}
