import React, { useContext, useEffect, useState } from 'react';
import { AdminAuthContext } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../services/adminApi';

export default function AdminDashboard() {
  const { token } = useContext(AdminAuthContext);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setErr('No authentication token');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await adminFetch('/overview', token);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(errData.error || `API error: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
        setErr(null);
      } catch (e: any) {
        console.error('Dashboard error:', e);
        setErr(e.message || 'Failed to load dashboard data');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;
  if (err) return <div className="text-red-600 p-4 bg-red-50 rounded">{err}</div>;
  if (!data) return <div className="text-slate-500 p-4">No data available</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow border-l-4 border-blue-500">
          <div className="text-sm text-slate-500 font-medium">Total Users</div>
          <div className="text-3xl font-bold mt-2">{data.totalUsers ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow border-l-4 border-green-500">
          <div className="text-sm text-slate-500 font-medium">Total Packages</div>
          <div className="text-3xl font-bold mt-2">{data.totalPackages ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow border-l-4 border-purple-500">
          <div className="text-sm text-slate-500 font-medium">Total Bookings</div>
          <div className="text-3xl font-bold mt-2">{data.totalBookings ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded shadow border-l-4 border-yellow-500">
          <div className="text-sm text-slate-500 font-medium">Total Revenue</div>
          <div className="text-3xl font-bold mt-2">${data.totalRevenue ?? 0}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
        {data.recentBookings && data.recentBookings.length > 0 ? (
          <div className="space-y-3">
            {data.recentBookings.map((b: any) => (
              <div key={b.id} className="p-3 border rounded flex justify-between hover:bg-slate-50">
                <div>
                  <div className="font-medium">{b.title || 'N/A'} — {b.name || 'Unknown'}</div>
                  <div className="text-sm text-slate-500">{b.phone || 'N/A'} • {b.guests || 1} guests</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">${b.price || 0}</div>
                  <div className="text-xs text-slate-500">{new Date(b.booked_at).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-6">No recent bookings</div>
        )}
      </div>
    </div>
  );
}
