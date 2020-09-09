import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const ADD_SPOTS = "ADD_SPOTS"

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
        
        // console.log("action: ", action);

        console.log("action: ", action.interview);
        const { id, interview } = action
        
        const appointment = {
          ...state.appointments[id],
          interview
        }
        // console.log("appointment: ", appointment);
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        state = {...state, appointments}
        console.log("state: ", state);
        return state
      }

      case ADD_SPOTS:
        // console.log(state, action);
      return;
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
  
  const getDayIDfromAppointmentID = (state, appointmentId) => {
    let dayID;
    const days = state.days.map((day) => {
      for (const appointment of day.appointments) {
        if (appointment === appointmentId) {
          dayID = day.id;
        }
      }
    });
    return dayID;
  };

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
    // console.log("id: ", appointmentId, "interview: ", interview);
    return axios
      .put(`/api/appointments/${appointmentId}`, { interview })
      .then(() =>
      // setState((state) => ({ ...state, appointments, days: newday }))
      dispatch({ type: SET_INTERVIEW, appointmentId, interview }))
      .catch(error => console.log("error: ", error))
  }

  const cancelInterview = (appointmentId, interview) => {
    const url = `/api/appointments/${appointmentId}`;

    const dayID = getDayIDfromAppointmentID(state, appointmentId);
    // console.log("day id: ", dayID);
    const newday = state.days.map((day) => {
      if (day.id !== dayID) {
        return day;
      }
      return {
        ...day,
        spots: interview === null ? day.spots + 1 : day.spots - 1,
      };
    });

    return axios
      .delete(url)
      .then((res) =>
      dispatch({ type: SET_INTERVIEW, appointments: res.data, days: newday })
      );
  };

  return { state, setDay, bookInterview, cancelInterview };
}
