import './App.css';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import RouteList from './components/RouteList';
import { LocationContext, EE, useLocation } from './hooks/location.hook';
import { MapContext, useMap } from './hooks/mapcontext.hook';

function App() {
  const mapContext = useMap();
  const placing = useLocation();

  return (
    <MapContext.Provider value={mapContext}>
      <LocationContext.Provider value={{ EE, placing }}>
        <div className="App">
          <aside className="left-aside">
            <Form />
            <RouteList />
          </aside>
          <main className="main">
            <GeoMap />
          </main>
        </div>
      </LocationContext.Provider>
    </MapContext.Provider>
  );
}

export default App;
