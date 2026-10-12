import { useState, useEffect, useRef } from 'react';
import HeroImage from "./Gemini_Generated_Image_el0amkel0amkel0a.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | 'home'
  | 'get-started'
  | 'start-journey'
  | 'book-demo'
  | 'contact'
  | 'feature-tickets'
  | 'feature-ai'
  | 'feature-analytics';

// ─── Scroll helper ────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconTicket({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      <path d="M13 5v14M9 9h1M9 15h1"/>
    </svg>
  );
}

function IconSparkles({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
      <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"/>
      <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"/>
    </svg>
  );
}

function IconChart({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  );
}

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function IconArrow({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function IconBack({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function IconPhone({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
    </svg>
  );
}

function IconMail({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function IconPin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function IconSuccess({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function LuminaLogo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <radialGradient id="lg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9370DB"/>
          <stop offset="100%" stopColor="#7C5AA6"/>
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="7" fill="url(#lg1)" opacity="0.18"/>
      <circle cx="16" cy="16" r="4" fill="#7C5AA6"/>
      <circle cx="16" cy="7" r="2.5" fill="#7C5AA6"/>
      <circle cx="7" cy="21" r="2" fill="#00A8A8"/>
      <circle cx="25" cy="21" r="2" fill="#9370DB" opacity="0.7"/>
      <line x1="16" y1="9.5" x2="16" y2="16" stroke="#7C5AA6" strokeWidth="1.4" opacity="0.7"/>
      <line x1="9.5" y1="19.5" x2="14.5" y2="16" stroke="#7C5AA6" strokeWidth="1.4" opacity="0.7"/>
      <line x1="22.5" y1="19.5" x2="17.5" y2="16" stroke="#7C5AA6" strokeWidth="1.4" opacity="0.7"/>
    </svg>
  );
}

// ─── Buttons ──────────────────────────────────────────────────────────────────

function BtnPrimary({ children, onClick, className = '', disabled = false, type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean; type?: 'button' | 'submit';
}) {
  return (
    <button type={type} className={`btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm ${className}`}
      onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function BtnSecondary({ children, onClick, className = '' }: {
  children: React.ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button className={`btn-secondary inline-flex items-center gap-2 px-6 py-2.5 text-sm ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
}

function BtnBack({ label = 'Back', onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 text-sm font-semibold border-0 bg-transparent p-0 cursor-pointer transition-colors"
      style={{ color: '#7C5AA6' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#6B4A94')}
      onMouseLeave={e => (e.currentTarget.style.color = '#7C5AA6')}>
      <IconBack size={14}/> {label}
    </button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onNav, scrolled }: { onNav: (s: Screen) => void; scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  const navItems: { label: string; action: () => void }[] = [
    { label: 'Home',       action: () => { onNav('home'); scrollTo('hero'); } },
    { label: 'Features',   action: () => { onNav('home'); setTimeout(() => scrollTo('features'), 50); } },
    { label: 'Solutions',  action: () => { onNav('home'); setTimeout(() => scrollTo('how'), 50); } },
    { label: 'About',      action: () => { onNav('home'); setTimeout(() => scrollTo('trust'), 50); } },
    { label: 'Contact Us', action: () => onNav('contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.96)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #EEE6F7',
        boxShadow: scrolled ? '0 2px 20px rgba(124,90,166,0.08)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button className="flex items-center gap-2.5 border-0 bg-transparent p-0 cursor-pointer"
          onClick={() => { onNav('home'); scrollTo('hero'); }}>
          <LuminaLogo size={30}/>
          <span className="font-bold text-[#2C1B41] text-[1.05rem]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Lumina <span style={{ color: '#7C5AA6' }}>Support</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map(item => (
            <button key={item.label}
              className="nav-link bg-transparent border-0 p-0 cursor-pointer"
              onClick={() => { item.action(); setOpen(false); }}>
              {item.label}
            </button>
          ))}
        </div>

        <BtnPrimary className="hidden md:inline-flex" onClick={() => onNav('get-started')}>
          Get Started
        </BtnPrimary>

        <button className="md:hidden text-[#2C1B41]" onClick={() => setOpen(!open)}>
          {open ? <IconClose/> : <IconMenu/>}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-1"
          style={{ borderTop: '1px solid #EEE6F7', background: '#fff' }}>
          {navItems.map(item => (
            <button key={item.label}
              className="text-left py-2.5 text-sm font-medium text-[#2C1B41] hover:text-[#7C5AA6] transition-colors border-0 bg-transparent cursor-pointer"
              onClick={() => { item.action(); setOpen(false); }}>
              {item.label}
            </button>
          ))}
          <BtnPrimary className="mt-3 w-full justify-center"
            onClick={() => { onNav('get-started'); setOpen(false); }}>
            Get Started
          </BtnPrimary>
        </div>
      )}
    </nav>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-[480px] ml-auto select-none">
      <div className="absolute -inset-10 rounded-full opacity-30"
        style={{ background: 'radial-gradient(ellipse, #C4AEDC 0%, transparent 70%)' }}/>

      <div className="relative rounded-2xl overflow-hidden animate-float"
        style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 20px 60px rgba(124,90,166,0.15), 0 4px 16px rgba(124,90,166,0.08)' }}>

        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid #F0E9FA', background: '#FDFBFF' }}>
          <div className="flex items-center gap-2">
            <LuminaLogo size={18}/>
            <span className="text-xs font-semibold text-[#2C1B41]">Lumina Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#00A8A8] animate-pulse-soft"/>
            <span className="text-[10px] text-[#6B6372] font-medium">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { label: 'Open Tickets', value: '142', delta: '+12%', up: false },
            { label: 'Resolved Today', value: '38', delta: '+24%', up: true },
            { label: 'Avg. Response', value: '1.4h', delta: '−18%', up: true },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3" style={{ background: '#F5F0FA', border: '1px solid #E5D9F5' }}>
              <div className="text-[10px] text-[#6B6372] mb-1">{s.label}</div>
              <div className="text-lg font-bold text-[#2C1B41]" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
              <div className="text-[10px] mt-0.5 font-semibold" style={{ color: s.up ? '#00A8A8' : '#7C5AA6' }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div className="px-4 pb-3">
          <div className="text-[10px] text-[#6B6372] mb-2 font-medium">Ticket Volume — 7 days</div>
          <div className="flex items-end gap-1.5 h-16">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: i === 5 ? 'linear-gradient(180deg,#7C5AA6,#9370DB)' : 'rgba(196,174,220,0.35)' }}/>
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-[#6B6372] mt-1 opacity-70">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="text-[10px] text-[#6B6372] mb-2 font-medium">Recent Tickets</div>
          <div className="space-y-1.5">
            {[
              { id: '#1042', title: 'VPN connection failure', status: 'Open', color: '#E85C5C' },
              { id: '#1041', title: 'Email sync not working', status: 'In Progress', color: '#F0A830' },
              { id: '#1040', title: 'Printer setup request', status: 'Resolved', color: '#00A8A8' },
            ].map(t => (
              <div key={t.id} className="flex items-center justify-between rounded-lg px-3 py-2"
                style={{ background: '#FAFAFA', border: '1px solid #F0E9FA' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#6B6372] w-9 shrink-0">{t.id}</span>
                  <span className="text-[10px] text-[#2C1B41]">{t.title}</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0"
                  style={{ background: `${t.color}18`, color: t.color }}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -left-8 top-1/3 w-48 rounded-xl p-3"
        style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 8px 24px rgba(124,90,166,0.12)' }}>
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,168,168,0.1)', color: '#00A8A8' }}>
            <IconSparkles size={14}/>
          </div>
          <span className="text-[10px] font-semibold text-[#00A8A8]">AI Suggestion</span>
        </div>
        <p className="text-[10px] text-[#6B6372] leading-relaxed">
          "Matches 3 past tickets — recommend escalating to network team."
        </p>
      </div>

      <div className="absolute -right-4 bottom-12 w-44 rounded-xl px-3 py-2.5"
        style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 8px 20px rgba(124,90,166,0.1)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00A8A8] shrink-0"/>
          <span className="text-[10px] text-[#2C1B41]">Ticket #1040 resolved in <strong>48 min</strong></span>
        </div>
      </div>
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────

function PageWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: 'instant' }); }, []);
  return (
    <div ref={ref} className="min-h-screen pt-24 pb-20" style={{ background: '#fff' }}>
      {children}
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────

function Label({ children, teal = false }: { children: React.ReactNode; teal?: boolean }) {
  return (
    <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-5"
      style={teal
        ? { background: 'rgba(0,168,168,0.1)', color: '#00A8A8' }
        : { background: '#EEE6F7', color: '#7C5AA6' }}>
      {children}
    </span>
  );
}

// ─── Feature check item ────────────────────────────────────────────────────────

function FeatureCheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
        style={{ background: 'rgba(0,168,168,0.12)', color: '#00A8A8' }}>
        <IconCheck size={13}/>
      </div>
      <span className="text-[#2C1B41] text-sm leading-relaxed">{text}</span>
    </div>
  );
}

// ─── Input / Textarea / Select ────────────────────────────────────────────────

function Input({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#2C1B41]">{label}</label>
      <input type={type} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm text-[#2C1B41] outline-none transition-all"
        style={{ border: '1.5px solid #E5D9F5', background: '#FDFBFF' }}
        onFocus={e => (e.target.style.borderColor = '#7C5AA6')}
        onBlur={e => (e.target.style.borderColor = '#E5D9F5')}/>
    </div>
  );
}

function Textarea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#2C1B41]">{label}</label>
      <textarea rows={4} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-xl text-sm text-[#2C1B41] outline-none resize-none transition-all"
        style={{ border: '1.5px solid #E5D9F5', background: '#FDFBFF' }}
        onFocus={e => (e.target.style.borderColor = '#7C5AA6')}
        onBlur={e => (e.target.style.borderColor = '#E5D9F5')}/>
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#2C1B41]">{label}</label>
      <select
        className="w-full px-4 py-2.5 rounded-xl text-sm text-[#2C1B41] outline-none transition-all appearance-none"
        style={{ border: '1.5px solid #E5D9F5', background: '#FDFBFF' }}
        onFocus={e => (e.target.style.borderColor = '#7C5AA6')}
        onBlur={e => (e.target.style.borderColor = '#E5D9F5')}>
        <option value="">Select an option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Confirmation card ────────────────────────────────────────────────────────

function ConfirmationCard({ heading, body, onHome }: { heading: string; body: string; onHome: () => void }) {
  return (
    <div className="text-center max-w-md mx-auto py-12">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'rgba(0,168,168,0.1)', color: '#00A8A8' }}>
        <IconSuccess size={40}/>
      </div>
      <h2 className="text-2xl font-bold text-[#2C1B41] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{heading}</h2>
      <p className="text-[#6B6372] leading-relaxed mb-8">{body}</p>
      <BtnSecondary onClick={onHome}><IconBack size={14}/> Back to Home</BtnSecondary>
    </div>
  );
}

// ─── SCREEN: Home ─────────────────────────────────────────────────────────────

function HomeScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <>
      {/* Hero */}
    <section 
  id="home" 
  style={{ 
    paddingTop: 90, 
    paddingBottom: 60, 
    position: 'relative', 
    overflow: 'hidden', 
    minHeight: '85vh', 
    display: 'flex', 
    alignItems: 'center',
    backgroundImage: `url(${HeroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-center">
    
    {/* Left Column Spacer (Leaves the lightbulb completely clear) */}
    <div className="hidden md:block" />

    {/* Right Column Web Content with a subtle glass overlay */}
    <div 
      className="animate-fade-up p-8 md:p-10 rounded-3xl"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div 
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6"
        style={{ background: 'rgba(124, 90, 166, 0.1)', border: '1px solid rgba(124, 90, 166, 0.25)' }}
      >
        <div className="w-2 h-2 rounded-full bg-[#7C5AA6]"/>
        <span className="text-xs font-semibold text-[#7C5AA6]">AI-Powered IT Support Platform</span>
      </div>

      <h1 
        className="text-4xl md:text-[3.2rem] font-black leading-[1.08] mb-5 uppercase tracking-tight"
        style={{ fontFamily: 'Poppins, sans-serif', color: '#2C1B41' }}
      >
        BRINGING <span style={{ color: '#00A8A8' }}>CLARITY</span><br/>
        TO COMPLEX TECH
      </h1>

      <p className="text-[1.02rem] text-[#4A4054] leading-relaxed mb-8 font-medium">
        Lumina Systems simplifies IT support, intelligent triage, and helpdesk ticket automation into one elegant workflow — so your team can focus on what actually matters.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <BtnPrimary className="px-7 py-3 text-base" onClick={() => onNav('get-started')}>
          Get Started <IconArrow/>
        </BtnPrimary>
        <BtnSecondary className="px-7 py-3 text-base" onClick={() => scrollTo('features')}>
          Explore Features
        </BtnSecondary>
      </div>

      {/* Metrics Row */}
      <div className="flex flex-wrap gap-8 pt-6" style={{ borderTop: '1px solid rgba(124, 90, 166, 0.2)' }}>
        {[
          { value: '4,200+', label: 'Teams Onboarded', color: '#7C5AA6' },
          { value: '60%', label: 'Faster Resolution', color: '#00A8A8' },
          { value: '98%', label: 'CSAT Score', color: '#10B981' },
        ].map(s => (
          <div key={s.label}>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs font-medium text-[#6B6372] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
      {/* Trust bar */}
     <section id="trust" className="py-8" style={{ background: '#0F172A', borderTop: '1px solid #1E293B', borderBottom: '1px solid #1E293B' }}>
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      {[
        'Faster support workflows, fewer bottlenecks',
        'All customer requests organized in one place',
        'Data-driven insights to continuously improve',
      ].map((text, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#06B6D4' }} />
          <span className="text-sm font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {text}
          </span>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Features */}
      <section id="features" className="py-28" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Label>Features</Label>
            <h2 className="text-4xl md:text-[2.6rem] font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Everything Your Support Team Needs
            </h2>
            <p className="text-[#6B6372] text-lg max-w-xl mx-auto">
              Purpose-built tools that fit how modern IT teams actually work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <IconTicket size={22}/>, accent: '#7C5AA6', bg: '#EEE6F7',
                title: 'Smart Ticket Management',
                desc: 'Organize, prioritize, and track support requests in one unified place. Custom queues, SLA tracking, and automated routing keep your team moving.',
                screen: 'feature-tickets' as Screen,
              },
              {
                icon: <IconSparkles size={22}/>, accent: '#00A8A8', bg: 'rgba(0,168,168,0.08)',
                title: 'AI-Powered Assistance',
                desc: 'Help support teams respond efficiently with intelligent assistance. Surface relevant solutions, draft responses, and identify recurring issues automatically.',
                screen: 'feature-ai' as Screen,
              },
              {
                icon: <IconChart size={22}/>, accent: '#7C5AA6', bg: '#EEE6F7',
                title: 'Support Analytics',
                desc: 'Understand support performance through clear, actionable insights. Track resolution times, team workloads, and customer satisfaction over time.',
                screen: 'feature-analytics' as Screen,
              },
            ].map((f, i) => (
              <div key={i} className="card-hover rounded-2xl p-7 flex flex-col"
                style={{ background: '#fff', border: '1px solid #EEE6F7', boxShadow: '0 2px 12px rgba(124,90,166,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: f.bg, color: f.accent }}>
                  {f.icon}
                </div>
                <h3 className="text-[1.05rem] font-bold text-[#2C1B41] mb-2.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{f.title}</h3>
                <p className="text-[#6B6372] text-sm leading-relaxed flex-1">{f.desc}</p>
                <button
                  className="mt-5 flex items-center gap-1.5 text-sm font-semibold border-0 bg-transparent p-0 cursor-pointer transition-all"
                  style={{ color: f.accent }}
                  onClick={() => onNav(f.screen)}
                  onMouseEnter={e => { e.currentTarget.style.gap = '8px'; }}
                  onMouseLeave={e => { e.currentTarget.style.gap = '6px'; }}>
                  Learn more <IconArrow size={13}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-28" style={{ background: '#F5F0FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Label teal>How It Works</Label>
            <h2 className="text-4xl md:text-[2.6rem] font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Simple. Fast. Effective.
            </h2>
            <p className="text-[#6B6372] text-lg max-w-lg mx-auto">From first contact to resolution in three clear steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              { n: '01', icon: <IconTicket size={20}/>, title: 'Submit a Request', desc: 'Users submit support tickets through a clean, intuitive portal — via email, chat, or web form.' },
              { n: '02', icon: <IconSparkles size={20}/>, title: 'Resolve Efficiently', desc: 'Your team receives smart routing, AI suggestions, and context to solve issues fast.' },
              { n: '03', icon: <IconChart size={20}/>, title: 'Monitor Performance', desc: 'Track resolution metrics, identify patterns, and continuously improve support quality.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+44px)] w-[calc(100%-88px)] h-px"
                    style={{ background: 'linear-gradient(90deg, #D4BEF0, #B2DFDF)' }}/>
                )}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 mb-5"
                    style={{ borderColor: '#D4BEF0', background: '#fff' }}>
                    <span className="text-base font-bold text-[#7C5AA6]" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.n}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#EEE6F7', color: '#7C5AA6' }}>
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2C1B41] mb-2.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.title}</h3>
                  <p className="text-[#6B6372] text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-28" style={{ background: '#fff' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative rounded-3xl px-10 py-16 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F5F0FA 0%, #EEE6F7 60%, #E8D8F8 100%)', border: '1px solid #D4BEF0' }}>
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full opacity-20" style={{ background: '#7C5AA6', filter: 'blur(40px)' }}/>
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full opacity-15" style={{ background: '#00A8A8', filter: 'blur(40px)' }}/>

            <div className="relative">
              <Label>Get Started Today</Label>
              <h2 className="text-4xl md:text-[2.6rem] font-bold text-[#2C1B41] mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Ready to Transform Your<br/>Support Experience?
              </h2>
              <p className="text-[#6B6372] text-[1.05rem] mb-10 max-w-md mx-auto">
                Discover a simpler way to manage IT support. Join teams already delivering faster, smarter service.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <BtnPrimary className="px-8 py-3.5 text-base" onClick={() => onNav('start-journey')}>
                  Start Your Journey <IconArrow/>
                </BtnPrimary>
                <BtnSecondary className="px-8 py-3.5 text-base" onClick={() => onNav('book-demo')}>
                  Book a Demo
                </BtnSecondary>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#FAFAFA', borderTop: '1px solid #EEE6F7' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <LuminaLogo size={26}/>
                <span className="font-bold text-[#2C1B41]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Lumina <span style={{ color: '#7C5AA6' }}>Support</span>
                </span>
              </div>
              <p className="text-sm text-[#6B6372] leading-relaxed max-w-[220px]">
                Modern IT support platform helping teams deliver faster, smarter service.
              </p>
            </div>
            {[
              { heading: 'Features', links: [{ label: 'Ticket Management', screen: 'feature-tickets' as Screen }, { label: 'AI Assistance', screen: 'feature-ai' as Screen }, { label: 'Analytics', screen: 'feature-analytics' as Screen }] },
              { heading: 'Solutions', links: [{ label: 'IT Teams', screen: 'home' as Screen }, { label: 'Enterprise', screen: 'home' as Screen }, { label: 'Startups', screen: 'home' as Screen }] },
              { heading: 'Company', links: [{ label: 'About', screen: 'home' as Screen }, { label: 'Contact Us', screen: 'contact' as Screen }, { label: 'Get Started', screen: 'get-started' as Screen }] },
            ].map(col => (
              <div key={col.heading}>
                <div className="text-sm font-semibold text-[#2C1B41] mb-4">{col.heading}</div>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <button className="text-sm text-[#6B6372] hover:text-[#7C5AA6] transition-colors border-0 bg-transparent p-0 cursor-pointer"
                        onClick={() => onNav(link.screen)}>
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #EEE6F7' }}>
            <span className="text-sm text-[#6B6372]">© 2026 Lumina Support. All rights reserved.</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00A8A8]"/>
              <span className="text-sm text-[#6B6372]">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ─── SCREEN: Get Started ──────────────────────────────────────────────────────

function GetStartedScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6"><BtnBack label="Back to Home" onClick={() => onNav('home')}/></div>

        <div className="text-center mb-14">
          <Label>Get Started</Label>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Get Started Today
          </h1>
          <p className="text-xl font-semibold text-[#2C1B41] mb-3">Ready to Transform Your Support Experience?</p>
          <p className="text-[#6B6372] text-lg max-w-xl mx-auto">
            Discover a simpler way to manage IT support. Join teams already delivering faster, smarter service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Start Your Journey card */}
          <div className="rounded-2xl p-8 flex flex-col text-center card-hover"
            style={{ background: 'linear-gradient(135deg,#F5F0FA,#EEE6F7)', border: '1px solid #D4BEF0' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: '#7C5AA6', color: '#fff' }}>
              <IconArrow size={22}/>
            </div>
            <h2 className="text-xl font-bold text-[#2C1B41] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Start Your Journey</h2>
            <p className="text-[#6B6372] text-sm leading-relaxed mb-6 flex-1">
              Set up your support workspace in minutes and start delivering better IT support today.
            </p>
            <BtnPrimary className="w-full justify-center py-3" onClick={() => onNav('start-journey')}>
              Start Your Journey <IconArrow/>
            </BtnPrimary>
          </div>

          {/* Book a Demo card */}
          <div className="rounded-2xl p-8 flex flex-col text-center card-hover"
            style={{ background: '#fff', border: '1px solid #D4BEF0', boxShadow: '0 4px 20px rgba(124,90,166,0.07)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(0,168,168,0.1)', color: '#00A8A8' }}>
              <IconSparkles size={22}/>
            </div>
            <h2 className="text-xl font-bold text-[#2C1B41] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Book a Demo</h2>
            <p className="text-[#6B6372] text-sm leading-relaxed mb-6 flex-1">
              See Lumina Support in action. Our team will walk you through the platform tailored to your needs.
            </p>
            <BtnSecondary className="w-full justify-center py-3" onClick={() => onNav('book-demo')}>
              Book a Demo
            </BtnSecondary>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─── SCREEN: Start Your Journey ───────────────────────────────────────────────

function StartJourneyScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const steps = [
    { n: '1', title: 'Set Up Your Workspace', desc: 'Configure your team, set support categories, and customize your portal in under 10 minutes.' },
    { n: '2', title: 'Organize Your Support', desc: 'Import existing tickets, set up queues, and define SLA rules that match your workflow.' },
    { n: '3', title: 'Start Helping Customers', desc: 'Go live with your support portal and start resolving requests with AI-powered assistance.' },
  ];

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-6"><BtnBack label="Back to Home" onClick={() => onNav('home')}/></div>

        <div className="text-center mb-14">
          <Label>Onboarding</Label>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Start Your Journey
          </h1>
          <p className="text-[#6B6372] text-lg max-w-2xl mx-auto">
            Set up your support workspace, organize your requests, and give your team the tools they need to deliver better support.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-5 mb-14">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-5 items-start rounded-2xl p-6"
              style={{ background: '#FDFBFF', border: '1px solid #EEE6F7' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg font-bold text-white"
                style={{ background: 'linear-gradient(135deg,#7C5AA6,#9370DB)', fontFamily: 'Poppins, sans-serif' }}>
                {s.n}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2C1B41] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.title}</h3>
                <p className="text-[#6B6372] text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="ml-auto shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: '#EEE6F7', color: '#7C5AA6' }}>
                <IconCheck size={14}/>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl p-10"
          style={{ background: 'linear-gradient(135deg,#F5F0FA,#EEE6F7)', border: '1px solid #D4BEF0' }}>
          <h2 className="text-2xl font-bold text-[#2C1B41] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Ready to begin?</h2>
          <p className="text-[#6B6372] mb-6">Your workspace is waiting. Most teams are up and running within the hour.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <BtnPrimary className="px-8 py-3 text-base" onClick={() => onNav('contact')}>
              Create Your Workspace <IconArrow/>
            </BtnPrimary>
            <BtnSecondary onClick={() => onNav('home')}>
              <IconBack size={14}/> Back to Home
            </BtnSecondary>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─── SCREEN: Book a Demo ──────────────────────────────────────────────────────

function BookDemoScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-6">
          <div className="mb-6"><BtnBack label="Back to Home" onClick={() => onNav('home')}/></div>
          <ConfirmationCard
            heading="Demo Request Received"
            body="Thank you! A Lumina Support representative will be in touch with you soon. Please note this is a prototype — no actual request has been sent."
            onHome={() => onNav('home')}/>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-6"><BtnBack label="Back to Get Started" onClick={() => onNav('get-started')}/></div>

        <div className="text-center mb-10">
          <Label teal>Book a Demo</Label>
          <h1 className="text-4xl font-bold text-[#2C1B41] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>See Lumina in Action</h1>
          <p className="text-[#6B6372]">Fill in your details and we'll set up a personalised walkthrough of the platform.</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #EEE6F7', boxShadow: '0 4px 24px rgba(124,90,166,0.08)' }}>
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            <Input label="Full Name" placeholder="Jane Smith"/>
            <Input label="Work Email" type="email" placeholder="jane@company.com"/>
            <Input label="Company Name" placeholder="Acme Corp"/>
            <Select label="Company Size" options={['1–10 employees','11–50 employees','51–200 employees','201–500 employees','500+ employees']}/>
          </div>
          <div className="mb-6">
            <Select label="What would you like to explore?" options={['Ticket Management','AI-Powered Assistance','Support Analytics','Full Platform Overview']}/>
          </div>

          <div className="text-xs text-[#6B6372] mb-6 p-3 rounded-xl" style={{ background: '#F5F0FA' }}>
            <strong>Prototype notice:</strong> This is a UI design prototype. Clicking "Request Demo" will show a confirmation screen only. No actual data is collected or transmitted.
          </div>

          <BtnPrimary className="w-full justify-center py-3 text-base" onClick={() => setSubmitted(true)}>
            Request Demo <IconArrow/>
          </BtnPrimary>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─── SCREEN: Contact ──────────────────────────────────────────────────────────

function ContactScreen({ onNav }: { onNav: (s: Screen) => void }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <PageWrapper>
        <div className="max-w-xl mx-auto px-6">
          <div className="mb-6"><BtnBack label="Back to Home" onClick={() => onNav('home')}/></div>
          <ConfirmationCard
            heading="Message Received"
            body="Thanks for reaching out. Our team will get back to you soon. Please note this is a prototype — no message has been sent."
            onHome={() => onNav('home')}/>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6"><BtnBack label="Back to Home" onClick={() => onNav('home')}/></div>

        <div className="text-center mb-14">
          <Label teal>Contact Us</Label>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Let's Talk
          </h1>
          <p className="text-[#6B6372] text-lg max-w-xl mx-auto">
            Have a question or need help choosing the right support solution? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact details */}
          <div>
            <h2 className="text-xl font-bold text-[#2C1B41] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Contact Lumina Support</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: <IconPhone/>, label: 'Phone', value: '+27 31 555 0184' },
                { icon: <IconMail/>, label: 'Email', value: 'hello@luminasupport.co.za' },
                { icon: <IconPin/>, label: 'Location', value: 'Durban, KwaZulu-Natal, South Africa' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#EEE6F7', color: '#7C5AA6' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#6B6372] uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-[#2C1B41] font-medium text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5" style={{ background: '#F5F0FA', border: '1px solid #EEE6F7' }}>
              <div className="text-xs font-semibold text-[#6B6372] uppercase tracking-wide mb-1">Office Hours</div>
              <div className="text-sm text-[#2C1B41] font-medium">Monday – Friday, 08:00–17:00 SAST</div>
              <div className="text-xs text-[#6B6372] mt-2 italic">All contact details are fictional and used for prototype purposes only.</div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #EEE6F7', boxShadow: '0 4px 24px rgba(124,90,166,0.08)' }}>
            <h2 className="text-lg font-bold text-[#2C1B41] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Send a Message</h2>
            <div className="space-y-4 mb-6">
              <Input label="Name" placeholder="Your full name"/>
              <Input label="Email" type="email" placeholder="your@email.com"/>
              <Textarea label="Message" placeholder="How can we help you?"/>
            </div>
            <div className="text-xs text-[#6B6372] mb-5 p-3 rounded-xl" style={{ background: '#F5F0FA' }}>
              <strong>Prototype notice:</strong> This form is for demonstration only. No data is collected or sent.
            </div>
            <BtnPrimary className="w-full justify-center py-3 text-base" onClick={() => setSubmitted(true)}>
              Send Message <IconArrow/>
            </BtnPrimary>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─── Mini ticket mockup ───────────────────────────────────────────────────────

function MiniTicketMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 8px 32px rgba(124,90,166,0.1)' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#FDFBFF', borderBottom: '1px solid #F0E9FA' }}>
        <div className="w-2 h-2 rounded-full bg-[#E85C5C]"/><div className="w-2 h-2 rounded-full bg-[#F0A830]"/><div className="w-2 h-2 rounded-full bg-[#00A8A8]"/>
        <span className="ml-2 text-xs font-semibold text-[#2C1B41]">Support Queue</span>
      </div>
      <div className="p-4 space-y-2">
        {[
          { id: '#2091', title: 'Outlook crashes on startup', priority: 'High', color: '#E85C5C', status: 'Open' },
          { id: '#2090', title: 'MFA token not arriving', priority: 'High', color: '#E85C5C', status: 'In Progress' },
          { id: '#2089', title: 'Slow internet in meeting room B', priority: 'Med', color: '#F0A830', status: 'Open' },
          { id: '#2088', title: 'New laptop setup — Naledi Dube', priority: 'Low', color: '#7C5AA6', status: 'Resolved' },
        ].map(t => (
          <div key={t.id} className="flex items-center justify-between rounded-lg px-3 py-2.5"
            style={{ background: '#F9F7FF', border: '1px solid #F0E9FA' }}>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-[#6B6372] w-10 shrink-0">{t.id}</span>
              <span className="text-xs text-[#2C1B41]">{t.title}</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0"
              style={{ background: `${t.color}15`, color: t.color }}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Mini AI mockup ───────────────────────────────────────────────────────────

function MiniAIMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 8px 32px rgba(124,90,166,0.1)' }}>
      <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#F0FDFD', borderBottom: '1px solid #B2DFDF' }}>
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,168,168,0.15)', color: '#00A8A8' }}>
          <IconSparkles size={14}/>
        </div>
        <span className="text-xs font-semibold text-[#007A7A]">AI Assistant — Active</span>
      </div>
      <div className="p-4 space-y-3">
        <div className="rounded-xl p-3 text-sm" style={{ background: '#F5F0FA', border: '1px solid #EEE6F7' }}>
          <div className="text-[10px] font-semibold text-[#6B6372] mb-1">Ticket #2091 — Outlook crashes on startup</div>
          <p className="text-xs text-[#2C1B41] leading-relaxed">This issue matches 6 previous tickets. Most were resolved by clearing the Outlook profile cache. Recommend trying <strong>Profile Reset</strong> first.</p>
        </div>
        <div className="rounded-xl p-3" style={{ background: '#F0FDFD', border: '1px solid #B2DFDF' }}>
          <div className="text-[10px] font-semibold text-[#00A8A8] mb-1.5">Suggested Response Draft</div>
          <p className="text-xs text-[#2C1B41] leading-relaxed">"Hi, thanks for reaching out. We've seen similar issues and can usually resolve this quickly. I'll start with a profile cache reset — I'll be with you in a moment."</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary text-[10px] px-3 py-1.5 rounded-lg">Use Draft</button>
          <button className="btn-secondary text-[10px] px-3 py-1.5 rounded-lg">Edit First</button>
        </div>
      </div>
    </div>
  );
}

// ─── Mini analytics mockup ────────────────────────────────────────────────────

function MiniAnalyticsMockup() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E5D9F5', boxShadow: '0 8px 32px rgba(124,90,166,0.1)' }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#FDFBFF', borderBottom: '1px solid #F0E9FA' }}>
        <span className="text-xs font-semibold text-[#2C1B41]">Support Analytics — September 2026</span>
        <span className="text-[10px] text-[#00A8A8] font-semibold">Live</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'Resolved', value: '312', color: '#00A8A8' },
            { label: 'Avg. Time', value: '1.8h', color: '#7C5AA6' },
            { label: 'CSAT', value: '94%', color: '#00A8A8' },
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: '#F5F0FA', border: '1px solid #EEE6F7' }}>
              <div className="text-base font-bold mb-0.5" style={{ color: s.color, fontFamily: 'Poppins, sans-serif' }}>{s.value}</div>
              <div className="text-[9px] text-[#6B6372]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="text-[10px] text-[#6B6372] mb-2 font-medium">Weekly Resolution Rate</div>
        <div className="flex items-end gap-1.5 h-14 mb-1">
          {[55, 72, 61, 85, 78, 90, 83].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm"
              style={{ height: `${h}%`, background: i === 5 ? 'linear-gradient(180deg,#7C5AA6,#9370DB)' : 'rgba(196,174,220,0.35)' }}/>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-[#6B6372] opacity-70">
          {['M','T','W','T','F','S','S'].map((d,i) => <span key={i}>{d}</span>)}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: Feature detail (shared shell) ────────────────────────────────────

function FeatureDetailScreen({ onNav, accent, teal, label, heading, description, checks, mockup }: {
  onNav: (s: Screen) => void;
  accent: string;
  teal: boolean;
  label: string;
  heading: string;
  description: string;
  checks: string[];
  mockup: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <BtnBack label="Back to Features" onClick={() => { onNav('home'); setTimeout(() => scrollTo('features'), 80); }}/>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full mb-6"
              style={teal ? { background: 'rgba(0,168,168,0.1)', color: '#00A8A8' } : { background: '#EEE6F7', color: '#7C5AA6' }}>
              {label}
            </span>
            <h1 className="text-4xl font-bold text-[#2C1B41] mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>{heading}</h1>
            <p className="text-[#6B6372] text-lg leading-relaxed mb-8">{description}</p>

            <div className="space-y-3.5 mb-10">
              {checks.map((c, i) => (
                <FeatureCheckItem key={i} text={c}/>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <BtnPrimary className="px-7 py-3 text-base" onClick={() => onNav('get-started')}>
                Get Started <IconArrow/>
              </BtnPrimary>
              <BtnSecondary onClick={() => onNav('book-demo')}>Book a Demo</BtnSecondary>
            </div>
          </div>

          {/* Right — mockup */}
          <div>{mockup}</div>
        </div>
      </div>
    </PageWrapper>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const onNav = (s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <Navbar onNav={onNav} scrolled={scrolled}/>

      {screen === 'home' && <HomeScreen onNav={onNav}/>}
      {screen === 'get-started' && <GetStartedScreen onNav={onNav}/>}
      {screen === 'start-journey' && <StartJourneyScreen onNav={onNav}/>}
      {screen === 'book-demo' && <BookDemoScreen onNav={onNav}/>}
      {screen === 'contact' && <ContactScreen onNav={onNav}/>}

      {screen === 'feature-tickets' && (
        <FeatureDetailScreen
          onNav={onNav} accent="#7C5AA6" teal={false}
          label="Smart Ticket Management"
          heading="Smart Ticket Management"
          description="Manage every support request from one organized workspace. Keep your team aligned, your customers informed, and your SLAs on track."
          checks={['Centralized ticket management','Priority and status tracking','SLA monitoring and alerting','Automated ticket routing','Custom support queues','Ticket history and activity tracking']}
          mockup={<MiniTicketMockup/>}/>
      )}
      {screen === 'feature-ai' && (
        <FeatureDetailScreen
          onNav={onNav} accent="#00A8A8" teal={true}
          label="AI-Powered Assistance"
          heading="AI-Powered Assistance"
          description="Give your support team intelligent tools that help them resolve requests faster. AI works alongside your team — not instead of them."
          checks={['Suggested solutions from past resolutions','AI-assisted response drafting','Knowledge base recommendations','Recurring issue detection','Intelligent request analysis','Faster agent workflows and reduced handle time']}
          mockup={<MiniAIMockup/>}/>
      )}
      {screen === 'feature-analytics' && (
        <FeatureDetailScreen
          onNav={onNav} accent="#7C5AA6" teal={false}
          label="Support Analytics"
          heading="Support Analytics"
          description="Turn support data into clear insights that help teams improve their service. Understand what's working and where to focus next."
          checks={['Resolution time tracking','Ticket volume monitoring','Team workload and capacity insights','Customer satisfaction (CSAT) tracking','SLA performance reporting','Support trends and predictive insights']}
          mockup={<MiniAnalyticsMockup/>}/>
      )}
    </div>
  );
}
