import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ClipboardList, ArrowRight, Trash2 } from "lucide-react";

interface BookingItem {
  id: number;
  type: "domestic" | "international" | "custom";
  title: string;
  price: number;
  name: string;
  phone: string;
  guests: number;
  bookedAt: string;
  days?: number;
}

export function DashboardPage() {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editGuests, setEditGuests] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("travelcraft_bookings") || "[]");
    setBookings(stored);
  }, []);

  const handleClearBooking = (id: number, type: string) => {
    const next = bookings.filter((item) => !(item.id === id && item.type === type));
    setBookings(next);
    localStorage.setItem("travelcraft_bookings", JSON.stringify(next));
  };

  const handleStartEdit = (booking: BookingItem) => {
    setEditingKey(`${booking.type}-${booking.id}`);
    setEditName(booking.name);
    setEditPhone(booking.phone);
    setEditGuests(booking.guests);
  };

  const handleSaveEdit = (booking: BookingItem) => {
    const updated = bookings.map((item) =>
      item.id === booking.id && item.type === booking.type
        ? { ...item, name: editName, phone: editPhone, guests: editGuests }
        : item,
    );
    setBookings(updated);
    localStorage.setItem("travelcraft_bookings", JSON.stringify(updated));
    setEditingKey(null);
  };

  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
        <div>
          <p className="text-xs sm:text-sm text-slate-500 uppercase tracking-[0.2em]">User dashboard</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Your Booked Travels</h1>
          <p className="text-slate-600 mt-3 md:mt-4 max-w-2xl text-sm sm:text-base">
            Manage your booked trips, review package details, and return to the travel gallery whenever you want.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 sm:p-6 text-white shadow-xl w-full sm:w-auto">
          <div className="text-sm uppercase opacity-80">Total bookings</div>
          <div className="text-3xl sm:text-4xl font-bold mt-2">{bookings.length}</div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-white/90 hover:text-white"
          >
            Back to home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">
          <ClipboardList className="mx-auto mb-6 w-12 h-12 text-slate-400" />
          <h2 className="text-3xl font-semibold mb-3">No bookings yet</h2>
          <p className="text-slate-500 mb-6">Choose a tour and click Book to add it to your dashboard.</p>
          <Link
            to="/domestic-travel"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
          >
            Browse domestic packages
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const bookingKey = `${booking.type}-${booking.id}`;
            const isEditing = editingKey === bookingKey;

            return (
              <div key={bookingKey} className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">
                      {booking.type === "domestic"
                        ? "Domestic"
                        : booking.type === "international"
                        ? "International"
                        : "Custom"}
                    </p>
                    <h3 className="text-2xl font-semibold text-slate-900">{booking.title}</h3>
                    <p className="text-slate-500 mt-2">Booked on {new Date(booking.bookedAt).toLocaleDateString()}</p>
                    <p className="mt-4 text-slate-600">Booked by: <span className="font-semibold text-slate-900">{booking.name || "—"}</span></p>
                    <p className="text-slate-600">Phone: <span className="font-semibold text-slate-900">{booking.phone || "—"}</span></p>
                    <p className="text-slate-600">Guests: <span className="font-semibold text-slate-900">{booking.guests}</span></p>
                    {booking.days !== undefined && (
                      <p className="text-slate-600">Days: <span className="font-semibold text-slate-900">{booking.days}</span></p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end">
                    <span className="rounded-2xl bg-slate-100 px-4 py-3 text-slate-700 font-semibold">${booking.price}</span>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => isEditing ? handleSaveEdit(booking) : handleStartEdit(booking)}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                      >
                        {isEditing ? "Save" : "Edit"}
                      </button>
                      <button
                        onClick={() => handleClearBooking(booking.id, booking.type)}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm">
                      Name
                      <input
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm">
                      Phone
                      <input
                        value={editPhone}
                        onChange={(event) => setEditPhone(event.target.value)}
                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm sm:col-span-2">
                      Guests
                      <input
                        type="number"
                        min={1}
                        value={editGuests}
                        onChange={(event) => setEditGuests(Number(event.target.value))}
                        className="rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
