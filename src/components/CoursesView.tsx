import React, { useState } from 'react';
import { Course } from '../types/lms';
import { 
  Search, Play, CheckCircle2, Award, Clock, Users, 
  Star, ExternalLink, ShieldAlert, Sparkles, Filter 
} from 'lucide-react';
import { Translations } from '../translations';

interface CoursesViewProps {
  courses: Course[];
  onOpenPlayer: (course: Course) => void;
  onEnroll: (courseId: string) => void;
  onViewCertificate: (course: Course) => void;
  t: Translations;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onOpenPlayer,
  onEnroll,
  onViewCertificate,
  t
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'my-learning'>('all');

  const categories = ['All', 'Exam Prep', 'Compliance', 'Technology', 'Executive Leadership'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filterCategory === 'All' || course.category === filterCategory;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || (activeTab === 'my-learning' && course.enrolled);

    return matchesCategory && matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Filter & Search Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* All vs My Enrollments Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.allCourses} ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('my-learning')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'my-learning'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.myLearning} ({courses.filter(c => c.enrolled).length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1 shrink-0" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              filterCategory === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isFinished = course.progress === 100 || course.certificateEarned;

          return (
            <div
              key={course.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
                  {course.category}
                </div>

                {/* Compliance badge */}
                {course.isComplianceRequired && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md shadow-xs flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Mandatory</span>
                  </div>
                )}

                {/* Exam Hub Direct Pin */}
                {course.examHubLink && (
                  <div className="absolute bottom-3 left-3 bg-indigo-900/90 backdrop-blur-xs text-indigo-200 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1 border border-indigo-400/30">
                    <span>Direct Tested Platform</span>
                  </div>
                )}
              </div>

              {/* Course Meta & Description */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Instructor & Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-700">{course.instructor.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Connected Exam external link pill */}
                  {course.examHubLink && (
                    <div className="mt-3 p-2 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center justify-between text-xs">
                      <div className="text-[11px] text-indigo-950 font-medium">
                        {course.id === 'crs-sat-2026' ? 'Direct link to owlysat.ai.studio' : 'Direct link to owlyielts.ai.studio'}
                      </div>
                      <a
                        href={course.examHubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
                      >
                        <span>Open Hub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Progress / Completion Status */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  {course.enrolled ? (
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                        <span>Course Progress</span>
                        <span className="text-indigo-600">{course.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFinished ? 'bg-emerald-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.studentsCount.toLocaleString()} enrolled</span>
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {course.enrolled ? (
                      <>
                        <button
                          onClick={() => onOpenPlayer(course)}
                          className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>{isFinished ? 'Review Curriculum' : t.continueCourse}</span>
                        </button>

                        {isFinished && (
                          <button
                            onClick={() => onViewCertificate(course)}
                            className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl transition-colors"
                            title="View Verified Certificate"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => onEnroll(course.id)}
                        className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <span>{t.enrollNow}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          <p className="text-sm">No courses matching your criteria found.</p>
        </div>
      )}

    </div>
  );
};
