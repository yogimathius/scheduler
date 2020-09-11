
	const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  // const ws = useRef(null);

  // UPDATE SPOTS IN DAYS FOR THE REDUCER

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

  // REDUCER INCLUDES SETTING DAY, DATA, AND INTERVIEW FOR BOOKING AND CANCELING APPOINTMENTS
	export default function reducer(state, action) {

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

export {SET_DAY, SET_INTERVIEW, SET_APPLICATION_DATA}