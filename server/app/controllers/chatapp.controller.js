const talkToChatbot = require("../Appointment_chatbot/chatbot");
const ChatTalks = require("../models/chatbotTalks");
const UserModel = require("../models/user.model");
const Location = require("../models/location");
const geolib = require("geolib");
const moment = require("moment");
const Appointment = require("../models/appointement"); // Corrected the import
const nodemailer = require("../config/nodemailer.config");
const UserContext = require("../models/userContext");

// Mock data for doctors and hospitals
const doctors = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    specialty: "cardiologist",
    hospital: "City Hospital",
    location: { lat: 40.7128, lng: -74.006 }, // New York City
    experience: 10, // years of experience
    rating: 4.8, // Doctor's rating out of 5
    availability: ["Monday", "Wednesday", "Friday"], // Days available
  },
  {
    id: 2,
    firstname: "Jane",
    lastname: "Smith",
    specialty: "dermatologist",
    hospital: "Town Hospital",
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    experience: 7,
    rating: 4.5,
    availability: ["Tuesday", "Thursday"],
  },
  {
    id: 3,
    firstname: "Emily",
    lastname: "Brown",
    specialty: "cardiologist",
    hospital: "General Hospital",
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    experience: 12,
    rating: 4.9,
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: 4,
    firstname: "Michael",
    lastname: "Green",
    specialty: "neurologist",
    hospital: "Neuro Health Clinic",
    location: { lat: 41.8781, lng: -87.6298 }, // Chicago
    experience: 15,
    rating: 4.7,
    availability: ["Monday", "Tuesday", "Thursday"],
  },
  {
    id: 5,
    firstname: "Sarah",
    lastname: "Johnson",
    specialty: "pediatrician",
    hospital: "Children's Health Center",
    location: { lat: 29.7604, lng: -95.3698 }, // Houston
    experience: 8,
    rating: 4.6,
    availability: ["Monday", "Wednesday", "Saturday"],
  },
  {
    id: 6,
    firstname: "David",
    lastname: "Lee",
    specialty: "orthopedist",
    hospital: "Ortho Care Center",
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    experience: 11,
    rating: 4.3,
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: 7,
    firstname: "Angela",
    lastname: "White",
    specialty: "cardiologist",
    hospital: "Heart Specialist Clinic",
    location: { lat: 40.7128, lng: -74.006 }, // New York City
    experience: 14,
    rating: 4.9,
    availability: ["Monday", "Tuesday", "Friday"],
  },
  {
    id: 8,
    firstname: "Robert",
    lastname: "Wilson",
    specialty: "dermatologist",
    hospital: "Skin Care Clinic",
    location: { lat: 47.6062, lng: -122.3321 }, // Seattle
    experience: 6,
    rating: 4.4,
    availability: ["Wednesday", "Friday"],
  },
  {
    id: 9,
    firstname: "Lisa",
    lastname: "Brown",
    specialty: "neurologist",
    hospital: "Brain Health Center",
    location: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    experience: 13,
    rating: 4.8,
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: 10,
    firstname: "Chris",
    lastname: "Miller",
    specialty: "orthopedist",
    hospital: "Advanced Ortho Clinic",
    location: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
    experience: 9,
    rating: 4.5,
    availability: ["Monday", "Wednesday", "Friday"],
  },
  {
    id: 11,
    firstname: "Karen",
    lastname: "Taylor",
    specialty: "pediatrician",
    hospital: "Children's Hospital",
    location: { lat: 25.7617, lng: -80.1918 }, // Miami
    experience: 10,
    rating: 4.7,
    availability: ["Tuesday", "Thursday", "Saturday"],
  },
  {
    id: 12,
    firstname: "Paul",
    lastname: "Jones",
    specialty: "neurologist",
    hospital: "Brain Health Institute",
    location: { lat: 39.7392, lng: -104.9903 }, // Denver
    experience: 16,
    rating: 4.8,
    availability: ["Monday", "Wednesday", "Friday"],
  },
];

