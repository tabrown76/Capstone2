import React from "react";
import { useSortable,  } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

/**
 * RecipeReceiver component that acts as a droppable area for recipes.
 * It uses the DnD Kit's useDroppable hook to enable drag-and-drop functionality.
 * 
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.id - The unique identifier for the droppable area.
 * @example
 * return (
 *   <RecipeReceiver id={id} />
 * )
 */
const RecipeReceiver = ({ id }) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id});

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    pointerEvents: isDragging ? 'none' : 'auto'
  }

  return (
    <>
      <div 
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="recipe-receiver draggable"
        data-sortable-container-id="recipe-receiver"
        data-sortable-id={id}
      >
        Drop here
      </div>
    </>
  );
};

export default RecipeReceiver;
