// DoctorContext.jsx
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext(null);

export const DoctorContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false)

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) setAppointments(data.appointments);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) setDashData(data.dashData);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/profile', {headers: {
        Authorization: `Bearer ${dToken}`
      }})
      if (data.success) {
        setProfileData(data.data)
        console.log(data.data)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

const updateProfile = async (data) => {
  try {
    const res = await axios.post(`${backendUrl}/api/doctor/update-profile`, data, {
      headers: { Authorization: `Bearer ${dToken}` },
    });

    if (res.data.success) {
      toast.success("Profile updated");

      // Fetch fresh data immediately
      const profileRes = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      setProfileData(profileRes.data.data);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Update failed");
  }
};

  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
    getAppointments,
    getProfileData,
    updateProfile, profileData, 
    setProfileData
  };

  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};