const send_message = async (req, res) => {
  const message = req.body.message;
  const userId = req.params.id; // User ID from request
  const userLatitude = req.body.Userlat;
  const userLongitude = req.body.Userlng;
  const userName = req.body.Username;
  const userEmail = req.body.Usermail;

  try {
    // Send message to Dialogflow chatbot
    const response = await talkToChatbot(message);

    // Log the entire Dialogflow response for debugging
    console.log("Dialogflow Response:", JSON.stringify(response, null, 2));

    let messageReceived = response.fulfillmentText;
    const date = new Date();

    // Extract intent name
    const intentName = response.intent.displayName;

    // Extract parameters from Dialogflow response
    const parameters =
      response.parameters?.fields || response.queryResult?.parameters?.fields;

    // Initialize conversation context for the user
    let conversationContext = await UserContext.findOne({ userId: userId });
    if (!conversationContext) {
      conversationContext = new UserContext({
        userId: userId,
        context: {},
      });
      await conversationContext.save();
    }

    // Function to extract parameter values
    function extractParameterValue(param) {
      if (param.kind === "stringValue") {
        return param.stringValue;
      } else if (param.kind === "numberValue") {
        return param.numberValue;
      } else if (param.kind === "structValue") {
        // Handle structured values (e.g., dates)
        if (param.structValue.fields) {
          let result = {};
          for (let key in param.structValue.fields) {
            result[key] = extractParameterValue(param.structValue.fields[key]);
          }
          return result;
        }
      } else if (param.kind === "listValue") {
        return param.listValue.values.map((item) =>
          extractParameterValue(item)
        );
      }
      return null;
    }

    // Update the context with the latest parameters
    if (parameters) {
      for (let param in parameters) {
        const value = parameters[param];
        console.log(`Extracting parameter: ${param}`);
        console.log("Raw Value:", JSON.stringify(value, null, 2));

        // Determine the kind of the parameter value
        const valueKind = value.kind || Object.keys(value)[0];
        value.kind = valueKind;

        const extractedValue = extractParameterValue(value);
        console.log(`Extracted Value for ${param}:`, extractedValue);
        if (extractedValue !== null && extractedValue !== "") {
          conversationContext.context[param] = extractedValue;
        }
      }
      await conversationContext.save();
    }

    // Log the updated conversation context for debugging
    console.log("Updated Conversation Context:", conversationContext.context);

    const contextParams = conversationContext.context;

    // Check if all required parameters are collected
    const requiredParams = ["date", "time", "specialty"];
    const allParamsCollected = requiredParams.every((param) => {
      const value = contextParams[param];
      return value !== undefined && value !== null && value !== "";
    });

    console.log("All Params Collected:", allParamsCollected);

    if (allParamsCollected) {
      // All required parameters are collected, proceed to find the doctor

      const specialization = contextParams.specialty.toLowerCase();
      let appointmentDate = contextParams.date;
      let appointmentTime = contextParams.time;

      // Parse the date if necessary
      if (typeof appointmentDate === "string") {
        appointmentDate = moment(appointmentDate).format("YYYY-MM-DD");
      }

      // Parse the time if necessary
      if (typeof appointmentTime === "string") {
        appointmentTime = moment(appointmentTime, [
          "HH:mm:ss",
          "hh:mm A",
        ]).format("HH:mm");
      }

      // Find doctors with the required specialization
      const matchingDoctors = doctors.filter(
        (doc) => doc.specialty.toLowerCase() === specialization
      );

      if (matchingDoctors.length > 0) {
        // Find the nearest doctor
        let nearestDoctor = null;
        let nearestDistance = Number.MAX_VALUE;

        for (let doc of matchingDoctors) {
          const distance = geolib.getDistance(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: doc.location.lat, longitude: doc.location.lng }
          );
          if (distance < nearestDistance) {
            nearestDoctor = doc;
            nearestDistance = distance;
          }
        }

        if (nearestDoctor) {
          // Create an appointment record
          const appointment = new Appointment({
            user: userId,
            doctor: {
              id: nearestDoctor.id,
              firstname: nearestDoctor.firstname,
              lastname: nearestDoctor.lastname,
              specialization: nearestDoctor.specialty,
              hospital: nearestDoctor.hospital,
            },
            date: appointmentDate,
            time: appointmentTime,
            status: "Confirmed",
          });

          await appointment.save();

          // Send confirmation message
          messageReceived = `Your appointment with Dr. ${
            nearestDoctor.firstname
          } ${nearestDoctor.lastname} at ${
            nearestDoctor.hospital
          } is confirmed for ${moment(appointmentDate).format(
            "MMMM Do YYYY"
          )} at ${appointmentTime}.`;

          // Optionally, send an email confirmation
          // await nodemailer.sendAppointmentConfirmation({
          //   to: userEmail,
          //   subject: "Appointment Confirmation",
          //   text: messageReceived,
          // });

          // Clear the conversation context
          conversationContext.context = {};
          await conversationContext.save();

          // Log the chat message
          await ChatTalks.create({
            messageSent: message,
            messageReceived,
            date,
            user: userId,
          });

          return res.status(200).json({ message: messageReceived });
        } else {
          // No doctor found
          messageReceived = `Sorry, no ${specialization} found near your location.`;
          await ChatTalks.create({
            messageSent: message,
            messageReceived,
            date,
            user: userId,
          });
          return res.status(200).json({ message: messageReceived });
        }
      } else {
        // No doctor with the specialization
        messageReceived = `Sorry, we don't have any ${specialization} available.`;
        await ChatTalks.create({
          messageSent: message,
          messageReceived,
          date,
          user: userId,
        });
        return res.status(200).json({ message: messageReceived });
      }
    } else {
      // Missing some parameters
      // Let the chatbot handle the conversation and prompt for missing parameters
      await ChatTalks.create({
        messageSent: message,
        messageReceived,
        date,
        user: userId,
      });

      return res.status(200).json({ message: messageReceived });
    }
  } catch (error) {
    console.error("Error in send_message:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all messages for a specific user
const get_messages = async (req, res) => {
  const id = req.params.id;
  try {
    const talks = await ChatTalks.find({ user: id });
    res.status(200).send({ msg: "talks", talks });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Delete messages for a specific user
const delete_messages = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  ChatTalks.deleteMany({ user: id })
    .then((result) => {
      res.json();
      console.log("deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  send_message,
  get_messages,
  delete_messages,
};

// const talkToChatbot = require("../Appointment_chatbot/chatbot");
// const ChatTalks = require("../models/chatbotTalks");
// const UserModel = require("../models/user.model");
// const Location = require("../models/location");
// const getDistance = require("geolib/es/getDistance");
// const geolib = require("geolib");
// const moment = require("moment");
// const Appointment = require("../models/appointement");
// const nodemailer = require("../config/nodemailer.config");

// const send_message = async (req, res) => {
//   const message = req.body.message;
//   const user = req.params.id; // User ID from request
//   const userlatitude = req.body.Userlat;
//   const userlongitude = req.body.Userlng;
//   const Firstname = req.body.Username;
//   const Email = req.body.Usermail;

//   try {
//     // Sending message to chatbot
//     const response = await talkToChatbot(message);
//     let messageReceived = response.fulfillmentText;
//     let date = new Date();

//     // If the chatbot response is about taking an appointment
//     if (response.intent.displayName === "Take_appointment_phase1") {
//       let nearestdoctor = null;
//       let nearestdistance = Number.MAX_VALUE;

//       // Find doctors based on the specialty mentioned by the user
//       const users = await UserModel.find({ speciality: response.queryText });

//       // Find the nearest doctor based on user's latitude and longitude
//       for (let res of users) {
//         const location = await Location.findById(res.location);
//         const distance = geolib.getDistance(
//           { latitude: userlatitude, longitude: userlongitude },
//           { latitude: location.lat, longitude: location.lng }
//         );

//         if (distance < nearestdistance) {
//           nearestdoctor = res._id;
//           nearestdistance = distance;
//         }
//       }

//       if (nearestdoctor) {
//         const nearestDoctorDetails = await UserModel.findById(nearestdoctor);
//         messageReceived = `The nearest doctor to your location is Dr. ${nearestDoctorDetails.firstname} ${nearestDoctorDetails.lastname}, please pick a date for your appointment.`;

//         // Log the chat message
//         await ChatTalks.create({
//           messageSent: message,
//           messageReceived,
//           date,
//           user,
//           nearestdoctor,
//         });

//         // Assuming you receive the appointment date from the user later (in another intent)
//         // Capture date from the user (through dialogflow webhook or from a follow-up intent)
//         if (response.intent.displayName === "Take_appointment_phase2") {
//           const appointmentDate = response.parameters.fields.date.stringValue; // assuming the date is passed as a parameter

//           // Create an appointment record
//           const appointment = new Appointment({
//             user: user,
//             doctor: nearestdoctor,
//             date: appointmentDate,
//             status: "Pending", // or other status as needed
//           });

//           await appointment.save();

//           // Send confirmation to the user
//           messageReceived = `Your appointment with Dr. ${
//             nearestDoctorDetails.firstname
//           } ${nearestDoctorDetails.lastname} is booked for ${moment(
//             appointmentDate
//           ).format("MMMM Do YYYY, h:mm a")}.`;

//           // Optionally, you can send an email confirmation using nodemailer
//           await nodemailer.sendAppointmentConfirmation({
//             to: Email,
//             subject: "Appointment Confirmation",
//             text: messageReceived,
//           });
//         }

//         return res.status(200).json({ message: messageReceived });
//       }
//     }

//     // Default case: Log and send the chatbot's response
//     await ChatTalks.create({
//       messageSent: message,
//       messageReceived,
//       date,
//       user,
//     });

//     return res.status(200).json({ message: messageReceived });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // Get all messages for a specific user
// const get_messages = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const talks = await ChatTalks.find({ user: id });
//     res.status(200).send({ msg: "talks", talks });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// };

// // Delete messages for a specific user
// const delete_messages = async (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   ChatTalks.deleteMany({ user: id })
//     .then((result) => {
//       res.json();
//       console.log("deleted");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// module.exports = {
//   send_message,
//   get_messages,
//   delete_messages,
// };
