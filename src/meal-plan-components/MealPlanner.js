import React, { useContext } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import { MealContext } from '../contexts/MealContext';
import CalendarView from './CalendarView';
import RecipeList from './RecipeList';

const MealPlanner = () => {
  const { value } = useContext(MealContext);
  const { recipeList, setRecipeList } = value;

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(recipeList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRecipeList(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CalendarView />
      <RecipeList />
    </DragDropContext>   
  );
};

export default MealPlanner;
