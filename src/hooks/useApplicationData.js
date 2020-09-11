import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";
export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // FOR SPOTS REMAINING W/O WEBSOCKET (FOR TESTING PURPOSES WITH JEST)
  function updateSpots(one) {
    const dayObj = state.days.find((item) => item.name === state.day);
    dayObj.spots += one;
    return state.days;
  }

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // RETRIEVES API AND SETS IT WITH REDUCER
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);

  // BOOKS INTERVIEW
  function bookInterview(appointmentId, interview, create) {
    const url = `/api/appointments/${appointmentId}`;
    const promise = axios.put(url, { interview }).then(() => {
      if (create) updateSpots(-1);
      dispatch({
        type: SET_INTERVIEW,
        id: appointmentId,
        interview,
        days: state.days,
      });
    });
    return promise;
  }

  // CANCELS AN INTERVIEW
  const cancelInterview = (appointmentId, interview) => {
    const url = `/api/appointments/${appointmentId}`;
    const promise = axios.delete(url).then((res) => {
      updateSpots(1);
      dispatch({
        type: SET_INTERVIEW,
        id: appointmentId,
        interview: null,
        days: state.days,
      });
    });
    return promise;
  };

  // FOR WEBSOCKET
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = () => socket.send("ping");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === SET_INTERVIEW) {
        dispatch(data);
      }
    };

    // socket.onclose = () => console.log("ws closed");
    return () => {
      socket.close();
    };
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
