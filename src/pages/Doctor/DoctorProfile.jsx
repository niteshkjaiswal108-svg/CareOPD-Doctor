import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { AppContext } from "../../context/appContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, updateProfile } =
    useContext(DoctorContext);

  const { curreny } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  // Initialize edit mode
  const startEdit = () => {
    setEditData(JSON.parse(JSON.stringify(profileData))); // deep copy
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setEditData(null);
    setIsEdit(false);
  };

  const saveEdit = async () => {
    try {
      await updateProfile(editData);
      setProfileData(editData);
      setIsEdit(false);
      setEditData(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profileData) return null;

  const data = isEdit ? editData : profileData;

  return (
    <section className="flex-1 min-h-[calc(100dvh-64px)] overflow-y-auto bg-slate-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b bg-gradient-to-r from-blue-50 to-blue-100">
          <img
            src={data.image}
            alt="Doctor"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />

          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
            <p className="text-slate-600">
              {data.degree} • {data.speciality}
            </p>

            <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 shadow-sm">
              {data.experience} Experience
            </span>
          </div>
        </div>

        {/* ================= BODY ================= */}
        <div className="p-6 space-y-6">
          {/* About */}
          <div>
            <h2 className="font-semibold text-slate-800 mb-2">About</h2>
            {isEdit ? (
              <textarea
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-300 transition"
                rows={4}
                value={data.about}
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, about: e.target.value }))
                }
              />
            ) : (
              <p className="text-slate-600 leading-relaxed">
                {data.about || "No description provided."}
              </p>
            )}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Fees */}
            <div className="p-4 rounded-2xl bg-slate-50 border shadow-sm">
              <p className="text-sm text-slate-500">Appointment Fee</p>
              {isEdit ? (
                <input
                  type="number"
                  className="mt-2 w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-300 transition"
                  value={data.fees}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                />
              ) : (
                <p className="text-xl font-semibold mt-1 text-slate-900">
                  {curreny}
                  {data.fees}
                </p>
              )}
            </div>

            {/* Availability */}
            {/* Availability */}
            {/* Availability */}
            <div className="p-4 rounded-2xl bg-slate-50 border shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Availability</p>
                <p className="text-sm font-medium mt-1 text-slate-900">
                  {data.available ? "Available" : "Unavailable"}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.available}
                  onChange={async () => {
                    const updated = {
                      ...profileData,
                      available: !profileData.available,
                    };
                    setProfileData(updated);
                    await updateProfile(updated);
                  }}
                  className="sr-only peer"
                />

                {/* Track */}
                <div className="w-12 h-6 rounded-full bg-gray-200 peer-checked:bg-blue-600 transition"></div>

                {/* Thumb */}
                <div
                  className="
        absolute
        left-[2px]
        top-1/2
        -translate-y-1/2
        w-5 h-5
        bg-white
        rounded-full
        shadow
        transition-transform
        peer-checked:translate-x-6
      "
                ></div>
              </label>
            </div>
          </div>

          {/* Address */}
          <div className="p-4 rounded-2xl bg-slate-50 border shadow-sm space-y-2">
            <p className="text-sm text-slate-500">Clinic Address</p>
            {isEdit ? (
              <>
                <input
                  className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-300 transition"
                  value={data.address.line1}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-blue-300 transition"
                  value={data.address.line2}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <p className="text-slate-700">
                {data.address.line1}
                <br />
                {data.address.line2}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {isEdit ? (
              <>
                <button
                  onClick={cancelEdit}
                  className="px-6 py-2 rounded-2xl border font-medium text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={startEdit}
                className="px-6 py-2 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
