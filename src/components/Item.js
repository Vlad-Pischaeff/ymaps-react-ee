import { useState, useRef } from 'react';
import { useLocationContext } from '../hooks/location.hook';
import iconClose from '../img/icons8-close.svg'

export default function Item(props) {
  const { EE } = useLocationContext();
  const { addr, idx, setDroppedItemIdx, setDraggedItemIdx, draggedItemIdx } = props;
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
        <div>{addr.street}, {addr.building}</div>
        <p style={{color: '#666'}}>[{addr.coord[0]}, {addr.coord[1]}]</p>
      </section>
      <section className="right-section">
        <img src={iconClose} alt="iconClose" className="icon-close" onClick={() => EE.emit('remove item', idx)} />
      </section>
    </li>
  )
}