import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DoctorLogin from "./pages/Doctor/Auth/DoctorLogin";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorProtectedRoute from "./context/doctorProtectedRoute";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { DoctorContext } from "./context/doctorContext";

export default function App() {
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      {/* Show Navbar + Sidebar ONLY if logged in */}
      {dToken && <Navbar />}

      <div className={`flex ${dToken ? "pt-16" : ""}`}>
        {dToken && <Sidebar />}

        <main
          className={`
            flex-1
            ${dToken ? "ml-16 md:ml-60" : ""}
            min-h-screen
            bg-slate-50
          `}
        >
          <Routes>
            {/* ROOT REDIRECT */}
            <Route
              path="/"
              element={
                dToken ? (
                  <Navigate to="/doctor-dashboard" />
                ) : (
                  <Navigate to="/doctor-login" />
                )
              }
            />

            {/* LOGIN */}
            <Route
              path="/doctor-login"
              element={
                dToken ? (
                  <Navigate to="/doctor-dashboard" />
                ) : (
                  <DoctorLogin />
                )
              }
            />

            {/* PROTECTED ROUTES */}
            <Route
              path="/doctor-dashboard"
              element={
                <DoctorProtectedRoute>
                  <DoctorDashboard />
                </DoctorProtectedRoute>
              }
            />

            <Route
              path="/doctor-appointments"
              element={
                <DoctorProtectedRoute>
                  <DoctorAppointment />
                </DoctorProtectedRoute>
              }
            />

            <Route
              path="/doctor-profile"
              element={
                <DoctorProtectedRoute>
                  <DoctorProfile />
                </DoctorProtectedRoute>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

