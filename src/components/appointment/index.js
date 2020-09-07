import React from 'react';
import "components/appointment/styles.scss";
import Header from "components/appointment/Header"
import Show from "components/appointment/Show"
import Empty from "components/appointment/Empty"
import useVisualMode from "../../hooks/useVisualMode"
import Form from  "components/appointment/Form"
import Status from "components/appointment/Status"
import Confirm from "components/appointment/Confirm"
import Error from "components/appointment/Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function(props) {

	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING, true)
			props.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(error => transition(ERROR_SAVE, true))
	}
	
	function cancel(id) {
		transition(CONFIRM)
	}

	function deleteInterview(id, interview) {
		transition(DELETING, true)
		props.cancelInterview(id, interview)
		.catch(error => { console.log("error: ", error);
			transition(ERROR_DELETE, true)})
		transition(EMPTY)
	}

	function edit(student, interviewer) {
		// const interview = {
		// 	student: student,
		// 	interviewer: interviewer
		// }
		transition(EDIT)
	}

	return (
		
			<article className="appointment">
				<Header />{props.time}
				
				{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

				{mode === SHOW && (
					<Show
						student={props.interview.student}
						interviewer={props.interview.interviewer}
						interview={props.interview}
						onEdit={() => edit(props.student, props.name)}
						onDelete={() => cancel(props.id)}
					/>
				)}

				{mode === CREATE && (
					<Form 
						interviewers = {props.interviewers}
						onCancel={() => back()}
						onSave={save}	
					 />
				)}	

				{mode === SAVING && (
					<Status message="Saving..." />
				)}

				{mode === DELETING && (
					<Status message="Deleting..." />
				)}

				{mode === CONFIRM && (
					<Confirm 
						id={props.id}
						onCancel={() => back()}
						onConfirm={() => deleteInterview(props.id, props.interview)}
					/>
				)}

				{mode === EDIT && (
					<Form 
						name={props.interview.student}
						interviewer={props.interview.interviewer.id}
						interviewers={props.interviewers}
						onCancel={() => back()}
						onSave={save}						
					/>
				)}

				{mode === ERROR_DELETE && (
					<Error message = "Could not delete appointment"
					onClose={() => back()}
					/>
				)}

				{mode === ERROR_SAVE && (
					<Error message = "Could not save appointment"
					onClose={() => back()}
					/>
				)}

</article>
	)
}