import { useState, useEffect } from "react";
import axios from 'axios'


export default function useApplicationData() {
	
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
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
	
	function bookInterview(id, interview) {

		const appointment = {
			...state.appointments[id],
			interview: { ...interview }
		};

		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		setState({
			...state,
			appointments
		});

		return axios.put("/api/appointments/"+id, appointment).then(() => setState(state => ({...state, appointment})))
	}
	
	const cancelInterview = (id) => {
		const url = `/api/appointments/${id}`;
		return axios.delete(url)
			.then((resolve) => axios.get("/api/appointments"))
			.then((res) => setState({ ...state, appointments: res.data }));
	};
	
	return {state, setDay, bookInterview, cancelInterview}
}