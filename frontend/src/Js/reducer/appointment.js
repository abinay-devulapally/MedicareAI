// import {
//   GET_APPOINTMENTS,
//   GET_ONE_APPOINTMENT,
//   ADD_APPOINTMENT,
//   UPDATE_APPOINTMENT,
// } from "../actionTypes/appointment";

// const initialState = {
//   appointments: [],
//   appointment: null,
//   loading: true,
//   error: null,
// };

// export default function appointmentReducer(state = initialState, action) {
//   console.log("Reducer called with action:", action);
//   switch (action.type) {
//     case GET_APPOINTMENTS:
//       console.log("Handling GET_APPOINTMENTS");
//       return {
//         ...state,
//         appointments: action.payload,
//         loading: false,
//       };
//     case GET_ONE_APPOINTMENT:
//       return {
//         ...state,
//         appointment: action.payload,
//         loading: false,
//       };
//     case ADD_APPOINTMENT:
//       return {
//         ...state,
//         appointments: [...state.appointments, action.payload],
//         loading: false,
//       };
//     case UPDATE_APPOINTMENT:
//       return {
//         ...state,
//         appointments: state.appointments.map((appointment) =>
//           appointment._id === action.payload._id ? action.payload : appointment
//         ),
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }

import {
  GET_APPOINTMENTS,
  GET_ONE_APPOINTMENT,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  SEND_MESSAGE,
} from "../actionTypes/appointment";
const initialState = {
  appointment: [],
  errors: [],
  show: false,
};

const appointmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_APPOINTMENTS:
      return { ...state, appointment: payload };
    case ADD_APPOINTMENT:
      return { ...state, appointment: payload };
    case DELETE_APPOINTMENT:
      return { ...state, appointment: payload };
    case GET_ONE_APPOINTMENT:
      return { ...state, appointment: payload };
    case UPDATE_APPOINTMENT:
      return { ...state, appointment: payload };
    default:
      return state;
  }
};
export default appointmentReducer;
