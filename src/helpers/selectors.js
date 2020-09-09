const getAppointmentsForDay = (state, day) => {
  let apptArr = [];
  const filteredDays = state.days.filter((days) => days.name === day);

  const dayMap = filteredDays.map((days) => {
    const apptValues = Object.values(state.appointments);

    days.appointments.forEach((appt) => {
      apptValues.forEach((apptValue) => {
        if (apptValue.id === appt) {
          apptArr.push(apptValue);
        }
      });
    });
  });
  return day, apptArr;
};

const getInterview = (state, interview) => {
  let interviewObj = {};
  if (!interview) {
    return interview;
  }
  const student = interview.student;
  const interviewer = state.interviewers[interview.interviewer];
  interviewObj.student = student;
  interviewObj.interviewer = interviewer;
  return interviewObj;
};

// const getInterviewersForDay = (state, day) => {
// 	let intArr = [];
// 	const filteredDays = state.days.filter(days => days.name === day);

// 	const dayMap = filteredDays.map(days => {
// 		const intValues = Object.values(state.interviewers)

// 		days.appointments.forEach(int => {
// 			intValues.forEach(intValue => {
// 				if (intValue.id === int) {
// 					intArr.push(intValue)
// 				}
// 			})
// 		})
// 	})
// 	return (intArr);
// }
const getInterviewersForDay = (state, day) => {
  let interviewersForDay = [];
  const dayName = day;
  const selectedDay = state.days.filter((day) => day.name === dayName)[0];
  if (!selectedDay) {
    return interviewersForDay;
  }
  let interviewer;
  for (interviewer of selectedDay.interviewers) {
    interviewersForDay.push(interviewer);
  }
  interviewersForDay = interviewersForDay.map(
    (interviewer) => state.interviewers[interviewer]
  );
  return interviewersForDay;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
