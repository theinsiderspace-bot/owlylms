import React, { useState } from 'react';
import { ForumPost, UserProfile, UserRole } from '../types/lms';
import { initialForumPosts } from '../data/mockData';
import { 
  MessageSquare, ThumbsUp, MessageCircle, Send, Plus, 
  Sparkles, CheckCircle2, User, Star, HelpCircle, BellRing
} from 'lucide-react';
import { Translations } from '../translations';

interface CommunicationViewProps {
  currentUser: UserProfile;
  currentRole: UserRole;
  t: Translations;
}

export const CommunicationView: React.FC<CommunicationViewProps> = ({
  currentUser,
  currentRole,
  t
}) => {
  const [posts, setPosts] = useState<ForumPost[]>(initialForumPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'discussions' | 'announcements' | 'feedback'>('discussions');

  // Feedback form state
  const [feedbackCourse, setFeedbackCourse] = useState('Owly SAT Masterclass 2026');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackSuccessToast, setFeedbackSuccessToast] = useState(false);

  // New Thread form
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState<'General' | 'Homework Help' | 'Exam Strategy' | 'Technical Support'>('Exam Strategy');
  const [newThreadContent, setNewThreadContent] = useState('');

  const categories = ['All', 'General', 'Homework Help', 'Exam Strategy', 'Technical Support'];

  const filteredPosts = posts.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  const handleUpvotePost = (postId: string) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    }));
  };

  const handlePostReply = (postId: string) => {
    const text = replyInput[postId]?.trim();
    if (!text) return;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        const newReply = {
          id: `rep-${Date.now()}`,
          author: currentUser.name,
          role: currentRole,
          avatar: currentUser.avatar,
          timestamp: 'Just now',
          content: text,
          upvotes: 0
        };
        return {
          ...p,
          replies: [...p.replies, newReply]
        };
      }
      return p;
    }));

    setReplyInput(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle || !newThreadContent) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      courseId: 'crs-general',
      courseTitle: 'Owly Enterprise Global Community',
      title: newThreadTitle,
      author: currentUser.name,
      role: currentRole,
      avatar: currentUser.avatar,
      timestamp: 'Just now',
      content: newThreadContent,
      category: newThreadCategory,
      upvotes: 1,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setShowNewThreadModal(false);
    setNewThreadTitle('');
    setNewThreadContent('');
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment) return;
    setFeedbackSuccessToast(true);
    setFeedbackComment('');
    setTimeout(() => setFeedbackSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Sub Navigation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discussions' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Discussion Forums
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'announcements' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Instructor Announcements
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'feedback' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Feedback & Evaluation
          </button>
        </div>

        {activeTab === 'discussions' && (
          <button
            onClick={() => setShowNewThreadModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.createThread}</span>
          </button>
        )}
      </div>

      {/* DISCUSSIONS TAB */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-slate-500 mr-1">Categories:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                
                {/* Post Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{post.author}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                          {post.role}
                        </span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs text-slate-400">{post.timestamp}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-indigo-600 mt-0.5">
                        {post.courseTitle} · <span className="text-slate-500">{post.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Upvote button */}
                  <button
                    onClick={() => handleUpvotePost(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 rounded-lg text-xs font-bold border border-slate-200 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{post.upvotes}</span>
                  </button>
                </div>

                {/* Content */}
                <div>
                  <h4 className="font-bold text-slate-900 text-base mb-2">{post.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">{post.content}</p>
                </div>

                {/* Replies Accordion */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>{post.replies.length} Responses</span>
                  </div>

                  {post.replies.map(rep => (
                    <div key={rep.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img src={rep.avatar} alt={rep.author} className="w-6 h-6 rounded-full object-cover" />
                          <span className="font-bold text-slate-900">{rep.author}</span>
                          <span className="text-[10px] font-bold uppercase bg-slate-200/80 text-slate-700 px-1.5 py-0.2 rounded-sm">
                            {rep.role}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">{rep.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pl-8">{rep.content}</p>
                    </div>
                  ))}

                  {/* Reply Input */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={replyInput[post.id] || ''}
                      onChange={(e) => setReplyInput({ ...replyInput, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePostReply(post.id);
                      }}
                      placeholder="Write an insightful response or solution..."
                      className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-indigo-500"
                    />
                    <button
                      onClick={() => handlePostReply(post.id)}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="bg-linear-to-r from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <BellRing className="w-4 h-4" />
              <span>Official Academic Notice</span>
            </div>
            <h3 className="text-xl font-bold">Owly SAT 2026 Adaptive Question Bank Update Released</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              All students preparing via OwlySAT (https://owlysat.ai.studio/) can now access 450+ new hard math questions with interactive Desmos regressions and digital reading passages.
            </p>
            <div className="text-[11px] text-slate-400 pt-2">Posted by Dr. Marcus Vance · Provost Office</div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Compliance Notice</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Workday Automated Sync Schedule Adjusted</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bi-directional syncing for compliance status write-backs will now run every 6 hours instead of daily, ensuring immediate recognition of completed SOC2 and Anti-Harassment certificates in corporate HR records.
            </p>
            <div className="text-[11px] text-slate-400 pt-2">Posted by Corporate IT & SecOps · October 8, 2026</div>
          </div>
        </div>
      )}

      {/* FEEDBACK TAB */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-2xl mx-auto shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Learner Feedback & Course Evaluation</h3>
            <p className="text-xs text-slate-500 mt-1">
              Your confidential evaluations help our academic directors and instructors continuously improve curriculum quality.
            </p>
          </div>

          {feedbackSuccessToast && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your feedback has been recorded and submitted to the Academic Provost.</span>
            </div>
          )}

          <form onSubmit={handleSubmitFeedback} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Curriculum</label>
              <select
                value={feedbackCourse}
                onChange={(e) => setFeedbackCourse(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              >
                <option value="Owly SAT Masterclass 2026">Owly SAT Masterclass 2026</option>
                <option value="Owly IELTS Academic 8.5 Band">Owly IELTS Academic 8.5 Band</option>
                <option value="Global Cybersecurity & SOC2">Global Cybersecurity & SOC2</option>
                <option value="Enterprise Cloud Architecture">Enterprise Cloud Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Overall Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= feedbackRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">{feedbackRating} / 5 Stars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Evaluation & Comments</label>
              <textarea
                required
                rows={5}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="What did you think of the lecture materials, interactive quizzes, or pacing? Any areas for improvement?"
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Submit Course Feedback
            </button>
          </form>
        </div>
      )}

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Create New Discussion Topic</h3>
            <p className="text-xs text-slate-500">Ask a technical question, propose exam strategy ideas, or request homework feedback.</p>

            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  placeholder="e.g. Best technique for Digital SAT punctuation rules?"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newThreadCategory}
                  onChange={(e) => setNewThreadCategory(e.target.value as any)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Exam Strategy">Exam Strategy</option>
                  <option value="Homework Help">Homework Help</option>
                  <option value="General">General</option>
                  <option value="Technical Support">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Post Content</label>
                <textarea
                  required
                  rows={4}
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  placeholder="Elaborate on your question or perspective..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Publish Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
