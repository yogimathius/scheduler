const getAppointmentsForDay = (state, day) => {
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

const getInterview = (state, interview) => {
	let interviewObj = {};
	if (!interview) {
		return interview;
	}
	const student = interview.student;
	const interviewer = state.interviewers[interview.interviewer];
	interviewObj.student = student
	interviewObj.interviewer = interviewer
	return interviewObj;
}

const getInterviewersForDay = (state, day) => {
	let interviewersArr = [];
	const filteredDays = state.days.filter(days => days.name === day);
	
	const dayMap = filteredDays.map(days => { 
		console.log(days.interviewers);
		
	return (days.interviewers);
	})
}
export {getAppointmentsForDay, getInterview, getInterviewersForDay}