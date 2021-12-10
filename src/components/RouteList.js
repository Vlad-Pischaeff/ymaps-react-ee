import { useEffect, useState } from 'react';
import { useLocationContext } from '../hooks/location.hook';
import Item from './Item';

export default function RouteList() {
  const { EE, placing } = useLocationContext();
  const [ draggedItemIdx, setDraggedItemIdx ] = useState();
  const [ droppedItemIdx, setDroppedItemIdx ] = useState();
  let img = new Image(); 
  img.src = 'data:image/png;base64,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';

  useEffect(() => {
    if ((draggedItemIdx !== undefined) && (droppedItemIdx !== undefined)) {
      EE.emit('reorder items', {draggedItemIdx, droppedItemIdx});
    }
  }, [draggedItemIdx, droppedItemIdx])

  return (
    <ul className="route-wrap">
      {placing.map((addr, idx) => {
        return (
          <Item key={idx} params={{ addr, idx, img, setDraggedItemIdx, setDroppedItemIdx, draggedItemIdx }} />
        )
      })}
    </ul>
  )
}