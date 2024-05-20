import React, { useContext } from 'react';
import { DndContext, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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

  /**
   * Handles the end of a drag event.
   * 
   * @param {Object} event - The drag end event object.
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (!over) return;
  
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
  
    if (activeContainer !== overContainer) {
      if (activeContainer === 'recipes' && overContainer.startsWith('day-')) {
        const day = overContainer.split('-')[1];
        setWeekList((prevCalendar) => ({
          ...prevCalendar,
          [day]: [...(prevCalendar[day] || []), active.data.current.recipe]
        }));
        setRecipeList((items) => items.filter(item => item.id !== active.id));
      } else if (overContainer.startsWith('day-')) { 
        const day = overContainer.split('-')[1];
        setWeekList((prevCalendar) => ({
          ...prevCalendar,
          [day]: [...(prevCalendar[day] || []), active.data.current.recipe]
        }));
        setRecipeList((items) => items.filter(item => item.id !== active.id));
      }
    } else if (overContainer === 'recipes') {
      const oldIndex = recipeList.findIndex(item => item.id === active.id);
      const newIndex = recipeList.findIndex(item => item.id === over.id);
      setRecipeList((items) => arrayMove(items, oldIndex, newIndex));
    }
  }    

  const sensors = useSensors(
    useSensor(CustomPointerSensor)
  )
 
  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={recipeList.map(recipe => recipe.id)} strategy={verticalListSortingStrategy} id='recipes'>
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
