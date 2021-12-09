import { useEffect, useState } from 'react';
import { useLocationContext } from '../hooks/location.hook';
import Item from './Item';

export default function RouteList() {
  const { EE, placing } = useLocationContext();
  const [ draggedItemIdx, setDraggedItemIdx ] = useState();
  const [ droppedItemIdx, setDroppedItemIdx ] = useState();

  useEffect(() => {
    if ((draggedItemIdx !== undefined) && (droppedItemIdx !== undefined)) {
      reorderItems(draggedItemIdx, droppedItemIdx);
    }
  }, [draggedItemIdx, droppedItemIdx])

  function reorderItems(idx1, idx2) {
    EE.emit('reorder items', {idx1, idx2});
  }

  return (
    <ul className="route-wrap">
      {placing.map((addr, idx) => {
        return (
          <Item key={idx} params={{ addr, idx, setDraggedItemIdx, setDroppedItemIdx, draggedItemIdx }} />
        )
      })}
    </ul>
  )
}