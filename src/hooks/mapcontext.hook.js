import { useContext, useMemo, useState, createContext } from "react";

export const MapContext = createContext();

export const useMapContext = () => {
  return useContext(MapContext);
}

export const useMap = () => {
  const [ myMap, setMyMap ] = useState({});

  const mapContext = useMemo(() => ({ myMap, setMyMap }), [ myMap ]);

  return mapContext;
}