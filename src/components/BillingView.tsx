import React, { useState } from 'react';
import { Invoice, PaymentGateway } from '../types/lms';
import { initialInvoices, initialPaymentGateways } from '../data/mockData';
import { 
  CreditCard, FileText, CheckCircle2, Download, Printer, 
  Plus, ExternalLink, ShieldCheck, DollarSign, ArrowUpRight, 
  X, Check, Settings2, SlidersHorizontal
} from 'lucide-react';
import { Translations } from '../translations';

interface BillingViewProps {
  t: Translations;
}

export const BillingView: React.FC<BillingViewProps> = ({ t }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [gateways, setGateways] = useState<PaymentGateway[]>(initialPaymentGateways);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showGenerateModal, setShowGenerateModal] = useState<boolean>(false);

  // Seat slider state
  const [allocatedSeats, setAllocatedSeats] = useState<number>(500);
  const usedSeats = 450;
  const costPerSeat = 28;

  // New Invoice form state
  const [newInvSeats, setNewInvSeats] = useState<number>(50);
  const [newInvNotes, setNewInvNotes] = useState<string>('Additional OwlySAT Exam Prep 50-Seat Bundle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleGateway = (gwId: string) => {
    setGateways(gateways.map(gw => {
      if (gw.id === gwId) {
        return { ...gw, enabled: !gw.enabled };
      }
      return gw;
    }));
  };

  const handleToggleGatewayMode = (gwId: string) => {
    setGateways(gateways.map(gw => {
      if (gw.id === gwId) {
        return { ...gw, mode: gw.mode === 'live' ? 'test' : 'live' };
      }
      return gw;
    }));
  };

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = newInvSeats * 28;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const dueDateStr = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);

    const newInvoice: Invoice = {
      id: `INV-2026-${Math.floor(8900 + Math.random() * 1000)}`,
      date: dateStr,
      dueDate: dueDateStr,
      amount: amount,
      currency: 'USD',
      status: 'pending',
      seatsBilled: newInvSeats,
      tier: 'Enterprise Add-On License',
      paymentMethod: 'Auto-Debit via Stripe ACH',
      billingContact: 'CFO Office - finance@acme-global.corp',
      items: [
        {
          description: newInvNotes,
          quantity: newInvSeats,
          unitPrice: 28.00,
          total: amount
        }
      ]
    };

    setInvoices([newInvoice, ...invoices]);
    setShowGenerateModal(false);
    setToastMessage(`Invoice ${newInvoice.id} generated successfully and dispatched to billing contact.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-8">
      
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Corporate Plan Overview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-sm">
              Active Tier: Enterprise Global Suite
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Auto-Renew Active (Net 30)
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900">Seat Utilization & Capacity Management</h3>
          <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
            Your organization currently utilizes <strong>{usedSeats}</strong> out of <strong>{allocatedSeats}</strong> provisioned corporate seats. Bi-directional sync with Workday automatically reclaims licenses when employees change departments.
          </p>

          {/* Seat Progress Bar */}
          <div className="space-y-1.5 pt-2 max-w-md">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{usedSeats} Seats In Use</span>
              <span className="text-indigo-600">{Math.round((usedSeats / allocatedSeats) * 100)}% Capacity</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${(usedSeats / allocatedSeats) * 100}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400">
              {allocatedSeats - usedSeats} unassigned seats remaining for new hires
            </div>
          </div>
        </div>

        {/* Right Financial Counter */}
        <div className="lg:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
          <div className="text-xs font-semibold text-slate-500">Current Monthly Invoicing</div>
          <div className="text-3xl font-black text-slate-900">${(usedSeats * costPerSeat).toLocaleString()}.00</div>
          <div className="text-[11px] text-slate-500">
            $28.00 / seat / month (Includes SAT & IELTS Prep Simulator Add-ons)
          </div>

          <button
            onClick={() => setShowGenerateModal(true)}
            className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.generateInvoice}</span>
          </button>
        </div>
      </div>

      {/* Payment Gateway Configurations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">{t.paymentGateways}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure settlement rails for automated invoicing, enterprise procurement card processing, and employee self-service exam stipends.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">TLS 1.3 / PCI-DSS L1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gateways.map(gw => (
            <div key={gw.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{gw.name}</h4>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm ${
                      gw.mode === 'live' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {gw.mode}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{gw.type}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleGatewayMode(gw.id)}
                    className="text-[10px] text-slate-500 hover:text-slate-900 underline font-mono"
                  >
                    Toggle {gw.mode === 'live' ? 'Test' : 'Live'}
                  </button>
                  <button
                    onClick={() => handleToggleGateway(gw.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                      gw.enabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {gw.enabled ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-400">Processing Fee:</span> <strong>{gw.transactionFee}</strong>
                </div>
                <div>
                  <span className="text-slate-400">Settlement:</span> <strong>{gw.settlementTime}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">API Key:</span> <span className="font-mono text-slate-700">{gw.apiKeyMasked}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoicing Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">{t.invoicesTitle}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Automated admin billing records, downloadable PDFs, and ACH receipts.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Invoice ID</th>
                <th className="py-3 px-6">Date Issued</th>
                <th className="py-3 px-6">Due Date</th>
                <th className="py-3 px-6">Seats Covered</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-6 font-mono text-slate-600">
                    {inv.date}
                  </td>
                  <td className="py-3.5 px-6 font-mono text-slate-600">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 px-6 font-semibold">
                    {inv.seatsBilled} seats
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                    ${inv.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className={`inline-flex items-center gap-1 font-semibold text-[11px] px-2 py-0.5 rounded-md ${
                      inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {inv.status === 'paid' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span className="capitalize">{inv.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right space-x-2">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8">
            {/* Header controls (Hidden on print) */}
            <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <div className="font-bold text-sm">Invoice Details · {selectedInvoice.id}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-medium transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Invoice Printable Sheet */}
            <div className="p-8 sm:p-10 space-y-6 bg-white text-slate-800 text-xs">
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-xl">
                    <span>🦉</span>
                    <span>OWLY LMS</span>
                  </div>
                  <div className="text-slate-500 mt-1">Owly Enterprise Learning Technologies Inc.</div>
                  <div className="text-slate-500">100 Cyberway Blvd, Suite 400</div>
                  <div className="text-slate-500">San Francisco, CA 94105</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900 uppercase">INVOICE</div>
                  <div className="font-mono font-bold text-slate-600 mt-1">{selectedInvoice.id}</div>
                  <div className="text-slate-500 mt-1">Date: {selectedInvoice.date}</div>
                  <div className="text-slate-500">Due: {selectedInvoice.dueDate}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 py-2">
                <div>
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Billed To:</div>
                  <div className="font-bold text-slate-900 text-sm mt-1">Acme Global Technologies Inc.</div>
                  <div className="text-slate-600">Contact: {selectedInvoice.billingContact}</div>
                  <div className="text-slate-600">Tax ID: US-EIN 94-8829103</div>
                </div>

                <div>
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Payment Details:</div>
                  <div className="font-bold text-slate-900 text-sm mt-1">{selectedInvoice.paymentMethod}</div>
                  <div className="text-slate-600">Status: <strong className="text-emerald-600 uppercase">{selectedInvoice.status}</strong></div>
                  <div className="text-slate-600">Currency: {selectedInvoice.currency}</div>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                    <tr>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4 text-center">Qty / Seats</th>
                      <th className="py-2.5 px-4 text-right">Unit Rate</th>
                      <th className="py-2.5 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {selectedInvoice.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-medium text-slate-900">{item.description}</td>
                        <td className="py-3 px-4 text-center font-mono">{item.quantity}</td>
                        <td className="py-3 px-4 text-right font-mono">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-1.5 text-right">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (0.0% Enterprise Exemption):</span>
                    <span className="font-mono">$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-slate-900 border-t border-slate-200 pt-2">
                    <span>Total Due:</span>
                    <span className="font-mono font-black text-indigo-600">${selectedInvoice.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 text-center">
                Automated invoice generated by OwlyLMS Enterprise Billing Engine. For inquiries, email billing@owly-lms.com.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Custom Invoice Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Generate Custom Corporate Invoice</h3>
            <p className="text-xs text-slate-500">Issue an invoice for additional seats or Exam Hub prep packages.</p>

            <form onSubmit={handleGenerateInvoice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Additional Seats Count</label>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  value={newInvSeats}
                  onChange={(e) => setNewInvSeats(Number(e.target.value))}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Line Item Description</label>
                <input
                  type="text"
                  required
                  value={newInvNotes}
                  onChange={(e) => setNewInvNotes(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-600">Estimated Total ($28/seat):</span>
                <span className="font-mono font-black text-slate-900 text-sm">${(newInvSeats * 28).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
