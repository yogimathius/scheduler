import { useReducer, useEffect } from "react";
import axios from 'axios'
import getAppointmentsForDay from 'helpers/selectors'

export default function useApplicationData() {
	// const getDayIDfromAppointmentID = (state) => {
	// 	let dayID;
	// 	state.days.map((day) => {
	// 		return dayID;
	// 	});
	// }
	// const dayID = getDayIDfromAppointmentID(state);
	// const days = state.days.map((day) => {
	// 	if (day.id !== dayID) {
	// 		return day;
	// 	}
	// 	if (interview.student) {
	// 		return {
	// 			...day,
	// 			spots: day.spots
	// 		}
	// 	}
	// 	return {
	// 		...day,
	// 		spots: interview === null ? day.spots + 1 : day.spots - 1,
	// 	};
	// });


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
					interviewers 
				}

      case SET_INTERVIEW: {
				const { id, interview, days } = action
				const appointment = {
          ...state.appointments[action.id],
          interview
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
				}

				state = {...state, appointments, days}
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

	const updateSpots = (one) => {
		const dayObj = state.days.find(item => item.name === state.day);
		dayObj.spots+=one;
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

		function bookInterview(appointmentId, interview, create) {
			console.log("student: ", interview.student);
		 const url = `/api/appointments/${appointmentId}`;
		 const promise = axios.put(url, { interview })
			.then(() => {
				if (create)
			updateSpots(-1)
			dispatch({ type: SET_INTERVIEW, id: appointmentId, interview, days: state.days })
			}
		);
		return promise;
  }

	const cancelInterview = (appointmentId, interview) => {
		const url = `/api/appointments/${appointmentId}`;
				const promise = axios.delete(url)
					.then((res) => {
						updateSpots(1)
						dispatch({ type: SET_INTERVIEW, id: appointmentId, interview: null, days: state.days })
					}
			);
			return promise
		};
		return { state, setDay, bookInterview, cancelInterview };	
	}	