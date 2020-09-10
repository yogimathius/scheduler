// GETS APPOINTMENTS FOR DAY SPECIFIED


const getAppointmentsForDay = (state, day) => {
  let appointmentsForDay = [];
  const dayName = day;
  const selectedDay = state.days.filter(day => day.name === dayName)[0];
  if(!selectedDay){
    return appointmentsForDay;
  }
  for (const appointment of selectedDay.appointments) {
    appointmentsForDay.push(appointment);
  }
  appointmentsForDay = appointmentsForDay.map(appointment => state.appointments[appointment]);
  return appointmentsForDay;
};


// GETS INTERVIEW OBJECT 
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

// GET INTERVIEWERS FOR DAY SPECIFIED

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
