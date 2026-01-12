import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DoctorContext } from "../../../Context/DoctorContext";
import { assets } from "../../../assets_admin/assets";

const DoctorLogin = () => {
  const { setDToken, backendUrl } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const showPopup = (message, type = "error") => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2200);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/login",
        { email, password }
      );

      if (data.success) {
        localStorage.setItem("dToken", data.token);
        setDToken(data.token);
        showPopup("Welcome back, Doctor", "success");
        navigate("/doctor-dashboard");
      } else {
        showPopup(data.message);
      }
    } catch {
      showPopup("Server error. Please try again.");
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">

      {/* POPUP */}
      {popup.show && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white px-7 py-6 rounded-2xl shadow-2xl text-center w-[90%] max-w-sm">
            <p
              className={`text-lg font-semibold ${
                popup.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {popup.type === "success" ? "Login Successful" : "Login Failed"}
            </p>
            <p className="text-slate-600 mt-2 text-sm">
              {popup.message}
            </p>
          </div>
        </div>
      )}

      {/* LOGIN CARD */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl px-8 py-10"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center shadow-sm">
            <img
              src={assets.careOPD}
              alt="Care OPD"
              className="h-14 w-14 object-contain"
            />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center text-slate-900">
          Doctor Login
        </h1>
        <p className="text-sm text-slate-500 text-center mt-1 mb-8">
          Secure access to your clinical dashboard
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="doctor@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition"
        >
          Sign In
        </button>

        {/* FOOTER */}
        <p className="text-[11px] text-slate-400 text-center mt-6">
          Protected by enterprise-grade security
        </p>
      </form>
    </section>
  );
};

export default DoctorLogin;
