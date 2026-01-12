import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

/* ================= STYLE MAPS (TAILWIND SAFE) ================= */

const badgeStyles = {
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
};

const gradients = {
  blue: "from-blue-500 to-indigo-500",
  green: "from-emerald-500 to-teal-500",
  purple: "from-violet-500 to-purple-500",
};

/* ================= DASHBOARD ================= */

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment } =
    useContext(DoctorContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "--";
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    const [day, month, year] = dateStr.split("_");
    return `${day} ${months[month - 1]} ${year}`;
  };

  if (!dashData) return null;

  return (
  <div className="min-h-screen bg-slate-100">
    {/* NAVBAR */}
    <Navbar />

    <div className="flex">
      {/* SIDEBAR */}
      <aside className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] w-60">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md px-4 sm:px-6 lg:px-10 py-6">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Overview of your clinic activity
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <StatCard
            icon="calendar-days"
            label="Appointments"
            value={dashData.appointments}
            color="blue"
          />
          <StatCard
            icon="users"
            label="Patients"
            value={dashData.patients}
            color="green"
          />
          <StatCard
            icon="money-bill-wave"
            label="Revenue"
            value={`₹${dashData.earnings}`}
            color="purple"
          />
        </div>

        {/* ================= APPOINTMENTS ================= */}
        <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 flex items-center gap-3 border-b">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <FontAwesomeIcon icon="list" className="text-white text-sm" />
            </div>
            <h2 className="font-semibold text-slate-800">
              Latest Appointments
            </h2>
          </div>

          {/* List */}
          <div className="divide-y">
            {dashData.latestAppointments?.length ? (
              dashData.latestAppointments.map((item) => (
                <div
                  key={item._id}
                  className="
                    flex flex-col sm:flex-row
                    sm:items-center sm:justify-between
                    gap-4
                    px-4 sm:px-6
                    py-4
                  "
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData?.image}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">
                        {item.userData?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatDate(item.slotDate)} • {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 justify-end">
                    <StatusBadge item={item} />

                    {!item.cancelled && !item.isCompleted && (
                      <button
                        onClick={async () => {
                          await cancelAppointment(item._id);
                          getDashData();
                        }}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-red-50 hover:bg-red-100"
                      >
                        <FontAwesomeIcon
                          icon="xmark"
                          className="text-red-500 text-sm"
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-10 text-center text-sm text-slate-500">
                No recent appointments
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  </div>
);


};

export default DoctorDashboard;

/* ================= STATUS BADGE ================= */

const StatusBadge = ({ item }) => {
  if (item.isCompleted)
    return <Badge text="Completed" color="green" />;
  if (item.cancelled)
    return <Badge text="Cancelled" color="red" />;
  return <Badge text="Active" color="blue" />;
};

const Badge = ({ text, color }) => (
  <span
    className={`px-3 py-1 text-xs font-medium rounded-full ${badgeStyles[color]}`}
  >
    {text}
  </span>
);

/* ================= STAT CARD ================= */

const StatCard = ({ icon, label, value, color }) => (
  <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg border border-white/40 hover:scale-[1.02] transition">
    <div
      className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradients[color]}`}
    />

    <div className="relative p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[color]}
                    flex items-center justify-center shadow-md`}
      >
        <FontAwesomeIcon icon={icon} className="text-white text-lg" />
      </div>

      <div>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  </div>
);
