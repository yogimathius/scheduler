import { useState, useEffect } from "react";
import axios from 'axios'


export default function useApplicationData() {
	
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
		interviewers: [],
  });

	const setDay = day => setState({...state, day});
	

	useEffect(() => {
		Promise.all([
			axios.get('/api/days'),
			axios.get('api/appointments'),
			axios.get('/api/interviewers')
		]).then((all) => {
			setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
		});
	}, [])
	const days = state.days;

	// const newDays = days.map(day => console.log(day));
	
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};
		

		const newDays = [...state.days];
		const newday = newDays.map(day => {
			if (day.id !== id) {
				return day
			}
			return {
				...day,
				spots: interview === null ? day.spots + 1 : day.spots - 1
			}
		})

		console.log("new day: ", newday);

		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		console.log("spots: ", newday.spots );
		// console.log("days: ", days);
		// console.log("appointments: ", appointments);

		setState({
			...state,
			appointments,
			newday
		});

		return axios
		.put("/api/appointments/"+id, appointment)
		.then(() => setState(state => ({...state, appointment})))
	}
	
	const cancelInterview = (id) => {
		const url = `/api/appointments/${id}`;
		return axios.delete(url)
			.then((resolve) => axios.get("/api/appointments"))
			.then((res) => setState({ ...state, appointments: res.data }));
	};
	
	return {state, setDay, bookInterview, cancelInterview}
}