import React from 'react';
import { Award, CheckCircle2, Download, Printer, X, ShieldCheck, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  courseTitle: string;
  studentName: string;
  issueDate: string;
  certificateId: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  courseTitle,
  studentName,
  issueDate,
  certificateId,
  onClose
}) => {
  React.useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Header Controls (Hidden on print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-semibold text-sm tracking-wide">Official Verified Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                alert('Verification link copied to clipboard!');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Credential</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-linear-to-b from-amber-50/40 via-white to-amber-50/30">
          <div className="border-8 border-double border-amber-800/30 p-8 sm:p-12 rounded-xl text-center relative bg-white shadow-inner">
            {/* Watermark seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-md">
                🦉
              </div>
              <div className="text-left">
                <div className="text-xl font-black tracking-wider text-slate-900">OWLY ACADEMY</div>
                <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Enterprise Learning System</div>
              </div>
            </div>

            <div className="mt-6 mb-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
              Certificate of Academic & Professional Achievement
            </div>

            <p className="text-sm text-slate-600 italic">This certifies that</p>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 my-4 tracking-tight border-b-2 border-amber-600/30 inline-block px-8 pb-1">
              {studentName}
            </h2>

            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mt-2">
              has successfully fulfilled all curriculum requirements, continuous assessment standards, and knowledge verifications for:
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 my-4 max-w-2xl mx-auto">
              {courseTitle}
            </h3>

            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Issued in full accordance with continuous professional competency standards and validated through the Owly LMS decentralized credential verification protocol.
            </p>

            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              <div className="text-center sm:text-left">
                <div className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1 inline-block">
                  Dr. Marcus Vance
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">Academic Dean & Provost</div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-amber-600 bg-amber-50 flex items-center justify-center text-amber-700 shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-bold tracking-wider text-amber-800 uppercase mt-1">Verified Credential</span>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-xs text-slate-500">Issue Date: <strong className="text-slate-800">{issueDate}</strong></div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">ID: {certificateId}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info (Hidden on print) */}
        <div className="no-print px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <span>Digital signature cryptographically signed & verified</span>
          </div>
          <div>
            Syncs to Workday & BambooHR automatically
          </div>
        </div>
      </div>
    </div>
  );
};
