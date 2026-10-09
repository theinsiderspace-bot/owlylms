import { Course, ForumPost, HRISIntegration, Invoice, PaymentGateway, AuditLog, UserProfile } from '../types/lms';

export const initialCurrentUser: UserProfile = {
  id: 'usr-901',
  name: 'Elena Rostova',
  email: 'elena.rostova@acme-global.corp',
  role: 'learner',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Strategic Operations & Tech',
  organization: 'Acme Global Technologies Inc.',
  enrolledCourseIds: ['crs-sat-2026', 'crs-sec-101', 'crs-lead-401'],
  completedCourseIds: ['crs-ielts-85'],
  complianceStatus: 'compliant',
};

export const initialCourses: Course[] = [
  {
    id: 'crs-sat-2026',
    title: 'Owly SAT Masterclass 2026: Digital Math & Evidence-Based Reading',
    description: 'Comprehensive adaptive training curriculum for the Digital SAT. Includes Desmos calculator shortcuts, advanced algebra, and hard-reading synthesis techniques directly integrated with the OwlySAT platform.',
    category: 'Exam Prep',
    level: 'Advanced',
    duration: '38h 45m',
    instructor: {
      name: 'Dr. Marcus Vance',
      role: 'Chief Psychometrician & SAT Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.96,
    studentsCount: 4210,
    progress: 65,
    enrolled: true,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    tags: ['SAT 2026', 'Math Module', 'Reading & Writing', 'Desmos Mastery'],
    isComplianceRequired: false,
    examHubLink: 'https://owlysat.ai.studio/',
    modules: [
      {
        id: 'mod-sat-1',
        title: 'Module 1: Digital SAT Architecture & Scoring Blueprint',
        lessons: [
          {
            id: 'les-sat-101',
            title: '1.1 The Multi-Stage Adaptive Engine Explained',
            type: 'video',
            duration: '14m',
            completed: true,
            content: 'Understand how the Digital SAT test engine routes test-takers between Module 1 and the Hard/Easy Module 2 branches based on psychometric difficulty thresholds.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            resources: [
              { name: 'SAT-Scoring-Algorithm-Blueprint.pdf', url: '#', size: '2.4 MB' },
              { name: 'Desmos-Formula-QuickSheet.pdf', url: '#', size: '1.1 MB' }
            ]
          },
          {
            id: 'les-sat-102',
            title: '1.2 Reading & Writing: Command of Evidence Questions',
            type: 'interactive',
            duration: '22m',
            completed: true,
            content: 'Interactive textual breakdown of scientific tables, dual-passage arguments, and rhetorical synthesis bullet points under strict 71-second pacing targets.'
          },
          {
            id: 'les-sat-103',
            title: '1.3 Hard SAT Math Diagnostics & Pacing Check',
            type: 'quiz',
            duration: '15m',
            completed: false,
            content: 'High-frequency quadratic intercepts, circle coordinate geometry, and exponential growth models.',
            quizQuestions: [
              {
                id: 'q-sat-1',
                question: 'If 3x + 2y = 18 and 6x + ky = 36 has infinitely many solutions, what is the value of k?',
                options: ['2', '4', '6', '12'],
                correctAnswerIndex: 1,
                explanation: 'For linear equations in two variables to have infinitely many solutions, the ratio of coefficients must be equal: 6/3 = k/2 = 36/18. Since 6/3 = 2, k/2 = 2 => k = 4.'
              },
              {
                id: 'q-sat-2',
                question: 'In the Digital SAT Reading module, which transition best demonstrates counter-intuitive contrast?',
                options: ['Furthermore', 'Consequently', 'Paradoxically', 'Similarly'],
                correctAnswerIndex: 2,
                explanation: '"Paradoxically" indicates an outcome or fact that seems contradictory or impossible yet is true.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod-sat-2',
        title: 'Module 2: Advanced Math & Desmos Calculator Power Exploits',
        lessons: [
          {
            id: 'les-sat-201',
            title: '2.1 Solving Non-Linear Systems in 8 Seconds with Desmos',
            type: 'video',
            duration: '18m',
            completed: false,
            content: 'Mastering graphical regression, table evaluations, and variable sliders to bypass tedious algebraic manipulations on Section 2.'
          },
          {
            id: 'les-sat-202',
            title: '2.2 Advanced Reading: Archaic Poetry & 19th Century Prose',
            type: 'document',
            duration: '25m',
            completed: false,
            content: 'Techniques for deciphering complex sentence inversions, tone shifts, and antecedent references without rereading entire paragraphs.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs-ielts-85',
    title: 'Owly IELTS Academic 8.5 Band: Speaking, Listening & Task 2 Writing',
    description: 'Targeted preparation for candidates aiming for Band 8.0+. Lexical resource mastery, idiomatic phrasing, pronunciation fluency, and formal coherence and cohesion frameworks synced with OwlyIELTS.',
    category: 'Exam Prep',
    level: 'Advanced',
    duration: '42h 10m',
    instructor: {
      name: 'Sarah Chen, M.Ed.',
      role: 'Former British Council Examiner',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.98,
    studentsCount: 5120,
    progress: 100,
    enrolled: true,
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    tags: ['IELTS Academic', 'Band 8.5', 'Speaking Part 3', 'Task 2 Essay'],
    certificateEarned: true,
    certificateId: 'OWLY-IELTS-85-99241',
    examHubLink: 'https://owlyielts.ai.studio/',
    modules: [
      {
        id: 'mod-ielts-1',
        title: 'Module 1: Task 2 Essay Architectures for Band 9 Cohesion',
        lessons: [
          {
            id: 'les-ielts-101',
            title: '1.1 Discussion vs. Opinion vs. Problem-Solution Frameworks',
            type: 'video',
            duration: '24m',
            completed: true,
            content: 'How examiners score coherence and cohesion in the 2026 rubric. Why memorized transition phrases hurt your Lexical Resource score.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
          },
          {
            id: 'les-ielts-102',
            title: '1.2 Speaking Part 3: Abstract Discourse and Fluency',
            type: 'interactive',
            duration: '30m',
            completed: true,
            content: 'Expanding responses using the PREP method (Point, Reason, Example, Perspective) to sustain conversational momentum without hesitation.'
          },
          {
            id: 'les-ielts-103',
            title: '1.3 IELTS Vocabulary & Collocation Mastery Quiz',
            type: 'quiz',
            duration: '12m',
            completed: true,
            content: 'High-level academic collocations, topic-specific idiomatic idioms, and grammatical range evaluation.',
            quizQuestions: [
              {
                id: 'q-ielts-1',
                question: 'Which collocation best represents Band 8.5 academic lexical sophistication?',
                options: ['Have a very big effect', 'Exert a profound influence', 'Make things happen strongly', 'Create lots of results'],
                correctAnswerIndex: 1,
                explanation: '"Exert a profound influence" displays natural, high-level collocational competence according to IELTS Band Descriptors.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-sec-101',
    title: 'Global Cybersecurity, SOC2 & ISO 27001 Compliance 2026',
    description: 'Mandatory annual workforce certification covering phishing defense, zero-trust credential hygiene, data classification, and incident reporting protocols under SOC2 Type II.',
    category: 'Compliance',
    level: 'Beginner',
    duration: '4h 15m',
    instructor: {
      name: 'Alexander Ross',
      role: 'VP Information Security, CISO Acme Corp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.89,
    studentsCount: 11400,
    progress: 40,
    enrolled: true,
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    tags: ['Mandatory', 'SOC2', 'ISO 27001', 'Zero Trust', 'Phishing'],
    isComplianceRequired: true,
    complianceDeadline: '2026-11-15',
    modules: [
      {
        id: 'mod-sec-1',
        title: 'Module 1: Zero Trust Architecture & Social Engineering',
        lessons: [
          {
            id: 'les-sec-101',
            title: '1.1 Modern Phishing & AI Voice Cloning Vectors',
            type: 'video',
            duration: '16m',
            completed: true,
            content: 'How attackers leverage spear phishing and deepfake executive impersonation to bypass traditional email filters.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
          },
          {
            id: 'les-sec-102',
            title: '1.2 Corporate Data Classification & Handling Rules',
            type: 'document',
            duration: '18m',
            completed: false,
            content: 'Strict protocols on handling Restricted, Confidential, Internal, and Public data categories across cloud buckets and messaging channels.'
          },
          {
            id: 'les-sec-103',
            title: '1.3 Phishing Incident Response Checkpoint',
            type: 'quiz',
            duration: '10m',
            completed: false,
            content: 'Verify your immediate protocol when encountering a suspicious authorization prompt or urgent financial wire request.',
            quizQuestions: [
              {
                id: 'q-sec-1',
                question: 'If you receive an unexpected MFA push request while you are not logging in, what is your primary immediate step?',
                options: ['Tap Approve to clear the alert', 'Deny the request and report suspicious access to the SecOps Incident response desk', 'Ignore it and log in next morning', 'Change your home Wi-Fi password'],
                correctAnswerIndex: 1,
                explanation: 'Never approve unsolicited MFA prompts. Denying and reporting alerts the Security Operations Center of possible credential compromise.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs-cloud-301',
    title: 'Enterprise Cloud Architecture & Distributed Systems Engineering',
    description: 'Design resilient microservices, distributed cache topologies, event sourcing with Apache Kafka, and multi-region failover mechanisms for mission-critical workloads.',
    category: 'Technology',
    level: 'Advanced',
    duration: '26h 00m',
    instructor: {
      name: 'Priya Narayanan',
      role: 'Principal Cloud Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.94,
    studentsCount: 3820,
    progress: 0,
    enrolled: false,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    tags: ['Cloud', 'Kubernetes', 'Kafka', 'System Design'],
    isComplianceRequired: false,
    modules: [
      {
        id: 'mod-cld-1',
        title: 'Module 1: CAP Theorem & Consistency Models',
        lessons: [
          {
            id: 'les-cld-101',
            title: '1.1 Eventual Consistency vs Linearizability',
            type: 'video',
            duration: '28m',
            completed: false,
            content: 'Deep dive into quorum reads/writes, vector clocks, and Paxos consensus implementations in global database engines.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs-lead-401',
    title: 'Executive Leadership: High-Performance Team Management',
    description: 'Strategic frameworks for scaling cross-functional business units, radical candor feedback cadences, executive presence, and OKR alignment in global enterprises.',
    category: 'Executive Leadership',
    level: 'Intermediate',
    duration: '16h 30m',
    instructor: {
      name: 'Henrik Lindqvist',
      role: 'Former McKinsey Senior Partner & Executive Coach',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.91,
    studentsCount: 2950,
    progress: 15,
    enrolled: true,
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    tags: ['Leadership', 'Management', 'OKRs', 'Team Dynamics'],
    isComplianceRequired: false,
    modules: [
      {
        id: 'mod-lead-1',
        title: 'Module 1: Cultivating Psychological Safety & Candor',
        lessons: [
          {
            id: 'les-lead-101',
            title: '1.1 Constructive Conflict Resolution in Remote Teams',
            type: 'video',
            duration: '20m',
            completed: true,
            content: 'How top leadership prevents friction spirals and sets healthy dispute escalation paths across asynchronous engineering and product teams.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs-dei-201',
    title: 'Workplace Ethics, DE&I & Anti-Harassment Standards 2026',
    description: 'Essential organizational code of conduct, anti-retaliation policies, inclusive communication, and whistleblower protection guarantees.',
    category: 'Compliance',
    level: 'Beginner',
    duration: '3h 30m',
    instructor: {
      name: 'Camila Morales',
      role: 'Chief People & Culture Officer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    rating: 4.88,
    studentsCount: 9800,
    progress: 0,
    enrolled: false,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    tags: ['HR Compliance', 'Ethics', 'Inclusion', 'Workplace'],
    isComplianceRequired: true,
    complianceDeadline: '2026-12-01',
    modules: [
      {
        id: 'mod-dei-1',
        title: 'Module 1: Creating an Inclusive Professional Environment',
        lessons: [
          {
            id: 'les-dei-101',
            title: '1.1 Recognizing Unconscious Bias & Micro-Inclusions',
            type: 'interactive',
            duration: '25m',
            completed: false,
            content: 'Scenarios on team deliberations, interview evaluations, and equal opportunity performance appraisals.'
          }
        ]
      }
    ]
  }
];

export const initialForumPosts: ForumPost[] = [
  {
    id: 'post-1',
    courseId: 'crs-sat-2026',
    courseTitle: 'Owly SAT Masterclass 2026',
    title: 'How to bypass system of inequalities on Section 2 using Desmos table values?',
    author: 'Liam Chen',
    role: 'learner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago',
    content: 'On the recent digital practice test, there was a question involving 3 overlapping linear inequalities. When graphing in Desmos, the shaded regions overlapped so heavily it was hard to see the discrete integer lattice points. Is there a trick with `{condition}` restrictions?',
    category: 'Exam Strategy',
    upvotes: 18,
    replies: [
      {
        id: 'rep-1',
        author: 'Dr. Marcus Vance',
        role: 'instructor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        timestamp: '1 hour ago',
        content: 'Great question Liam! Yes, in Desmos, you can write `y > 2x + 1 {x > 0} {y < 10}` to restrict the boundary window. Even faster: define an array `L = [1, 2, 3, 4]` and evaluate `f(L)` directly to test coordinates in under 5 seconds!',
        upvotes: 24
      },
      {
        id: 'rep-2',
        author: 'Elena Rostova',
        role: 'learner',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '45 mins ago',
        content: 'I tested this on the OwlySAT platform (https://owlysat.ai.studio/) and it saved me almost 4 minutes on the second math module. Highly recommended!',
        upvotes: 12
      }
    ]
  },
  {
    id: 'post-2',
    courseId: 'crs-ielts-85',
    courseTitle: 'Owly IELTS Academic 8.5 Band',
    title: 'Balancing argument vs one-sided approach in Task 2 Discuss Both Views essays',
    author: 'Amina Al-Mansoor',
    role: 'learner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday',
    content: 'When the prompt states "Discuss both views and give your opinion", do examiners expect 50/50 paragraph word distribution, or can my preferred side occupy 65% of the body space?',
    category: 'Homework Help',
    upvotes: 31,
    replies: [
      {
        id: 'rep-3',
        author: 'Sarah Chen, M.Ed.',
        role: 'instructor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        timestamp: '18 hours ago',
        content: 'Both views must be substantially addressed to satisfy Task Achievement for Band 8+. However, dedicating slightly more analytical weight or nuanced rebuttals to your favored position is standard practice for Band 8.5.',
        upvotes: 19
      }
    ]
  },
  {
    id: 'post-3',
    courseId: 'crs-sec-101',
    courseTitle: 'Global Cybersecurity & SOC2',
    title: 'Reminder: Mandatory SOC2 Recertification closes on Nov 15 for all Engineering & Sales seats',
    author: 'Alexander Ross',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    timestamp: '3 days ago',
    content: 'Please ensure all module checkpoints and the anti-phishing sandbox are completed before the compliance audit deadline. Automated HRIS badges will sync directly to Workday and BambooHR profiles.',
    category: 'General',
    upvotes: 45,
    replies: []
  }
];

export const initialIntegrations: HRISIntegration[] = [
  {
    id: 'int-workday',
    name: 'Workday Human Capital Management',
    category: 'HRIS',
    description: 'Bi-directional employee lifecycle sync, organizational department hierarchy, and automatic compliance status write-backs.',
    iconName: 'workday',
    status: 'connected',
    lastSync: '2026-10-09 08:30 UTC',
    mappedUsers: 842,
    webhookUrl: 'https://api.owly-lms.internal/v2/webhooks/hris/workday-acme',
    syncFrequency: 'Every 6 hours',
    logs: [
      { id: 'log-1', timestamp: '2026-10-09 08:30:12', event: 'Employee Directory Delta Sync', status: 'success', recordsProcessed: 42, details: '12 new hires enrolled; 4 departed accounts archived; compliance records pushed to Workday Learning hub.' },
      { id: 'log-2', timestamp: '2026-10-09 02:30:00', event: 'Automated Audit Sync', status: 'success', recordsProcessed: 842, details: 'Full roster verified. 100% data integrity.' }
    ]
  },
  {
    id: 'int-bamboohr',
    name: 'BambooHR',
    category: 'HRIS',
    description: 'Automated employee onboarding trigger and course assignment based on job title, role level, and regional compliance standards.',
    iconName: 'bamboohr',
    status: 'connected',
    lastSync: '2026-10-08 23:15 UTC',
    mappedUsers: 310,
    webhookUrl: 'https://api.owly-lms.internal/v2/webhooks/hris/bamboo-sync',
    syncFrequency: 'Real-time Webhook',
    logs: [
      { id: 'log-3', timestamp: '2026-10-08 23:15:40', event: 'Webhook Event: employee.hired', status: 'success', recordsProcessed: 3, details: 'Auto-enrolled 3 new hires into SOC2 Security & DE&I 2026 courses.' }
    ]
  },
  {
    id: 'int-adp',
    name: 'ADP Workforce Now',
    category: 'Payroll',
    description: 'Training completion incentives, payroll deduction for optional certification exams, and continuing education stipend tracking.',
    iconName: 'adp',
    status: 'connected',
    lastSync: '2026-10-09 04:00 UTC',
    mappedUsers: 720,
    webhookUrl: 'https://api.owly-lms.internal/v2/webhooks/payroll/adp-sync',
    syncFrequency: 'Daily 04:00 UTC',
    logs: [
      { id: 'log-4', timestamp: '2026-10-09 04:00:22', event: 'Payroll CEU Stipend Validation', status: 'success', recordsProcessed: 18, details: '$4,500 in exam preparation stipends verified for SAT & IELTS certifications.' }
    ]
  },
  {
    id: 'int-sap',
    name: 'SAP SuccessFactors',
    category: 'HRIS',
    description: 'Enterprise skill matrix synchronization, career ladder competencies, and global talent development pipelines.',
    iconName: 'sap',
    status: 'disconnected',
    lastSync: 'Never',
    mappedUsers: 0,
    webhookUrl: 'https://api.owly-lms.internal/v2/webhooks/hris/sap-sf',
    syncFrequency: 'On-Demand',
    logs: []
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-2026-8841',
    date: '2026-10-01',
    dueDate: '2026-10-31',
    amount: 14850.00,
    currency: 'USD',
    status: 'paid',
    seatsBilled: 450,
    tier: 'Enterprise Global Suite',
    paymentMethod: 'Stripe ACH Transfer (Bank of America **9412)',
    billingContact: 'CFO Office - finance@acme-global.corp',
    items: [
      { description: 'OwlyLMS Enterprise Platform Core (450 Active Seats)', quantity: 450, unitPrice: 28.00, total: 12600.00 },
      { description: 'OwlySAT Exam Prep Adaptive Simulator Add-on Licenses', quantity: 75, unitPrice: 18.00, total: 1350.00 },
      { description: 'OwlyIELTS Academic 8.5 Band Simulator Add-on Licenses', quantity: 50, unitPrice: 18.00, total: 900.00 }
    ]
  },
  {
    id: 'INV-2026-8294',
    date: '2026-09-01',
    dueDate: '2026-09-30',
    amount: 14850.00,
    currency: 'USD',
    status: 'paid',
    seatsBilled: 450,
    tier: 'Enterprise Global Suite',
    paymentMethod: 'Stripe ACH Transfer (Bank of America **9412)',
    billingContact: 'CFO Office - finance@acme-global.corp',
    items: [
      { description: 'OwlyLMS Enterprise Platform Core (450 Active Seats)', quantity: 450, unitPrice: 28.00, total: 12600.00 },
      { description: 'Exam Hub Prep Simulators Bundle (SAT & IELTS)', quantity: 125, unitPrice: 18.00, total: 2250.00 }
    ]
  },
  {
    id: 'INV-2026-7910',
    date: '2026-08-01',
    dueDate: '2026-08-31',
    amount: 13200.00,
    currency: 'USD',
    status: 'paid',
    seatsBilled: 400,
    tier: 'Enterprise Global Suite',
    paymentMethod: 'Wire Transfer / Swift',
    billingContact: 'CFO Office - finance@acme-global.corp',
    items: [
      { description: 'OwlyLMS Enterprise Platform Core (400 Active Seats)', quantity: 400, unitPrice: 28.00, total: 11200.00 },
      { description: 'Compliance & SOC2 Automation Module', quantity: 1, unitPrice: 2000.00, total: 2000.00 }
    ]
  }
];

export const initialPaymentGateways: PaymentGateway[] = [
  {
    id: 'gw-stripe',
    name: 'Stripe Corporate Billing',
    type: 'Credit Card, ACH & SEPA',
    enabled: true,
    mode: 'live',
    apiKeyMasked: 'pk_live_51M******************8vA9',
    transactionFee: '0.8% ACH / 2.9% Card',
    settlementTime: 'T+2 business days',
    currencies: ['USD', 'EUR', 'GBP', 'CAD', 'JPY', 'AUD']
  },
  {
    id: 'gw-paypal',
    name: 'PayPal B2B Commerce',
    type: 'Digital Wallet & Net-30 Invoicing',
    enabled: true,
    mode: 'live',
    apiKeyMasked: 'client_id_live_A8******************f14',
    transactionFee: '2.5% + $0.30',
    settlementTime: 'Instant',
    currencies: ['USD', 'EUR', 'GBP', 'AUD']
  },
  {
    id: 'gw-wise',
    name: 'Wise Business International',
    type: 'Multi-Currency Bank Rails',
    enabled: true,
    mode: 'live',
    apiKeyMasked: 'wise_live_tok_99******************41a',
    transactionFee: '0.35% mid-market rate',
    settlementTime: 'Same day',
    currencies: ['EUR', 'GBP', 'SGD', 'JPY', 'BRL', 'INR']
  },
  {
    id: 'gw-razorpay',
    name: 'Razorpay Global Enterprise',
    type: 'UPI, NetBanking & Corporate Cards',
    enabled: false,
    mode: 'test',
    apiKeyMasked: 'rzp_test_98******************211',
    transactionFee: '2.0%',
    settlementTime: 'T+3 business days',
    currencies: ['INR', 'USD']
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-1092',
    timestamp: '2026-10-09 08:31:04',
    actor: 'Workday Automated Sync Service',
    role: 'admin',
    action: 'BULK_USER_ENROLLMENT',
    ipAddress: '198.51.100.44',
    severity: 'info',
    details: 'Enrolled 12 newly onboarded employees from Strategic Operations into SOC2 and Workplace Safety courses.'
  },
  {
    id: 'aud-1091',
    timestamp: '2026-10-09 07:15:20',
    actor: 'Elena Rostova',
    role: 'learner',
    action: 'LESSON_COMPLETED',
    ipAddress: '192.0.2.89',
    severity: 'info',
    details: 'Completed lesson "1.2 Command of Evidence Questions" in Owly SAT Masterclass 2026.'
  },
  {
    id: 'aud-1090',
    timestamp: '2026-10-08 22:40:11',
    actor: 'Alexander Ross (CISO)',
    role: 'admin',
    action: 'SECURITY_POLICY_UPDATE',
    ipAddress: '198.51.100.12',
    severity: 'warning',
    details: 'Updated global session timeout to 30 minutes; enforced biometric/FIDO2 MFA for all Platform Admins.'
  },
  {
    id: 'aud-1089',
    timestamp: '2026-10-08 19:12:00',
    actor: 'Sarah Chen, M.Ed.',
    role: 'instructor',
    action: 'COURSE_SYLLABUS_UPDATE',
    ipAddress: '203.0.113.77',
    severity: 'info',
    details: 'Published new rubric update for Task 2 IELTS Academic speaking evaluation.'
  },
  {
    id: 'aud-1088',
    timestamp: '2026-10-08 14:02:44',
    actor: 'Stripe Webhook Gateway',
    role: 'admin',
    action: 'INVOICE_PAYMENT_PROCESSED',
    ipAddress: '54.187.205.23',
    severity: 'info',
    details: 'Invoice INV-2026-8841 settled for $14,850.00 via ACH direct debit.'
  },
  {
    id: 'aud-1087',
    timestamp: '2026-10-07 11:10:09',
    actor: 'Unknown IP / Gateway Watchdog',
    role: 'learner',
    action: 'FAILED_LOGIN_RATE_LIMIT',
    ipAddress: '198.51.100.188',
    severity: 'critical',
    details: 'Blocked 5 consecutive invalid authentication attempts on account david.miller@acme.corp. IP quarantined for 60 minutes.'
  }
];

export const allLearnersList = [
  { id: 'usr-901', name: 'Elena Rostova', email: 'elena.rostova@acme-global.corp', role: 'learner', department: 'Strategic Operations', progress: 84, compliance: 'Compliant', coursesEnrolled: 3 },
  { id: 'usr-902', name: 'Devon Takahashi', email: 'devon.t@acme-global.corp', role: 'learner', department: 'Cloud Infrastructure', progress: 92, compliance: 'Compliant', coursesEnrolled: 4 },
  { id: 'usr-903', name: 'Zainab Qasim', email: 'zainab.q@acme-global.corp', role: 'learner', department: 'Enterprise Sales', progress: 45, compliance: 'Due Soon', coursesEnrolled: 2 },
  { id: 'usr-904', name: 'Mateo Hernandez', email: 'mateo.h@acme-global.corp', role: 'learner', department: 'Legal & Risk Compliance', progress: 100, compliance: 'Compliant', coursesEnrolled: 5 },
  { id: 'usr-905', name: 'Ananya Sharma', email: 'ananya.s@acme-global.corp', role: 'instructor', department: 'Talent Development', progress: 100, compliance: 'Compliant', coursesEnrolled: 6 },
  { id: 'usr-906', name: 'Klaus Schmidt', email: 'klaus.s@acme-global.corp', role: 'learner', department: 'Product Design', progress: 28, compliance: 'Overdue', coursesEnrolled: 2 },
  { id: 'usr-907', name: 'Amara Okafor', email: 'amara.o@acme-global.corp', role: 'manager', department: 'HR & People Ops', progress: 78, compliance: 'Compliant', coursesEnrolled: 4 },
  { id: 'usr-908', name: 'Lucas Dubois', email: 'lucas.d@acme-global.corp', role: 'learner', department: 'Finance & FP&A', progress: 62, compliance: 'Compliant', coursesEnrolled: 3 }
];
