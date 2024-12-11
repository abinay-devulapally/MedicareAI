import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import axios from "axios";
import dayjs from "dayjs";

function Dashboard() {
  const currentUser = AuthService.getCurrentUser();

  // Local state to store appointments
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        if (currentUser && currentUser.id) {
          const res = await axios.get(
            `http://localhost:8080/Appointments/getAll/${currentUser.id}`,
            config
          );

          setAppointments(res.data.appointments);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  // Cancel appointment function
  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `http://localhost:8080/Appointments/delete/${id}`,
        config
      );

      // Remove the appointment from the state
      setAppointments(appointments.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error cancelling the appointment:", error);
      setError("Failed to cancel appointment");
    }
  };

  const displayAppointments =
    appointments &&
    appointments.map((app) => (
      <tr key={app._id}>
        <td style={{ minWidth: 200 }}>
          <div className="avatar">
            {app.doctor && app.doctor.firstname.charAt(0)}
          </div>
          <h2>
            Dr. {app.doctor.firstname} {app.doctor.lastname}
          </h2>
          <p>{app.doctor.hospital}</p>
        </td>
        <td>
          <h5 className="time-title p-0">Specialization</h5>
          <p>{app.doctor.specialization}</p>
        </td>
        <td>
          <h5 className="time-title p-0">Timing</h5>
          <p>
            {dayjs(app.date).format("YYYY/MM/DD")} at {app.time}
          </p>
        </td>
        <td className="text-right">
          <button
            onClick={() => cancelAppointment(app._id)}
            className="btn btn-outline-danger take-btn"
          >
            Cancel
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title d-inline-block">
                    Upcoming Appointments
                  </h4>{" "}
                  <Link to="#" className="btn btn-primary float-right">
                    View all
                  </Link>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    {loading ? (
                      <p className="text-center">Loading appointments...</p>
                    ) : error ? (
                      <p className="text-center text-danger">{error}</p>
                    ) : appointments && appointments.length > 0 ? (
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Timing</th>
                            <th className="text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>{displayAppointments}</tbody>
                      </table>
                    ) : (
                      <p className="text-center">No appointments found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// import React from 'react';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import AuthService from "../../services/auth.service";
// import {useDispatch , useSelector} from "react-redux"
// import  {GetAppointments }  from "../../Js/actions/appointment";
// import dayjs from "dayjs";

// function Dashboard() {
//   const currentUser = AuthService.getCurrentUser();
//   //get appointments
//   const dispatch = useDispatch();
//   const appointments = useSelector((state) => state.appointmentReducer.appointment);

//   const displayAppointments = appointments && appointments.map((app) => {

//     return (
//                         <tr>
//                           <td style={{minWidth: 200}}>
//                             <a className="avatar" href="profile.html">B</a>
//                             <h2><a href="profile.html">{app.Firstname} {app.Lastname} </a></h2>
//                           </td>
//                           <td>
//                             <h5 className="time-title p-0">Appointment With</h5>
//                             <p>Dr. {app.DoctorName}</p>
//                           </td>
//                           <td>
//                             <h5 className="time-title p-0">Timing</h5>
//                             <p>{dayjs(app.StartDate).format("YYYY/MM/DD hh:mm")}</p>
//                           </td>
//                           <td className="text-right">
//                             <a href="appointments.html" className="btn btn-outline-primary take-btn">Take up</a>
//                           </td>
//                         </tr>

//     )
//   })
//     const loadScript = (src) => {
//         return new Promise(function (resolve, reject) {
//           var script = document.createElement('script')
//           script.src = src
//           script.addEventListener('load', function () {
//             resolve()
//           })
//           script.addEventListener('error', function (e) {
//             reject(e)
//           })
//           document.body.appendChild(script)
//           document.body.removeChild(script)
//         })
//       }

//        useEffect(() => {
//         loadScript(`${process.env.PUBLIC_URL}assets/js/chart.js`)
//         dispatch(GetAppointments(currentUser.id));
//         })
//     return (
//         <div className="main-wrapper">

//         <div className="page-wrapper">
//         <div className="content">

//           <div className="row">
//             <div className="col-12 col-md-6 col-lg-12 col-xl-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title d-inline-block">Upcoming Appointments</h4> <a href="appointments.html" className="btn btn-primary float-right">View all</a>
//                 </div>
//                 <div className="card-body p-0">
//                   <div className="table-responsive">
//                     <table className="table mb-0">
//                       <thead className="d-none">
//                         <tr>
//                           <th>Patient Name</th>
//                           <th>Doctor Name</th>
//                           <th>Timing</th>
//                           <th className="text-right">Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                       {displayAppointments}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div >
//       </div>

//       </div>
//       </div>
//       </div>
//     );
// }

// export default Dashboard;
