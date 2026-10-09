import React, { useState } from 'react';
import { UserRole, LanguageCode, Course } from './types/lms';
import { translations, languageList } from './translations';
import { initialCourses, initialCurrentUser } from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { CoursesView } from './components/CoursesView';
import { CoursePlayerModal } from './components/CoursePlayerModal';
import { CertificateModal } from './components/CertificateModal';
import { ProgressTrackingView } from './components/ProgressTrackingView';
import { AdministrationView } from './components/AdministrationView';
import { CommunicationView } from './components/CommunicationView';
import { IntegrationsView } from './components/IntegrationsView';
import { BillingView } from './components/BillingView';
import { SecurityAuditView } from './components/SecurityAuditView';
import { ExternalLink, ShieldCheck, Globe, Heart, Award } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('learner');
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);

  // Active playing course modal
  const [playingCourse, setPlayingCourse] = useState<Course | null>(null);

  // Active certificate modal
  const [viewingCertificateCourse, setViewingCertificateCourse] = useState<Course | null>(null);

  const t = translations[currentLang] || translations.en;
  const isRtl = languageList.find(l => l.code === currentLang)?.dir === 'rtl';

  const handleEnrollCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: true, progress: 10 };
      }
      return c;
    }));
  };

  const handleUpdateCourseProgress = (courseId: string, progress: number, completedCount: number) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const isDone = progress === 100;
        return {
          ...c,
          progress,
          certificateEarned: isDone ? true : c.certificateEarned,
          certificateId: isDone ? (c.certificateId || `OWLY-CERT-${courseId.toUpperCase()}-7718`) : c.certificateId
        };
      }
      return c;
    }));
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col text-slate-900 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        t={t}
      />

      {/* Prominent Landing Hero & Connected Exam Ecosystem Banner (shown prominently on courses or toggleable) */}
      <LandingHero
        t={t}
        onExploreCourses={() => setActiveTab('courses')}
        activeLearnersCount={12450}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            onOpenPlayer={(course) => setPlayingCourse(course)}
            onEnroll={handleEnrollCourse}
            onViewCertificate={(course) => setViewingCertificateCourse(course)}
            t={t}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTrackingView
            courses={courses}
            currentUser={currentUser}
            onOpenPlayer={(course) => setPlayingCourse(course)}
            onViewCertificate={(course) => setViewingCertificateCourse(course)}
            t={t}
          />
        )}

        {activeTab === 'admin' && (
          <AdministrationView
            t={t}
            currentRole={currentRole}
            onSelectRole={setCurrentRole}
          />
        )}

        {activeTab === 'discussions' && (
          <CommunicationView
            currentUser={currentUser}
            currentRole={currentRole}
            t={t}
          />
        )}

        {activeTab === 'integrations' && (
          <IntegrationsView t={t} />
        )}

        {activeTab === 'billing' && (
          <BillingView t={t} />
        )}

        {activeTab === 'security' && (
          <SecurityAuditView t={t} />
        )}
      </main>

      {/* Course Player Fullscreen Modal */}
      {playingCourse && (
        <CoursePlayerModal
          course={playingCourse}
          studentName={currentUser.name}
          onClose={() => setPlayingCourse(null)}
          onUpdateProgress={handleUpdateCourseProgress}
        />
      )}

      {/* Certificate Viewer Modal */}
      {viewingCertificateCourse && (
        <CertificateModal
          courseTitle={viewingCertificateCourse.title}
          studentName={currentUser.name}
          issueDate="October 9, 2026"
          certificateId={viewingCertificateCourse.certificateId || `OWLY-CERT-${viewingCertificateCourse.id.toUpperCase()}-9941`}
          onClose={() => setViewingCertificateCourse(null)}
        />
      )}

      {/* Footer */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-black text-base">
                <span>🦉</span>
                <span>OwlyLMS Enterprise</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Centralized learning management, compliance tracking, and direct connectivity to international testing engines.
              </p>
              <div className="text-[11px] text-slate-500">
                SOC2 Type II Certified · ISO 27001 Compliant · SCIM 2.0
              </div>
            </div>

            {/* Col 2: Connected Exam Gateways */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Certified Exam Hubs</div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://owlysat.ai.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    <span>OwlySAT Exam Preparation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="text-[11px] text-slate-500">https://owlysat.ai.studio/</div>
                </li>
                <li className="pt-1">
                  <a
                    href="https://owlyielts.ai.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-medium"
                  >
                    <span>OwlyIELTS Exam Preparation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="text-[11px] text-slate-500">https://owlyielts.ai.studio/</div>
                </li>
              </ul>
            </div>

            {/* Col 3: Integrations & HRIS */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-white">HRIS & Connectors</div>
              <ul className="space-y-1.5 text-slate-400">
                <li>Workday Human Capital Management</li>
                <li>BambooHR Lifecycle Sync</li>
                <li>ADP Workforce Now Payroll</li>
                <li>SAP SuccessFactors Talent Suite</li>
              </ul>
            </div>

            {/* Col 4: Global Accessibility */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-white">Global Workforce</div>
              <div className="text-xs text-slate-400">
                Localized across 8 international languages: English, Español, Français, Deutsch, 日本語, العربية, 简体中文, and Português.
              </div>
              <div className="pt-2 text-slate-500 text-[11px]">
                Platform Status: All Systems Operational (99.99% SLA)
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; 2026 Owly Learning Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setActiveTab('security')} className="hover:text-slate-300">Security & Privacy Policy</button>
              <button onClick={() => setActiveTab('billing')} className="hover:text-slate-300">Billing Terms</button>
              <button onClick={() => setActiveTab('integrations')} className="hover:text-slate-300">API Documentation</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
