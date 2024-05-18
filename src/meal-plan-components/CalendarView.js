import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import CalendarCard from './CalendarCard';

const CalendarView = () => {
  const [weekList, setWeekList] = useState([]);
  
  // Function to generate an array of dates for the current week
  const getWeekDates = (startDate) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      date = {
        date: date.toDateString(),
        id: date.getTime().toString()
      }
      dates.push(date);
    }
    return dates;
  }

  // Generate dates for the current week
  useEffect(() => {
    const currentDate = new Date();
    const weekDates = getWeekDates(currentDate);

    setWeekList(weekDates);
  }, [])

  return (
    <Droppable droppableId="calendarDroppable">
      {(provided) => (
        <ul className="calendar-list" ref={provided.innerRef} {...provided.droppableProps}>
          {weekList.map((weekDay, index) => {
            return <CalendarCard key={weekDay.id} date={weekDay} index={index}/>;
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default CalendarView;
