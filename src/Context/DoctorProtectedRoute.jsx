import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DoctorContext } from "./DoctorContext";

const DoctorProtectedRoute = ({ children }) => {
  const dToken = localStorage.getItem("dToken"); // only check doctor token
  return dToken ? children : <Navigate to="/doctor-login" />;
};

export default DoctorProtectedRoute