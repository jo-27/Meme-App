
import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function DraggableImage({ src }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { src }, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.5 : 1;

  return (
    <img
      ref={dragRef}
      src={src}
      alt="draggable"
      style={{
        width: 80,
        height: 80,
        margin: '8px 0',
        cursor: 'grab',
        opacity,
        border: '1px solid #000',
      }}
    />
  );
}

export default DraggableImage;
