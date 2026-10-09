import React, { useState } from 'react';
import { 
  GraduationCap, Globe2, ChevronDown, Bell, User, 
  ExternalLink, Check, ShieldAlert, Sparkles, BookOpen,
  BarChart3, Users, MessageSquare, Cpu, CreditCard, ShieldCheck
} from 'lucide-react';
import { UserRole, LanguageCode } from '../types/lms';
import { Translations, languageList } from '../translations';

interface NavbarProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  currentLang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  t: Translations;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onChangeRole,
  currentLang,
  onChangeLang,
  activeTab,
  onSelectTab,
  t,
  unreadCount = 2
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const selectedLangObj = languageList.find(l => l.code === currentLang) || languageList[0];

  const roleLabels: Record<UserRole, { label: string; desc: string; color: string }> = {
    learner: { label: t.learnerRole, desc: 'Student / Employee View', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    instructor: { label: t.instructorRole, desc: 'Course Creator & Grading', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    manager: { label: t.managerRole, desc: 'HR Compliance & Team Analytics', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    admin: { label: t.adminRole, desc: 'Full System, Billing & Security', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  };

  const navItems = [
    { id: 'courses', label: t.coursesNav, icon: BookOpen },
    { id: 'progress', label: t.progressNav, icon: BarChart3 },
    { id: 'admin', label: t.adminNav, icon: Users },
    { id: 'discussions', label: t.discussionsNav, icon: MessageSquare },
    { id: 'integrations', label: t.integrationsNav, icon: Cpu },
    { id: 'billing', label: t.billingNav, icon: CreditCard },
    { id: 'security', label: t.securityNav, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white select-none">
      {/* Top Utility Bar for Connected Exam Systems & Language */}
      <div className="bg-slate-950 px-4 sm:px-6 py-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between text-xs gap-3">
        
        {/* Connected Exam Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Certified Testing Hubs:
          </span>

          <a
            href="https://owlysat.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/80 hover:text-white transition-colors shrink-0"
          >
            <span>🦉</span>
            <span className="font-semibold">OwlySAT Exam</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </a>

          <a
            href="https://owlyielts.ai.studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sky-950/80 border border-sky-500/40 text-sky-300 hover:bg-sky-900/80 hover:text-white transition-colors shrink-0"
          >
            <span>🎯</span>
            <span className="font-semibold">OwlyIELTS Exam</span>
            <ExternalLink className="w-3 h-3 text-sky-400" />
          </a>
        </div>

        {/* Global Language & Persona Quick Controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setRoleMenuOpen(false);
                setNotifOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 text-xs font-medium transition-colors border border-slate-700/60"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedLangObj.flag} {selectedLangObj.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Global Workforce Locale
                </div>
                {languageList.map(item => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onChangeLang(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-700/70 transition-colors ${
                      currentLang === item.code ? 'text-indigo-400 font-bold bg-slate-700/40' : 'text-slate-300'
                    }`}
                  >
                    <span>{item.flag} {item.name}</span>
                    {currentLang === item.code && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleMenuOpen(!roleMenuOpen);
                setLangMenuOpen(false);
                setNotifOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors ${roleLabels[currentRole].color}`}
            >
              <span>Persona:</span>
              <span className="font-bold">{roleLabels[currentRole].label}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1.5 z-50">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
                  {t.roleSwitcher}
                </div>
                {(['learner', 'instructor', 'manager', 'admin'] as UserRole[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      onChangeRole(r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700 transition-colors ${
                      currentRole === r ? 'bg-indigo-600/20 text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{roleLabels[r].label}</div>
                      <div className="text-[11px] text-slate-400">{roleLabels[r].desc}</div>
                    </div>
                    {currentRole === r && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('courses')}>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white text-xl shadow-md">
              🦉
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-white">{t.appName}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm bg-slate-800 text-indigo-400 border border-slate-700">
                  Enterprise LMS
                </span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Learning & Compliance Engine
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Controls & Notifications */}
          <div className="flex items-center gap-3">
            {/* Notification Drawer */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setLangMenuOpen(false);
                  setRoleMenuOpen(false);
                }}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Notifications & HRIS Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">System Notifications</span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-sm font-semibold">2 New</span>
                  </div>

                  <div className="space-y-3 mt-3">
                    <div className="text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                      <div className="font-semibold text-white">Workday Sync Complete</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">12 new onboarding seats provisioned automatically.</div>
                      <div className="text-[10px] text-slate-500 mt-1">10 mins ago</div>
                    </div>

                    <div className="text-xs bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/60">
                      <div className="font-semibold text-amber-400">SOC2 Compliance Due Soon</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Annual recertification deadline is approaching in 36 days.</div>
                      <div className="text-[10px] text-slate-500 mt-1">2 hours ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Elena Rostova"
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-white line-clamp-1">Elena Rostova</div>
                <div className="text-[10px] text-slate-400">Acme Global</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-slate-950 border-t border-slate-800/80 overflow-x-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition-colors ${
                isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
