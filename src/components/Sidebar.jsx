import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets_admin/assets";
import { DoctorContext } from "../context/doctorContext";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  if (!dToken) return null;

  const doctorMenuItems = [
    { name: "Dashboard", icon: assets.home_icon, path: "/doctor-dashboard" },
    { name: "Appointments", icon: assets.appointment_icon, path: "/doctor-appointments" },
    { name: "Profile", icon: assets.people_icon, path: "/doctor-profile" },
  ];

  return (
    <aside
      className="
        fixed top-16 left-0
        w-16 md:w-64
        h-[calc(100vh-64px)]
        bg-white/80 backdrop-blur-xl
        border-r border-slate-200
        px-2 md:px-4
        py-6
        z-40
      "
    >
      {/* Section Label */}
      <p className="hidden md:block text-xs font-semibold text-slate-400 uppercase px-3 mb-4 tracking-wider">
        Doctor Panel
      </p>

      <ul className="flex flex-col gap-1">
        {doctorMenuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `
              group relative
              flex items-center gap-3
              px-3 py-2.5
              rounded-xl
              font-medium
              transition-all duration-200
              justify-center md:justify-start

              ${isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100"}
            `
            }
          >
            {/* Active indicator */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2
                h-6 w-1 rounded-r-full
                ${location.pathname === item.path ? "bg-blue-600" : "hidden"}
              `}
            />

            {/* Icon */}
            <div
              className={`
                w-5 h-5 flex items-center justify-center rounded-lg
                ${location.pathname === item.path
                  ? "bg-blue-600/10"
                  : "group-hover:bg-slate-200"}
              `}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-6 h-6 opacity-80"
              />
            </div>

            {/* Label */}
            <span className="hidden md:block text-sm">
              {item.name}
            </span>
          </NavLink>
        ))}
      </ul>

      {/* Bottom subtle footer */}
      <div className="hidden md:block absolute bottom-4 left-0 w-full px-4">
        <div className="text-xs text-slate-400 border-t pt-3">
          CareOPD • Doctor
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
