'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

const cancelReasons = [
  'Schedule conflict — please reschedule',
  'Team unavailable on requested date/time',
  'Requested time slot not available',
  'Insufficient information provided',
  'Outside our service scope',
  'Custom reason (write below)',
];

function CancelForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [customerData, setCustomerData] = useState<Record<string, string> | null>(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      try {
        // base64url → base64 → decode
        const base64 = token.replace(/-/g, '+').replace(/_/g, '/');
        const decoded = JSON.parse(atob(base64));
        setCustomerData(decoded);
      } catch {
        setError('Invalid or expired link.');
      }
    }
  }, [token]);

  const finalReason = selectedReason === 'Custom reason (write below)' ? customReason : selectedReason;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalReason.trim()) { setError('Please provide a cancellation reason.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel', ...customerData, cancelReason: finalReason }),
      });
      const data = await res.json();
      if (data.success) setDone(true);
      else setError('Failed to send cancellation email. Please try again.');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token || error === 'Invalid or expired link.') {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Invalid Link</h2>
          <p className="text-gray-500 text-sm">This cancellation link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Cancellation Sent</h2>
          <p className="text-gray-500 text-sm">
            A cancellation email with your reason has been sent to <strong>{customerData?.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-7 text-center">
          <div className="text-4xl mb-2">❌</div>
          <h1 className="text-xl font-bold text-white">Cancel Meeting</h1>
          <p className="text-red-200 text-sm mt-1">Provide a reason — it will be sent to the customer</p>
        </div>

        {/* Customer Info */}
        {customerData && (
          <div className="px-7 pt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Meeting Being Cancelled</p>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400 text-xs">Customer</span><p className="font-semibold text-gray-800">{customerData.fullName}</p></div>
              <div><span className="text-gray-400 text-xs">Email</span><p className="font-semibold text-gray-800 truncate">{customerData.email}</p></div>
              <div><span className="text-gray-400 text-xs">Date</span><p className="font-semibold text-gray-800">{customerData.preferredDate}</p></div>
              <div><span className="text-gray-400 text-xs">Time</span><p className="font-semibold text-gray-800">{customerData.preferredTime}</p></div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Select Cancellation Reason <span className="text-red-500">*</span></p>
            <div className="space-y-2">
              {cancelReasons.map(reason => (
                <label key={reason} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition text-sm ${selectedReason === reason ? 'border-red-400 bg-red-50 text-red-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <input
                    type="radio" name="reason" value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="accent-red-500 shrink-0"
                  />
                  {reason}
                </label>
              ))}
            </div>
          </div>

          {selectedReason === 'Custom reason (write below)' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Reason <span className="text-red-500">*</span></label>
              <textarea
                value={customReason}
                onChange={e => setCustomReason(e.target.value)}
                rows={4}
                placeholder="Write the cancellation reason that will be sent to the customer..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 resize-none transition"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold rounded-xl py-3.5 text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending Cancellation...</>
            ) : (
              <>❌ Send Cancellation Email to Customer</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CancelMeetingPage() {
  return (
    <Suspense>
      <CancelForm />
    </Suspense>
  );
}
