import { useState, useEffect, createContext, useRef, useContext } from 'react';
import EventEmitter from './emitter';

export const EE = new EventEmitter()

export const LocationContext = createContext();

export const useLocationContext = () => {
  return useContext(LocationContext);
}

export const LocationContextProvider = ({ children }) => {
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
                                      let idx = Object.values(obj);
                                      let arr = [...locRef.current];
                                      let item = arr.splice(idx[0], 1);
                                      arr.splice(idx[1], 0, item[0]);
                                      setPlacing(arr);
                                  });

    return () => { 
      EE.off('add');
      EE.off('reset');
      EE.off('remove item');
      EE.off('reorder items');
    }
  }, [])

  return (
    <LocationContext.Provider value={{placing}}>
      {children}
    </LocationContext.Provider>
  );
}