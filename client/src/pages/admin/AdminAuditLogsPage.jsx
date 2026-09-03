import React, { useState, useEffect } from 'react';
import { History, ShieldCheck, User } from 'lucide-react';
import { dashboardService } from '../../services/allServices';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await dashboardService.getAuditLogs();
        if (res.success && res.data) {
          setLogs(res.data.logs || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Security & Operational Audit Trail</h2>
        <p className="text-xs text-gray-500">Chronological history of admin actions, status transitions, and data edits.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400">Loading audit history...</div>
        ) : logs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">No audit logs recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">User</th>
                  <th className="py-3.5 px-6 font-semibold">Action</th>
                  <th className="py-3.5 px-6 font-semibold">Entity</th>
                  <th className="py-3.5 px-6 font-semibold">Details</th>
                  <th className="py-3.5 px-6 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-3.5 px-6 font-semibold text-gray-900">
                      {log.user?.name || log.user?.email || 'System'}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-mono text-[11px] uppercase font-bold text-gray-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 uppercase text-[11px] font-bold text-[#f29727]">
                      {log.entity}
                    </td>
                    <td className="py-3.5 px-6 text-gray-600 font-mono text-[11px] max-w-xs truncate">
                      {typeof log.details === 'object' ? JSON.stringify(log.details) : log.details || '-'}
                    </td>
                    <td className="py-3.5 px-6 text-gray-400 text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
