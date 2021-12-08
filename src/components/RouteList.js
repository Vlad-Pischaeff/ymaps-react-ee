import { useEffect, useState } from 'react';
import Item from './Item';

export default function RouteList(props) {
  const { address, setAddress } = props;
  const [ draggedItemIdx, setDraggedItemIdx ] = useState();
  const [ droppedItemIdx, setDroppedItemIdx ] = useState();

  useEffect(() => {
    if ((draggedItemIdx !== undefined) && (droppedItemIdx !== undefined)) {
      reorderItems(draggedItemIdx, droppedItemIdx);
    }
  }, [draggedItemIdx, droppedItemIdx])

  const removeItem = (idx) => {
    let arr = address.filter((n, i) => i !== idx);
    setAddress(arr);
  }

  function reorderItems(idx1, idx2) {
    // idx1 - index of dragged element
    // idx2 - where drop new element
    let arr = [...address];
    let item = arr.splice(idx1, 1);
    arr.splice(idx2, 0, item[0]);
    setAddress(arr);
  }

  return (
    <ul className="route-wrap">
      {address.map((a, i) => {
        return (
          <Item key={i} addr={a} idx={i} 
                removeItem={removeItem} 
                setDraggedItemIdx={setDraggedItemIdx}
                setDroppedItemIdx={setDroppedItemIdx} 
                draggedItemIdx={draggedItemIdx}/>
        )
      })}
    </ul>
  )
}