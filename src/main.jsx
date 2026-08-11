import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart3, ShieldCheck, ClipboardCheck, TrendingUp, ChevronDown, 
  Phone, Mail, CheckCircle2, ArrowRight, Menu, X, CreditCard, Users, 
  Clock, Tag, AlertOctagon, UserMinus, Activity, DollarSign, FileText, 
  Lock, Facebook, Instagram
} from 'lucide-react';

// ==========================================
// ⚙️ SITE CONFIGURATION - UPDATE THESE VALUES
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
    facebook: "https://www.facebook.com/MedyFloRCM", // <-- Add your Facebook URL here
    instagram: "https://www.instagram.com/medyflo" // <-- Add your Instagram URL here
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

  const [monthlyRevenue, setMonthlyRevenue] = useState(120000);
  const [denialRate, setDenialRate] = useState(15);
  
  const estimatedRecovery = Math.round(monthlyRevenue * (denialRate / 100) * 0.4).toLocaleString();

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

  const painPoints = [
    {
      icon: <DollarSign size={26} className="text-red-500" />,
      title: "Denied Claims",
      subtitle: "Revenue you don't get.",
      solution: "We implement rigorous front-end scrubbing and aggressive back-end appeals to recover lost cash flow."
    },
    {
      icon: <Clock size={26} className="text-orange-500" />,
      title: "Slow Reimbursements",
      subtitle: "Cash flow takes a hit.",
      solution: "Accelerate your payment cycles with clean submissions and automated follow-up tracking."
    },
    {
      icon: <AlertOctagon size={26} className="text-amber-500" />,
      title: "Coding Errors",
      subtitle: "Small mistakes, big losses.",
      solution: "Certified medical coders ensure every encounter is precisely documented right the first time."
    },
    {
      icon: <Users size={26} className="text-teal-600" />,
      title: "Time-Consuming Follow-ups",
      subtitle: "Too much admin, too little time.",
      solution: "We handle the endless insurance phone trees so your staff can focus completely on patient care."
    }
  ];

  const icebergPoints = [
    { icon: <DollarSign size={20} className="text-teal-400" />, title: "Underpayments", desc: "Contracts not honored by payers" },
    { icon: <FileText size={20} className="text-teal-400" />, title: "Coding Errors", desc: "Mismatched modifiers and ICD-10 codes" },
    { icon: <Users size={20} className="text-teal-400" />, title: "Eligibility Issues", desc: "Out-of-date patient insurance status" },
    { icon: <Clock size={20} className="text-teal-400" />, title: "AR Aging", desc: "Claims lingering past 60, 90, and 120 days" },
    { icon: <Phone size={20} className="text-teal-400" />, title: "Missed Follow-ups", desc: "Unanswered insurer requests dropped" },
    { icon: <BarChart3 size={20} className="text-teal-400" />, title: "Lost Revenue", desc: "Cumulative leakage draining your margins" }
  ];

  const coreServices = [
    {
      icon: <ClipboardCheck />,
      title: "Claims Submission",
      items: ["Electronic Claims Scrubbing", "Primary, Secondary & Tertiary Billing", "Real-Time Tracking & Validation"]
    },
    {
      icon: <ShieldCheck />,
      title: "Insurance Verification",
      items: ["Real-Time Eligibility Check", "Prior Authorizations", "Benefits & Copay Confirmation"]
    },
    {
      icon: <CreditCard />,
      title: "Payment Posting",
      items: ["ERA & Manual Posting", "Reimbursement Tracking", "Insurance Overpayment Recovery"]
    },
    {
      icon: <TrendingUp />,
      title: "AR Follow-up & Denials",
      items: ["Aggressive Denial Management", "Appeals & Corrected Claims", "Aging Bucket Resolution"]
    }
  ];

  const faqs = [
    {
      q: "How quickly can MedyFlo integrate with our current system?",
      a: "Our onboarding typically takes less than a week. We integrate smoothly with leading EHR platforms without disrupting your daily clinic routine."
    },
    {
      q: "What makes MedyFlo different from standard billers?",
      a: "We combine cutting-edge technology with dedicated human experts. We actively scrub front-end errors, manage your entire AR backlog, and protect your profit margins."
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-800">
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-teal-400 shadow-md group-hover:scale-105 transition-transform">
                <Activity size={24} />
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
                  className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors"
                >
                  {nav.label}
                </button>
              ))}
              {currentView !== 'home' && (
                <button onClick={() => setCurrentView('home')} className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Back to Home</button>
              )}
              <button 
                onClick={() => handleScroll('contact')}
                className="bg-teal-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 active:scale-95"
              >
                Get 50% Off Audit
              </button>
            </nav>

            <button 
              className="md:hidden p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden bg-white border-b border-slate-200 absolute w-full shadow-2xl py-6 flex flex-col items-center gap-4 animate-in slide-in-from-top duration-200">
            {currentView === 'home' ? SITE_CONFIG.navigation.map((nav, index) => (
              <button 
                key={index} 
                onClick={() => handleScroll(nav.id)} 
                className="font-bold text-slate-700 text-lg hover:text-teal-600"
              >
                {nav.label}
              </button>
            )) : (
              <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="font-bold text-slate-700 text-lg hover:text-teal-600">Back to Home</button>
            )}
            <button 
              onClick={() => handleScroll('contact')}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold text-base shadow-md mt-2"
            >
              Schedule Audit
            </button>
          </nav>
        )}
      </header>

      {/* Pages Handled Here (Terms, Privacy) */}
      {currentView === 'terms' ? (
        <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              <FileText size={14} /> Legal Documentation
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">Terms of Service</h1>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900 pt-4">1. Acceptance of Terms</h3>
              <p>By accessing or using the {SITE_CONFIG.brandName} website, you agree to comply with and be bound by these Terms.</p>
              
              <h3 className="text-xl font-bold text-slate-900 pt-4">2. Medical Billing & RCM Services</h3>
              <p>{SITE_CONFIG.brandName} provides claims submission, insurance verification, accounts receivable management, and revenue optimization consulting.</p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <button onClick={() => setCurrentView('home')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-md">
                ← Return to Home
              </button>
            </div>
          </div>
        </main>
      ) : currentView === 'privacy' ? (
        <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Lock size={14} /> Data Security & Trust
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">Privacy Policy</h1>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900 pt-4">1. Information We Collect</h3>
              <p>We collect practice details, professional email addresses, phone numbers, and optional revenue metrics provided via our audit questionnaires.</p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <button onClick={() => setCurrentView('home')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-md">
                ← Return to Home
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900">
                    Focus on <br />
                    <span className="text-slate-900">Patients.</span><br />
                    <span className="text-teal-600">We’ll Handle</span><br />
                    <span className="text-teal-600">the Paperwork.</span>
                  </h1>
                  
                  <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed border-l-4 border-teal-500 pl-4">
                    Let us manage your billing so you can spend more time on what matters most. Accurate claims. Faster payments.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button onClick={() => handleScroll('contact')} className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg active:scale-95">
                      Get Started Today
                    </button>
                    <button onClick={() => handleScroll('services')} className="bg-slate-100 border border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all active:scale-95">
                      Explore Services
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden">
                     <div className="absolute top-1/2 -translate-y-12 right-0 opacity-10 pointer-events-none">
                        <Activity size={300} className="text-teal-600" />
                     </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <ShieldCheck className="text-teal-600" size={24} /> Comprehensive RCM
                    </h3>
                    <div className="space-y-4">
                      {["Claims Submission", "Insurance Verification", "Payment Posting", "AR Follow-up", "Denial Management", "Credentialing"].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm"><CheckCircle2 size={16} /></div>
                          <span className="font-semibold text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solutions Section */}
          <section id="solutions" className="py-24 bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Pain in Medical Billing?</h2>
                <p className="text-xl text-teal-600 font-bold">You focus on patients — we fix the billing.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white p-8 lg:p-12 rounded-3xl border border-slate-200 shadow-lg flex flex-col items-center text-center relative">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 mb-6"><UserMinus size={48} /></div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">Less Time.<br/>Less Stress.<br/><span className="text-teal-600">More Revenue.</span></h3>
                  <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                    We take care of the billing so you can focus on what matters most. Let's remove the pain. Together.
                  </p>
                </div>
                <div className="space-y-4">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                      <div className="bg-slate-50 p-3 rounded-xl shrink-0">{point.icon}</div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">{point.title}</h4>
                        <p className="text-sm font-semibold text-slate-500 mb-1">{point.subtitle}</p>
                        <p className="text-sm text-slate-600">{point.solution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Iceberg/Problem Section */}
          <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
             {/* Same content as previous version */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl sm:text-5xl font-black mt-2 mb-4">
                  The problem is bigger <br/><span className="text-teal-400">than it looks.</span>
                </h2>
                <div className="w-20 h-1 bg-teal-500 mx-auto mb-6"></div>
                <p className="text-slate-300 text-lg">Denied claims are just the visible peak. Hidden revenue leaks lurk beneath the surface.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {icebergPoints.map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <button 
                  onClick={() => handleScroll('contact')}
                  className="bg-teal-500 text-slate-950 px-8 py-4 rounded-full font-bold hover:bg-teal-400 transition-all inline-flex items-center gap-2 shadow-xl shadow-teal-900/50"
                >
                  See What {SITE_CONFIG.brandName} Uncovers <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-24 lg:py-32 bg-white">
             {/* Same content as previous version */}
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-2 mb-4">
                  Medical Billing, <span className="text-teal-600">Done Right.</span>
                </h2>
                <p className="text-xl text-slate-600 font-medium">Accurate Claims. Faster Payments.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all group flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors border border-slate-100">
                        {React.cloneElement(service.icon, { size: 28 })}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                      <ul className="space-y-3 mb-6">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
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

          {/* Calculator Section */}
          <section id="calculator" className="py-24 bg-slate-900 text-white relative">
             {/* Same content as previous version */}
             <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl sm:text-4xl font-black">Calculate Your Practice Potential</h2>
                  <p className="text-slate-400 text-sm mt-2">See how much additional revenue {SITE_CONFIG.brandName} can capture for your clinic.</p>
                </div>

                <div className="space-y-8 mb-10">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-300">Monthly Gross Practice Revenue</label>
                      <span className="text-2xl font-black text-teal-400">${monthlyRevenue.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="20000" max="1000000" step="10000"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-bold text-slate-300">Estimated Current Denial & Leakage Rate</label>
                      <span className="text-2xl font-black text-teal-400">{denialRate}%</span>
                    </div>
                    <input 
                      type="range" min="5" max="35" 
                      value={denialRate}
                      onChange={(e) => setDenialRate(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                  </div>
                </div>

                <div className="bg-teal-950/80 border border-teal-500/40 rounded-2xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-left">
                    <p className="text-xs text-teal-400 font-bold uppercase tracking-wider mb-1">Estimated Monthly Recovery</p>
                    <div className="text-4xl sm:text-5xl font-black text-white">${estimatedRecovery}</div>
                  </div>
                  <button onClick={() => handleScroll('contact')} className="bg-teal-500 text-slate-950 px-8 py-4 rounded-xl font-bold hover:bg-teal-400 transition-all shrink-0">
                    Claim This Revenue
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-slate-200 shadow-2xl relative overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-4 leading-tight">
                      Claims<br/><span className="text-slate-900">Stuck?</span>
                    </h2>
                    <p className="text-2xl text-teal-600 font-bold mb-8">{SITE_CONFIG.brandName} clears the backlog.</p>
                    
                    <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0"><Phone size={20} /></div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Call Us Directly</div>
                          <a href={`tel:${SITE_CONFIG.contact.phoneUri}`} className="text-lg font-bold text-slate-900 hover:text-teal-600 transition-colors">{SITE_CONFIG.contact.phoneDisplay}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0"><Mail size={20} /></div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Email Our Team</div>
                          <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-lg font-bold text-slate-900 hover:text-teal-600 transition-colors">{SITE_CONFIG.contact.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {formStatus === 'success' ? (
                      <div className="text-center py-12 bg-teal-50 rounded-3xl border border-teal-100">
                        <div className="w-20 h-20 bg-white text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"><CheckCircle2 size={40} /></div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Request Submitted!</h3>
                        <p className="text-slate-600 mb-8 px-4">Our RCM specialists will contact you shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5 bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                          <Tag size={14} /> 50% Off First Audit
                        </div>
                        <h3 className="text-2xl font-black mb-6">Get Started Today</h3>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
                            <input required type="text" placeholder="Dr. Jane Smith" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none text-white placeholder:text-slate-500" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Work Email</label>
                            <input required type="email" placeholder="jane@clinic.com" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none text-white placeholder:text-slate-500" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Practice Name</label>
                          <input required type="text" placeholder="Northside Medical Center" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none text-white placeholder:text-slate-500" />
                        </div>
                        <button type="submit" disabled={formStatus === 'submitting'} className="w-full bg-teal-500 text-slate-950 py-4 rounded-xl font-bold text-lg hover:bg-teal-400 transition-all shadow-lg active:scale-95 disabled:opacity-50 mt-4 flex items-center justify-center gap-2">
                          {formStatus === 'submitting' ? 'Processing...' : 'Request Audit Now'} <ArrowRight size={20} />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-white border-t border-slate-200">
             {/* Same content as previous version */}
             <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 bg-slate-50 rounded-2xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-100 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-lg">{faq.q}</span>
                      <ChevronDown className={`transition-transform duration-300 text-teal-600 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`} size={20} />
                    </button>
                    {activeFaq === idx && (
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-teal-600">
                <Activity size={20} />
              </div>
              <div>
                 <span className="text-xl font-bold text-white tracking-tight block">{SITE_CONFIG.brandName}</span>
                 <span className="text-[8px] font-bold tracking-widest text-slate-500 uppercase block">Medical Billing. Simplified.</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest">
              {SITE_CONFIG.navigation.slice(0, 3).map((nav, index) => (
                <button key={index} onClick={() => handleScroll(nav.id)} className="hover:text-teal-400 transition-colors">{nav.label}</button>
              ))}
              <button onClick={() => handleScroll('contact')} className="hover:text-teal-400 transition-colors">Contact</button>
            </div>

            {/* Configured Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href={SITE_CONFIG.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-full text-slate-400 hover:bg-teal-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={SITE_CONFIG.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-full text-slate-400 hover:bg-teal-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs gap-4 pt-8 border-t border-slate-800">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Revenue Cycle Management. HIPAA Compliant.</p>
            <div className="flex gap-6 font-semibold">
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
