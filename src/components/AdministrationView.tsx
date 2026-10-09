import React, { useState } from 'react';
import { UserRole } from '../types/lms';
import { allLearnersList } from '../data/mockData';
import { 
  Users, UserPlus, Shield, Mail, CheckCircle2, 
  Search, Filter, Send, Download, Sparkles, ChevronRight, Check
} from 'lucide-react';
import { Translations } from '../translations';

interface AdministrationViewProps {
  t: Translations;
  onSelectRole: (role: UserRole) => void;
  currentRole: UserRole;
}

export const AdministrationView: React.FC<AdministrationViewProps> = ({
  t,
  onSelectRole,
  currentRole
}) => {
  const [learners, setLearners] = useState(allLearnersList);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Strategic Operations');
  const [newRole, setNewRole] = useState<UserRole>('learner');

  const departments = ['All', 'Strategic Operations', 'Cloud Infrastructure', 'Enterprise Sales', 'Legal & Risk Compliance', 'Talent Development', 'Finance & FP&A'];

  const filteredUsers = learners.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = departmentFilter === 'All' || u.department === departmentFilter;
    return matchSearch && matchDept;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const created = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newName,
      email: newEmail,
      role: newRole,
      department: newDept,
      progress: 0,
      compliance: 'Due Soon',
      coursesEnrolled: 1
    };

    setLearners([created, ...learners]);
    setShowAddUserModal(false);
    setNewName('');
    setNewEmail('');

    setNotificationToast(`Successfully enrolled ${created.name} and triggered automated welcome email & HRIS onboarding webhook.`);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleSendReminder = (userName: string) => {
    setNotificationToast(`Automated compliance reminder notification dispatched to ${userName}.`);
    setTimeout(() => setNotificationToast(null), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Role Administration Header & Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Managed Seats</div>
          <div className="text-3xl font-black text-slate-900 mt-2">{learners.length * 105}</div>
          <div className="text-xs text-slate-500 mt-2">450 allocated in current enterprise license</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Reminders</div>
          <div className="text-3xl font-black text-amber-600 mt-2">14</div>
          <div className="text-xs text-slate-500 mt-2">Automated email triggers queued</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Role Distribution</div>
          <div className="text-3xl font-black text-indigo-600 mt-2">4 Tiers</div>
          <div className="text-xs text-slate-500 mt-2">Learner, Instructor, HR Manager, Admin</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">HRIS Auto-Sync</div>
          <div className="text-3xl font-black text-emerald-600 mt-2">Enabled</div>
          <div className="text-xs text-slate-500 mt-2">Workday & BambooHR real-time hooks</div>
        </div>
      </div>

      {/* User Roster Management */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Controls Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">User Roster & Enrollment Administration</h3>
            <p className="text-xs text-slate-500 mt-0.5">Automate enrollments, role-based privileges, and compliance tracking.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff by name or email..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Add User Button */}
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll New User</span>
            </button>
          </div>
        </div>

        {/* Department Filter tabs */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-semibold text-slate-500 mr-2 shrink-0">Department:</span>
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setDepartmentFilter(d)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium shrink-0 transition-colors ${
                departmentFilter === d ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-6">Assigned Role</th>
                <th className="py-3 px-6">Department</th>
                <th className="py-3 px-6">Compliance Status</th>
                <th className="py-3 px-6">Curriculum Progress</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-slate-400 text-[11px] font-mono">{u.email}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-block px-2 py-0.5 rounded-sm text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="text-slate-600">{u.department}</span>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-md ${
                      u.compliance === 'Compliant' ? 'bg-emerald-50 text-emerald-700' :
                      u.compliance === 'Due Soon' ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      <span>{u.compliance}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-6">
                    <div className="w-24">
                      <div className="text-[11px] font-semibold text-slate-700 mb-0.5">{u.progress}%</div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${u.progress}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleSendReminder(u.name)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Send automated compliance email"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onSelectRole(u.role as UserRole)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                    >
                      Impersonate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Access Control (RBAC) Permissions Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-base">Enterprise Role-Based Access Control (RBAC) Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-4">System Capability / API Permission</th>
                <th className="py-2.5 px-4 text-center">Learner</th>
                <th className="py-2.5 px-4 text-center">Instructor</th>
                <th className="py-2.5 px-4 text-center">HR Manager</th>
                <th className="py-2.5 px-4 text-center">Platform Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-medium">Access Video Player & Take Quizzes</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Post to Forum & Direct Message Instructor</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Author Curricula & Grade Assessments</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">View Department Compliance & Sync to Workday</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Manage Invoices, Payment Gateways & Audit Logs</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-slate-300">-</td>
                <td className="py-2.5 px-4 text-center text-emerald-600 font-bold"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Enroll New User or Staff Member</h3>
            <p className="text-xs text-slate-500">The user will automatically receive an invitation email and be synced to your active HRIS roster.</p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="jordan.miller@acme-global.corp"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  {departments.filter(d => d !== 'All').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="learner">Learner (Student / Employee)</option>
                  <option value="instructor">Instructor (Course Author)</option>
                  <option value="manager">HR Manager (Compliance Lead)</option>
                  <option value="admin">Platform Admin (Superuser)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Confirm & Enroll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
