import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/appointment"
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors'
import useApplicationData from '../hooks/useApplicationData'


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
   interviewers: [],
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

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview },
    };

    const dayID = getDayIDfromAppointmentID(state, appointmentId);
    console.log("day id: ", dayID);
    const newday = state.days.map((day) => {
      if (day.id !== dayID) {
        return day;
      }
      return {
        ...day,
        spots: interview === null ? day.spots + 1 : day.spots - 1,
      };
    });
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };
    return axios
    .put("/api/appointments/" + appointmentId, appointment)
    .then(() =>
      setState((state) => ({ ...state, appointments, days: newday }))
    );
}
return {
  ...day,
  spots: interview === null ? day.spots + 1 : day.spots - 1,
};
});
return axios
.delete(url)
.then((resolve) => axios.get("/api/appointments"))
.then((res) =>
  setState({ ...state, appointments: res.data, days: newday })
);
};
return { state, setDay, bookInterview, cancelInterview };
}
