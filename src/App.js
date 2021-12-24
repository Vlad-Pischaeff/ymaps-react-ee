import './App.css';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import RouteList from './components/RouteList';
import { LocationContextProvider } from './hooks/location.hook';
import { MapContextProvider } from './hooks/mapcontext.hook';

function App() {

  return (
      <LocationContextProvider>
        <MapContextProvider>
          <div className="App">
            <aside className="left-aside">
              <Form />
              <RouteList />
            </aside>
            <main className="main">
              <GeoMap />
            </main>
          </div>
        </MapContextProvider>
      </LocationContextProvider>
  );
}

export default App;
