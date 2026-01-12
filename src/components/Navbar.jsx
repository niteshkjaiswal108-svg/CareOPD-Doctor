import React, { useContext } from "react";
import { assets } from "../assets_admin/assets";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/doctorContext";

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <nav
      className="
        fixed top-0 left-0
        w-full h-16
        px-6
        flex items-center justify-between
        bg-white/80 backdrop-blur-xl
        border-b border-slate-200
        z-50
      "
    >
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center">
          <img src={assets.careOPD} alt="CareOPD" className="h-5 w-5" />
        </div>

        <div className="flex flex-col leading-tight">
          <p className="text-base font-semibold text-slate-900 tracking-tight">
            CareOPD
          </p>
          <span
            className="
              inline-block text-[10px] font-semibold
              px-2 py-0.5 rounded-md
              bg-blue-50 text-blue-700
              w-fit
            "
          >
            Doctor Panel
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <button
        onClick={logoutHandler}
        className="
          px-4 py-2
          text-sm font-medium
          rounded-xl
          text-slate-600
          border border-slate-200
          hover:bg-slate-100
          hover:text-slate-900
          transition
        "
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
