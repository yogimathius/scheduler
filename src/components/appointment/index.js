import React, { Fragment } from 'react';
import "components/appointment/styles.scss";
import Header from "components/appointment/Header"
import Show from "components/appointment/Show"
import Empty from "components/appointment/Empty"


export default function Appointment(props) {
	return (
		
			<article className="appointment">
				<Header />{props.time}
			</article>
	)
}