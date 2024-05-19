import React, { useContext } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { MealContext } from '../contexts/MealContext';
import CalendarView from './CalendarView';
import RecipeList from './RecipeList';
import { arrayMove } from '@dnd-kit/sortable';
import "../styles/MealPlanner.css";

const MealPlanner = () => {
  const { value } = useContext(MealContext);
  const { recipeList, setRecipeList } = value;

  const getRecipePos = id => recipeList.findIndex(recipe =>
    recipe.id === id
  )

  const handleDragEnd = e => {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setRecipeList(recipeList => {
      const originalPos = getRecipePos(active.id);
      const newPos = getRecipePos(over.id);

      return arrayMove(recipeList, originalPos, newPos);
    })
  }
 
  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className='meal-planner-container'>
        <div className='meal-planner-section calendar-view-section'>
          <CalendarView />
        </div>
        <div className='meal-planner-section recipe-list-section'>
          <RecipeList />
        </div>
      </div>
    </DndContext>   
  );
};

export default MealPlanner;
