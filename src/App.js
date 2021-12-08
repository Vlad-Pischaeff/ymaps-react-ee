import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import RouteList from './components/RouteList';
import { context, EE, useLocation } from './hooks/service';

function App() {
  const [ myMap, setMyMap ] = useState({});
  const { placing } = useLocation();

  return (
    <context.Provider value={{ EE, placing, myMap, setMyMap }}>
      <div className="App">
        <aside className="left-aside">
          <Form />
          <RouteList />
        </aside>
        <main className="main">
          <GeoMap />
        </main>
      </div>
    </context.Provider>
  );
}

export default App;
