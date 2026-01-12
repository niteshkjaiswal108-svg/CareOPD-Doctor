import React, { useContext, useEffect, useMemo } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { AppContext } from '../../context/appContext'
import { assets } from '../../assets_admin/assets'

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment
  } = useContext(DoctorContext)

  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getAppointments()

    const interval = setInterval(() => {
      if (dToken) getAppointments()
    }, 5000)

    return () => clearInterval(interval)
  }, [dToken])

  /* ================= SORT LATEST FIRST ================= */
  const sortedAppointments = useMemo(() => {
    if (!appointments) return []

    return [...appointments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [appointments])

  /* ================= FORMAT DATE ================= */
  const formatDate = (dateStr) => {
    if (!dateStr) return '--'
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const [day, month, year] = dateStr.split('_')
    return `${day.padStart(2,'0')} ${months[Number(month)-1]} ${year}`
  }

  /* ================= ACTION HANDLERS ================= */
  const handleCancel = async (id) => {
    await cancelAppointment(id)
    getAppointments()
  }

  const handleComplete = async (id) => {
    await completeAppointment(id)
    getAppointments()
  }

  /* ================= STATUS BADGE ================= */
  const StatusBadge = ({ item }) => {
    if (item.isCompleted)
      return <Badge text="Completed" color="green" />
    if (item.cancelled)
      return <Badge text="Cancelled" color="red" />
    return <Badge text="Active" color="blue" />
  }

  const Badge = ({ text, color }) => (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-${color}-100 text-${color}-700`}>
      {text}
    </span>
  )

  return (
    <section className="w-full min-h-[calc(100vh-64px)] bg-slate-50 px-4 sm:px-6 py-8">
      <div className="max-w-7xl px-3 mx-auto space-y-8">

        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 text-sm">Latest bookings appear on top</p>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* TABLE HEADER */}
          <div className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_1.5fr_1fr_1.5fr] px-6 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-3xl">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          {/* TABLE BODY */}
          <div className="divide-y max-h-[60vh] overflow-y-auto">
            {sortedAppointments.length > 0 ? sortedAppointments.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_1.5fr_1fr_1.5fr] items-center px-6 py-4 hover:bg-blue-50 transition rounded-none"
              >
                <p className="text-slate-700">{index + 1}</p>

                <div className="flex items-center gap-3">
                  <img src={item.userData?.image} alt="patient" className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200" />
                  <p className="font-semibold text-slate-900">{item.userData?.name}</p>
                </div>

                <p className="text-slate-600">{item.payment ? 'Online' : 'Cash'}</p>
                <p className="text-slate-600">{calculateAge(item.userData?.dob) || '--'}</p>

                <div className="text-slate-600 text-sm">
                  {formatDate(item.slotDate)}<br />
                  <span className="text-xs">{item.slotTime}</span>
                </div>

                <p className="font-semibold text-slate-900">₹{item.amount}</p>

                {/* ACTIONS */}
                <div className="flex gap-3 items-center">
                  {!item.cancelled && !item.isCompleted ? (
                    <>
                      <button onClick={() => handleComplete(item._id)} className="p-2 rounded-full hover:bg-green-100 transition">
                        <img src={assets.tick_icon} alt="complete" className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleCancel(item._id)} className="p-2 rounded-full hover:bg-red-100 transition">
                        <img src={assets.cancel_icon} alt="cancel" className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <StatusBadge item={item} />
                  )}
                </div>
              </div>
            )) : (
              <p className="py-12 text-center text-slate-500">No appointments yet</p>
            )}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {sortedAppointments.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-md p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <img src={item.userData?.image} alt="patient" className="w-12 h-12 rounded-full ring-1 ring-slate-200" />
                  <div>
                    <p className="font-semibold text-slate-900">{item.userData?.name}</p>
                    <p className="text-xs text-slate-600">Age: {calculateAge(item.userData?.dob)}</p>
                  </div>
                </div>
                <StatusBadge item={item} />
              </div>

              <div className="grid grid-cols-2 text-sm gap-2 text-slate-700">
                <p>Date: {formatDate(item.slotDate)}</p>
                <p>Time: {item.slotTime}</p>
                <p>Payment: {item.payment ? 'Online' : 'Cash'}</p>
                <p>Fees: ₹{item.amount}</p>
              </div>

              {!item.cancelled && !item.isCompleted && (
                <div className="flex justify-end gap-4 border-t pt-3">
                  <button onClick={() => handleComplete(item._id)} className="p-2 rounded-full hover:bg-green-100 transition">
                    <img src={assets.tick_icon} alt="complete" className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleCancel(item._id)} className="p-2 rounded-full hover:bg-red-100 transition">
                    <img src={assets.cancel_icon} alt="cancel" className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default DoctorAppointment
