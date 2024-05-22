import React from 'react';
import CalendarCard from './CalendarCard';

/**
 * CalendarView component that displays the weekly meal plan.
 * It renders CalendarCard components for each day in the weekList.
 * 
 * @component
 * @example
 * return (
 *   <CalendarView />
 * )
 */
const CalendarView = ({weekList}) => {

  return (
    <>
      <h3>Drag your recipes over to customize your weekly meal plan.</h3>
      <ul className="calendar-list" >
        {weekList.map((date) =>{
          return <CalendarCard key={date.id} date={date} id={date.id} />
        })}
      </ul>
    </>
  );
};

export default CalendarView;
