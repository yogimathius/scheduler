import React from 'react';
import "components/appointment/styles.scss";
import Header from "components/appointment/Header"
import Show from "components/appointment/Show"
import Empty from "components/appointment/Empty"


export default function(props) {

	const interviewChecker = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />
	return (
		
			<article className="appointment">
				<Header />{props.time}
				{interviewChecker}
			</article>
	)
}