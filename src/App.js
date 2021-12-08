import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import RouteList from './components/RouteList';

function App() {
  const [ address, setAddress ] = useState([]);
  const [ myMap, setMyMap ] = useState({});

  return (
    <div className="App">
      <aside className="left-aside">
        <Form address={address} setAddress={setAddress} myMap={myMap}/>
        <RouteList address={address} setAddress={setAddress} />
      </aside>
      <main className="main">
        <GeoMap address={address} setAddress={setAddress} myMap={myMap} setMyMap={setMyMap} />
      </main>
    </div>
  );
}

export default App;
