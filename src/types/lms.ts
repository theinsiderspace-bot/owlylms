export type UserRole = 'learner' | 'instructor' | 'manager' | 'admin';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar' | 'zh' | 'pt';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'document' | 'interactive' | 'quiz';
  duration: string;
  completed: boolean;
  content: string;
  videoUrl?: string;
  documentSummary?: string;
  quizQuestions?: QuizQuestion[];
  resources?: { name: string; url: string; size: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Exam Prep' | 'Compliance' | 'Technology' | 'Executive Leadership' | 'Workplace';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  rating: number;
  studentsCount: number;
  progress: number; // 0 - 100
  enrolled: boolean;
  thumbnail: string;
  tags: string[];
  isComplianceRequired?: boolean;
  complianceDeadline?: string;
  certificateEarned?: boolean;
  certificateId?: string;
  examHubLink?: string;
  modules: CourseModule[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  organization: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  complianceStatus: 'compliant' | 'due-soon' | 'overdue';
}

export interface ForumReply {
  id: string;
  author: string;
  role: UserRole;
  avatar: string;
  timestamp: string;
  content: string;
  upvotes: number;
}

export interface ForumPost {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  author: string;
  role: UserRole;
  avatar: string;
  timestamp: string;
  content: string;
  category: 'General' | 'Homework Help' | 'Exam Strategy' | 'Technical Support';
  upvotes: number;
  replies: ForumReply[];
}

export interface SyncLog {
  id: string;
  timestamp: string;
  event: string;
  status: 'success' | 'failed' | 'in-progress';
  recordsProcessed: number;
  details: string;
}

export interface HRISIntegration {
  id: string;
  name: string;
  category: 'HRIS' | 'Payroll' | 'Identity / SSO';
  description: string;
  iconName: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync: string;
  mappedUsers: number;
  webhookUrl: string;
  syncFrequency: string;
  logs: SyncLog[];
}

export interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  seatsBilled: number;
  tier: string;
  paymentMethod: string;
  billingContact: string;
  items: { description: string; quantity: number; unitPrice: number; total: number }[];
}

export interface PaymentGateway {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  mode: 'live' | 'test';
  apiKeyMasked: string;
  transactionFee: string;
  settlementTime: string;
  currencies: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  ipAddress: string;
  severity: 'info' | 'warning' | 'critical';
  details: string;
}
