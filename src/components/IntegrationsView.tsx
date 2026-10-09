import React, { useState } from 'react';
import { HRISIntegration } from '../types/lms';
import { initialIntegrations } from '../data/mockData';
import { 
  Cpu, CheckCircle2, RefreshCw, Copy, ExternalLink, 
  Power, ShieldCheck, Database, ArrowRight, Check
} from 'lucide-react';
import { Translations } from '../translations';

interface IntegrationsViewProps {
  t: Translations;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({ t }) => {
  const [integrations, setIntegrations] = useState<HRISIntegration[]>(initialIntegrations);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [copiedWebhookId, setCopiedWebhookId] = useState<string | null>(null);

  const handleToggleConnection = (id: string) => {
    setIntegrations(integrations.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'connected' ? 'disconnected' : 'connected';
        return {
          ...item,
          status: nextStatus,
          mappedUsers: nextStatus === 'connected' ? 250 : 0
        };
      }
      return item;
    }));
  };

  const handleTriggerSync = (id: string) => {
    setSyncingId(id);

    setTimeout(() => {
      const now = new Date();
      const timeStr = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)} UTC`;

      setIntegrations(prev => prev.map(item => {
        if (item.id === id) {
          const newLog = {
            id: `log-${Date.now()}`,
            timestamp: timeStr,
            event: 'Manual Ad-Hoc Sync',
            status: 'success' as const,
            recordsProcessed: Math.floor(15 + Math.random() * 80),
            details: 'Employee compliance certificates pushed; 6 new hires synchronized to LMS roster.'
          };
          return {
            ...item,
            lastSync: timeStr,
            logs: [newLog, ...item.logs]
          };
        }
        return item;
      }));
      setSyncingId(null);
    }, 1200);
  };

  const handleCopyWebhook = (id: string, url: string) => {
    navigator.clipboard?.writeText?.(url);
    setCopiedWebhookId(id);
    setTimeout(() => setCopiedWebhookId(null), 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Value Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">{t.hrisIntegrations}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Bi-directional synchronization between Owly LMS and your corporate HRIS, payroll, and SSO platforms. Automatically provisions user seats, writes back compliance audit certifications, and tracks continuing education reimbursements.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>SCIM 2.0 & Webhooks Live</span>
          </span>
        </div>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map(integ => {
          const isConnected = integ.status === 'connected';
          const isSyncing = syncingId === integ.id;

          return (
            <div
              key={integ.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs flex flex-col justify-between transition-all ${
                isConnected ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-90'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-xs ${
                      isConnected ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {integ.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{integ.name}</h4>
                        <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                          {integ.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {isConnected ? (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Connected · {integ.mappedUsers} staff mapped
                          </span>
                        ) : (
                          <span className="text-slate-400">Disconnected</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Connect / Disconnect button */}
                  <button
                    onClick={() => handleToggleConnection(integ.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                      isConnected
                        ? 'border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                        : 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-4">
                  {integ.description}
                </p>

                {/* Webhook endpoint box */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Webhook Ingestion Endpoint</span>
                    <button
                      onClick={() => handleCopyWebhook(integ.id, integ.webhookUrl)}
                      className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                    >
                      {copiedWebhookId === integ.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="font-mono text-[11px] text-slate-700 truncate select-all">
                    {integ.webhookUrl}
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Manual Trigger */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500 text-[11px]">
                  Last synced: <strong className="text-slate-700">{integ.lastSync}</strong>
                </div>

                {isConnected && (
                  <button
                    onClick={() => handleTriggerSync(integ.id)}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg font-bold text-xs transition-colors shadow-xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : t.testSync}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sync Audit Trail Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">HRIS & Payroll Synchronization Audit Trail</h3>
          <p className="text-xs text-slate-500 mt-0.5">Real-time webhook and batch ingestion logs with record counts.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Event Type</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Records Transferred</th>
                <th className="py-3 px-6">Log Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {integrations.flatMap(i => i.logs).map((log, idx) => (
                <tr key={`${log.id}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    {log.event}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Success</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-mono font-semibold">
                    {log.recordsProcessed} users
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
