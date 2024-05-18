import React from "react";
import "../styles/CalendarCard.css"

const CalendarCard = ({date, index}) => {
    return(
        <li className="calendar-card-li">
            <span>{date.date}</span>
        </li>
    )
}

export default CalendarCard;