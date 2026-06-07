import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router';
import { AdminAuthContext } from '../../contexts/AdminAuthContext';

export default function AdminLayout() {
  const { user, logout } = useContext(AdminAuthContext);
  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-white border-r p-4">
        <div className="font-bold mb-6">TravelCraft Admin</div>
        <nav className="space-y-2">
          <Link to="/admin" className="block px-3 py-2 rounded hover:bg-slate-50">Dashboard</Link>
          <Link to="/admin/packages" className="block px-3 py-2 rounded hover:bg-slate-50">Packages</Link>
          <Link to="/admin/payments" className="block px-3 py-2 rounded hover:bg-slate-50">Payments</Link>
          <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-slate-50">Users</Link>
        </nav>
        <div className="mt-6">
          <div className="text-sm text-slate-500">Signed in as</div>
          <div className="font-medium">{user?.email}</div>
          <button onClick={logout} className="mt-3 text-sm text-red-600">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
