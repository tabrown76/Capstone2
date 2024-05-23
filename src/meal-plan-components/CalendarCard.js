import React, { useContext } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import RecipeReciever from "./RecipeReciever";
import { MealContext } from "../contexts/MealContext";
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
const CalendarCard = ({date, id}) => {
    const {value} = useContext(MealContext);
    const {dragIds} = value;

    const items = dragIds.map(item => ({ id: item.id, containerId: 'recipe-receiver' }));

    return(
        <>
            <li className="calendar-card-li"  key={date.id}>
                <span>{date.date}</span>
                <SortableContext items={items} strategy={verticalListSortingStrategy} id='recipe-receiver'>
                    <RecipeReciever key={id} date={date.date} id={id}/>
                </SortableContext>
            </li>
        </>  
    )
}

export default CalendarCard;
