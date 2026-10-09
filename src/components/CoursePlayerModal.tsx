import React, { useState } from 'react';
import { Course, Lesson } from '../types/lms';
import { 
  X, CheckCircle, Circle, Play, FileText, HelpCircle, 
  ChevronRight, Award, ExternalLink, BookmarkCheck,
  Check, ArrowRight, ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from './CertificateModal';

interface CoursePlayerModalProps {
  course: Course;
  onClose: () => void;
  onUpdateProgress: (courseId: string, progress: number, completedLessons: number) => void;
  studentName: string;
}

export const CoursePlayerModal: React.FC<CoursePlayerModalProps> = ({
  course,
  onClose,
  onUpdateProgress,
  studentName
}) => {
  // Flatten lessons for easy indexing
  const allLessons: Lesson[] = course.modules.flatMap(m => m.lessons);

  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    new Set(allLessons.filter(l => l.completed).map(l => l.id))
  );

  // Active quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Notes state
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'resources'>('content');
  const [lessonNotes, setLessonNotes] = useState<string>('');
  const [savedNotesToast, setSavedNotesToast] = useState<boolean>(false);

  // Certificate Modal
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const currentLesson: Lesson = allLessons[activeLessonIndex] || allLessons[0];

  const handleSelectLesson = (index: number) => {
    setActiveLessonIndex(index);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const handleMarkComplete = (lessonId: string) => {
    const nextSet = new Set(completedLessonIds);
    if (!nextSet.has(lessonId)) {
      nextSet.add(lessonId);
      setCompletedLessonIds(nextSet);
      
      const newProgress = Math.round((nextSet.size / allLessons.length) * 100);
      onUpdateProgress(course.id, newProgress, nextSet.size);

      // Check if finished
      if (nextSet.size === allLessons.length) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => setShowCertificate(true), 800);
      }
    }
  };

  const handleQuizAnswer = (qId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const handleGradeQuiz = () => {
    if (!currentLesson.quizQuestions) return;
    let correct = 0;
    currentLesson.quizQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizSubmitted(true);

    if (correct >= Math.ceil(currentLesson.quizQuestions.length / 2)) {
      handleMarkComplete(currentLesson.id);
    }
  };

  const handleSaveNotes = () => {
    setSavedNotesToast(true);
    setTimeout(() => setSavedNotesToast(false), 2000);
  };

  const progressPercentage = Math.round((completedLessonIds.size / allLessons.length) * 100);

  return (
    <>
      <div className="fixed inset-0 z-40 flex bg-slate-950/80 backdrop-blur-md overflow-hidden">
        {/* Main LMS Delivery Container */}
        <div className="flex flex-col w-full h-full bg-slate-900 text-slate-100">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xl">🦉</span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-sm sm:text-base text-white tracking-tight line-clamp-1">{course.title}</h2>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{course.category}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Instructor: {course.instructor.name} · {allLessons.length} Lessons · {course.duration}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {course.examHubLink && (
                <a
                  href={course.examHubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-semibold transition-colors"
                >
                  <span>Launch Exam Hub Simulator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="hidden md:flex items-center gap-2">
                <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }} 
                  />
                </div>
                <span className="text-xs font-semibold text-emerald-400">{progressPercentage}%</span>
              </div>

              {completedLessonIds.size === allLessons.length && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Certificate</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Exit Course Player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Player Core Layout: Content on Left/Center, Syllabus on Right */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Center Learning Delivery Stage */}
            <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto">
              
              {/* Tabs */}
              <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-900/60">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'content'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {currentLesson.type === 'video' ? <Play className="w-3.5 h-3.5" /> : null}
                  {currentLesson.type === 'document' ? <FileText className="w-3.5 h-3.5" /> : null}
                  {currentLesson.type === 'quiz' ? <HelpCircle className="w-3.5 h-3.5" /> : null}
                  <span>Lesson Player</span>
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                    activeTab === 'notes'
                      ? 'border-indigo-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Interactive Notes</span>
                </button>

                {currentLesson.resources && currentLesson.resources.length > 0 && (
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                      activeTab === 'resources'
                        ? 'border-indigo-500 text-white'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Attached Resources ({currentLesson.resources.length})</span>
                  </button>
                )}
              </div>

              {/* Main Stage Body */}
              <div className="flex-1 p-6 sm:p-8 max-w-5xl mx-auto w-full">
                {activeTab === 'content' && (
                  <div>
                    {/* VIDEO LESSON */}
                    {currentLesson.type === 'video' && (
                      <div className="space-y-6">
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-slate-800">
                          <video
                            controls
                            className="w-full h-full object-contain"
                            poster={course.thumbnail}
                            onEnded={() => handleMarkComplete(currentLesson.id)}
                          >
                            <source src={currentLesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />
                            Your browser does not support HTML5 video.
                          </video>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-white">{currentLesson.title}</h3>
                            <span className="text-xs text-slate-400 font-mono">{currentLesson.duration}</span>
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed mb-4">
                            {currentLesson.content}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                            <button
                              onClick={() => handleMarkComplete(currentLesson.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                completedLessonIds.has(currentLesson.id)
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                              }`}
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>{completedLessonIds.has(currentLesson.id) ? 'Completed' : 'Mark as Completed'}</span>
                            </button>

                            {activeLessonIndex < allLessons.length - 1 && (
                              <button
                                onClick={() => handleSelectLesson(activeLessonIndex + 1)}
                                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium"
                              >
                                <span>Next Lesson</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* INTERACTIVE MODULE / DOCUMENT */}
                    {(currentLesson.type === 'interactive' || currentLesson.type === 'document') && (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
                        <div className="border-b border-slate-800 pb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                            {currentLesson.type === 'interactive' ? 'Interactive Curriculum Exercise' : 'Reading & Case Study'}
                          </span>
                          <h3 className="text-2xl font-bold text-white mt-1">{currentLesson.title}</h3>
                          <div className="text-xs text-slate-400 mt-2">Estimated completion time: {currentLesson.duration}</div>
                        </div>

                        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                          <p>{currentLesson.content}</p>

                          {course.category === 'Exam Prep' && (
                            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40">
                              <h4 className="text-indigo-300 font-bold text-sm mb-1">Owly Exam Intelligence Note</h4>
                              <p className="text-xs text-slate-300">
                                This problem pattern aligns with the adaptive scoring branch on the 2026 test specification. Candidates who master this module gain an estimated +40 point score advantage on section 2.
                              </p>
                              {course.examHubLink && (
                                <a
                                  href={course.examHubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2"
                                >
                                  Practice in full-length timed exam simulator &rarr;
                                </a>
                              )}
                            </div>
                          )}

                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
                            {`// Syllabus Checkpoint Verification\nSTATUS: Active_Curriculum\nMODULE: ${currentLesson.id}\nTRACK: ${course.title}`}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                          <button
                            onClick={() => handleMarkComplete(currentLesson.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                              completedLessonIds.has(currentLesson.id)
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>{completedLessonIds.has(currentLesson.id) ? 'Completed' : 'Mark as Completed'}</span>
                          </button>

                          {activeLessonIndex < allLessons.length - 1 && (
                            <button
                              onClick={() => handleSelectLesson(activeLessonIndex + 1)}
                              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium"
                            >
                              <span>Next Lesson</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* QUIZ LESSON */}
                    {currentLesson.type === 'quiz' && (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
                        <div className="border-b border-slate-800 pb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Knowledge Check & Certification Quiz</span>
                          <h3 className="text-2xl font-bold text-white mt-1">{currentLesson.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{currentLesson.content}</p>
                        </div>

                        {currentLesson.quizQuestions && currentLesson.quizQuestions.map((q, qIdx) => (
                          <div key={q.id} className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl space-y-3">
                            <div className="text-xs font-bold text-slate-400 uppercase">Question {qIdx + 1} of {currentLesson.quizQuestions?.length}</div>
                            <p className="text-sm font-semibold text-white">{q.question}</p>

                            <div className="space-y-2 mt-3">
                              {q.options.map((option, optIdx) => {
                                const isSelected = selectedAnswers[q.id] === optIdx;
                                const isCorrect = optIdx === q.correctAnswerIndex;
                                let btnClasses = "w-full text-left p-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ";
                                
                                if (quizSubmitted) {
                                  if (isCorrect) {
                                    btnClasses += "bg-emerald-950/60 border-emerald-500 text-emerald-200";
                                  } else if (isSelected && !isCorrect) {
                                    btnClasses += "bg-rose-950/60 border-rose-500 text-rose-200";
                                  } else {
                                    btnClasses += "bg-slate-900/60 border-slate-800 text-slate-400 opacity-60";
                                  }
                                } else {
                                  btnClasses += isSelected
                                    ? "bg-indigo-600/30 border-indigo-500 text-white"
                                    : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    onClick={() => handleQuizAnswer(q.id, optIdx)}
                                    disabled={quizSubmitted}
                                    className={btnClasses}
                                  >
                                    <span>{String.fromCharCode(65 + optIdx)}. {option}</span>
                                    {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">Explanation: </strong>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                          {!quizSubmitted ? (
                            <button
                              onClick={handleGradeQuiz}
                              disabled={
                                !currentLesson.quizQuestions || 
                                Object.keys(selectedAnswers).length < currentLesson.quizQuestions.length
                              }
                              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-lg shadow-lg shadow-indigo-600/30 transition-all"
                            >
                              Submit Answers & Evaluate
                            </button>
                          ) : (
                            <div className="flex items-center gap-4">
                              <div className="text-xs">
                                <span className="text-slate-400">Score: </span>
                                <strong className="text-emerald-400 font-bold text-sm">
                                  {quizScore} / {currentLesson.quizQuestions?.length}
                                </strong>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedAnswers({});
                                  setQuizSubmitted(false);
                                  setQuizScore(null);
                                }}
                                className="text-xs text-slate-400 hover:text-white underline"
                              >
                                Retake Quiz
                              </button>
                            </div>
                          )}

                          {activeLessonIndex < allLessons.length - 1 && (
                            <button
                              onClick={() => handleSelectLesson(activeLessonIndex + 1)}
                              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-medium"
                            >
                              <span>Next Lesson</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* NOTES TAB */}
                {activeTab === 'notes' && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">Your Lesson Notes</h3>
                        <p className="text-xs text-slate-400">Notes are synchronized with your LMS learner profile.</p>
                      </div>
                      <button
                        onClick={handleSaveNotes}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors"
                      >
                        {savedNotesToast ? 'Saved!' : 'Save Notes'}
                      </button>
                    </div>

                    <textarea
                      value={lessonNotes}
                      onChange={(e) => setLessonNotes(e.target.value)}
                      placeholder="Type your notes here... Key takeaways, formulas, or concepts to remember."
                      rows={12}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>
                )}

                {/* RESOURCES TAB */}
                {activeTab === 'resources' && currentLesson.resources && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
                    <h3 className="text-base font-bold text-white">Attached Learning Materials</h3>
                    <div className="space-y-3">
                      {currentLesson.resources.map((res, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            <div>
                              <div className="text-xs font-semibold text-white">{res.name}</div>
                              <div className="text-[11px] text-slate-400">{res.size} · PDF Documentation</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert(`Downloading ${res.name}`)}
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Curriculum Outline Sidebar */}
            <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-72 lg:h-auto overflow-hidden">
              <div className="p-4 border-b border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Course Syllabus</h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {completedLessonIds.size}/{allLessons.length} Done
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-4">
                {course.modules.map(module => (
                  <div key={module.id} className="space-y-1">
                    <div className="px-3 pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {module.title}
                    </div>

                    {module.lessons.map(lesson => {
                      const lessonGlobalIndex = allLessons.findIndex(l => l.id === lesson.id);
                      const isActive = lessonGlobalIndex === activeLessonIndex;
                      const isCompleted = completedLessonIds.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lessonGlobalIndex)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                            isActive
                              ? 'bg-indigo-600/20 text-white font-semibold border border-indigo-500/40'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="mt-0.5">
                            {isCompleted ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-slate-500" />
                            )}
                          </span>
                          <div className="flex-1">
                            <div className="line-clamp-1">{lesson.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                              <span className="capitalize">{lesson.type}</span>
                              <span>·</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Quick prev / next buttons */}
              <div className="p-3 border-t border-slate-800 flex items-center justify-between bg-slate-900">
                <button
                  disabled={activeLessonIndex === 0}
                  onClick={() => handleSelectLesson(activeLessonIndex - 1)}
                  className="p-2 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800"
                  title="Previous Lesson"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  {activeLessonIndex + 1} of {allLessons.length}
                </span>
                <button
                  disabled={activeLessonIndex === allLessons.length - 1}
                  onClick={() => handleSelectLesson(activeLessonIndex + 1)}
                  className="p-2 text-slate-400 hover:text-white disabled:opacity-30 rounded-lg hover:bg-slate-800"
                  title="Next Lesson"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {showCertificate && (
        <CertificateModal
          courseTitle={course.title}
          studentName={studentName}
          issueDate="October 9, 2026"
          certificateId={`OWLY-CERT-${course.id.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
};
