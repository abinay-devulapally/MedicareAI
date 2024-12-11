const { getDistance } = require("geolib"); // Make sure to import getDistance
const Appointment = require("../models/appointement");
const { doctors } = require("../config/doctors");
const moment = require("moment"); // Importing the doctors list

// Get all appointments for a user
const get_appointment = async (req, res) => {
  const userId = req.params.id;
  try {
    const appointments = await Appointment.find({ user: userId });
    res.status(200).send({ msg: "appointments", appointments });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Create a new appointment
const appointment_create_post = async (req, res) => {
  const userId = req.params.id;
  const { specialty, date, time, userLat, userLng } = req.body;

  try {
    // Find doctors with the required specialty
    const availableDoctors = doctors.filter(
      (doctor) => doctor.specialty.toLowerCase() === specialty.toLowerCase()
    );

    if (availableDoctors.length === 0) {
      return res.status(404).json({ msg: `No doctors found for ${specialty}` });
    }

    // Find the nearest doctor based on user location
    let nearestDoctor = null;
    let nearestDistance = Number.MAX_VALUE;

    availableDoctors.forEach((doctor) => {
      const distance = getDistance(
        { latitude: userLat, longitude: userLng },
        { latitude: doctor.location.lat, longitude: doctor.location.lng }
      );
      if (distance < nearestDistance) {
        nearestDoctor = doctor;
        nearestDistance = distance;
      }
    });

    if (!nearestDoctor) {
      return res
        .status(404)
        .json({ msg: "No doctor available near your location" });
    }

    // Check doctor's availability for the selected day of the week
    const appointmentDay = moment(date).format("dddd"); // Get the day of the week (e.g., "Monday")
    if (!nearestDoctor.availability.includes(appointmentDay)) {
      return res.status(400).json({
        msg: `Dr. ${nearestDoctor.firstname} ${nearestDoctor.lastname} is not available on ${appointmentDay}`,
      });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      user: userId,
      doctor: {
        id: nearestDoctor.id,
        firstname: nearestDoctor.firstname,
        lastname: nearestDoctor.lastname,
        specialization: nearestDoctor.specialty,
        hospital: nearestDoctor.hospital,
        experience: nearestDoctor.experience,
        rating: nearestDoctor.rating,
      },
      date,
      time,
      status: "Confirmed", // You can customize status as needed
    });

    res
      .status(201)
      .json({ msg: "Appointment created successfully", appointment });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
};

// Delete an appointment
const appointment_delete = async (req, res) => {
  const id = req.params.id;

  try {
    await Appointment.findByIdAndDelete(id);
    res.json({ msg: "Appointment deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// Update an appointment
const UpdateAppointment = async (req, res) => {
  try {
    const result = await Appointment.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );

    if (result.modifiedCount) {
      return res.send({ msg: "Appointment updated" });
    }
    res.send({ msg: "No changes made to the appointment" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Cannot modify the appointment" });
  }
};

// Get a specific appointment by ID
const get_one_appointment = async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await Appointment.findById(id);
    res.status(200).send({ msg: "appointment", appointment });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Add location (for testing or future functionality)
const addlocation = async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const loc = await Location.create({ lat, lng });
    res.status(201).json({ location: loc });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: err });
  }
};

module.exports = {
  appointment_create_post,
  appointment_delete,
  get_appointment,
  UpdateAppointment,
  get_one_appointment,
  addlocation,
};

//Update 1
// const Appointment = require("../models/appointement");
// const Location = require("../models/location");

// // Get all appointments for a user
// const get_appointment = async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const appointments = await Appointment.find({ user: userId });
//     res.status(200).send({ msg: "appointments", appointments });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

// // Create a new appointment
// const appointment_create_post = async (req, res) => {
//   const userId = req.params.id;
//   const { doctor, date, time, status } = req.body;

//   try {
//     // Create the appointment
//     const appointment = await Appointment.create({
//       user: userId,
//       doctor,
//       date,
//       time,
//       status: status || "Pending",
//     });

//     res.status(201).json({ appointment });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ errors: err });
//   }
// };

// // Delete an appointment
// const appointment_delete = async (req, res) => {
//   const id = req.params.id;

//   try {
//     await Appointment.findByIdAndDelete(id);
//     res.json({ msg: "Appointment deleted" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err);
//   }
// };

// // Update an appointment
// const UpdateAppointment = async (req, res) => {
//   try {
//     const result = await Appointment.updateOne(
//       { _id: req.params.id },
//       { $set: { ...req.body } }
//     );

//     if (result.modifiedCount) {
//       return res.send({ msg: "Appointment updated" });
//     }
//     res.send({ msg: "No changes made to the appointment" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ msg: "Cannot modify the appointment" });
//   }
// };

// // Get a specific appointment by ID
// const get_one_appointment = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const appointment = await Appointment.findById(id);
//     res.status(200).send({ msg: "appointment", appointment });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

// const addlocation = async (req, res) => {
//   const { lat, lng } = req.body;

//   try {
//     const loc = await Location.create({ lat, lng });
//     res.status(201).json({ location: loc });
//   } catch (err) {
//     const errors = handleErrors(err);
//     res.status(400).json({ errors });
//   }
// };

// module.exports = {
//   appointment_create_post,
//   appointment_delete,
//   get_appointment,
//   UpdateAppointment,
//   get_one_appointment,
//   addlocation,
// };

//Update 0

// const Appointement = require("../models/appointement");
// const Location = require("../models/location");

// const get_appointment = async (req, res) => {
//   const IdUser = req.params.id;
//   try {
//     const appointments = await Appointement.find({User :IdUser});
//     res.status(200).send({msg: "appointments", appointments})
//   }catch(error){
//     console.log(error);
//     res.status(500).send(error);
//   }
// };
// const appointment_create_post = async (req, res) => {
//     const User = req.params.id;
//     const {Firstname,Lastname,Email, Phone, StartDate, EndDate} = req.body;

//     try {
//       const appointment = await Appointement.create({Firstname,Lastname,Email, Phone, StartDate, EndDate , User});
//       res.status(201).json({ appointment: appointment});
//     }
//     catch(err) {
//       const errors = handleErrors(err);
//       res.status(400).json({ errors });
//     }
// };
// const appointment_delete = (req, res) => {
//     const id = req.params.id;

//     Appointement.findByIdAndDelete(id).then((result) => {
//          res.json();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     };
//     const UpdateAppointement = async (req, res) => {
//       try {
//           const A = await Appointement.updateOne(
//               { _id: req.params.id },
//               { $set: { ...req.body } }
//           );
//           console.log(A);
//           if (A.modifiedCount) {
//               return res.send({ msg: "updated" });
//           }
//           res.send({ msg: "there is no modification" });
//       } catch (error) {
//           res.send({ msg: "can not modify it" });
//       }
//   };
//     const get_one_appointment = async (req, res) => {
//       const id = req.params.id;
//       try {
//         const appointment = await Appointement.findById(id);
//         res.status(200).send({msg: "appointment", appointment})
//       }catch(error){
//         console.log(error);
//         res.status(500).send(error);
//       }
//     };
//     const addlocation = async (req, res) => {
//       const { lat , lng} = req.body;

//       try {
//         const loc = await Location.create({lat, lng});
//         res.status(201).json({ location : loc});
//       }
//       catch(err) {
//         const errors = handleErrors(err);
//         res.status(400).json({ errors });
//       }
//   };

//   module.exports = {
//     appointment_create_post,
//     appointment_delete,
//     get_appointment,
//     UpdateAppointement,
//     get_one_appointment,
//     addlocation

//   };
