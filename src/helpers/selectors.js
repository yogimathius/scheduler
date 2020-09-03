export function getAppointmentsForDay(state, day) {
	let apptArr = [];
	const filteredDays = state.days.filter(days => days.name === day);
	const dayMap = filteredDays.map(days => { 
		const apptValues = Object.values(state.appointments)

		days.appointments.forEach(appt => {
			apptValues.forEach(apptValue => {
				if (apptValue.id === appt) {
					apptArr.push(apptValue)
				}
			})
		})
	})
	return (day, apptArr);
}
// let apptArr = []

// console.log("filtered: ", filteredDays);
// const appointments = filteredDays.map(appt => appt.appointments)
// console.log("appointments :", appointments);
// let flatAppts = appointments.reduce((acc, it) => [...acc, ...it], [])
// console.log("flattened: ", flatAppts);

// const appts = state.appointments.filter();


// console.log("array of appointments: ", apptArr);
// return filteredDays;