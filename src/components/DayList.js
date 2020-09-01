import "components/DayListItem.scss"
import React from "react";
import DayListItem from './DayListItem'

export default function DayList(props) {

	const {days} = props;

	const daysData = days.map((days, index) => {
		return <DayListItem 
		key={index}
		name={days.name} 
		spots={days.spots} 
		selected={days.name === props.day} 
		setDay={props.setDay} />
	})

	return daysData;
}