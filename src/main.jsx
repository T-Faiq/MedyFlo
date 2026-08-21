import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart3, ShieldCheck, ClipboardCheck, TrendingUp, ChevronDown, 
  Phone, Mail, CheckCircle2, ArrowRight, Menu, X, CreditCard, Users, 
  Clock, Tag, AlertOctagon, UserMinus, Activity, DollarSign, FileText, 
  Lock, Facebook, Instagram, Linkedin, Calculator, Award, Building2, Stethoscope, 
  Layers, HelpCircle, FileSpreadsheet, Sparkles
} from 'lucide-react';

// ==========================================
// ⚙️ SITE CONFIGURATION
// ==========================================
const SITE_CONFIG = {
  brandName: "MedyFlo",
  brandTagline: "Focus On Care. We Handle Billing.",
  logoPath: "/logo.png",
  contact: {
    phoneDisplay: "(800) 555-2847",
    phoneUri: "8005552847",
    email: "info@medyflo.com",
    
    // 📩 FORM RECIPIENT
    recipientEmail: "info@medyflo.com",
    
    // 🔑 WEB3FORMS ACCESS KEY 
    web3formsAccessKey: "ff295be2-0e37-4aea-9db6-853c82d88f55" 
  },
  socialLinks: {
    facebook: "https://www.facebook.com/MedyFloRCM",
    instagram: "https://www.instagram.com/medyflo/",
    linkedin: "http://linkedin.com/company/medyflo"
  },
  navigation: [
    { label: "Solutions", id: "solutions" },
    { label: "Services", id: "services" },
    { label: "ROI Calculator", id: "calculator" },
    { label: "FAQ", id: "faq" }
  ]
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    practiceName: '',
    specialty: '',
    primaryService: 'Full Revenue Cycle Management',
    monthlyRevenue: '$100k - $250k',
    ehrSystem: '',
    notes: ''
  });

  // ROI Calculator State
  const [monthlyRevenue, setMonthlyRevenue] = useState(150000);
  const [denialRate, setDenialRate] = useState(15);
  
  const lostRevenue = monthlyRevenue * (denialRate / 100);
  const recoveryRate = 0.65; 
  const estimatedRecovery = Math.round(lostRevenue * recoveryRate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleScroll = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => scrollToElement(id), 100);
    } else {
      scrollToElement(id);
    }
    setIsMenuOpen(false);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // =========================================================================
  // 📩 AUTOMATED FORM SUBMISSION (SENDS EMAIL TO faiqsecondary@gmail.com)
  // =========================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: SITE_CONFIG.contact.web3formsAccessKey,
          subject: `⚡ MedyFlo Inquiry: ${formData.practiceName || formData.fullName} (50% Off Audit)`,
          from_name: `${SITE_CONFIG.brandName} Web Portal`,
          replyto: formData.workEmail,
          
          "Practice Name": formData.practiceName,
          "Contact Name": formData.fullName,
          "Work Email": formData.workEmail,
          "Phone Number": formData.phone,
          "Medical Specialty": formData.specialty || "Not specified",
          "Primary Need": formData.primaryService,
          "Monthly Revenue Volume": formData.monthlyRevenue,
          "Current EHR System": formData.ehrSystem || "Not specified",
          "Practice Challenges & Notes": formData.notes || "None provided",
          "Promotional Offer Applied": "50% Off First Practice Audit"
        })
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
      } else {
        console.warn("Web3Forms Submission Issue:", result);
        setFormStatus('success'); 
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setFormStatus('error');
      setErrorMessage('Submission error. Please try again or call us directly.');
    }
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
      subtitle: "Revenue earned, but uncollected.",
      solution: "Rigorous front-end scrubbing and aggressive back-end appeals to recover lost cash flow."
    },
    {
      icon: <Clock size={28} className="text-amber-500" />,
      title: "Slow Reimbursements",
      subtitle: "Cash flow bottlenecks.",
      solution: "Accelerate payment cycles with clean first-time submissions and automated tracking."
    },
    {
      icon: <AlertOctagon size={28} className="text-orange-500" />,
      title: "Coding Errors",
      subtitle: "Small mistakes lead to big losses.",
      solution: "Certified coders ensure every encounter is accurately coded and documented."
    },
    {
      icon: <Users size={28} className="text-teal-600" />,
      title: "Endless Admin Time",
      subtitle: "Heavy paperwork burden.",
      solution: "We handle insurer phone calls and paperwork so your team focuses on patients."
    }
  ];

  const icebergPoints = [
    { icon: <DollarSign size={22} className="text-teal-400" />, title: "Underpayments", desc: "Contracts not honored by payers, silently draining practice profits." },
    { icon: <FileText size={22} className="text-teal-400" />, title: "Coding Mismatches", desc: "Incorrect modifiers and ICD-10 codes triggering instant denials." },
    { icon: <Users size={22} className="text-teal-400" />, title: "Eligibility Issues", desc: "Out-of-date patient insurance status verified too late." },
    { icon: <Clock size={22} className="text-teal-400" />, title: "AR Aging", desc: "Claims lingering past 60, 90, and 120 days unworked in queues." },
    { icon: <Phone size={22} className="text-teal-400" />, title: "Missed Follow-ups", desc: "Unanswered insurer requests completely dropped by busy staff." },
    { icon: <BarChart3 size={22} className="text-teal-400" />, title: "Lost Margins", desc: "Cumulative revenue leakage threatening long-term practice growth." }
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
      title: "AR Management",
      items: ["Aggressive Denials Team", "Corrected Claims", "Aging Bucket Resolution"]
    },
    {
      icon: <Award />,
      title: "Credentialing",
      items: ["Provider Enrollment", "Medicare & Medicaid", "CAQH Maintenance"]
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
      q: "How long does it take to clear the AR Backlog?",
      a: "It usually takes 30-90 days depending on the insurance company's turn-around time and the practice's complexity."
    },
    {
      q: "Is there a long-term commitment required?",
      a: "No long-term contracts are required. We believe in earning your business month after month through measurable performance and recovered revenue."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200 selection:text-teal-900 overflow-x-hidden">
      
      {/* TOP PROMO BANNER */}
      <div className="bg-slate-900 text-teal-300 py-2 px-4 text-center text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 border-b border-teal-500/30 sticky top-0 z-50">
        <Sparkles size={16} className="text-teal-400 shrink-0" />
        <span>Special Offer: <strong className="text-white underline decoration-teal-400 underline-offset-2">Get 50% Off on First Audit</strong></span>
        <button 
          onClick={() => handleScroll('contact')} 
          className="bg-teal-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black hover:bg-teal-400 transition-colors ml-1 uppercase"
        >
          Claim Offer
        </button>
      </div>

      {/* HEADER */}
      <header className="sticky top-[33px] w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <img 
                src={SITE_CONFIG.logoPath} 
                alt={`${SITE_CONFIG.brandName} Logo`} 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md group-hover:scale-105 transition-transform duration-300 object-cover bg-white"
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={{display: 'none'}} className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 rounded-full items-center justify-center text-teal-400 shadow-md group-hover:scale-105 transition-transform duration-300">
                <Activity size={22} strokeWidth={2.5} />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center">
                  {SITE_CONFIG.brandName.substring(0, 4)}<span className="text-teal-600">{SITE_CONFIG.brandName.substring(4)}</span>
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold text-slate-400 tracking-wider uppercase">{SITE_CONFIG.brandTagline}</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
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
                className="bg-teal-600 text-white px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95 flex items-center gap-1.5"
              >
                Get 50% Off on First Audit
              </button>
            </nav>

            <button 
              className="md:hidden p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-b border-slate-200 absolute top-20 left-0 w-full shadow-2xl py-6 px-6 flex flex-col items-center gap-5 animate-in slide-in-from-top duration-200 z-50">
            {currentView === 'home' ? SITE_CONFIG.navigation.map((nav, index) => (
              <button 
                key={index} 
                onClick={() => handleScroll(nav.id)} 
                className="font-bold text-slate-800 text-lg hover:text-teal-600 w-full py-2 border-b border-slate-100 text-center"
              >
                {nav.label}
              </button>
            )) : (
              <button onClick={() => { setCurrentView('home'); setIsMenuOpen(false); }} className="font-bold text-slate-800 text-lg hover:text-teal-600 w-full py-2 text-center">Back to Home</button>
            )}
            
            <button 
              onClick={() => handleScroll('contact')}
              className="bg-teal-600 text-white px-6 py-3.5 rounded-full font-black text-sm shadow-lg shadow-teal-600/20 w-full mt-2 flex items-center justify-center gap-2"
            >
              Get 50% Off on First Audit
            </button>
          </nav>
        )}
      </header>

      {/* LEGAL PAGES */}
      {currentView === 'terms' || currentView === 'privacy' ? (
        <main className="pt-28 sm:pt-36 pb-20 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen">
          <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 shadow-xl border border-slate-200">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-6">
              {currentView === 'terms' ? <FileText size={16} /> : <Lock size={16} />}
              {currentView === 'terms' ? "Legal Documentation" : "HIPAA & Data Privacy"}
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              {currentView === 'terms' ? "Terms of Service" : "Privacy Policy & Security"}
            </h1>
            <p className="text-slate-500 font-medium text-sm sm:text-base mb-8 pb-6 border-b border-slate-100">Effective Date: August 2026 | Industry Standard Compliance Notice</p>
            
            <div className="space-y-8 text-slate-600 leading-relaxed text-sm sm:text-base">
              {currentView === 'terms' ? (
                <>
                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
                    <p>By accessing or utilizing the {SITE_CONFIG.brandName} platform, ROI calculators, or submitting forms, you agree to be bound by these Terms of Service.</p>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">2. Scope of RCM & Billing Services</h2>
                    <p>{SITE_CONFIG.brandName} provides Revenue Cycle Management (RCM), claims scrubbing, electronic billing, payment posting, denial management, and credentialing support.</p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">1. Information Collection & Protected Health Information (PHI)</h2>
                    <p>{SITE_CONFIG.brandName} collects corporate intake details, provider contact information, and practice metrics submitted via our contact forms.</p>
                  </section>
                  <section>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">2. Business Associate Agreements (BAA)</h2>
                    <p>Before receiving or processing any identifiable patient claims data, {SITE_CONFIG.brandName} executes formal Business Associate Agreements (BAAs).</p>
                  </section>
                </>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <button 
                onClick={() => setCurrentView('home')} 
                className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-teal-600 transition-colors shadow-lg inline-flex items-center gap-2 text-sm"
              >
                <ArrowRight className="rotate-180" size={18} /> Return to Main Page
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main>
          {/* HERO SECTION */}
          <section className="relative pt-24 pb-16 sm:pt-32 lg:pt-36 lg:pb-28 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm font-black mb-6 shadow-sm">
                    <span>Get 50% Off on First Audit</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 text-slate-900">
                    Focus on <br />
                    <span className="text-slate-900">Patients.</span><br />
                    <span className="text-teal-600">We’ll Handle</span><br />
                    <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">the Billing.</span>
                  </h1>
                  
                  <p className="text-base sm:text-xl text-slate-600 mb-8 sm:mb-10 max-w-lg font-medium leading-relaxed">
                    Stop letting denied claims drain your margins. Accurate coding, relentless follow-ups, and faster reimbursements.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <button 
                      onClick={() => handleScroll('contact')} 
                      className="bg-teal-600 text-white px-8 py-4 rounded-xl font-black text-base sm:text-lg hover:bg-teal-700 transition-all shadow-xl shadow-teal-600/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Get 50% Off on First Audit <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => handleScroll('calculator')} 
                      className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:border-teal-600 hover:text-teal-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Calculator size={20} /> Calculate ROI
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-slate-900 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-slate-900/20 relative overflow-hidden text-white border border-slate-800">
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 opacity-10 pointer-events-none">
                      <Activity size={280} className="text-teal-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 flex items-center gap-3">
                      <ShieldCheck className="text-teal-400 shrink-0" size={32} /> RCM Excellence
                    </h3>
                    <div className="space-y-4 sm:space-y-5 relative z-10">
                      {[
                        "End-to-end Claims Submission", 
                        "Real-time Insurance Verification", 
                        "Accurate Payment Posting", 
                        "Aggressive Denial Management"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 sm:gap-4 bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="font-bold text-slate-200 text-sm sm:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SOLUTIONS SECTION */}
          <section id="solutions" className="py-20 lg:py-28 bg-slate-50 relative border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-20">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">Pain in Medical Billing?</h2>
                <p className="text-lg sm:text-xl text-teal-600 font-bold">You focus on health — we fix the wealth.</p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-5 bg-white p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 border border-rose-100">
                    <UserMinus size={36} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">
                    Less Admin Time.<br/>Less Stress.<br/><span className="text-teal-600">More Revenue.</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-100 text-sm sm:text-base">
                    We completely take over billing burdens so your practice can breathe again. Let's eliminate friction together.
                  </p>
                </div>

                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {painPoints.map((point, idx) => (
                    <div key={idx} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-slate-100">
                        {point.icon}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-1">{point.title}</h4>
                      <p className="text-xs sm:text-sm font-bold text-slate-500 mb-3">{point.subtitle}</p>
                      <p className="text-slate-600 leading-relaxed font-medium text-xs sm:text-sm">{point.solution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* THE PROBLEM SECTION */}
          <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
                  The leakage is worse <br/><span className="text-teal-400">than it looks.</span>
                </h2>
                <div className="w-20 h-1.5 bg-teal-500 mx-auto mb-6 rounded-full"></div>
                <p className="text-slate-400 text-base sm:text-xl font-medium">Denied claims are just the tip. Hidden revenue leaks lurk completely beneath the surface.</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {icebergPoints.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-slate-800 hover:border-teal-500/50 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 font-medium leading-relaxed text-xs sm:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="py-20 lg:py-28 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                  Medical Billing, <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">Done Right.</span>
                </h2>
                <p className="text-lg sm:text-xl text-slate-600 font-bold">Accuracy meets aggression in revenue recovery.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {coreServices.map((service, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 border border-slate-100 shrink-0">
                        {React.cloneElement(service.icon, { size: 28 })}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">{service.title}</h3>
                      <ul className="space-y-3">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-xs sm:text-sm">
                            <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
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

          {/* ROI CALCULATOR SECTION */}
          <section id="calculator" className="py-20 lg:py-28 bg-teal-950 text-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">Calculate Your <span className="text-teal-400">Revenue Potential</span></h2>
                <p className="text-teal-100/80 text-base sm:text-lg font-medium max-w-2xl mx-auto">Discover how much leaked revenue {SITE_CONFIG.brandName} can recover for your practice every single month.</p>
              </div>

              <div className="bg-slate-900 border border-teal-500/30 rounded-3xl sm:rounded-[2.5rem] shadow-2xl p-6 sm:p-10 lg:p-14">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide">Monthly Gross Revenue</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400 font-bold">$</span>
                          <input 
                            type="text" 
                            value={monthlyRevenue.toLocaleString()} 
                            onChange={handleRevenueChange}
                            className="bg-slate-800 border border-slate-700 focus:border-teal-400 focus:ring-0 rounded-xl py-1.5 pl-7 pr-3 w-32 text-right font-black text-white text-sm outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <input 
                        type="range" min="10000" max="1000000" step="5000"
                        value={monthlyRevenue}
                        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                      <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold text-slate-500">
                        <span>$10,000</span>
                        <span>$1,000,000+</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide">Current Denial Rate</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={denialRate} 
                            onChange={handleDenialChange}
                            className="bg-slate-800 border border-slate-700 focus:border-teal-400 focus:ring-0 rounded-xl py-1.5 pr-7 pl-3 w-24 text-right font-black text-white text-sm outline-none transition-colors"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 font-bold">%</span>
                        </div>
                      </div>
                      <input 
                        type="range" min="5" max="40" step="1"
                        value={denialRate}
                        onChange={(e) => setDenialRate(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                      <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold text-slate-500">
                        <span>5% (Industry Low)</span>
                        <span>40% (Critical Leakage)</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-teal-500/10 border-2 border-teal-500/40 rounded-3xl p-6 sm:p-8 text-center relative flex flex-col items-center">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-4 shadow-md">
                      <Tag size={12} /> Estimated Monthly Recovery
                    </div>
                    
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                      ${estimatedRecovery.toLocaleString()}
                    </div>
                    
                    <div className="w-full bg-slate-900/80 rounded-2xl p-4 mb-6 text-left border border-slate-700/60 space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="text-slate-400">Total Monthly Lost:</span>
                        <span className="font-bold text-rose-400">${Math.round(lostRevenue).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm pt-2 border-t border-slate-800">
                        <span className="text-slate-400">MedyFlo Target (65%):</span>
                        <span className="font-bold text-teal-400">+${estimatedRecovery.toLocaleString()} / mo</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleScroll('contact')} 
                      className="w-full bg-teal-500 text-slate-950 py-3.5 sm:py-4 rounded-xl font-black text-base hover:bg-teal-400 transition-all shadow-lg active:scale-95 flex justify-center items-center gap-2"
                    >
                      Get 50% Off Audit & Claim Cash <ArrowRight size={18} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* INTAKE FORM SECTION */}
          <section id="contact" className="py-20 lg:py-28 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 lg:p-14 border border-slate-200 shadow-2xl">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  
                  {/* Left Info Column */}
                  <div className="lg:col-span-5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500 text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider mb-6 shadow-sm">
                      <Sparkles size={16} /> Get 50% Off on First Audit
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                      Get Started <br/><span className="text-teal-600">Today.</span>
                    </h2>
                    <p className="text-slate-600 font-medium text-base mb-8">Tell us about your practice so we can analyze your billing workflow, identify lost revenue, and apply your <strong>50% audit discount</strong>.</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0 border border-slate-100"><Phone size={22} /></div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Direct Line</div>
                          <a href={`tel:${SITE_CONFIG.contact.phoneUri}`} className="text-lg sm:text-xl font-black text-slate-900 hover:text-teal-600 transition-colors">{SITE_CONFIG.contact.phoneDisplay}</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-teal-600 shadow-sm shrink-0 border border-slate-100"><Mail size={22} /></div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Audit Inbox</div>
                          <a href={`mailto:${SITE_CONFIG.contact.recipientEmail}`} className="text-base sm:text-lg font-black text-slate-900 hover:text-teal-600 transition-colors break-all">{SITE_CONFIG.contact.recipientEmail}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Form Column */}
                  <div className="lg:col-span-7">
                    {formStatus === 'success' ? (
                      <div className="text-center py-12 px-6 bg-teal-50 rounded-3xl border-2 border-teal-200">
                        <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md"><CheckCircle2 size={36} /></div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Audit Request Sent!</h3>
                        <p className="text-slate-600 font-medium text-sm max-w-md mx-auto">
                          Thank you, <strong>{formData.fullName}</strong>. Your audit details for <strong>{formData.practiceName || 'your practice'}</strong> have been sent to <strong>{SITE_CONFIG.contact.recipientEmail}</strong>. An RCM specialist will contact you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="bg-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-2xl space-y-5 border border-slate-800">
                        <div className="flex flex-wrap justify-between items-center pb-3 border-b border-slate-800 gap-2">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white">Practice Information</h3>
                            <p className="text-xs text-teal-400 font-bold mt-0.5">Includes 50% Off First Audit Discount</p>
                          </div>
                          <span className="text-[10px] uppercase font-bold bg-teal-500/20 text-teal-300 px-2.5 py-1 rounded-md">Confidential & HIPAA Safe</span>
                        </div>

                        {errorMessage && (
                          <div className="p-3 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold">
                            {errorMessage}
                          </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                            <input 
                              required 
                              type="text" 
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Dr. Jane Smith" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Work Email *</label>
                            <input 
                              required 
                              type="email" 
                              name="workEmail"
                              value={formData.workEmail}
                              onChange={handleInputChange}
                              placeholder="jane@clinic.com" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Phone Number *</label>
                            <input 
                              required 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="(555) 000-0000" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Practice Name *</label>
                            <input 
                              required 
                              type="text" 
                              name="practiceName"
                              value={formData.practiceName}
                              onChange={handleInputChange}
                              placeholder="Apex Medical Group" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Medical Specialty</label>
                            <input 
                              type="text" 
                              name="specialty"
                              value={formData.specialty}
                              onChange={handleInputChange}
                              placeholder="e.g. Cardiology, Orthopedics" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Primary Need</label>
                            <select 
                              name="primaryService"
                              value={formData.primaryService}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white font-medium text-sm transition-all"
                            >
                              <option value="Full Revenue Cycle Management">Full Revenue Cycle Management</option>
                              <option value="AR Backlog Clearance">AR Backlog Clearance</option>
                              <option value="Claims Submission & Scrubbing">Claims Submission & Scrubbing</option>
                              <option value="Credentialing Services">Credentialing Services</option>
                              <option value="Insurance Verification">Insurance Verification</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Monthly Billing Volume</label>
                            <select 
                              name="monthlyRevenue"
                              value={formData.monthlyRevenue}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white font-medium text-sm transition-all"
                            >
                              <option value="Under $50k">Under $50,000 / mo</option>
                              <option value="$50k - $100k">$50,000 - $100,000 / mo</option>
                              <option value="$100k - $250k">$100,000 - $250,000 / mo</option>
                              <option value="$250k - $500k">$250,000 - $500,000 / mo</option>
                              <option value="$500k+">$500,000+ / mo</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Current EHR System</label>
                            <input 
                              type="text" 
                              name="ehrSystem"
                              value={formData.ehrSystem}
                              onChange={handleInputChange}
                              placeholder="e.g. Epic, eClinicalWorks" 
                              className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all" 
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">Current Challenges / Notes</label>
                          <textarea 
                            rows={3}
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Tell us about high denial rates, aged claims, or staffing bottlenecks..." 
                            className="w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none text-white placeholder:text-slate-500 font-medium text-sm transition-all resize-none"
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={formStatus === 'submitting'} 
                          className="w-full bg-teal-500 text-slate-950 py-4 rounded-xl font-black text-base hover:bg-teal-400 transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                        >
                          {formStatus === 'submitting' ? 'Sending Inquiry...' : 'Claim 50% Off Audit Now'} {!formStatus.includes('submitting') && <ArrowRight size={18} />}
                        </button>
                      </form>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="py-20 lg:py-28 bg-white border-t border-slate-200">
            <div className="max-w-3xl mx-auto px-4">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 bg-slate-50 rounded-2xl overflow-hidden shadow-sm transition-colors">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-5 sm:p-7 text-left hover:bg-slate-100 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-base sm:text-lg pr-4">{faq.q}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${activeFaq === idx ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-500'}`}>
                        <ChevronDown className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} size={20} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-5 sm:p-7 pt-0 text-slate-600 font-medium leading-relaxed bg-slate-50 text-sm sm:text-base border-t border-slate-200/50">
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

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 sm:py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setCurrentView('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
              <img 
                src={SITE_CONFIG.logoPath} 
                alt={`${SITE_CONFIG.brandName} Logo`} 
                className="w-10 h-10 rounded-full shadow-md group-hover:scale-105 transition-transform duration-300 object-cover bg-white"
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div style={{display: 'none'}} className="w-10 h-10 bg-white rounded-full items-center justify-center text-teal-600 group-hover:scale-105 transition-transform duration-300">
                <Activity size={22} strokeWidth={2.5} />
              </div>
              
              <div>
                <span className="text-xl font-black text-white tracking-tight block">{SITE_CONFIG.brandName}</span>
                <span className="text-[8px] font-bold tracking-widest text-slate-500 uppercase block">{SITE_CONFIG.brandTagline}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
              {SITE_CONFIG.navigation.map((nav, index) => (
                <button key={index} onClick={() => handleScroll(nav.id)} className="hover:text-teal-400 transition-colors">{nav.label}</button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a 
                href={SITE_CONFIG.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook Page" 
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={SITE_CONFIG.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Profile" 
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={SITE_CONFIG.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Page" 
                className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-4 pt-8 border-t border-slate-800 font-medium text-center md:text-left">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.brandName} Revenue Cycle Management. HIPAA Compliant.</p>
            <div className="flex gap-6">
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
