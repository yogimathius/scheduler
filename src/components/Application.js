import React, { useState, useEffect } from "react";
import axios from 'axios'
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Jamie Jones",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "5pm",
  }
];



const appointmentList = appointments.map((appointment) => {
  return <Appointment key={appointment.id} {...appointment} />;
});

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
    
  });
  
  // const setDays = days => setState(prev => ({...prev, days}))
  const setDay = day => setState({...state, day});
    console.log("length: ", appointmentList.length);

  useEffect(() => {
    let one =
    "http://localhost:8001/api/days";
    let two =
    "http://localhost:8001/api/appointments";
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
      Promise.all([
        Promise.resolve(requestOne),
        Promise.resolve(requestTwo),
      ]).then((all) => {
        console.log(all[1].data);
        setState(prev => ({ days: all[0].data, appointments: all[1].data }));
        const [first, second] = all;
        console.log(first, second);
        console.log(requestOne, requestTwo);
      });
  })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointmentList}
      </section> 
    </main>
  );
  }