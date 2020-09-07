import "components/InterviewerList.scss";
import React from "react";
import InterviewerListItem from "./InterviewerListItem";
// import PropTypes from "prop-types";

// InterviewerList.propTypes = {
//   interviewers: PropTypes.array.isRequired,
// };

export default function InterviewerList(props) {
  const { interviewers } = props;
  const interviewersData = interviewers.map((interviewer, index) => {
    return (
      <InterviewerListItem
        key={index}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={props.setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">{interviewersData}</ul>
    </section>
  );
}
