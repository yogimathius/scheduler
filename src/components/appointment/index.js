import React from 'react';
import "components/appointment/styles.scss";
import Header from "components/appointment/Header"
import Show from "components/appointment/Show"
import Empty from "components/appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from  "components/appointment/Form"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function(props) {
	
	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
	);
	
	return (
		
			<article className="appointment">
				<Header />{props.time}
				
				{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

				{mode === SHOW && (
					<Show
						student={props.interview.student}
						interviewer={props.interview.interviewer}
					/>
				)}

				{mode === CREATE && (
					<Form onCancel={() => back()} />
				)}	
</article>
	)
}