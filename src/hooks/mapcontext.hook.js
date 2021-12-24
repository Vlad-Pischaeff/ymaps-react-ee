import { useContext, useMemo, useState, createContext } from "react";

export const MapContext = createContext();

export const useMapContext = () => {
  return useContext(MapContext);
}

export const MapContextProvider = ({ children }) => {
  const [ myMap, setMyMap ] = useState({});

  const mapMemo = useMemo(() => ({ myMap, setMyMap }), [ myMap ]);

  return (
    <MapContext.Provider value={mapMemo}>
      {children}
    </MapContext.Provider>
  );
}
