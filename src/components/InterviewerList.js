import "components/InterviewerList.scss"
import React from "react";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

	const {interviewers} = props;
	console.log(interviewers);
	const interviewersData = interviewers.map((interviewer, index) => {
		console.log(props.value, interviewer.id);

		return <InterviewerListItem 
		key={index}
		id={interviewer.id}
		name={interviewer.name}
		avatar={interviewer.avatar}
		selected={interviewer.id === props.value}
		setInterviewer={props.setInterviewer}
		/>
	})
		return interviewersData;
}