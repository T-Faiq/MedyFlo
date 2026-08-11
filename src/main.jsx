import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart3, ShieldCheck, ClipboardCheck, TrendingUp, ChevronDown, 
  Phone, Mail, CheckCircle2, ArrowRight, Menu, X, CreditCard, Users, 
  Clock, Tag, AlertOctagon, UserMinus, Activity, DollarSign, FileText, 
  Lock, Facebook, Instagram, Calculator
} from 'lucide-react';

// ==========================================
// ⚙️ SITE CONFIGURATION
// ==========================================
const SITE_CONFIG = {
  brandName: "MedyFlo",
  brandTagline: "Focus On Care. We Handle Billing.",
  contact: {
    phoneDisplay: "(800) 555-2847",
    phoneUri: "8005552847",
    email: "audit@medyflo.com"
  },
  socialLinks: {
    facebook: "https://www.facebook.com/MedyFloRCM",
    instagram: "https://www.instagram.com/medyflo/"
  },
  navigation: [
    { label: "Solutions", id: "solutions" },
    { label: "Services", id: "services" },
    { label: "ROI Calculator", id: "calculator" },
    { label: "FAQ", id: "faq" }
  ]
};
// ==========================================

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [activeFaq, setActiveFaq] = useState(null);

  // ROI Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState(150000);
  const [denialRate, setDenialRate] = useState(15);
  
  // Accurate ROI Math: 
  // Calculates lost revenue, then applies a realistic 65% recovery success rate by MedyFlo
  const lostRevenue = monthlyRevenue * (denialRate / 100);
  const recoveryRate = 0.65; 
  const estimatedRecovery = Math.round(lostRevenue * recoveryRate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleScroll = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      scrollToElement(id);
    }
    setIsMenuOpen(false);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      e.target.reset();
    }, 1500);
  };

  const handleRevenueChange = (e) => {
    const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
    setMonthlyRevenue(isNaN(val) ? 0 : val);
  };

  const handleDenialChange = (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    setDenialRate(val);
  };

  const painPoints = [
    {
      icon: <DollarSign size={28} className="text-rose-500" />,
      title: "Denied Claims",
      subtitle: "Revenue you earned, but don't get.",
      solution: "We implement rigorous front-end scrubbing and aggressive back-end appeals to recover lost cash flow."
    },
    {
      icon: <Clock size={28} className="text-amber-500" />,
      title: "Slow Reimbursements",
      subtitle: "Cash flow takes a major hit.",
      solution: "Accelerate your payment cycles with clean first-time submissions and automated follow-up tracking."
    },
    {
      icon: <AlertOctagon size={28} className="text-orange-500" />,
      title: "Coding Errors",
      subtitle: "Small mistakes lead to big losses.",
      solution: "Certified medical coders ensure every encounter is precisely documented right the first time."
    },
    {
      icon: <Users size={28} className="text-teal-600" />,
      title: "Endless Admin Time",
      subtitle: "Too much paperwork, too little care.",
      solution: "We handle the endless insurance phone trees so your staff can focus completely on patient care."
    }
  ];

  const icebergPoints = [
    { icon: <DollarSign size={22} className="text-teal-400" />, title: "Underpayments", desc: "Contracts not honored by payers, silently draining profits." },
    { icon: <FileText size={22} className="text-teal-400" />, title: "Coding Mismatches", desc: "Incorrect modifiers and ICD-10 codes triggering instant denials." },
    { icon: <Users size={22} className="text-teal-400" />, title: "Eligibility Issues", desc: "Out-of-date patient insurance status checked too late." },
    { icon: <Clock size={22} className="text-teal-400" />, title: "AR Aging", desc: "Claims lingering past 60, 90, and 120 days unworked." },
    { icon: <Phone size={22} className="text-teal-400" />, title: "Missed Follow-ups", desc: "Unanswered insurer requests completely dropped by busy staff." },
    { icon: <BarChart3 size={22} className="text-teal-400" />, title: "Lost Margins", desc: "Cumulative revenue leakage threatening practice stability." }
  ];

  const coreServices = [
    {
      icon: <ClipboardCheck />,
      title: "Claims Submission",
      items: ["Electronic Claims Scrubbing", "Primary & Secondary Billing", "Real-Time Tracking"]
    },
    {
      icon: <ShieldCheck />,
      title: "Insurance Verification",
      items: ["Real-Time Eligibility", "Prior Authorizations", "Benefits Confirmation"]
    },
    {
      icon: <CreditCard />,
      title: "Payment Posting",
      items: ["ERA & Manual Posting", "Reimbursement Tracking", "Overpayment Recovery"]
    },
    {
      icon: <TrendingUp />,
      title: "AR Follow-up",
      items: ["Aggressive Denials Team", "Corrected Claims", "Aging Bucket Resolution"]
    }
  ];

  const faqs = [
    {
      q: "How quickly can MedyFlo integrate with our current system?",
      a: "Our onboarding typically takes less than a week. We integrate smoothly with leading EHR platforms without disrupting your daily clinic routine."
    },
    {
      q: "What makes MedyFlo different from standard billers?",
      a: "We combine cutting-edge technology with dedicated human experts. We actively scrub front-end errors, manage your entire AR backlog, and fiercely protect your margins."
    },
    {
      q: "Are you fully HIPAA compliant?",
      a: "Yes, 100%. All data transmission, cloud storage, and handling procedures adhere strictly to HIPAA regulations to safeguard patient health information."
    },
    {
      q: "Is there a long-term commitment required?",
      a: "No long-term contracts are required. We believe in earning your business month after month through measurable performance and recovered revenue."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      
      {/* 🟢 HEADER */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-teal-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Activity size={24} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center">
                  {SITE_CONFIG.brandName.substring(0, 4)}<span className="text-teal-600">{SITE_CONFIG.brandName.substring(4)}</span>
                </div>
                <div className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">{SITE_CONFIG.brandTagline}</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {currentView === 'home' && SITE_CONFIG.navigation.map((nav, index) => (
                <button 
                  key={index} 
                  onClick={() => handleScroll(nav.id)} 
                  className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors"
                >
                  {nav.label}
                </button>
              ))}
              {currentView !== 'home' && (
                <button onClick={() => setCurrentView('home')} className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">Back to Home</button>
              )}
              <button 
                onClick={() => handleScroll('contact')}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
              >
                Get 50% Off Audit
              </button>
            </nav>

            <button 
              className="md:hidden p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-2xl py-6 flex flex-col items-center gap-6 animate-in slide-in-from-top duration-200">
            {currentView === 'home' ? SITE_CONFIG.navigation.map((nav, index) => (
              <button 
                key={index} 
                onClick={() => handleScroll(nav.id)} 
                className="font-black text-slate-800 text-xl hover:text-teal-600"
              >
                {nav.label}
              </button>
            )) : (
              <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="font-black text-slate-800 text-xl hover:text-teal-600">Back to Home</button>
            )}
            <button 
              onClick={() => handleScroll('contact')}
              className="bg-teal-600 text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-lg shadow-teal-600/20 mt-4 w-11/12 max-w-sm"
            >
              Schedule Audit Now
            </button>
          </nav>
        )}
      </header>

      {/* 🟢 PAGES (Terms/Privacy) */}
      {currentView === 'terms' || currentView === 'privacy' ? (
        <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen flex flex-col justify-center">
          <div className="bg-white rounded-[2rem] p-8 sm:p-14 shadow-2xl border border-slate-200">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              {currentView === 'terms' ? <FileText size={16} /> : <Lock size={16} />}
              {currentView === 'terms' ? "Legal Documentation" : "Data Security & Trust"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              {currentView === 'terms' ? "Terms of Service" : "Privacy Policy"}
            </h1>
            <p className="text-slate-500 font-medium mb-10 pb-6 border-b border-slate-100">Last updated: August 2026</p>
            
            <div className="space-y-8 text-slate-600 leading-relaxed text-base sm:text-lg">
              {currentView === 'terms' ? (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
                    <p>By accessing or using the {SITE_CONFIG.brandName} website and RCM services, you agree to comply with and be bound by these Terms of Service.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2. Medical Billing & RCM Services</h3>
                    <p>{SITE_CONFIG.brandName} provides claims submission, insurance verification, accounts receivable management, and revenue optimization consulting.</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">1. Information We Collect</h3>
                    <p>We collect practice details, professional email addresses, phone numbers, and optional revenue metrics provided via our audit questionnaires.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">2. Data Usage & HIPAA</h3>
                    <p>Your information is used strictly to provide consultation reports and fulfill contractual billing agreements in full accordance with HIPAA regulations.</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-14 pt-8 border-t border-slate-100">
              <button onClick={() => setCurrentView('home')} className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-lg flex items-center gap-2">
                <ArrowRight className="rotate-180" size={18} /> Return to Home
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main>
          {/* 🟢 HERO SECTION */}
          <section className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-6 text-slate-900">
                    Focus on <br />
                    <span className="text-slate-900">Patients.</span><br />
                    <span className="text-teal-600">We’ll Handle</span><br />
                    <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">the Billing.</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
                    Stop letting denied claims drain your margins. Accurate coding, relentless follow-ups, and faster payments.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button onClick={() => handleScroll('contact')} className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2">
                      Get Started Today <ArrowRight size={20} />
                    </button>
                    <button onClick={() => handleScroll('calculator')} className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:border-teal-600 hover:text-teal-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Calculator size={20} /> Calculate ROI
                    </button>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden text-white">
                     <div className="absolute top-1/2 -translate-y-12 right-0 opacity-10 pointer-events-none">
                        <Activity size={300} className="text-teal-400" />
                     </div>
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                      <ShieldCheck className="text-teal-400" size={32} /> RCM Excellence
                    </h3>
                    <div className="space-y-5">
                      {["End-to-end Claims Submission", "Real-time Insurance Verification", "Accurate Payment Posting", "Aggressive Denial Management"].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shadow-sm shrink-0">
                            <CheckCircle2 size={18} />
                          </div>
                          <span className="font-bold text-slate-200">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🟢 SOLUTIONS SECTION */}
          <section id="solutions" className="py-24 lg:py-32 bg-slate-50 relative border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">Pain in Medical Billing?</h2>
                <p className="text-xl text-teal-600 font-bold">You focus on health — we fix the wealth.</p>
              </div>
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 bg-white p-10 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-8 border border-rose-100">
                    <UserMinus size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">Less Time Admin.<br/>Less Stress.<br/><span className="text-teal-600">More Revenue.</span></h3>
                  <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    We completely take over the billing burden so your practice can breathe again. Let's remove the friction together.
                  </p>
                </div>
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                        {point.icon}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-2">{point.title}</h4>
                      <p className="text-sm font-bold text-slate-500 mb-3">{point.subtitle}</p>
                      <p className="text-slate-600 leading-relaxed font-medium text-sm">{point.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 🟢 THE PROBLEM SECTION (Dark Mode) */}
          <section className="py-24 lg:py-32 bg-slate-950 text-white relative overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                  The leakage is worse <br/><span className="text-teal-400">than it looks.</span>
                </h2>
                <div className="w-24 h-1.5 bg-teal-500 mx-auto mb-8 rounded-full"></div>
                <p className="text-slate-400 text-lg sm:text-xl font-medium">Denied claims are just the visible peak. Hidden revenue leaks lurk completely beneath the surface.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {icebergPoints.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:bg-slate-800 hover:border-teal-500/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🟢 SERVICES SECTION */}
          <section id="services" className="py-24 lg:py-32 bg-white border-b border-slate-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                  Medical Billing, <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">Done Right.</span>
                </h2>
                <p className="text-xl text-slate-600 font-bold">Accuracy meets aggression in revenue recovery.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreServices.map((service, idx) => (
                  <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 hover:shadow-2xl hover:border-teal-400 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between cursor-default">
                    <div>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 border border-slate-100">
                        {React.cloneElement(service.icon, { size: 32 })}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-6">{service.title}</h3>
                      <ul className="space-y-4">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                            <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 🟢 ACCURATE ROI CALCULATOR */}
          <section id="calculator" className="py-24 lg:py-32 bg-teal-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-400 via-transparent to-transparent"></div>
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Calculate Your <span className="text-teal-400">Revenue Potential</span></h2>
                <p className="text-teal-100/80 text-lg sm:text-xl font-medium max-w-2xl mx-auto">Discover how much leaked revenue {SITE_CONFIG.brandName} can recover for your practice every single month based on industry-standard 65% recovery metrics.</p>
              </div>

              <div className="bg-slate-900 border border-teal-500/30 rounded-[2.5rem] shadow-2xl p-8 sm:p-12 lg:p-16">
                
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Inputs */}
                  <div className="space-y-10">
                    
                    {/* Revenue Input */}
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">Monthly Gross Revenue</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 font-bold">$</span>
                          <input 
                            type="text" 
                            value={monthlyRevenue.toLocaleString()} 
                            onChange={handleRevenueChange}
                            className="bg-slate-800 border-2 border-slate-700 focus:border-teal-400 focus:ring-0 rounded-xl py-2 pl-7 pr-4 w-32 text-right font-black text-white outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <input 
                        type="range" min="10000" max="1000000" step="5000"
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                      <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                        <span>$10k</span>
                        <span>$1M+</span>
                      </div>
                    </div>

                    {/* Denial Rate Input */}
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">Current Denial / Leakage Rate</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={denialRate} 
                            onChange={handleDenialChange}
                            className="bg-slate-800 border-2 border-slate-700 focus:border-teal-400 focus:ring-0 rounded-xl py-2 pr-7 pl-4 w-24 text-right font-black text-white outline-none transition-colors"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 font-bold">%</span>
                        </div>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1"
                        value={denialRate}
                        onChange={(e) => setDenialRate(Number(e.target.value))}
                        className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                      <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                        <span>5% (Excellent)</span>
                        <span>40% (Critical)</span>
                      </div>
                    </div>
                  </div>

                  {/* Results Card */}
                  <div className="bg-teal-500/10 border-2 border-teal-500/50 rounded-3xl p-8 lg:p-10 text-center relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 bg-teal-500 text-slate-900 text-[10px] font-black px-6 py-1 uppercase tracking-widest rotate-12 shadow-lg">Estimated</div>
                    
                    <p className="text-sm text-teal-300 font-bold uppercase tracking-widest mb-2">Estimated Monthly Recovery</p>
                    <div className="text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-md">
                      ${estimatedRecovery.toLocaleString()}
                    </div>
                    
                    <div className="bg-slate-900/50 rounded-xl p-4 mb-8 text-left border border-slate-700/50">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Total Lost Revenue:</span>
                        <span className="font-bold text-rose-400">${Math.round(lostRevenue).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Our Target Recovery (65%):</span>
                        <span className="font-bold text-teal-400">+${estimatedRecovery.toLocaleString()}</span>
                      </div>
                    </div>

                    <button onClick={() => handleScroll('contact')} className="w-full bg-teal-500 text-slate-950 py-4 rounded-xl font-black text-lg hover:bg-teal-400 hover:-translate-y-1 transition-all shadow-xl shadow-teal-500/20 active:scale-95 flex justify-center items-center gap-2">
                      Claim This Revenue <ArrowRight size={20} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 🟢 CONTACT SECTION */}
          <section id="contact" className="py-24 lg:py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-[3rem] p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  <div>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                      Claims<br/><span className="text-teal-600">Stuck?</span>
                    </h2>
                    <p className="text-xl text-slate-600 font-bold mb-10">{SITE_CONFIG.brandName} aggressively clears the backlog.</p>
                    
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors group">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors"><Phone size={24} /></div>
                        <div>
                          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Call Us Directly</div>
                          <a href={`tel:${SITE_CONFIG.contact.phoneUri}`} className="text-2xl font-black text-slate-900 hover:text-teal-600 transition-colors">{SITE_CONFIG.contact.phoneDisplay}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors group">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors"><Mail size={24} /></div>
                        <div>
                          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Email Our Team</div>
                          <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-xl sm:text-2xl font-black text-slate-900 hover:text-teal-600 transition-colors">{SITE_CONFIG.contact.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formStatus === 'success' ? (
                      <div className="text-center py-16 bg-teal-50 rounded-[2rem] border-2 border-teal-200 shadow-inner">
                        <div className="w-24 h-24 bg-white text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md"><CheckCircle2 size={48} /></div>
                        <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Request Submitted!</h3>
                        <p className="text-slate-600 font-medium text-lg px-4">Our RCM specialists will contact you shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 sm:p-10 rounded-[2rem] text-white shadow-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-2 border border-teal-500/20">
                          <Tag size={14} /> 50% Off First Audit
                        </div>
                        <h3 className="text-3xl font-black mb-8 tracking-tight">Get Started Today</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                            <input required type="text" placeholder="Dr. Jane Smith" className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium transition-all" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
                            <input required type="email" placeholder="jane@clinic.com" className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium transition-all" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Practice Name</label>
                          <input required type="text" placeholder="Northside Medical Center" className="w-full px-5 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium transition-all" />
                        </div>
                        <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-teal-500 text-slate-950 py-4.5 rounded-xl font-black text-lg hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20 active:scale-95 disabled:opacity-50 mt-4 flex items-center justify-center gap-2 h-14">
                          {formStatus === 'submitting' ? 'Processing Securely...' : 'Request Audit Now'} {!formStatus.includes('submitting') && <ArrowRight size={20} />}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 🟢 FAQ SECTION */}
          <section id="faq" className="py-24 lg:py-32 bg-white border-t border-slate-200">
             <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 bg-slate-50 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-slate-100 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-lg sm:text-xl pr-4">{faq.q}</span>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-500'}`}>
                        <ChevronDown className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} size={24} />
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-6 sm:p-8 pt-0 text-slate-600 font-medium leading-relaxed bg-slate-50 text-base sm:text-lg border-t border-slate-200/50">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 🟢 FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-14">
            
            {/* Footer Logo */}
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform duration-300">
                <Activity size={24} strokeWidth={2.5} />
              </div>
              <div>
                 <span className="text-2xl font-black text-white tracking-tight block">{SITE_CONFIG.brandName}</span>
                 <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase block">{SITE_CONFIG.brandTagline}</span>
              </div>
            </div>

            {/* Footer Nav */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-sm font-bold uppercase tracking-wider">
              {SITE_CONFIG.navigation.slice(0, 3).map((nav, index) => (
                <button key={index} onClick={() => handleScroll(nav.id)} className="hover:text-teal-400 transition-colors">{nav.label}</button>
              ))}
              <button onClick={() => handleScroll('contact')} className="hover:text-teal-400 transition-colors">Contact</button>
            </div>

            {/* Configured Social Icons */}
            <div className="flex items-center gap-4">
              <a href={SITE_CONFIG.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all shadow-sm">
                <Facebook size={20} />
              </a>
              <a href={SITE_CONFIG.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all shadow-sm">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-6 pt-10 border-t border-slate-800 font-medium">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Revenue Cycle Management. HIPAA Compliant.</p>
            <div className="flex gap-8">
              <button onClick={() => setCurrentView('terms')} className="hover:text-teal-400 transition-colors">Terms of Service</button>
              <button onClick={() => setCurrentView('privacy')} className="hover:text-teal-400 transition-colors">Privacy Policy</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);
