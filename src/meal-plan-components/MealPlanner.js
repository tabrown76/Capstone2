import React, { useContext, useEffect } from 'react';
import { DndContext, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
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
  const { recipeList, setRecipeList, weekList, dragIds, setDragIds} = value;

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
      horizontalSortingFunc(active, over, activeContainer, overContainer);
    } else if (activeContainer === overContainer) {
      verticalSortingFunc(active, over, overContainer);
    }
  }

  const horizontalSortingFunc = (active, over, activeContainer, overContainer) => {

  }
  
  const verticalSortingFunc = (active, over, overContainer) => {
    let items = overContainer === 'recipes' ? [...recipeList] : [...dragIds];
    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);
    items = arrayMove(items, oldIndex, newIndex);
    overContainer === 'recipes' ? setRecipeList(items) : setDragIds(items);
  }  
  
  useEffect(() => {
    console.log("Updated recipeList:", recipeList);
  }, [recipeList]);

  useEffect(() => {
    console.log(`updated dragIds: ${JSON.stringify(dragIds)}`);
  }, [dragIds])
  

  const allItems = [
    ...recipeList.map(recipe => ({ id: recipe.id, containerId: 'recipes' })),
    ...dragIds.map(item => ({id: item.id, containerId: 'recipe-receiver'}))
  ];

  const sensors = useSensors(
    useSensor(CustomPointerSensor)
  )
 
  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={allItems} strategy={horizontalListSortingStrategy} id='recipes-and-receiver'>
        <div className='meal-planner-container'>
          <div className='meal-planner-section calendar-view-section'>
            <CalendarView weekList={weekList} />
          </div>
          <div className='meal-planner-section recipe-list-section'>
            <RecipeList recipeList={recipeList} />
          </div>
        </div>
      </SortableContext>
    </DndContext>   
  );
};

export default MealPlanner;
