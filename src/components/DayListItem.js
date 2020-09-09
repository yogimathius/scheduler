import "components/DayListItem.scss"
import classnames from 'classnames/bind';
import React from "react";

export default function DayListItem(props) {

	const formatSpots = (spots) => {
    if (!spots) {
      return 'no spots remaining';
    } else if (spots === 1) {
      return '1 spot remaining';
    }
    return `${spots} spots remaining`;
  }

	const dayListItemClass = classnames("day-list__item",{
		"day-list__item--selected": props.selected,
		"day-list__item--full": !props.spots
  })
  
  return (
    <li data-testid="day" className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2> 
			<h3 className='text--light'>{formatSpots(props.spots)}</h3>			    
    </li>
  );
}