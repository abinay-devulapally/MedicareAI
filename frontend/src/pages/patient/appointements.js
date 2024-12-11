import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import axios from "axios";
import dayjs from "dayjs";

function Appointements() {
  console.log("IN Appointment Function");

  const currentUser = AuthService.getCurrentUser();

  // Local state to store appointments
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    console.log("Current User:", currentUser); // Debug current user

    const fetchAppointments = async () => {
      console.log("Fetching Appointments...");

      try {
        if (currentUser && currentUser.id) {
          const token = localStorage.getItem("token");
          console.log("Token:", token); // Debug token

          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const res = await axios.get(
            `http://localhost:8080/Appointments/getAll/${currentUser.id}`,
            config
          );

          console.log("Response from API:", res.data);

          setAppointments(res.data.appointments);
          setLoading(false);
        } else {
          console.log("User not logged in or no valid user ID.");
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
          <Link
            to={`/appointments/${app._id}`}
            className="btn btn-outline-primary take-btn"
          >
            View
          </Link>
        </td>
      </tr>
    ));

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="content">
          <div className="row doctor-grid">
            <div className="col-md-4 col-sm-4 col-lg-12"></div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title d-inline-block">
                    View Upcoming Appointments
                  </h4>
                  <Link
                    to="/appointments"
                    className="btn btn-primary float-right"
                  >
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

export default Appointements;

// With REDUCER STORE
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import AuthService from "../../services/auth.service";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAppointments } from "../../Js/actions/appointment";
// import dayjs from "dayjs";

// function Appointments() {
//   const currentUser = AuthService.getCurrentUser();

//   const dispatch = useDispatch();

//   // Access the appointments from the Redux store
//   const appointments = useSelector(
//     (state) => state.appointmentReducer.appointments
//   );

//   // You can log appointments to check if they are being received
//   console.log("Appointments from Redux store:", appointments);

//   useEffect(() => {
//     if (currentUser && currentUser.id) {
//       dispatch(GetAppointments(currentUser.id));
//     }
//   }, [dispatch, currentUser]);

//   const displayAppointments =
//     appointments &&
//     appointments.map((app) => (
//       <tr key={app._id}>
//         <td style={{ minWidth: 200 }}>
//           <div className="avatar">
//             {app.doctor && app.doctor.firstname.charAt(0)}
//           </div>
//           <h2>
//             Dr. {app.doctor.firstname} {app.doctor.lastname}
//           </h2>
//           <p>{app.doctor.hospital}</p>
//         </td>
//         <td>
//           <h5 className="time-title p-0">Specialization</h5>
//           <p>{app.doctor.specialization}</p>
//         </td>
//         <td>
//           <h5 className="time-title p-0">Timing</h5>
//           <p>
//             {dayjs(app.date).format("YYYY/MM/DD")} at {app.time}
//           </p>
//         </td>
//         <td className="text-right">
//           <Link
//             to={`/appointments/${app._id}`}
//             className="btn btn-outline-primary take-btn"
//           >
//             View
//           </Link>
//         </td>
//       </tr>
//     ));

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row doctor-grid">
//             <div className="col-md-4 col-sm-4 col-lg-12"></div>
//           </div>

//           <div className="row">
//             <div className="col-12 col-md-6 col-lg-12 col-xl-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title d-inline-block">
//                     Upcoming Appointments
//                   </h4>
//                 </div>
//                 <div className="card-body p-0">
//                   <div className="table-responsive">
//                     {appointments && appointments.length > 0 ? (
//                       <table className="table mb-0">
//                         <thead>
//                           <tr>
//                             <th>Doctor</th>
//                             <th>Specialization</th>
//                             <th>Timing</th>
//                             <th className="text-right">Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>{displayAppointments}</tbody>
//                       </table>
//                     ) : (
//                       <p className="text-center">No appointments found.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Appointments;

//ORGINAL
// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import AuthService from "../../services/auth.service";
// import { useDispatch, useSelector } from "react-redux";
// import { GetAppointments } from "../../Js/actions/appointment";
// import dayjs from "dayjs";

// function Appointments() {
//   const currentUser = AuthService.getCurrentUser();

//   // Get appointments
//   const dispatch = useDispatch();
//   const appointments = useSelector(
//     (state) => state.appointmentReducer.appointments
//   );

//   useEffect(() => {
//     if (currentUser && currentUser.id) {
//       dispatch(GetAppointments(currentUser.id));
//     }
//   }, [dispatch, currentUser]);

//   const displayAppointments =
//     appointments &&
//     appointments.map((app) => {
//       return (
//         <tr key={app._id}>
//           <td style={{ minWidth: 200 }}>
//             <div className="avatar">{app.doctor.firstname.charAt(0)}</div>
//             <h2>
//               Dr. {app.doctor.firstname} {app.doctor.lastname}
//             </h2>
//             <p>{app.doctor.hospital}</p> {/* Added hospital information */}
//           </td>
//           <td>
//             <h5 className="time-title p-0">Specialization</h5>
//             <p>{app.doctor.specialization}</p>
//           </td>
//           <td>
//             <h5 className="time-title p-0">Timing</h5>
//             <p>
//               {dayjs(app.date).format("YYYY/MM/DD")} at {app.time}
//             </p>
//           </td>
//           <td className="text-right">
//             <Link
//               to={`/appointments/${app._id}`}
//               className="btn btn-outline-primary take-btn"
//             >
//               View
//             </Link>
//           </td>
//         </tr>
//       );
//     });

//   return (
//     <div className="main-wrapper">
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row doctor-grid">
//             <div className="col-md-4 col-sm-4 col-lg-12"></div>
//           </div>

//           <div className="row">
//             <div className="col-12 col-md-6 col-lg-12 col-xl-12">
//               <div className="card">
//                 <div className="card-header">
//                   <h4 className="card-title d-inline-block">
//                     Upcoming Appointments
//                   </h4>
//                   <Link
//                     to="/appointments"
//                     className="btn btn-primary float-right"
//                   >
//                     View all
//                   </Link>
//                 </div>
//                 <div className="card-body p-0">
//                   <div className="table-responsive">
//                     <table className="table mb-0">
//                       <thead>
//                         <tr>
//                           <th>Doctor</th>
//                           <th>Specialization</th>
//                           <th>Timing</th>
//                           <th className="text-right">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>{displayAppointments}</tbody>
//                     </table>
//                     {(!appointments || appointments.length === 0) && (
//                       <p className="text-center">No appointments found.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Appointments;
