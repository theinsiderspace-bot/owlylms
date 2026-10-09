import React, { useState } from 'react';
import { AuditLog } from '../types/lms';
import { initialAuditLogs } from '../data/mockData';
import { 
  ShieldCheck, ShieldAlert, Download, Search, Filter, 
  Lock, KeyRound, Server, AlertCircle, FileSpreadsheet, Check
} from 'lucide-react';
import { Translations } from '../translations';

interface SecurityAuditViewProps {
  t: Translations;
}

export const SecurityAuditView: React.FC<SecurityAuditViewProps> = ({ t }) => {
  const [logs, setLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'info' | 'warning' | 'critical'>('all');
  const [copiedExport, setCopiedExport] = useState(false);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Timestamp,Actor,Role,Action,IP_Address,Severity,Details\n';
    const rows = filteredLogs.map(l => 
      `"${l.id}","${l.timestamp}","${l.actor}","${l.role}","${l.action}","${l.ipAddress}","${l.severity}","${l.details.replace(/"/g, '""')}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `owly-lms-audit-trail-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Security Posture Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">SOC2 Type II Attestation</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">Certified</div>
          <div className="text-[11px] text-slate-400">Continuous automated controls audit</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Access Protocol</div>
          <div className="text-2xl font-black text-indigo-600 mt-1">SAML 2.0 + SCIM</div>
          <div className="text-[11px] text-slate-400">Okta & Azure AD SSO enforced</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Session Inactivity Lock</div>
          <div className="text-2xl font-black text-slate-900 mt-1">30 Minutes</div>
          <div className="text-[11px] text-slate-400">Auto sign-out with FIDO2 re-auth</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Encryption</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">AES-256 GCM</div>
          <div className="text-[11px] text-slate-400">Encrypted at rest & in transit</div>
        </div>
      </div>

      {/* Audit Logs Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">{t.auditLogs}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Immutable system events, security role alterations, and login telemetry.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search actor, IP, or action..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              {copiedExport ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
              <span>{copiedExport ? 'Exported!' : t.exportCsv}</span>
            </button>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-500 mr-2">Severity:</span>
          {(['all', 'info', 'warning', 'critical'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition-colors ${
                severityFilter === sev ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Actor / Service</th>
                <th className="py-3 px-6">Action</th>
                <th className="py-3 px-6">IP Address</th>
                <th className="py-3 px-6">Severity</th>
                <th className="py-3 px-6">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map(log => {
                let badgeClass = 'bg-slate-100 text-slate-600';
                if (log.severity === 'info') badgeClass = 'bg-indigo-50 text-indigo-700';
                if (log.severity === 'warning') badgeClass = 'bg-amber-50 text-amber-700';
                if (log.severity === 'critical') badgeClass = 'bg-rose-50 text-rose-700 font-bold';

                return (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      <div>{log.actor}</div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">{log.role}</div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[11px] font-semibold text-slate-800">
                      {log.action}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider ${badgeClass}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 max-w-md leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
