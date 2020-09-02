import "components/InterviewerListItem.scss"
import classnames from 'classnames/bind';
import React, { useCallback } from "react";

export default function InterviewerListItem(props) {
  const onClick = useCallback(() => {
    props.setInterviewer(props.id)
  }, [props])
  console.log("props: ", props.id);
  const interviewerClass = classnames("interviewers__item",{
		"interviewers__item--selected": props.selected
	})
  return (
    <li className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        onClick={onClick}
      />
      {props.selected && props.name}
    </li>
  );
}