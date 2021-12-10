import { useState } from 'react';
import { useLocationContext } from '../hooks/location.hook';
import iconClose from '../img/icons8-close.svg'

export default function Item({params}) {
  const { EE } = useLocationContext();
  const { addr, idx, img, setDroppedItemIdx, setDraggedItemIdx, draggedItemIdx } = params;
  const [ style, setStyle ] = useState({});
  const [ dragover, setDragover ] = useState(false);

  const dragStart = (e) => {
    setDraggedItemIdx(idx);
    setStyle({opacity: '0.5'});
    e.dataTransfer.setDragImage(img, 20, 20);
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
    <li className="addr-wrap" draggable="true" style={style}
        onDragStart={dragStart}
        onDragLeave={dragLeave}
        onDragOver={dragOver}
        onDragEnd={dragEnd}
        onDrop={dropHandler}>
      <section className="left-section">
        <div>{addr.city}</div>
        <div>{addr.street}, {addr.building}</div>
        <p style={{color: '#666', fontSize: '.8rem'}}>[{addr.coord[0]}, {addr.coord[1]}]</p>
      </section>
      <section className="right-section">
        <img src={iconClose} alt="iconClose" className="icon-close" onClick={() => EE.emit('remove item', idx)} />
      </section>
    </li>
  )
}