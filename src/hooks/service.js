import { useState, useEffect, createContext, useRef } from 'react'
import EventEmitter from './emitter'

export const EE = new EventEmitter()

export const useLocation = () => {
  const [ placing, setPlacing ] = useState([]);
  const locRef = useRef(placing);

  useEffect(() => { locRef.current = placing })

  useEffect(() => {
    EE.on('set', (data) => setPlacing(data));
    EE.on('reset', () => setPlacing([]));
    EE.on('remove item', (idx) => { 
                                    let arr = locRef.current.filter((n, i) => i !== idx);
                                    setPlacing(arr);
                                  });
    EE.on('reorder items', (obj) => { // idx1 - index of dragged element
                                      // idx2 - where drop new element
                                      let arr = [...locRef.current];
                                      let item = arr.splice(obj.idx1, 1);
                                      arr.splice(obj.idx2, 0, item[0]);
                                      setPlacing(arr);
                                  });

    return () => { 
      EE.off('add');
      EE.off('reset');
      EE.off('remove item');
      EE.off('reorder items');
    }
  }, [])
  console.log('useLocation...', placing);
  return { placing };
}

export const context = createContext();