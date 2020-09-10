import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const ws = useRef(null);
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function recalculateDays(days, appointments) {
    return days.map((day) => {
      let spots = 0;

      day.appointments
        .map((appointmentId) =>
          !appointments[appointmentId].interview ? 1 : 0
        )
        .forEach((num) => (spots += num));
      return { ...day, spots };
    });
  }
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };

      case SET_APPLICATION_DATA:
        const { days, appointments, interviewers } = action;
        return { ...state, days, appointments, interviewers };

      case SET_INTERVIEW: {
        const { id, interview } = action;
        const appointment = {
          ...state.appointments[action.id],
          interview,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        let days = recalculateDays(state.days, appointments);

        state = { ...state, appointments, days };
        return state;
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  function updateSpots(one) {
    const dayObj = state.days.find((item) => item.name === state.day);
    dayObj.spots += one;
    return state.days;
  }

  const setDay = (day) => dispatch({ type: SET_DAY, day });

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

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = () => socket.send("ping");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data: ", data);
      if (data.type === SET_INTERVIEW) {
        dispatch(data);
      }
    };

    socket.onclose = () => console.log("ws closed");
    return () => {
      socket.close();
    };
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
