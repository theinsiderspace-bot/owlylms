import React from 'react';
import { Course, UserProfile } from '../types/lms';
import { 
  CheckCircle2, Clock, AlertTriangle, Award, ShieldCheck, 
  BarChart, Download, ExternalLink, FileCheck2, ArrowUpRight
} from 'lucide-react';
import { Translations } from '../translations';

interface ProgressTrackingViewProps {
  courses: Course[];
  currentUser: UserProfile;
  onOpenPlayer: (course: Course) => void;
  onViewCertificate: (course: Course) => void;
  t: Translations;
}

export const ProgressTrackingView: React.FC<ProgressTrackingViewProps> = ({
  courses,
  currentUser,
  onOpenPlayer,
  onViewCertificate,
  t
}) => {
  const enrolledCourses = courses.filter(c => c.enrolled);
  const completedCourses = courses.filter(c => c.progress === 100 || c.certificateEarned);
  const complianceCourses = courses.filter(c => c.isComplianceRequired);

  const averageProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  return (
    <div className="space-y-8">
      
      {/* Executive Learner Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Completion</div>
          <div className="text-3xl font-black text-slate-900 mt-2">{averageProgress}%</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${averageProgress}%` }} />
          </div>
          <div className="text-[11px] text-slate-500 mt-2">Across {enrolledCourses.length} active curricula</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Health</div>
          <div className="text-3xl font-black text-emerald-600 mt-2">100%</div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-3 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>All mandatory SOC2 modules on track</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Certificates</div>
          <div className="text-3xl font-black text-amber-600 mt-2">{completedCourses.length}</div>
          <div className="flex items-center gap-1 text-xs text-amber-700 mt-3 font-medium">
            <Award className="w-4 h-4" />
            <span>Digital seals issued & verifiable</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Exam Hub Connectivity</div>
          <div className="text-3xl font-black text-indigo-600 mt-2">2 Active</div>
          <div className="flex items-center gap-2 text-xs text-indigo-700 mt-3 font-semibold">
            <span>OwlySAT + OwlyIELTS</span>
          </div>
        </div>
      </div>

      {/* Mandatory Corporate Compliance Dashboard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-base">Annual Corporate Compliance & Regulatory Tracking</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Required by Acme Global audit committee under ISO 27001, SOC2 Type II, and EEOC compliance standards.
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            Audit Compliant
          </span>
        </div>

        <div className="divide-y divide-slate-100 mt-4">
          {complianceCourses.map(course => (
            <div key={course.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{course.title}</span>
                  <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                    {course.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Deadline: <strong>{course.complianceDeadline || '2026-11-15'}</strong></span>
                  <span>·</span>
                  <span>Required for: All Full-Time Seats</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => onOpenPlayer(course)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  {course.progress === 100 ? 'Review' : 'Continue'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Detailed Tracking Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">Enrolled Curriculum Performance Breakdown</h3>
          <p className="text-xs text-slate-500 mt-0.5">Detailed monitoring of lesson progression, quizzes, and certificate availability.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Curriculum</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Progress</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enrolledCourses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900">{course.title}</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{course.instructor.name} · {course.duration}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-slate-600">{course.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    {course.progress === 100 ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">
                        <Clock className="w-3.5 h-3.5" />
                        <span>In Progress</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-28">
                      <div className="text-[11px] font-semibold text-slate-700 mb-1">{course.progress}%</div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => onOpenPlayer(course)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      {course.progress === 100 ? 'Review' : 'Resume'}
                    </button>
                    {(course.progress === 100 || course.certificateEarned) && (
                      <button
                        onClick={() => onViewCertificate(course)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                      >
                        Certificate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Verified Credentials Gallery */}
      <div className="bg-linear-to-br from-amber-50/50 via-white to-amber-50/30 rounded-2xl border border-amber-200/80 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Earned Accreditations & Digital Credentials</h3>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md">
            Verifiable via QR
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-2xl">🎓</span>
              <span className="text-[10px] font-mono text-slate-400">OWLY-IELTS-85-99241</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Owly IELTS Academic 8.5 Band</h4>
              <p className="text-xs text-slate-500 mt-1">Issued to Elena Rostova · October 2026</p>
            </div>
            <button
              onClick={() => {
                const ieltsCourse = courses.find(c => c.id === 'crs-ielts-85') || courses[1];
                onViewCertificate(ieltsCourse);
              }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>View Verified Credential</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
