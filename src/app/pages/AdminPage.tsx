import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function AdminPage() {
  const { t } = useTranslation();
  const [packages, setPackages] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", type: "domestic", price: "", description: "", image: "" });
  const api = (path: string) => `${window.location.protocol}//${window.location.hostname}:4000/api${path}`;

  const fetchData = async () => {
    try {
      const [pRes, bRes] = await Promise.all([
        fetch(api('/packages')),
        fetch(api('/bookings')),
      ]);
      const [pJson, bJson] = await Promise.all([pRes.json(), bRes.json()]);
      setPackages(pJson);
      setBookings(bJson);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const createPackage = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(api('/packages'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
          title: form.title,
          type: form.type,
          price: Number(form.price || 0),
          description: form.description,
          image: form.image,
        })
      });
      if (res.ok) {
        setForm({ title: '', type: 'domestic', price: '', description: '', image: '' });
        fetchData();
      }
    } catch (err) { console.error(err); }
  };

  const updateBooking = async (id: string, status: string) => {
    try {
      await fetch(api(`/bookings/${id}`), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      fetchData();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Admin — Packages & Bookings</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <form onSubmit={createPackage} className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-4">Create package</h3>
          <input className="w-full mb-2 p-3 border rounded" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} />
          <select className="w-full mb-2 p-3 border rounded" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="custom">Custom</option>
          </select>
          <input className="w-full mb-2 p-3 border rounded" placeholder="Price" value={form.price} onChange={(e)=>setForm({...form,price:e.target.value})} />
          <input className="w-full mb-2 p-3 border rounded" placeholder="Image URL" value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} />
          <textarea className="w-full mb-2 p-3 border rounded" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
          <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Create</button>
        </form>

        <div className="p-6 bg-white rounded-xl shadow">
          <h3 className="font-semibold mb-4">Recent packages</h3>
          <div className="space-y-3">
            {packages.map((p)=> (
              <div key={p._id} className="p-3 border rounded flex items-center gap-3">
                <img src={p.image||'https://via.placeholder.com/80'} className="w-20 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{p.title}</div>
                  <div className="text-sm text-slate-500">{p.type} — ${p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl shadow">
        <h3 className="font-semibold mb-4">Bookings</h3>
        <div className="space-y-3">
          {bookings.map((b)=> (
            <div key={b._id} className="p-3 border rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{b.title} — {b.name}</div>
                <div className="text-sm text-slate-500">{b.phone} • {b.guests} guests • {new Date(b.bookedAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>updateBooking(b._id,'accepted')} className="px-3 py-1 bg-green-600 text-white rounded">Accept</button>
                <button onClick={()=>updateBooking(b._id,'rejected')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
