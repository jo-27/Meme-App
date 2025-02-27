
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function DroppablePreview({ onDrop, droppedItems }) {
  const previewRef = useRef(null);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const previewRect = previewRef.current.getBoundingClientRect();

      const x = clientOffset.x - previewRect.left;
      const y = clientOffset.y - previewRect.top;

      onDrop(item.src, x, y);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  dropRef(previewRef);

  const borderColor = isOver ? 'green' : '#aaa';

  return (
    <div
      ref={previewRef}
      style={{
        flex: 1,
        border: `2px dashed ${borderColor}`,
        position: 'relative',
        minHeight: 400,
        background: '#fff',
        marginLeft: 10,
      }}
    >
      {droppedItems.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt="dropped"
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
            width: 80,
            height: 80,
            pointerEvents: 'none', 
          }}
        />
      ))}
    </div>
  );
}

export default DroppablePreview;
