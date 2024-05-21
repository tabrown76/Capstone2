import React, { useContext, useEffect, useState } from 'react';
import { DndContext, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { MealContext } from '../contexts/MealContext';
import CalendarView from './CalendarView';
import RecipeList from './RecipeList';
import CustomPointerSensor from "./CustomPointerSensor";
import "../styles/MealPlanner.css";

/**
 * MealPlanner component that allows drag-and-drop functionality for recipes and meal planning.
 * It uses DnD Kit for the drag-and-drop interactions.
 * 
 * @component
 * @example
 * return (
 *   <MealPlanner />
 * )
 */
const MealPlanner = () => {
  const { value } = useContext(MealContext);
  const { recipeList, setRecipeList, weekList, setWeekList } = value;
  const [sortingStrategy, setSortingStrategy] = useState();

  /**
   * Handles the end of a drag event.
   * 
   * @param {Object} event - The drag end event object.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const activeContainer = active.data.current.sortable.containerId;
    console.log(active)
    const overContainer = over.data.current?.sortable.containerId || over.id;
  
    if (activeContainer !== overContainer) {
      horizontalSortingFunc(active, over, activeContainer, overContainer);
    } else if (activeContainer === overContainer) {
      verticalSortingFunc(active, over, overContainer);
    }
  }

  const horizontalSortingFunc = (active, over, activeContainer, overContainer) => {
    // setSortingStrategy(horizontalListSortingStrategy);
      // if (activeContainer === 'recipes' && overContainer.startsWith('day-')) {
      //   const day = overContainer.split('-')[1];
      //   setWeekList((prevCalendar) => ({
      //     ...prevCalendar,
      //     [day]: [...(prevCalendar[day] || []), active.data.current.recipe]
      //   }));
      //   setRecipeList((items) => items.filter(item => item.id !== active.id));
      // } else if (overContainer.startsWith('day-')) { 
      //   const day = overContainer.split('-')[1];
      //   setWeekList((prevCalendar) => ({
      //     ...prevCalendar,
      //     [day]: [...(prevCalendar[day] || []), active.data.current.recipe]
      //   }));
      //   setRecipeList((items) => items.filter(item => item.id !== active.id));
      // }
  }
  
  const verticalSortingFunc = (active, over, overContainer) => {
    setSortingStrategy(verticalListSortingStrategy);

      if (overContainer === 'recipes') {
        let items = [...recipeList];
        console.log("items:", items);
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        items = arrayMove(items, oldIndex, newIndex);
        setRecipeList(items);
      } else {
        console.log("weekList from func:", (JSON.stringify(weekList)));
        let items = [...weekList];
        console.log("items:", items);
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        items = arrayMove(items, oldIndex, newIndex);
        setWeekList(items);
      }
  }

  useEffect(() => {
    console.log(weekList);
  }, [weekList])
  
  useEffect(() => {
    console.log("Updated recipeList:", recipeList);
  }, [recipeList]);
  

  const allItems = [
    ...recipeList.map(recipe => ({ id: recipe.id, containerId: 'recipes' })),
    ...weekList.map(date => ({id: date.id, containerId: 'recipe-receiver'}))
  ];

  const sensors = useSensors(
    useSensor(CustomPointerSensor)
  )
 
  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={allItems} strategy={sortingStrategy} id='recipes'>
        <div className='meal-planner-container'>
          <div className='meal-planner-section calendar-view-section'>
            <CalendarView />
          </div>
          <div className='meal-planner-section recipe-list-section'>
            <RecipeList />
          </div>
        </div>
      </SortableContext>
    </DndContext>   
  );
};

export default MealPlanner;
