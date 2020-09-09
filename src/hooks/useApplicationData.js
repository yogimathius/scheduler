import { useReducer, useEffect } from "react";
import axios from 'axios'
import getAppointmentsForDay from 'helpers/selectors'

export default function useApplicationData() {
  


  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {

      case SET_DAY:
        return { ...state, day: action.day }

      case SET_APPLICATION_DATA:
        const {days, appointments, interviewers} = action
        return { ...state, 
          days, 
          appointments, 
          interviewers }

      case SET_INTERVIEW: {
				const { id, interview } = action
				console.log("interview: ", interview);
				const appointment = {
          ...state.appointments[action.id],
          interview
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
				}
				// console.log("appointments: ", appointments);
				state = {...state, appointments,}
				console.log("state: ", state.appointments[1]);
        return state
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
	}
	
  const [state, dispatch] = useReducer(reducer, {
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const getDayIDfromAppointmentID = (state, appointmentID) => {
		let dayID;
		const days = state.days.map((day) => {
			return dayID;
		});
	}
		const setDay = day => dispatch({ type: SET_DAY, day });

		useEffect(() => {
			Promise.all([
				axios.get("/api/days"),
				axios.get("/api/appointments"),
				axios.get("/api/interviewers"),
			]).then((all) => {

				const days = all[0].data;
				const appointments = all[1].data;
				const interviewers = all[2].data;
				dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
			});
		}, []);

		function bookInterview(appointmentId, interview) {
    // const dayID = getDayIDfromAppointmentID(state, appointmentId);
    // const newday = state.days.map((day) => {
    //   if (day.id !== dayID) {
    //     return day;
    //   }
    //   return {
    //     ...day,
    //     spots: interview === null ? day.spots + 1 : day.spots - 1,
    //   };
    // });
		return axios
		.put(`/api/appointments/${appointmentId}`, { interview })
		.then(() =>
		dispatch({ type: SET_INTERVIEW, id: appointmentId, interview })
		);
  }

		const cancelInterview = (appointmentId, interview) => {
			const url = `/api/appointments/${appointmentId}`;

      // if (day.id !== dayID) {
      //   return day;
      // }
      // return {
      //   ...day,
			// 	spots: interview === null ? day.spots + 1 : day.spots - 1,
			// }
				return axios
				.delete(url)
				.then((res) =>
				dispatch({ type: SET_INTERVIEW, appointments: res.data })
				);
			};
			return { state, setDay, bookInterview, cancelInterview };	
		}	