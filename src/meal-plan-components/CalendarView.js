import React, { useEffect, useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
    <ul className="calendar-list" >
      <SortableContext items={weekList.map(day => day.id)} strategy={verticalListSortingStrategy}>
        {weekList.map((weekDay) => {
          return <CalendarCard key={weekDay.id} date={weekDay} id={weekDay.id}/>;
        })}
      </SortableContext>
    </ul>
  );
};

export default CalendarView;
