import { useState, useRef } from 'react';
import iconClose from '../helpers/icons8-close.svg'

export default function Item(props) {
  const { addr, idx, removeItem, setDroppedItemIdx, setDraggedItemIdx, draggedItemIdx } = props;
  const [ style, setStyle ] = useState({});
  const [ dragover, setDragover ] = useState(false);
  const itemRef = useRef();

  const dragStart = () => {
    setDraggedItemIdx(idx);
    setStyle({opacity: '0.5'});
  }
  
  const dragLeave = () => {
    if (draggedItemIdx !== idx) {
      setStyle({});
      setDragover(false);
      setDroppedItemIdx();
    }
  }

  const dragOver = (e) => {
    e.preventDefault();
    if (draggedItemIdx !== idx && !dragover) {
      setDragover(true);
      setStyle({background: 'pink', transform: 'scale(1.02)'});
    } 
  }

  const dropHandler = () => { 
    setStyle({});
    setDragover(false);
    setDroppedItemIdx(idx);
  }

  const dragEnd = () => {
    setDraggedItemIdx();
    setDroppedItemIdx();
    setStyle({});
  }

  return (
    <li className="addr-wrap" ref={itemRef} draggable="true" style={style}
        onDragStart={dragStart}
        onDragLeave={dragLeave}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        onDrop={dropHandler}>
      <section className="left-section">
        <div>{addr.city}</div>
        <div>{addr.street}, {addr.building}, [{addr.coord[0]}, {addr.coord[1]}]</div>
      </section>
      <section className="right-section">
        <img src={iconClose} alt="iconClose" className="icon-close" onClick={() => removeItem(idx)} />
      </section>
    </li>
  )
}