import React from "react";
import RecipeReciever from "./RecipeReciever";
import "../styles/CalendarCard.css";

/**
 * CalendarCard component that represents a single day in the weekly meal plan.
 * It includes a date display and a RecipeReciever component.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.date - The date object for the day.
 * @param {string} props.id - The unique identifier for the day.
 * @param {string} props.day - The name of the day.
 * @example
 * return (
 *   <CalendarCard date={date} id={date.id} day={date.day} />
 * )
 */
const CalendarCard = ({date, id, day}) => {

    return(
        <li 
            className="calendar-card-li"
            data-sortable-container-id={`day-${day}`}
            data-sortable-id={id}
        >
            <span>{date.date}</span>
            <RecipeReciever id={id}/>
        </li>
    )
}

export default CalendarCard;
