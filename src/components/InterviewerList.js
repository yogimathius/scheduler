import "components/InterviewerList.scss"
import React from "react";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

	const {interviewers} = props;

	const interviewersData = interviewers.map((interviewer, index) => {
		return <InterviewerListItem 
		key={index}
		name={interviewer.name}
		avatar={interviewer.avatar}
		selected={interviewer.id === props.value}
		setInterviewer={props.onChange}
		/>

	})
		return interviewersData;
}