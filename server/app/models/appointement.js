const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: {
    id: { type: Number, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    specialization: { type: String, required: true },
    hospital: { type: String, required: true },
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);

// var mongoose = require("mongoose");
// var Schema= mongoose.Schema;

// var Appointement= new Schema(
//     {
//         Firstname:String,
//         Lastname:String,
//         Email:String,
//         Phone:String,
//         StartDate:Date,
//         EndDate:Date,
//         DoctorName:String,
//         User : {
//             type: mongoose.Schema.Types.ObjectId,
//             ref : "User" ,
//           },
//     }
// )

// const AppointementSchema = mongoose.model("appointments",Appointement)
// module.exports=AppointementSchema;
